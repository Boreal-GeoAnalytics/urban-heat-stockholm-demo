const indicators = [
  {
    name: 'Heat Exposure Hotspots',
    text: 'Identifies areas where elevated surface temperature and urban form combine into higher exposure signals.',
  },
  {
    name: 'Cooling Intervention Priority',
    text: 'Highlights where planning action may have the strongest value for shade, vegetation, and surface cooling.',
  },
  {
    name: 'Green Cooling Capacity',
    text: 'Summarizes vegetation and green-blue conditions that can moderate urban heat.',
  },
  {
    name: 'Impervious Surface Pressure',
    text: 'Shows where dense built surfaces may retain heat and reduce local cooling potential.',
  },
];

function SidePanel() {
  return (
    <aside className="side-panel" aria-label="Urban climate intelligence">
      <p className="eyebrow">Boreal GeoAnalytics</p>
      <h2>Urban Climate Intelligence</h2>
      <p>
        This satellite-based demonstration shows how heat exposure, cooling capacity, and priority areas can be mapped
        for urban climate adaptation planning.
      </p>

      <div className="method-note">
        <h3>Method logic</h3>
        <p>Thermal signal + surface composition + green-blue cooling = planning-ready hotspot indicators.</p>
      </div>

      <div className="indicator-list">
        {indicators.map((indicator) => (
          <article className="indicator-card" key={indicator.name}>
            <h3>{indicator.name}</h3>
            <p>{indicator.text}</p>
          </article>
        ))}
      </div>

      <div className="version-note">
        <h3>Current version</h3>
        <p>
          This first version uses a lightweight GeoJSON grid for interaction. Raster tiles may be added later.
        </p>
      </div>
    </aside>
  );
}

export default SidePanel;
