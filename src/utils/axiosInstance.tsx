import axios from 'axios';
const apiUrl = "http://localhost:8080";
export const BASE_URL = "http://localhost:8080"

console.log('apiUrl',apiUrl);

const axiosInstance = axios.create({
  baseURL: `${apiUrl}/api/admin`,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token'); 
    
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;