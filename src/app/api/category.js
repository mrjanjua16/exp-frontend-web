import api from './api';

export const fetchCategoriesApi = async () => {
  const response = await api.get('category/');
  return response.data;
};

export const createCategoryApi = async (categoryData) => {
  const response = await api.post('category/', categoryData);
  return response.data;
};

export const listCategoryApi = async () => {
    const response = await api.get('category/');
    return response.data;
  };

export const updateCategoryApi = async (id, categoryData) => {
  const response = await api.patch(`category/${id}`, categoryData);
  return response.data;
};

export const deleteCategoryApi = async (id) => {
  const response = await api.delete(`category/${id}`);
  return response.data;
};
