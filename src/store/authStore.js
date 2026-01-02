// client/src/store/authStore.js
import {create} from "zustand";
import {persist} from "zustand/middleware";

export const useAuthStore = create(
	persist(
		(set, get) => ({
			user: null,
			token: null,
			isAuthenticated: false,
			isLoading: true, // Start as true

			login: (userData, token) => {
				set({
					user: userData,
					token,
					isAuthenticated: true,
					isLoading: false,
				});
			},

			register: (userData, token) => {
				set({
					user: userData,
					token,
					isAuthenticated: true,
					isLoading: false,
				});
			},

			updateUser: (userData) => {
				set((state) => ({
					user: {...state.user, ...userData},
				}));
			},

			logout: () => {
				set({
					user: null,
					token: null,
					isAuthenticated: false,
					isLoading: false,
				});
			},

			setLoading: (loading) => {
				set({isLoading: loading});
			},

			// Initialize auth state (call this on app start)
			initializeAuth: () => {
				set({isLoading: false});
			},

			hasEnoughCredits: (required) => {
				const {user} = get();
				return user?.credits?.balance >= required;
			},

			deductCredits: (amount) => {
				set((state) => ({
					user: {
						...state.user,
						credits: {
							...state.user.credits,
							balance: state.user.credits.balance - amount,
						},
					},
				}));
			},

			addCredits: (amount) => {
				set((state) => ({
					user: {
						...state.user,
						credits: {
							...state.user.credits,
							balance: state.user.credits.balance + amount,
						},
					},
				}));
			},
		}),
		{
			name: "auth-storage",
			partialize: (state) => ({
				user: state.user,
				token: state.token,
				isAuthenticated: state.isAuthenticated,
			}),
			onRehydrateStorage: () => (state) => {
				// Set loading to false after hydration
				state?.setLoading(false);
			},
		}
	)
);
