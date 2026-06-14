import { ZynuConfig } from "../types";

export class ZynuSDKError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly statusCode: number
  ) {
    super(message);
    this.name = "ZynuSDKError";
  }
}

export class HttpClient {
  private baseUrl: string;
  private apiKey: string;
  private timeout: number;

  constructor(config: ZynuConfig) {
    this.baseUrl = config.baseUrl ?? "https://api.zynu.net/v1";
    this.apiKey = config.apiKey;
    this.timeout = config.timeout ?? 30000;
  }

  private async request<T>(method: string, path: string, body?: unknown): Promise<T> {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), this.timeout);
    try {
      const res = await fetch(`${this.baseUrl}${path}`, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.apiKey}`,
          "X-SDK-Version": "0.1.0",
        },
        body: body ? JSON.stringify(body) : undefined,
        signal: controller.signal,
      });
      clearTimeout(timer);
      if (!res.ok) {
        const err = (await res.json()) as { message: string; code: string };
        throw new ZynuSDKError(err.message, err.code, res.status);
      }
      return res.json() as Promise<T>;
    } catch (err) {
      clearTimeout(timer);
      if (err instanceof ZynuSDKError) throw err;
      throw new ZynuSDKError("Network request failed", "NETWORK_ERROR", 0);
    }
  }

  get<T>(path: string): Promise<T> { return this.request<T>("GET", path); }
  post<T>(path: string, body: unknown): Promise<T> { return this.request<T>("POST", path, body); }
  patch<T>(path: string, body: unknown): Promise<T> { return this.request<T>("PATCH", path, body); }
  delete<T>(path: string): Promise<T> { return this.request<T>("DELETE", path); }
}
