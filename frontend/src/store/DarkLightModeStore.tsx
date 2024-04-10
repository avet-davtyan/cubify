import { create } from 'zustand';

interface useDarkModeState {
	darkMode: boolean;

	setDarkMode: (bool: boolean) => void;
}
const useDarkModeStore = create<useDarkModeState>((set) => ({
	darkMode: true,

	setDarkMode: (bool: boolean) => set(() => ({ darkMode: bool })),
}));

export default useDarkModeStore;
