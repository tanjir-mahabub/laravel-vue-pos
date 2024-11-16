import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: import.meta.VUE_APP_API_URL, // Backend URL
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosInstance;
