import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`, // Replace with how you get the token
        'Content-Type': 'application/json',
    }
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
