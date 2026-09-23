# The London Banana: origin, boundary, and how to operationalise it

Researched 23 September 2026. Primary sources are preferred throughout; news coverage is labelled **(secondary)** and is used mainly to locate primary material.

## TL;DR

There is no exact boundary. The "London Banana" is a freehand shape that author Saul Sadka drew over a road map and posted on X on 24 August 2025 [1]. He later described it as "randomly made up based on personal experience" and "minimal-effort tongue-in-cheek rage bait" [4]. It was not drawn from any dataset, and no GeoJSON, area list or statistical threshold was ever published. Sadka's own three hand-drawn versions differ at the edges [1][2][3][4], and he admitted that Maida Vale and Notting Hill were left out "by accident, thanks to a careless swipe of a fat thumb" [4].

The brief's framing is also wrong on two counts:

- **Direction:** the shape runs south-west to north (Esher/Oxshott in Surrey → Kingston → Wimbledon → Chelsea → Westminster → Camden/Islington → Barnet → Borehamwood in Hertfordshire). It does not run west to east, and East London is essentially excluded.
- **Meaning:** it is about perceived desirability and safety, not about young professionals [1][4].

The most defensible definition for a website is a documented, georeferenced trace of the original 24 August image, snapped to 2021 LSOAs. A postcode is then "inside" if postcodes.io returns an LSOA code that is on the list.

## 1. Origin

### The original post (primary)

- **Author / account:** Saul Sadka, `@Saul_Sadka` on X.
- **Post:** <https://x.com/Saul_Sadka/status/1959609109939892706>, created `Sun Aug 24 13:29:54 +0000 2025` (UTC) [1].
- **Exact text** [1]:
  > "This is the London Banana. As long as you stay within the Banana, you'll have a great time in London. Almost everything outside the Banana is horrible these days, best avoid. Not clear why, or when this happened. But it is what it is."
- **Image:** <https://pbs.twimg.com/media/GzHuGDZWoAABg6w.jpg?name=orig> (1812×1812 px) [1].
  - It is a phone screenshot of a Google Images viewer. The top-left shows the source label "Maproom" and the bottom shows "Images may be subject to copyright. Learn more".
  - The underlying map is a Maproom-style Greater London districts/boroughs road map [8]. I inferred this from the visual match; the exact Maproom product is not confirmed.
  - Over it Sadka drew a thick black freehand outline plus a soft yellow fill.
- **Reach at time of retrieval:** 19,371,419 views, 62,569 likes and 26,846 bookmarks, read from the fxtwitter mirror of the X API on 23 Sep 2026 [1]. The Telegraph's "more than 10 million" views refers to an Instagram post [11] **(secondary)**. I did not locate that Instagram post, so it may be a reshare.

### Sadka's own follow-ups in the same thread (primary)

The Thread Reader unroll lists 8 posts [5]. The ones that bear on the boundary are:

| Time (UTC) | Post | What it says / shows |
|---|---|---|
| 24 Aug 21:31 | [2] | "Here's the London Banana clearly visible on the latest house prices data…" A **freshly redrawn** outline over plumplot.co.uk's "London house prices map", which shows "average property price in a given postcode sector" [7]. |
| 25 Aug 09:35 | [3] | "…here's the latest map of voilent crime statistics with the Banana overlaid." Another redrawn outline over plumplot's "National crime rate comparison" map. |
| 25 Aug 16:16 | [4] | "Some clarifications". Quoted in full below. |

Text of the clarification post [4], verbatim:

> "So, based on the 5m+ views here and the tens of millions more via re-shares elsewhere, it seems I accidentally perfected minimal-effort tongue-in-cheek rage bait for English people. … But a few clarifications:
> 1. To everyone saying "but my neighbourhood is lovely"—yes, I know. Notice the minimal effort. Don't take this too seriously.
> 2. At the same time, the "London Banana"—which I randomly made up based on personal experience—actually aligns pretty well with a number of quality-of-life proxy maps, such as violent crime rates (which have doubled in the last 10 years), property prices, and more.
> 3. To the good people of Dulwich: I've never been, but I totally accept the feedback.
> 4. To the angry people of Maida Vale and Notting Hill: You were left out by accident, thanks to a careless swipe of a fat thumb. Sorry, I can't fix this now. You're out of the Banana. Deal with it. 🤪"

**Conclusion on origin:** the shape came first, from personal experience. The house-price and crime overlays were added afterwards as justification [2][3][4]. There is therefore no source dataset, geography level, variable or threshold to recover. The plumplot maps are postcode-sector choropleths [7]; they were overlaid on the banana, not used to make it. Sadka told the Evening Standard he was prompted by "seeing a person in a balaclava menacing someone with a stick quite openly on a high street just outside the banana" [9] **(secondary)**.

