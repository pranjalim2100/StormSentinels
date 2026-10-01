import React from 'react';
import type { DemoScenario } from '../types/weather';
import { ReliabilityBadge } from './ReliabilityBadge';
import { Play } from 'lucide-react';

interface ScenarioCardProps {
  scenario: DemoScenario;
  onRunScenario: (scenario: DemoScenario) => void;
}

export const ScenarioCard: React.FC<ScenarioCardProps> = ({ scenario, onRunScenario }) => {
  const isBust = scenario.isBust;
  const statusColor = isBust ? '#FF5C6C' : '#35D07F';

  return (
    <div
      className={`glass-card rounded-2xl p-6 border transition-all flex flex-col justify-between ${
        isBust
          ? 'hover:border-[#FF5C6C]/60 hover:shadow-lg hover:shadow-[#FF5C6C]/10'
          : 'hover:border-[#35D07F]/60 hover:shadow-lg hover:shadow-[#35D07F]/10'
      }`}
    >
      <div>
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <span className="text-[10px] font-black px-2.5 py-1 rounded bg-[#071A2B] text-[#9DB4C7] border border-[#9DB4C7]/20 uppercase tracking-widest font-mono">
            {scenario.badgeLabel}
          </span>
          <ReliabilityBadge verdict={scenario.result.verdict} size="sm" />
        </div>

        {/* Title */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-2xl">{isBust ? '⚠️' : '🌧️'}</span>
          <h3 className="text-xl font-black text-white">{scenario.title}</h3>
        </div>
        <p className="text-xs text-[#9DB4C7] mb-5">{scenario.subtitle}</p>

        {/* Forecast Comparison Box */}
        <div className="bg-[#071A2B]/90 rounded-xl p-4 border border-[#9DB4C7]/15 space-y-3 mb-5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-[#9DB4C7]">Original Forecast Probability:</span>
            <span className="font-extrabold text-white text-base">
              {scenario.forecast.rainProbability}% Rain
            </span>
          </div>

          <div className="flex items-center justify-between text-xs pt-2 border-t border-[#9DB4C7]/10">
            <span className="text-[#9DB4C7]">STORMSENTINELS Reliability:</span>
            <span className="font-black text-base" style={{ color: statusColor }}>
              {scenario.result.reliabilityScore}% Support
            </span>
          </div>
        </div>

        {/* Summary Description */}
        <p className="text-xs text-[#9DB4C7] leading-relaxed mb-6">
          {scenario.description}
        </p>
      </div>

      {/* Primary CTA */}
      <button
        onClick={() => onRunScenario(scenario)}
        className={`w-full flex items-center justify-center gap-2 font-extrabold px-5 py-3 rounded-xl shadow-lg transition-all text-sm tracking-wider uppercase ${
          isBust
            ? 'bg-gradient-to-r from-[#FF5C6C] to-[#FFB84D] text-[#071A2B] hover:opacity-95'
            : 'bg-gradient-to-r from-[#35D07F] to-[#20C7B7] text-[#071A2B] hover:opacity-95'
        }`}
      >
        <Play className="w-4 h-4 fill-current" />
        <span>RUN SCENARIO</span>
      </button>
    </div>
  );
};
