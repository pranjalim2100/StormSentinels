import React from 'react';
import type { Evidence } from '../types/weather';
import { EvidenceCard } from '../components/EvidenceCard';
import { Radio, ArrowRight } from 'lucide-react';

interface EvidencePageProps {
  evidenceList: Evidence[];
  onProceedToResult: () => void;
}

export const EvidencePage: React.FC<EvidencePageProps> = ({ evidenceList, onProceedToResult }) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#9DB4C7]/15 pb-4 gap-3">
        <div>
          <span className="text-xs font-black text-[#20C7B7] uppercase tracking-widest font-mono flex items-center gap-1.5">
            <Radio className="w-4 h-4 animate-pulse" />
            REAL-TIME PHYSICAL SIGNALS
          </span>
          <h2 className="text-3xl font-black text-white mt-1">ATMOSPHERIC EVIDENCE</h2>
        </div>
        <button
          onClick={onProceedToResult}
          className="flex items-center justify-center gap-2 bg-[#0D2638] hover:bg-[#14344D] text-[#64D8FF] border border-[#29B6F6]/40 font-bold px-4 py-2.5 rounded-xl text-xs transition-all"
        >
          <span>VIEW AI RELIABILITY RESULT</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Grid of Evidence Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {evidenceList.map((item) => (
          <EvidenceCard key={item.id} evidence={item} />
        ))}
      </div>
    </div>
  );
};
