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

// Types d'erreur pour une gestion précise
export enum ErrorType {
  NETWORK_ERROR = 'NETWORK_ERROR',
  CORS_ERROR = 'CORS_ERROR',
  TIMEOUT_ERROR = 'TIMEOUT_ERROR',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  AUTH_ERROR = 'AUTH_ERROR',
  SERVER_ERROR = 'SERVER_ERROR',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR'
}

export interface APIError extends Error {
  type: ErrorType;
  statusCode?: number;
  details?: any;
}

// Fonction pour créer des erreurs typées
const createAPIError = (message: string, type: ErrorType, statusCode?: number, details?: any): APIError => {
  const error = new Error(message) as APIError;
  error.type = type;
  error.statusCode = statusCode;
  error.details = details;
  return error;
};

// Fonction de gestion centralisée des erreurs
const handleAPIError = (error: any): APIError => {
  console.error('[API Error]', error);

  // Erreur de réseau (pas de connexion, CORS, etc.)
  if (!error.response) {
    if (error.code === 'ECONNABORTED') {
      return createAPIError(
        'La connexion a expiré. Vérifiez votre connexion internet et réessayez.',
        ErrorType.TIMEOUT_ERROR
      );
    }
    
    if (error.code === 'ERR_NETWORK') {
      return createAPIError(
        'Problème de connexion réseau. Vérifiez votre connexion internet.',
        ErrorType.NETWORK_ERROR
      );
    }

    if (error.message?.toLowerCase().includes('cors')) {
      return createAPIError(
        'Erreur de configuration CORS. Contactez le support technique.',
        ErrorType.CORS_ERROR
      );
    }

    return createAPIError(
      'Impossible de joindre le serveur. Vérifiez votre connexion internet.',
      ErrorType.NETWORK_ERROR
    );
  }

  const { status, data } = error.response;

  // Gestion des erreurs par statut HTTP
  switch (status) {
    case 400:
      return createAPIError(
        data?.message || 'Données invalides. Vérifiez vos informations.',
        ErrorType.VALIDATION_ERROR,
        status,
        data
      );
    
    case 401:
      return createAPIError(
        'Session expirée. Veuillez vous reconnecter.',
        ErrorType.AUTH_ERROR,
        status
      );
    
    case 403:
      return createAPIError(
        'Accès refusé. Vous n\'avez pas les permissions nécessaires.',
        ErrorType.AUTH_ERROR,
        status
      );
    
    case 404:
      return createAPIError(
        'Service non trouvé. L\'URL demandée n\'existe pas.',
        ErrorType.SERVER_ERROR,
        status
      );
    
    case 405:
      return createAPIError(
        'Méthode non autorisée. Erreur de configuration du serveur.',
        ErrorType.SERVER_ERROR,
        status
      );
    
    case 422:
      // Erreur de validation avec détails
      let validationMessage = 'Erreur de validation des données';
      if (data?.detail && Array.isArray(data.detail)) {
        const firstError = data.detail[0];
        if (firstError?.msg) {
          validationMessage = firstError.msg;
        }
      }
      return createAPIError(
        validationMessage,
        ErrorType.VALIDATION_ERROR,
        status,
        data
      );
    
    case 429:
      return createAPIError(
        'Trop de tentatives. Veuillez patienter avant de réessayer.',
        ErrorType.SERVER_ERROR,
        status
      );
    
    case 500:
    case 502:
    case 503:
    case 504:
      return createAPIError(
        'Erreur serveur temporaire. Veuillez réessayer dans quelques instants.',
        ErrorType.SERVER_ERROR,
        status
      );
    
    default:
      return createAPIError(
        data?.message || 'Une erreur inattendue s\'est produite.',
        ErrorType.UNKNOWN_ERROR,
        status,
        data
      );
  }
};

// Fonction wrapper pour exécuter les appels API avec gestion d'erreur
const executeWithErrorHandling = async <T>(apiCall: () => Promise<T>): Promise<T> => {
  try {
    return await apiCall();
  } catch (error) {
    throw handleAPIError(error);
  }
};

export const authApi = {
  async register(data: RegisterRequest): Promise<RegisterResponse> {
    return executeWithErrorHandling(async () => {
      const { data: resp } = await http.post<RegisterResponse>('/register/step1/', data);
      return resp;
    });
  },

  async verifyEmail(data: VerifyEmailRequest): Promise<VerifyEmailResponse> {
    return executeWithErrorHandling(async () => {
      const { data: resp } = await http.post<VerifyEmailResponse>('/register/step2/verify-email/', data);
      return resp;
    });
  },

  async resendCode(data: ResendCodeRequest): Promise<{ message: string }> {
    return executeWithErrorHandling(async () => {
      const { data: resp } = await http.post<{ message: string }>('/register/step2/resend-code/', data);
      return resp;
    });
  },

  async completeProfile(data: any): Promise<{ message: string }> {
    return executeWithErrorHandling(async () => {
      const { data: resp } = await http.post<{ message: string }>('/register/step3/complete-profile/', data);
      return resp;
    });
  },

  async login(data: LoginRequest): Promise<LoginResponse> {
    return executeWithErrorHandling(async () => {
      const { data: resp } = await http.post<LoginResponse>('/auth/login/', data);
      return resp;
    });
  },

  async logout(): Promise<void> {
    return executeWithErrorHandling(async () => {
      await http.post('/auth/logout/');
    });
  },

  async changePassword(data: ChangePasswordRequest): Promise<{ message: string }> {
    return executeWithErrorHandling(async () => {
      const { data: resp } = await http.post<{ message: string }>('/auth/change-password/', data);
      return resp;
    });
  },

  async getCurrentUser(): Promise<UserProfile> {
    return executeWithErrorHandling(async () => {
      const { data } = await http.get<UserProfile>('/users/me/');
      return data;
    });
  },

  async deleteMe(): Promise<{ message: string }> {
    return executeWithErrorHandling(async () => {
      const { data } = await http.delete<{ message: string }>('/users/me/');
      return data;
    });
  },
};

export function setAuthToken(token: string) {
  localStorage.setItem('access_token', token);
}

export function clearAuthToken() {
  localStorage.removeItem('access_token');
}


