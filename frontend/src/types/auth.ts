export interface User {
  id: string;
  username: string;
  email: string;
  role: string;
  lastLogin?: string;
}

export interface AuthResponse {
  accessToken: string;
  user: User;
}

export type { ApiResponse } from './api';

