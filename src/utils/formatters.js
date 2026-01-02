// client/src/utils/formatters.js
import {format, formatDistanceToNow} from "date-fns";

export const formatDate = (date) => {
	if (!date) return "";
	return format(new Date(date), "MMM dd, yyyy");
};

export const formatDateTime = (date) => {
	if (!date) return "";
	return format(new Date(date), "MMM dd, yyyy HH:mm");
};

export const formatRelativeTime = (date) => {
	if (!date) return "";
	return formatDistanceToNow(new Date(date), {addSuffix: true});
};

export const formatDuration = (seconds) => {
	if (!seconds) return "0:00";
	const mins = Math.floor(seconds / 60);
	const secs = seconds % 60;
	return `${mins}:${secs.toString().padStart(2, "0")}`;
};

export const formatFileSize = (bytes) => {
	if (!bytes || bytes === 0) return "0 Bytes";
	const k = 1024;
	const sizes = ["Bytes", "KB", "MB", "GB"];
	const i = Math.floor(Math.log(bytes) / Math.log(k));
	return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

export const formatCredits = (credits) => {
	if (credits === undefined || credits === null) return "0";
	return credits.toLocaleString();
};

export const formatCurrency = (amount, currency = "USD") => {
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency,
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
	}).format(amount);
};

export const formatPercentage = (value, decimals = 0) => {
	return `${value.toFixed(decimals)}%`;
};
