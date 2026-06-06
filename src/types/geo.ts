import type { Feature, FeatureCollection, Geometry } from 'geojson';

export type IndicatorClass = 'low' | 'moderate' | 'high' | 'very_high';

export type DemoLayer = 'heat_exposure' | 'cooling_priority' | 'green_cooling' | 'impervious_pressure';

export type UrbanHeatGridProperties = {
  grid_id: string;
  mean_lst_c: number;
  mean_ndvi: number;
  mean_ndbi: number;
  mean_ndwi: number;
  green_cooling_capacity: number;
  impervious_surface_pressure: number;
  heat_exposure_index: number;
  cooling_intervention_priority: number;
  heat_exposure_class: IndicatorClass;
  cooling_priority_class: IndicatorClass;
  green_cooling_class: IndicatorClass;
  impervious_pressure_class: IndicatorClass;
  hotspot_label: string;
  planning_relevance: string;
  suggested_intervention: string;
};

export type UrbanHeatGridFeature = Feature<Geometry, UrbanHeatGridProperties>;

export type UrbanHeatGridCollection = FeatureCollection<Geometry, UrbanHeatGridProperties>;

export type NumericPropertyField =
  | 'mean_lst_c'
  | 'mean_ndvi'
  | 'mean_ndbi'
  | 'mean_ndwi'
  | 'green_cooling_capacity'
  | 'impervious_surface_pressure'
  | 'heat_exposure_index'
  | 'cooling_intervention_priority';

export type ClassPropertyField =
  | 'heat_exposure_class'
  | 'cooling_priority_class'
  | 'green_cooling_class'
  | 'impervious_pressure_class';
