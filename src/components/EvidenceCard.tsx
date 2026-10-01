import React from 'react';
import type { Evidence } from '../types/weather';
import { Droplets, CloudRain, Thermometer, BarChart, Globe } from 'lucide-react';

interface EvidenceCardProps {
  evidence: Evidence;
}

export const EvidenceCard: React.FC<EvidenceCardProps> = ({ evidence }) => {
  const getIcon = () => {
    switch (evidence.category) {
      case 'moisture':
        return <Droplets className="w-5 h-5 text-[#29B6F6]" />;
      case 'precipitation':
        return <CloudRain className="w-5 h-5 text-[#64D8FF]" />;
      case 'atmospheric':
        return <Thermometer className="w-5 h-5 text-[#FFB84D]" />;
      case 'historical':
        return <BarChart className="w-5 h-5 text-[#20C7B7]" />;
      case 'agreement':
        return <Globe className="w-5 h-5 text-[#35D07F]" />;
    }
  };

  const getStatusColor = () => {
    if (evidence.status === 'positive') return '#35D07F';
    if (evidence.status === 'neutral') return '#FFB84D';
    return '#FF5C6C';
  };

  const statusColor = getStatusColor();
  const filledBars = evidence.barsFilled || Math.round((evidence.score / 100) * 12);
  const totalBars = evidence.totalBars || 12;

  const renderVisualBar = () => {
    const bars = [];
    for (let i = 0; i < totalBars; i++) {
      const isFilled = i < filledBars;
      bars.push(
        <span
          key={i}
          className={`h-4 w-2 rounded-xs transition-all ${
            isFilled ? 'shadow-xs' : 'bg-[#071A2B]'
          }`}
          style={{
            backgroundColor: isFilled ? statusColor : 'rgba(157, 180, 199, 0.12)',
            boxShadow: isFilled ? `0 0 6px ${statusColor}40` : 'none',
          }}
        />
      );
    }
    return <div className="flex items-center gap-1 my-2.5">{bars}</div>;
  };

  return (
    <div className="glass-card rounded-xl p-5 border border-[#9DB4C7]/15 flex flex-col justify-between hover:border-[#64D8FF]/30 transition-all">
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-[#071A2B] border border-[#9DB4C7]/20">
              {getIcon()}
            </div>
            <h4 className="text-xs font-black tracking-wider text-white uppercase font-mono">
              {evidence.name}
            </h4>
          </div>
          <span
            className="text-xs font-black px-2.5 py-1 rounded-full border"
            style={{
              color: statusColor,
              backgroundColor: `${statusColor}15`,
              borderColor: `${statusColor}30`,
            }}
          >
            {evidence.value}
          </span>
        </div>

        {renderVisualBar()}

        <p className="text-xs font-bold mt-2" style={{ color: statusColor }}>
          {evidence.interpretation}
        </p>
      </div>

      {evidence.detail && (
        <p className="text-[11px] text-[#9DB4C7]/80 mt-3 pt-2.5 border-t border-[#9DB4C7]/10 leading-relaxed">
          {evidence.detail}
        </p>
      )}
    </div>
  );
};
