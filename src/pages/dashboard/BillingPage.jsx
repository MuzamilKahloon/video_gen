import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiCreditCard, HiPlus, HiCheck, HiX, HiDownload, HiTrendingUp, HiSparkles,
  HiShieldCheck, HiClock, HiChartBar, HiExclamationCircle, HiInformationCircle,
  HiDotsVertical, HiPencil, HiTrash, HiStar, HiArrowUp, HiArrowRight, HiReceiptTax,
  HiCurrencyDollar, HiVideoCamera, HiTemplate, HiCheckCircle, HiXCircle, HiCloud,
  HiCalendar, HiLightningBolt
} from "react-icons/hi";
import { cn } from "@utils/cn";

// Minimal, self-contained components
const AnimatedLine = ({ className = "" }) => (
  <div className={`h-[1px] bg-gray-200 overflow-hidden ${className}`}>
    <motion.div className="w-1/4 h-full bg-gradient-to-r from-transparent via-orange-400 to-transparent" animate={{ x: ["-100%", "400%"] }} transition={{ duration: 4, repeat: Infinity }} />
  </div>
);

const StatusBadge = ({ status }) => {
  const styles = {
    success: "bg-green-100 text-green-700", pending: "bg-yellow-100 text-yellow-700", 
    failed: "bg-red-100 text-red-700", active: "bg-green-100 text-green-700",
    amber: "bg-amber-100 text-amber-700", rose: "bg-red-100 text-red-700",
    emerald: "bg-green-100 text-green-700", gray: "bg-gray-100 text-gray-700"
  };
  return <span className={`px-3 py-1 text-xs font-medium rounded-full ${styles[status] || styles.pending}`}>{status?.charAt(0).toUpperCase() + status?.slice(1)}</span>;
};

const Button = ({ children, className = "", ...props }) => <button className={`px-4 py-2 font-medium rounded-lg transition-all ${className}`} {...props}>{children}</button>;

const ProgressBar = ({ value, color = "amber", className = "" }) => {
  const colorClass = `bg-${color === "rose" ? "red" : color === "emerald" ? "green" : "amber"}-500`;
  return <div className={`w-full bg-gray-200 rounded-full overflow-hidden ${className}`}><motion.div className={`h-full ${colorClass}`} initial={{ width: 0 }} animate={{ width: `${Math.min(value, 100)}%` }} transition={{ duration: 0.8 }} /></div>;
};

const Tabs = ({ tabs = [], activeTab, onChange }) => (
  <div className="flex gap-2 bg-gray-100 rounded-xl p-1">
    {tabs.map(tab => <Button key={tab.id} onClick={() => onChange(tab.id)} className={`flex-1 px-4 py-2 text-sm font-medium rounded-lg ${activeTab === tab.id ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg" : "text-gray-600 hover:text-black hover:bg-white"}`}>{tab.label}</Button>)}
  </div>
);

const Modal = ({ isOpen, onClose, title, children, size = "md" }) => {
  if (!isOpen) return null;
  return <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}><motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className={`bg-white border border-gray-200 rounded-2xl shadow-2xl w-full max-w-${size} max-h-[90vh] overflow-y-auto`} onClick={(e) => e.stopPropagation()}><div className="p-6 border-b border-gray-200 flex items-center justify-between"><h2 className="text-xl font-normal text-black">{title}</h2><Button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg text-gray-500"><HiX className="w-5 h-5" /></Button></div><div className="p-6">{children}</div></motion.div></div>;
};

const Alert = ({ variant = "amber", title, children }) => {
  const color = variant === "amber" ? "amber" : variant === "rose" ? "red" : "blue";
  return <div className={`bg-${color}-100 border border-${color}-200 rounded-2xl p-6`}>{title && <h3 className={`font-medium text-${color}-700 mb-2`}>{title}</h3>}<p className={`text-${color}-700`}>{children}</p></div>;
};

