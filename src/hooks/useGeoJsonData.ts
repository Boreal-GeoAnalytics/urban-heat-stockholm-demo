import { useEffect, useState } from 'react';
import type { UrbanHeatGridCollection } from '../types/geo';

type GeoJsonState = {
  data: UrbanHeatGridCollection | null;
  error: string | null;
  loading: boolean;
};

function isFeatureCollection(value: unknown): value is UrbanHeatGridCollection {
  return (
    typeof value === 'object' &&
    value !== null &&
    'type' in value &&
    value.type === 'FeatureCollection' &&
    'features' in value &&
    Array.isArray(value.features)
  );
}

export function useGeoJsonData(): GeoJsonState {
  const [state, setState] = useState<GeoJsonState>({
    data: null,
    error: null,
    loading: true,
  });

  useEffect(() => {
    const controller = new AbortController();
    const dataUrl = `${import.meta.env.BASE_URL}data/stockholm_urban_heat_hotspot_grid.geojson`;

    async function loadGeoJson() {
      try {
        setState({ data: null, error: null, loading: true });

        const response = await fetch(dataUrl, { signal: controller.signal });
        if (!response.ok) {
          throw new Error(`Unable to load demo GeoJSON (${response.status} ${response.statusText}).`);
        }

        const json = (await response.json()) as unknown;
        if (!isFeatureCollection(json)) {
          throw new Error('The demo GeoJSON must be a valid FeatureCollection.');
        }

        setState({ data: json, error: null, loading: false });
      } catch (error) {
        if (controller.signal.aborted) {
          return;
        }

        const message = error instanceof Error ? error.message : 'Unable to load the demo GeoJSON.';
        setState({
          data: null,
          error: `${message} Check that public/data/stockholm_urban_heat_hotspot_grid.geojson exists and matches the expected schema.`,
          loading: false,
        });
      }
    }

    void loadGeoJson();

    return () => controller.abort();
  }, []);

  return state;
}
