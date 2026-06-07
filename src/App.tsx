import MapView from './components/MapView';
import SidePanel from './components/SidePanel';

const disclaimer =
  'Public demonstration prototype. Not an official heat-risk assessment.';

function App() {
  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="brand-mark" aria-hidden="true">
          <span />
        </div>
        <div>
          <p className="brand-name">Boreal GeoAnalytics</p>
          <h1>Stockholm Urban Heat Hotspots & Cooling Priority</h1>
          <p className="subtitle">
            A satellite-based prototype for exploring heat exposure, green cooling capacity, and cooling-priority
            patterns in Stockholm.
          </p>
        </div>
      </header>

      <main className="content-grid">
        <section className="map-section" aria-label="Interactive Stockholm urban heat map">
          <MapView />
        </section>
        <SidePanel />
      </main>

      <footer className="site-footer">
        <strong>Disclaimer:</strong> {disclaimer}
      </footer>
    </div>
  );
}

export default App;
