import React from 'react';
import type { Forecast } from '../types/weather';
import { CloudRain, Play, HelpCircle } from 'lucide-react';

interface ForecastCheckProps {
  forecast: Forecast;
  onRunAICheck: () => void;
}

export const ForecastCheck: React.FC<ForecastCheckProps> = ({ forecast, onRunAICheck }) => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Title Header */}
      <div className="flex items-center justify-between border-b border-[#9DB4C7]/15 pb-4">
        <div>
          <span className="text-xs font-black text-[#20C7B7] uppercase tracking-widest font-mono">
            INPUT FORECAST EVALUATION
          </span>
          <h2 className="text-3xl font-black text-white flex items-center gap-3 mt-1">
            <span>🌧️ FORECAST UNDER TEST</span>
          </h2>
        </div>
        <div className="text-right font-mono text-xs">
          <div className="font-bold text-white text-sm">{forecast.location}</div>
          <div className="text-[#9DB4C7]">{forecast.date} • {forecast.time}</div>
        </div>
      </div>

      {/* Main Forecast Parameters Card */}
      <div className="glass-card rounded-2xl p-6 border border-[#29B6F6]/30">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {/* Hero Probability Box */}
          <div className="bg-[#071A2B] rounded-2xl p-6 border border-[#29B6F6]/40 text-center relative">
            <span className="text-xs font-bold text-[#9DB4C7] uppercase tracking-wider block mb-2">
              Original Forecast Probability
            </span>
            <div className="flex items-center justify-center gap-3">
              <CloudRain className="w-10 h-10 text-[#29B6F6]" />
              <span className="text-6xl font-black text-white">{forecast.rainProbability}%</span>
            </div>
            <p className="text-sm text-[#20C7B7] font-extrabold mt-3">
              Expected Rainfall: {forecast.expectedRainfall} mm
            </p>
          </div>

          {/* Atmospheric Variables Grid */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="bg-[#0D2638] rounded-xl p-3.5 border border-[#9DB4C7]/15">
              <span className="text-[#9DB4C7] text-[10px] uppercase font-bold block">Temperature</span>
              <span className="text-lg font-black text-white">{forecast.temperature}°C</span>
            </div>
            <div className="bg-[#0D2638] rounded-xl p-3.5 border border-[#9DB4C7]/15">
              <span className="text-[#9DB4C7] text-[10px] uppercase font-bold block">Humidity</span>
              <span className="text-lg font-black text-[#29B6F6]">{forecast.humidity}%</span>
            </div>
            <div className="bg-[#0D2638] rounded-xl p-3.5 border border-[#9DB4C7]/15">
              <span className="text-[#9DB4C7] text-[10px] uppercase font-bold block">Wind Speed</span>
              <span className="text-lg font-black text-white">{forecast.windSpeed} km/h</span>
            </div>
            <div className="bg-[#0D2638] rounded-xl p-3.5 border border-[#9DB4C7]/15">
              <span className="text-[#9DB4C7] text-[10px] uppercase font-bold block">Surface Pressure</span>
              <span className="text-lg font-black text-[#20C7B7]">{forecast.pressure} hPa</span>
            </div>
          </div>
        </div>
      </div>

      {/* Why Are We Checking This Panel */}
      <div className="glass-card rounded-2xl p-6 border border-[#64D8FF]/30 relative bg-gradient-to-r from-[#071A2B] to-[#0D2638]">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-[#64D8FF]/15 text-[#64D8FF] border border-[#64D8FF]/30 shrink-0">
            <HelpCircle className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-black text-white uppercase tracking-wider font-mono">
              WHY ARE WE CHECKING THIS?
            </h3>
            <p className="text-sm text-[#9DB4C7] mt-2 leading-relaxed font-medium">
              "Weather forecasts are probabilistic. A high rain probability does not guarantee that rain will occur. STORMSENTINELS evaluates how strongly current atmospheric and historical evidence supports the forecast."
            </p>
          </div>
        </div>
      </div>

      {/* Primary Action Button */}
      <div className="pt-2">
        <button
          onClick={onRunAICheck}
          className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-[#29B6F6] via-[#20C7B7] to-[#35D07F] hover:opacity-95 text-[#071A2B] font-black px-8 py-4 rounded-2xl shadow-xl shadow-[#20C7B7]/30 transition-all text-base tracking-wider uppercase"
        >
          <Play className="w-5 h-5 fill-current" />
          <span>RUN AI CHECK</span>
        </button>
      </div>
    </div>
  );
};
