import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL as string;
const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export default axiosInstance;
