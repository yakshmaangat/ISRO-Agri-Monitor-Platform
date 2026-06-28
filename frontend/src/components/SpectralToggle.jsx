import React from 'react';

const SpectralToggle = ({ spectralLayer, setSpectralLayer }) => {
  const indices = [
    { id: 'none', label: 'None' },
    { id: 'ndvi', label: 'NDVI (Health)' },
    { id: 'evi', label: 'EVI (Vigor)' },
    { id: 'ndwi', label: 'NDWI (Water)' },
    { id: 'vci', label: 'VCI (Condition)' },
    { id: 'smi', label: 'SMI (Soil Moist)' },
  ];

  return (
    <div style={{ position: 'absolute', bottom: '20px', left: '20px', zIndex: 1000, background: 'rgba(15, 23, 42, 0.8)', backdropFilter: 'blur(10px)', padding: '0.75rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
      <div style={{ fontSize: '0.8rem', marginBottom: '0.5rem', fontWeight: 'bold' }}>Spectral Overlays</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
        {indices.map(idx => (
          <label key={idx.id} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', cursor: 'pointer' }}>
            <input 
              type="radio" 
              name="spectral" 
              value={idx.id} 
              checked={spectralLayer === idx.id} 
              onChange={() => setSpectralLayer(idx.id)} 
              style={{ cursor: 'pointer' }}
            />
            {idx.label}
          </label>
        ))}
      </div>
    </div>
  );
};

export default SpectralToggle;
