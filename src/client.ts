import { ZynuConfig } from "./types";
import { HttpClient } from "./utils/http";
import { validateApiKey } from "./utils/auth";
import { VideosResource } from "./resources/videos";
import { UsersResource } from "./resources/users";
import { AnalyticsResource } from "./resources/analytics";

export class ZynuClient {
  public readonly videos: VideosResource;
  public readonly users: UsersResource;
  public readonly analytics: AnalyticsResource;
  private http: HttpClient;

  constructor(config: ZynuConfig) {
    if (!validateApiKey(config.apiKey)) {
      throw new Error(
        "Invalid API key. Keys must start with \'zynu_\' followed by 32+ alphanumeric characters."
      );
    }
    this.http = new HttpClient(config);
    this.videos = new VideosResource(this.http);
    this.users = new UsersResource(this.http);
    this.analytics = new AnalyticsResource(this.http);
  }
}
