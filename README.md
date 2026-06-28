# 🛰️ ISRO Agri-Monitor Platform
### AI-Driven Automated Crop Type Classification, Moisture Stress Detection & Precision Irrigation Advisory

![ISRO Agri-Monitor Platform Banner](frontend/src/assets/hero.png)

[![React](https://img.shields.io/badge/Frontend-React_18-61DAFB?logo=react&logoColor=black)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Bundler-Vite-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![Python](https://img.shields.io/badge/Python-3.9+-3776AB?logo=python&logoColor=white)](https://www.python.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## 📌 Executive Summary

The **ISRO Agri-Monitor Platform** is an advanced earth observation and agricultural intelligence prototype developed for satellite data analytics. Leveraging multi-spectral satellite imagery, synthetic aperture radar (SAR), and AI/ML model inference, the platform enables real-time crop classification, automated root-zone moisture stress detection, and hyper-local irrigation advisories to optimize water resource management across agricultural zones.

---

## 🔥 Key Features

- 🛰️ **Interactive Satellite GIS Viewer**: High-definition spatial map visualization featuring multi-spectral layer overlays (NDVI, NDWI, EVI), temporal playback sliders, and interactive parcel inspection.
- 🌾 **AI Crop Classification**: Machine learning models for precise crop identification, canopy density evaluation, and phenological stage tracking (Germination, Vegetative, Flowering, Maturity).
- 💧 **Moisture Stress & Water Balance Accounting**: Real-time estimation of root-zone soil moisture deficiencies, evapotranspiration rates (ET), and water deficit alerts.
- 🤖 **AgriBot AI Advisory**: Integrated intelligent conversational bot delivering real-time actionable recommendations, field diagnostics, and weather-aware irrigation schedules to local farmers and agronomists.
- 📊 **Validation & Machine Learning Analytics**: Comprehensive model performance evaluation metrics including Precision, Recall, F1-Score, and multi-sensor data fusion pipelines.
- 🏗️ **Architecture & Pipeline Visualization**: Interactive system pipeline diagrams detailing satellite data ingestion, preprocessing, cloud masking, feature extraction, and model deployment.

---

## 🏗️ Tech Stack & Architecture

### **Frontend (Web Application)**
- **Framework:** React 18 (Vite)
- **Styling & Theme:** Modern Glassmorphism UI with custom responsive CSS3
- **Icons & Visuals:** Lucide React Icons
- **State & Data Handling:** React Hooks with REST API polling & real-time synchronization

### **Backend (Microservices API)**
- **Framework:** FastAPI (Python 3.9+)
- **Server:** Uvicorn ASGI Server
- **CORS Handling:** Custom middleware configuration for secure multi-origin development
- **Data Engineering:** Modular mock data pipelines replicating ISRO EO satellite feeds (Sentinel, EOS, INSAT)

---

## 📁 Project Directory Structure

```text
ISRO-Agri-Monitor-Platform/
├── backend/
│   ├── api/
│   │   ├── __init__.py
│   │   └── routes.py           # REST API endpoints for geospatial & ML analytics
│   ├── services/
│   │   ├── __init__.py
│   │   └── mock_data.py        # Simulated EO data streams, indices & metrics
│   ├── main.py                 # FastAPI application entry point & CORS middleware
│   └── requirements.txt        # Python backend dependencies
├── frontend/
│   ├── public/                 # Static assets & icons
│   ├── src/
│   │   ├── assets/             # Images & design vectors
│   │   ├── components/         # Modular React UI components
│   │   │   ├── AgriBot.jsx             # AI Chat assistant
│   │   │   ├── ControlPanel.jsx        # Map layer toggle controls
│   │   │   ├── Dashboard.jsx           # High-level regional telemetry
│   │   │   ├── DataFusionPanel.jsx     # Multi-sensor data synergy
│   │   │   ├── MapViewer.jsx           # GIS map render component
│   │   │   ├── PhenologyTimeline.jsx   # Crop growth lifecycle tracking
│   │   │   ├── PipelineDiagram.jsx     # End-to-end processing pipeline
│   │   │   ├── SpectralToggle.jsx      # Multi-spectral index switches
│   │   │   ├── TemporalSlider.jsx      # Time-series analysis controller
│   │   │   ├── TimeSeriesChart.jsx     # Vegetation index trends
│   │   │   ├── ValidationMetrics.jsx   # Confusion matrix & model scores
│   │   │   └── WaterBalance.jsx        # Hydrological budget analytics
│   │   ├── App.css             # Component-level styling
│   │   ├── App.jsx             # Root application container & data orchestration
│   │   ├── index.css           # Global theme variables & layout rules
│   │   └── main.jsx            # React DOM rendering entry point
│   ├── package.json            # Node dependencies and scripts
│   └── vite.config.js          # Vite bundler configuration
└── README.md                   # Platform documentation
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following software installed on your machine:
- **Python:** 3.9 or higher
- **Node.js:** v16.x or higher
- **npm:** v8.x or higher

---

### 1️⃣ Backend Setup (FastAPI)

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. (Optional) Create and activate a virtual environment:
   ```bash
   # On Windows
   python -m venv venv
   .\venv\Scripts\activate

   # On macOS/Linux
   python3 -m venv venv
   source venv/bin/activate
   ```

3. Install required Python packages:
   ```bash
   pip install -r requirements.txt
   ```

4. Start the FastAPI server with Uvicorn:
   ```bash
   python main.py
   ```
   *The backend API will be available at `http://localhost:8000`. You can explore the interactive API documentation (Swagger UI) at `http://localhost:8000/docs`.*

---

### 2️⃣ Frontend Setup (React + Vite)

1. Open a new terminal window and navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install Node dependencies:
   ```bash
   npm install
   ```

3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   *The web platform will launch at `http://localhost:5173`.*

---

## 📡 API Reference Endpoint Overview

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/` | Health check & API status confirmation |
| `GET` | `/api/crop-map` | Spatial crop type distribution for specified region & date |
| `GET` | `/api/moisture-stress` | Root-zone soil moisture stress levels & anomaly flags |
| `GET` | `/api/irrigation-advisory` | Generated water application volume & scheduling advice |
| `GET` | `/api/spectral-indices` | Multi-spectral layer values (NDVI, NDWI, EVI, SAVI) |
| `GET` | `/api/time-series` | Historical vegetation & moisture trends over time |
| `GET` | `/api/phenology` | Crop growth stages and crop lifecycle progression |
| `GET` | `/api/water-balance` | Evapotranspiration vs. precipitation hydrological accounting |
| `GET` | `/api/validation-metrics` | Machine learning confusion matrix, precision, and recall |

---

## 🗺️ Roadmap & Future Scope

- [ ] **Synthetic Aperture Radar (SAR) Integration:** Integration of RISAT-1B & Sentinel-1 C-band radar for cloud-penetrating all-weather soil moisture monitoring.
- [ ] **IoT Sensor Ground Truth Synergy:** Live API bindings with automated weather stations (AWS) and field moisture probes.
- [ ] **Mobile Responsive Dashboard:** PWA wrapper for lightweight mobile deployment in rural farming communities.
- [ ] **Multi-lingual Voice Advisory:** Expanding AgriBot to support regional Indian languages via speech-to-text.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<p align="center">
  <b>Developed for ISRO Hackathon Earth Observation & Agricultural Monitoring Challenge 🚀</b>
</p>
