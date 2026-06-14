import { HttpClient } from "../utils/http";
import { Video, UploadOptions, PaginatedResponse, AnalyticsSummary } from "../types";

export class VideosResource {
  constructor(private http: HttpClient) {}

  list(params?: { page?: number; perPage?: number; sort?: "latest" | "popular" | "trending" }): Promise<PaginatedResponse<Video>> {
    const qs = new URLSearchParams();
    if (params?.page) qs.set("page", String(params.page));
    if (params?.perPage) qs.set("per_page", String(params.perPage));
    if (params?.sort) qs.set("sort", params.sort);
    return this.http.get<PaginatedResponse<Video>>(`/videos?${qs}`);
  }

  get(videoId: string): Promise<Video> {
    return this.http.get<Video>(`/videos/${videoId}`);
  }

  create(options: UploadOptions): Promise<{ uploadUrl: string; video: Video }> {
    return this.http.post("/videos", options);
  }

  update(videoId: string, options: Partial<UploadOptions>): Promise<Video> {
    return this.http.patch<Video>(`/videos/${videoId}`, options);
  }

  delete(videoId: string): Promise<void> {
    return this.http.delete(`/videos/${videoId}`);
  }

  getAnalytics(videoId: string, range: "7d" | "30d" | "90d" = "30d"): Promise<AnalyticsSummary> {
    return this.http.get<AnalyticsSummary>(`/videos/${videoId}/analytics?range=${range}`);
  }

  trending(limit = 20): Promise<Video[]> {
    return this.http.get<Video[]>(`/videos/trending?limit=${limit}`);
  }
}
