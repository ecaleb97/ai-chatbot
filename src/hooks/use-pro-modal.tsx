import { create } from "zustand";

type useProModalStore = {
	isOpen: boolean;
	onOpenModal: () => void;
	onCloseModal: () => void;
};

export const useProModal = create<useProModalStore>((set) => ({
	isOpen: false,
	onOpenModal: () => set({ isOpen: true }),
	onCloseModal: () => set({ isOpen: false }),
}));
