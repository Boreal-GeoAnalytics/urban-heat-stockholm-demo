import { useState } from 'react';
import { GeoJSON, MapContainer, TileLayer } from 'react-leaflet';
import type { Feature, FeatureCollection, Geometry } from 'geojson';
import type { Layer, PathOptions } from 'leaflet';
import Legend from './Legend';
import stockholmZonesRaw from '../data/stockholm_demo_zones.geojson?raw';

export type DemoLayer = 'temperature' | 'vegetation' | 'priority' | 'context';

type ZoneProperties = {
  zone_name: string;
  mean_lst_c: number;
  ndvi: number;
  impervious_level: 'Low' | 'Moderate' | 'High' | 'Very high';
  heat_exposure_class: 'Moderate' | 'High' | 'Very high';
  planning_relevance: string;
  context_class: 'Water influence' | 'Green corridor' | 'Dense urban fabric';
};

type ZoneFeature = Feature<Geometry, ZoneProperties>;
type ZoneCollection = FeatureCollection<Geometry, ZoneProperties>;

const zones = JSON.parse(stockholmZonesRaw) as ZoneCollection;

const layerOptions: { id: DemoLayer; label: string }[] = [
  { id: 'temperature', label: 'Temperature' },
  { id: 'vegetation', label: 'Vegetation' },
  { id: 'priority', label: 'Priority Zones' },
  { id: 'context', label: 'Blue-Green Context' },
];

const temperatureColors: Record<ZoneProperties['heat_exposure_class'], string> = {
  Moderate: '#f6d38b',
  High: '#f08a4b',
  'Very high': '#c9432f',
};

const priorityColors: Record<ZoneProperties['heat_exposure_class'], string> = {
  Moderate: '#f4d35e',
  High: '#f49e4c',
  'Very high': '#b8323a',
};

const contextColors: Record<ZoneProperties['context_class'], string> = {
  'Water influence': '#6bb6d6',
  'Green corridor': '#5aa36f',
  'Dense urban fabric': '#9d8f7f',
};

function vegetationColor(ndvi: number) {
  if (ndvi >= 0.48) return '#2f8f5b';
  if (ndvi >= 0.34) return '#8abf5a';
  return '#d7c35c';
}

function styleFeature(feature: ZoneFeature | undefined, activeLayer: DemoLayer): PathOptions {
  const properties = feature?.properties;

  if (!properties) {
    return { color: '#006AA7', fillColor: '#006AA7', fillOpacity: 0.4, weight: 1 };
  }

  const fillColor =
    activeLayer === 'temperature'
      ? temperatureColors[properties.heat_exposure_class]
      : activeLayer === 'vegetation'
        ? vegetationColor(properties.ndvi)
        : activeLayer === 'priority'
          ? priorityColors[properties.heat_exposure_class]
          : contextColors[properties.context_class];

  return {
    color: '#102a43',
    fillColor,
    fillOpacity: activeLayer === 'context' ? 0.56 : 0.68,
    opacity: 0.72,
    weight: 1.4,
  };
}

function bindPopup(feature: ZoneFeature, layer: Layer) {
  const props = feature.properties;
  layer.bindPopup(`
    <section class="map-popup">
      <h3>Zone: ${props.zone_name}</h3>
      <p><strong>Mean land surface temperature:</strong> ${props.mean_lst_c.toFixed(1)} °C</p>
      <p><strong>Vegetation index:</strong> ${props.ndvi.toFixed(2)}</p>
      <p><strong>Impervious surface level:</strong> ${props.impervious_level}</p>
      <p><strong>Heat exposure class:</strong> ${props.heat_exposure_class}</p>
      <p><strong>Planning relevance:</strong> ${props.planning_relevance}</p>
    </section>
  `);
}

function MapView() {
  const [activeLayer, setActiveLayer] = useState<DemoLayer>('temperature');

  return (
    <div className="map-card">
      <div className="map-toolbar" aria-label="Layer controls">
        <div>
          <p className="eyebrow">Layer Controls</p>
          <h2>Stockholm Demo Map</h2>
        </div>
        <div className="segmented-control" role="radiogroup" aria-label="Map demonstration layer">
          {layerOptions.map((option) => (
            <button
              aria-checked={activeLayer === option.id}
              className={activeLayer === option.id ? 'active' : ''}
              key={option.id}
              onClick={() => setActiveLayer(option.id)}
              role="radio"
              type="button"
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className="map-wrap">
        <MapContainer center={[59.3293, 18.0686]} zoom={11} minZoom={10} maxZoom={15} scrollWheelZoom>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <GeoJSON
            data={zones}
            key={activeLayer}
            onEachFeature={(feature, layer) => bindPopup(feature as ZoneFeature, layer)}
            style={(feature) => styleFeature(feature as ZoneFeature, activeLayer)}
          />
        </MapContainer>
        <Legend activeLayer={activeLayer} />
      </div>
    </div>
  );
}

export default MapView;
