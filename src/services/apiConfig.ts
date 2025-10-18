import axios, { AxiosInstance, AxiosResponse } from 'axios';

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
        data?.message || 'Session expirée. Veuillez vous reconnecter.',
        ErrorType.AUTH_ERROR,
        status
      );

    case 403:
      return createAPIError(
        data?.message || 'Accès refusé. Vous n\'avez pas les permissions nécessaires.',
        ErrorType.AUTH_ERROR,
        status
      );

    case 404:
      return createAPIError(
        data?.message || 'Service non trouvé. L\'URL demandée n\'existe pas.',
        ErrorType.SERVER_ERROR,
        status
      );

    case 422:
      // Gestion spécifique pour Laravel (structure différente de FastAPI)
      let validationMessage = 'Erreur de validation des données';

      // Format Laravel: { errors: { field: ["message"] } }
      if (data?.errors && typeof data.errors === 'object') {
        const firstField = Object.keys(data.errors)[0];
        const firstError = data.errors[firstField];
        if (Array.isArray(firstError) && firstError[0]) {
          validationMessage = firstError[0];
        }
      }
      // Format FastAPI: { detail: [{ msg: "..." }] }
      else if (data?.detail && Array.isArray(data.detail)) {
        const firstError = data.detail[0];
        if (firstError?.msg) {
          validationMessage = firstError.msg;
        }
      }
      // Format générique
      else if (data?.message) {
        validationMessage = data.message;
      }

      return createAPIError(
        validationMessage,
        ErrorType.VALIDATION_ERROR,
        status,
        data
      );

    case 429: {
      const retryAfter = error.response.headers['retry-after'];
      const retryMessage = retryAfter
        ? 'Trop de tentatives. Réessayez dans ${retryAfter} secondes.'
        : 'Trop de tentatives. Veuillez patienter avant de réessayer.';

      return createAPIError(
        data?.message || retryMessage,
        ErrorType.SERVER_ERROR,
        status
      );
    }

    case 500:
    case 502:
    case 503:
    case 504:
      return createAPIError(
        data?.message || 'Erreur serveur temporaire. Veuillez réessayer dans quelques instants.',
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

// Configuration de l'API
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://leyinvest.skygroups.ci/api/v1';

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: false, // false pour token-based auth (Sanctum avec Bearer Token)
  timeout: 30000,
});

/**
 * 🔥 INTERCEPTEUR REQUEST - CRITIQUE POUR CORS
 */
axiosInstance.interceptors.request.use(
  (config) => {
    // 1️⃣ ENLEVER LE TRAILING SLASH (évite la redirection 301 qui casse CORS)
    if (config.url && config.url.endsWith('/')) {
      config.url = config.url.slice(0, -1);
    }

    // 2️⃣ AJOUTER LE TOKEN D'AUTHENTIFICATION
    const token = localStorage.getItem('access_token') || localStorage.getItem('auth_token');
    if (token) {
      if (!config.headers) config.headers = {} as any;
      const headers: any = config.headers;

      // Compatibilité avec les différentes versions d'Axios
      if (typeof headers.set === 'function') {
        headers.set('Authorization', `Bearer ${token}`);
      } else {
        headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * 🔥 INTERCEPTEUR RESPONSE - GESTION AUTOMATIQUE DES ERREURS
 */
axiosInstance.interceptors.response.use(
  (response) => {
    // Réponse réussie, retourner tel quel
    return response;
  },
  (error) => {
    // Gestion automatique de la déconnexion sur 401
    if (error.response?.status === 401) {
      // Nettoyer le localStorage
      localStorage.removeItem('access_token');
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');

      // Rediriger vers la page de connexion (si pas déjà sur /login)
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

/**
 * Wrapper pour exécuter des appels API avec gestion d'erreurs automatique
 */
export const executeWithErrorHandling = async <T>(
  apiCall: () => Promise<AxiosResponse<T>>
): Promise<T> => {
  try {
    const response = await apiCall();
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Helper pour logger les erreurs en développement
 */
export const logApiError = (error: APIError, context?: string) => {
  if (import.meta.env.DEV) {
    console.error(`[API Error${context ? ` - ${context}` : ''}]`, {
      type: error.type,
      message: error.message,
      statusCode: error.statusCode,
      details: error.details,
    });
  }
};

export default axiosInstance;