import { axiosInstance, executeWithErrorHandling } from './apiConfig';

export interface TransactionRequest {
  action_id: number;
  type_transaction: 'achat' | 'vente';
  quantite: number;
  prix_unitaire: number;
  commentaire?: string;
}

export interface TransactionResponse {
  id: number;
  action_id: number;
  action_nom?: string;
  type_transaction: 'achat' | 'vente';
  quantite: number;
  prix_unitaire: number;
  montant_total: number;
  commentaire?: string;
  date_transaction: string;
  user_id: number;
}

export const transactionApi = {
  createTransaction: (data: TransactionRequest) => {
    return executeWithErrorHandling<{ message: string; transaction: TransactionResponse }>(() => 
      axiosInstance.post('/transactions/', data)
    );
  },

  getTransactions: (params?: { limit?: number; offset?: number; type_transaction?: string }) => {
    const queryParams = new URLSearchParams();
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.offset) queryParams.append('offset', params.offset.toString());
    if (params?.type_transaction) queryParams.append('type_transaction', params.type_transaction);
    
    const queryString = queryParams.toString();
    const url = `/transactions/${queryString ? `?${queryString}` : ''}`;
    
    return executeWithErrorHandling<{ transactions: TransactionResponse[]; total: number }>(() => 
      axiosInstance.get(url)
    );
  },

  getTransactionById: (id: number) => {
    return executeWithErrorHandling<TransactionResponse>(() => 
      axiosInstance.get(`/transactions/${id}`)
    );
  },

  updateTransaction: (id: number, data: Partial<TransactionRequest>) => {
    return executeWithErrorHandling<{ message: string; transaction: TransactionResponse }>(() => 
      axiosInstance.patch(`/transactions/${id}`, data)
    );
  },

  deleteTransaction: (id: number) => {
    return executeWithErrorHandling<{ message: string }>(() => 
      axiosInstance.delete(`/transactions/${id}`)
    );
  },
};

export default transactionApi;