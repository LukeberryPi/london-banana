"""Build the bundled base map: local authority outlines and the Thames.

    python scripts/banana/basemap.py

Boundaries: ONS Open Geography Portal, LAD Dec 2024 BGC (Open Government Licence v3).
River: OpenStreetMap contributors via Overpass (ODbL).
Requires: shapely
"""

import json
import urllib.parse
import urllib.request
from pathlib import Path

from shapely.geometry import LineString, MultiLineString, box, shape
from shapely.ops import linemerge, transform
from shapely.validation import make_valid

OUT = Path(__file__).resolve().parents[2] / 'src' / 'data' / 'basemap.json'
BBOX = (-0.62, 51.22, 0.36, 51.78)
LAT0 = 51.5
KX = 111320 * 0.6225
KY = 111320
TOLERANCE_M = 40
CLIP = box(-0.75, 51.15, 0.5, 51.85)

LAD_URL = (
    'https://services1.arcgis.com/ESMARspQHYMw9BZ9/arcgis/rest/services/'
    'Local_Authority_Districts_December_2024_Boundaries_UK_BGC/FeatureServer/0/query?'
    + urllib.parse.urlencode({
        'where': '1=1',
        'geometry': ','.join(map(str, BBOX)),
        'geometryType': 'esriGeometryEnvelope',
        'inSR': 4326,
        'spatialRel': 'esriSpatialRelIntersects',
        'outFields': 'LAD24CD,LAD24NM',
        'outSR': 4326,
        'geometryPrecision': 5,
        'f': 'geojson',
    })
)
THAMES_QUERY = (
    '[out:json][timeout:60];'
    'way["waterway"="river"]["name"="River Thames"](51.33,-0.62,51.52,0.36);out geom;'
)


def fetch_json(url: str):
    req = urllib.request.Request(url, headers={'User-Agent': 'london-banana-build/1.0', 'Accept': 'application/json'})
    with urllib.request.urlopen(req, timeout=90) as res:
        return json.load(res)


to_m = lambda x, y, z=None: ((x + 0.2) * KX, (y - LAT0) * KY)
to_deg = lambda x, y, z=None: (x / KX - 0.2, y / KY + LAT0)


def simplify(geom):
    return transform(to_deg, transform(to_m, geom).simplify(TOLERANCE_M, preserve_topology=True))


def rings(geom):
    polys = [g for g in getattr(geom, 'geoms', [geom]) if g.geom_type == 'Polygon']
    return [[[round(x, 4), round(y, 4)] for x, y in p.exterior.coords] for p in polys if p.area > 1e-6]


def main() -> None:
    lads = fetch_json(LAD_URL)['features']
    areas = [
        {
            'name': f['properties']['LAD24NM'],
            'london': f['properties']['LAD24CD'].startswith('E09'),
            'rings': rings(simplify(make_valid(shape(f['geometry'])).intersection(CLIP))),
        }
        for f in lads
    ]
    osm = fetch_json('https://overpass-api.de/api/interpreter?' + urllib.parse.urlencode({'data': THAMES_QUERY}))
    lines = [LineString([(p['lon'], p['lat']) for p in el['geometry']]) for el in osm['elements']]
    merged = linemerge(MultiLineString(lines))
    parts = [merged] if merged.geom_type == 'LineString' else list(merged.geoms)
    thames = [
        [[round(x, 4), round(y, 4)] for x, y in simplify(part).coords]
        for part in parts
        if transform(to_m, part).length > 1500
    ]
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps({'areas': areas, 'thames': thames}, separators=(',', ':')))
    print(f'wrote {OUT}: {len(areas)} areas, {len(thames)} river lines, {OUT.stat().st_size // 1024} KB')


if __name__ == '__main__':
    main()
