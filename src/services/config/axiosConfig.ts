import axios, { AxiosInstance } from "axios";
import indexedDBService from "../storage/indexedDBService";

/**
 * Configuration de l'instance Axios
 */
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

/**
 * Création et configuration de l'instance Axios
 */
export const createAxiosInstance = (): AxiosInstance => {
  const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      "Content-Type": "application/json",
    },
    timeout: 30000, // Increased from 10s to 30s
  });

  // Intercepteur pour ajouter le token d'authentification
  api.interceptors.request.use(
    async (config) => {
      const token = await indexedDBService.getItem("access_token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Intercepteur pour gérer les erreurs de réponse
  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      // Handle timeout errors with retry
      if (error.code === "ECONNABORTED" && error.message.includes("timeout")) {
        if (!originalRequest._retryCount) {
          originalRequest._retryCount = 0;
        }

        if (originalRequest._retryCount < 2) {
          // Retry up to 2 times
          originalRequest._retryCount++;
          console.log(
            `⏱️ Timeout on ${originalRequest.url}, retrying (${originalRequest._retryCount}/2)...`
          );
          return api(originalRequest);
        }
      }

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        // Essayer de rafraîchir le token
        const refreshToken = await indexedDBService.getItem(
          "refresh_token"
        );
        if (refreshToken) {
          try {
            const response = await api.post("/auth/refresh", {
              refresh_token: refreshToken,
            });
            await indexedDBService.setItem(
              "ley_token",
              response.data.access_token
            );
            await indexedDBService.setItem(
              "ley_refresh_token",
              response.data.refresh_token
            );
            originalRequest.headers.Authorization = `Bearer ${response.data.access_token}`;
            return api(originalRequest);
          } catch (refreshError) {
            // Si le refresh échoue, nettoyer IndexedDB
            await indexedDBService.removeItem("ley_token");
            await indexedDBService.removeItem("ley_refresh_token");
            await indexedDBService.removeItem("ley_user");
          }
        } else {
          // Pas de refresh token, nettoyer IndexedDB
          await indexedDBService.removeItem("ley_token");
          await indexedDBService.removeItem("ley_refresh_token");
          await indexedDBService.removeItem("ley_user");
        }
      }

      return Promise.reject(error);
    }
  );

  return api;
};

/**
 * Instance Axios partagée
 */
export const axiosInstance = createAxiosInstance();

/**
 * Gestion centralisée des erreurs
 */
export const handleApiError = (error: any): Error => {
  console.error("API Error:", error);

  if (error.response) {
    // Erreur de réponse du serveur
    const status = error.response.status;
    let message =
      error.response.data?.message ||
      error.response.data?.error ||
      "Une erreur est survenue";

    // Gestion spécifique des erreurs CORS
    if (status === 0 || error.code === "ERR_NETWORK") {
      message =
        "Erreur de connexion au serveur. Vérifiez votre connexion internet.";
    } else if (status === 401) {
      message = "Session expirée. Veuillez vous reconnecter.";
    } else if (status === 403) {
      message = "Accès refusé. Vous n'avez pas les permissions nécessaires.";
    } else if (status === 404) {
      message = "Ressource non trouvée.";
    } else if (status === 405) {
      message =
        "Méthode HTTP non autorisée. Veuillez contacter l'administrateur.";
    } else if (status === 500) {
      message = "Erreur serveur. Veuillez réessayer plus tard.";
    }

    return new Error(message);
  } else if (error.request) {
    // Erreur de réseau ou CORS
    if (
      error.message?.includes("CORS") ||
      error.message?.includes("Network Error")
    ) {
      return new Error(
        "Erreur CORS. Le serveur ne permet pas cette méthode de requête."
      );
    }
    return new Error("Erreur de connexion. Vérifiez votre connexion internet.");
  } else {
    // Autre erreur
    return new Error("Une erreur inattendue est survenue");
  }
};
