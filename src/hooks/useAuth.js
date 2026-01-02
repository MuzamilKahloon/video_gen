// client/src/hooks/useAuth.js
import {useState} from "react";
import toast from "react-hot-toast";
import {useAuthStore} from "@store/authStore";
import authService from "@services/auth.service";

export const useAuth = () => {
	const {login, register, logout, updateUser, user, isAuthenticated} =
		useAuthStore();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const handleLogin = async (credentials) => {
		try {
			setLoading(true);
			setError(null);
			const response = await authService.login(credentials);

			// ✅ Fixed: Access response.data.user and response.data.token
			login(response.data.user, response.data.token);

			toast.success("Welcome back!");
			return {success: true};
		} catch (err) {
			const message =
				err.response?.data?.message || "Login failed. Please try again.";
			setError(message);
			toast.error(message);
			return {success: false, error: message};
		} finally {
			setLoading(false);
		}
	};

	const handleRegister = async (userData) => {
		try {
			setLoading(true);
			setError(null);
			const response = await authService.register(userData);

			// ✅ Fixed: Access response.data.user and response.data.token
			register(response.data.user, response.data.token);

			toast.success("Account created successfully!");
			return {success: true};
		} catch (err) {
			const message =
				err.response?.data?.message || "Registration failed. Please try again.";
			setError(message);
			toast.error(message);
			return {success: false, error: message};
		} finally {
			setLoading(false);
		}
	};

	const handleLogout = async () => {
		try {
			await authService.logout();
			logout();
			toast.success("Logged out successfully");
		} catch (err) {
			// Logout anyway on client side
			logout();
		}
	};

	const handleUpdateProfile = async (updates) => {
		try {
			setLoading(true);
			const response = await authService.updateProfile(updates);

			// ✅ Fixed: Access response.data.user
			updateUser(response.data.user);

			toast.success("Profile updated successfully");
			return {success: true};
		} catch (err) {
			const message =
				err.response?.data?.message || "Update failed. Please try again.";
			toast.error(message);
			return {success: false, error: message};
		} finally {
			setLoading(false);
		}
	};

	const handleChangePassword = async (passwordData) => {
		try {
			setLoading(true);
			await authService.changePassword(passwordData);
			toast.success("Password changed successfully");
			return {success: true};
		} catch (err) {
			const message =
				err.response?.data?.message || "Failed to change password.";
			toast.error(message);
			return {success: false, error: message};
		} finally {
			setLoading(false);
		}
	};

	const handleForgotPassword = async (email) => {
		try {
			setLoading(true);
			await authService.forgotPassword(email);
			toast.success("Password reset email sent!");
			return {success: true};
		} catch (err) {
			const message =
				err.response?.data?.message || "Failed to send reset email.";
			toast.error(message);
			return {success: false, error: message};
		} finally {
			setLoading(false);
		}
	};

	const handleResetPassword = async (token, newPassword) => {
		try {
			setLoading(true);
			const response = await authService.resetPassword(token, newPassword);

			// Auto-login after password reset
			login(response.data.user, response.data.token);

			toast.success("Password reset successfully!");
			return {success: true};
		} catch (err) {
			const message =
				err.response?.data?.message || "Failed to reset password.";
			toast.error(message);
			return {success: false, error: message};
		} finally {
			setLoading(false);
		}
	};

	return {
		user,
		isAuthenticated,
		loading,
		error,
		login: handleLogin,
		register: handleRegister,
		logout: handleLogout,
		updateProfile: handleUpdateProfile,
		changePassword: handleChangePassword,
		forgotPassword: handleForgotPassword,
		resetPassword: handleResetPassword,
	};
};
