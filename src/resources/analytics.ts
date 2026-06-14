import { HttpClient } from "../utils/http";
import { AnalyticsSummary } from "../types";

export interface DailyMetric {
  date: string;
  views: number;
  watchTimeMinutes: number;
  likes: number;
  subscribers: number;
}

export interface TrafficSource {
  source: "feed" | "trending" | "search" | "direct" | "external";
  views: number;
  percentage: number;
}

export class AnalyticsResource {
  constructor(private http: HttpClient) {}

  channelSummary(range: "7d" | "30d" | "90d" = "30d"): Promise<AnalyticsSummary> {
    return this.http.get<AnalyticsSummary>(`/analytics/channel?range=${range}`);
  }

  dailyMetrics(range: "7d" | "30d" | "90d" = "30d"): Promise<DailyMetric[]> {
    return this.http.get<DailyMetric[]>(`/analytics/daily?range=${range}`);
  }

  trafficSources(range: "7d" | "30d" = "30d"): Promise<TrafficSource[]> {
    return this.http.get<TrafficSource[]>(`/analytics/traffic-sources?range=${range}`);
  }

  topVideos(limit = 10): Promise<Array<{ videoId: string; title: string; views: number }>> {
    return this.http.get(`/analytics/top-videos?limit=${limit}`);
  }
}
