function SidePanel() {
  return (
    <aside className="side-panel" aria-label="Urban climate intelligence">
      <section className="side-section">
        <h2>Urban Climate Intelligence</h2>
        <p>
          This prototype demonstrates how satellite-derived indicators can support urban heat exposure, green cooling
          capacity, and cooling-priority mapping for Stockholm.
        </p>
      </section>

      <section className="side-section">
        <h3>How to read the map</h3>
        <p>
          Switch between layers to compare heat exposure, cooling priority, green cooling capacity, and impervious
          surface pressure. Darker colors indicate higher relative values. Click a cell to inspect local indicators.
        </p>
      </section>

      <section className="side-section">
        <h3>Prototype note</h3>
        <p>
          This is a public demonstration using simplified or prototype data. It does not represent an official heat-risk
          assessment for Stockholm.
        </p>
      </section>

      <details className="method-limitations">
        <summary>Method &amp; limitations</summary>
        <div>
          <p>Thermal signal + surface composition + green-blue cooling = planning-ready hotspot indicators.</p>
          <p>
            The current version uses a lightweight GeoJSON grid for interaction. Raster tiles may be added later.
          </p>
          <p>
            Layer values are simplified for public communication and methodological illustration. Interpret patterns as
            relative prototype signals, not as validated operational risk classifications.
          </p>
        </div>
      </details>
    </aside>
  );
}

export default SidePanel;
