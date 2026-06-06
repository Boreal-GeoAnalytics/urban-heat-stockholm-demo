import type { Feature, FeatureCollection, Geometry } from 'geojson';

export type IndicatorClass = 'low' | 'moderate' | 'high' | 'very_high';

export type DemoLayer = 'heat_exposure' | 'cooling_priority' | 'green_cooling' | 'impervious_pressure';

export type DataQuality = 'good' | 'partial' | 'no_lst' | 'mostly_water' | 'no_data';

export type RoiMode = 'bbox' | 'central' | 'municipality';

export type UrbanHeatGridProperties = {
  grid_id: string;
  roi_mode?: RoiMode;
  region_overlap_fraction?: number;
  cell_area_m2?: number;
  intersection_area_m2?: number;
  data_quality?: DataQuality;
  valid_lst?: number;
  valid_s2?: number;
  valid_dw?: number;
  valid_core_indices?: number;
  water_fraction?: number | null;
  land_fraction?: number | null;
  mean_lst_c?: number | null;
  mean_ndvi?: number | null;
  mean_ndbi?: number | null;
  mean_ndwi?: number | null;
  green_cooling_capacity?: number | null;
  impervious_surface_pressure?: number | null;
  heat_exposure_index?: number | null;
  cooling_intervention_priority?: number | null;
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
