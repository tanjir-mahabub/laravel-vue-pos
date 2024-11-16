import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: import.meta.VUE_APP_API_URL, // Backend URL
    headers: {
        'Content-Type': 'application/json',
    },
});

// Intercept requests to add the Authorization header
axiosInstance.interceptors.request.use(
    config => {
        const token = localStorage.getItem('auth_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
