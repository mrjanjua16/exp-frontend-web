// src/app/api/auth.ts
import api from './api';

export const loginApi = async (payload) => {
    const response = await api.post('auth/login', payload);  // relative to baseURL
    return response.data;
};

export const signupApi = async (payload) => {
    const response = await api.post('auth/signup', payload);
    return response.data;
};

export const fetchUserApi = async () => {
    const response = await api.get('auth/');
    return response.data;
};

export const logoutApi = async () => {
    const response = await api.post('auth/logout');
    return response.data;
};
