import React from 'react';
import { Database, BookOpen, Layers, Radar, ExternalLink } from 'lucide-react';

export const DataSourceCard: React.FC = () => {
  const sections = [
    {
      title: 'FORECAST DATA',
      icon: Database,
      items: [
        { name: 'Historical Forecast Runs', desc: '10-year archive of numerical weather prediction model runs (GFS & ECMWF HRES)' },
        { name: 'Ensemble Outputs', desc: '50-member ECMWF ensemble spread & probability density distributions' },
      ],
    },
    {
      title: 'WEATHER DATA',
      icon: Layers,
      items: [
        { name: 'Historical Observations', desc: 'IMD surface rain gauge network & automatic weather stations (AWS)' },
        { name: 'ERA5 Reanalysis', desc: '5th generation ECMWF global atmospheric reanalysis dataset (30km grid resolution)' },
      ],
    },
    {
      title: 'CURRENT CONDITIONS',
      icon: ExternalLink,
      items: [
        { name: 'Atmospheric Variables', desc: 'Real-time radiosonde soundings, precipitable water, lapse rates & surface pressure' },
        { name: 'Open-Meteo REST API', desc: 'High-resolution hourly weather forecasts & current atmospheric metrics' },
      ],
    },
    {
      title: 'FUTURE INTEGRATIONS',
      icon: Radar,
      items: [
        { name: 'Doppler Weather Radar (DWR)', desc: 'Real-time reflectivity & velocity volume scans from IMD Mumbai radar' },
        { name: 'Satellite Imagery', desc: 'INSAT-3D thermal infrared & water vapor channel convective tracking' },
      ],
    },
  ];

  const scientificBasis = [
    { name: 'WMO', full: 'World Meteorological Organization', desc: 'Forecast verification frameworks & probabilistic reliability calibration protocols' },
    { name: 'IMD', full: 'India Meteorological Department', desc: 'Indian monsoon synoptic climatology and regional rain verification standards' },
    { name: 'NOAA', full: 'National Oceanic & Atmospheric Administration', desc: 'Global atmospheric reanalysis models and radiosonde sounding standards' },
    { name: 'ECMWF', full: 'European Centre for Medium-Range Weather Forecasts', desc: 'Probabilistic ensemble forecasting and Brier Score decomposition' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sections.map((sec, idx) => {
          const Icon = sec.icon;
          return (
            <div key={idx} className="glass-card rounded-2xl p-5 border border-[#9DB4C7]/20">
              <div className="flex items-center gap-2.5 border-b border-[#9DB4C7]/15 pb-3 mb-4 text-[#20C7B7]">
                <Icon className="w-5 h-5" />
                <h3 className="text-xs font-black tracking-wider uppercase font-mono text-white">
                  {sec.title}
                </h3>
              </div>
              <div className="space-y-3">
                {sec.items.map((item, i) => (
                  <div key={i} className="bg-[#071A2B]/80 rounded-xl p-3 border border-[#9DB4C7]/15">
                    <div className="text-xs font-bold text-white flex items-center justify-between">
                      <span>{item.name}</span>
                      <span className="text-[10px] text-[#20C7B7] font-mono">ACTIVE</span>
                    </div>
                    <div className="text-[11px] text-[#9DB4C7] mt-1 leading-relaxed">
                      {item.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Scientific Basis Section */}
      <div className="glass-card rounded-2xl p-6 border border-[#64D8FF]/30">
        <div className="flex items-center gap-2 border-b border-[#9DB4C7]/15 pb-4 mb-4 text-[#64D8FF]">
          <BookOpen className="w-6 h-6" />
          <div>
            <h3 className="text-base font-black text-white">SCIENTIFIC & METEOROLOGICAL BASIS</h3>
            <p className="text-xs text-[#9DB4C7]">Rigorous meteorological principles powering StormSentinels verification engine</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {scientificBasis.map((sb, idx) => (
            <div key={idx} className="bg-[#071A2B]/90 rounded-xl p-4 border border-[#9DB4C7]/15">
              <div className="text-lg font-black text-[#29B6F6] font-mono mb-1">{sb.name}</div>
              <div className="text-xs font-bold text-white mb-2">{sb.full}</div>
              <div className="text-[11px] text-[#9DB4C7] leading-relaxed">{sb.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
