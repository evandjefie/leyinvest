import { UserProfile } from '@/types/api';
import { axiosInstance, executeWithErrorHandling } from './apiConfig';

export const userApi = {
  async getCurrentUser(): Promise<UserProfile> {
    return executeWithErrorHandling(() => 
      axiosInstance.get<UserProfile>('/users/me/')
    );
  },

  async updateProfile(data: Partial<UserProfile>): Promise<{ message: string; user: UserProfile }> {
    return executeWithErrorHandling(() => 
      axiosInstance.patch<{ message: string; user: UserProfile }>('/users/me/', data)
    );
  },

  async deleteMe(): Promise<{ message: string }> {
    return executeWithErrorHandling(() => 
      axiosInstance.delete<{ message: string }>('/users/me/')
    );
  },

  async uploadDocument(file: File, documentType: string): Promise<{ message: string; document_url: string }> {
    return executeWithErrorHandling(() => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('document_type', documentType);
      return axiosInstance.post<{ message: string; document_url: string }>('/users/documents/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    });
  },
};