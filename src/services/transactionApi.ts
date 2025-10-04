import { axiosInstance, executeWithErrorHandling } from './apiConfig';

export interface TransactionRequest {
  action_id: number;
  type_transaction: 'achat' | 'vente';
  quantite: number;
  prix_unitaire: number;
  commentaire: string;
}

export interface TransactionResponse {
  id: number;
  action_id: number;
  type_transaction: 'achat' | 'vente';
  quantite: number;
  prix_unitaire: number;
  commentaire: string;
}

export const transactionApi = {
  createTransaction: (data: TransactionRequest) => {
    return executeWithErrorHandling<TransactionResponse>(() => 
      axiosInstance.post('/api/v1/transactions/', data)
    );
  },
};

export default transactionApi;