// Mock data
const mockBillingData = { subscription: { plan: "creator", status: "active", currentPeriodStart: "2024-01-01T00:00:00Z", currentPeriodEnd: "2024-02-01T00:00:00Z", cancelAtPeriodEnd: false, nextBillingDate: "2024-02-01T00:00:00Z", amount: 39 }, credits: { total: 70, used: 45, remaining: 25, resetDate: "2024-02-01T00:00:00Z" }, usage: { thisMonth: { videosGenerated: 18, totalDuration: 216, creditsUsed: 45, storageUsed: 1.2 }, lastMonth: { videosGenerated: 22, totalDuration: 264, creditsUsed: 55, storageUsed: 1.5 } }, paymentMethods: [ { id: "pm_1", type: "card", brand: "visa", last4: "4242", expiryMonth: 12, expiryYear: 2025, isDefault: true }, { id: "pm_2", type: "card", brand: "mastercard", last4: "8888", expiryMonth: 6, expiryYear: 2026, isDefault: false } ], invoices: [ { id: "inv_001", date: "2024-01-01T00:00:00Z", amount: 39, status: "paid", description: "Creator Plan - Monthly", downloadUrl: "#" }, { id: "inv_002", date: "2023-12-01T00:00:00Z", amount: 39, status: "paid", description: "Creator Plan - Monthly", downloadUrl: "#" }, { id: "inv_003", date: "2023-11-01T00:00:00Z", amount: 19, status: "paid", description: "Starter Plan - Monthly", downloadUrl: "#" } ], addOns: [ { id: "addon_1", name: "Extra Credits", description: "Purchase additional credits", options: [{ credits: 25, price: 29 }, { credits: 50, price: 49 }, { credits: 100, price: 69 }] }, { id: "addon_2", name: "4K Upgrade", description: "Upgrade any video to 4K resolution", price: 1, unit: "per video" }, { id: "addon_3", name: "Background Music", description: "Add royalty-free background music", price: 0.5, unit: "per video" }, { id: "addon_4", name: "Remove Watermark", description: "Remove watermark from all videos", price: 3, unit: "per month" }, { id: "addon_5", name: "Commercial License", description: "Use videos for commercial purposes", price: 15, unit: "per month" } ] };

// Formatters
const formatDate = (dateString) => dateString ? new Date(dateString).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "—";
const formatCurrency = (amount) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);

const CardBrandIcon = ({ brand }) => {
  const icons = {
    visa: <div className="w-10 h-7 bg-blue-900 rounded-lg flex items-center justify-center"><span className="text-xs font-bold text-white tracking-wider">VISA</span></div>,
    mastercard: <div className="w-10 h-7 bg-red-700 rounded-lg flex items-center justify-center"><span className="text-xs font-bold text-white">MC</span></div>,
    amex: <div className="w-10 h-7 bg-cyan-600 rounded-lg flex items-center justify-center"><span className="text-xs font-bold text-white">AMEX</span></div>,
  };
  return icons[brand] || <div className="w-10 h-7 bg-gray-700 rounded-lg flex items-center justify-center"><HiCreditCard className="w-4 h-4 text-gray-400" /></div>;
};

const PlanCard = ({ plan, isCurrentPlan, onSelect, isPopular }) => (
  <motion.div whileHover={{ y: -4 }} className={cn("relative rounded-2xl border p-6 transition-all cursor-pointer bg-white hover:border-gray-300 hover:shadow-xl", isCurrentPlan ? "border-orange-400 bg-gradient-to-b from-orange-50 to-white" : "border-gray-200", isPopular && !isCurrentPlan && "border-amber-300")} onClick={() => !isCurrentPlan && onSelect(plan)}>
    {isPopular && <div className="absolute -top-3 left-1/2 -translate-x-1/2"><Button className="bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1"><HiStar className="w-3 h-3" />Most Popular</Button></div>}
    {isCurrentPlan && <div className="absolute -top-3 left-1/2 -translate-x-1/2"><StatusBadge status="active" /></div>}
    <div className="text-center mb-6"><h3 className="text-xl font-normal text-black">{plan.name}</h3><div className="mt-2"><span className="text-4xl font-light text-black">${plan.price}</span><span className="text-gray-500 ml-1">/month</span></div><p className="mt-1 text-sm text-gray-500">{plan.credits} credits included</p></div>
    <ul className="space-y-3 mb-6">{plan.features.map((feature, i) => (<li key={i} className="flex items-start gap-3 text-sm text-gray-600"><HiCheck className="w-5 h-5 text-green-600 mt-0.5" /><span>{feature}</span></li>))}</ul>
    <Button className={cn("w-full py-3", isCurrentPlan ? "bg-gray-200 text-gray-500" : "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg")} disabled={isCurrentPlan}>{isCurrentPlan ? "Current Plan" : "Upgrade"}</Button>
  </motion.div>
);

