import axios, { AxiosInstance, AxiosResponse } from 'axios';
// import env from '@/config/env';

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

const createAPIError = (message: string, type: ErrorType, statusCode?: number, details?: any): APIError => {
  const error = new Error(message) as APIError;
  error.type = type;
  error.statusCode = statusCode;
  error.details = details;
  return error;
};

export const handleApiError = (error: any): APIError => {
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
    
    case 422:
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

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false,
  timeout: 30000,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    if (!config.headers) config.headers = {} as any;
    const headers: any = config.headers;
    if (typeof headers.set === 'function') {
      headers.set('Authorization', `Bearer ${token}`);
    } else {
      headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export const executeWithErrorHandling = async <T>(apiCall: () => Promise<AxiosResponse<T>>): Promise<T> => {
  try {
    const response = await apiCall();
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};