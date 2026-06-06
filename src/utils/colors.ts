import type { LayerConfig } from '../config/layers';
import type { IndicatorClass, UrbanHeatGridFeature } from '../types/geo';

export function formatClassLabel(className: IndicatorClass) {
  const labels: Record<IndicatorClass, string> = {
    low: 'Low',
    moderate: 'Moderate',
    high: 'High',
    very_high: 'Very high',
  };

  return labels[className];
}

export function formatNumber(value: number | null | undefined, decimals = 1) {
  if (typeof value !== 'number' || Number.isNaN(value)) {
    return 'n/a';
  }

  return value.toLocaleString('en-US', {
    maximumFractionDigits: decimals,
    minimumFractionDigits: decimals,
  });
}

export function classToColor(className: IndicatorClass | undefined, palette: LayerConfig['palette']) {
  if (!className) {
    return '#b8c2cc';
  }

  return palette[className] ?? '#b8c2cc';
}

export function getFeatureColor(feature: UrbanHeatGridFeature | undefined, layerConfig: LayerConfig) {
  const className = feature?.properties[layerConfig.classField];
  return classToColor(className, layerConfig.palette);
}
