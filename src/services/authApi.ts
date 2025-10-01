import { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse, VerifyEmailRequest, VerifyEmailResponse, ResendCodeRequest, ChangePasswordRequest } from '@/types/api';
import { axiosInstance, executeWithErrorHandling } from './apiConfig';

export const authApi = {
  async register(data: RegisterRequest): Promise<RegisterResponse> {
    return executeWithErrorHandling(() => 
      axiosInstance.post<RegisterResponse>('/auth/register/', data)
    );
  },

  async verifyEmail(data: VerifyEmailRequest): Promise<VerifyEmailResponse> {
    return executeWithErrorHandling(() => 
      axiosInstance.post<VerifyEmailResponse>('/auth/verify-email/', data)
    );
  },

  async resendCode(data: ResendCodeRequest): Promise<{ message: string }> {
    return executeWithErrorHandling(() => 
      axiosInstance.post<{ message: string }>('/auth/resend-code/', data)
    );
  },

  async completeProfile(data: any): Promise<{ message: string }> {
    return executeWithErrorHandling(() => 
      axiosInstance.patch<{ message: string }>('/user/me/', data)
    );
  },

  async login(data: LoginRequest): Promise<LoginResponse> {
    return executeWithErrorHandling(async () => {
      const response = await axiosInstance.post<LoginResponse>('/auth/login/', data);
      localStorage.setItem('access_token', response.data.access_token);
      return response;
    });
  },

  async logout(): Promise<void> {
    return executeWithErrorHandling(async () => {
      await axiosInstance.post('/auth/logout/');
      localStorage.removeItem('access_token');
      return { data: undefined } as any;
    });
  },

  async changePassword(data: ChangePasswordRequest): Promise<{ message: string }> {
    return executeWithErrorHandling(() => 
      axiosInstance.post<{ message: string }>('/auth/change-password/', data)
    );
  },
};