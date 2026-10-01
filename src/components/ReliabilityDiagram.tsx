import React from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from 'recharts';
import type { ReliabilityBin } from '../types/weather';

interface ReliabilityDiagramProps {
  data: ReliabilityBin[];
}

export const ReliabilityDiagram: React.FC<ReliabilityDiagramProps> = ({ data }) => {
  return (
    <div className="glass-card rounded-2xl p-5 border border-[#9DB4C7]/20">
      <div className="flex items-center justify-between border-b border-[#9DB4C7]/15 pb-3 mb-4">
        <div>
          <h3 className="text-sm font-black text-white uppercase tracking-wider font-mono">
            RELIABILITY DIAGRAM (CALIBRATION CURVE)
          </h3>
          <p className="text-xs text-[#9DB4C7]">
            Forecast Probability (X) vs. Observed Frequency (Y) across historical evaluation bins
          </p>
        </div>
        <span className="text-[10px] font-bold px-2.5 py-1 rounded bg-[#35D07F]/15 text-[#35D07F] border border-[#35D07F]/30">
          WMO STANDARD VERIFICATION
        </span>
      </div>

      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 10, right: 20, bottom: 20, left: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(157, 180, 199, 0.15)" />
            <XAxis
              dataKey="forecastProb"
              domain={[0, 1]}
              type="number"
              tickFormatter={(v) => `${Math.round(v * 100)}%`}
              stroke="#9DB4C7"
              tick={{ fill: '#9DB4C7', fontSize: 11 }}
            />
            <YAxis
              domain={[0, 1]}
              type="number"
              tickFormatter={(v) => `${Math.round(v * 100)}%`}
              stroke="#9DB4C7"
              tick={{ fill: '#9DB4C7', fontSize: 11 }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#071A2B',
                borderColor: '#29B6F6',
                borderRadius: '8px',
                color: '#fff',
                fontSize: '12px',
              }}
              formatter={(val: any, name: any) => [
                `${Math.round(Number(val) * 100)}%`,
                name === 'perfectLine' ? 'Perfect Calibration' : 'Observed Rain Frequency',
              ]}
              labelFormatter={(label) => `Forecast Bin: ${Math.round(Number(label) * 100)}%`}
            />
            <Legend wrapperStyle={{ paddingTop: '10px', fontSize: '12px', color: '#9DB4C7' }} />
            
            {/* Perfect Calibration Reference Line (Diagonal) */}
            <Line
              type="monotone"
              dataKey="perfectLine"
              name="Perfect Calibration"
              stroke="#9DB4C7"
              strokeDasharray="5 5"
              strokeWidth={2}
              dot={false}
            />

            {/* STORMSENTINELS Model Points */}
            <Line
              type="monotone"
              dataKey="observedFreq"
              name="STORMSENTINELS Model"
              stroke="#20C7B7"
              strokeWidth={3}
              dot={{ r: 6, fill: '#20C7B7', stroke: '#071A2B', strokeWidth: 2 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-3 pt-3 border-t border-[#9DB4C7]/15 flex items-center justify-between text-xs text-[#9DB4C7]">
        <span>Points lying on the diagonal line indicate perfect probabilistic calibration.</span>
        <span className="font-bold text-[#20C7B7]">Brier Score = 0.14</span>
      </div>
    </div>
  );
};
