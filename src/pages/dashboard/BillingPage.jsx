// client/src/pages/dashboard/BillingPage.jsx
import {useState, useEffect} from "react";
import {Helmet} from "react-helmet-async";
import {motion, AnimatePresence} from "framer-motion";
import {
	HiCreditCard,
	HiPlus,
	HiCheck,
	HiX,
	HiDownload,
	HiExternalLink,
	HiLightningBolt,
	HiSparkles,
	HiShieldCheck,
	HiClock,
	HiChartBar,
	HiRefresh,
	HiExclamationCircle,
	HiInformationCircle,
	HiDotsVertical,
	HiPencil,
	HiTrash,
	HiStar,
	HiArrowUp,
	HiArrowRight,
	HiCalendar,
	HiReceiptTax,
	HiCurrencyDollar,
	HiTrendingUp,
	HiVideoCamera,
	HiPhotograph,
	HiCollection,
	HiCheckCircle,
	HiXCircle,
} from "react-icons/hi";
import {cn} from "@utils/cn";
import {formatDate, formatCurrency, formatCredits} from "@utils/formatters";
import {SUBSCRIPTION_PLANS} from "@utils/constants";
import PageHeader from "@components/ui/PageHeader";
import Card from "@components/ui/Card";
import Badge from "@components/ui/Badge";
import Modal from "@components/ui/Modal";
import ProgressBar from "@components/ui/ProgressBar";
import Tabs from "@components/ui/Tabs";
import Alert from "@components/ui/Alert";
import Skeleton from "@components/ui/Skeleton";

// Mock billing data
const mockBillingData = {
	subscription: {
		plan: "creator",
		status: "active",
		currentPeriodStart: "2024-01-01T00:00:00Z",
		currentPeriodEnd: "2024-02-01T00:00:00Z",
		cancelAtPeriodEnd: false,
		nextBillingDate: "2024-02-01T00:00:00Z",
		amount: 39,
	},
	credits: {
		total: 70,
		used: 45,
		remaining: 25,
		resetDate: "2024-02-01T00:00:00Z",
	},
	usage: {
		thisMonth: {
			videosGenerated: 18,
			totalDuration: 216,
			creditsUsed: 45,
			storageUsed: 1.2, // GB
		},
		lastMonth: {
			videosGenerated: 22,
			totalDuration: 264,
			creditsUsed: 55,
			storageUsed: 1.5,
		},
	},
	paymentMethods: [
		{
			id: "pm_1",
			type: "card",
			brand: "visa",
			last4: "4242",
			expiryMonth: 12,
			expiryYear: 2025,
			isDefault: true,
		},
		{
			id: "pm_2",
			type: "card",
			brand: "mastercard",
			last4: "8888",
			expiryMonth: 6,
			expiryYear: 2026,
			isDefault: false,
		},
	],
	invoices: [
		{
			id: "inv_001",
			date: "2024-01-01T00:00:00Z",
			amount: 39,
			status: "paid",
			description: "Creator Plan - Monthly",
			downloadUrl: "#",
		},
		{
			id: "inv_002",
			date: "2023-12-01T00:00:00Z",
			amount: 39,
			status: "paid",
			description: "Creator Plan - Monthly",
			downloadUrl: "#",
		},
		{
			id: "inv_003",
			date: "2023-11-01T00:00:00Z",
			amount: 19,
			status: "paid",
			description: "Starter Plan - Monthly",
			downloadUrl: "#",
		},
		{
			id: "inv_004",
			date: "2023-10-15T00:00:00Z",
			amount: 29,
			status: "paid",
			description: "Extra Credits Pack (50 credits)",
			downloadUrl: "#",
		},
		{
			id: "inv_005",
			date: "2023-10-01T00:00:00Z",
			amount: 19,
			status: "paid",
			description: "Starter Plan - Monthly",
			downloadUrl: "#",
		},
	],
	addOns: [
		{
			id: "addon_1",
			name: "Extra Credits",
			description: "Purchase additional credits",
			options: [
				{credits: 25, price: 29},
				{credits: 50, price: 49},
				{credits: 100, price: 69},
			],
		},
		{
			id: "addon_2",
			name: "4K Upgrade",
			description: "Upgrade any video to 4K resolution",
			price: 1,
			unit: "per video",
		},
		{
			id: "addon_3",
			name: "Background Music",
			description: "Add royalty-free background music",
			price: 0.5,
			unit: "per video",
		},
		{
			id: "addon_4",
			name: "Remove Watermark",
			description: "Remove watermark from all videos",
			price: 3,
			unit: "per month",
		},
		{
			id: "addon_5",
			name: "Commercial License",
			description: "Use videos for commercial purposes",
			price: 15,
			unit: "per month",
		},
	],
};

