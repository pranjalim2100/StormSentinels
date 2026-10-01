import { useState, useEffect, useCallback } from 'react';
import type { Forecast, ReliabilityResult, DemoScenario } from './types/weather';
import { SCENARIO_SUPPORTED_RAIN, SCENARIO_FORECAST_BUST } from './data/demoScenarios';
import { OpenMeteoWeatherProvider } from './services/weatherService';
import { evaluateForecastReliability } from './services/reliabilityService';

import { WeatherHeader } from './components/WeatherHeader';
import { Navigation, type NavTab } from './components/Navigation';
import { AnalysisAnimation } from './components/AnalysisAnimation';
import { QRCodeModal } from './components/QRCodeModal';

import { Dashboard } from './pages/Dashboard';
import { ForecastCheck } from './pages/ForecastCheck';
import { EvidencePage } from './pages/Evidence';
import { ReliabilityPage } from './pages/Reliability';
import { WhyResultPage } from './pages/WhyResult';
import { PerformancePage } from './pages/Performance';
import { ScenariosPage } from './pages/Scenarios';
import { DataSourcesPage } from './pages/DataSources';

export function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('dashboard');
  const [dataMode, setDataMode] = useState<'demo' | 'live'>('demo');
  const [selectedLocation, setSelectedLocation] = useState<string>('Mumbai');
  const [currentScenario, setCurrentScenario] = useState<DemoScenario>(SCENARIO_SUPPORTED_RAIN);
  
  const [forecast, setForecast] = useState<Forecast>(SCENARIO_SUPPORTED_RAIN.forecast);
  const [reliabilityResult, setReliabilityResult] = useState<ReliabilityResult>(SCENARIO_SUPPORTED_RAIN.result);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [isScannerOpen, setIsScannerOpen] = useState<boolean>(false);

  // Load weather and calculate reliability whenever location or mode changes
  const updateWeatherData = useCallback(async (locationName: string, mode: 'demo' | 'live', scenarioPreset?: DemoScenario) => {
    if (scenarioPreset && mode === 'demo') {
      setCurrentScenario(scenarioPreset);
      setForecast(scenarioPreset.forecast);
      setReliabilityResult(scenarioPreset.result);
      return;
    }

    if (mode === 'live') {
      const provider = new OpenMeteoWeatherProvider();
      const fetchedForecast = await provider.getForecast(locationName);
      setForecast(fetchedForecast);
      const evalResult = evaluateForecastReliability(fetchedForecast, false);
      setReliabilityResult(evalResult);
    } else {
      // Demo mode fallback logic
      const isBust = scenarioPreset?.isBust || currentScenario.isBust;
      const baseForecast = isBust ? SCENARIO_FORECAST_BUST.forecast : SCENARIO_SUPPORTED_RAIN.forecast;
      const updatedForecast = { ...baseForecast, location: locationName };
      setForecast(updatedForecast);
      const evalResult = evaluateForecastReliability(updatedForecast, isBust);
      setReliabilityResult(evalResult);
    }
  }, [currentScenario.isBust]);

  useEffect(() => {
    updateWeatherData(selectedLocation, dataMode);
  }, [selectedLocation, dataMode, updateWeatherData]);

  const handleLocationChange = (newLocation: string) => {
    setSelectedLocation(newLocation);
  };

  const handleModeToggle = () => {
    const nextMode = dataMode === 'demo' ? 'live' : 'demo';
    setDataMode(nextMode);
  };

  // Trigger 2-3s AI Analysis animation sequence
  const handleTriggerAnalysis = () => {
    setIsAnalyzing(true);
  };

  const handleAnalysisComplete = () => {
    setIsAnalyzing(false);
    setActiveTab('reliability');
  };

  const handleSelectScenario = (scenario: DemoScenario) => {
    setCurrentScenario(scenario);
    setSelectedLocation(scenario.forecast.location);
    updateWeatherData(scenario.forecast.location, 'demo', scenario);
    // Automatically trigger analysis for demo impact!
    setIsAnalyzing(true);
  };

  return (
    <div className="min-h-screen bg-[#071A2B] text-[#F7FAFC] flex flex-col font-sans selection:bg-[#20C7B7] selection:text-[#071A2B]">
      {/* Header */}
      <WeatherHeader
        location={selectedLocation}
        onLocationChange={handleLocationChange}
        dataMode={dataMode}
        onModeToggle={handleModeToggle}
        onOpenScanner={() => setIsScannerOpen(true)}
      />

      {/* Main Layout Container */}
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Navigation Sidebar */}
        <Navigation activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          {activeTab === 'dashboard' && (
            <Dashboard
              forecast={forecast}
              result={reliabilityResult}
              onCheckForecast={() => setActiveTab('forecast_check')}
              onViewEvidence={() => setActiveTab('evidence')}
              onSelectLocation={handleLocationChange}
              onViewPerformance={() => setActiveTab('performance')}
            />
          )}

          {activeTab === 'forecast_check' && (
            <ForecastCheck
              forecast={forecast}
              onRunAICheck={handleTriggerAnalysis}
            />
          )}

          {activeTab === 'evidence' && (
            <EvidencePage
              evidenceList={reliabilityResult.evidence}
              onProceedToResult={() => setActiveTab('reliability')}
            />
          )}

          {activeTab === 'reliability' && (
            <ReliabilityPage
              result={reliabilityResult}
              onViewWhy={() => setActiveTab('why_result')}
              onViewEvidence={() => setActiveTab('evidence')}
              onViewPerformance={() => setActiveTab('performance')}
            />
          )}

          {activeTab === 'why_result' && (
            <WhyResultPage
              result={reliabilityResult}
              onBackToResult={() => setActiveTab('reliability')}
            />
          )}

          {activeTab === 'performance' && <PerformancePage />}

          {activeTab === 'scenarios' && (
            <ScenariosPage onSelectScenario={handleSelectScenario} />
          )}

          {activeTab === 'data_sources' && <DataSourcesPage />}
        </main>
      </div>

      {/* AI Analysis 5-Step Animation Sequence Modal */}
      {isAnalyzing && (
        <AnalysisAnimation
          onComplete={handleAnalysisComplete}
          isLiveMode={dataMode === 'live'}
        />
      )}

      {/* PowerPoint Scanner QR Modal */}
      <QRCodeModal
        isOpen={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
        defaultUrl="http://localhost:5173"
      />
    </div>
  );
}

export default App;
