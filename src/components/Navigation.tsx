import React from 'react';
import { 
  Home, 
  CloudRain, 
  Radio, 
  BrainCircuit, 
  BarChart3, 
  TestTube, 
  Globe 
} from 'lucide-react';

export type NavTab = 
  | 'dashboard' 
  | 'forecast_check' 
  | 'evidence' 
  | 'reliability' 
  | 'why_result'
  | 'performance' 
  | 'scenarios' 
  | 'data_sources';

interface NavigationProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  const items = [
    { id: 'dashboard' as NavTab, label: 'Dashboard', icon: Home, symbol: '🏠' },
    { id: 'forecast_check' as NavTab, label: 'Forecast Check', icon: CloudRain, symbol: '🌧️' },
    { id: 'evidence' as NavTab, label: 'Evidence', icon: Radio, symbol: '📡' },
    { id: 'reliability' as NavTab, label: 'AI Assessment', icon: BrainCircuit, symbol: '🧠' },
    { id: 'performance' as NavTab, label: 'Performance', icon: BarChart3, symbol: '📊' },
    { id: 'scenarios' as NavTab, label: 'Demo Scenarios', icon: TestTube, symbol: '🧪' },
    { id: 'data_sources' as NavTab, label: 'Data Sources', icon: Globe, symbol: '🌐' },
  ];

  return (
    <nav className="w-full bg-[#0D2638] border-b border-[#9DB4C7]/15 lg:w-64 lg:border-r lg:border-b-0 lg:min-h-[calc(100vh-65px)] p-3 shrink-0">
      <div className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0 scrollbar-none">
        {items.map((item) => {
          const isActive = activeTab === item.id || (activeTab === 'why_result' && item.id === 'reliability');

          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-xs font-bold transition-all whitespace-nowrap ${
                isActive
                  ? 'bg-gradient-to-r from-[#29B6F6]/25 to-[#20C7B7]/15 text-[#64D8FF] border border-[#29B6F6]/40 shadow-lg shadow-[#29B6F6]/10'
                  : 'text-[#9DB4C7] hover:bg-[#14344D] hover:text-white'
              }`}
            >
              <span className="text-base">{item.symbol}</span>
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