I found no earlier use of "London Banana" for this concept. All coverage traces back to this post [9][10][11][12][14], though I can't prove that no earlier use exists. The brief describes a banana of young-professional or graduate renter areas running through west, central and east London. **I found no source for that version**, and the Census data in §4 contradicts it.

### Not to be confused with the "Blue Banana"

The European "Blue Banana" (*banane bleue*, *dorsale européenne*) is an unrelated concept. It is an urban-economic corridor from roughly Lancashire/London to Tuscany/Milan, identified in Roger Brunet's 1989 DATAR/RECLUS study *Les villes « européennes »* [19].

- Brunet says the name was a media addition. The minister Jacques Chérèque coined the banana shape at a press conference, and the colour came from a *Nouvel Observateur* illustrator a few days later [19][38].
- London sits inside the Blue Banana. The Daily Mail notes the London Banana is "reminiscent of" it [12] **(secondary)**, but the two are not related.

## 2. Definitions: is there a canonical boundary?

**No.** Specifically:

- **No vector boundary.** Sadka published only raster images [1][2][3][4]. No GeoJSON, shapefile or KML exists from him. The only third-party "maps" I found are illustrative, not reproducible:
  - Metro's Datawrapper graphic [10], a static image with no downloadable geometry.
  - A fan site [16].
  - A "Liveable Score" marketing page [6].
- **No list of areas.** Sadka never listed boroughs, wards, MSOAs, LSOAs or postcode districts. Area lists in the press are journalists' readings of the image and they disagree (§3).
- **No data criterion.** In his own words the shape is "randomly made up based on personal experience" [4].
- **His own drawings are inconsistent.** Overlaying his three images [1][2][3] shows visibly different edges. For example, the northern tip reaches different distances toward Potters Bar/Hadley Wood, and the width of the central "neck" differs.
- **He explicitly declined to correct it.** "I can't fix this now. You're out of the Banana." [4]

### Anatomy of the original outline (my inspection of [1])

These readings come from zoomed crops of the 1812 px original.

- **Four freehand strokes, not one closed loop.** There are small gaps:
  - at the northern tip, between the Borehamwood arc and the eastern stroke near Barnet/Cockfosters;
  - on the west side, between the stroke from Borehamwood (ending near Hendon/Golders Green) and a separate stroke starting at Hampstead. That second stroke creates the inward "dent" that excludes Kilburn, Maida Vale and Notting Hill, i.e. the "fat thumb" [4];
  - at the south-west, near Hampton/East Molesey.
- **The yellow fill and the black line don't coincide.** The halo spills beyond the line in places, e.g. around Streatham and East Molesey. **Use the black line**; the fill is a soft brush.
- **The stroke is thick.** Using Heathrow↔Westminster as a scale bar (about 23 km ≈ 375 px at 1024 px display), the line is roughly **0.6–0.9 km wide on the ground**. Anything within about ±0.4 km of the stroke centre is genuinely indeterminate. This is my own estimate.
- **It extends beyond Greater London.** It includes Esher, Claygate, Oxshott and East Molesey (Elmbridge, Surrey) and Borehamwood (Hertsmere, Hertfordshire). postcodes.io puts KT10 9AA (Esher) in Elmbridge, region "South East" [21]. **A London-only boundary set cannot represent it.**

## 3. Variants: core vs contested edges

"Inside", "Edge" and "Outside" below are **my reading of the original image [1]**, based on where the Maproom town dots sit relative to the black stroke. They are cross-checked against Sadka's own statements [4] and the press. "Edge" means the place's dot is within roughly one stroke width of the line.

### Core (clearly inside on [1], and not disputed by any source found)

- **South-west:** Richmond, Ham, Kingston upon Thames, Surbiton, New Malden, Worcester Park, Chessington, Wimbledon, Raynes Park; Esher, Claygate, Oxshott (Surrey).
- **Centre:** Putney, Wandsworth, Battersea, Fulham, Chelsea/Kensington (the "Kensington & Chelsea" label), Vauxhall, Westminster, Strand, Marylebone, City of London (the stroke runs along its eastern side).
- **North:** Camden Town, Kentish Town, Islington, Canonbury, Highgate, Crouch End, Muswell Hill, East Finchley, Finchley, Golders Green, Friern Barnet, Mill Hill, Barnet; Borehamwood (Herts).

Press readings broadly agree:

- Telegraph: "covers Kingston and Richmond … Wandsworth, Kensington and Chelsea and up through Westminster, Camden and Islington to Barnet" [11].
- Daily Mail: "swathes of Kingston, Richmond, Merton, Wandsworth, Kensington, the City of London, Westminster, Camden, Barnet and Islington – with some parts of Haringey, Southwark and Lambeth" [12].
- Your Local Guardian: Wimbledon, Kingston, Battersea, Westminster, Camden Town, Kentish Town, Highgate, Vauxhall [14].
- Rightmove: Islington and Battersea are the only two of its top-10 hotspots inside [13].

### Explicitly outside, according to the originator

