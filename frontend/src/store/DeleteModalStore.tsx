import { create } from "zustand";

interface useDeleteModalState {
    isOpen: boolean;

    setIsOpen: (bool: boolean) => void;
}
const useDeleteModalStore = create<useDeleteModalState>((set) => ({
    isOpen: false,

    setIsOpen: (bool: boolean) => set(() => ({ isOpen: bool })),
}));

export default useDeleteModalStore;
