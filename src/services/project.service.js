// client/src/services/project.service.js
import api from "./api";

const projectService = {
	// Get all projects
	getProjects: async (params = {}) => {
		const response = await api.get("/projects", {params});
		return response.data;
	},

	// Get single project
	getProject: async (id) => {
		const response = await api.get(`/projects/${id}`);
		return response.data;
	},

	// Create project from real estate URL
	createProject: async (projectData) => {
		const response = await api.post("/projects", projectData);
		return response.data;
	},

	// Update project
	updateProject: async (id, updates) => {
		const response = await api.patch(`/projects/${id}`, updates);
		return response.data;
	},

	// Delete project
	deleteProject: async (id) => {
		const response = await api.delete(`/projects/${id}`);
		return response.data;
	},

	// Generate video
	generateVideo: async (projectId, options) => {
		const response = await api.post(`/projects/${projectId}/generate`, options);
		return response.data;
	},

	// Get project status
	getProjectStatus: async (projectId) => {
		const response = await api.get(`/projects/${projectId}/status`);
		return response.data;
	},

	// Download video
	downloadVideo: async (projectId) => {
		const response = await api.get(`/projects/${projectId}/download`, {
			responseType: "blob",
		});
		return response.data;
	},

	// Scrape real estate images
	scrapeImages: async (url) => {
		const response = await api.post("/projects/scrape", {url});
		return response.data;
	},
};

export default projectService;
