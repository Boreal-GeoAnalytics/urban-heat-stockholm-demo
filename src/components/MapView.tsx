import { useEffect, useMemo, useState } from 'react';
import { GeoJSON, MapContainer, TileLayer, useMap } from 'react-leaflet';
import { geoJSON as leafletGeoJSON } from 'leaflet';
import type { Layer, LeafletMouseEvent, Path, PathOptions } from 'leaflet';
import { layerConfigs, layerOrder } from '../config/layers';
import { useGeoJsonData } from '../hooks/useGeoJsonData';
import type { DemoLayer, UrbanHeatGridCollection, UrbanHeatGridFeature } from '../types/geo';
import { formatClassLabel, formatNumber, getFeatureColor } from '../utils/colors';
import { escapeHtml } from '../utils/html';
import Legend from './Legend';
import MetricSummary from './MetricSummary';

const defaultCenter: [number, number] = [59.3293, 18.0686];

function FitBounds({ data }: { data: UrbanHeatGridCollection | null }) {
  const map = useMap();

  useEffect(() => {
    if (!data || data.features.length === 0) {
      return;
    }

    const bounds = leafletGeoJSON(data).getBounds();
    if (bounds.isValid()) {
      map.fitBounds(bounds, { padding: [24, 24], maxZoom: 12 });
    }
  }, [data, map]);

  return null;
}

function styleFeature(feature: UrbanHeatGridFeature | undefined, activeLayer: DemoLayer): PathOptions {
  return {
    color: '#102a43',
    fillColor: getFeatureColor(feature, layerConfigs[activeLayer]),
    fillOpacity: 0.7,
    opacity: 0.72,
    weight: 1.1,
  };
}

function popupContent(feature: UrbanHeatGridFeature) {
  const props = feature.properties;
  const gridId = escapeHtml(props.grid_id);
  const hotspotLabel = escapeHtml(props.hotspot_label);
  const planningRelevance = escapeHtml(props.planning_relevance);
  const suggestedIntervention = escapeHtml(props.suggested_intervention);

  return `
    <section class="map-popup">
      <h3>${hotspotLabel}</h3>
      <p><strong>Grid ID:</strong> ${gridId}</p>
      <p><strong>Heat exposure:</strong> ${formatClassLabel(props.heat_exposure_class)} (${formatNumber(
        props.heat_exposure_index,
        0,
      )} / 100)</p>
      <p><strong>Cooling priority:</strong> ${formatClassLabel(props.cooling_priority_class)} (${formatNumber(
        props.cooling_intervention_priority,
        0,
      )} / 100)</p>
      <p><strong>Mean LST:</strong> ${formatNumber(props.mean_lst_c, 1)} °C</p>
      <p><strong>NDVI:</strong> ${formatNumber(props.mean_ndvi, 2)}</p>
      <p><strong>Impervious pressure:</strong> ${formatNumber(props.impervious_surface_pressure, 0)} / 100</p>
      <p><strong>Green cooling capacity:</strong> ${formatNumber(props.green_cooling_capacity, 0)} / 100</p>
      <p><strong>Planning relevance:</strong> ${planningRelevance}</p>
      <p><strong>Suggested intervention:</strong> ${suggestedIntervention}</p>
    </section>
  `;
}

function selectedRows(feature: UrbanHeatGridFeature) {
  const props = feature.properties;

  return [
    ['Grid ID', props.grid_id],
    ['Heat exposure', `${formatClassLabel(props.heat_exposure_class)} (${formatNumber(props.heat_exposure_index, 0)} / 100)`],
    [
      'Cooling priority',
      `${formatClassLabel(props.cooling_priority_class)} (${formatNumber(props.cooling_intervention_priority, 0)} / 100)`,
    ],
    ['Mean LST', `${formatNumber(props.mean_lst_c, 1)} °C`],
    ['NDVI', formatNumber(props.mean_ndvi, 2)],
    ['Impervious pressure', `${formatNumber(props.impervious_surface_pressure, 0)} / 100`],
    ['Green cooling capacity', `${formatNumber(props.green_cooling_capacity, 0)} / 100`],
  ];
}

function MapView() {
  const [activeLayer, setActiveLayer] = useState<DemoLayer>('heat_exposure');
  const [selectedFeature, setSelectedFeature] = useState<UrbanHeatGridFeature | null>(null);
  const { data, error, loading } = useGeoJsonData();
  const activeConfig = layerConfigs[activeLayer];

  const featureCountLabel = useMemo(() => {
    const count = data?.features.length ?? 0;
    return count === 1 ? '1 grid cell loaded' : `${count.toLocaleString('en-US')} grid cells loaded`;
  }, [data]);

  function bindInteractions(feature: UrbanHeatGridFeature, layer: Layer) {
    layer.bindPopup(popupContent(feature), { maxWidth: 340 });

    layer.on({
      click: () => setSelectedFeature(feature),
      mouseout: (event: LeafletMouseEvent) => {
        const target = event.target as Path;
        target.setStyle(styleFeature(feature, activeLayer));
      },
      mouseover: (event: LeafletMouseEvent) => {
        const target = event.target as Path;
        target.setStyle({
          color: '#006AA7',
          fillOpacity: 0.86,
          opacity: 1,
          weight: 2.4,
        });
        target.bringToFront();
      },
    });
  }

  return (
    <div className="map-dashboard">
      <MetricSummary data={data} />

      <div className="map-card">
        <div className="map-toolbar" aria-label="Layer controls">
          <div>
            <p className="eyebrow">Hotspot Layers</p>
            <h2>{activeConfig.label}</h2>
            <p>{activeConfig.description}</p>
          </div>
          <div className="segmented-control" role="radiogroup" aria-label="Map demonstration layer">
            {layerOrder.map((layerId) => {
              const option = layerConfigs[layerId];

              return (
                <button
                  aria-checked={activeLayer === option.id}
                  className={activeLayer === option.id ? 'active' : ''}
                  key={option.id}
                  onClick={() => setActiveLayer(option.id)}
                  role="radio"
                  type="button"
                >
                  {option.shortLabel}
                </button>
              );
            })}
          </div>
        </div>

        {selectedFeature && (
          <aside className="selected-feature-panel" aria-label="Selected grid cell details">
            <div>
              <p className="eyebrow">Selected Hotspot</p>
              <h3>{selectedFeature.properties.hotspot_label}</h3>
            </div>
            <dl>
              {selectedRows(selectedFeature).map(([label, value]) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
            <p>{selectedFeature.properties.planning_relevance}</p>
            <p>
              <strong>Suggested intervention:</strong> {selectedFeature.properties.suggested_intervention}
            </p>
          </aside>
        )}

        <div className="map-wrap">
          {loading && <div className="map-state loading-state">Loading Stockholm hotspot grid...</div>}
          {error && <div className="map-state error-state">{error}</div>}
          <MapContainer center={defaultCenter} zoom={11} minZoom={10} maxZoom={15} scrollWheelZoom>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {data && (
              <>
                <FitBounds data={data} />
                <GeoJSON
                  data={data}
                  key={activeLayer}
                  onEachFeature={(feature, layer) => bindInteractions(feature as UrbanHeatGridFeature, layer)}
                  style={(feature) => styleFeature(feature as UrbanHeatGridFeature, activeLayer)}
                />
              </>
            )}
          </MapContainer>
          <div className="map-status">{loading ? 'Loading data...' : error ? 'Data unavailable' : featureCountLabel}</div>
          <Legend activeLayer={activeLayer} />
        </div>
      </div>
    </div>
  );
}

export default MapView;
