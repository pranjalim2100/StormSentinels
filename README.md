# 🌩️ STORMSENTINELS — AI Weather Forecast Reliability & Verification System

[![React](https://img.shields.io/badge/React-18-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.0-purple.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-cyan.svg)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> **"Given an existing weather forecast, evaluate how strongly current and historical evidence supports that forecast and provide a transparent forecast-reliability assessment."**

---

## 📌 Product Concept

**STORMSENTINELS does not replace weather forecasting systems.** It provides an AI-powered second opinion on how strongly available atmospheric evidence (humidity, pressure, historical analogs, ensemble model consensus) supports an existing rain prediction.

### Critical Distinction:
* **Original Weather Forecast Probability**: e.g., `Rain Probability = 82%`
* **STORMSENTINELS Forecast Reliability**: e.g., `Forecast Reliability = 76% (Likely Reliable)` or `23% (Possible Forecast Bust)`

---

## ✨ Features

- 🌩️ **Meteorological Command Centre Visuals**: Deep midnight navy aesthetic (`#071A2B`), glowing radar pulses, circular SVG gauges, and custom Maharashtra weather map.
- 🌧️ **Forecast Under Test**: Evaluates humidity, surface pressure, cloud cover, wind vectors, and precipitable water.
- 📡 **Atmospheric Evidence Cards**: Categorized signal cards (`Moisture`, `Precipitation`, `Atmospheric Soundings`, `Historical Analogs`, `Model Consensus`).
- 🧠 **AI Reliability Assessment Hero Screen**: Prominent circular score gauge with clear verdict badges (`🟢 LIKELY RELIABLE`, `🟡 UNCERTAIN`, `🔴 POSSIBLE FORECAST BUST`).
- 🔍 **Why This Result? (SHAP Feature Attribution)**: Horizontal decomposition bar chart (`+24 Moisture`, `+19 Historical Analogs`, `-7 Lead Time`).
- 📊 **Forecast Performance Analytics**: WMO Calibration Diagram (X: Forecast Probability vs Y: Observed Frequency), Brier Score (`0.14`), Calibration (`88%`), and F1 Bust Detection (`84%`).
- 🧪 **Demo Scenarios**: Interactive preset switcher to evaluate **Supported Rain (76%)** vs. **Forecast Bust (23%)**.
- 🌐 **Dual Data Layer**: Toggle seamlessly between **DEMO MODE** and **LIVE DATA MODE** powered by the **Open-Meteo REST API**.
- 📱 **PowerPoint Scanner Modal**: Built-in QR code generator to present mobile scanner codes on presentation slides.

---

## 🛠️ Tech Stack

* **Framework**: React 18, TypeScript, Vite
* **Styling**: Tailwind CSS v4, Custom Glassmorphism & Atmospheric Animations
* **Charts**: Recharts (Calibration Plots, Brier Scores, Over-Time Reliability)
* **Icons**: Lucide React
* **APIs**: Open-Meteo REST API (Live Mode) & TypeScript Service Abstraction Layer

---

## 🚀 Quick Start

### Prerequisites
* [Node.js](https://nodejs.org/) (v18 or higher)
* `npm` or `yarn`

### Installation & Local Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/StormSentinels.git
   cd StormSentinels
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```
   Open your browser to `http://localhost:5173`.

4. **Build for production**:
   ```bash
   npm run build
   ```

---

## 📚 Scientific Basis & Verification

* **WMO**: World Meteorological Organization probabilistic verification protocols.
* **IMD**: India Meteorological Department regional monsoon climatology.
* **ECMWF**: European Centre for Medium-Range Weather Forecasts ensemble reliability metrics.
* **NOAA**: Radiosonde sounding and atmospheric reanalysis models.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for details.
