import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON, useMap } from 'react-leaflet';
import SpectralToggle from './SpectralToggle';
import TemporalSlider from './TemporalSlider';
import 'leaflet/dist/leaflet.css';

// Base coordinates match backend mock data
const CENTER = [29.69, 77.00];
const ZOOM = 13;

const MapUpdater = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
};

const MapViewer = ({ activeLayer, data, spectralLayer, setSpectralLayer, currentDate, setCurrentDate }) => {
  const [geoKey, setGeoKey] = useState(0);

  // Force re-render of GeoJSON when layer or data changes
  useEffect(() => {
    setGeoKey(prev => prev + 1);
  }, [activeLayer, data, spectralLayer]);

  // Mock Canal Command Area Boundary
  const canalBoundary = {
    type: "FeatureCollection",
    features: [{
      type: "Feature",
      geometry: {
        type: "Polygon",
        coordinates: [[
          [76.985, 29.68],
          [77.035, 29.68],
          [77.035, 29.73],
          [76.985, 29.73],
          [76.985, 29.68]
        ]]
      },
      properties: { name: "Karnal Canal Command Area" }
    }]
  };

  const getStyle = (feature) => {
    const defaultStyle = { weight: 2, opacity: 1, fillOpacity: 0.6, color: '#ffffff' };
    
    // If a spectral layer is selected, override the active layer coloring
    if (spectralLayer !== 'none' && data?.spectralData) {
      const val = feature.properties.value;
      // Simple color ramp based on value 0-1
      const hue = Math.max(0, Math.min(120, val * 120)); // Red (0) to Green (120)
      const color = `hsl(${hue}, 80%, 50%)`;
      return { ...defaultStyle, fillColor: color, color: color, fillOpacity: 0.7 };
    }

    if (activeLayer === 'crop') {
      const type = feature.properties.crop_type;
      const colors = {
        'Wheat': '#f59e0b',     // Amber
        'Rice': '#3b82f6',      // Blue
        'Sugarcane': '#10b981', // Green
        'Mustard': '#eab308',   // Yellow
        'Cotton': '#d8b4e2'     // Light Purple
      };
      return { ...defaultStyle, fillColor: colors[type] || '#ccc', color: colors[type] };
    } 
    
    if (activeLayer === 'moisture') {
      const stress = feature.properties.stress_level;
      const colors = {
        'No Stress': '#10b981', // Green
        'Low': '#3b82f6',       // Blue
        'Moderate': '#fbbf24',  // Yellow-amber
        'High': '#f97316',      // Orange
        'Severe': '#ef4444'     // Red
      };
      return { ...defaultStyle, fillColor: colors[stress] || '#ccc', color: colors[stress] };
    }
    
    if (activeLayer === 'irrigation') {
      const adv = feature.properties.advisory;
      const colors = {
        'No Action': '#10b981', // Green
        'Monitor': '#3b82f6', // Blue
        'Irrigate within 3 days': '#f59e0b', // Amber
        'Immediate Irrigation Required': '#ef4444' // Red
      };
      return { ...defaultStyle, fillColor: colors[adv] || '#ccc', color: colors[adv] };
    }

    return defaultStyle;
  };

  const onEachFeature = (feature, layer) => {
    if (feature.properties) {
      // Don't show popup for canal boundary
      if (feature.properties.name === "Karnal Canal Command Area") return;

      let popupContent = `<div style="color: #000; font-family: Inter, sans-serif; font-size: 0.85rem; line-height: 1.4;">`;
      
      if (spectralLayer !== 'none' && data?.spectralData) {
        popupContent += `<strong>Index:</strong> ${feature.properties.index_name}<br/>
                         <strong>Value:</strong> ${feature.properties.value}`;
      } else if (activeLayer === 'crop') {
        popupContent += `<strong>Crop:</strong> ${feature.properties.crop_type}<br/>
                         <strong>Confidence:</strong> ${(feature.properties.confidence * 100).toFixed(0)}%<br/>
                         <strong>Stage:</strong> ${feature.properties.growth_stage}<br/>
                         <strong>NDVI:</strong> ${feature.properties.ndvi}`;
      } else if (activeLayer === 'moisture') {
        popupContent += `<strong>Stress:</strong> ${feature.properties.stress_level}<br/>
                         <strong>Stage:</strong> ${feature.properties.stage}<br/>
                         <strong>VCI:</strong> ${feature.properties.vci}<br/>
                         <strong>SAR VH:</strong> ${feature.properties.backscatter_vh} dB`;
      } else if (activeLayer === 'irrigation') {
        popupContent += `<strong>Advisory:</strong> ${feature.properties.advisory}<br/>
                         <strong>Deficit:</strong> ${feature.properties.water_deficit_mm} mm<br/>
                         <strong>ETc:</strong> ${feature.properties.etc_mm_day} mm/day<br/>
                         <div style="margin-top:0.5rem; padding:0.2rem; background:#fee2e2; border-radius:4px; text-align:center;">
                           <strong>Recommend: Apply ${feature.properties.irrigation_depth_mm} mm</strong>
                         </div>
                         <button onclick="window.print()" style="margin-top: 8px; width: 100%; padding: 4px; background: #3b82f6; color: white; border: none; border-radius: 4px; cursor: pointer;">
                           Export as PDF
                         </button>`;
      }
      popupContent += `</div>`;
      layer.bindPopup(popupContent);
    }
  };

  let currentGeoJSON = null;
  if (data) {
    if (spectralLayer !== 'none') {
      currentGeoJSON = data.spectralData;
    } else if (activeLayer === 'crop') {
      currentGeoJSON = data.cropMap;
    } else if (activeLayer === 'moisture') {
      currentGeoJSON = data.moistureStress;
    } else if (activeLayer === 'irrigation') {
      currentGeoJSON = data.advisory;
    }
  }

  return (
    <div style={{ height: '100%', width: '100%', position: 'relative' }}>
      <MapContainer center={CENTER} zoom={ZOOM} style={{ height: '100%', width: '100%', zIndex: 1 }}>
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />
        <MapUpdater center={CENTER} zoom={ZOOM} />
        
        {/* Canal Command Area Boundary */}
        <GeoJSON 
          data={canalBoundary} 
          style={{
            color: '#3b82f6',
            weight: 3,
            fillColor: 'transparent',
            dashArray: '5, 5'
          }}
        />

        {currentGeoJSON && currentGeoJSON.features && (
          <GeoJSON 
            key={geoKey}
            data={currentGeoJSON} 
            style={getStyle}
            onEachFeature={onEachFeature}
          />
        )}
      </MapContainer>
      <SpectralToggle spectralLayer={spectralLayer} setSpectralLayer={setSpectralLayer} />
      <TemporalSlider currentDate={currentDate} setCurrentDate={setCurrentDate} />
    </div>
  );
};

export default MapViewer;
