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
  const goodCells = features.filter((feature) => (feature.properties.data_quality ?? 'good') === 'good');
  const mostlyWater = features.filter((feature) => feature.properties.data_quality === 'mostly_water').length;
  const limitedData = features.filter((feature) => {
    const dataQuality = feature.properties.data_quality ?? 'good';
    return dataQuality !== 'good' && dataQuality !== 'mostly_water';
  }).length;
  const highPriority = goodCells.filter((feature) =>
    ['high', 'very_high'].includes(feature.properties.cooling_priority_class),
  ).length;
  const validLstCells = goodCells.filter((feature) => typeof feature.properties.mean_lst_c === 'number');
  const meanLst =
    validLstCells.length > 0
      ? validLstCells.reduce((sum, feature) => sum + (feature.properties.mean_lst_c ?? 0), 0) / validLstCells.length
      : null;

  const metrics = [
    { label: 'Good data cells', value: percentage(goodCells.length, totalCells) },
    { label: 'High priority cooling', value: percentage(highPriority, goodCells.length) },
    {
      label: 'Limited / water cells',
      value: percentage(limitedData + mostlyWater, totalCells),
    },
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
