import axios from "axios";
import { API_BASE_URL } from "../utils/constantes";

export const axiosConfig = axios.create({
    baseURL: API_BASE_URL || "",
    headers: {
    'Content-Type': 'application/json',
  },
})

axiosConfig.interceptors.request.use(
    async (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);