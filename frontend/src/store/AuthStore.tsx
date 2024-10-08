import { create } from "zustand";
import AuthService from "../services/AuthService";
import { GeneralUser } from "../types/AuthTypes";

interface AuthState {
    isAuth: boolean;
    isLoading: boolean;
    user: GeneralUser | null;
    setAuth: (bool: boolean) => void;
    setLoading: (bool: boolean) => void;
    login: (emailOrUsername: string, password: string) => void;
    verify: () => void;
    reset: () => void;
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
            localStorage.setItem("at", response.data.accessToken);
            localStorage.setItem("rt", response.data.refreshToken);
            set(() => ({ isAuth: true }));
        } catch (e: any) {
            throw e;
        }
    },
    reset: () => {
        localStorage.clear();
        set(() => ({ isAuth: false, user: null, isLoading: true }));
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
        const response = await AuthService.verify();
        const user = response.data as GeneralUser;
        set(() => ({ isAuth: true, user: user }));
    },
}));

export default useAuthStore;
