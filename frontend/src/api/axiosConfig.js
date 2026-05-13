import axios from 'axios';

// Set the base URL based on environment
// For now, I will use the Render backend URL if you have one, or keep it as local for testing.
// IMPORTANT: Once you deploy your backend to Render, replace the URL below.
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export default axiosInstance;