// Card brand icons
const CardBrandIcon = ({brand}) => {
	const brandIcons = {
		visa: (
			<svg className="w-8 h-5" viewBox="0 0 32 20" fill="none">
				<rect width="32" height="20" rx="2" fill="#1A1F71" />
				<path d="M13.5 13.5L14.8 6.5H16.7L15.4 13.5H13.5Z" fill="white" />
				<path
					d="M21.8 6.7C21.4 6.5 20.7 6.4 19.9 6.4C18 6.4 16.7 7.4 16.7 8.7C16.7 9.7 17.6 10.2 18.3 10.6C19 10.9 19.3 11.2 19.3 11.5C19.3 12 18.7 12.2 18.2 12.2C17.4 12.2 17 12.1 16.3 11.8L16 11.7L15.7 13.3C16.2 13.5 17.1 13.7 18 13.7C20 13.7 21.3 12.7 21.3 11.3C21.3 10.5 20.8 9.9 19.8 9.4C19.2 9.1 18.8 8.8 18.8 8.5C18.8 8.2 19.1 7.9 19.8 7.9C20.4 7.9 20.9 8 21.2 8.2L21.4 8.3L21.8 6.7Z"
					fill="white"
				/>
				<path
					d="M24.3 6.5H22.8C22.3 6.5 22 6.6 21.8 7.1L19 13.5H21C21 13.5 21.3 12.7 21.4 12.4H23.8C23.9 12.8 24 13.5 24 13.5H25.8L24.3 6.5ZM21.9 11C22.1 10.5 22.8 8.6 22.8 8.6C22.8 8.6 23 8 23.1 7.6L23.3 8.5C23.3 8.5 23.7 10.3 23.8 11H21.9Z"
					fill="white"
				/>
				<path
					d="M11.8 6.5L9.9 11.2L9.7 10.2C9.3 8.9 8.1 7.5 6.7 6.8L8.4 13.5H10.4L13.8 6.5H11.8Z"
					fill="white"
				/>
				<path
					d="M8.4 6.5H5.4L5.4 6.6C7.7 7.2 9.2 8.6 9.7 10.2L9.2 7.1C9.1 6.6 8.8 6.5 8.4 6.5Z"
					fill="#F9A533"
				/>
			</svg>
		),
		mastercard: (
			<svg className="w-8 h-5" viewBox="0 0 32 20" fill="none">
				<rect width="32" height="20" rx="2" fill="#000" />
				<circle cx="12" cy="10" r="6" fill="#EB001B" />
				<circle cx="20" cy="10" r="6" fill="#F79E1B" />
				<path
					d="M16 5.5C17.3 6.6 18 8.2 18 10C18 11.8 17.3 13.4 16 14.5C14.7 13.4 14 11.8 14 10C14 8.2 14.7 6.6 16 5.5Z"
					fill="#FF5F00"
				/>
			</svg>
		),
		amex: (
			<svg className="w-8 h-5" viewBox="0 0 32 20" fill="none">
				<rect width="32" height="20" rx="2" fill="#006FCF" />
				<path d="M5 10L7 6H9L11 10L9 14H7L5 10Z" fill="white" />
				<path d="M12 6H18V8H14V9H17V11H14V12H18V14H12V6Z" fill="white" />
				<path d="M19 6H22L24 10L26 6H28L24 14L19 6Z" fill="white" />
			</svg>
		),
	};

	return (
		brandIcons[brand] || (
			<div className="w-8 h-5 bg-gray-200 rounded flex items-center justify-center">
				<HiCreditCard className="w-4 h-4 text-gray-500" />
			</div>
		)
	);
};

// Plan Card Component
const PlanCard = ({plan, isCurrentPlan, onSelect, isPopular}) => {
	return (
		<motion.div
			whileHover={{y: -2}}
			className={cn(
				"relative rounded-xl border-2 p-6 transition-all cursor-pointer",
				isCurrentPlan
					? "border-primary-500 bg-primary-50/50"
					: "border-gray-200 hover:border-gray-300 bg-white",
				isPopular && !isCurrentPlan && "border-primary-200"
			)}
			onClick={() => !isCurrentPlan && onSelect(plan)}
		>
			{isPopular && (
				<div className="absolute -top-3 left-1/2 -translate-x-1/2">
					<Badge variant="primary" className="shadow-sm">
						<HiStar className="w-3 h-3 mr-1" />
						Most Popular
					</Badge>
				</div>
			)}

			{isCurrentPlan && (
				<div className="absolute -top-3 left-1/2 -translate-x-1/2">
					<Badge variant="success" className="shadow-sm">
						<HiCheckCircle className="w-3 h-3 mr-1" />
						Current Plan
					</Badge>
				</div>
			)}

			<div className="text-center mb-4">
				<h3 className="text-lg font-semibold text-gray-900">{plan.name}</h3>
				<div className="mt-2">
					<span className="text-3xl font-bold text-gray-900">
						${plan.price}
					</span>
					<span className="text-gray-500">/month</span>
				</div>
				<p className="mt-1 text-sm text-gray-600">
					{plan.credits} credits included
				</p>
			</div>

			<ul className="space-y-3 mb-6">
				{plan.features.map((feature, index) => (
					<li key={index} className="flex items-start gap-2 text-sm">
						<HiCheck className="w-4 h-4 text-success-500 mt-0.5 flex-shrink-0" />
						<span className="text-gray-600">{feature}</span>
					</li>
				))}
			</ul>

			<button
				className={cn(
					"w-full btn-md",
					isCurrentPlan ? "btn-secondary cursor-default" : "btn-primary"
				)}
				disabled={isCurrentPlan}
			>
				{isCurrentPlan ? "Current Plan" : "Upgrade"}
			</button>
		</motion.div>
	);
};

