import type { DemoLayer } from './MapView';

type LegendItem = {
  label: string;
  color: string;
};

const legends: Record<DemoLayer, { title: string; items: LegendItem[] }> = {
  temperature: {
    title: 'Land Surface Temperature',
    items: [
      { label: 'Moderate', color: '#f6d38b' },
      { label: 'High', color: '#f08a4b' },
      { label: 'Very high', color: '#c9432f' },
    ],
  },
  vegetation: {
    title: 'Vegetation Cooling Potential',
    items: [
      { label: 'Low', color: '#d7c35c' },
      { label: 'Moderate', color: '#8abf5a' },
      { label: 'High', color: '#2f8f5b' },
    ],
  },
  priority: {
    title: 'Heat Exposure Priority',
    items: [
      { label: 'Watch', color: '#f4d35e' },
      { label: 'Targeted action', color: '#f49e4c' },
      { label: 'Priority intervention', color: '#b8323a' },
    ],
  },
  context: {
    title: 'Water and Green-Space Context',
    items: [
      { label: 'Water influence', color: '#6bb6d6' },
      { label: 'Green corridor', color: '#5aa36f' },
      { label: 'Dense urban fabric', color: '#9d8f7f' },
    ],
  },
};

type LegendProps = {
  activeLayer: DemoLayer;
};

function Legend({ activeLayer }: LegendProps) {
  const legend = legends[activeLayer];

  return (
    <div className="legend" aria-label={`${legend.title} legend`}>
      <p className="eyebrow">Legend</p>
      <h2>{legend.title}</h2>
      <div className="legend-items">
        {legend.items.map((item) => (
          <div className="legend-row" key={item.label}>
            <span className="legend-swatch" style={{ backgroundColor: item.color }} />
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Legend;
