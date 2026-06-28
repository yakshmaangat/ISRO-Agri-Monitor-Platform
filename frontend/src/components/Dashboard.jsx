import React from 'react';
import TimeSeriesChart from './TimeSeriesChart';
import { Leaf, Droplets, CloudRain, TrendingDown, IndianRupee } from 'lucide-react';

const Dashboard = ({ data, loading }) => {
  if (loading) {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading metrics...</div>;
  }

  // Calculate some aggregate stats based on the mock data
  let overallAccuracy = "92.4%";
  let dominantCrop = "Wheat";
  let stressAreas = "24%";
  let avgDeficit = "18.5 mm";

  if (data?.cropMap?.features) {
    const crops = data.cropMap.features.map(f => f.properties.crop_type);
    const counts = crops.reduce((acc, c) => { acc[c] = (acc[c] || 0) + 1; return acc; }, {});
    dominantCrop = Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b, "Wheat");
  }

  if (data?.moistureStress?.features) {
    const stressed = data.moistureStress.features.filter(f => ['High', 'Severe'].includes(f.properties.stress_level));
    stressAreas = `${Math.round((stressed.length / data.moistureStress.features.length) * 100)}%`;
  }

  if (data?.advisory?.features) {
    const deficits = data.advisory.features.map(f => f.properties.water_deficit_mm);
    const avg = deficits.reduce((a, b) => a + b, 0) / deficits.length;
    avgDeficit = `${avg.toFixed(1)} mm`;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>Region Analysis</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Pilot Area: Karnal, Haryana</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div className="stat-card" style={{ background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
          <div className="label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Leaf size={14} color="#3b82f6" /> Model Accuracy
          </div>
          <div className="value">{overallAccuracy}</div>
          <div className="trend up">↑ 2.1% vs last season</div>
        </div>

        <div className="stat-card" style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
          <div className="label">Dominant Crop</div>
          <div className="value">{dominantCrop}</div>
          <div className="trend">Kharif Season</div>
        </div>

        <div className="stat-card" style={{ background: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.2)' }}>
          <div className="label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Droplets size={14} color="#f59e0b" /> High Stress Areas
          </div>
          <div className="value">{stressAreas}</div>
          <div className="trend down">↑ 5% from last week</div>
        </div>

        <div className="stat-card" style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
          <div className="label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <CloudRain size={14} color="#ef4444" /> Avg Water Deficit
          </div>
          <div className="value">{avgDeficit}</div>
          <div className="trend">Requires action</div>
        </div>

        <div className="stat-card" style={{ background: 'rgba(249, 115, 22, 0.1)', border: '1px solid rgba(249, 115, 22, 0.2)' }}>
          <div className="label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <TrendingDown size={14} color="#f97316" /> Est. Yield Loss
          </div>
          <div className="value" style={{ color: '#f97316' }}>11% Drop</div>
          <div className="trend down">vs Normal 4.2t/ha</div>
        </div>

        <div className="stat-card" style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
          <div className="label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <IndianRupee size={14} color="#10b981" /> Value at Risk
          </div>
          <div className="value" style={{ color: '#10b981' }}>₹4.2 Lakhs</div>
          <div className="trend">Karnal Command Area</div>
        </div>
      </div>

      <div style={{ flex: 1, marginTop: '1rem' }}>
        <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>Spectral Indices (12 Weeks)</h3>
        <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Based on Sentinel-2 & LISS-III fusion</p>
        <TimeSeriesChart data={data?.timeSeries} />
      </div>
      
      <div style={{ marginTop: 'auto', padding: '1rem', background: 'rgba(0,0,0,0.2)', borderRadius: '8px', fontSize: '0.85rem' }}>
        <strong>Current Growth Stage:</strong> Peak Vegetative<br/>
        <strong>Last Satellite Pass:</strong> Today, 10:30 AM (EOS-04 SAR)
      </div>
    </div>
  );
};

export default Dashboard;
