import React from 'react';
import { Database, ShieldCheck, Activity, Layers, Cpu, Server } from 'lucide-react';

const PipelineDiagram = () => {
  const steps = [
    { id: 1, title: 'Data Ingestion', desc: 'Sentinel-1/2, IMD, LISS', icon: <Database size={20} /> },
    { id: 2, title: 'Preprocessing', desc: 'Cloud Masking, Coregistration', icon: <Layers size={20} /> },
    { id: 3, title: 'Feature Extraction', desc: 'NDVI, EVI, VH/VV', icon: <Activity size={20} /> },
    { id: 4, title: 'ML Training', desc: 'RF + LSTM Ensemble', icon: <Cpu size={20} /> },
    { id: 5, title: 'Prediction', desc: 'Crop Type & Stress', icon: <Server size={20} /> },
    { id: 6, title: 'Validation', desc: 'Ground Truth Check', icon: <ShieldCheck size={20} /> }
  ];

  return (
    <div style={{ padding: '1rem', background: 'rgba(0,0,0,0.2)', borderRadius: '12px' }}>
      <h3 style={{ fontSize: '1rem', marginBottom: '1rem' }}>AI/ML Pipeline Architecture</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', position: 'relative' }}>
        {/* Connecting line */}
        <div style={{ position: 'absolute', left: '20px', top: '20px', bottom: '20px', width: '2px', background: '#3b82f6', zIndex: 0 }}></div>
        
        {steps.map((step) => (
          <div key={step.id} style={{ display: 'flex', alignItems: 'center', gap: '15px', position: 'relative', zIndex: 1 }}>
            <div style={{ 
              width: '40px', height: '40px', borderRadius: '50%', background: '#1e293b', border: '2px solid #3b82f6',
              display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#60a5fa'
            }}>
              {step.icon}
            </div>
            <div style={{ flex: 1, background: 'rgba(255,255,255,0.05)', padding: '10px 15px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <strong style={{ fontSize: '0.9rem', color: '#fff', display: 'block' }}>Step {step.id}: {step.title}</strong>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{step.desc}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PipelineDiagram;
