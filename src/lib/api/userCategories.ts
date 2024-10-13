import api from './api';

export const fetchUserCategoriesApi = async () => {
  const response = await api.get('user-category/');
  return response.data;
};

export const createUserCategoryApi = async (categoryData) => {
  const response = await api.post('user-category/', categoryData);
  return response.data;
};

export const removeUserCategoryApi = async (id) => {
  const response = await api.patch(`user-category/${id}`);
  return response.data;
};

export const removeAllUserCategoriesApi = async (id) => {
  const response = await api.delete(`user-category/${id}`);
  return response.data;
};
