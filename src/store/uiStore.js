// client/src/store/uiStore.js
import {create} from "zustand";

export const useUIStore = create((set) => ({
	// Sidebar
	sidebarOpen: true,
	toggleSidebar: () => set((state) => ({sidebarOpen: !state.sidebarOpen})),
	setSidebarOpen: (open) => set({sidebarOpen: open}),

	// Modal
	modalOpen: false,
	modalContent: null,
	openModal: (content) => set({modalOpen: true, modalContent: content}),
	closeModal: () => set({modalOpen: false, modalContent: null}),

	// Theme (for future dark mode)
	theme: "light",
	toggleTheme: () =>
		set((state) => ({
			theme: state.theme === "light" ? "dark" : "light",
		})),
	setTheme: (theme) => set({theme}),

	// Loading overlay
	globalLoading: false,
	setGlobalLoading: (loading) => set({globalLoading: loading}),

	// Toast notification state (optional, can use with react-hot-toast)
	notifications: [],
	addNotification: (notification) =>
		set((state) => ({
			notifications: [...state.notifications, notification],
		})),
	removeNotification: (id) =>
		set((state) => ({
			notifications: state.notifications.filter((n) => n.id !== id),
		})),
}));
