import { UserProfile } from '@/types/api';
import { axiosInstance, executeWithErrorHandling } from './apiConfig';

export const userApi = {
  async getCurrentUser(): Promise<UserProfile> {
    return executeWithErrorHandling(() => 
      axiosInstance.get<UserProfile>('/users/me/')
    );
  },

  async updateProfile(data: Partial<UserProfile>): Promise<{ message: string }> {
    return executeWithErrorHandling(() => 
      axiosInstance.patch<{ message: string }>('/user/me/', data)
    );
  },

  async deleteMe(): Promise<{ message: string }> {
    return executeWithErrorHandling(() => 
      axiosInstance.delete<{ message: string }>('/users/me/')
    );
  },
};