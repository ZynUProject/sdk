import { HttpClient } from "../utils/http";
import { User, PaginatedResponse } from "../types";

export class UsersResource {
  constructor(private http: HttpClient) {}

  get(userId: string): Promise<User> { return this.http.get<User>(`/users/${userId}`); }
  me(): Promise<User> { return this.http.get<User>("/users/me"); }

  subscribers(userId: string, page = 1): Promise<PaginatedResponse<User>> {
    return this.http.get<PaginatedResponse<User>>(`/users/${userId}/subscribers?page=${page}`);
  }

  subscribe(userId: string): Promise<void> { return this.http.post(`/users/${userId}/subscribe`, {}); }
  unsubscribe(userId: string): Promise<void> { return this.http.delete(`/users/${userId}/subscribe`); }

  search(query: string): Promise<User[]> {
    return this.http.get<User[]>(`/users/search?q=${encodeURIComponent(query)}`);
  }
}