const UsageStatCard = ({ icon: Icon, label, value, subValue, trend, color = "amber" }) => {
  const colorClasses = { amber: "bg-amber-100 text-amber-600", emerald: "bg-green-100 text-green-600", blue: "bg-blue-100 text-blue-600", purple: "bg-purple-100 text-purple-600" };
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 hover:border-gray-300 hover:shadow-xl transition-all">
      <div className="flex items-center gap-4 mb-4"><div className={`w-12 h-12 ${colorClasses[color]} rounded-lg flex items-center justify-center`}><Icon className="w-6 h-6" /></div><span className="text-sm font-medium text-gray-600">{label}</span></div>
      <div className="flex items-end justify-between">
        <div><p className="text-3xl font-light text-black">{value}</p>{subValue && <p className="text-sm text-gray-500 mt-1">{subValue}</p>}</div>
        {trend !== undefined && <div className={`flex items-center gap-1 text-sm font-medium ${trend >= 0 ? "text-green-600" : "text-red-600"}`}><HiTrendingUp className={cn("w-4 h-4", trend < 0 && "rotate-180")} />{Math.abs(trend)}%</div>}
      </div>
    </div>
  );
};

const PaymentMethodCard = ({ method, onSetDefault, onDelete }) => {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <div className={cn("flex items-center justify-between p-6 rounded-2xl border transition-all", method.isDefault ? "border-orange-400 bg-orange-50" : "border-gray-200 hover:border-gray-300")}>
      <div className="flex items-center gap-4"><CardBrandIcon brand={method.brand} /><div><div className="flex items-center gap-2"><span className="font-medium text-black capitalize">{method.brand}</span><span className="text-gray-500">•••• {method.last4}</span>{method.isDefault && <StatusBadge status="success" />}</div><p className="text-sm text-gray-500 mt-1">Expires {method.expiryMonth.toString().padStart(2, "0")}/{method.expiryYear}</p></div></div>
      <div className="relative">
        <Button onClick={() => setShowMenu(!showMenu)} className="p-2 hover:bg-gray-100 rounded-lg text-gray-500"><HiDotsVertical className="w-4 h-4" /></Button>
        {showMenu && <><div className="fixed inset-0 z-40" onClick={() => setShowMenu(false)} /><div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-xl shadow-xl z-50 min-w-[160px]">{!method.isDefault && <Button onClick={() => { onSetDefault(method.id); setShowMenu(false); }} className="w-full flex items-center gap-3 px-4 py-2 text-sm text-left text-gray-600 hover:text-black hover:bg-gray-50"><HiCheckCircle className="w-4 h-4" />Set as Default</Button>}<Button onClick={() => setShowMenu(false)} className="w-full flex items-center gap-3 px-4 py-2 text-sm text-left text-gray-600 hover:text-black hover:bg-gray-50"><HiPencil className="w-4 h-4" />Edit</Button><div className="h-px bg-gray-200 my-1" /><Button onClick={() => { onDelete(method.id); setShowMenu(false); }} className="w-full flex items-center gap-3 px-4 py-2 text-sm text-left text-red-600 hover:text-red-700 hover:bg-red-50"><HiTrash className="w-4 h-4" />Remove</Button></div></>}</div>
    </div>
  );
};

const InvoiceRow = ({ invoice }) => {
  const status = { paid: "success", pending: "amber", failed: "rose", refunded: "gray" }[invoice.status];
  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50 transition-all">
      <td className="px-6 py-4 text-sm font-medium text-black">{invoice.id}</td>
      <td className="px-6 py-4 text-sm text-gray-600">{formatDate(invoice.date)}</td>
      <td className="px-6 py-4 text-sm text-gray-500">{invoice.description}</td>
      <td className="px-6 py-4 text-sm font-medium text-black">{formatCurrency(invoice.amount)}</td>
      <td className="px-6 py-4"><StatusBadge status={status} /></td>
      <td className="px-6 py-4 text-right"><Button onClick={() => window.open(invoice.downloadUrl, '_blank')} className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-black rounded-lg text-sm"><HiDownload className="w-4 h-4" />PDF</Button></td>
    </tr>
  );
};