// Usage Stat Card
const UsageStatCard = ({
	icon: Icon,
	label,
	value,
	subValue,
	trend,
	color = "primary",
}) => {
	const colorClasses = {
		primary: "bg-primary-50 text-primary-600",
		success: "bg-success-50 text-success-600",
		warning: "bg-warning-50 text-warning-600",
		info: "bg-info-50 text-info-600",
	};

	return (
		<div className="bg-white rounded-xl border border-gray-200 p-4">
			<div className="flex items-center gap-3 mb-3">
				<div
					className={cn(
						"w-10 h-10 rounded-lg flex items-center justify-center",
						colorClasses[color]
					)}
				>
					<Icon className="w-5 h-5" />
				</div>
				<span className="text-sm font-medium text-gray-600">{label}</span>
			</div>
			<div className="flex items-end justify-between">
				<div>
					<p className="text-2xl font-bold text-gray-900">{value}</p>
					{subValue && <p className="text-sm text-gray-500">{subValue}</p>}
				</div>
				{trend !== undefined && (
					<div
						className={cn(
							"flex items-center gap-1 text-sm font-medium",
							trend >= 0 ? "text-success-600" : "text-error-600"
						)}
					>
						<HiTrendingUp
							className={cn("w-4 h-4", trend < 0 && "rotate-180")}
						/>
						{Math.abs(trend)}%
					</div>
				)}
			</div>
		</div>
	);
};

// Payment Method Card
const PaymentMethodCard = ({method, onSetDefault, onEdit, onDelete}) => {
	const [showMenu, setShowMenu] = useState(false);

	return (
		<div
			className={cn(
				"flex items-center justify-between p-4 rounded-xl border transition-colors",
				method.isDefault
					? "border-primary-200 bg-primary-50/30"
					: "border-gray-200 bg-white"
			)}
		>
			<div className="flex items-center gap-4">
				<CardBrandIcon brand={method.brand} />
				<div>
					<div className="flex items-center gap-2">
						<span className="font-medium text-gray-900 capitalize">
							{method.brand}
						</span>
						<span className="text-gray-500">•••• {method.last4}</span>
						{method.isDefault && (
							<Badge variant="primary" size="sm">
								Default
							</Badge>
						)}
					</div>
					<p className="text-sm text-gray-500">
						Expires {method.expiryMonth.toString().padStart(2, "0")}/
						{method.expiryYear}
					</p>
				</div>
			</div>

			<div className="relative">
				<button
					onClick={() => setShowMenu(!showMenu)}
					className="btn-ghost btn-sm"
				>
					<HiDotsVertical className="w-4 h-4" />
				</button>

				{showMenu && (
					<>
						<div
							className="fixed inset-0 z-40"
							onClick={() => setShowMenu(false)}
						/>
						<div className="dropdown-menu right-0 top-full mt-1">
							{!method.isDefault && (
								<button
									onClick={() => {
										onSetDefault(method.id);
										setShowMenu(false);
									}}
									className="dropdown-item"
								>
									<HiCheckCircle className="w-4 h-4" />
									Set as Default
								</button>
							)}
							<button
								onClick={() => {
									onEdit(method.id);
									setShowMenu(false);
								}}
								className="dropdown-item"
							>
								<HiPencil className="w-4 h-4" />
								Edit
							</button>
							<div className="dropdown-divider" />
							<button
								onClick={() => {
									onDelete(method.id);
									setShowMenu(false);
								}}
								className="dropdown-item-danger"
							>
								<HiTrash className="w-4 h-4" />
								Remove
							</button>
						</div>
					</>
				)}
			</div>
		</div>
	);
};

// Invoice Row
const InvoiceRow = ({invoice}) => {
	const statusConfig = {
		paid: {label: "Paid", variant: "success"},
		pending: {label: "Pending", variant: "warning"},
		failed: {label: "Failed", variant: "error"},
		refunded: {label: "Refunded", variant: "gray"},
	};

	const status = statusConfig[invoice.status];

	return (
		<tr className="hover:bg-gray-50">
			<td className="px-6 py-4">
				<div className="text-sm font-medium text-gray-900">{invoice.id}</div>
			</td>
			<td className="px-6 py-4">
				<div className="text-sm text-gray-900">{formatDate(invoice.date)}</div>
			</td>
			<td className="px-6 py-4">
				<div className="text-sm text-gray-600">{invoice.description}</div>
			</td>
			<td className="px-6 py-4">
				<div className="text-sm font-medium text-gray-900">
					{formatCurrency(invoice.amount)}
				</div>
			</td>
			<td className="px-6 py-4">
				<Badge variant={status.variant}>{status.label}</Badge>
			</td>
			<td className="px-6 py-4 text-right">
				<a
					href={invoice.downloadUrl}
					className="btn-ghost btn-sm text-primary-600"
				>
					<HiDownload className="w-4 h-4" />
					PDF
				</a>
			</td>
		</tr>
	);
};

// Add-on Card
const AddOnCard = ({addon, onPurchase}) => {
	return (
		<Card className="hover:shadow-card-hover transition-shadow">
			<Card.Body className="p-5">
				<h4 className="font-semibold text-gray-900 mb-1">{addon.name}</h4>
				<p className="text-sm text-gray-500 mb-4">{addon.description}</p>

				{addon.options ? (
					<div className="space-y-2">
						{addon.options.map((option, index) => (
							<button
								key={index}
								onClick={() => onPurchase(addon.id, option)}
								className="w-full flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:border-primary-300 hover:bg-primary-50/50 transition-colors"
							>
								<span className="text-sm font-medium text-gray-700">
									{option.credits} credits
								</span>
								<span className="text-sm font-bold text-gray-900">
									${option.price}
								</span>
							</button>
						))}
					</div>
				) : (
					<div className="flex items-center justify-between">
						<div>
							<span className="text-xl font-bold text-gray-900">
								${addon.price}
							</span>
							<span className="text-sm text-gray-500 ml-1">/{addon.unit}</span>
						</div>
						<button
							onClick={() => onPurchase(addon.id)}
							className="btn-primary btn-sm"
						>
							<HiPlus className="w-4 h-4" />
							Add
						</button>
					</div>
				)}
			</Card.Body>
		</Card>
	);
};

