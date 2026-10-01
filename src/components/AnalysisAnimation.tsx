import React, { useEffect, useState } from 'react';
import { CheckCircle2, Loader2, Cpu, Sparkles } from 'lucide-react';

interface AnalysisAnimationProps {
  onComplete: () => void;
  isLiveMode?: boolean;
}

export const AnalysisAnimation: React.FC<AnalysisAnimationProps> = ({
  onComplete,
  isLiveMode = false,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [progress, setProgress] = useState<number>(0);

  const steps = [
    { id: 1, label: 'COLLECTING FORECAST DATA...', check: 'Forecast probability & rain parameters' },
    { id: 2, label: 'ANALYSING ATMOSPHERIC CONDITIONS...', check: 'Humidity, pressure & wind profile' },
    { id: 3, label: 'CHECKING HISTORICAL ANALOGS...', check: 'Historical monsoon patterns & soundings' },
    { id: 4, label: 'ASSESSING FORECAST AGREEMENT...', check: 'Multi-model consensus (ECMWF, GFS, ICON)' },
    { id: 5, label: 'CALIBRATING RELIABILITY SCORE...', check: 'Bayesian calibration & uncertainty check' },
  ];

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= 5) {
          clearInterval(stepInterval);
          setTimeout(() => {
            onComplete();
          }, 400);
          return 5;
        }
        return prev + 1;
      });
    }, 500);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 4;
      });
    }, 80);

    return () => {
      clearInterval(stepInterval);
      clearInterval(progressInterval);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#071A2B]/95 backdrop-blur-xl p-4">
      <div className="w-full max-w-lg glass-card rounded-2xl p-6 border border-[#20C7B7]/40 shadow-2xl relative overflow-hidden text-center">
        {/* Radar Pulse animation behind overlay */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-15">
          <div className="w-96 h-96 border-2 border-[#20C7B7] rounded-full animate-radar-pulse" />
          <div className="w-64 h-64 border border-[#29B6F6] rounded-full animate-radar-pulse delay-200" />
        </div>

        {/* Top Header */}
        <div className="flex items-center justify-center gap-2 mb-2 text-[#20C7B7]">
          <Cpu className="w-6 h-6 animate-spin text-[#20C7B7]" />
          <span className="text-xs font-black tracking-widest uppercase font-mono">
            STORMSENTINELS AI ENGINE
          </span>
        </div>
        <h2 className="text-2xl font-black text-white tracking-tight mb-1">
          EVALUATING FORECAST RELIABILITY
        </h2>
        <p className="text-xs text-[#9DB4C7] mb-6">
          {isLiveMode ? '📡 Querying Live Open-Meteo & Atmospheric Soundings' : '🧪 Running Demo Scenario Verification Engine'}
        </p>

        {/* Progress Bar */}
        <div className="w-full bg-[#0D2638] h-3 rounded-full overflow-hidden p-0.5 border border-[#9DB4C7]/20 mb-6">
          <div
            className="h-full bg-gradient-to-r from-[#29B6F6] via-[#20C7B7] to-[#35D07F] rounded-full transition-all duration-100 ease-out shadow-md shadow-[#20C7B7]/40"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Steps Checklist */}
        <div className="space-y-3 text-left bg-[#071A2B]/80 rounded-xl p-4 border border-[#9DB4C7]/15">
          {steps.map((step) => {
            const isDone = currentStep > step.id;
            const isCurrent = currentStep === step.id;

            return (
              <div
                key={step.id}
                className={`flex items-center justify-between text-xs font-mono transition-all p-2 rounded-lg ${
                  isCurrent
                    ? 'bg-[#20C7B7]/15 text-white border border-[#20C7B7]/40'
                    : isDone
                    ? 'text-[#35D07F]'
                    : 'text-[#9DB4C7]/40'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  {isDone ? (
                    <CheckCircle2 className="w-4 h-4 text-[#35D07F] shrink-0" />
                  ) : isCurrent ? (
                    <Loader2 className="w-4 h-4 text-[#20C7B7] animate-spin shrink-0" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border border-[#9DB4C7]/30 shrink-0" />
                  )}
                  <span className="font-bold tracking-wide">{step.label}</span>
                </div>
                {isDone && (
                  <span className="text-[10px] text-[#35D07F] font-bold">✓ {step.check}</span>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-6 text-[11px] text-[#9DB4C7] flex items-center justify-center gap-1.5 font-mono">
          <Sparkles className="w-3.5 h-3.5 text-[#64D8FF]" />
          <span>FORECAST → EVIDENCE → AI EVALUATION → RELIABILITY</span>
        </div>
      </div>
    </div>
  );
};