const AddOnCard = ({ addon, onPurchase }) => (
  <div className="bg-white border border-gray-200 rounded-2xl p-6 hover:border-gray-300 hover:shadow-xl transition-all">
    <div className="flex items-start justify-between mb-4">
      <div><h4 className="text-lg font-medium text-black mb-1">{addon.name}</h4><p className="text-sm text-gray-600">{addon.description}</p></div>
      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center"><HiPlus className="w-5 h-5 text-gray-500" /></div>
    </div>
    {addon.options ? (
      <div className="space-y-2">
        {addon.options.map((option, i) => <Button key={i} onClick={() => onPurchase(addon.id, option)} className="w-full flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:border-amber-400 hover:bg-amber-50 transition-all text-sm text-left"><span className="font-medium text-gray-700">{option.credits} credits</span><span className="font-bold text-black">${option.price}</span></Button>)}
      </div>
    ) : (
      <div className="flex items-center justify-between">
        <div><span className="text-2xl font-light text-black">${addon.price}</span><span className="text-sm text-gray-500 ml-1">/{addon.unit}</span></div>
        <Button onClick={() => onPurchase(addon.id)} className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-lg transition-all flex items-center gap-2"><HiPlus className="w-4 h-4" />Add</Button>
      </div>
    )}
  </div>
);

