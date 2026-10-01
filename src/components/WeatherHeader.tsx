import React from 'react';
import { MapPin, Calendar, Clock, Zap, QrCode } from 'lucide-react';

interface WeatherHeaderProps {
  location: string;
  onLocationChange: (loc: string) => void;
  dataMode: 'demo' | 'live';
  onModeToggle: () => void;
  onOpenScanner?: () => void;
}

export const WeatherHeader: React.FC<WeatherHeaderProps> = ({
  location,
  onLocationChange,
  dataMode,
  onModeToggle,
  onOpenScanner,
}) => {
  return (
    <header className="sticky top-0 z-30 w-full border-b border-[#9DB4C7]/15 bg-[#071A2B]/90 backdrop-blur-md px-4 py-3 sm:px-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Title & Brand */}
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#29B6F6] to-[#20C7B7] text-white shadow-lg shadow-[#20C7B7]/20">
            <span className="text-2xl">🌩️</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-black tracking-tight text-white font-mono">
                STORMSENTINELS
              </h1>
              <span className="rounded bg-[#20C7B7]/15 px-2 py-0.5 text-[10px] font-bold text-[#20C7B7] border border-[#20C7B7]/30 tracking-widest">
                VERIFICATION v1.0
              </span>
            </div>
            <p className="text-xs font-semibold text-[#9DB4C7] tracking-wider uppercase">
              AI Weather Forecast Reliability Engine
            </p>
          </div>
        </div>

        {/* Global Controls & Status */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Location Selector */}
          <div className="flex items-center gap-2 rounded-lg bg-[#0D2638] px-3 py-1.5 border border-[#9DB4C7]/20 text-xs font-medium text-[#F7FAFC]">
            <MapPin className="h-4 w-4 text-[#29B6F6]" />
            <span className="text-[#9DB4C7]">Location:</span>
            <select
              value={location}
              onChange={(e) => onLocationChange(e.target.value)}
              aria-label="Select Forecast Location"
              className="bg-transparent font-bold text-white focus:outline-none cursor-pointer"
            >
              <option value="Mumbai" className="bg-[#071A2B] text-white">Mumbai, Maharashtra</option>
              <option value="Pune" className="bg-[#071A2B] text-white">Pune, Maharashtra</option>
              <option value="Nashik" className="bg-[#071A2B] text-white">Nashik, Maharashtra</option>
              <option value="Nagpur" className="bg-[#071A2B] text-white">Nagpur, Maharashtra</option>
              <option value="Ratnagiri" className="bg-[#071A2B] text-white">Ratnagiri, Maharashtra</option>
            </select>
          </div>

          {/* Date & Time */}
          <div className="hidden sm:flex items-center gap-2 rounded-lg bg-[#0D2638] px-3 py-1.5 border border-[#9DB4C7]/20 text-xs font-medium text-[#F7FAFC]">
            <Calendar className="h-3.5 w-3.5 text-[#64D8FF]" />
            <span className="font-semibold text-white">Tomorrow</span>
            <span className="text-[#9DB4C7]/40">|</span>
            <Clock className="h-3.5 w-3.5 text-[#20C7B7]" />
            <span className="font-semibold text-white">15:00 IST</span>
          </div>

          {/* Mode Switcher */}
          <button
            onClick={onModeToggle}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-all border ${
              dataMode === 'live'
                ? 'bg-[#35D07F]/15 text-[#35D07F] border-[#35D07F]/40 shadow-sm'
                : 'bg-[#29B6F6]/15 text-[#29B6F6] border-[#29B6F6]/40'
            }`}
            title="Click to toggle between Demo Scenarios and Live Open-Meteo Atmospheric API"
          >
            <Zap className={`h-3.5 w-3.5 ${dataMode === 'live' ? 'animate-pulse text-[#35D07F]' : ''}`} />
            <span>{dataMode === 'live' ? 'LIVE DATA MODE' : 'DEMO MODE'}</span>
          </button>

          {/* PPT Scanner Button */}
          {onOpenScanner && (
            <button
              onClick={onOpenScanner}
              className="flex items-center gap-1.5 rounded-lg bg-[#20C7B7]/15 hover:bg-[#20C7B7]/25 text-[#20C7B7] border border-[#20C7B7]/40 px-3 py-1.5 text-xs font-bold transition-all"
              title="Open QR Scanner Generator for PowerPoint"
            >
              <QrCode className="h-3.5 w-3.5" />
              <span>PPT SCANNER</span>
            </button>
          )}

          {/* System Online Status */}
          <div className="flex items-center gap-2 rounded-full bg-[#35D07F]/10 px-3 py-1 text-xs font-bold text-[#35D07F] border border-[#35D07F]/30">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#35D07F] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#35D07F]"></span>
            </span>
            <span>SYSTEM ONLINE</span>
          </div>
        </div>
      </div>
    </header>
  );
};
