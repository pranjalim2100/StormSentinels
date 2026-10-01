import React from 'react';
import type { Forecast, ReliabilityResult } from '../types/weather';
import { ForecastCard } from '../components/ForecastCard';
import { ReliabilityGauge } from '../components/ReliabilityGauge';
import { WeatherMetricCard } from '../components/WeatherMetricCard';
import { WeatherMap } from '../components/WeatherMap';
import { Thermometer, Droplets, Wind, Gauge, Cloud, CloudRain, ShieldCheck, ArrowRight } from 'lucide-react';

interface DashboardProps {
  forecast: Forecast;
  result: ReliabilityResult;
  onCheckForecast: () => void;
  onViewEvidence: () => void;
  onSelectLocation: (location: string) => void;
  onViewPerformance: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  forecast,
  result,
  onCheckForecast,
  onViewEvidence,
  onSelectLocation,
}) => {
  return (
    <div className="space-y-6">
      {/* Top Banner Hero Message */}
      <div className="glass-card rounded-2xl p-6 border border-[#29B6F6]/30 relative overflow-hidden bg-gradient-to-r from-[#071A2B] via-[#0D2638] to-[#071A2B]">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-1.5 text-xs font-black px-3 py-1 rounded-full bg-[#20C7B7]/15 text-[#20C7B7] border border-[#20C7B7]/30 uppercase tracking-widest font-mono mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            AI WEATHER FORECAST RELIABILITY ENGINE
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
            CAN YOU TRUST THE FORECAST?
          </h2>
          <p className="text-sm text-[#9DB4C7] mt-2 leading-relaxed">
            STORMSENTINELS evaluates weather forecasts using atmospheric evidence, historical patterns and probabilistic verification to provide a transparent second opinion.
          </p>
        </div>
      </div>

      {/* Main Grid: Forecast Under Test (Left) & Reliability Preview Gauge (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ForecastCard
            forecast={forecast}
            onCheckForecast={onCheckForecast}
            onViewEvidence={onViewEvidence}
          />
        </div>

        {/* Reliability Preview Gauge */}
        <div className="glass-card rounded-2xl p-4 border border-[#9DB4C7]/20 flex flex-col items-center justify-between">
          <div className="w-full text-center border-b border-[#9DB4C7]/15 pb-2">
            <span className="text-[11px] font-black text-[#64D8FF] uppercase tracking-widest font-mono">
              EVALUATION PREVIEW
            </span>
          </div>
          
          <ReliabilityGauge
            score={result.reliabilityScore}
            originalProbability={result.originalProbability}
            verdict={result.verdict}
            size={210}
            subtitle="FORECAST RELIABILITY"
            showDetails={true}
          />

          <button
            onClick={onCheckForecast}
            className="w-full flex items-center justify-center gap-2 bg-[#071A2B] hover:bg-[#14344D] text-[#64D8FF] border border-[#29B6F6]/30 font-bold px-4 py-2.5 rounded-xl text-xs transition-all mt-2"
          >
            <span>RUN FULL RELIABILITY CHECK</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Weather Summary Metrics Cards Grid */}
      <div>
        <h3 className="text-xs font-black text-[#9DB4C7] uppercase tracking-widest font-mono mb-3">
          ATMOSPHERIC METRICS SUMMARY
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <WeatherMetricCard
            label="Temperature"
            value={forecast.temperature}
            unit="°C"
            icon={<Thermometer className="w-5 h-5" />}
            subtitle="Seasonal Normal"
            accentColor="#FFB84D"
          />
          <WeatherMetricCard
            label="Humidity"
            value={forecast.humidity}
            unit="%"
            icon={<Droplets className="w-5 h-5" />}
            subtitle="High Moisture"
            accentColor="#29B6F6"
          />
          <WeatherMetricCard
            label="Wind Speed"
            value={forecast.windSpeed}
            unit="km/h"
            icon={<Wind className="w-5 h-5" />}
            subtitle="SW Monsoon Breeze"
            accentColor="#64D8FF"
          />
          <WeatherMetricCard
            label="Pressure"
            value={forecast.pressure}
            unit="hPa"
            icon={<Gauge className="w-5 h-5" />}
            subtitle="Low Trough"
            accentColor="#20C7B7"
          />
          <WeatherMetricCard
            label="Cloud Cover"
            value={forecast.cloudCover}
            unit="%"
            icon={<Cloud className="w-5 h-5" />}
            subtitle="Overcast Stratus"
            accentColor="#9DB4C7"
          />
          <WeatherMetricCard
            label="Expected Rain"
            value={forecast.expectedRainfall}
            unit="mm"
            icon={<CloudRain className="w-5 h-5" />}
            subtitle="24h Accumulation"
            accentColor="#35D07F"
          />
        </div>
      </div>

      {/* Interactive Maharashtra Reliability Map */}
      <WeatherMap
        selectedLocation={forecast.location}
        onSelectLocation={onSelectLocation}
      />

      {/* Footer Branding Slogan */}
      <div className="text-center py-4 text-xs font-mono text-[#9DB4C7]/60 tracking-widest uppercase border-t border-[#9DB4C7]/10">
        FORECAST → EVIDENCE → AI ASSESSMENT → RELIABILITY
      </div>
    </div>
  );
};