export default function BillingPage() {
  const [billingData, setBillingData] = useState(mockBillingData);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showAddPaymentModal, setShowAddPaymentModal] = useState(false);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [selectedAddOn, setSelectedAddOn] = useState(null);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 800);
  }, []);

  const SUBSCRIPTION_PLANS = [
    { id: "starter", name: "Starter", price: 19, credits: 25, popular: false, features: ["25 credits/month", "1080p HD videos", "Basic templates", "Email support"] },
    { id: "creator", name: "Creator", price: 39, credits: 70, popular: true, features: ["70 credits/month", "4K Video export", "All templates", "Priority support", "No watermark"] },
    { id: "pro", name: "Pro", price: 79, credits: 150, popular: false, features: ["150 credits/month", "4K Video export", "All templates", "Commercial license", "API access"] },
  ];

  const handleUpgradePlan = (plan) => { setSelectedPlan(plan); setShowUpgradeModal(true); };
  const confirmUpgrade = async () => { setIsLoading(true); await new Promise(r => setTimeout(r, 1000)); setBillingData(prev => ({ ...prev, subscription: { ...prev.subscription, plan: selectedPlan.id, amount: selectedPlan.price }, credits: { ...prev.credits, total: selectedPlan.credits } })); setShowUpgradeModal(false); setSelectedPlan(null); setIsLoading(false); };
  const handleCancelSubscription = async () => { setIsLoading(true); await new Promise(r => setTimeout(r, 800)); setBillingData(prev => ({ ...prev, subscription: { ...prev.subscription, cancelAtPeriodEnd: true } })); setShowCancelModal(false); setIsLoading(false); };
  const handleSetDefaultPayment = (id) => setBillingData(prev => ({ ...prev, paymentMethods: prev.paymentMethods.map(pm => ({ ...pm, isDefault: pm.id === id })) }));
  const handleDeletePayment = (id) => setBillingData(prev => ({ ...prev, paymentMethods: prev.paymentMethods.filter(pm => pm.id !== id) }));
  const handlePurchaseAddOn = (addonId, option = null) => { const addon = billingData.addOns.find(a => a.id === addonId); setSelectedAddOn({ ...addon, selectedOption: option }); setShowPurchaseModal(true); };
  const confirmPurchase = async () => { setIsLoading(true); await new Promise(r => setTimeout(r, 800)); if (selectedAddOn.selectedOption) setBillingData(prev => ({ ...prev, credits: { ...prev.credits, total: prev.credits.total + selectedAddOn.selectedOption.credits, remaining: prev.credits.remaining + selectedAddOn.selectedOption.credits } })); setShowPurchaseModal(false); setSelectedAddOn(null); setIsLoading(false); };

  if (isLoading) return <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white text-black p-6"><div className="mb-8"><h1 className="text-3xl font-normal text-black mb-2">Billing & Subscription</h1><p className="text-lg text-gray-600">Manage your subscription, credits, and payment methods</p></div><div className="grid grid-cols-3 gap-6"> {[...Array(3)].map((_, i) => <div key={i} className="h-40 bg-gray-100 rounded-2xl animate-pulse" />)} </div></div>;

  const currentPlan = SUBSCRIPTION_PLANS.find(p => p.id === billingData.subscription.plan);
  const creditsPercentage = (billingData.credits.used / billingData.credits.total) * 100;
  const daysUntilReset = Math.ceil((new Date(billingData.credits.resetDate) - new Date()) / (1000 * 60 * 60 * 24));
  const tabs = [ { id: "overview", label: "Overview" }, { id: "plans", label: "Plans" }, { id: "payment", label: "Payment" }, { id: "invoices", label: "Invoices" }, { id: "addons", label: "Add-ons" } ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white text-black p-4 md:p-6 lg:p-8">
      <Helmet><title>Billing & Subscription - VideoGen AI</title></Helmet>
      <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden"><div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-400/5 rounded-full blur-[150px]" /></div>
      
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl md:text-4xl font-normal text-black mb-2">Billing & Subscription</h1>
          <p className="text-lg text-gray-600">Manage your subscription, credits, and payment methods</p>
        </motion.div>

        {billingData.subscription.cancelAtPeriodEnd && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <Alert variant="amber" title="Subscription Cancellation Scheduled">
              Your subscription will be cancelled on {formatDate(billingData.subscription.currentPeriodEnd)}. You'll continue to have access until then.
              <button onClick={() => setBillingData(prev => ({ ...prev, subscription: { ...prev.subscription, cancelAtPeriodEnd: false } }))} className="ml-2 text-amber-600 font-medium underline">Reactivate subscription</button>
            </Alert>
          </motion.div>
        )}

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-orange-50 to-white border border-orange-200 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg flex items-center justify-center shadow-lg"><HiSparkles className="w-6 h-6 text-white" /></div>
              <StatusBadge status="success" />
            </div>
            <h3 className="text-lg font-medium text-gray-600">Current Plan</h3>
            <p className="text-3xl font-light text-black mt-1">{currentPlan?.name}</p>
            <p className="text-gray-500 mt-2">{formatCurrency(billingData.subscription.amount)}/month</p>
            <div className="mt-4 pt-4 border-t border-gray-200"><p className="text-sm text-gray-500">Next billing: {formatDate(billingData.subscription.nextBillingDate)}</p></div>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-6 hover:border-gray-300 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center"><HiLightningBolt className="w-6 h-6 text-green-600" /></div>
              <StatusBadge status={creditsPercentage > 80 ? "rose" : creditsPercentage > 50 ? "amber" : "emerald"} />
            </div>
            <h3 className="text-lg font-medium text-gray-600">Credits Balance</h3>
            <div className="flex items-baseline gap-2 mt-1">
              <p className="text-3xl font-light text-black">{billingData.credits.remaining}</p>
              <span className="text-gray-500">/ {billingData.credits.total}</span>
            </div>
            <ProgressBar value={creditsPercentage} color={creditsPercentage > 80 ? "rose" : creditsPercentage > 50 ? "amber" : "emerald"} className="mt-4" />
            <p className="text-sm text-gray-500 mt-3">Resets in {daysUntilReset} days</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-6 hover:border-gray-300 transition-all">
            <h3 className="text-lg font-medium text-black mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Button onClick={() => setActiveTab("addons")} className="w-full flex items-center gap-2 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-black rounded-lg transition-all"><HiPlus className="w-4 h-4" />Buy More Credits</Button>
              <Button onClick={() => setActiveTab("plans")} className="w-full flex items-center gap-2 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-black rounded-lg transition-all"><HiArrowUp className="w-4 h-4" />Upgrade Plan</Button>
              <Button onClick={() => setActiveTab("payment")} className="w-full flex items-center gap-2 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-black rounded-lg transition-all"><HiCreditCard className="w-4 h-4" />Update Payment</Button>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6"><Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} /></motion.div>

        <AnimatePresence mode="wait">
          {activeTab === "overview" && (
            <motion.div key="overview" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-8">
              <div><h3 className="text-2xl font-normal text-black mb-6">This Month's Usage</h3><div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <UsageStatCard icon={HiVideoCamera} label="Videos Generated" value={billingData.usage.thisMonth.videosGenerated} subValue="videos" trend={Math.round(((billingData.usage.thisMonth.videosGenerated - billingData.usage.lastMonth.videosGenerated) / billingData.usage.lastMonth.videosGenerated) * 100)} color="amber" />
                <UsageStatCard icon={HiClock} label="Total Duration" value={`${Math.floor(billingData.usage.thisMonth.totalDuration / 60)}m`} subValue={`${billingData.usage.thisMonth.totalDuration % 60}s total`} trend={Math.round(((billingData.usage.thisMonth.totalDuration - billingData.usage.lastMonth.totalDuration) / billingData.usage.lastMonth.totalDuration) * 100)} color="blue" />
                <UsageStatCard icon={HiLightningBolt} label="Credits Used" value={billingData.usage.thisMonth.creditsUsed} subValue={`of ${billingData.credits.total}`} color="emerald" />
                <UsageStatCard icon={HiCloud} label="Storage Used" value={`${billingData.usage.thisMonth.storageUsed} GB`} subValue="cloud storage" color="purple" />
              </div></div>

              <div className="bg-white border border-gray-200 rounded-2xl hover:border-gray-300 transition-all">
                <div className="p-6 border-b border-gray-200"><h3 className="text-xl font-normal text-black">Subscription Details</h3></div>
                <div className="p-6"><div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between"><span className="text-gray-600">Plan</span><span className="font-medium text-black">{currentPlan?.name}</span></div>
                    <div className="flex items-center justify-between"><span className="text-gray-600">Status</span><StatusBadge status="success" /></div>
                    <div className="flex items-center justify-between"><span className="text-gray-600">Billing Cycle</span><span className="font-medium text-black">Monthly</span></div>
                    <div className="flex items-center justify-between"><span className="text-gray-600">Price</span><span className="font-medium text-black">{formatCurrency(billingData.subscription.amount)}/month</span></div>
                  </div>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between"><span className="text-gray-600">Current Period</span><span className="font-medium text-black">{formatDate(billingData.subscription.currentPeriodStart)} - {formatDate(billingData.subscription.currentPeriodEnd)}</span></div>
                    <div className="flex items-center justify-between"><span className="text-gray-600">Next Billing Date</span><span className="font-medium text-black">{formatDate(billingData.subscription.nextBillingDate)}</span></div>
                    <div className="flex items-center justify-between"><span className="text-gray-600">Credits Included</span><span className="font-medium text-black">{currentPlan?.credits}/month</span></div>
                  </div>
                </div></div>
                <div className="p-6 pt-0"><div className="flex items-center gap-3">
                  <Button onClick={() => setActiveTab("plans")} className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2"><HiArrowUp className="w-4 h-4" />Upgrade Plan</Button>
                  <Button onClick={() => setShowCancelModal(true)} className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-black rounded-lg">Cancel Subscription</Button>
                </div></div>
              </div>

              <div className="bg-white border border-gray-200 rounded-2xl hover:border-gray-300 transition-all">
                <div className="p-6 border-b border-gray-200 flex items-center justify-between"><h3 className="text-xl font-normal text-black">Recent Invoices</h3><Button onClick={() => setActiveTab("invoices")} className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-black rounded-lg text-sm">View All <HiArrowRight className="w-4 h-4" /></Button></div>
                <div className="overflow-x-auto"><table className="w-full"><thead><tr className="border-b border-gray-100">{['Invoice', 'Date', 'Description', 'Amount', 'Status', ''].map(h => <th key={h} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{h}</th>)}</tr></thead><tbody>{billingData.invoices.slice(0, 3).map(invoice => <InvoiceRow key={invoice.id} invoice={invoice} />)}</tbody></table></div>
              </div>
            </motion.div>
          )}

          {activeTab === "plans" && (
            <motion.div key="plans" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <div className="mb-8"><h3 className="text-2xl font-normal text-black mb-2">Choose Your Plan</h3><p className="text-gray-600">Select the plan that best fits your needs. Upgrade or downgrade anytime.</p></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">{SUBSCRIPTION_PLANS.map(plan => <PlanCard key={plan.id} plan={plan} isCurrentPlan={plan.id === billingData.subscription.plan} isPopular={plan.popular} onSelect={handleUpgradePlan} />)}</div>
              <div className="bg-gradient-to-r from-gray-900 to-black text-white rounded-2xl p-8"><div className="flex items-center justify-between flex-wrap gap-6"><div><h3 className="text-2xl font-normal mb-2">Need More?</h3><p className="text-gray-300 max-w-xl">Enterprise plans with custom limits, dedicated support, white-label options, and API access. Starting at $499/month.</p></div><Button className="px-6 py-3 bg-white hover:bg-gray-100 text-black rounded-lg flex items-center gap-2">Contact Sales <HiArrowRight className="w-4 h-4" /></Button></div></div>
            </motion.div>
          )}

          {activeTab === "payment" && (
            <motion.div key="payment" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-8">
              <div className="flex items-center justify-between"><div><h3 className="text-2xl font-normal text-black mb-2">Payment Methods</h3><p className="text-gray-600">Manage your payment methods and billing preferences.</p></div>
                <Button onClick={() => setShowAddPaymentModal(true)} className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2"><HiPlus className="w-4 h-4" />Add Payment Method</Button>
              </div>
              <div className="space-y-4">{billingData.paymentMethods.map(method => <PaymentMethodCard key={method.id} method={method} onSetDefault={handleSetDefaultPayment} onDelete={handleDeletePayment} />)}</div>
            </motion.div>
          )}

          {activeTab === "invoices" && (
            <motion.div key="invoices" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <div className="flex items-center justify-between mb-8"><div><h3 className="text-2xl font-normal text-black mb-2">Invoice History</h3><p className="text-gray-600">View and download your past invoices.</p></div><Button className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-black rounded-lg flex items-center gap-2"><HiDownload className="w-4 h-4" />Download All</Button></div>
              <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden"><div className="overflow-x-auto"><table className="w-full"><thead><tr className="border-b border-gray-100">{['Invoice', 'Date', 'Description', 'Amount', 'Status', ''].map(h => <th key={h} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{h}</th>)}</tr></thead><tbody>{billingData.invoices.map(invoice => <InvoiceRow key={invoice.id} invoice={invoice} />)}</tbody></table></div></div>
            </motion.div>
          )}

          {activeTab === "addons" && (
            <motion.div key="addons" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <div className="mb-8"><h3 className="text-2xl font-normal text-black mb-2">Add-ons & Extras</h3><p className="text-gray-600">Enhance your experience with additional features and credits.</p></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{billingData.addOns.map(addon => <AddOnCard key={addon.id} addon={addon} onPurchase={handlePurchaseAddOn} />)}</div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Modals */}
        <Modal isOpen={showUpgradeModal} onClose={() => { setShowUpgradeModal(false); setSelectedPlan(null); }} title="Upgrade Your Plan" size="md">
          {selectedPlan && (
            <div className="space-y-6">
              <div className="text-center"><div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4"><HiArrowUp className="w-8 h-8 text-amber-600" /></div><h3 className="text-xl font-medium text-black mb-2">Upgrade to {selectedPlan.name}</h3><p className="text-gray-600">{formatCurrency(selectedPlan.price)}/month · {selectedPlan.credits} credits</p></div>
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200"><h4 className="font-medium text-black mb-3">What's included:</h4><ul className="space-y-2">{selectedPlan.features.map((feature, i) => <li key={i} className="flex items-center gap-2 text-sm text-gray-700"><HiCheck className="w-4 h-4 text-green-600" />{feature}</li>)}</ul></div>
              <div className="flex gap-3"><Button onClick={() => { setShowUpgradeModal(false); setSelectedPlan(null); }} className="flex-1 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-black rounded-lg">Cancel</Button><Button onClick={confirmUpgrade} className="flex-1 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-lg shadow-lg">Confirm Upgrade</Button></div>
            </div>
          )}
        </Modal>

        <Modal isOpen={showCancelModal} onClose={() => setShowCancelModal(false)} title="Cancel Subscription" size="md">
          <div className="space-y-6">
            <div className="text-center"><HiExclamationCircle className="w-16 h-16 text-red-600 mx-auto mb-4" /><h3 className="text-xl font-medium text-black mb-2">Are you sure?</h3><p className="text-gray-600">You'll lose access to premium features when your billing period ends on {formatDate(billingData.subscription.currentPeriodEnd)}.</p></div>
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200"><h4 className="font-medium text-black mb-3">You'll lose access to:</h4><ul className="space-y-2">{currentPlan?.features.map((feature, i) => <li key={i} className="flex items-center gap-2 text-sm text-gray-700"><HiXCircle className="w-4 h-4 text-red-600" />{feature}</li>)}</ul></div>
            <div className="flex gap-3"><Button onClick={() => setShowCancelModal(false)} className="flex-1 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-lg">Keep Subscription</Button><Button onClick={handleCancelSubscription} className="flex-1 px-6 py-3 bg-red-100 hover:bg-red-200 text-red-600 hover:text-red-700 rounded-lg">Cancel Anyway</Button></div>
          </div>
        </Modal>

        <Modal isOpen={showAddPaymentModal} onClose={() => setShowAddPaymentModal(false)} title="Add Payment Method" size="md">
          <div className="space-y-4">
            <div><label className="block text-sm font-medium text-gray-600 mb-2">Card Number</label><input type="text" placeholder="1234 5678 9012 3456" className="w-full bg-gray-100 border border-gray-200 rounded-lg px-4 py-2.5 text-black outline-none focus:border-amber-400" /></div>
            <div className="grid grid-cols-2 gap-4"><div><label className="block text-sm font-medium text-gray-600 mb-2">Expiry Date</label><input type="text" placeholder="MM/YY" className="w-full bg-gray-100 border border-gray-200 rounded-lg px-4 py-2.5 text-black outline-none focus:border-amber-400" /></div><div><label className="block text-sm font-medium text-gray-600 mb-2">CVC</label><input type="text" placeholder="123" className="w-full bg-gray-100 border border-gray-200 rounded-lg px-4 py-2.5 text-black outline-none focus:border-amber-400" /></div></div>
            <div><label className="block text-sm font-medium text-gray-600 mb-2">Cardholder Name</label><input type="text" placeholder="John Doe" className="w-full bg-gray-100 border border-gray-200 rounded-lg px-4 py-2.5 text-black outline-none focus:border-amber-400" /></div>
            <div className="flex items-center gap-2 py-3"><input type="checkbox" className="w-4 h-4 rounded" /><label className="text-sm text-gray-600">Set as default payment method</label></div>
            <div className="flex items-center gap-2 p-3 bg-green-100 border border-green-200 rounded-lg"><HiShieldCheck className="w-5 h-5 text-green-600" /><span className="text-sm text-green-700">Your payment info is secured with 256-bit SSL encryption</span></div>
            <div className="flex gap-3 pt-4"><Button onClick={() => setShowAddPaymentModal(false)} className="flex-1 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-black rounded-lg">Cancel</Button><Button onClick={() => setShowAddPaymentModal(false)} className="flex-1 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-lg shadow-lg">Add Card</Button></div>
          </div>
        </Modal>

        <Modal isOpen={showPurchaseModal} onClose={() => { setShowPurchaseModal(false); setSelectedAddOn(null); }} title="Confirm Purchase" size="sm">
          {selectedAddOn && (
            <div className="space-y-6">
              <div className="text-center"><div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"><HiCurrencyDollar className="w-8 h-8 text-green-600" /></div><h3 className="text-xl font-medium text-black mb-2">{selectedAddOn.name}</h3><p className="text-gray-600">{selectedAddOn.description}</p></div>
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200"><div className="flex items-center justify-between"><span className="text-gray-700">{selectedAddOn.selectedOption ? `${selectedAddOn.selectedOption.credits} credits` : selectedAddOn.name}</span><span className="text-2xl font-light text-black">${selectedAddOn.selectedOption?.price || selectedAddOn.price}</span></div></div>
              <p className="text-sm text-gray-600 text-center">{selectedAddOn.selectedOption ? "Credits will be added to your account immediately." : `This will be charged ${selectedAddOn.unit}.`}</p>
              <div className="flex gap-3"><Button onClick={() => { setShowPurchaseModal(false); setSelectedAddOn(null); }} className="flex-1 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-black rounded-lg">Cancel</Button><Button onClick={confirmPurchase} className="flex-1 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-lg shadow-lg">Confirm Purchase</Button></div>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
}