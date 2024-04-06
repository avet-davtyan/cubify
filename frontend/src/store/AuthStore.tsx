import { create } from 'zustand';
import AuthService from '../services/AuthService';

interface AuthState {
	isAuth: boolean;
	isLoading: boolean;
	user: { id: number; username: string; email: string; fullName: string } | null;
	setAuth: (bool: boolean) => void;
	setLoading: (bool: boolean) => void;
	login: (emailOrUsername: string, password: string) => void;
	verify: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
	isAuth: false,
	isLoading: true,
	user: null,

	setAuth: (bool: boolean) => set(() => ({ isAuth: bool })),
	setLoading: (bool: boolean) => set(() => ({ isLoading: bool })),

	login: async (emailOrUsername: string, password: string) => {
		try {
			const response = await AuthService.login(emailOrUsername, password);
			localStorage.setItem('at', response.data.accessToken);
			localStorage.setItem('rt', response.data.refreshToken);
			console.log(response.data.accessToken);
			set(() => ({ isAuth: true }));
		} catch (e: any) {
			throw e;
		}
	},

	// logout: async () => {
	// 	try {
	// 		await AuthService.logout();
	// 		localStorage.removeItem('token');
	// 		document.cookie = `refresh=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
	// 		set(() => ({ isAuth: false, user: null, isLoading: true }));
	// 	} catch (e) {
	// 		return e.code;
	// 	}
	// },

	// refresh: async () => {
	// 	set(() => ({ isLoading: true }));
	// 	try {
	// 		set(() => ({ isAuth: true }));
	// 	} catch (e) {
	// 		return e.code;
	// 	} finally {
	// 		set(() => ({ isLoading: false }));
	// 	}
	// },

	verify: async () => {
		try {
			const response = await AuthService.verify();
			set(() => ({ isAuth: true, user: response.data }));
		} catch (e) {
			// console.log(e);
		}
	},
}));

export default useAuthStore;
