import { layerConfigs } from '../config/layers';
import type { DemoLayer, IndicatorClass } from '../types/geo';
import { dataQualityColor, formatClassLabel } from '../utils/colors';

const classOrder: IndicatorClass[] = ['low', 'moderate', 'high', 'very_high'];

type LegendProps = {
  activeLayer: DemoLayer;
};

function Legend({ activeLayer }: LegendProps) {
  const layer = layerConfigs[activeLayer];

  return (
    <div className="legend" aria-label={`${layer.legendTitle} legend`}>
      <p className="eyebrow">Legend</p>
      <h2>{layer.legendTitle}</h2>
      <div className="legend-items">
        {classOrder.map((className) => (
          <div className="legend-row" key={className}>
            <span className="legend-swatch" style={{ backgroundColor: layer.palette[className] }} />
            <span>{formatClassLabel(className)}</span>
          </div>
        ))}
      </div>
      <div className="legend-quality" aria-label="Data quality legend">
        <div className="legend-row">
          <span className="legend-swatch quality-swatch" style={{ backgroundColor: dataQualityColor('no_lst') }} />
          <span>Insufficient thermal data</span>
        </div>
        <div className="legend-row">
          <span className="legend-swatch quality-swatch" style={{ backgroundColor: dataQualityColor('mostly_water') }} />
          <span>Mostly water / limited interpretation</span>
        </div>
      </div>
    </div>
  );
}

export default Legend;
