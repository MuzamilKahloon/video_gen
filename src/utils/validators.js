// client/src/utils/validators.js
export const validateEmail = (email) => {
	const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return regex.test(email);
};

export const validatePassword = (password) => {
	// At least 8 characters, 1 uppercase, 1 lowercase, 1 number
	const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
	return regex.test(password);
};

export const validateRealEstateUrl = (url) => {
	// Validate realestate.com.au URLs
	const regex = /^https?:\/\/(www\.)?realestate\.com\.au\/.+/i;
	return regex.test(url);
};

export const getPasswordStrength = (password) => {
	let strength = 0;

	if (password.length >= 8) strength++;
	if (password.length >= 12) strength++;
	if (/[a-z]/.test(password)) strength++;
	if (/[A-Z]/.test(password)) strength++;
	if (/\d/.test(password)) strength++;
	if (/[^a-zA-Z\d]/.test(password)) strength++;

	if (strength <= 2) return {level: "Weak", color: "error", percentage: 33};
	if (strength <= 4) return {level: "Medium", color: "warning", percentage: 66};
	return {level: "Strong", color: "success", percentage: 100};
};

export const validateUrl = (url) => {
	try {
		new URL(url);
		return true;
	} catch {
		return false;
	}
};
