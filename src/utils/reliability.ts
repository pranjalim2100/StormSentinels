import type { VerdictStatus } from '../types/weather';

export const RELIABILITY_THRESHOLDS = {
  HIGH_RELIABLE_MIN: 70, // >= 70% => LIKELY_RELIABLE
  UNCERTAIN_MIN: 40,     // 40% - 69% => UNCERTAIN
  // < 40% => POSSIBLE_FORECAST_BUST
} as const;

export interface StatusConfig {
  status: VerdictStatus;
  label: string;
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
  accentColor: string;
  glowClass: string;
  dotColor: string;
  iconSymbol: string;
}

export function getReliabilityStatus(score: number): VerdictStatus {
  if (score >= RELIABILITY_THRESHOLDS.HIGH_RELIABLE_MIN) {
    return 'LIKELY_RELIABLE';
  }
  if (score >= RELIABILITY_THRESHOLDS.UNCERTAIN_MIN) {
    return 'UNCERTAIN';
  }
  return 'POSSIBLE_FORECAST_BUST';
}

export function getStatusConfig(verdict: VerdictStatus): StatusConfig {
  switch (verdict) {
    case 'LIKELY_RELIABLE':
      return {
        status: 'LIKELY_RELIABLE',
        label: 'LIKELY RELIABLE',
        badgeBg: 'rgba(53, 208, 127, 0.12)',
        badgeBorder: 'rgba(53, 208, 127, 0.4)',
        badgeText: '#35D07F',
        accentColor: '#35D07F',
        glowClass: 'glow-green',
        dotColor: 'bg-[#35D07F]',
        iconSymbol: '🟢',
      };
    case 'UNCERTAIN':
      return {
        status: 'UNCERTAIN',
        label: 'UNCERTAIN',
        badgeBg: 'rgba(255, 184, 77, 0.12)',
        badgeBorder: 'rgba(255, 184, 77, 0.4)',
        badgeText: '#FFB84D',
        accentColor: '#FFB84D',
        glowClass: 'glow-amber',
        dotColor: 'bg-[#FFB84D]',
        iconSymbol: '🟡',
      };
    case 'POSSIBLE_FORECAST_BUST':
    default:
      return {
        status: 'POSSIBLE_FORECAST_BUST',
        label: 'POSSIBLE FORECAST BUST',
        badgeBg: 'rgba(255, 92, 108, 0.12)',
        badgeBorder: 'rgba(255, 92, 108, 0.4)',
        badgeText: '#FF5C6C',
        accentColor: '#FF5C6C',
        glowClass: 'glow-red',
        dotColor: 'bg-[#FF5C6C]',
        iconSymbol: '🔴',
      };
  }
}

export function getReliabilityInterpretation(originalProb: number, reliabilityScore: number, verdict: VerdictStatus): string {
  if (verdict === 'LIKELY_RELIABLE') {
    return `Current atmospheric evidence and model consensus provide substantial support (${reliabilityScore}%) for the original ${originalProb}% rain forecast.`;
  } else if (verdict === 'UNCERTAIN') {
    return `Available evidence shows mixed signals. While the original forecast indicates ${originalProb}% chance of rain, atmospheric stability and historical analogs suggest moderate uncertainty (${reliabilityScore}% support).`;
  } else {
    return `The original forecast indicates a high rain probability (${originalProb}%), but multiple critical evidence sources (radar, historical analogs, and moisture profile) provide weak support (${reliabilityScore}% reliability score). High risk of forecast bust.`;
  }
}
