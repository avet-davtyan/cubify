import api from '../http/base_api';

export default class AuthService {
	static async login(emailOrUsername: string, password: string) {
		return api.post(`auth/login/`, { emailOrUsername, password });
	}

	static async register(registrationData: { username: string; email: string; password: string }) {
		return api.post(`auth/register/`, registrationData);
	}

	static async logout() {
		return api.post(`auth/logout/`, {}, { withCredentials: true });
	}

	static async verify() {
		return api.post(`auth/verify/`, {});
	}

	static async refresh() {
		return api.post(
			`auth/token/refresh/`,
			{ access: localStorage.getItem('token') },
			{ withCredentials: true },
		);
	}
}
