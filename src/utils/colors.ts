import type { LayerConfig } from '../config/layers';
import type { DataQuality, IndicatorClass, UrbanHeatGridFeature } from '../types/geo';

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

export function formatDataQuality(value: DataQuality | undefined) {
  const labels: Record<DataQuality, string> = {
    good: 'Good data coverage',
    partial: 'Partial data coverage',
    no_lst: 'Insufficient thermal data',
    mostly_water: 'Mostly water',
    no_data: 'No sufficient satellite data',
  };

  return value ? labels[value] ?? 'Unknown data coverage' : 'Not specified';
}

export function dataQualityColor(value: DataQuality | undefined) {
  const colors: Record<DataQuality, string> = {
    good: '',
    partial: '#d9c97c',
    no_lst: '#b9c2cc',
    mostly_water: '#8fb4c7',
    no_data: '#8a949f',
  };

  return value ? colors[value] ?? '#b8c2cc' : '';
}

export function getFeatureColor(feature: UrbanHeatGridFeature | undefined, layerConfig: LayerConfig) {
  const dataQuality = feature?.properties.data_quality;
  if (dataQuality && dataQuality !== 'good') {
    return dataQualityColor(dataQuality) || '#b8c2cc';
  }

  const className = feature?.properties[layerConfig.classField];
  return classToColor(className, layerConfig.palette);
}
