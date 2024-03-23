import { create } from 'zustand';
import AuthService from '../services/AuthService.jsx';

const useAuthStore = create((set) => ({
	isAuth: false,
	isLoading: true,
	user: null,

	setAuth: (bool: boolean) => set(() => ({ isAuth: bool })),
	setLoading: (bool: boolean) => set(() => ({ isLoading: bool })),

	// login: async (username, password) => {
	// 	try {
	// 		const response = await AuthService.login(username, password);
	// 		localStorage.setItem('token', response.data.access);
	// 		set(() => ({ isAuth: true }));
	// 	} catch (e) {
	// 		return e.code;
	// 	}
	// },

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

	// verify: async (navigateTo) => {
	// 	try {
	// 		const response = await AuthService.verify();
	// 		set(() => ({ isAuth: true, user: response.data }));
	// 	} catch (e) {
	// 		navigateTo();
	// 		return e.code;
	// 	}
	// },
}));

export default useAuthStore;