// Main Component
const BillingPage = () => {
	const [billingData, setBillingData] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [activeTab, setActiveTab] = useState("overview");
	const [showUpgradeModal, setShowUpgradeModal] = useState(false);
	const [showCancelModal, setShowCancelModal] = useState(false);
	const [showAddPaymentModal, setShowAddPaymentModal] = useState(false);
	const [showPurchaseModal, setShowPurchaseModal] = useState(false);
	const [selectedPlan, setSelectedPlan] = useState(null);
	const [selectedAddOn, setSelectedAddOn] = useState(null);

	useEffect(() => {
		const fetchBillingData = async () => {
			setIsLoading(true);
			await new Promise((resolve) => setTimeout(resolve, 1000));
			setBillingData(mockBillingData);
			setIsLoading(false);
		};
		fetchBillingData();
	}, []);

	const handleUpgradePlan = (plan) => {
		setSelectedPlan(plan);
		setShowUpgradeModal(true);
	};

	const confirmUpgrade = async () => {
		// API call to upgrade
		await new Promise((resolve) => setTimeout(resolve, 1000));
		setBillingData((prev) => ({
			...prev,
			subscription: {
				...prev.subscription,
				plan: selectedPlan.id,
				amount: selectedPlan.price,
			},
			credits: {
				...prev.credits,
				total: selectedPlan.credits,
			},
		}));
		setShowUpgradeModal(false);
		setSelectedPlan(null);
	};

	const handleCancelSubscription = async () => {
		// API call to cancel
		await new Promise((resolve) => setTimeout(resolve, 1000));
		setBillingData((prev) => ({
			...prev,
			subscription: {
				...prev.subscription,
				cancelAtPeriodEnd: true,
			},
		}));
		setShowCancelModal(false);
	};

	const handleSetDefaultPayment = (paymentId) => {
		setBillingData((prev) => ({
			...prev,
			paymentMethods: prev.paymentMethods.map((pm) => ({
				...pm,
				isDefault: pm.id === paymentId,
			})),
		}));
	};

	const handleDeletePayment = (paymentId) => {
		setBillingData((prev) => ({
			...prev,
			paymentMethods: prev.paymentMethods.filter((pm) => pm.id !== paymentId),
		}));
	};

	const handlePurchaseAddOn = (addonId, option = null) => {
		const addon = billingData.addOns.find((a) => a.id === addonId);
		setSelectedAddOn({...addon, selectedOption: option});
		setShowPurchaseModal(true);
	};

	const confirmPurchase = async () => {
		// API call to purchase
		await new Promise((resolve) => setTimeout(resolve, 1000));
		if (selectedAddOn.selectedOption) {
			setBillingData((prev) => ({
				...prev,
				credits: {
					...prev.credits,
					total: prev.credits.total + selectedAddOn.selectedOption.credits,
					remaining:
						prev.credits.remaining + selectedAddOn.selectedOption.credits,
				},
			}));
		}
		setShowPurchaseModal(false);
		setSelectedAddOn(null);
	};

	const tabs = [
		{id: "overview", label: "Overview", icon: HiChartBar},
		{id: "plans", label: "Plans", icon: HiSparkles},
		{id: "payment", label: "Payment Methods", icon: HiCreditCard},
		{id: "invoices", label: "Invoices", icon: HiReceiptTax},
		{id: "addons", label: "Add-ons", icon: HiPlus},
	];

	if (isLoading) {
		return (
			<div className="p-6">
				<Skeleton className="h-8 w-48 mb-2" />
				<Skeleton className="h-4 w-72 mb-8" />
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
					<Skeleton className="h-40 rounded-xl" />
					<Skeleton className="h-40 rounded-xl" />
					<Skeleton className="h-40 rounded-xl" />
				</div>
				<Skeleton className="h-64 rounded-xl" />
			</div>
		);
	}

	const currentPlan = SUBSCRIPTION_PLANS.find(
		(p) => p.id === billingData.subscription.plan
	);
	const creditsPercentage =
		(billingData.credits.used / billingData.credits.total) * 100;
	const daysUntilReset = Math.ceil(
		(new Date(billingData.credits.resetDate) - new Date()) /
			(1000 * 60 * 60 * 24)
	);

	return (
		<>
			<Helmet>
				<title>Billing & Subscription - VideoGen AI</title>
			</Helmet>

			<div className="p-6">
				<PageHeader
					title="Billing & Subscription"
					subtitle="Manage your subscription, credits, and payment methods"
				/>

				{/* Cancellation Alert */}
				{billingData.subscription.cancelAtPeriodEnd && (
					<Alert
						variant="warning"
						title="Subscription Cancellation Scheduled"
						className="mb-6"
					>
						Your subscription will be cancelled on{" "}
						{formatDate(billingData.subscription.currentPeriodEnd)}. You'll
						continue to have access until then.
						<button
							className="ml-2 text-warning-700 font-medium underline hover:no-underline"
							onClick={() => {
								setBillingData((prev) => ({
									...prev,
									subscription: {
										...prev.subscription,
										cancelAtPeriodEnd: false,
									},
								}));
							}}
						>
							Reactivate subscription
						</button>
					</Alert>
				)}

				{/* Quick Stats */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
					{/* Current Plan Card */}
					<Card className="bg-gradient-to-br from-primary-500 to-primary-700 text-white border-0">
						<Card.Body className="p-6">
							<div className="flex items-center justify-between mb-4">
								<div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
									<HiSparkles className="w-6 h-6" />
								</div>
								<Badge className="bg-white/20 text-white border-0">
									Active
								</Badge>
							</div>
							<h3 className="text-lg font-medium text-white/80">
								Current Plan
							</h3>
							<p className="text-3xl font-bold mt-1">{currentPlan?.name}</p>
							<p className="text-white/70 mt-2">
								{formatCurrency(billingData.subscription.amount)}/month
							</p>
							<div className="mt-4 pt-4 border-t border-white/20">
								<p className="text-sm text-white/70">
									Next billing:{" "}
									{formatDate(billingData.subscription.nextBillingDate)}
								</p>
							</div>
						</Card.Body>
					</Card>

					{/* Credits Card */}
					<Card>
						<Card.Body className="p-6">
							<div className="flex items-center justify-between mb-4">
								<div className="w-12 h-12 bg-success-50 rounded-xl flex items-center justify-center">
									<HiLightningBolt className="w-6 h-6 text-success-600" />
								</div>
								<Badge
									variant={
										creditsPercentage > 80
											? "error"
											: creditsPercentage > 50
											? "warning"
											: "success"
									}
								>
									{Math.round(100 - creditsPercentage)}% remaining
								</Badge>
							</div>
							<h3 className="text-lg font-medium text-gray-600">
								Credits Balance
							</h3>
							<div className="flex items-baseline gap-2 mt-1">
								<p className="text-3xl font-bold text-gray-900">
									{billingData.credits.remaining}
								</p>
								<span className="text-gray-500">
									/ {billingData.credits.total}
								</span>
							</div>
							<div className="mt-4">
								<ProgressBar
									value={creditsPercentage}
									color={
										creditsPercentage > 80
											? "error"
											: creditsPercentage > 50
											? "warning"
											: "success"
									}
								/>
							</div>
							<p className="text-sm text-gray-500 mt-3">
								Resets in {daysUntilReset} days
							</p>
						</Card.Body>
					</Card>

					{/* Quick Actions Card */}
					<Card>
						<Card.Body className="p-6">
							<h3 className="text-lg font-medium text-gray-900 mb-4">
								Quick Actions
							</h3>
							<div className="space-y-3">
								<button
									onClick={() => setActiveTab("addons")}
									className="w-full btn-secondary btn-md justify-start"
								>
									<HiPlus className="w-4 h-4" />
									Buy More Credits
								</button>
								<button
									onClick={() => setActiveTab("plans")}
									className="w-full btn-secondary btn-md justify-start"
								>
									<HiArrowUp className="w-4 h-4" />
									Upgrade Plan
								</button>
								<button
									onClick={() => setActiveTab("payment")}
									className="w-full btn-secondary btn-md justify-start"
								>
									<HiCreditCard className="w-4 h-4" />
									Update Payment
								</button>
							</div>
						</Card.Body>
					</Card>
				</div>

				{/* Tabs Navigation */}
				<div className="mb-6">
					<Tabs
						tabs={tabs.map((tab) => ({id: tab.id, label: tab.label}))}
						activeTab={activeTab}
						onChange={setActiveTab}
					/>
				</div>

				{/* Tab Content */}
				<AnimatePresence mode="wait">
					{activeTab === "overview" && (
						<motion.div
							key="overview"
							initial={{opacity: 0, y: 10}}
							animate={{opacity: 1, y: 0}}
							exit={{opacity: 0, y: -10}}
							className="space-y-6"
						>
							{/* Usage Stats */}
							<div>
								<h3 className="text-lg font-semibold text-gray-900 mb-4">
									This Month's Usage
								</h3>
								<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
									<UsageStatCard
										icon={HiVideoCamera}
										label="Videos Generated"
										value={billingData.usage.thisMonth.videosGenerated}
										subValue="videos"
										trend={Math.round(
											((billingData.usage.thisMonth.videosGenerated -
												billingData.usage.lastMonth.videosGenerated) /
												billingData.usage.lastMonth.videosGenerated) *
												100
										)}
										color="primary"
									/>
									<UsageStatCard
										icon={HiClock}
										label="Total Duration"
										value={`${Math.floor(
											billingData.usage.thisMonth.totalDuration / 60
										)}m`}
										subValue={`${
											billingData.usage.thisMonth.totalDuration % 60
										}s total`}
										trend={Math.round(
											((billingData.usage.thisMonth.totalDuration -
												billingData.usage.lastMonth.totalDuration) /
												billingData.usage.lastMonth.totalDuration) *
												100
										)}
										color="info"
									/>
									<UsageStatCard
										icon={HiLightningBolt}
										label="Credits Used"
										value={billingData.usage.thisMonth.creditsUsed}
										subValue={`of ${billingData.credits.total}`}
										color="success"
									/>
									<UsageStatCard
										icon={HiCollection}
										label="Storage Used"
										value={`${billingData.usage.thisMonth.storageUsed} GB`}
										subValue="cloud storage"
										color="warning"
									/>
								</div>
							</div>

							{/* Subscription Details */}
							<Card>
								<Card.Header>
									<h3 className="font-semibold text-gray-900">
										Subscription Details
									</h3>
								</Card.Header>
								<Card.Body>
									<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
										<div className="space-y-4">
											<div className="flex items-center justify-between">
												<span className="text-gray-600">Plan</span>
												<span className="font-medium text-gray-900">
													{currentPlan?.name}
												</span>
											</div>
											<div className="flex items-center justify-between">
												<span className="text-gray-600">Status</span>
												<Badge variant="success">Active</Badge>
											</div>
											<div className="flex items-center justify-between">
												<span className="text-gray-600">Billing Cycle</span>
												<span className="font-medium text-gray-900">
													Monthly
												</span>
											</div>
											<div className="flex items-center justify-between">
												<span className="text-gray-600">Price</span>
												<span className="font-medium text-gray-900">
													{formatCurrency(billingData.subscription.amount)}
													/month
												</span>
											</div>
										</div>
										<div className="space-y-4">
											<div className="flex items-center justify-between">
												<span className="text-gray-600">Current Period</span>
												<span className="font-medium text-gray-900">
													{formatDate(
														billingData.subscription.currentPeriodStart
													)}{" "}
													-{" "}
													{formatDate(
														billingData.subscription.currentPeriodEnd
													)}
												</span>
											</div>
											<div className="flex items-center justify-between">
												<span className="text-gray-600">Next Billing Date</span>
												<span className="font-medium text-gray-900">
													{formatDate(billingData.subscription.nextBillingDate)}
												</span>
											</div>
											<div className="flex items-center justify-between">
												<span className="text-gray-600">Credits Included</span>
												<span className="font-medium text-gray-900">
													{currentPlan?.credits}/month
												</span>
											</div>
										</div>
									</div>
								</Card.Body>
								<Card.Footer>
									<div className="flex items-center gap-3">
										<button
											onClick={() => setActiveTab("plans")}
											className="btn-primary btn-sm"
										>
											<HiArrowUp className="w-4 h-4" />
											Upgrade Plan
										</button>
										<button
											onClick={() => setShowCancelModal(true)}
											className="btn-ghost btn-sm text-gray-500"
										>
											Cancel Subscription
										</button>
									</div>
								</Card.Footer>
							</Card>

							{/* Recent Invoices Preview */}
							<Card>
								<Card.Header>
									<div className="flex items-center justify-between">
										<h3 className="font-semibold text-gray-900">
											Recent Invoices
										</h3>
										<button
											onClick={() => setActiveTab("invoices")}
											className="btn-ghost btn-sm text-primary-600"
										>
											View All
											<HiArrowRight className="w-4 h-4" />
										</button>
									</div>
								</Card.Header>
								<div className="overflow-x-auto">
									<table className="table">
										<thead>
											<tr>
												<th>Invoice</th>
												<th>Date</th>
												<th>Description</th>
												<th>Amount</th>
												<th>Status</th>
												<th></th>
											</tr>
										</thead>
										<tbody>
											{billingData.invoices.slice(0, 3).map((invoice) => (
												<InvoiceRow key={invoice.id} invoice={invoice} />
											))}
										</tbody>
									</table>
								</div>
							</Card>
						</motion.div>
					)}

					{activeTab === "plans" && (
						<motion.div
							key="plans"
							initial={{opacity: 0, y: 10}}
							animate={{opacity: 1, y: 0}}
							exit={{opacity: 0, y: -10}}
						>
							<div className="mb-6">
								<h3 className="text-lg font-semibold text-gray-900 mb-2">
									Choose Your Plan
								</h3>
								<p className="text-gray-600">
									Select the plan that best fits your needs. Upgrade or
									downgrade anytime.
								</p>
							</div>

							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
								{SUBSCRIPTION_PLANS.map((plan) => (
									<PlanCard
										key={plan.id}
										plan={plan}
										isCurrentPlan={plan.id === billingData.subscription.plan}
										isPopular={plan.popular}
										onSelect={handleUpgradePlan}
									/>
								))}
							</div>

							{/* Enterprise CTA */}
							<Card className="mt-8 bg-gradient-to-r from-gray-900 to-gray-800 border-0">
								<Card.Body className="p-8">
									<div className="flex items-center justify-between flex-wrap gap-6">
										<div>
											<h3 className="text-xl font-bold text-white mb-2">
												Need More?
											</h3>
											<p className="text-gray-300 max-w-xl">
												Enterprise plans with custom limits, dedicated support,
												white-label options, and API access. Starting at
												$499/month.
											</p>
										</div>
										<button className="btn-md bg-white text-gray-900 hover:bg-gray-100">
											Contact Sales
											<HiArrowRight className="w-4 h-4" />
										</button>
									</div>
								</Card.Body>
							</Card>
						</motion.div>
					)}

					{activeTab === "payment" && (
						<motion.div
							key="payment"
							initial={{opacity: 0, y: 10}}
							animate={{opacity: 1, y: 0}}
							exit={{opacity: 0, y: -10}}
							className="space-y-6"
						>
							<div className="flex items-center justify-between">
								<div>
									<h3 className="text-lg font-semibold text-gray-900">
										Payment Methods
									</h3>
									<p className="text-gray-600">
										Manage your payment methods and billing preferences.
									</p>
								</div>
								<button
									onClick={() => setShowAddPaymentModal(true)}
									className="btn-primary btn-md"
								>
									<HiPlus className="w-4 h-4" />
									Add Payment Method
								</button>
							</div>

							<div className="space-y-4">
								{billingData.paymentMethods.map((method) => (
									<PaymentMethodCard
										key={method.id}
										method={method}
										onSetDefault={handleSetDefaultPayment}
										onEdit={() => {}}
										onDelete={handleDeletePayment}
									/>
								))}
							</div>

							{billingData.paymentMethods.length === 0 && (
								<Card>
									<Card.Body className="py-12 text-center">
										<div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
											<HiCreditCard className="w-8 h-8 text-gray-400" />
										</div>
										<h4 className="text-lg font-medium text-gray-900 mb-2">
											No payment methods
										</h4>
										<p className="text-gray-500 mb-4">
											Add a payment method to continue your subscription.
										</p>
										<button
											onClick={() => setShowAddPaymentModal(true)}
											className="btn-primary btn-md"
										>
											<HiPlus className="w-4 h-4" />
											Add Payment Method
										</button>
									</Card.Body>
								</Card>
							)}

							{/* Billing Address */}
							<Card>
								<Card.Header>
									<div className="flex items-center justify-between">
										<h3 className="font-semibold text-gray-900">
											Billing Address
										</h3>
										<button className="btn-ghost btn-sm text-primary-600">
											<HiPencil className="w-4 h-4" />
											Edit
										</button>
									</div>
								</Card.Header>
								<Card.Body>
									<p className="text-gray-600">
										John Doe
										<br />
										123 Business Street
										<br />
										Sydney, NSW 2000
										<br />
										Australia
									</p>
								</Card.Body>
							</Card>
						</motion.div>
					)}

					{activeTab === "invoices" && (
						<motion.div
							key="invoices"
							initial={{opacity: 0, y: 10}}
							animate={{opacity: 1, y: 0}}
							exit={{opacity: 0, y: -10}}
						>
							<div className="flex items-center justify-between mb-6">
								<div>
									<h3 className="text-lg font-semibold text-gray-900">
										Invoice History
									</h3>
									<p className="text-gray-600">
										View and download your past invoices.
									</p>
								</div>
								<button className="btn-secondary btn-md">
									<HiDownload className="w-4 h-4" />
									Download All
								</button>
							</div>

							<Card>
								<div className="overflow-x-auto">
									<table className="table">
										<thead>
											<tr>
												<th>Invoice ID</th>
												<th>Date</th>
												<th>Description</th>
												<th>Amount</th>
												<th>Status</th>
												<th className="text-right">Actions</th>
											</tr>
										</thead>
										<tbody>
											{billingData.invoices.map((invoice) => (
												<InvoiceRow key={invoice.id} invoice={invoice} />
											))}
										</tbody>
									</table>
								</div>
							</Card>
						</motion.div>
					)}

					{activeTab === "addons" && (
						<motion.div
							key="addons"
							initial={{opacity: 0, y: 10}}
							animate={{opacity: 1, y: 0}}
							exit={{opacity: 0, y: -10}}
						>
							<div className="mb-6">
								<h3 className="text-lg font-semibold text-gray-900">
									Add-ons & Extras
								</h3>
								<p className="text-gray-600">
									Enhance your experience with additional features and credits.
								</p>
							</div>

							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
								{billingData.addOns.map((addon) => (
									<AddOnCard
										key={addon.id}
										addon={addon}
										onPurchase={handlePurchaseAddOn}
									/>
								))}
							</div>
						</motion.div>
					)}
				</AnimatePresence>
			</div>

			{/* Upgrade Plan Modal */}
			<Modal
				isOpen={showUpgradeModal}
				onClose={() => {
					setShowUpgradeModal(false);
					setSelectedPlan(null);
				}}
				title="Upgrade Your Plan"
				size="md"
			>
				{selectedPlan && (
					<div className="p-6">
						<div className="text-center mb-6">
							<div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
								<HiArrowUp className="w-8 h-8 text-primary-600" />
							</div>
							<h3 className="text-xl font-bold text-gray-900">
								Upgrade to {selectedPlan.name}
							</h3>
							<p className="text-gray-500 mt-2">
								{formatCurrency(selectedPlan.price)}/month ·{" "}
								{selectedPlan.credits} credits
							</p>
						</div>

						<div className="bg-gray-50 rounded-xl p-4 mb-6">
							<h4 className="font-medium text-gray-900 mb-3">
								What's included:
							</h4>
							<ul className="space-y-2">
								{selectedPlan.features.map((feature, index) => (
									<li
										key={index}
										className="flex items-center gap-2 text-sm text-gray-600"
									>
										<HiCheck className="w-4 h-4 text-success-500" />
										{feature}
									</li>
								))}
							</ul>
						</div>

						<Alert variant="info" className="mb-6">
							<HiInformationCircle className="w-4 h-4" />
							Your new plan will start immediately and you'll be charged a
							prorated amount for the remaining days.
						</Alert>

						<div className="flex gap-3">
							<button
								onClick={() => {
									setShowUpgradeModal(false);
									setSelectedPlan(null);
								}}
								className="btn-secondary btn-md flex-1"
							>
								Cancel
							</button>
							<button
								onClick={confirmUpgrade}
								className="btn-primary btn-md flex-1"
							>
								Confirm Upgrade
							</button>
						</div>
					</div>
				)}
			</Modal>

			{/* Cancel Subscription Modal */}
			<Modal
				isOpen={showCancelModal}
				onClose={() => setShowCancelModal(false)}
				title="Cancel Subscription"
				size="md"
			>
				<div className="p-6">
					<div className="flex items-center justify-center w-16 h-16 bg-error-100 rounded-full mx-auto mb-4">
						<HiExclamationCircle className="w-8 h-8 text-error-600" />
					</div>
					<h3 className="text-xl font-bold text-gray-900 text-center mb-2">
						Are you sure you want to cancel?
					</h3>
					<p className="text-gray-500 text-center mb-6">
						You'll lose access to all premium features when your current billing
						period ends on{" "}
						{formatDate(billingData.subscription.currentPeriodEnd)}.
					</p>

					<div className="bg-gray-50 rounded-xl p-4 mb-6">
						<h4 className="font-medium text-gray-900 mb-3">
							You'll lose access to:
						</h4>
						<ul className="space-y-2">
							{currentPlan?.features.map((feature, index) => (
								<li
									key={index}
									className="flex items-center gap-2 text-sm text-gray-600"
								>
									<HiXCircle className="w-4 h-4 text-error-500" />
									{feature}
								</li>
							))}
						</ul>
					</div>

					<div className="flex gap-3">
						<button
							onClick={() => setShowCancelModal(false)}
							className="btn-primary btn-md flex-1"
						>
							Keep Subscription
						</button>
						<button
							onClick={handleCancelSubscription}
							className="btn-secondary btn-md flex-1 text-error-600 hover:bg-error-50"
						>
							Cancel Anyway
						</button>
					</div>
				</div>
			</Modal>

			{/* Add Payment Method Modal */}
			<Modal
				isOpen={showAddPaymentModal}
				onClose={() => setShowAddPaymentModal(false)}
				title="Add Payment Method"
				size="md"
			>
				<div className="p-6">
					<form className="space-y-4">
						<div>
							<label className="label">Card Number</label>
							<input
								type="text"
								placeholder="1234 5678 9012 3456"
								className="input"
							/>
						</div>
						<div className="grid grid-cols-2 gap-4">
							<div>
								<label className="label">Expiry Date</label>
								<input type="text" placeholder="MM/YY" className="input" />
							</div>
							<div>
								<label className="label">CVC</label>
								<input type="text" placeholder="123" className="input" />
							</div>
						</div>
						<div>
							<label className="label">Cardholder Name</label>
							<input type="text" placeholder="John Doe" className="input" />
						</div>
						<div className="flex items-center gap-2">
							<input
								type="checkbox"
								id="setDefault"
								className="w-4 h-4 text-primary-600 border-gray-300 rounded"
							/>
							<label htmlFor="setDefault" className="text-sm text-gray-600">
								Set as default payment method
							</label>
						</div>
					</form>

					<div className="flex items-center gap-2 mt-4 p-3 bg-gray-50 rounded-lg">
						<HiShieldCheck className="w-5 h-5 text-success-500" />
						<span className="text-sm text-gray-600">
							Your payment info is secured with 256-bit SSL encryption
						</span>
					</div>

					<div className="flex gap-3 mt-6">
						<button
							onClick={() => setShowAddPaymentModal(false)}
							className="btn-secondary btn-md flex-1"
						>
							Cancel
						</button>
						<button
							onClick={() => setShowAddPaymentModal(false)}
							className="btn-primary btn-md flex-1"
						>
							Add Card
						</button>
					</div>
				</div>
			</Modal>

			{/* Purchase Add-on Modal */}
			<Modal
				isOpen={showPurchaseModal}
				onClose={() => {
					setShowPurchaseModal(false);
					setSelectedAddOn(null);
				}}
				title="Confirm Purchase"
				size="sm"
			>
				{selectedAddOn && (
					<div className="p-6">
						<div className="text-center mb-6">
							<div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-4">
								<HiCurrencyDollar className="w-8 h-8 text-success-600" />
							</div>
							<h3 className="text-xl font-bold text-gray-900">
								{selectedAddOn.name}
							</h3>
							<p className="text-gray-500 mt-1">{selectedAddOn.description}</p>
						</div>

						<div className="bg-gray-50 rounded-xl p-4 mb-6">
							<div className="flex items-center justify-between">
								<span className="text-gray-600">
									{selectedAddOn.selectedOption
										? `${selectedAddOn.selectedOption.credits} credits`
										: selectedAddOn.name}
								</span>
								<span className="text-xl font-bold text-gray-900">
									${selectedAddOn.selectedOption?.price || selectedAddOn.price}
								</span>
							</div>
						</div>

						<p className="text-sm text-gray-500 text-center mb-6">
							{selectedAddOn.selectedOption
								? "Credits will be added to your account immediately."
								: `This will be charged ${selectedAddOn.unit}.`}
						</p>

						<div className="flex gap-3">
							<button
								onClick={() => {
									setShowPurchaseModal(false);
									setSelectedAddOn(null);
								}}
								className="btn-secondary btn-md flex-1"
							>
								Cancel
							</button>
							<button
								onClick={confirmPurchase}
								className="btn-primary btn-md flex-1"
							>
								Confirm Purchase
							</button>
						</div>
					</div>
				)}
			</Modal>
		</>
	);
};

export default BillingPage;