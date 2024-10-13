import api from './api';

interface TransactionData {
  amount: Number,
  category_id: Number,
  date: String,
}

export const fetchTransactionsApi = async () => {
  const response = await api.get('transaction/');
  return response.data;
};

export const createTransactionApi = async (transactionData: TransactionData) => {
  const response = await api.post('transaction/', transactionData);
  return response.data;
};

export const deleteTransactionApi = async (id: Number) => {
  const response = await api.delete(`transaction/${id}`);
  return response.data;
};