- **Notting Hill and Maida Vale:** out, "by accident", and staying out [4].
- **Dulwich:** Sadka "never been, but I totally accept the feedback" [4]. He acknowledged the complaint but did not redraw.

### Clearly outside on [1]

- **East and south-east:** Hackney, Stoke Newington (edge; see below), Tottenham, Stratford, Canary Wharf/Isle of Dogs, Rotherhithe, Deptford, Greenwich, Blackheath, Lewisham, Camberwell, Peckham, Dulwich, Tulse Hill.
- **West and north-west:** Kilburn, Cricklewood, Kensal Green, Shepherd's Bush, Chiswick, Acton, Ealing, Brentford, Hounslow, Whitton; Edgware and Colindale.
- **South:** Mitcham, Sutton, Croydon, Epsom.

The press agrees:

- Metro: Greenwich and Dulwich out [10].
- Daily Mail: Notting Hill, Maida Vale, Greenwich, Chiswick and Ealing out [12].
- Telegraph: Shepherd's Bush out; Dulwich, Greenwich, London Fields and Stoke Newington residents "outraged" [11].
- Evening Standard: Shoreditch "not included" [9].
- Rightmove: Docklands and Hackney outside [13].
- Community redraws are informal and don't converge. Reddit users propose adding Twickenham and Sutton and removing North Kensington, or note the omission of Ealing, Notting Hill, Chiswick and Hackney [18]. A reply quoted by Your Local Guardian suggests shifting it west to take in Kilburn and Willesden and drop Battersea and Wandsworth [14].

### Contested or indeterminate edges

| Place | Reading of [1] | Conflicting sources |
|---|---|---|
| Hammersmith | Stroke runs through the label | — |
| Barnes, Kew | On the line | — |
| Hampstead | The "dent" stroke starts right at Hampstead | Standard: Hampstead Heath "included" [9] |
| St John's Wood | Stroke passes through the label | — |
| Brixton | Stroke passes through the label | Remitly says Brixton is inside [15]; unreliable, see below |
| Clapham | Label inside | Telegraph says the Lambeth part of Clapham is out [11]. The image is too coarse to resolve the Wandsworth/Lambeth split through Clapham |
| Streatham, Morden, Cheam, Ewell | On the line | — |
| Kennington, Bermondsey | On the eastern stroke | Standard: Southwark "crosses the boundary" [9] |
| Shoreditch | On the eastern stroke | Standard: "not included" [9] |
| Highbury, Stoke Newington, Wood Green, Hornsey | On or just outside the eastern stroke | Telegraph treats Stoke Newington as out [11] |
| Hendon, Cockfosters | On the western stroke / northern gap | — |
| Twickenham, Teddington, Hampton, East Molesey, St Margarets | On the south-western stroke / gap | — |
| Notting Hill | Outside the dent | A resident told the Standard she lives "just within" [9]; Sadka says out [4] |

### Unreliable secondary descriptions (do not use as a boundary source)

- **Remitly [15]** says the banana is "nine neighbourhoods", including Notting Hill and Brixton, forming a "U-shape". This contradicts the originator [4] and the image [1]. The page also cites July 2026 data, so it was written or edited long after the event.
- **thebanana.london [16]** (fan site) lists Notting Hill as inside, which contradicts [4].
- **Rightmove [13]** describes the banana as running "from South West to North East London". The image [1] ends due north (Barnet/Borehamwood), not north-east.
- **The Evening Standard [9] and Telegraph [11]** say "the entire Northern line lies within it". On [1], Edgware and Colindale, on the Northern line's Edgware branch, lie west of the western stroke. That claim does not hold for the original drawing.
- **Biographical details conflict.** The Standard says Sadka "has lived in London most of his life" [9]; The Negotiator says he "doesn't live in London" and calls him "Paul Sadka" [17]. Both are secondary, it doesn't affect the boundary, and I did not verify either.

## 4. Recommended operational definition(s)

Because no exact boundary exists, the site has to **declare** one and say so on the page, e.g. "based on a trace of Saul Sadka's original 24 Aug 2025 map".

### Definition A (recommended): "Sadka v1", traced and snapped to 2021 LSOAs

This is faithful to the originator, reproducible and auditable. It also turns a 0.6–0.9 km-wide pen line into crisp yes/no answers.

1. **Source raster.** Use only the original post's image: [1], `GzHuGDZWoAABg6w.jpg?name=orig`, 1812×1812. Do not use the later redraws [2][3][4]; they differ, and v1 is what went viral. Record the image's SHA/MD5 in the project so the source is pinned.
2. **Georeference.** In QGIS (Layer → Georeferencer):
   - Use **≥15 well-spread ground control points (GCPs)** at Maproom town dots and hard features, including points outside London. Examples: Heathrow airport symbol, Westminster, Richmond, Kingston upon Thames, Wimbledon, Esher, Oxshott, Epsom, Borehamwood, Barnet, Potters Bar, Enfield, Stratford, Croydon, Greenwich.
   - Take GCP coordinates from an official gazetteer, e.g. OS Open Names, which postcodes.io also serves [20].
   - Use a 2nd-order polynomial or thin-plate-spline transform and **record the RMS error**. The base map is a stylised cartographic product, so expect errors of a few hundred metres.
   - Crop away the Google Images UI chrome first.
