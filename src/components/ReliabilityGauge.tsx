import React from 'react';
import type { VerdictStatus } from '../types/weather';
import { getStatusConfig } from '../utils/reliability';
import { ReliabilityBadge } from './ReliabilityBadge';

interface ReliabilityGaugeProps {
  score: number;
  originalProbability: number;
  verdict: VerdictStatus;
  size?: number; // default 220
  subtitle?: string;
  showDetails?: boolean;
}

export const ReliabilityGauge: React.FC<ReliabilityGaugeProps> = ({
  score,
  originalProbability,
  verdict,
  size = 220,
  subtitle = 'FORECAST RELIABILITY',
  showDetails = true,
}) => {
  const config = getStatusConfig(verdict);
  
  const strokeWidth = 14;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const arcPercentage = 0.75; 
  const strokeDasharray = circumference * arcPercentage;
  const strokeDashoffset = strokeDasharray - (strokeDasharray * score) / 100;

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          className="transform -rotate-90 filter drop-shadow-lg"
        >
          {/* Background Arc */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="rgba(157, 180, 199, 0.12)"
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={0}
            strokeLinecap="round"
          />
          {/* Glowing Animated Value Arc */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={config.accentColor}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
            style={{
              filter: `drop-shadow(0 0 10px ${config.accentColor})`,
            }}
          />
        </svg>

        {/* Center Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-2">
          <span className="text-xs font-bold text-[#9DB4C7] tracking-widest uppercase mb-1">
            {subtitle}
          </span>
          <div className="flex items-baseline justify-center gap-1">
            <span
              className="text-5xl font-extrabold tracking-tight"
              style={{ color: config.accentColor }}
            >
              {score}
            </span>
            <span className="text-2xl font-bold text-[#9DB4C7]">%</span>
          </div>
          <div className="mt-2">
            <ReliabilityBadge verdict={verdict} size="sm" />
          </div>
        </div>
      </div>

      {showDetails && (
        <div className="mt-4 w-full max-w-sm rounded-xl bg-[#0D2638]/90 border border-[#9DB4C7]/15 p-3.5 text-center">
          <div className="flex items-center justify-between text-xs mb-1.5 px-1">
            <span className="text-[#9DB4C7]">Original Forecast Probability:</span>
            <span className="font-bold text-[#29B6F6] text-sm">{originalProbability}% chance of rain</span>
          </div>
          <div className="flex items-center justify-between text-xs pt-1.5 border-t border-[#9DB4C7]/10 px-1">
            <span className="text-[#9DB4C7]">STORMSENTINELS Reliability:</span>
            <span className="font-bold text-sm" style={{ color: config.accentColor }}>
              {score}% Support
            </span>
          </div>
          <p className="text-[11px] text-[#9DB4C7]/80 mt-2 italic leading-relaxed text-left border-t border-[#9DB4C7]/10 pt-2">
            💡 "Reliability is a separate assessment of how well the forecast is supported by available evidence."
          </p>
        </div>
      )}
    </div>
  );
};
