import React from 'react';

const PhenologyTimeline = ({ data }) => {
  if (!data || !data.phenology) return <div style={{ padding: '1rem', textAlign: 'center' }}>Loading phenology...</div>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <h3 style={{ fontSize: '1.1rem' }}>Phenological Stages</h3>
      
      {data.phenology.slice(0, 3).map(cropData => (
        <div key={cropData.crop} style={{ background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <strong>{cropData.crop}</strong>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>LGP: {cropData.lgp_days} days</span>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '0.5rem' }}>
            {/* Stress Indicators Row */}
            <div style={{ display: 'flex', height: '16px', position: 'relative' }}>
              {cropData.stages.map((stage) => {
                const width = `${(stage.duration_days / cropData.lgp_days) * 100}%`;
                // Mock stress for demo (e.g., flowering/tillering often have water stress in this dataset)
                const hasStress = stage.stage === 'Flowering' || stage.stage === 'Tillering';
                return (
                  <div key={`stress-${stage.stage}`} style={{ width, display: 'flex', justifyContent: 'center', alignItems: 'flex-end' }}>
                    {hasStress && <div title="High Moisture Stress Vulnerability" style={{ color: '#ef4444' }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" x2="12" y1="9" y2="13"/><line x1="12" x2="12.01" y1="17" y2="17"/></svg>
                    </div>}
                  </div>
                );
              })}
            </div>

            {/* Stages Bar */}
            <div style={{ display: 'flex', height: '28px', borderRadius: '4px', overflow: 'hidden' }}>
              {cropData.stages.map((stage, idx) => {
                const width = `${(stage.duration_days / cropData.lgp_days) * 100}%`;
                const colors = ['#8b5a2b', '#6b8e23', '#32cd32', '#ffd700', '#daa520', '#cd853f', '#d2b48c'];
                return (
                  <div 
                    key={stage.stage} 
                    title={`${stage.stage} (${stage.duration_days} days)`}
                    style={{ 
                      width, 
                      backgroundColor: colors[idx % colors.length],
                      opacity: stage.is_current ? 1 : 0.7,
                      border: stage.is_current ? '2px solid white' : '1px solid rgba(0,0,0,0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative'
                    }}
                  >
                    <span style={{ fontSize: '0.6rem', color: '#000', fontWeight: 'bold', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', padding: '0 2px' }}>
                      {stage.stage.substring(0, 3)}
                    </span>
                    {stage.is_current && <div style={{ position: 'absolute', top: '-6px', right: '-4px', background: '#3b82f6', width: '8px', height: '8px', borderRadius: '50%', border: '1px solid #fff' }}></div>}
                  </div>
                );
              })}
            </div>
            
            {/* Timeline Axis */}
            <div style={{ position: 'relative', height: '12px', marginTop: '2px' }}>
               <div style={{ position: 'absolute', left: 0, fontSize: '0.65rem', color: 'var(--text-secondary)' }}>{cropData.sos}</div>
               <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', fontSize: '0.65rem', color: 'var(--text-secondary)' }}>{cropData.peak}</div>
               <div style={{ position: 'absolute', right: 0, fontSize: '0.65rem', color: 'var(--text-secondary)' }}>{cropData.eos}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PhenologyTimeline;
