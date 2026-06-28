import React from 'react';
import { CheckCircle, AlertTriangle } from 'lucide-react';

const ValidationMetrics = ({ data }) => {
  if (!data) return <div style={{ padding: '1rem', textAlign: 'center' }}>Loading metrics...</div>;

  const { overall_accuracy, kappa_coefficient, per_class_metrics, confusion_matrix, class_labels, model_used } = data;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div className="stat-card" style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
          <div className="label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <CheckCircle size={14} color="#10b981" /> Overall Accuracy
          </div>
          <div className="value">{overall_accuracy}%</div>
          <div className="trend">Target: &gt; 85%</div>
        </div>

        <div className="stat-card" style={{ background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
          <div className="label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <AlertTriangle size={14} color="#3b82f6" /> Kappa Coefficient
          </div>
          <div className="value">{kappa_coefficient}</div>
          <div className="trend">Excellent Agreement</div>
        </div>
      </div>

      <div style={{ padding: '1rem', background: 'rgba(0,0,0,0.2)', borderRadius: '8px' }}>
        <h3 style={{ fontSize: '0.9rem', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Model Configuration</h3>
        <p style={{ fontSize: '0.85rem' }}><strong>Architecture:</strong> {model_used}</p>
      </div>

      <div>
        <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>Per-Class Metrics (F1 Score)</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {per_class_metrics.map(metric => (
            <div key={metric.crop} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem' }}>
              <span style={{ width: '80px' }}>{metric.crop}</span>
              <div style={{ flex: 1, background: 'rgba(255,255,255,0.1)', height: '8px', borderRadius: '4px', margin: '0 1rem', overflow: 'hidden' }}>
                <div style={{ width: `${metric.f1_score}%`, background: metric.f1_score > 90 ? '#10b981' : '#f59e0b', height: '100%' }}></div>
              </div>
              <span style={{ width: '40px', textAlign: 'right' }}>{metric.f1_score}%</span>
            </div>
          ))}
        </div>
        <div style={{ marginTop: '1rem' }}>
        <h3 style={{ fontSize: '1rem', marginBottom: '1rem' }}>Confusion Matrix (Actual vs Predicted)</h3>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: `auto repeat(${class_labels.length}, 1fr)`,
          gap: '2px',
          background: 'rgba(255,255,255,0.05)',
          padding: '1rem',
          borderRadius: '8px',
          overflowX: 'auto'
        }}>
          <div /> {/* Empty top-left cell */}
          {class_labels.map(label => (
            <div key={`header-${label}`} style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-secondary)', paddingBottom: '0.5rem', fontWeight: 'bold' }}>
              {label.substring(0, 4)}.
            </div>
          ))}
          
          {confusion_matrix.map((row, i) => (
            <React.Fragment key={`row-${i}`}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: '0.5rem', fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 'bold' }}>
                {class_labels[i].substring(0, 4)}.
              </div>
              {row.map((val, j) => {
                const maxVal = Math.max(...confusion_matrix.flat());
                // Color intensity based on value (diagonal is green, off-diagonal is red/orange)
                const isDiagonal = i === j;
                const intensity = Math.min(1, val / maxVal);
                const bg = isDiagonal 
                  ? `rgba(16, 185, 129, ${0.1 + intensity * 0.9})` // Green shades
                  : `rgba(239, 68, 68, ${val > 0 ? 0.2 + intensity * 2 : 0})`; // Red shades for errors
                const textColor = (intensity > 0.5 && isDiagonal) ? '#fff' : 'var(--text-primary)';
                
                return (
                  <div key={`cell-${i}-${j}`} title={`Actual: ${class_labels[i]}, Predicted: ${class_labels[j]} = ${val}`} style={{ 
                    background: bg,
                    color: textColor,
                    padding: '0.5rem',
                    textAlign: 'center',
                    borderRadius: '4px',
                    fontSize: '0.85rem',
                    minWidth: '35px'
                  }}>
                    {val > 0 ? val : '-'}
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>

    </div>

    </div>
  );
};

export default ValidationMetrics;
