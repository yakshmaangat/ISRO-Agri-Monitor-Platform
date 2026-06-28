import React from 'react';
import { Database, Zap, Cpu } from 'lucide-react';

const DataFusionPanel = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
        Integrating high-resolution optical imagery with all-weather microwave SAR for robust classification.
      </p>

      {/* Visual Flowchart */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
        
        {/* Top layer: Sources */}
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', gap: '1rem' }}>
          <div style={{ flex: 1, background: 'rgba(59, 130, 246, 0.1)', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(59, 130, 246, 0.3)', position: 'relative' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: '#60a5fa' }}>
              <Database size={16} /> <strong>Optical Data</strong>
            </div>
            <ul style={{ fontSize: '0.75rem', paddingLeft: '1rem', color: 'var(--text-secondary)', margin: 0 }}>
              <li>Sentinel-2 (10m)</li>
              <li>LISS-IV / LISS-III</li>
              <li>NDVI, EVI, NDWI</li>
            </ul>
          </div>

          <div style={{ flex: 1, background: 'rgba(245, 158, 11, 0.1)', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(245, 158, 11, 0.3)', position: 'relative' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: '#fbbf24' }}>
              <Zap size={16} /> <strong>Microwave SAR</strong>
            </div>
            <ul style={{ fontSize: '0.75rem', paddingLeft: '1rem', color: 'var(--text-secondary)', margin: 0 }}>
              <li>Sentinel-1</li>
              <li>EOS-04</li>
              <li>VV/VH Backscatter</li>
            </ul>
          </div>
        </div>

        {/* Connecting Arrows (using SVG) */}
        <svg width="100%" height="40px" style={{ margin: '5px 0' }}>
          <path d="M 25% 0 L 50% 40" stroke="var(--text-secondary)" strokeWidth="2" fill="none" />
          <path d="M 75% 0 L 50% 40" stroke="var(--text-secondary)" strokeWidth="2" fill="none" />
          <polygon points="50,40 45,30 55,30" fill="var(--text-secondary)" />
        </svg>

        {/* Fusion Engine */}
        <div style={{ width: '80%', background: 'rgba(16, 185, 129, 0.1)', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(16, 185, 129, 0.3)', textAlign: 'center', position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: '#34d399' }}>
            <Cpu size={16} /> <strong>Data Fusion & ML Engine</strong>
          </div>
          <p style={{ fontSize: '0.8rem', margin: 0 }}>Random Forest for Crop Type + LSTM for Temporal Phenology dynamics</p>
        </div>

      </div>

      <div style={{ marginTop: '0.5rem', background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
        <h4 style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>Ancillary Data Feeds</h4>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {['IMD Gridded Rainfall', 'GLDAS ET0', 'Soil Maps (NBSS&LUP)', 'Canal Command Boundaries'].map(tag => (
            <span key={tag} style={{ fontSize: '0.7rem', padding: '0.2rem 0.5rem', background: 'rgba(255,255,255,0.1)', borderRadius: '12px' }}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DataFusionPanel;
