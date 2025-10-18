import { axiosInstance, executeWithErrorHandling } from './apiConfig';

export interface PortfolioStats {
  total_value: number;
  total_invested: number;
  total_return: number;
  return_percentage: number;
  number_of_positions: number;
}

export interface PortfolioPosition {
  id: number;
  action_id: number;
  action_nom: string;
  action_symbole: string;
  quantite_totale: number;
  prix_moyen_achat: number;
  valeur_actuelle: number;
  plus_value: number;
  pourcentage_gain: number;
}

export interface PortfolioResponse {
  stats: PortfolioStats;
  positions: PortfolioPosition[];
}

export const portfolioApi = {
  getPortfolio: () => {
    return executeWithErrorHandling<PortfolioResponse>(() => 
      axiosInstance.get('/portfolio/')
    );
  },

  getPortfolioStats: () => {
    return executeWithErrorHandling<PortfolioStats>(() => 
      axiosInstance.get('/portfolio/stats/')
    );
  },

  getPortfolioPositions: () => {
    return executeWithErrorHandling<{ positions: PortfolioPosition[] }>(() => 
      axiosInstance.get('/portfolio/positions/')
    );
  },
};

export default portfolioApi;
