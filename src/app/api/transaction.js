import api from './api';

export const fetchTransactionsApi = async () => {
  const response = await api.get('transaction/');
  return response.data;
};

export const createTransactionsApi = async (transactionData) => {
  const response = await api.post('transaction/', transactionData);
  return response.data;
};

export const deleteTransactionApi = async (id) => {
  const response = await api.delete(`transaction/${id}`);
  return response.data;
};
