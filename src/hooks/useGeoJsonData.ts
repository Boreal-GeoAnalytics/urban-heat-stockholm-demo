import { useEffect, useState } from 'react';
import type { DataQuality, IndicatorClass, RoiMode, UrbanHeatGridCollection, UrbanHeatGridProperties } from '../types/geo';

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

const textFields = ['grid_id', 'hotspot_label', 'planning_relevance', 'suggested_intervention'] as const;

const numericFields = [
  'mean_lst_c',
  'mean_ndvi',
  'mean_ndbi',
  'mean_ndwi',
  'green_cooling_capacity',
  'impervious_surface_pressure',
  'heat_exposure_index',
  'cooling_intervention_priority',
] as const;

const classFields = [
  'heat_exposure_class',
  'cooling_priority_class',
  'green_cooling_class',
  'impervious_pressure_class',
] as const;

const validClasses = new Set<IndicatorClass>(['low', 'moderate', 'high', 'very_high']);
const validDataQuality = new Set<DataQuality>(['good', 'partial', 'no_lst', 'mostly_water', 'no_data']);
const validRoiModes = new Set<RoiMode>(['bbox', 'central', 'municipality']);
const nullExplainingQualities = new Set<DataQuality>(['partial', 'no_lst', 'mostly_water', 'no_data']);

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function validateProperties(properties: unknown, featureIndex: number): asserts properties is UrbanHeatGridProperties {
  if (!isRecord(properties)) {
    throw new Error(`Feature ${featureIndex + 1} is missing a properties object.`);
  }

  const dataQuality = properties.data_quality;
  if (dataQuality !== undefined && (typeof dataQuality !== 'string' || !validDataQuality.has(dataQuality as DataQuality))) {
    throw new Error(`Feature ${featureIndex + 1} has an invalid data_quality value.`);
  }

  const roiMode = properties.roi_mode;
  if (roiMode !== undefined && (typeof roiMode !== 'string' || !validRoiModes.has(roiMode as RoiMode))) {
    throw new Error(`Feature ${featureIndex + 1} has an invalid roi_mode value.`);
  }

  for (const field of textFields) {
    const value = properties[field];
    if (typeof value !== 'string') {
      throw new Error(`Feature ${featureIndex + 1} has an invalid or missing text field: ${field}.`);
    }
  }

  for (const field of numericFields) {
    const value = properties[field];
    if (value === null && typeof dataQuality === 'string' && nullExplainingQualities.has(dataQuality as DataQuality)) {
      continue;
    }
    if (typeof value !== 'number' || Number.isNaN(value)) {
      throw new Error(`Feature ${featureIndex + 1} has an invalid or missing numeric field: ${field}.`);
    }
  }

  for (const field of ['region_overlap_fraction', 'cell_area_m2', 'intersection_area_m2'] as const) {
    const value = properties[field];
    if (value !== undefined && (typeof value !== 'number' || Number.isNaN(value))) {
      throw new Error(`Feature ${featureIndex + 1} has an invalid numeric metadata field: ${field}.`);
    }
  }

  for (const field of classFields) {
    const value = properties[field];
    if (typeof value !== 'string' || !validClasses.has(value as IndicatorClass)) {
      throw new Error(
        `Feature ${featureIndex + 1} has an invalid class field: ${field}. Use low, moderate, high, or very_high.`,
      );
    }
  }
}

function validateGeoJson(data: UrbanHeatGridCollection) {
  data.features.forEach((feature, index) => {
    validateProperties(feature.properties, index);
  });
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

        validateGeoJson(json);

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
