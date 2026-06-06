# Stockholm Urban Heat Hotspots & Cooling Priority

A public frontend demonstration for **Boreal GeoAnalytics**. The app visualizes GeoJSON-based hotspot indicators for Stockholm, Sweden using Vite, React, TypeScript, and Leaflet.

This is a static website prototype for communicating urban heat exposure, green cooling capacity, impervious surface pressure, and cooling intervention priority. It is not a production analytical platform.

## What The Demo Shows

The dashboard presents four public-facing map layers:

- Heat Exposure Hotspots
- Cooling Intervention Priority
- Green Cooling Capacity
- Impervious Surface Pressure

Internally, the map visualizes a GeoJSON grid. The current version uses a lightweight synthetic grid so the interface can run as a static public demo.

## Data Strategy

The app loads its public GeoJSON file at runtime from:

```text
public/data/stockholm_urban_heat_hotspot_grid.geojson
```

At build and deployment time, Vite serves that file under the configured GitHub Pages base path:

```text
/urban-heat-stockholm-demo/data/stockholm_urban_heat_hotspot_grid.geojson
```

The frontend does **not** run Google Earth Engine in the browser. A future Earth Engine workflow can export a validated GeoJSON grid with the same property schema, and this file can be replaced without changing the UI architecture.

## Expected GeoJSON Schema

Each feature should include:

- `grid_id`
- `mean_lst_c`
- `mean_ndvi`
- `mean_ndbi`
- `mean_ndwi`
- `green_cooling_capacity`
- `impervious_surface_pressure`
- `heat_exposure_index`
- `cooling_intervention_priority`
- `heat_exposure_class`
- `cooling_priority_class`
- `green_cooling_class`
- `impervious_pressure_class`
- `hotspot_label`
- `planning_relevance`
- `suggested_intervention`

Class fields should use:

```text
low | moderate | high | very_high
```

Public index fields must use a `0–100` scale so legends, popups, and summary metrics remain comparable:

- `green_cooling_capacity`
- `impervious_surface_pressure`
- `heat_exposure_index`
- `cooling_intervention_priority`

The first real GEE export should be tested as a pilot GeoJSON before replacing the public demo dataset.

## Run Locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deploy To GitHub Pages

The Vite base path is configured in `vite.config.ts`:

```ts
base: '/urban-heat-stockholm-demo/'
```

The workflow at `.github/workflows/deploy.yml` builds the static site and deploys the `dist` artifact to GitHub Pages.

To deploy:

1. Enable GitHub Pages for the repository.
2. Select **GitHub Actions** as the Pages source.
3. Push to `main` or run the workflow manually.

## Data Notice

The included data are synthetic and simplified unless replaced by a validated Earth Engine export. The app is intended for public communication and methodological illustration only. It does not represent an official heat-risk assessment for Stockholm.
