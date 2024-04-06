import { create } from 'zustand';
import AuthService from '../services/AuthService';
import api from '../http/base_api';

interface CubeState {
	cubeCount: number | null;
	getCubeCount: () => void;
}

const useCubeStore = create<CubeState>((set) => ({
	cubeCount: null,

	getCubeCount: async () => {
		try {
			const response = await api.get('cube/count');
			set(() => ({ cubeCount: response.data }));
		} catch {}
	},
}));

export default useCubeStore;
