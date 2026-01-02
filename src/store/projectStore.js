// client/src/store/projectStore.js
import {create} from "zustand";

export const useProjectStore = create((set, get) => ({
	projects: [],
	currentProject: null,
	isLoading: false,
	error: null,

	// Set projects
	setProjects: (projects) => set({projects}),

	// Add project
	addProject: (project) =>
		set((state) => ({
			projects: [project, ...state.projects],
		})),

	// Update project
	updateProject: (id, updates) =>
		set((state) => ({
			projects: state.projects.map((p) =>
				p._id === id ? {...p, ...updates} : p
			),
			currentProject:
				state.currentProject?._id === id
					? {...state.currentProject, ...updates}
					: state.currentProject,
		})),

	// Remove project
	removeProject: (id) =>
		set((state) => ({
			projects: state.projects.filter((p) => p._id !== id),
		})),

	// Set current project
	setCurrentProject: (project) => set({currentProject: project}),

	// Clear current project
	clearCurrentProject: () => set({currentProject: null}),

	// Set loading
	setLoading: (isLoading) => set({isLoading}),

	// Set error
	setError: (error) => set({error}),

	// Clear error
	clearError: () => set({error: null}),

	// Get project by ID
	getProjectById: (id) => {
		const {projects} = get();
		return projects.find((p) => p._id === id);
	},

	// Update project status
	updateProjectStatus: (id, status) => {
		set((state) => ({
			projects: state.projects.map((p) => (p._id === id ? {...p, status} : p)),
		}));
	},

	// Update project progress
	updateProjectProgress: (id, progress) => {
		set((state) => ({
			projects: state.projects.map((p) =>
				p._id === id ? {...p, progress} : p
			),
		}));
	},
}));