3. **Digitise the centreline of the black stroke**, not the yellow halo.
   - Close the three gaps (north tip near Barnet/Cockfosters, the Hendon→Hampstead jump, and the south-west gap near Hampton/East Molesey) with the shortest straight segment between the free stroke ends.
   - Keep the Hampstead "dent" as drawn. The originator ruled that it stands [4].
   - Save as a single WGS84 polygon.
4. **Snap to statistical geography.** An LSOA (Dec 2021) is **IN** if its **population-weighted centroid** falls inside the polygon. Use ONS `LSOA_PopCentroids_EW_2021_V4` [26], with LSOA boundaries from [24].
   - Why population-weighted: it reflects where people actually live, so large parks and reservoirs on the edge don't skew the result.
   - Publish the resulting list of `E01…` codes as the versioned definition, e.g. `banana-v1.0`.
   - If you want coarser, less noisy edges, do the same with MSOA 2021 population-weighted centroids (`MSOA_December_2021_EW_PWC_V2` [26]).
5. **Optional "peel" flag.** If the postcode's lat/lng is within about 400 m of the traced line, add a caveat such as "you're on the peel; the pen line is ~0.8 km wide here". The answer itself stays driven by the LSOA list.

**Covers:** Greater London plus Elmbridge and Hertsmere, because it works on England & Wales geographies.

**Weaknesses:**

- Georeferencing error.
- Subjective gap-closing.
- LSOAs near the line flip depending on the tracer. Mitigate by publishing the polygon, the GCPs and the RMS error.

### Definition B (data-driven alternative): a "price banana" at MSOA level

Use this only if you want a definition that stands on official data, and be honest that it is a *different* object from Sadka's shape. It uses the proxy Sadka himself invoked [2][4]: house prices.

- **Data:** ONS *House price statistics for small areas*, HPSSA Dataset 2: median price paid by MSOA, England & Wales, annual rolling-year data [22].
  - ONS notes that updates are now published in the *Housing affordability in England and Wales* datasets [22].
- **Geography:** MSOA (Dec 2021) [24], limited to Greater London plus the adjacent districts the banana touches (Elmbridge, Hertsmere; optionally Epsom & Ewell, Spelthorne).
- **Rule:** IN if median price paid (all property types, latest rolling year) ≥ **T**.
  - Choose T **objectively** by sweeping it and picking the value that maximises agreement (e.g. Jaccard/F1 on MSOAs) with Definition A. Publish T and the score.
  - Optionally require contiguity with a seed MSOA (e.g. Westminster 018, `E02000977`) so the result forms a single band.
- **Expected behaviour (hypothesis, not tested here):** a price threshold is likely to also admit places Sadka excluded, such as Notting Hill, Maida Vale, Chiswick, Dulwich and Blackheath. That is exactly what the public complaints were about [4][10][11][12]. The data-driven banana will therefore not look like the meme.

### Why *not* an age or "young professionals" definition

I tested the brief's hypothesis at local-authority level with Census 2021 bulk files from Nomis [23]. This is my own calculation:

- **TS007A** (Age by five-year bands): share aged 25–34.
- **TS067** (Highest level of qualification): share with "Level 4 qualifications and above", out of usual residents aged 16+.
- **TS054** (Tenure): share of households "Private rented".

| Local authority | Banana? (per [1]) | 25–34 % | Level 4+ % | Private rented % |
|---|---|---:|---:|---:|
| Tower Hamlets | Out | 27.5 | 50.3 | 38.2 |
| Wandsworth | In | 26.3 | 62.6 | 36.3 |
| Islington | In | 25.9 | 56.6 | 31.2 |
| Lambeth | Partly | 25.8 | 56.3 | 31.4 |
| Hackney | Out | 24.5 | 52.4 | 32.2 |
| Southwark | Partly | 23.8 | 54.9 | 28.7 |
| Hammersmith & Fulham | Partly | 23.4 | 57.6 | 36.4 |
| Westminster | In | 21.6 | 57.7 | 43.3 |
| Newham | Out | 20.7 | 40.2 | 38.5 |
| Camden | In | 20.2 | 57.3 | 35.6 |
| Kensington & Chelsea | In | 17.5 | 59.5 | 39.6 |
| Merton | Partly | 16.9 | 50.0 | 29.1 |
| Barnet | Largely in | 15.0 | 49.0 | 32.7 |
| Kingston upon Thames | In | 13.8 | 51.4 | 27.3 |
| Hertsmere (Herts) | Borehamwood in | 12.0 | 39.6 | 17.3 |
| Richmond upon Thames | Largely in | 11.3 | 60.4 | 24.7 |
| Elmbridge (Surrey) | Esher/Claygate/Oxshott in | 9.7 | 52.1 | 17.5 |

