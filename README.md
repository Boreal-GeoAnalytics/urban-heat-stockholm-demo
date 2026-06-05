# Stockholm Urban Heat Demonstration

A production-ready static web demonstration for **Boreal GeoAnalytics** showing how urban heat and environmental exposure indicators can be communicated through an interactive geospatial interface for Stockholm, Sweden.

The demo includes:

- A Leaflet basemap centered on Stockholm with OpenStreetMap attribution.
- Simplified demonstration polygons for land surface temperature, vegetation cooling potential, heat exposure priority zones, and blue-green context.
- Layer controls, a legend, and zone popups with planning-relevant attributes.
- Responsive consulting-company styling using Boreal GeoAnalytics branding and a Swedish flag-inspired palette.

## Data Notice

The included GeoJSON data are synthetic and simplified. They are intended for public communication and methodological illustration only, not operational planning, regulatory analysis, or production environmental assessment.

## Run Locally

Install dependencies and start the Vite development server:

```bash
npm install
npm run dev
```

Build the static site:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## GitHub Pages Deployment

The app is configured for GitHub Pages with the Vite base path:

```ts
base: '/urban-heat-stockholm-demo/'
```

The workflow at `.github/workflows/deploy.yml` builds the app and deploys the `dist` artifact to GitHub Pages when changes are pushed to `main`, or when the workflow is run manually.

Before deployment, enable GitHub Pages for the repository and select **GitHub Actions** as the Pages source.

## Prototype Scope

This is a public-facing demonstration prototype for a company website. It does not use private API keys, backend services, client data, or proprietary datasets. Production-level assessments can be adapted to specific cities, datasets, and decision-making needs.
