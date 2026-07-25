import { apiClient } from '@/lib/api-client';
import { LoginInput } from '@/schemas/auth.schema';
import { ApiResponse, AuthResponse, User } from '@/types/auth';

export const authService = {
  async login(credentials: LoginInput): Promise<AuthResponse> {
    const response = await apiClient.post<ApiResponse<AuthResponse>>(
      '/auth/login',
      credentials,
    );
    return response.data.data;
  },

  async getProfile(): Promise<User> {
    const response = await apiClient.get<ApiResponse<User>>('/auth/me');
    return response.data.data;
  },
};