- **Age 25–34 is roughly anti-correlated with the banana's arms.** The highest young-adult shares are in Tower Hamlets and Hackney, which are out. Richmond, Elmbridge, Hertsmere, Kingston and Barnet, the banana's two ends, are among the lowest in the region.
- **Level 4+ fits better, but still admits East London.** Hackney and Tower Hamlets are above 50%.
- **Borough-level results hide the within-borough edges**, so this is only a sanity check.

If the site's real intent is "where young professionals live", it should use a separate label (e.g. "the 25–34 belt") and a TS007A-based rule, not call it the London Banana.

Exact reproducible sources for any Census-based variant:

- Nomis bulk zips: `https://www.nomisweb.co.uk/output/census/2021/census2021-ts007a.zip`, `…-ts067.zip`, `…-ts054.zip`.
- Each zip contains CSVs at `ctry`, `rgn`, `utla`, `ltla`, `msoa`, `lsoa` and `oa` level, keyed by `geography code` (GSS codes such as `E02000001`) [23].

## 5. Implementation notes

### Postcode → location / geography: postcodes.io

- **Single lookup:** `GET https://api.postcodes.io/postcodes/:postcode`. The lookup is case- and space-insensitive [21]. The response includes:
  - `latitude`, `longitude`, `eastings`, `northings`;
  - `admin_district`, `admin_ward`, `region`, `lsoa21`, `msoa21`, `oa21`;
  - a `codes` object with GSS codes, e.g. `codes.lsoa21`, `codes.msoa21`, `codes.admin_district`, `codes.admin_ward` [20][21][25].
  - A live check of `SW1A 1AA` returned `codes.lsoa21 = E01004736`, `codes.msoa21 = E02000977`, `codes.admin_district = E09000033`.
- **Not found:** a 404. Terminated postcodes return a `terminated` object with year/month and last lat/lng [21].
- **Bulk lookup:** `POST https://api.postcodes.io/postcodes` with `{"postcodes": [...]}`, **up to 100 postcodes per request**. Supports `?filter=postcode,longitude,latitude` [27]. Bulk reverse geocoding also accepts up to 100 geolocations [27][28].
- **Use the explicit `…21` fields.** The schema page describes `lsoa` as "2021 Census LSOA" while also calling `lsoa11` an "alias for the 'lsoa' field" [25]. Read `codes.lsoa21` / `codes.msoa21` to avoid ambiguity.
- **Rate limits: not documented.** The docs overview, licences and self-host pages [20][29][28] publish no public rate limit, and the live API returned no rate-limit headers when I checked. **Unverified.**
  - For production, cache results and consider self-hosting. There are two Docker images: `idealpostcodes/postcodes.io` (API) and `idealpostcodes/postcodes.io.db` (pre-seeded PostGIS with ONSPD, OS Open Names and the Scottish Postcode Directory).
  - Self-hosted limits such as `BULKLOOKUPS_POSTCODES_MAX=100` are configurable [28].
- **Data currency:** serves ONSPD, updated quarterly; "Currently loaded: August 2026" at time of writing [20].
- **Licence:** source code is MIT [29][30].
  - GB postcode data "may be used under the terms of the OS OpenData licence".
  - NI (`BT`) data falls under ONSPD/LPS terms, and commercial use needs an LPS licence.
  - Required attributions [29]:
    - "Contains Ordnance Survey data © Crown copyright and database right"
    - "Contains Royal Mail data © Royal Mail copyright and database right"
    - "Contains National Statistics data © Crown copyright and database right"
- **Known limitation: straddling.** Each postcode is assigned to areas by a single centroid, "the mean location of all addresses in that postcode". Addresses at the edge of a split postcode can be assigned to the neighbouring area [20].

### Offline alternative: ONS Postcode Directory (ONSPD) / NSPL

- **ONSPD:** all current and terminated UK postcodes, with 1 m grid references and lat/long.
  - It assigns administrative, health and other geographies by **point-in-polygon** on the postcode's grid reference [31][32].
  - Released quarterly in Feb, May, Aug and Nov, free, from the Open Geography Portal [31].
  - Current edition: **August 2026**, a CSV of about 2.31 GB [33].
  - Useful fields: `PCDS` (postcode with a single space), `LAT`, `LONG`, `OSEAST1M`/`OSNRTH1M`, `LSOA21`, `MSOA21` [32].
- **NSPL:** allocates postcodes to OAs the same way, but assigns **higher geographies by best-fit of OAs using Census population**, per the ONS postcode products page [31].
  - For LSOA/MSOA membership the two products should agree, because LSOAs and MSOAs are built from OAs. For wards and districts they can differ.
  - ONS also publishes a `Postcode_to_OA_(2021)_to_LSOA_to_MSOA_to_LAD…_Best_Fit_Lookup_in_EW` table [26].
