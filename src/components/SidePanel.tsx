type SidePanelProps = {
  description: string;
};

const indicators = [
  {
    name: 'Land surface temperature class',
    text: 'A simplified thermal intensity layer showing relative summer surface temperature patterns.',
  },
  {
    name: 'Vegetation cooling potential',
    text: 'An NDVI-style indicator describing where canopy, parks, and vegetated corridors may reduce heat stress.',
  },
  {
    name: 'Heat exposure priority zones',
    text: 'A planning-focused synthesis of heat intensity, imperviousness, and local cooling capacity.',
  },
  {
    name: 'Water and green-space context',
    text: 'A communication layer highlighting blue-green infrastructure relationships around the city core.',
  },
];

function SidePanel({ description }: SidePanelProps) {
  return (
    <aside className="side-panel" aria-label="Urban heat indicators">
      <p className="eyebrow">Method Demonstration</p>
      <h2>Environmental Exposure Mapping</h2>
      <p>{description}</p>

      <div className="indicator-list">
        {indicators.map((indicator) => (
          <article className="indicator-card" key={indicator.name}>
            <h3>{indicator.name}</h3>
            <p>{indicator.text}</p>
          </article>
        ))}
      </div>
    </aside>
  );
}

export default SidePanel;
