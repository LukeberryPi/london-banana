"""Trace Saul Sadka's London Banana into a lat/lng polygon.

Source: https://x.com/Saul_Sadka/status/1959609109939892706 (24 Aug 2025).
The image is not committed; save the 1024x1024 screenshot of the post locally and pass its path.

    python scripts/banana/trace.py path/to/banana.jpg

Requires: pillow numpy scipy scikit-image shapely
"""

import json
import sys
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw
from scipy import ndimage
from scipy.interpolate import RBFInterpolator
from shapely.geometry import Polygon
from skimage import measure
from skimage.morphology import disk, opening, skeletonize

OUT = Path(__file__).resolve().parents[2] / 'src' / 'data' / 'banana.json'
LAT0 = 51.5
K = float(np.cos(np.radians(LAT0)))

# Gaps in the marker stroke, as pixel endpoint pairs.
BRIDGES = [((277, 158), (293, 161)), ((417, 197), (427, 201)), ((167, 705), (158, 719))]

# Town dots on the Maproom base map: (pixel x, y), (lat, lng).
CONTROL_POINTS = {
    'Hadley Wood': ((420.3, 150.3), (51.6664, -0.1760)),
    'Cockfosters': ((414.3, 169.3), (51.6517, -0.1496)),
    'Barnet': ((385.7, 184.3), (51.6525, -0.1995)),
    'Borehamwood': ((304.3, 217.3), (51.6578, -0.2723)),
    'Edgware': ((311.3, 256.3), (51.6137, -0.2750)),
    'Colindale': ((334.0, 274.3), (51.5955, -0.2500)),
    'Friern Barnet': ((439.3, 240.3), (51.6120, -0.1590)),
    'Finchley': ((399.3, 280.3), (51.6010, -0.1930)),
    'East Finchley': ((426.0, 307.0), (51.5873, -0.1650)),
    'Hendon': ((372.0, 304.0), (51.5832, -0.2263)),
    'Highgate': ((444.0, 328.3), (51.5710, -0.1460)),
    'Muswell Hill': ((460.7, 308.0), (51.5906, -0.1437)),
    'Crouch End': ((477.3, 320.3), (51.5794, -0.1233)),
    'Wood Green': ((509.3, 287.3), (51.5975, -0.1097)),
    'Kentish Town': ((468.3, 382.3), (51.5500, -0.1406)),
    'Camden Town': ((469.3, 392.3), (51.5392, -0.1426)),
    'Neasden': ((321.3, 375.3), (51.5543, -0.2503)),
    'Wembley': ((276.0, 383.3), (51.5524, -0.2962)),
    'Queensbury': ((290.3, 304.3), (51.5942, -0.2860)),
    'Kingsbury': ((312.3, 317.3), (51.5847, -0.2786)),
    'Kilburn': ((375.7, 406.0), (51.5472, -0.2047)),
    'Maida Vale': ((393.0, 420.0), (51.5299, -0.1854)),
    "St John's Wood": ((407.3, 413.3), (51.5347, -0.1740)),
    'Marylebone': ((459.3, 439.0), (51.5220, -0.1550)),
    'Notting Hill': ((396.7, 456.7), (51.5094, -0.1967)),
    "Shepherd's Bush": ((365.3, 470.0), (51.5046, -0.2187)),
    'Westminster': ((490.3, 474.7), (51.4995, -0.1350)),
    'Barnes': ((361.3, 518.7), (51.4712, -0.2425)),
    'Fulham': ((386.0, 527.0), (51.4760, -0.2000)),
    'Battersea': ((444.0, 527.0), (51.4725, -0.1640)),
    'Putney': ((379.3, 548.3), (51.4620, -0.2160)),
    'Wandsworth': ((418.7, 550.7), (51.4571, -0.1931)),
    'Vauxhall': ((492.0, 503.3), (51.4861, -0.1234)),
    'Brixton': ((529.0, 555.7), (51.4613, -0.1156)),
    'Dulwich': ((548.3, 573.3), (51.4480, -0.0860)),
    'Tulse Hill': ((535.7, 592.3), (51.4396, -0.1050)),
    'Streatham': ((494.7, 614.3), (51.4279, -0.1235)),
    'Wimbledon': ((396.7, 620.7), (51.4214, -0.2064)),
    'Islington': ((516.0, 400.7), (51.5362, -0.1033)),
    'Hackney': ((576.7, 392.3), (51.5450, -0.0553)),
    'Bermondsey': ((567.7, 470.7), (51.4979, -0.0637)),
    'Strand': ((495.7, 451.7), (51.5115, -0.1195)),
    'Kew': ((292.3, 533.3), (51.4805, -0.2900)),
    'Richmond': ((277.7, 568.3), (51.4613, -0.3037)),
    'Ham': ((263.3, 596.3), (51.4385, -0.3085)),
    'Teddington': ((222.7, 624.3), (51.4274, -0.3310)),
    'Hampton': ((208.3, 639.3), (51.4147, -0.3665)),
    'Kingston': ((276.0, 645.7), (51.4123, -0.3007)),
    'New Malden': ((331.7, 621.3), (51.4033, -0.2560)),
    'Surbiton': ((270.7, 685.0), (51.3937, -0.3033)),
    'East Molesey': ((206.7, 667.0), (51.4003, -0.3490)),
    'Esher': ((206.0, 734.7), (51.3695, -0.3650)),
    'Claygate': ((244.0, 754.3), (51.3605, -0.3400)),
    'Oxshott': ((203.3, 791.3), (51.3320, -0.3530)),
    'Chessington': ((279.7, 749.7), (51.3620, -0.3000)),
    'Worcester Park': ((364.3, 703.0), (51.3797, -0.2427)),
    'Raynes Park': ((362.5, 660.0), (51.4092, -0.2302)),
    'Morden': ((415.3, 677.7), (51.4022, -0.1948)),
    'Cheam': ((394.3, 735.3), (51.3597, -0.2172)),
    'Ewell': ((353.0, 764.3), (51.3499, -0.2493)),
    'Epsom': ((330.3, 793.3), (51.3319, -0.2689)),
    'Isleworth': ((252.3, 539.3), (51.4752, -0.3363)),
    'St Margarets': ((258.3, 569.7), (51.4555, -0.3210)),
    'Whitton': ((197.0, 577.3), (51.4485, -0.3570)),
}