- **Licence:** ONS postcode products, "derived from Code-Point® Open", are under the **Open Government Licence v3.0** [34][35]. ONS confirmed this in an FOI response [36]. Required attribution [34]:
  - "Contains OS data © Crown copyright and database right [year]"
  - "Contains Royal Mail data © Royal Mail copyright and database right [year]"
  - "Source: Office for National Statistics licensed under the Open Government Licence v.3.0"
  - Northern Ireland (`BT`) data needs a separate LPS licence for commercial use [34].

### Boundary files

- **ONS Open Geography Portal (England & Wales).** Required here because the banana extends into Surrey and Hertfordshire.
  - MSOA (Dec 2021) boundaries, EW. Versions: BFC (full, clipped), BFE (full, extent of the realm), BGC (generalised 20 m, clipped), BSC (super-generalised).
  - Available as GeoJSON, GPKG, SHP/ZIP, KML, CSV and an ArcGIS GeoServices REST API [24].
  - The equivalents exist for LSOA (Dec 2021), plus population-weighted centroids for LSOA and MSOA 2021 and name/code lookups. They are listed as services under ONS's ArcGIS organisation [26].
  - Wards (Dec 2024) and LAD (May 2025) boundaries are also there [26].
  - **Licence:** OGL v3.0. Attribution: "Source: Office for National Statistics licensed under the Open Government Licence v.3.0" and "Contains OS data © Crown copyright and database right [year]" [34][35].
- **London Datastore (GLA): "Statistical GIS Boundary Files for London".**
  - Includes `statistical-lsoa2021-boundaries-london-borough.zip` (Oct 2024) and `statistical-msoa2021-boundaries-london-borough`, plus 2011-era OA/LSOA/MSOA, ward (2014/2018), borough and Greater London boundaries, in ESRI and MapInfo formats [37].
  - The page requires the copyright lines "Contains National Statistics data © Crown copyright and database right" and "Contains Ordnance Survey data © Crown copyright and database right" [37].
  - **Greater London only**, so it can't represent the Elmbridge/Hertsmere parts of the banana. Use the ONS files instead.

### Point-in-polygon on lat/lng vs membership by LSOA/MSOA code

