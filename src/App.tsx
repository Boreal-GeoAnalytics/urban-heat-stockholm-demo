import MapView from './components/MapView';
import SidePanel from './components/SidePanel';
import { useGeoJsonData } from './hooks/useGeoJsonData';

const disclaimer =
  'Public demonstration prototype. Not an official heat-risk assessment.';

function App() {
  const { data, error, loading } = useGeoJsonData();

  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="brand-mark" aria-hidden="true">
          <span />
        </div>
        <div>
          <p className="brand-name">Boreal GeoAnalytics</p>
          <h1>Stockholm Urban Climate Demo</h1>
          <p className="subtitle">
            Heat exposure, green cooling capacity, and cooling-priority patterns for urban climate adaptation.
          </p>
        </div>
      </header>

      <main className="content-grid">
        <section className="map-section" aria-label="Interactive Stockholm urban heat map">
          <MapView data={data} error={error} loading={loading} />
        </section>
        <SidePanel data={data} />
      </main>

      <footer className="site-footer">
        <strong>Disclaimer:</strong> {disclaimer}
      </footer>
    </div>
  );
}

export default App;
