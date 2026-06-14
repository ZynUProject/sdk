export interface ZynuConfig {
  apiKey: string;
  baseUrl?: string;
  timeout?: number;
}

export interface Video {
  id: string;
  title: string;
  description: string;
  duration: number;
  thumbnailUrl: string;
  streamUrl: string;
  creatorId: string;
  views: number;
  likes: number;
  createdAt: string;
  updatedAt: string;
  status: "processing" | "ready" | "failed";
  visibility: "public" | "unlisted" | "private";
}

export interface User {
  id: string;
  username: string;
  displayName: string;
  avatarUrl: string;
  bio: string;
  subscriberCount: number;
  videoCount: number;
  createdAt: string;
}

export interface UploadOptions {
  title: string;
  description?: string;
  visibility?: "public" | "unlisted" | "private";
  tags?: string[];
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  perPage: number;
  hasMore: boolean;
}

export interface AnalyticsSummary {
  totalViews: number;
  uniqueViewers: number;
  watchTimeMinutes: number;
  avgViewDuration: number;
  likes: number;
  shares: number;
  comments: number;
  subscribersGained: number;
}