| | Point-in-polygon (postcode centroid inside traced polygon) | Code membership (postcode's `lsoa21` in a published list) |
|---|---|---|
| Fidelity to the drawing | Highest in principle, but false precision: the pen line is ~0.6–0.9 km wide | Slightly coarser (LSOAs hold ~1,000–1,500 residents [25]); edges follow real statistical units |
| Stability | Answers change if you tweak the trace | Stable, versioned list; easy to diff and audit |
| Explainability | "Your postcode is 120 m inside our trace" | "Your area (Wandsworth 012A) is in banana v1.0" |
| Runtime | Needs geometry and a point-in-polygon test, e.g. Turf.js `booleanPointInPolygon` | One API call plus a set lookup; no geometry shipped |
| Postcode straddling | Uses one centroid per postcode [20][32] | Same; the LSOA is also assigned from that centroid [32] |
| Joining other data (Census, prices) | Needs a spatial join | Direct join on GSS code |

**Recommendation:** build the traced polygon once (Definition A, steps 1–3). Derive the LSOA list offline (step 4). At runtime call postcodes.io, read `codes.lsoa21`, and check list membership. Optionally compute distance to the traced line for a "peel" caveat. Cache postcodes.io responses, or self-host if traffic grows.

## 6. Open questions / not verified

- **Base map identity.** "Maproom" appears as the Google Images source label on [1], and the style matches Maproom's Greater London districts map [8]. The exact product and edition are inferred, not confirmed.
- **Copyright of tracing.** The underlying map is a commercial Maproom product viewed via Google Images; the outline is Sadka's.
  - Deriving coordinates from it and publishing a list of LSOA codes is very different from republishing the image. However, I have not verified any licence position, and this is not legal advice.
  - Don't re-host the original image; link to the post [1].
- **Any later "official" revision.** I read the original thread [5] and the clarification [4] ("I can't fix this now"). I did not review all of Sadka's later posts, so a later redraw cannot be ruled out.
- **The Instagram version** "viewed more than 10 million times" [11] was not located.
- **Earliest use of the phrase.** No earlier "London Banana" (young-professional or otherwise) was found, but absence of evidence isn't proof.
- **postcodes.io public rate limit** is not published. It is unknown whether one is enforced.
- **Precise ground width of the stroke and the georeferencing error.** My ~0.6–0.9 km figure is a pixel-scale estimate; the real value depends on the georeference.
- **Clapham (Lambeth side).** The Telegraph says it is out [11], but it appears inside on [1]. This can't be resolved without a georeferenced trace.
- **Definition B's behaviour** (which MSOAs pass a price threshold, and how closely it matches Definition A) has **not** been computed. It is a hypothesis.
- **Sadka's claim** that violent crime "doubled" from 12,500 to 24,500 incidents per month since 2014 [5] is his own claim and was not checked. It is irrelevant to the boundary.

## Sources

Primary sources are unmarked; **(secondary)** marks press or third-party interpretation. X posts were read via the public fxtwitter mirror of the X API (`https://api.fxtwitter.com/Saul_Sadka/status/<id>`) on 23 Sep 2026, because x.com requires login.

1. Saul Sadka, "This is the London Banana…", X, 24 Aug 2025 13:29 UTC. <https://x.com/Saul_Sadka/status/1959609109939892706>. Image: <https://pbs.twimg.com/media/GzHuGDZWoAABg6w.jpg?name=orig>
2. Saul Sadka, "Here's the London Banana clearly visible on the latest house prices data…", X, 24 Aug 2025 21:31 UTC. <https://x.com/Saul_Sadka/status/1959730373556146580>. Image: <https://pbs.twimg.com/media/GzJcY6SWQAAh9Mn.jpg?name=orig>
3. Saul Sadka, "…latest map of voilent crime statistics with the Banana overlaid", X, 25 Aug 2025 09:35 UTC. <https://x.com/Saul_Sadka/status/1959912398552285651>. Image: <https://pbs.twimg.com/media/GzMB8IqWUAAxIxs.jpg?name=orig>
4. Saul Sadka, "…a few clarifications…" (quote-post of [1]), X, 25 Aug 2025 16:16 UTC. <https://x.com/Saul_Sadka/status/1960013397300224097>. Image: <https://pbs.twimg.com/media/GzNdulVXoAA_JNl.jpg?name=orig>
5. Thread Reader App unroll of [1] (8 posts, incl. the violent-crime plot post 1959913105183359391). <https://threadreaderapp.com/thread/1959609109939892706.html>
6. **(secondary, marketing)** Liveable, "The London Banana". <https://www.liveable.co.uk/the-london-banana>
7. plumplot.co.uk, "London house prices" (postcode-sector average price map, the base of [2]). <https://www.plumplot.co.uk/London-house-prices.html>
8. Maproom, "Map of Greater London districts and boroughs". <https://maproom.net/shop/map-greater-london-districts/>
9. **(secondary)** C. Ambrose, "Peeling back the 'London banana': Is life really much better inside it?", *The Standard*, 3 Sep 2025. <https://www.standard.co.uk/news/london/london-banana-house-prices-b1245819.html>
10. **(secondary)** C. Munro & J. Dunne, "Is life really better inside the 'London Banana'?", *Metro*, 1 Sep 2025. <https://metro.co.uk/2025/09/01/life-really-better-inside-london-banana-24047067/>
11. **(secondary)** A. Youens, "The truth about the 'London Banana' and the capital's property market", *The Telegraph*, 24 Sep 2025 (syndicated copy read via Yahoo). <https://www.telegraph.co.uk/money/property/buying-selling/truth-about-london-banana-capitals-property-market/>; <https://www.yahoo.com/lifestyle/articles/truth-london-banana-living-capital-060000143.html>
12. **(secondary)** "Do you live in the 'London banana'? New map sparks row…", *Daily Mail*, Aug/Sep 2025. <https://www.dailymail.com/news/article-15057381/Do-you-live-London-banana-post-loveliest-areas-city-horrible.html>
13. Rightmove Press Centre, "London's most in-demand areas lie outside the banana" (primary for Rightmove's own data; secondary for the banana). <https://www.rightmove.co.uk/press-centre/londons-most-in-demand-areas-lie-outside-the-banana/>
14. **(secondary)** E. Kettle, "The divisive London banana map explained, do you live in it?", *Your Local Guardian*. <https://www.yourlocalguardian.co.uk/news/25459969.divisive-london-banana-map-explained-live/>
15. **(secondary, unreliable)** Remitly, "What Is the London Banana?". <https://www.remitly.com/blog/en-gb/culture/what-is-the-london-banana/>
16. **(secondary, fan site)** "The London Banana — The Best of London's Golden Crescent". <https://thebanana.london/>
17. **(secondary)** N. Lewis, "Controversial banana splits opinion on London's most desirable areas", *The Negotiator*, 9 Sep 2025. <https://thenegotiator.co.uk/news/uk-housing-market-news/controversial-banana-splits-opinion-on-londons-most-desirable-areas-rightmove/>
18. **(secondary, community)** r/HENRYUK, "Is London Banana real?". <https://www.reddit.com/r/HENRYUK/comments/1n5zcud/is_london_banana_real/>
19. Roger Brunet, "Questions sur la banane bleue" (author's own account; cites R. Brunet, *Les villes « européennes »*, DATAR, 1989). <https://www.mgm.fr/ARECLUS/page_auteurs/Brunet14.html>
20. postcodes.io, "Overview" (data sources incl. ONSPD and OS Open Names, data currency, boundary straddling). <https://postcodes.io/docs/overview>
21. postcodes.io, "Lookup" (`GET /postcodes/:postcode`, 404/terminated behaviour). <https://postcodes.io/docs/postcode/lookup>. Live responses from <https://api.postcodes.io/postcodes/SW1A1AA> and `/KT109AA`, 23 Sep 2026.
22. ONS, "Median house prices by middle layer super output area: HPSSA dataset 2". <https://www.ons.gov.uk/peoplepopulationandcommunity/housing/datasets/hpssadataset2medianhousepricebymsoaquarterlyrollingyear>
23. Nomis, Census 2021 Topic Summaries (TS007/TS007A, TS054 Tenure, TS062, TS066, TS067). <https://www.nomisweb.co.uk/sources/census_2021_ts>. Bulk files: <https://www.nomisweb.co.uk/output/census/2021/census2021-ts007a.zip>, <https://www.nomisweb.co.uk/output/census/2021/census2021-ts067.zip>, <https://www.nomisweb.co.uk/output/census/2021/census2021-ts054.zip>
24. ONS Open Geography Portal, "Middle layer Super Output Areas (December 2021) Boundaries EW BGC (V3)". <https://geoportal.statistics.gov.uk/datasets/middle-layer-super-output-areas-december-2021-boundaries-ew-bgc-v3-2>. Catalogue: <https://www.data.gov.uk/dataset/677a5164-3a9e-4752-b8e6-5744d2b280ec/middle-layer-super-output-areas-december-2021-boundaries-ew-bgc-v3>
25. postcodes.io, "Postcode schema" (field definitions incl. `lsoa21`, `msoa21`, `codes.*`). <https://postcodes.io/docs/postcode/schema>
26. ONS ArcGIS REST services directory (LSOA/MSOA 2021 boundaries, `LSOA_PopCentroids_EW_2021_V4`, `MSOA_December_2021_EW_PWC_V2`, `OA_LSOA_MSOA_EW_DEC_2021_LU_v3`, postcode best-fit lookup, Wards Dec 2024, LAD May 2025, ONSPD). <https://services1.arcgis.com/ESMARspQHYMw9BZ9/arcgis/rest/services>
27. postcodes.io, "Bulk Lookup Postcodes" (`POST /postcodes`, ≤100). <https://postcodes.io/docs/postcode/bulk>; API ref <https://postcodes.io/docs/api/bulk-postcode-lookup>
28. postcodes.io, "Self Host" (Docker images; configurable request limits). <https://postcodes.io/docs/self-host>
29. postcodes.io, "Licences". <https://postcodes.io/docs/licences>
30. ideal-postcodes/postcodes.io on GitHub (MIT licence). <https://github.com/ideal-postcodes/postcodes.io>
31. ONS, "Postcode products" (ONSPD vs NSPL methodology; release cadence). <https://www.ons.gov.uk/methodology/geography/geographicalproducts/postcodeproducts>
32. ONS, *ONS Postcode Directory User Guide* (Feb 2025): Gridlink, point-in-polygon, PQI, field specs (`PCDS`, `LAT`, `OSEAST1M`, `LSOA21`, `MSOA21`). <https://www.ons.gov.uk/file?uri=%2Faboutus%2Ftransparencyandgovernance%2Ffreedomofinformationfoi%2Fukpostcodesandcorrespondinglocalauthorityfebruary2025%2Fonspduserguidefeb2025.pdf>
33. ONS, "ONS Postcode Directory (August 2026) for the United Kingdom (Hosted Table)". <https://open-geography-portalx-ons.hub.arcgis.com/datasets/ons::ons-postcode-directory-august-2026-for-the-united-kingdom-hosted-table-1>. Catalogue: <https://ckan.publishing.service.gov.uk/dataset/ons-postcode-directory-august-2026-for-the-united-kingdom-hosted-table>
34. ONS, "Licences" (geography products: boundaries, lookups, postcode products, attribution statements). <https://www.ons.gov.uk/methodology/geography/licences>
35. The National Archives, Open Government Licence v3.0. <https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/>
36. ONS FOI response, "Using the National Statistics Postcode Lookup (NSPL) and ONS Postcode Directory". <https://www.ons.gov.uk/aboutus/transparencyandgovernance/freedomofinformationfoi/usingthenationalstatisticspostcodelookupnsplandonspostcodedirectory>
37. London Datastore (GLA), "Statistical GIS Boundary Files for London". <https://data.london.gov.uk/dataset/statistical-gis-boundary-files-for-london-20od9/>
38. Géoconfluences (ENS Lyon), "Banane bleue" (quotes Brunet, *Mappemonde* 66, 2002). <https://geoconfluences.ens-lyon.fr/glossaire/banane-bleue>
