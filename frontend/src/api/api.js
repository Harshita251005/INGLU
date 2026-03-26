import axios from 'axios';

// Create an Axios instance with base URL pointing to our Express server
// In production, you would point this to your Render/Railway deployed URL
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

// Axios response interceptor for handling errors globally (optional)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Return early if no response
    if (!error.response) return Promise.reject(error);
    return Promise.reject(error);
  }
);

export default api;
