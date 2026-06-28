import React from 'react';

const ControlPanel = ({ activeLayer, setActiveLayer }) => {
  return (
    <div style={{ display: 'flex', gap: '0.5rem', background: 'rgba(0,0,0,0.2)', padding: '0.5rem', borderRadius: '12px' }}>
      <button 
        className={`btn ${activeLayer === 'crop' ? 'active' : ''}`}
        onClick={() => setActiveLayer('crop')}
      >
        Crop Types
      </button>
      <button 
        className={`btn ${activeLayer === 'moisture' ? 'active' : ''}`}
        onClick={() => setActiveLayer('moisture')}
      >
        Moisture Stress
      </button>
      <button 
        className={`btn ${activeLayer === 'irrigation' ? 'active' : ''}`}
        onClick={() => setActiveLayer('irrigation')}
      >
        Irrigation Advisory
      </button>
    </div>
  );
};

export default ControlPanel;
