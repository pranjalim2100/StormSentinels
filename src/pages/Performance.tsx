import React from 'react';
import { PerformanceCharts } from '../components/PerformanceCharts';
import { ShieldCheck } from 'lucide-react';

export const PerformancePage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-[#9DB4C7]/15 pb-4">
        <div>
          <span className="text-xs font-black text-[#35D07F] uppercase tracking-widest font-mono flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4" />
            PROBABILISTIC VERIFICATION BENCHMARK
          </span>
          <h2 className="text-3xl font-black text-white mt-1">FORECAST PERFORMANCE</h2>
        </div>
        <span className="text-xs text-[#9DB4C7] font-mono bg-[#071A2B] px-3 py-1.5 rounded-lg border border-[#9DB4C7]/20">
          Evaluated Across 450 Cases
        </span>
      </div>

      <PerformanceCharts />
    </div>
  );
};
