import React from 'react';
import type { VerdictStatus } from '../types/weather';
import { getStatusConfig } from '../utils/reliability';

interface ReliabilityBadgeProps {
  verdict: VerdictStatus;
  size?: 'sm' | 'md' | 'lg';
  showDot?: boolean;
}

export const ReliabilityBadge: React.FC<ReliabilityBadgeProps> = ({
  verdict,
  size = 'md',
  showDot = true,
}) => {
  const config = getStatusConfig(verdict);

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs font-semibold',
    md: 'px-3 py-1 text-xs font-bold tracking-wider',
    lg: 'px-4 py-1.5 text-sm font-extrabold tracking-widest',
  }[size];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border transition-all ${sizeClasses}`}
      style={{
        backgroundColor: config.badgeBg,
        borderColor: config.badgeBorder,
        color: config.badgeText,
      }}
    >
      {showDot && (
        <span
          className={`h-2 w-2 rounded-full animate-pulse ${config.dotColor}`}
          style={{ boxShadow: `0 0 8px ${config.accentColor}` }}
        />
      )}
      <span>{config.label}</span>
    </span>
  );
};
