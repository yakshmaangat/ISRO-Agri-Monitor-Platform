import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';

const WaterBalance = ({ data }) => {
  if (!data || !data.water_balance) return <div style={{ padding: '1rem', textAlign: 'center' }}>Loading water balance...</div>;

  const chartData = [...data.water_balance].reverse(); // oldest to newest

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '8px' }}>
        <h3 style={{ fontSize: '1rem', marginBottom: '0.25rem' }}>Calculation Methodology</h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>{data.method}</p>
        <code style={{ fontSize: '0.75rem', background: 'rgba(0,0,0,0.5)', padding: '0.25rem 0.5rem', borderRadius: '4px' }}>
          {data.formula}
        </code>
      </div>

      <div>
        <h4 style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>ETc vs Actual ET (mm)</h4>
        <div style={{ height: '200px', width: '100%' }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 5, right: 0, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="period_start" fontSize={10} tickFormatter={(val) => val.substring(5)} stroke="#94a3b8" />
              <YAxis fontSize={10} stroke="#94a3b8" />
              <Tooltip contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', border: 'none', borderRadius: '8px' }} />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              <Area type="monotone" dataKey="etc_mm" name="Crop Demand (ETc)" stroke="#f59e0b" fillOpacity={0.2} fill="#f59e0b" />
              <Area type="monotone" dataKey="actual_et_mm" name="Actual ET" stroke="#10b981" fillOpacity={0.4} fill="#10b981" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div>
        <h4 style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>Water Deficit & Rainfall (mm)</h4>
        <div style={{ height: '200px', width: '100%' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 5, right: 0, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="period_start" fontSize={10} tickFormatter={(val) => val.substring(5)} stroke="#94a3b8" />
              <YAxis fontSize={10} stroke="#94a3b8" />
              <Tooltip contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', border: 'none', borderRadius: '8px' }} />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              <Bar dataKey="rainfall_mm" name="Rainfall" fill="#3b82f6" />
              <Bar dataKey="water_deficit_mm" name="Deficit" fill="#ef4444" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default WaterBalance;
