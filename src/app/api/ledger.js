import api from './api';

export const createLedgerPlannedApi = async (payload) => {
  const response = await api.post('ledger/', payload);
  return response.data;
};

export const fetchLedgerPerMonthApi = async (month) => {
  const response = await api.post('/ledger/month', month);
  return response.data;
};

export const fetchLedgerPerCategoryApi = async (category) => {
    const response = await api.post('/ledger/category', category);
    return response.data;
};
