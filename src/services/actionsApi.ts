import { axiosInstance, executeWithErrorHandling } from './apiConfig';

export interface Action {
  id: number;
  nom: string;
  symbole: string;
  secteur: string;
  prix_actuel?: number;
  variation?: number;
}

export interface ActionsResponse {
  actions: Action[];
  total: number;
}

export const actionsApi = {
  getActions: (params?: { secteur?: string; search?: string }) => {
    const queryParams = new URLSearchParams();
    if (params?.secteur) queryParams.append('secteur', params.secteur);
    if (params?.search) queryParams.append('search', params.search);
    
    const queryString = queryParams.toString();
    const url = `/api/v1/actions/${queryString ? `?${queryString}` : ''}`;
    
    return executeWithErrorHandling<ActionsResponse>(() => 
      axiosInstance.get(url)
    );
  },
};

export default actionsApi;
