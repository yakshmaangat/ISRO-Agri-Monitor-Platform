import React, { useState, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react';

const TemporalSlider = ({ currentDate, setCurrentDate }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  
  const totalFrames = 16;
  
  // Generate mock dates (same logic as before)
  const dates = Array.from({ length: totalFrames }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (15 - i) * 8);
    return d.toISOString().split('T')[0];
  });

  // Find index of current date, default to last
  const currentIndex = dates.indexOf(currentDate) !== -1 ? dates.indexOf(currentDate) : totalFrames - 1;

  const updateIndex = (newIndex) => {
    if (newIndex >= 0 && newIndex < totalFrames) {
      setCurrentDate(dates[newIndex]);
    }
  };

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        updateIndex((currentIndex + 1) % totalFrames);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentIndex, dates, setCurrentDate]);

  return (
    <div style={{
      position: 'absolute',
      bottom: '20px',
      left: '50%',
      transform: 'translateX(-50%)',
      background: 'rgba(15, 23, 42, 0.8)',
      backdropFilter: 'blur(8px)',
      padding: '10px 20px',
      borderRadius: '24px',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      display: 'flex',
      alignItems: 'center',
      gap: '15px',
      zIndex: 1000,
      width: '80%',
      maxWidth: '600px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.3)'
    }}>
      <div style={{ display: 'flex', gap: '8px' }}>
        <button 
          onClick={() => updateIndex(currentIndex > 0 ? currentIndex - 1 : currentIndex)}
          style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer', padding: '4px' }}
        >
          <SkipBack size={18} />
        </button>
        <button 
          onClick={() => setIsPlaying(!isPlaying)}
          style={{ background: '#3b82f6', border: 'none', color: '#fff', cursor: 'pointer', padding: '8px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          {isPlaying ? <Pause size={18} /> : <Play size={18} />}
        </button>
        <button 
          onClick={() => updateIndex(currentIndex < totalFrames - 1 ? currentIndex + 1 : currentIndex)}
          style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer', padding: '4px' }}
        >
          <SkipForward size={18} />
        </button>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#94a3b8' }}>
          <span>{dates[0]}</span>
          <span style={{ color: '#fff', fontWeight: 'bold' }}>{dates[currentIndex]}</span>
          <span>{dates[totalFrames - 1]}</span>
        </div>
        <input 
          type="range" 
          min="0" 
          max={totalFrames - 1} 
          value={currentIndex}
          onChange={(e) => {
            updateIndex(parseInt(e.target.value));
            setIsPlaying(false);
          }}
          style={{ width: '100%', cursor: 'pointer', accentColor: '#3b82f6' }}
        />
      </div>
    </div>
  );
};

export default TemporalSlider;
