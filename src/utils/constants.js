// client/src/utils/constants.js
export const APP_NAME = import.meta.env.VITE_APP_NAME || "VideoGen AI";
export const API_URL =
	import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";
export const SOCKET_URL =
	import.meta.env.VITE_SOCKET_URL || "http://localhost:5000";

export const VIDEO_TEMPLATES = [
	{
		id: "cinematic",
		name: "Cinematic",
		description: "Smooth, professional camera movements",
		duration: "8s",
		icon: "🎬",
		credits: 1,
	},
	{
		id: "dynamic",
		name: "Dynamic",
		description: "Energetic zooms and transitions",
		duration: "8s",
		icon: "⚡",
		credits: 1,
	},
	{
		id: "elegant",
		name: "Elegant",
		description: "Slow, graceful panning shots",
		duration: "12s",
		icon: "✨",
		credits: 2,
	},
	{
		id: "showcase",
		name: "Property Showcase",
		description: "Perfect for real estate listings",
		duration: "15s",
		icon: "🏠",
		credits: 2,
	},
	{
		id: "aerial",
		name: "Aerial View",
		description: "Drone-style sweeping movements",
		duration: "10s",
		icon: "🚁",
		credits: 2,
	},
];

export const VIDEO_QUALITIES = [
	{id: "720p", name: "720p HD", multiplier: 1},
	{id: "1080p", name: "1080p Full HD", multiplier: 1.5},
	{id: "4k", name: "4K Ultra HD", multiplier: 3, premium: true},
];

export const ASPECT_RATIOS = [
	{id: "16:9", name: "Landscape", subtext: "16:9", icon: "📺"},
	{id: "9:16", name: "Portrait", subtext: "9:16", icon: "📱"},
	{id: "1:1", name: "Square", subtext: "1:1", icon: "⬜"},
	{id: "4:3", name: "Standard", subtext: "4:3", icon: "🖥️"},
];

export const JOB_STATUS = {
	PENDING: "pending",
	PROCESSING: "processing",
	COMPLETED: "completed",
	FAILED: "failed",
};

export const JOB_STATUS_CONFIG = {
	pending: {
		label: "Pending",
		color: "warning",
		bgColor: "bg-warning-50",
		textColor: "text-warning-700",
	},
	processing: {
		label: "Processing",
		color: "info",
		bgColor: "bg-info-50",
		textColor: "text-info-700",
	},
	completed: {
		label: "Completed",
		color: "success",
		bgColor: "bg-success-50",
		textColor: "text-success-700",
	},
	failed: {
		label: "Failed",
		color: "error",
		bgColor: "bg-error-50",
		textColor: "text-error-700",
	},
};

export const SUBSCRIPTION_PLANS = [
	{
		id: "starter",
		name: "Starter",
		price: 19,
		credits: 25,
		features: [
			"Luma AI engine",
			"Watermark customization",
			"720p & 1080p export",
			"Email support",
		],
	},
	{
		id: "creator",
		name: "Creator",
		price: 39,
		credits: 70,
		popular: true,
		features: [
			"All 5 video templates",
			"Backup AI engine",
			"Priority processing queue",
			"720p, 1080p export",
			"Priority email support",
		],
	},
	{
		id: "pro",
		name: "Pro",
		price: 79,
		credits: 160,
		features: [
			"Premium AI (Veo 3)",
			"Real-time queue status",
			"Advanced enhancements",
			"Up to 4K export",
			"Priority support",
		],
	},
	{
		id: "business",
		name: "Business",
		price: 149,
		credits: 350,
		features: [
			"Sora 2 access",
			"Team accounts",
			"Admin tools",
			"API access (optional)",
			"Dedicated support",
		],
	},
];
