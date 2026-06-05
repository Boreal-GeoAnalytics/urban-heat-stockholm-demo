import MapView from './components/MapView';
import SidePanel from './components/SidePanel';

const demoDescription =
  'Boreal GeoAnalytics develops spatial workflows to identify urban heat patterns, environmental exposure zones, and vegetation-related cooling effects across cities. This demonstration uses simplified spatial data to illustrate how satellite-derived indicators and geospatial analysis can support climate adaptation, green infrastructure planning, and urban environmental assessment.';

const disclaimer =
  'This interactive map is a demonstration prototype. The data are simplified or synthetic and are intended for communication and methodological illustration only. Production-level assessments can be adapted to specific cities, datasets, and decision-making needs.';

function App() {
  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="brand-mark" aria-hidden="true">
          <span />
        </div>
        <div>
          <p className="brand-name">Boreal GeoAnalytics</p>
          <h1>Stockholm Urban Heat Demonstration</h1>
          <p className="subtitle">
            A public demonstration of urban heat exposure, vegetation cooling potential, and climate adaptation
            planning indicators for Stockholm.
          </p>
        </div>
      </header>

      <main className="content-grid">
        <section className="map-section" aria-label="Interactive Stockholm urban heat map">
          <MapView />
        </section>
        <SidePanel description={demoDescription} />
      </main>

      <footer className="site-footer">
        <strong>Disclaimer:</strong> {disclaimer}
      </footer>
    </div>
  );
}

export default App;