def stroke_mask(img: np.ndarray) -> np.ndarray:
    dark = img.max(axis=2) < 70
    dark[:45] = False
    dark[960:] = False
    mask = opening(dark, disk(2))
    lab, n = ndimage.label(mask)
    sizes = ndimage.sum(mask, lab, range(1, n + 1))
    return np.isin(lab, [i + 1 for i, s in enumerate(sizes) if s > 150])


def centreline_polygon(mask: np.ndarray) -> Polygon:
    canvas = Image.fromarray((mask * 255).astype(np.uint8))
    draw = ImageDraw.Draw(canvas)
    for a, b in BRIDGES:
        draw.line([a, b], fill=255, width=5)
    filled = ndimage.binary_fill_holes(np.asarray(canvas) > 0)
    lab, n = ndimage.label(filled)
    sizes = ndimage.sum(filled, lab, range(1, n + 1))
    region = ndimage.binary_erosion(lab == int(np.argmax(sizes)) + 1, iterations=2)
    contour = max(measure.find_contours(region.astype(float), 0.5), key=len)
    return Polygon([(p[1], p[0]) for p in contour]).simplify(0.6, preserve_topology=True)


def pixel_to_lnglat():
    P = np.array([v[0] for v in CONTROL_POINTS.values()])
    G = np.array([[v[1][1] * K, v[1][0]] for v in CONTROL_POINTS.values()])
    A = np.column_stack([P, np.ones(len(P))])
    coef, *_ = np.linalg.lstsq(A, G, rcond=None)
    rbf = RBFInterpolator(P, G - A @ coef, kernel='thin_plate_spline', smoothing=100)

    def warp(Q: np.ndarray) -> np.ndarray:
        out = np.column_stack([Q, np.ones(len(Q))]) @ coef + rbf(Q)
        out[:, 0] /= K
        return out

    return warp


def main() -> None:
    img = np.asarray(Image.open(sys.argv[1]).convert('RGB')).astype(int)
    mask = stroke_mask(img)
    half_width_px = float(np.median(ndimage.distance_transform_edt(mask)[skeletonize(mask)]))
    px = centreline_polygon(mask)
    lnglat = pixel_to_lnglat()(np.array(px.exterior.coords))
    ring = [[round(float(lng), 5), round(float(lat), 5)] for lng, lat in lnglat]
    assert Polygon(ring).is_valid
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps({
        'source': 'https://x.com/Saul_Sadka/status/1959609109939892706',
        'method': 'Centreline of the marker stroke, georeferenced from town dots on the base map. Approximate.',
        'strokeHalfWidthPx': round(half_width_px, 2),
        'ring': ring,
    }, separators=(',', ':')))
    print(f'wrote {OUT} ({len(ring)} points)')


if __name__ == '__main__':
    main()
