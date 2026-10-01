import React from 'react';
import { DataSourceCard } from '../components/DataSourceCard';
import { Globe } from 'lucide-react';

export const DataSourcesPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="border-b border-[#9DB4C7]/15 pb-4">
        <span className="text-xs font-black text-[#64D8FF] uppercase tracking-widest font-mono flex items-center gap-1.5">
          <Globe className="w-4 h-4" />
          METHODOLOGY & INTEGRATIONS
        </span>
        <h2 className="text-3xl font-black text-white mt-1">RESEARCH BASIS & DATA SOURCES</h2>
        <p className="text-sm text-[#9DB4C7] mt-1">
          StormSentinels leverages authoritative global and Indian meteorological datasets, WMO verification standards, and ensemble reanalysis.
        </p>
      </div>

      <DataSourceCard />
    </div>
  );
};
