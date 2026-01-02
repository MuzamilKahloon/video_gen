// client/src/services/payment.service.js
import api from "./api";

const paymentService = {
	// Get subscription plans
	getPlans: async () => {
		const response = await api.get("/payments/plans");
		return response.data;
	},

	// Create checkout session
	createCheckoutSession: async (planId) => {
		const response = await api.post("/payments/create-checkout", {planId});
		return response.data;
	},

	// Get billing history
	getBillingHistory: async () => {
		const response = await api.get("/payments/history");
		return response.data;
	},

	// Get current subscription
	getCurrentSubscription: async () => {
		const response = await api.get("/payments/subscription");
		return response.data;
	},

	// Cancel subscription
	cancelSubscription: async () => {
		const response = await api.post("/payments/cancel-subscription");
		return response.data;
	},

	// Update payment method
	updatePaymentMethod: async (paymentMethodId) => {
		const response = await api.post("/payments/update-payment-method", {
			paymentMethodId,
		});
		return response.data;
	},

	// Purchase credits
	purchaseCredits: async (amount) => {
		const response = await api.post("/payments/purchase-credits", {amount});
		return response.data;
	},
};

export default paymentService;
