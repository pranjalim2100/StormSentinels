import React from 'react';
import { DEMO_MAP_LOCATIONS } from '../data/demoScenarios';
import { getStatusConfig } from '../utils/reliability';
import { Radio } from 'lucide-react';

interface WeatherMapProps {
  selectedLocation: string;
  onSelectLocation: (location: string) => void;
}

export const WeatherMap: React.FC<WeatherMapProps> = ({
  selectedLocation,
  onSelectLocation,
}) => {
  return (
    <div className="glass-card rounded-2xl p-5 border border-[#9DB4C7]/20 relative overflow-hidden">
      <div className="flex items-center justify-between border-b border-[#9DB4C7]/15 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <Radio className="w-4 h-4 text-[#20C7B7] animate-pulse" />
          <h3 className="text-sm font-black text-white uppercase tracking-wider font-mono">
            FORECAST RELIABILITY MAP
          </h3>
        </div>
        <span className="text-[10px] font-bold text-[#9DB4C7] bg-[#071A2B] px-2 py-0.5 rounded border border-[#9DB4C7]/20">
          MAHARASHTRA REGION
        </span>
      </div>

      {/* SVG Map Container */}
      <div className="relative w-full h-72 bg-[#071A2B]/90 rounded-xl border border-[#9DB4C7]/15 overflow-hidden flex items-center justify-center p-2">
        {/* Animated Radar Pulse Background */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
          <div className="w-64 h-64 border border-[#29B6F6] rounded-full animate-radar-pulse" />
          <div className="w-44 h-44 border border-[#20C7B7] rounded-full animate-radar-pulse delay-300" />
          <div className="w-24 h-24 border border-[#64D8FF] rounded-full animate-radar-pulse delay-700" />
        </div>

        {/* Abstract Stylized Maharashtra SVG Coastline & Boundaries */}
        <svg
          viewBox="0 0 500 350"
          className="w-full h-full object-contain filter drop-shadow-md opacity-40"
        >
          {/* Grid Lines */}
          <path d="M 0 100 H 500 M 0 200 H 500 M 0 300 H 500" stroke="rgba(157, 180, 199, 0.1)" strokeWidth="1" strokeDasharray="4,4" />
          <path d="M 100 0 V 350 M 200 0 V 350 M 300 0 V 350 M 400 0 V 350" stroke="rgba(157, 180, 199, 0.1)" strokeWidth="1" strokeDasharray="4,4" />

          {/* Maharashtra Boundary Path */}
          <path
            d="M 100 80 Q 160 50 250 40 Q 380 40 460 100 Q 480 180 420 250 Q 320 300 200 320 Q 130 300 110 240 Q 90 180 100 80 Z"
            fill="rgba(13, 38, 56, 0.6)"
            stroke="#29B6F6"
            strokeWidth="2"
            strokeDasharray="6,3"
          />
          {/* Arabian Sea Coastal Line */}
          <path
            d="M 100 80 L 110 150 L 115 220 L 120 290"
            stroke="#64D8FF"
            strokeWidth="3"
            fill="none"
          />
        </svg>

        {/* Location Markers Overlay */}
        {DEMO_MAP_LOCATIONS.map((loc) => {
          const config = getStatusConfig(loc.verdict);
          const isSelected = selectedLocation.toLowerCase() === loc.name.toLowerCase();

          return (
            <button
              key={loc.id}
              onClick={() => onSelectLocation(loc.name)}
              style={{ left: `${loc.xPercent}%`, top: `${loc.yPercent}%` }}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 group transition-all z-10 ${
                isSelected ? 'scale-110' : 'hover:scale-105'
              }`}
            >
              <div
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border shadow-lg backdrop-blur-md transition-all ${
                  isSelected ? 'ring-2 ring-white' : ''
                }`}
                style={{
                  backgroundColor: 'rgba(7, 26, 43, 0.9)',
                  borderColor: config.accentColor,
                  boxShadow: `0 0 12px ${config.accentColor}40`,
                }}
              >
                <span className="text-xs">{config.iconSymbol}</span>
                <span className="text-xs font-black text-white">{loc.name}</span>
                <span
                  className="text-xs font-black px-1.5 py-0.2 rounded"
                  style={{ color: config.accentColor, backgroundColor: `${config.accentColor}20` }}
                >
                  {loc.reliability}%
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Legend & Clarification Notice */}
      <div className="flex flex-wrap items-center justify-between gap-3 mt-4 pt-3 border-t border-[#9DB4C7]/15 text-xs">
        <div className="flex items-center gap-4">
          <span className="text-[#9DB4C7] font-semibold text-[11px] uppercase tracking-wider">Legend:</span>
          <div className="flex items-center gap-1">
            <span>🟢</span>
            <span className="text-[#35D07F] font-bold">High Support (≥70%)</span>
          </div>
          <div className="flex items-center gap-1">
            <span>🟡</span>
            <span className="text-[#FFB84D] font-bold">Uncertain (40-69%)</span>
          </div>
          <div className="flex items-center gap-1">
            <span>🔴</span>
            <span className="text-[#FF5C6C] font-bold">Low Support (&lt;40%)</span>
          </div>
        </div>
        <p className="text-[10px] text-[#9DB4C7]/70 italic">
          *Colors represent forecast reliability, NOT weather severity.
        </p>
      </div>
    </div>
  );
};
