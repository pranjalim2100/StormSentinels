import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from 'recharts';
import { DEMO_PERFORMANCE_METRICS } from '../data/demoScenarios';
import { ReliabilityDiagram } from './ReliabilityDiagram';
import { Award, Target, Activity, ShieldAlert, Info } from 'lucide-react';

export const PerformanceCharts: React.FC = () => {
  const metrics = DEMO_PERFORMANCE_METRICS;

  return (
    <div className="space-y-6">
      {/* Metric Cards Header */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-card rounded-xl p-4 border border-[#20C7B7]/30">
          <div className="flex items-center justify-between text-[#9DB4C7] text-xs mb-1">
            <span className="font-bold">Brier Score</span>
            <Target className="w-4 h-4 text-[#20C7B7]" />
          </div>
          <div className="text-3xl font-black text-white font-mono">
            {metrics.brierScore}
          </div>
          <div className="text-[10px] text-[#35D07F] font-semibold mt-1">
            Lower is better (0.0 = perfect)
          </div>
        </div>

        <div className="glass-card rounded-xl p-4 border border-[#29B6F6]/30">
          <div className="flex items-center justify-between text-[#9DB4C7] text-xs mb-1">
            <span className="font-bold">Calibration Score</span>
            <Award className="w-4 h-4 text-[#29B6F6]" />
          </div>
          <div className="text-3xl font-black text-white font-mono">
            {metrics.calibration}%
          </div>
          <div className="text-[10px] text-[#29B6F6] font-semibold mt-1">
            Well-calibrated probability
          </div>
        </div>

        <div className="glass-card rounded-xl p-4 border border-[#64D8FF]/30">
          <div className="flex items-center justify-between text-[#9DB4C7] text-xs mb-1">
            <span className="font-bold">Forecast Cases</span>
            <Activity className="w-4 h-4 text-[#64D8FF]" />
          </div>
          <div className="text-3xl font-black text-white font-mono">
            {metrics.forecastCases}
          </div>
          <div className="text-[10px] text-[#9DB4C7] font-semibold mt-1">
            Evaluated monsoon forecasts
          </div>
        </div>

        <div className="glass-card rounded-xl p-4 border border-[#FF5C6C]/30">
          <div className="flex items-center justify-between text-[#9DB4C7] text-xs mb-1">
            <span className="font-bold">Bust Detection F1</span>
            <ShieldAlert className="w-4 h-4 text-[#FF5C6C]" />
          </div>
          <div className="text-3xl font-black text-[#FF5C6C] font-mono">
            {metrics.bustDetectionF1}%
          </div>
          <div className="text-[10px] text-[#FF5C6C] font-semibold mt-1">
            High precision bust flag
          </div>
        </div>
      </div>

      {/* Main Calibration Diagram */}
      <ReliabilityDiagram data={metrics.reliabilityBins} />

      {/* Over-Time Reliability vs Actual Rain Chart */}
      <div className="glass-card rounded-2xl p-5 border border-[#9DB4C7]/20">
        <div className="flex items-center justify-between border-b border-[#9DB4C7]/15 pb-3 mb-4">
          <div>
            <h3 className="text-sm font-black text-white uppercase tracking-wider font-mono">
              FORECAST RELIABILITY OVER TIME vs. ACTUAL RAIN
            </h3>
            <p className="text-xs text-[#9DB4C7]">
              Historical tracking comparing original forecast probability, StormSentinels reliability score, and actual ground rain
            </p>
          </div>
          <span className="text-[10px] font-bold px-2.5 py-1 rounded bg-[#29B6F6]/15 text-[#64D8FF] border border-[#29B6F6]/30">
            7-DAY HISTORICAL RUN
          </span>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={metrics.overTimeHistory} margin={{ top: 10, right: 20, bottom: 20, left: 0 }}>
              <defs>
                <linearGradient id="relGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#20C7B7" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#20C7B7" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(157, 180, 199, 0.15)" />
              <XAxis dataKey="date" stroke="#9DB4C7" tick={{ fill: '#9DB4C7', fontSize: 11 }} />
              <YAxis stroke="#9DB4C7" tick={{ fill: '#9DB4C7', fontSize: 11 }} domain={[0, 100]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#071A2B',
                  borderColor: '#20C7B7',
                  borderRadius: '8px',
                  color: '#fff',
                  fontSize: '12px',
                }}
              />
              <Legend wrapperStyle={{ paddingTop: '10px', fontSize: '12px', color: '#9DB4C7' }} />
              <Area
                type="monotone"
                dataKey="forecastProb"
                name="Original Forecast Prob (%)"
                stroke="#29B6F6"
                strokeWidth={2}
                fill="none"
                strokeDasharray="4 4"
              />
              <Area
                type="monotone"
                dataKey="reliability"
                name="StormSentinels Reliability (%)"
                stroke="#20C7B7"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#relGrad)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-4 p-3 bg-[#071A2B]/80 rounded-xl border border-[#9DB4C7]/15 flex items-center gap-2 text-xs text-[#9DB4C7]">
          <Info className="w-4 h-4 text-[#FFB84D] shrink-0" />
          <span>
            <strong>Bust Case Highlight (Sep 24):</strong> Original forecast claimed 90% rain, but StormSentinels correctly flagged low reliability (28%). No rain occurred.
          </span>
        </div>
      </div>
    </div>
  );
};
