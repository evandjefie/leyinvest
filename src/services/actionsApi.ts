import { axiosInstance, executeWithErrorHandling } from './apiConfig';

export interface Action {
  id: number;
  nom: string;
  symbole: string;
  secteur: string;
  prix_actuel?: number;
  variation?: number;
  volume?: number;
  capitalisation?: number;
  description?: string;
}

export interface ActionsResponse {
  actions: Action[];
  total: number;
}

export const actionsApi = {
  getActions: (params?: { secteur?: string; search?: string; limit?: number; offset?: number }) => {
    const queryParams = new URLSearchParams();
    if (params?.secteur) queryParams.append('secteur', params.secteur);
    if (params?.search) queryParams.append('search', params.search);
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.offset) queryParams.append('offset', params.offset.toString());
    
    const queryString = queryParams.toString();
    const url = `/actions/${queryString ? `?${queryString}` : ''}`;
    
    return executeWithErrorHandling<ActionsResponse>(() => 
      axiosInstance.get(url)
    );
  },

  getActionById: (id: number) => {
    return executeWithErrorHandling<Action>(() => 
      axiosInstance.get(`/actions/${id}`)
    );
  },

  getSecteurs: () => {
    return executeWithErrorHandling<{ secteurs: string[] }>(() => 
      axiosInstance.get('/actions/secteurs/')
    );
  },
};

export default actionsApi;
