// client/src/services/auth.service.js
import api from "./api";

const authService = {
	// Register new user
	register: async (userData) => {
		const response = await api.post("/auth/register", userData);
		return response.data;
	},

	// Login user
	login: async (credentials) => {
		const response = await api.post("/auth/login", credentials);
		return response.data;
	},

	// Logout user
	logout: async () => {
		const response = await api.post("/auth/logout");
		return response.data;
	},

	// Get current user
	getCurrentUser: async () => {
		const response = await api.get("/auth/me");
		return response.data;
	},

	// Update profile
	updateProfile: async (updates) => {
		const response = await api.patch("/auth/profile", updates);
		return response.data;
	},

	// Change password
	changePassword: async (passwordData) => {
		const response = await api.post("/auth/change-password", passwordData);
		return response.data;
	},

	// Forgot password
	forgotPassword: async (email) => {
		const response = await api.post("/auth/forgot-password", {email});
		return response.data;
	},

	// Reset password
	resetPassword: async (token, newPassword) => {
		const response = await api.post("/auth/reset-password", {
			token,
			password: newPassword,
		});
		return response.data;
	},

	// Verify email
	verifyEmail: async (token) => {
		const response = await api.post("/auth/verify-email", {token});
		return response.data;
	},

	// Resend verification email
	resendVerification: async () => {
		const response = await api.post("/auth/resend-verification");
		return response.data;
	},
};

export default authService;
