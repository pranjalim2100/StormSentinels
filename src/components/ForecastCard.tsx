import React from 'react';
import type { Forecast } from '../types/weather';
import { CloudRain, Thermometer, Droplets, Wind, Gauge, ArrowRight, Radio } from 'lucide-react';

interface ForecastCardProps {
  forecast: Forecast;
  onCheckForecast: () => void;
  onViewEvidence: () => void;
}

export const ForecastCard: React.FC<ForecastCardProps> = ({
  forecast,
  onCheckForecast,
  onViewEvidence,
}) => {
  return (
    <div className="glass-card rounded-2xl p-6 border border-[#64D8FF]/20 relative overflow-hidden group">
      {/* Subtle background rain particle effect */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-[#29B6F6]/10 rounded-full blur-3xl pointer-events-none group-hover:bg-[#29B6F6]/20 transition-all" />
      
      <div className="flex items-center justify-between border-b border-[#9DB4C7]/15 pb-4 mb-4">
        <div>
          <span className="text-[11px] font-extrabold tracking-widest text-[#20C7B7] uppercase font-mono">
            INPUT DATA STREAM
          </span>
          <h2 className="text-xl font-black text-white flex items-center gap-2 mt-0.5">
            <span>🌧️ FORECAST UNDER TEST</span>
          </h2>
        </div>
        <div className="text-right">
          <div className="text-xs font-semibold text-white">{forecast.location}</div>
          <div className="text-[11px] text-[#9DB4C7]">{forecast.date} • {forecast.time}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Hero Rain Probability Callout */}
        <div className="bg-[#071A2B]/80 rounded-xl p-5 border border-[#29B6F6]/30 text-center relative">
          <span className="text-xs font-bold text-[#9DB4C7] uppercase tracking-wider block mb-1">
            Original Rain Probability
          </span>
          <div className="flex items-center justify-center gap-2">
            <CloudRain className="w-8 h-8 text-[#29B6F6] animate-bounce" />
            <span className="text-6xl font-black text-white tracking-tight">
              {forecast.rainProbability}%
            </span>
          </div>
          <p className="text-xs text-[#20C7B7] font-semibold mt-2">
            Expected Rainfall: <span className="text-white font-bold">{forecast.expectedRainfall} mm</span> (8–14 mm window)
          </p>
        </div>

        {/* Supporting Atmospheric Parameters Grid */}
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="bg-[#0D2638]/90 rounded-lg p-2.5 border border-[#9DB4C7]/15 flex items-center gap-2.5">
            <Thermometer className="w-4 h-4 text-[#FFB84D]" />
            <div>
              <div className="text-[#9DB4C7] text-[10px]">Temperature</div>
              <div className="font-bold text-white text-sm">{forecast.temperature}°C</div>
            </div>
          </div>

          <div className="bg-[#0D2638]/90 rounded-lg p-2.5 border border-[#9DB4C7]/15 flex items-center gap-2.5">
            <Droplets className="w-4 h-4 text-[#29B6F6]" />
            <div>
              <div className="text-[#9DB4C7] text-[10px]">Humidity</div>
              <div className="font-bold text-white text-sm">{forecast.humidity}%</div>
            </div>
          </div>

          <div className="bg-[#0D2638]/90 rounded-lg p-2.5 border border-[#9DB4C7]/15 flex items-center gap-2.5">
            <Wind className="w-4 h-4 text-[#64D8FF]" />
            <div>
              <div className="text-[#9DB4C7] text-[10px]">Wind Speed</div>
              <div className="font-bold text-white text-sm">{forecast.windSpeed} km/h</div>
            </div>
          </div>

          <div className="bg-[#0D2638]/90 rounded-lg p-2.5 border border-[#9DB4C7]/15 flex items-center gap-2.5">
            <Gauge className="w-4 h-4 text-[#20C7B7]" />
            <div>
              <div className="text-[#9DB4C7] text-[10px]">Pressure</div>
              <div className="font-bold text-white text-sm">{forecast.pressure} hPa</div>
            </div>
          </div>
        </div>
      </div>

      {/* Primary & Secondary Action CTAs */}
      <div className="flex flex-col sm:flex-row items-center gap-3 mt-6 pt-4 border-t border-[#9DB4C7]/15">
        <button
          onClick={onCheckForecast}
          className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-[#29B6F6] to-[#20C7B7] hover:from-[#64D8FF] hover:to-[#35D07F] text-[#071A2B] font-extrabold px-6 py-3.5 rounded-xl shadow-lg shadow-[#20C7B7]/25 transition-all text-sm tracking-wider uppercase"
        >
          <span>CHECK FORECAST</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <button
          onClick={onViewEvidence}
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#0D2638] hover:bg-[#14344D] text-[#64D8FF] border border-[#64D8FF]/30 font-bold px-5 py-3.5 rounded-xl transition-all text-sm"
        >
          <Radio className="w-4 h-4" />
          <span>VIEW EVIDENCE</span>
        </button>
      </div>
    </div>
  );
};
