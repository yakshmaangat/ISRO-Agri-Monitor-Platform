import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const TimeSeriesChart = ({ data }) => {
  if (!data || !data.time_series) {
    return <div style={{ padding: '1rem', textAlign: 'center', color: 'var(--text-secondary)' }}>No time series data available</div>;
  }

  // Reverse data so chronological is left to right
  const chartData = [...data.time_series].reverse();

  return (
    <div style={{ height: '250px', width: '100%', marginTop: '1rem' }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis dataKey="date" stroke="#94a3b8" fontSize={10} tickFormatter={(val) => val.substring(5)} />
          <YAxis stroke="#94a3b8" fontSize={10} />
          <Tooltip 
            contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
            itemStyle={{ color: '#fff' }}
          />
          <Legend wrapperStyle={{ fontSize: '12px' }} />
          <Line type="monotone" dataKey="ndvi_avg" name="NDVI" stroke="#10b981" strokeWidth={2} dot={{ r: 3 }} />
          <Line type="monotone" dataKey="ndwi_avg" name="NDWI" stroke="#3b82f6" strokeWidth={2} dot={{ r: 3 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TimeSeriesChart;
