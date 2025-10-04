import { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse, VerifyEmailRequest, VerifyEmailResponse, ResendCodeRequest, ChangePasswordRequest, ResetPasswordRequest, ResetPasswordResponse, ConfirmResetPasswordRequest, ConfirmResetPasswordResponse } from '@/types/api';
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
      axiosInstance.patch<{ message: string }>('/auth/complete-profile/', data)
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

  async resetPassword(data: ResetPasswordRequest): Promise<ResetPasswordResponse> {
    return executeWithErrorHandling(() => 
      axiosInstance.post<ResetPasswordResponse>('/auth/change-password/', data)
    );
  },

  async confirmResetPassword(token: string, data: ConfirmResetPasswordRequest): Promise<ConfirmResetPasswordResponse> {
    return executeWithErrorHandling(() => 
      axiosInstance.post<ConfirmResetPasswordResponse>(`/auth/change-password/${token}`, data)
    );
  },

  // Google SSO endpoints
  async googleLogin(): Promise<{ redirect_url: string }> {
    return executeWithErrorHandling(() => 
      axiosInstance.get<{ redirect_url: string }>('/auth/google/login')
    );
  },

  async googleCallback(code: string, state?: string): Promise<LoginResponse> {
    return executeWithErrorHandling(async () => {
      const response = await axiosInstance.get<LoginResponse>(`/auth/google/callback?code=${code}${state ? `&state=${state}` : ''}`);
      if (response.data.access_token) {
        localStorage.setItem('access_token', response.data.access_token);
      }
      return response;
    });
  },
};