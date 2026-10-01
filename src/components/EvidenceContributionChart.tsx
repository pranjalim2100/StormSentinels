import React from 'react';
import type { EvidenceContribution } from '../types/weather';
import { TrendingUp, TrendingDown, Info } from 'lucide-react';

interface EvidenceContributionChartProps {
  contributions: EvidenceContribution[];
  isIllustrative?: boolean;
}

export const EvidenceContributionChart: React.FC<EvidenceContributionChartProps> = ({
  contributions,
  isIllustrative = true,
}) => {
  const maxImpact = Math.max(...contributions.map((c) => Math.abs(c.impact)), 30);

  return (
    <div className="glass-card rounded-2xl p-6 border border-[#9DB4C7]/20 relative">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#9DB4C7]/15 pb-4 mb-5 gap-2">
        <div>
          <h3 className="text-base font-black text-white uppercase tracking-wider font-mono flex items-center gap-2">
            <span>EVIDENCE CONTRIBUTION BREAKDOWN</span>
          </h3>
          <p className="text-xs text-[#9DB4C7] mt-0.5">
            Feature attribution analysis (SHAP / waterfall decomposition)
          </p>
        </div>
        {isIllustrative && (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-3 py-1 rounded-full bg-[#FFB84D]/15 text-[#FFB84D] border border-[#FFB84D]/30 shrink-0">
            <Info className="w-3.5 h-3.5" />
            <span>Illustrative evidence breakdown</span>
          </span>
        )}
      </div>

      {/* Contributions List */}
      <div className="space-y-4">
        {contributions.map((item, idx) => {
          const isPositive = item.direction === 'positive' || item.impact >= 0;
          const percentageWidth = Math.min(100, (Math.abs(item.impact) / maxImpact) * 100);
          const barColor = isPositive ? '#35D07F' : '#FF5C6C';

          return (
            <div key={idx} className="bg-[#071A2B]/80 rounded-xl p-3.5 border border-[#9DB4C7]/15">
              <div className="flex items-center justify-between text-xs font-bold mb-2">
                <span className="text-white font-mono flex items-center gap-1.5">
                  {isPositive ? (
                    <TrendingUp className="w-4 h-4 text-[#35D07F]" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-[#FF5C6C]" />
                  )}
                  {item.feature}
                </span>
                <span
                  className="font-black text-sm"
                  style={{ color: barColor }}
                >
                  {isPositive ? `+${item.impact}` : item.impact} pts
                </span>
              </div>

              {/* Bar Visual */}
              <div className="w-full bg-[#0D2638] h-3 rounded-full overflow-hidden flex items-center p-0.5 border border-[#9DB4C7]/10">
                <div
                  className="h-full rounded-full transition-all duration-1000 ease-out"
                  style={{
                    width: `${percentageWidth}%`,
                    backgroundColor: barColor,
                    boxShadow: `0 0 8px ${barColor}60`,
                  }}
                />
              </div>

              <p className="text-[11px] text-[#9DB4C7] mt-2 italic">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
