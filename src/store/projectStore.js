import { create } from 'zustand';

export const useProjectStore = create((set) => ({
	// Pipeline State
	step: 1,
	images: [], // { id, file, preview, status: 'uploaded' | 'analyzing' | 'ready' | 'error', analysisResults: null }
	timeline: [], // ordered list of clip objects
	settings: {
		branding: {
			logo: null,
			logoPosition: 'end', // 'start' | 'end'
			agentName: '',
			propertyAddress: '',
			showEndCard: true,
		},
		contact: {
			method: null, // 'mobile' | 'email' | null
			value: '',
		},
		export: {
			resolution: '1080p',
			aspectRatio: '16:9',
			format: 'mp4',
		}
	},

	// Actions
	setStep: (step) => set({ step }),

	addImages: (newImages) => set((state) => ({
		images: [...state.images, ...newImages]
	})),

	removeImage: (id) => set((state) => ({
		images: state.images.filter(img => img.id !== id),
		timeline: state.timeline.filter(clip => clip.imageId !== id)
	})),

	updateImageStatus: (id, status, results = null) => set((state) => ({
		images: state.images.map(img =>
			img.id === id ? { ...img, status, analysisResults: results } : img
		)
	})),

	setTimeline: (timeline) => set({ timeline }),

	updateClipAnimation: (clipId, animation) => set((state) => ({
		timeline: state.timeline.map(clip =>
			clip.id === clipId ? { ...clip, animation } : clip
		)
	})),

	updateSettings: (newSettings) => set((state) => ({
		settings: { ...state.settings, ...newSettings }
	})),

	resetProject: () => set({
		step: 1,
		images: [],
		timeline: [],
		settings: {
			branding: {
				logo: null,
				logoPosition: 'end',
				agentName: '',
				propertyAddress: '',
				showEndCard: true,
			},
			contact: {
				method: null,
				value: '',
			},
			export: {
				resolution: '1080p',
				aspectRatio: '16:9',
				format: 'mp4',
			}
		}
	})
}));
