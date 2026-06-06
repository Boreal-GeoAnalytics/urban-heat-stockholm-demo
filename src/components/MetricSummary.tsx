import type { UrbanHeatGridCollection } from '../types/geo';
import { formatNumber } from '../utils/colors';

type MetricSummaryProps = {
  data: UrbanHeatGridCollection | null;
};

function percentage(count: number, total: number) {
  if (total === 0) {
    return '0%';
  }

  return `${formatNumber((count / total) * 100, 0)}%`;
}

function MetricSummary({ data }: MetricSummaryProps) {
  const features = data?.features ?? [];
  const totalCells = features.length;
  const veryHighHeat = features.filter((feature) => feature.properties.heat_exposure_class === 'very_high').length;
  const highPriority = features.filter((feature) =>
    ['high', 'very_high'].includes(feature.properties.cooling_priority_class),
  ).length;
  const meanLst =
    totalCells > 0
      ? features.reduce((sum, feature) => sum + feature.properties.mean_lst_c, 0) / totalCells
      : null;

  const metrics = [
    { label: 'Grid cells', value: totalCells.toLocaleString('en-US') },
    { label: 'Very high heat exposure', value: percentage(veryHighHeat, totalCells) },
    { label: 'High priority cooling', value: percentage(highPriority, totalCells) },
    { label: 'Mean LST', value: meanLst === null ? 'n/a' : `${formatNumber(meanLst, 1)} °C` },
  ];

  return (
    <section className="metric-summary" aria-label="Demo hotspot summary">
      {metrics.map((metric) => (
        <article className="metric-card" key={metric.label}>
          <span>{metric.label}</span>
          <strong>{metric.value}</strong>
        </article>
      ))}
    </section>
  );
}

export default MetricSummary;
