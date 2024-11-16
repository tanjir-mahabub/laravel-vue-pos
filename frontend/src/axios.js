import axios from 'axios'

axios.defaults.baseURL = 'http://127.0.0.1:8000/api'  // Backend API URL

// Add Authorization header for authenticated requests
const token = localStorage.getItem('auth_token')
if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

export default axios
