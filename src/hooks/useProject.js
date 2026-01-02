// client/src/hooks/useProject.js
import {useState} from "react";
import {useProjectStore} from "@store/projectStore";
import projectService from "@services/project.service";
import toast from "react-hot-toast";

export const useProject = () => {
	const {
		projects,
		currentProject,
		setProjects,
		addProject,
		updateProject,
		removeProject,
		setCurrentProject,
		setLoading,
	} = useProjectStore();

	const [loading, setLocalLoading] = useState(false);

	const fetchProjects = async (params) => {
		try {
			setLoading(true);
			const response = await projectService.getProjects(params);
			setProjects(response.data.projects);
			return {success: true, data: response.data.projects};
		} catch (err) {
			toast.error("Failed to load projects");
			return {success: false, error: err.message};
		} finally {
			setLoading(false);
		}
	};

	const fetchProject = async (id) => {
		try {
			setLocalLoading(true);
			const response = await projectService.getProject(id);
			setCurrentProject(response.data.project);
			return {success: true, data: response.data.project};
		} catch (err) {
			toast.error("Failed to load project");
			return {success: false, error: err.message};
		} finally {
			setLocalLoading(false);
		}
	};

	const createProject = async (projectData) => {
		try {
			setLocalLoading(true);
			const response = await projectService.createProject(projectData);
			addProject(response.data.project);
			toast.success("Project created successfully");
			return {success: true, data: response.data.project};
		} catch (err) {
			const message = err.response?.data?.message || "Failed to create project";
			toast.error(message);
			return {success: false, error: message};
		} finally {
			setLocalLoading(false);
		}
	};

	const deleteProject = async (id) => {
		try {
			await projectService.deleteProject(id);
			removeProject(id);
			toast.success("Project deleted successfully");
			return {success: true};
		} catch (err) {
			toast.error("Failed to delete project");
			return {success: false, error: err.message};
		}
	};

	const scrapeRealEstateImages = async (url) => {
		try {
			setLocalLoading(true);
			const response = await projectService.scrapeImages(url);

			// ✅ Access response.data.images and add IDs
			const imagesWithIds = response.data.images.map((img, index) => ({
				...img,
				id: index,
			}));

			toast.success(`Found ${imagesWithIds.length} images`);
			return {success: true, data: imagesWithIds};
		} catch (err) {
			const message =
				err.response?.data?.message || "Failed to scrape images from URL";
			toast.error(message);
			return {success: false, error: message};
		} finally {
			setLocalLoading(false);
		}
	};

	const generateVideo = async (projectId, options) => {
		try {
			setLocalLoading(true);
			const response = await projectService.generateVideo(projectId, options);
			toast.success("Video generation started!");
			return {success: true, data: response.data};
		} catch (err) {
			const message = err.response?.data?.message || "Failed to generate video";
			toast.error(message);
			return {success: false, error: message};
		} finally {
			setLocalLoading(false);
		}
	};

	const handleUpdateProject = async (id, updates) => {
		try {
			setLocalLoading(true);
			const response = await projectService.updateProject(id, updates);
			updateProject(id, response.data.project);
			return {success: true, data: response.data.project};
		} catch (err) {
			const message = err.response?.data?.message || "Failed to update project";
			toast.error(message);
			return {success: false, error: message};
		} finally {
			setLocalLoading(false);
		}
	};
	return {
		projects,
		currentProject,
		loading: loading || useProjectStore.getState().isLoading,
		fetchProjects,
		fetchProject,
		createProject,
		deleteProject,
		scrapeImages: scrapeRealEstateImages,
		generateVideo,
		updateProject: handleUpdateProject,
	};
};
