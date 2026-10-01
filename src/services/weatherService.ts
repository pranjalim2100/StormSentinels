import type { Forecast } from '../types/weather';
import { SCENARIO_SUPPORTED_RAIN, SCENARIO_FORECAST_BUST } from '../data/demoScenarios';

export interface WeatherProvider {
  getForecast(location: string): Promise<Forecast>;
}

export class DemoWeatherProvider implements WeatherProvider {
  private scenarioId: string;

  constructor(scenarioId: string = 'scenario-a') {
    this.scenarioId = scenarioId;
  }

  async getForecast(location: string): Promise<Forecast> {
    if (this.scenarioId === 'scenario-b') {
      return { ...SCENARIO_FORECAST_BUST.forecast, location };
    }
    return { ...SCENARIO_SUPPORTED_RAIN.forecast, location };
  }
}

export class OpenMeteoWeatherProvider implements WeatherProvider {
  private coordsMap: Record<string, { lat: number; lng: number }> = {
    mumbai: { lat: 19.076, lng: 72.8777 },
    pune: { lat: 18.5204, lng: 73.8567 },
    nashik: { lat: 20.0, lng: 73.78 },
    nagpur: { lat: 21.1458, lng: 79.0882 },
    ratnagiri: { lat: 16.9902, lng: 73.312 },
  };

  async getForecast(location: string): Promise<Forecast> {
    const key = location.toLowerCase();
    const coords = this.coordsMap[key] || this.coordsMap['mumbai'];

    try {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lng}&current=temperature_2m,relative_humidity_2m,surface_pressure,wind_speed_10m,cloud_cover,rain&hourly=precipitation_probability,precipitation&timezone=auto`;
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`OpenMeteo HTTP error ${res.status}`);
      }
      const data = await res.json();
      
      const current = data.current || {};
      const hourly = data.hourly || {};
      
      const rainProbs: number[] = hourly.precipitation_probability || [75];
      const maxRainProb = Math.max(...rainProbs.slice(0, 24));
      const expectedRain = (hourly.precipitation || [5]).slice(0, 24).reduce((a: number, b: number) => a + b, 0);

      return {
        location: location.charAt(0).toUpperCase() + location.slice(1),
        subLocation: 'Maharashtra (Live Open-Meteo)',
        date: 'Today / Tomorrow',
        time: `${new Date().getHours()}:00 IST`,
        rainProbability: Math.min(Math.max(maxRainProb, 10), 95),
        expectedRainfall: Number(expectedRain.toFixed(1)) || 8.4,
        temperature: Math.round(current.temperature_2m ?? 29),
        humidity: Math.round(current.relative_humidity_2m ?? 78),
        windSpeed: Math.round(current.wind_speed_10m ?? 14),
        pressure: Math.round(current.surface_pressure ?? 1008),
        cloudCover: Math.round(current.cloud_cover ?? 72),
      };
    } catch (err) {
      console.warn('Live weather API failed, falling back to Demo Provider:', err);
      return {
        ...SCENARIO_SUPPORTED_RAIN.forecast,
        location: `${location} (Fallback)`,
      };
    }
  }
}
