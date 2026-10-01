import React from 'react';
import type { ReliabilityResult } from '../types/weather';
import { ReliabilityGauge } from '../components/ReliabilityGauge';
import { getStatusConfig } from '../utils/reliability';
import { BrainCircuit, HelpCircle, Radio, BarChart3 } from 'lucide-react';

interface ReliabilityPageProps {
  result: ReliabilityResult;
  onViewWhy: () => void;
  onViewEvidence: () => void;
  onViewPerformance: () => void;
}

export const ReliabilityPage: React.FC<ReliabilityPageProps> = ({
  result,
  onViewWhy,
  onViewEvidence,
  onViewPerformance,
}) => {
  const config = getStatusConfig(result.verdict);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Title Header */}
      <div className="text-center">
        <span className="inline-flex items-center gap-1.5 text-xs font-black px-3 py-1 rounded-full bg-[#20C7B7]/15 text-[#20C7B7] border border-[#20C7B7]/30 uppercase tracking-widest font-mono mb-2">
          <BrainCircuit className="w-4 h-4" />
          STORMSENTINELS VERIFICATION HERO
        </span>
        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          FORECAST RELIABILITY
        </h2>
      </div>

      {/* Hero Circular Gauge Container */}
      <div className="glass-card rounded-3xl p-8 border border-[#20C7B7]/30 flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-b from-[#071A2B] via-[#0D2638] to-[#071A2B]">
        <ReliabilityGauge
          score={result.reliabilityScore}
          originalProbability={result.originalProbability}
          verdict={result.verdict}
          size={240}
          subtitle="STORMSENTINELS RELIABILITY"
          showDetails={false}
        />

        {/* Clear Distinction Comparison Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl mt-6">
          <div className="bg-[#071A2B]/90 rounded-xl p-4 border border-[#29B6F6]/30 text-center">
            <span className="text-xs font-extrabold text-[#9DB4C7] uppercase tracking-wider block mb-1">
              ORIGINAL FORECAST
            </span>
            <div className="text-3xl font-black text-white font-mono">
              {result.originalProbability}%
            </div>
            <span className="text-xs text-[#29B6F6] font-semibold mt-1 block">
              Rain probability prediction
            </span>
          </div>

          <div className="bg-[#071A2B]/90 rounded-xl p-4 border text-center" style={{ borderColor: `${config.accentColor}50` }}>
            <span className="text-xs font-extrabold text-[#9DB4C7] uppercase tracking-wider block mb-1">
              STORMSENTINELS ASSESSMENT
            </span>
            <div className="text-3xl font-black font-mono" style={{ color: config.accentColor }}>
              {result.reliabilityScore}%
            </div>
            <span className="text-xs font-semibold mt-1 block" style={{ color: config.accentColor }}>
              Forecast reliability score
            </span>
          </div>
        </div>

        {/* Diagnostic Interpretation Text */}
        <div className="w-full max-w-2xl mt-6 bg-[#071A2B]/80 rounded-xl p-4 border border-[#9DB4C7]/15 text-center">
          <p className="text-sm font-medium text-white leading-relaxed">
            "{result.explanation}"
          </p>
        </div>
      </div>

      {/* Action Buttons Trio */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <button
          onClick={onViewWhy}
          className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#20C7B7] to-[#29B6F6] hover:opacity-95 text-[#071A2B] font-black px-5 py-3.5 rounded-xl shadow-lg transition-all text-xs tracking-wider uppercase"
        >
          <HelpCircle className="w-4 h-4" />
          <span>VIEW WHY</span>
        </button>

        <button
          onClick={onViewEvidence}
          className="flex items-center justify-center gap-2 bg-[#0D2638] hover:bg-[#14344D] text-[#64D8FF] border border-[#64D8FF]/30 font-bold px-5 py-3.5 rounded-xl transition-all text-xs tracking-wider uppercase"
        >
          <Radio className="w-4 h-4" />
          <span>VIEW EVIDENCE</span>
        </button>

        <button
          onClick={onViewPerformance}
          className="flex items-center justify-center gap-2 bg-[#0D2638] hover:bg-[#14344D] text-[#35D07F] border border-[#35D07F]/30 font-bold px-5 py-3.5 rounded-xl transition-all text-xs tracking-wider uppercase"
        >
          <BarChart3 className="w-4 h-4" />
          <span>VIEW PERFORMANCE</span>
        </button>
      </div>
    </div>
  );
};
