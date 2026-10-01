import React from 'react';
import { BrainCircuit } from 'lucide-react';
import type { VerdictStatus } from '../types/weather';

interface AIExplanationProps {
  explanation: string;
  verdict: VerdictStatus;
  analogCount?: number;
  analogRainCount?: number;
  modelConsensus?: string;
}

export const AIExplanation: React.FC<AIExplanationProps> = ({
  explanation,
  analogCount = 18,
  analogRainCount = 14,
  modelConsensus = '4 / 5 models support rain',
}) => {
  return (
    <div className="glass-card rounded-2xl p-6 border border-[#20C7B7]/30 relative">
      <div className="flex items-center gap-3 border-b border-[#9DB4C7]/15 pb-4 mb-4">
        <div className="p-2.5 rounded-xl bg-[#20C7B7]/15 border border-[#20C7B7]/30 text-[#20C7B7]">
          <BrainCircuit className="w-6 h-6" />
        </div>
        <div>
          <span className="text-[11px] font-black text-[#20C7B7] uppercase tracking-widest font-mono">
            PROBABILISTIC SYNTHESIS
          </span>
          <h3 className="text-lg font-black text-white">AI DIAGNOSTIC EXPLANATION</h3>
        </div>
      </div>

      {/* Main Narrative Block */}
      <div className="bg-[#071A2B]/80 rounded-xl p-4 border border-[#9DB4C7]/15 mb-4">
        <p className="text-sm text-white font-medium leading-relaxed">
          "{explanation}"
        </p>
      </div>

      {/* Key Supporting Evidence Signals */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        <div className="bg-[#0D2638]/90 rounded-lg p-3 border border-[#9DB4C7]/15">
          <span className="text-[#9DB4C7] font-semibold block mb-1">Historical Pattern Analogs:</span>
          <div className="font-extrabold text-white text-sm">
            {analogRainCount} of {analogCount} matched days rained ({Math.round((analogRainCount / analogCount) * 100)}%)
          </div>
        </div>

        <div className="bg-[#0D2638]/90 rounded-lg p-3 border border-[#9DB4C7]/15">
          <span className="text-[#9DB4C7] font-semibold block mb-1">Forecast Model Agreement:</span>
          <div className="font-extrabold text-[#64D8FF] text-sm">
            {modelConsensus}
          </div>
        </div>
      </div>
    </div>
  );
};
