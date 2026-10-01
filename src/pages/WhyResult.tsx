import React from 'react';
import type { ReliabilityResult } from '../types/weather';
import { EvidenceContributionChart } from '../components/EvidenceContributionChart';
import { AIExplanation } from '../components/AIExplanation';
import { HelpCircle, ArrowLeft } from 'lucide-react';

interface WhyResultPageProps {
  result: ReliabilityResult;
  onBackToResult: () => void;
}

export const WhyResultPage: React.FC<WhyResultPageProps> = ({ result, onBackToResult }) => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#9DB4C7]/15 pb-4 gap-3">
        <div>
          <span className="text-xs font-black text-[#20C7B7] uppercase tracking-widest font-mono flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4" />
            ATTRIBUTION ANALYSIS
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
            WHY DOES STORMSENTINELS TRUST THIS FORECAST?
          </h2>
        </div>

        <button
          onClick={onBackToResult}
          className="flex items-center gap-2 bg-[#0D2638] hover:bg-[#14344D] text-[#9DB4C7] border border-[#9DB4C7]/20 font-bold px-4 py-2 rounded-xl text-xs transition-all shrink-0"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>BACK TO RELIABILITY RESULT</span>
        </button>
      </div>

      {/* Feature Attribution Chart */}
      <EvidenceContributionChart contributions={result.contributions} isIllustrative={true} />

      {/* Diagnostic AI Explanation */}
      <AIExplanation
        explanation={result.explanation}
        verdict={result.verdict}
        analogCount={result.analogMatchCount}
        analogRainCount={result.analogRainCount}
        modelConsensus={result.modelConsensus}
      />
    </div>
  );
};
