import React from 'react';
import type { DemoScenario } from '../types/weather';
import { SCENARIO_SUPPORTED_RAIN, SCENARIO_FORECAST_BUST } from '../data/demoScenarios';
import { ScenarioCard } from '../components/ScenarioCard';
import { TestTube, Info } from 'lucide-react';

interface ScenariosPageProps {
  onSelectScenario: (scenario: DemoScenario) => void;
}

export const ScenariosPage: React.FC<ScenariosPageProps> = ({ onSelectScenario }) => {
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="border-b border-[#9DB4C7]/15 pb-4">
        <span className="text-xs font-black text-[#FFB84D] uppercase tracking-widest font-mono flex items-center gap-1.5">
          <TestTube className="w-4 h-4" />
          HACKATHON DEMONSTRATION SUITE
        </span>
        <h2 className="text-3xl font-black text-white mt-1">DEMO SCENARIOS</h2>
        <p className="text-sm text-[#9DB4C7] mt-1">
          Select a pre-calibrated scenario to evaluate how StormSentinels distinguishes well-supported forecasts from potential forecast busts.
        </p>
      </div>

      {/* Scenario Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ScenarioCard scenario={SCENARIO_SUPPORTED_RAIN} onRunScenario={onSelectScenario} />
        <ScenarioCard scenario={SCENARIO_FORECAST_BUST} onRunScenario={onSelectScenario} />
      </div>

      <div className="p-4 bg-[#071A2B]/80 rounded-xl border border-[#9DB4C7]/15 flex items-start gap-3 text-xs text-[#9DB4C7]">
        <Info className="w-5 h-5 text-[#20C7B7] shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong className="text-white">Hackathon Presentation Tip:</strong> Demonstrating both scenarios illustrates StormSentinels' central capability: detecting when a high-probability forecast (87%) is actually unsupported by underlying atmospheric physics (23% reliability score).
        </div>
      </div>
    </div>
  );
};
