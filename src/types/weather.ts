export interface Forecast {
  location: string;
  subLocation?: string;
  date: string;
  time: string;
  rainProbability: number; // e.g., 82 (%)
  expectedRainfall: number; // e.g., 10.4 (mm)
  temperature: number; // e.g., 29 (°C)
  humidity: number; // e.g., 81 (%)
  windSpeed: number; // e.g., 18 (km/h)
  pressure: number; // e.g., 1005 (hPa)
  cloudCover: number; // e.g., 78 (%)
}

export type VerdictStatus = 'LIKELY_RELIABLE' | 'UNCERTAIN' | 'POSSIBLE_FORECAST_BUST';

export interface Evidence {
  id: string;
  category: 'moisture' | 'precipitation' | 'atmospheric' | 'historical' | 'agreement';
  name: string;
  value: string;
  score: number; // 0 to 100
  interpretation: string;
  status: 'positive' | 'neutral' | 'negative';
  detail?: string;
  barsFilled?: number; // e.g., 10 out of 12
  totalBars?: number;
}

export interface EvidenceContribution {
  feature: string;
  impact: number; // e.g. +24 or -7
  direction: 'positive' | 'negative';
  description: string;
}

export interface ReliabilityResult {
  originalProbability: number;
  reliabilityScore: number;
  verdict: VerdictStatus;
  evidence: Evidence[];
  explanation: string;
  contributions: EvidenceContribution[];
  analogMatchCount: number;
  analogRainCount: number;
  modelConsensus: string;
}

export interface DemoScenario {
  id: string;
  title: string;
  subtitle: string;
  isBust: boolean;
  forecast: Forecast;
  result: ReliabilityResult;
  badgeLabel: string;
  description: string;
}

export interface ReliabilityBin {
  forecastBin: string; // e.g. "80-90%"
  forecastProb: number; // e.g. 0.85
  observedFreq: number; // e.g. 0.78
  perfectLine: number; // e.g. 0.85
  sampleCount: number;
}

export interface PerformanceMetrics {
  brierScore: number;
  calibration: number;
  forecastCases: number;
  bustDetectionF1: number;
  reliabilityBins: ReliabilityBin[];
  overTimeHistory: { date: string; reliability: number; actualRain: number; forecastProb: number }[];
}
