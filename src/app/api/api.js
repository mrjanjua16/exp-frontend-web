import axios from "axios";

const api = axios.create({
    baseURL: process.env.SERVER_API_ROUTE,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor to include authorization tokens
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('authToken');
        if(token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Handle response errors globally
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Handle unauthorized erros
        if (error.response?.status === 401) {
            // Handle 401 errors globally, e.g., logout user
        }
        return Promise.reject(error);
    }
);

export default api;