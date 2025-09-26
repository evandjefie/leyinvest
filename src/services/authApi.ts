import axios from 'axios';
import { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse, VerifyEmailRequest, VerifyEmailResponse, ResendCodeRequest, ChangePasswordRequest, UserProfile } from '@/types/api';

const apiBaseURL = "https://leyinvest-backend.onrender.com/api/v1/";
// const apiBaseURL = import.meta.env.VITE_API_BASE_URL as string;

export const http = axios.create({
  baseURL: apiBaseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false,
});

http.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    // Assure l'existence de headers et gère AxiosHeaders vs objet simple
    if (!config.headers) config.headers = {} as any;

    const headers: any = config.headers;
    if (typeof headers.set === 'function') {
      // AxiosHeaders instance
      headers.set('Authorization', `Bearer ${token}`);
    } else {
      headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export const authApi = {
  async register(data: RegisterRequest): Promise<RegisterResponse> {
    const { data: resp } = await http.post<RegisterResponse>('/users/register/', data);
    return resp;
  },

  async verifyEmail(data: VerifyEmailRequest): Promise<VerifyEmailResponse> {
    const { data: resp } = await http.post<VerifyEmailResponse>('/users/verify-email/', data);
    return resp;
  },

  async resendCode(data: ResendCodeRequest): Promise<{ message: string }> {
    const { data: resp } = await http.post<{ message: string }>('/users/resend-code/', data);
    return resp;
  },

  async login(data: LoginRequest): Promise<LoginResponse> {
    // 405 arrivait car ancien fetch utilisait mauvaise méthode/URL locale. Ici on poste vers API externe
    const { data: resp } = await http.post<LoginResponse>('/auth/login/', data);
    return resp;
  },

  async logout(): Promise<void> {
    await http.post('/auth/logout/');
  },

  async changePassword(data: ChangePasswordRequest): Promise<{ message: string }> {
    const { data: resp } = await http.post<{ message: string }>('/auth/change-password/', data);
    return resp;
  },

  async getCurrentUser(): Promise<UserProfile> {
    const { data } = await http.get<UserProfile>('/users/me/');
    return data;
  },

  async deleteMe(): Promise<{ message: string }> {
    const { data } = await http.delete<{ message: string }>('/users/me/');
    return data;
  },
};

export function setAuthToken(token: string) {
  localStorage.setItem('access_token', token);
}

export function clearAuthToken() {
  localStorage.removeItem('access_token');
}


