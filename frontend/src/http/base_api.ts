import axios from "axios";
import { BASE_URL } from "../config.ts";

export const API_URL = BASE_URL;

const api = axios.create({
    baseURL: API_URL,
});
console.log(BASE_URL);

api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem("at")}`;
    config.headers["ngrok-skip-browser-warning"] = "skip";
    return config;
});

api.interceptors.response.use(
    (config) => {
        return config;
    },
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401) {
            originalRequest._isRetry = true;
            try {
                const url = new URL(API_URL);
                url.pathname = "auth/refresh/";

                const response = await axios.post(url.toString(), {
                    refreshToken: localStorage.getItem("rt"),
                });
                localStorage.setItem("at", response.data.accessToken);
                return api.request(originalRequest);
            } catch (e) {
                // console.log(e);
            }
        }

        throw error;
    }
);

export default api;
