import axios from 'axios';
import { BASE_URL } from '../config.ts';

export const API_URL = BASE_URL;

const api = axios.create({
	baseURL: API_URL,
});

api.interceptors.request.use((config) => {
	config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
	return config;
});

api.interceptors.response.use(
	(config) => {
		return config;
	},
	async (error) => {
		console.log(error);
		const originalRequest = error.config;
		if (error.response.status === 401) {
			originalRequest._isRetry = true;
			try {
				const url = new URL(API_URL);
				url.pathname = "auth/token/refresh/";

				const response = await axios.post(
					url.toString(),
					{},
					{ withCredentials: true },
				);
				localStorage.setItem('token', response.data.access);
				return api.request(originalRequest);
			} catch (e) {
				console.log(e)
			}
		}

		throw error;
	},
);

export default api;