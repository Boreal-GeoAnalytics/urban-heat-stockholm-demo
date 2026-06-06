import type {
  ClassPropertyField,
  DemoLayer,
  IndicatorClass,
  NumericPropertyField,
  UrbanHeatGridProperties,
} from '../types/geo';
import { formatNumber } from '../utils/colors';

export type LayerConfig = {
  id: DemoLayer;
  label: string;
  shortLabel: string;
  description: string;
  field: NumericPropertyField;
  classField: ClassPropertyField;
  legendTitle: string;
  palette: Record<IndicatorClass, string>;
  formatValue: (value: number, properties?: UrbanHeatGridProperties) => string;
};

export const layerConfigs: Record<DemoLayer, LayerConfig> = {
  heat_exposure: {
    id: 'heat_exposure',
    label: 'Heat Exposure Hotspots',
    shortLabel: 'Heat Exposure',
    description: 'Composite hotspot signal from surface temperature and urban exposure conditions.',
    field: 'heat_exposure_index',
    classField: 'heat_exposure_class',
    legendTitle: 'Heat Exposure Hotspots',
    palette: {
      low: '#f5e7a1',
      moderate: '#f4bf5f',
      high: '#e66f43',
      very_high: '#b8323a',
    },
    formatValue: (value) => `${formatNumber(value, 0)} / 100`,
  },
  cooling_priority: {
    id: 'cooling_priority',
    label: 'Cooling Intervention Priority',
    shortLabel: 'Cooling Priority',
    description: 'Planning priority for tree canopy, shade, surface cooling, and blue-green interventions.',
    field: 'cooling_intervention_priority',
    classField: 'cooling_priority_class',
    legendTitle: 'Cooling Intervention Priority',
    palette: {
      low: '#d6ece8',
      moderate: '#f4d35e',
      high: '#f49e4c',
      very_high: '#a92f41',
    },
    formatValue: (value) => `${formatNumber(value, 0)} / 100`,
  },
  green_cooling: {
    id: 'green_cooling',
    label: 'Green Cooling Capacity',
    shortLabel: 'Green Cooling',
    description: 'Relative cooling capacity associated with vegetation condition and green-blue context.',
    field: 'green_cooling_capacity',
    classField: 'green_cooling_class',
    legendTitle: 'Green Cooling Capacity',
    palette: {
      low: '#d9c75f',
      moderate: '#9fc76f',
      high: '#5aa36f',
      very_high: '#1f7a5c',
    },
    formatValue: (value) => `${formatNumber(value, 0)} / 100`,
  },
  impervious_pressure: {
    id: 'impervious_pressure',
    label: 'Impervious Surface Pressure',
    shortLabel: 'Impervious Pressure',
    description: 'Pressure from built surfaces that can amplify stored heat and reduce infiltration.',
    field: 'impervious_surface_pressure',
    classField: 'impervious_pressure_class',
    legendTitle: 'Impervious Surface Pressure',
    palette: {
      low: '#d9edf3',
      moderate: '#9db8bf',
      high: '#7b756e',
      very_high: '#4c4240',
    },
    formatValue: (value) => `${formatNumber(value, 0)} / 100`,
  },
};

export const layerOrder: DemoLayer[] = [
  'heat_exposure',
  'cooling_priority',
  'green_cooling',
  'impervious_pressure',
];
