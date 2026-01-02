// client/src/services/api.js
import axios from "axios";
import {API_URL} from "@utils/constants";
import {useAuthStore} from "@store/authStore";
import toast from "react-hot-toast";

// Create axios instance
const api = axios.create({
	baseURL: API_URL,
	timeout: 30000,
	headers: {
		"Content-Type": "application/json",
	},
});

// Request interceptor - Add auth token
api.interceptors.request.use(
	(config) => {
		const token = useAuthStore.getState().token;
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

// Response interceptor - Handle errors
api.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		// Handle 401 Unauthorized - Logout user
		if (error.response?.status === 401) {
			useAuthStore.getState().logout();
			toast.error("Session expired. Please login again.");
			window.location.href = "/login";
		}

		// Handle 403 Forbidden
		if (error.response?.status === 403) {
			toast.error("You do not have permission to perform this action.");
		}

		// Handle 404 Not Found
		if (error.response?.status === 404) {
			toast.error("Resource not found.");
		}

		// Handle 500 Internal Server Error
		if (error.response?.status >= 500) {
			toast.error("Server error. Please try again later.");
		}

		// Handle network errors
		if (error.message === "Network Error") {
			toast.error("Network error. Please check your connection.");
		}

		return Promise.reject(error);
	}
);

export default api;

// Helper functions for common HTTP methods
export const apiClient = {
	get: (url, config) => api.get(url, config),
	post: (url, data, config) => api.post(url, data, config),
	put: (url, data, config) => api.put(url, data, config),
	patch: (url, data, config) => api.patch(url, data, config),
	delete: (url, config) => api.delete(url, config),
};
