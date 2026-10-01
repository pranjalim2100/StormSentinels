import React from 'react';

interface WeatherMetricCardProps {
  label: string;
  value: string | number;
  unit?: string;
  icon: React.ReactNode;
  subtitle?: string;
  accentColor?: string;
}

export const WeatherMetricCard: React.FC<WeatherMetricCardProps> = ({
  label,
  value,
  unit = '',
  icon,
  subtitle,
  accentColor = '#29B6F6',
}) => {
  return (
    <div className="glass-card rounded-xl p-4 border border-[#9DB4C7]/15 flex items-center gap-3.5 hover:border-[#64D8FF]/30 transition-all">
      <div
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#071A2B] border border-[#9DB4C7]/20"
        style={{ color: accentColor }}
      >
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-[11px] font-bold text-[#9DB4C7] uppercase tracking-wider truncate">
          {label}
        </div>
        <div className="text-xl font-extrabold text-white tracking-tight flex items-baseline gap-1 mt-0.5">
          <span>{value}</span>
          {unit && <span className="text-xs font-semibold text-[#9DB4C7]">{unit}</span>}
        </div>
        {subtitle && (
          <div className="text-[10px] text-[#20C7B7] font-medium truncate mt-0.5">
            {subtitle}
          </div>
        )}
      </div>
    </div>
  );
};
