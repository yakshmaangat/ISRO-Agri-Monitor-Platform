import React, { useState, useEffect } from 'react';
import MapViewer from './components/MapViewer';
import Dashboard from './components/Dashboard';
import ControlPanel from './components/ControlPanel';
import ValidationMetrics from './components/ValidationMetrics';
import PhenologyTimeline from './components/PhenologyTimeline';
import WaterBalance from './components/WaterBalance';
import DataFusionPanel from './components/DataFusionPanel';
import PipelineDiagram from './components/PipelineDiagram';
import AgriBot from './components/AgriBot';
import { Satellite, Activity, Leaf, Droplets, Database, Layers } from 'lucide-react';
import './App.css';

function App() {
  const [activeLayer, setActiveLayer] = useState('crop');
  const [region] = useState('karnal_pilot');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [spectralLayer, setSpectralLayer] = useState('none');
  const [currentDate, setCurrentDate] = useState(new Date().toISOString().split('T')[0]);
  
  const [backendData, setBackendData] = useState({
    cropMap: null,
    moistureStress: null,
    advisory: null,
    timeSeries: null,
    validation: null,
    phenology: null,
    waterBalance: null,
    spectralData: null
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [cropRes, moistureRes, advisoryRes, tsRes, valRes, phenRes, waterRes, specRes] = await Promise.all([
          fetch(`http://localhost:8000/api/crop-map?region=${region}&date=${currentDate}`).catch(() => null),
          fetch(`http://localhost:8000/api/moisture-stress?region=${region}&date=${currentDate}`).catch(() => null),
          fetch(`http://localhost:8000/api/irrigation-advisory?region=${region}&date=${currentDate}`).catch(() => null),
          fetch(`http://localhost:8000/api/time-series?region=${region}`).catch(() => null),
          fetch(`http://localhost:8000/api/validation-metrics`).catch(() => null),
          fetch(`http://localhost:8000/api/phenology`).catch(() => null),
          fetch(`http://localhost:8000/api/water-balance`).catch(() => null),
          fetch(`http://localhost:8000/api/spectral-indices?index_name=${spectralLayer}&date=${currentDate}`).catch(() => null)
        ]);

        setBackendData({
          cropMap: cropRes?.ok ? await cropRes.json() : null,
          moistureStress: moistureRes?.ok ? await moistureRes.json() : null,
          advisory: advisoryRes?.ok ? await advisoryRes.json() : null,
          timeSeries: tsRes?.ok ? await tsRes.json() : null,
          validation: valRes?.ok ? await valRes.json() : null,
          phenology: phenRes?.ok ? await phenRes.json() : null,
          waterBalance: waterRes?.ok ? await waterRes.json() : null,
          spectralData: specRes?.ok ? await specRes.json() : null,
        });
      } catch (e) {
        console.error("Failed to fetch data:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [region, spectralLayer, currentDate]);

  const tabs = [
    { id: 'dashboard', icon: <Activity size={16} />, label: 'Overview' },
    { id: 'phenology', icon: <Leaf size={16} />, label: 'Phenology' },
    { id: 'water', icon: <Droplets size={16} />, label: 'Water Balance' },
    { id: 'validation', icon: <Database size={16} />, label: 'ML Metrics' },
    { id: 'architecture', icon: <Layers size={16} />, label: 'Pipeline' }
  ];

  return (
    <div className="app-container">
      <header className="header glass-panel">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Satellite color="#3b82f6" size={28} />
          <h1>ISRO Agri-Monitor Platform</h1>
        </div>
        <ControlPanel activeLayer={activeLayer} setActiveLayer={setActiveLayer} />
      </header>
      
      <main className="main-content">
        <div className="map-container glass-panel animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <MapViewer 
            activeLayer={activeLayer} 
            data={backendData} 
            spectralLayer={spectralLayer}
            setSpectralLayer={setSpectralLayer}
            currentDate={currentDate}
            setCurrentDate={setCurrentDate}
          />
        </div>
        
        <aside className="sidebar glass-panel animate-fade-in" style={{ animationDelay: '0.2s', width: '420px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          
          <div style={{ display: 'flex', gap: '0.5rem', background: 'rgba(0,0,0,0.2)', padding: '0.5rem', borderRadius: '12px' }}>
            {tabs.map(tab => (
              <button 
                key={tab.id}
                className={`btn ${activeTab === tab.id ? 'active' : ''}`}
                style={{ flex: 1, padding: '0.5rem', fontSize: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem' }}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.icon} <span style={{ display: 'none', '@media (min-width: 1400px)': { display: 'inline' } }}>{tab.label}</span>
              </button>
            ))}
          </div>

          <div style={{ flex: 1, overflowY: 'auto', paddingRight: '0.5rem' }}>
            {activeTab === 'dashboard' && <Dashboard data={backendData} loading={loading} />}
            {activeTab === 'phenology' && <PhenologyTimeline data={backendData?.phenology} />}
            {activeTab === 'water' && <WaterBalance data={backendData?.waterBalance} />}
            {activeTab === 'validation' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <ValidationMetrics data={backendData?.validation} />
                <DataFusionPanel />
              </div>
            )}
            {activeTab === 'architecture' && <PipelineDiagram />}
          </div>
        </aside>
      </main>

      <AgriBot />
    </div>
  );
}

export default App;
