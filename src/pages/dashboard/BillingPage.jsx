import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiCreditCard, HiPlus, HiCheck, HiX, HiDownload, HiTrendingUp, HiSparkles,
  HiShieldCheck, HiClock, HiChartBar, HiExclamationCircle, HiInformationCircle,
  HiDotsVertical, HiPencil, HiTrash, HiStar, HiArrowUp, HiArrowRight, HiReceiptTax,
  HiCurrencyDollar, HiVideoCamera, HiTemplate, HiCheckCircle, HiXCircle, HiCloud,
  HiCalendar, HiLightningBolt, HiCube
} from "react-icons/hi";
import { cn } from "@utils/cn";
import LoadingSpinner from "@components/ui/LoadingSpinner";
import StatusBadge from "@components/ui/StatusBadge";
import { useAuthStore } from "@store/authStore";

// Enhanced animated line from DashboardHome
const AnimatedLine = ({ className = "" }) => (
  <div className={`h-[1px] bg-gray-200 overflow-hidden ${className}`}>
    <motion.div
      className="w-1/3 h-full bg-yellow-400"
      animate={{ x: ["-100%", "300%"] }}
      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
    />
  </div>
);

// Buttons matching Dashboard style
const Button = ({ children, className = "", variant = "primary", ...props }) => {
  const variants = {
    primary: "bg-black text-white hover:bg-yellow-400 hover:text-black shadow-xl hover:-translate-y-1 transition-all duration-300 font-bold",
    secondary: "bg-white border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 text-black font-bold",
    black: "bg-black text-white hover:bg-yellow-400 hover:text-black transition-all font-bold",
    ghost: "bg-gray-50 hover:bg-gray-100 text-gray-400 hover:text-black transition-all font-bold",
    danger: "bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 transition-all font-bold"
  };
  return (
    <button 
      className={cn(
        "px-8 py-4 flex items-center justify-center gap-3 uppercase text-[10px] font-black tracking-[0.2em] transition-all", 
        variants[variant], 
        className
      )} 
      {...props}
    >
      {children}
    </button>
  );
};

// Modal matching Loomo style
const Modal = ({ isOpen, onClose, title, children, size = "md" }) => {
  if (!isOpen) return null;
  const sizes = { sm: "max-w-md", md: "max-w-2xl", lg: "max-w-4xl" };
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md" onClick={onClose}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }} 
        animate={{ opacity: 1, scale: 1, y: 0 }} 
        exit={{ opacity: 0, scale: 0.95, y: 20 }} 
        className={cn("bg-white w-full shadow-2xl relative overflow-hidden", sizes[size])} 
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-8 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-xl font-black text-black tracking-tighter uppercase">{title}</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 transition-colors text-gray-400 hover:text-black"><HiX className="w-6 h-6" /></button>
        </div>
        <div className="p-8">{children}</div>
        <AnimatedLine className="absolute bottom-0 left-0 right-0" />
      </motion.div>
    </div>
  );
};

// Mock data
const mockBillingData = { 
  subscription: { 
    plan: "creator", 
    status: "active", 
    currentPeriodStart: "2024-01-01T00:00:00Z", 
    currentPeriodEnd: "2024-02-01T00:00:00Z", 
    cancelAtPeriodEnd: false, 
    nextBillingDate: "2024-02-01T00:00:00Z", 
    amount: 39 
  }, 
  credits: { total: 70, used: 45, remaining: 25, resetDate: "2024-02-01T00:00:00Z" }, 
  usage: { 
    thisMonth: { videosGenerated: 18, totalDuration: 216, creditsUsed: 45, storageUsed: 1.2 }, 
    lastMonth: { videosGenerated: 22, totalDuration: 264, creditsUsed: 55, storageUsed: 1.5 } 
  }, 
  paymentMethods: [ 
    { id: "pm_1", type: "card", brand: "visa", last4: "4242", expiryMonth: 12, expiryYear: 2025, isDefault: true }, 
    { id: "pm_2", type: "card", brand: "mastercard", last4: "8888", expiryMonth: 6, expiryYear: 2026, isDefault: false } 
  ], 
  invoices: [ 
    { id: "inv_001", date: "2024-01-01T00:00:00Z", amount: 39, status: "paid", description: "Creator Plan - Monthly", downloadUrl: "#" }, 
    { id: "inv_002", date: "2023-12-01T00:00:00Z", amount: 39, status: "paid", description: "Creator Plan - Monthly", downloadUrl: "#" }, 
    { id: "inv_003", date: "2023-11-01T00:00:00Z", amount: 19, status: "paid", description: "Starter Plan - Monthly", downloadUrl: "#" } 
  ], 
  addOns: [ 
    { id: "addon_1", name: "Credit Influx", description: "Direct injection of project credits", options: [{ credits: 25, price: 29 }, { credits: 50, price: 49 }, { credits: 100, price: 69 }] }, 
    { id: "addon_2", name: "4K Resolution Hub", description: "Unlock Ultra HD cinematic exports", price: 1, unit: "per video" }, 
    { id: "addon_3", name: "Acoustic Layers", description: "Premium background frequency integration", price: 0.5, unit: "per video" }, 
    { id: "addon_4", name: "Archive Sterilization", description: "Remove all brand watermarks permanently", price: 3, unit: "per month" }, 
    { id: "addon_5", name: "Commercial Protocol", description: "Full rights for external marketing deployment", price: 15, unit: "per month" } 
  ] 
};

// Formatters
const formatDate = (dateString) => dateString ? new Date(dateString).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "—";
const formatCurrency = (amount) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);

const PlanCard = ({ plan, isCurrentPlan, onSelect, isPopular }) => (
  <div className={cn(
    "relative group bg-white border border-gray-100 p-8 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden flex flex-col justify-between min-h-[480px]",
    isCurrentPlan && "ring-2 ring-black bg-yellow-50/10"
  )}>
    <div>
      <div className="flex justify-between items-start mb-8">
        <div>
          <h3 className="text-2xl font-black text-black tracking-tighter uppercase">{plan.name}</h3>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">{plan.credits} Deployment Units</p>
        </div>
        {isPopular && (
          <span className="bg-black text-yellow-400 px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] shadow-lg">
            Recommended
          </span>
        )}
      </div>

      <div className="mb-8">
        <div className="flex flex-col gap-1">
          <span className="text-5xl font-black text-black leading-none">${plan.price}.00</span>
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">/ Month</span>
        </div>
      </div>

      <ul className="space-y-4 mb-8">
        {plan.features.map((feature, i) => (
          <li key={i} className="flex items-start gap-3 text-[10px] font-black text-black uppercase tracking-[0.2em]">
            <HiCheckCircle className="w-4 h-4 text-yellow-400 shrink-0" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </div>

    <Button 
      variant={isCurrentPlan ? "black" : "primary"} 
      className="w-full" 
      disabled={isCurrentPlan}
      onClick={() => onSelect(plan)}
    >
      {isCurrentPlan ? "Active Protocol" : "Initialize Upgrade"}
    </Button>
    <AnimatedLine className="absolute bottom-0 left-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity" />
  </div>
);

const UsageStatCard = ({ icon: Icon, label, value, trend, colorClass = "text-black" }) => {
  const trendColors = trend >= 0 ? "text-green-600" : "text-red-600";
  return (
    <div className="bg-white border border-gray-100 p-8 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 relative flex flex-col justify-between min-h-[180px] group overflow-hidden">
      <div className="flex justify-between items-start mb-4 relative z-10">
        <p className="text-xs font-black uppercase tracking-[0.2em] opacity-40 text-black">{label}</p>
        <Icon className={cn("w-6 h-6 group-hover:text-yellow-400 transition-colors", colorClass)} />
      </div>
      <div className="flex items-end justify-between relative z-10">
        <p className="text-5xl font-black tracking-tighter text-black">{value}</p>
        {trend && (
           <div className={cn("flex items-center gap-1 text-[10px] font-black uppercase tracking-widest", trendColors)}>
              <HiTrendingUp className={cn("w-3 h-3", trend < 0 && "rotate-180")} />
              {Math.abs(trend)}%
           </div>
        )}
      </div>
      <AnimatedLine className="absolute bottom-0 left-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  );
};

export default function BillingPage() {
  const { user } = useAuthStore();
  const [billingData, setBillingData] = useState(mockBillingData);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 800);
  }, []);

  const SUBSCRIPTION_PLANS = [
    { id: "starter", name: "Starter", price: 19, credits: 25, popular: false, features: ["25 Deployment Units", "1080P HD Rendering", "Core Templates", "System Support"] },
    { id: "creator", name: "Creator", price: 39, credits: 70, popular: true, features: ["70 Deployment Units", "4K Ultra HD Rendering", "Premium Template Suite", "Priority Sync", "Sterilized Archives"] },
    { id: "pro", name: "Pro", price: 79, credits: 150, popular: false, features: ["150 Deployment Units", "4K Cinematic Pipeline", "Full Asset Library", "Commercial Protocol", "API Command Access"] },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f9f9f7] p-12 flex items-center justify-center">
        <LoadingSpinner text="FETCHING PROTOCOL DATA..." />
      </div>
    );
  }

  const currentPlan = SUBSCRIPTION_PLANS.find(p => p.id === billingData.subscription.plan);
  const creditsPercentage = (billingData.credits.used / billingData.credits.total) * 100;
  
  const tabs = [ 
    { id: "overview", label: "Overview", icon: HiChartBar }, 
    { id: "plans", label: "Protocols", icon: HiTemplate }, 
    { id: "payment", label: "Credentials", icon: HiCreditCard }, 
    { id: "invoices", label: "Archives", icon: HiReceiptTax }, 
    { id: "addons", label: "Injections", icon: HiPlus } 
  ];

  return (
    <div className="min-h-screen bg-[#f9f9f7] text-black font-['Plus_Jakarta_Sans',sans-serif] p-6 lg:p-12 overflow-x-hidden">
      <Helmet><title>Protocol Management - Loomo AI</title></Helmet>
      
      {/* Hero Section */}
      <div className="mb-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-block mb-6"
        >
          <span className="bg-yellow-400 text-black font-black text-[10px] uppercase tracking-[0.2em] px-4 py-2">
            Operational Billing
          </span>
        </motion.div>
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-black text-black tracking-tighter leading-none mb-4 uppercase"
            >
              Manage Protocol,<br /><span className="text-gray-300">Subscription</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-gray-500 max-w-xl leading-relaxed font-medium"
            >
              Control your rendering resources and archival deployments with high-precision instruments.
            </motion.p>
          </div>
          
          <motion.div
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ delay: 0.3 }}
             className="flex gap-4"
          >
             <div className="flex flex-col items-end gap-1 px-6 border-r border-gray-200">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Usage Velocity</span>
                <span className="text-2xl font-black text-black tracking-tight">{Math.round(creditsPercentage)}%</span>
             </div>
             <div className="flex flex-col items-end gap-1 px-6">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Active Tier</span>
                <span className="text-2xl font-black text-black tracking-tight uppercase">{currentPlan?.name}</span>
             </div>
          </motion.div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        <div className="bg-black text-white p-8 relative shadow-2xl group overflow-hidden min-h-[180px] flex flex-col justify-between">
           <div className="flex justify-between items-start relative z-10">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-white/40">Remaining Units</p>
              <HiLightningBolt className="w-6 h-6 text-yellow-400" />
           </div>
           <div>
              <p className="text-5xl font-black tracking-tighter text-yellow-400 leading-none mb-2">{billingData.credits.remaining}</p>
              <div className="w-full h-1 bg-white/10 mt-4 relative overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }} 
                  animate={{ width: `${100 - creditsPercentage}%` }} 
                  className="absolute inset-0 bg-yellow-400" 
                />
              </div>
           </div>
           <AnimatedLine className="absolute bottom-0 left-0 right-0 group-hover:bg-yellow-400/20" />
        </div>

        <UsageStatCard label="Monthly Outputs" value={billingData.usage.thisMonth.videosGenerated} icon={HiVideoCamera} trend={12} />
        <UsageStatCard label="Storage Index" value={`${billingData.usage.thisMonth.storageUsed}GB`} icon={HiCloud} colorClass="text-gray-400" />
        <UsageStatCard label="Next Sync" value={formatDate(billingData.subscription.nextBillingDate).split(",")[0]} icon={HiCalendar} colorClass="text-black" />
      </div>

      {/* Configuration Tabs */}
      <div className="flex overflow-x-auto bg-white border border-gray-100 p-2 mb-12 shadow-sm hide-scrollbar">
         {tabs.map(tab => (
           <button 
             key={tab.id}
             onClick={() => setActiveTab(tab.id)}
             className={cn(
               "flex-1 flex items-center justify-center gap-4 py-6 px-8 uppercase text-[10px] font-black tracking-[0.2em] transition-all whitespace-nowrap",
               activeTab === tab.id ? "bg-black text-white shadow-xl" : "text-gray-400 hover:text-black hover:bg-gray-50"
             )}
           >
             <tab.icon className="w-4 h-4 shrink-0" />
             {tab.label}
           </button>
         ))}
      </div>

      {/* Content Area - Bento Style */}
      <AnimatePresence mode="wait">
         <motion.div 
           key={activeTab}
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           exit={{ opacity: 0, y: -20 }}
           transition={{ duration: 0.4 }}
           className="min-h-[400px]"
         >
           {activeTab === "overview" && (
              <div className="grid lg:grid-cols-3 gap-8">
                 <div className="lg:col-span-1 space-y-6">
                    <div className="flex items-center gap-4 mb-2">
                       <h2 className="text-xl font-black tracking-tight uppercase text-black">Quick Actions</h2>
                       <div className="h-[1px] bg-gray-200 flex-1" />
                    </div>
                    
                    <button onClick={() => setActiveTab("plans")} className="w-full block group text-left">
                       <div className="bg-white p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all">
                          <div className="w-12 h-12 bg-yellow-400 flex items-center justify-center mb-6">
                             <HiArrowUp className="w-6 h-6 text-black" />
                          </div>
                          <h3 className="text-xl font-black mb-2 tracking-tight group-hover:text-yellow-600 transition-colors">
                             Upgrade Protocol
                          </h3>
                          <p className="text-gray-500 text-sm leading-relaxed mb-6">
                             Expand your rendering capacity and unlock enterprise features.
                          </p>
                          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest group-hover:gap-4 transition-all">
                             View Options <HiArrowRight />
                          </div>
                       </div>
                    </button>

                    <button onClick={() => setShowCancelModal(true)} className="w-full text-left group">
                       <div className="bg-white p-6 border border-gray-100 shadow-sm hover:shadow-lg transition-all h-full">
                          <HiXCircle className="w-8 h-8 text-black mb-4 group-hover:text-red-600 transition-colors" />
                          <p className="font-black text-[10px] uppercase tracking-widest">Suspend Subscription</p>
                       </div>
                    </button>
                 </div>

                 <div className="lg:col-span-2 space-y-8">
                    <div className="flex items-center gap-4 mb-2">
                       <h2 className="text-xl font-black tracking-tight uppercase text-black">Sync Configuration</h2>
                       <div className="h-[1px] bg-gray-200 flex-1" />
                    </div>
                    
                    <div className="bg-white border border-gray-100 p-12 shadow-sm relative group overflow-hidden">
                       <div className="grid grid-cols-2 md:grid-cols-3 gap-12 relative z-10 font-['Plus_Jakarta_Sans',sans-serif]">
                          <div>
                             <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">Identifier</span>
                             <span className="text-lg font-black tracking-tight uppercase text-black">#{billingData.subscription.plan}</span>
                          </div>
                          <div>
                             <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">Cycle Rate</span>
                             <span className="text-lg font-black tracking-tight text-black">{formatCurrency(billingData.subscription.amount)}/mo</span>
                          </div>
                          <div>
                             <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">Operational Status</span>
                             <StatusBadge status="active" />
                          </div>
                          <div>
                             <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">Protocol Units</span>
                             <span className="text-lg font-black tracking-tight text-black">{currentPlan?.credits} Total</span>
                          </div>
                          <div>
                             <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">Unit Efficiency</span>
                             <span className="text-lg font-black tracking-tight text-black">High Velocity</span>
                          </div>
                          <div>
                             <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">Next Billing Sync</span>
                             <span className="text-lg font-black tracking-tight text-black">{formatDate(billingData.subscription.nextBillingDate)}</span>
                          </div>
                       </div>
                       <AnimatedLine className="absolute bottom-0 left-0 right-0" />
                    </div>

                    <div className="bg-black text-white p-12 relative overflow-hidden group">
                       <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
                          <div className="max-w-md">
                             <h3 className="text-3xl font-black tracking-tighter uppercase text-yellow-400 mb-2">Auto-Refill Units</h3>
                             <p className="text-white/40 text-xs font-black uppercase tracking-widest leading-relaxed">Never stall your pipeline. Synchronize automatic unit injections when your reserve falls below threshold.</p>
                          </div>
                          <Button variant="primary" className="bg-white text-black hover:bg-yellow-400 min-w-[200px]">Configure Link <HiSparkles /></Button>
                       </div>
                       <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/5 to-transparent skew-x-12 translate-x-32 group-hover:translate-x-12 transition-transform duration-1000" />
                       <AnimatedLine className="absolute bottom-0 left-0 right-0 opacity-20" />
                    </div>
                 </div>
              </div>
           )}

           {activeTab === "plans" && (
              <div className="space-y-12">
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {SUBSCRIPTION_PLANS.map(plan => (
                      <PlanCard 
                        key={plan.id} 
                        plan={plan} 
                        isCurrentPlan={plan.id === billingData.subscription.plan} 
                        isPopular={plan.popular} 
                        onSelect={(p) => { setSelectedPlan(p); setShowUpgradeModal(true); }} 
                      />
                    ))}
                 </div>
                 
                 <div className="bg-white border border-gray-100 p-12 text-center group relative overflow-hidden">
                    <HiCube className="w-12 h-12 text-gray-200 mx-auto mb-6 group-hover:text-yellow-400 transition-colors duration-500" />
                    <h4 className="text-2xl font-black text-black tracking-tighter uppercase mb-2">Custom Grid Architecture</h4>
                    <p className="text-gray-400 text-sm font-medium max-w-lg mx-auto mb-8">Need massive organizational throughput? We design custom deployment pipelines for high-velocity teams.</p>
                    <button className="text-[10px] font-black uppercase tracking-[0.2em] border-b-2 border-yellow-400 pb-1 hover:text-yellow-600 transition-all">Initialize Enterprise Sync</button>
                    <AnimatedLine className="absolute bottom-0 left-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                 </div>
              </div>
           )}

           {activeTab === "payment" && (
              <div className="bg-white border border-gray-100 shadow-sm overflow-hidden">
                 <div className="p-10 border-b border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div>
                       <h3 className="text-2xl font-black tracking-tighter uppercase text-black">Sync Credentials</h3>
                       <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">Operational Financial Gateways</p>
                    </div>
                    <Button variant="primary">Integrate Credential <HiPlus /></Button>
                 </div>
                 <div className="divide-y divide-gray-100">
                    {billingData.paymentMethods.map(method => (
                      <div key={method.id} className="p-10 flex flex-col md:flex-row items-center justify-between gap-8 hover:bg-gray-50 transition-all group">
                         <div className="flex items-center gap-10 flex-1">
                            <div className={cn(
                              "w-16 h-10 flex items-center justify-center font-black text-[10px] border uppercase transition-all",
                              method.isDefault ? "bg-black text-white border-black" : "bg-white text-black border-gray-200 group-hover:border-black"
                            )}>
                               {method.brand}
                            </div>
                            <div className="flex-1">
                               <div className="flex flex-wrap items-center gap-4">
                                  <span className="text-lg font-black uppercase tracking-tighter text-black">•••• {method.last4}</span>
                                  {method.isDefault && <StatusBadge status="active" />}
                               </div>
                               <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">Expiry Sync: {method.expiryMonth}/{method.expiryYear}</p>
                            </div>
                         </div>
                         <div className="flex items-center gap-4">
                            {!method.isDefault && <button className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-black transition-colors">Set Primary</button>}
                            <button className="p-4 hover:bg-black hover:text-white transition-all text-gray-400">
                               <HiDotsVertical className="w-5 h-5" />
                            </button>
                         </div>
                      </div>
                    ))}
                 </div>
              </div>
           )}

           {activeTab === "invoices" && (
              <div className="bg-white border border-gray-100 shadow-sm overflow-hidden">
                 <div className="p-10 border-b border-gray-100 flex justify-between items-center">
                    <h2 className="text-xl font-black uppercase tracking-tight text-black">Archival Ledger</h2>
                    <button className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-black transition-colors">Export Record →</button>
                 </div>
                 <div className="overflow-x-auto">
                    <table className="w-full text-left font-['Plus_Jakarta_Sans',sans-serif]">
                       <thead className="bg-[#f9f9f7] border-b border-gray-100 text-[10px] font-black text-black uppercase tracking-[0.2em]">
                          <tr>
                             <th className="px-10 py-6">ID</th>
                             <th className="px-10 py-6">Timestamp</th>
                             <th className="px-10 py-6">Asset Desc</th>
                             <th className="px-10 py-6">Payload</th>
                             <th className="px-10 py-6">Operational Status</th>
                             <th className="px-10 py-6 text-right">Records</th>
                          </tr>
                       </thead>
                       <tbody className="divide-y divide-gray-100">
                          {billingData.invoices.map(invoice => (
                            <tr key={invoice.id} className="group hover:bg-gray-50 transition-colors">
                               <td className="px-10 py-8 text-[10px] font-black text-black">#{invoice.id}</td>
                               <td className="px-10 py-8 text-[10px] font-black text-gray-400">{formatDate(invoice.date)}</td>
                               <td className="px-10 py-8 text-[10px] font-black text-black uppercase tracking-tight">{invoice.description}</td>
                               <td className="px-10 py-8 text-[10px] font-black text-black">{formatCurrency(invoice.amount)}</td>
                               <td className="px-10 py-8"><StatusBadge status="paid" /></td>
                               <td className="px-10 py-8 text-right">
                                  <button className="w-12 h-12 bg-gray-50 flex items-center justify-center mx-auto group-hover:bg-black group-hover:text-white transition-all">
                                     <HiDownload className="w-5 h-5" />
                                  </button>
                               </td>
                            </tr>
                          ))}
                       </tbody>
                    </table>
                 </div>
              </div>
           )}

           {activeTab === "addons" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                 {billingData.addOns.map(addon => (
                   <div key={addon.id} className="bg-white border border-gray-100 p-10 relative group hover:border-black transition-all flex flex-col justify-between min-h-[320px]">
                      <div>
                        <div className="w-12 h-12 bg-black text-white flex items-center justify-center mb-8 group-hover:bg-yellow-400 group-hover:text-black transition-colors">
                           <HiPlus className="w-6 h-6" />
                        </div>
                        <h4 className="text-xl font-black tracking-tighter uppercase text-black mb-2">{addon.name}</h4>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-relaxed">{addon.description}</p>
                      </div>
                      
                      <div className="mt-12 flex items-center justify-between">
                         {addon.options ? (
                            <div className="flex gap-2">
                               {addon.options.slice(0, 3).map((opt, i) => (
                                 <button key={i} className="px-4 py-2 border border-gray-100 text-[8px] font-black uppercase tracking-widest hover:border-black hover:bg-yellow-400 hover:text-black transition-all">
                                    {opt.credits}u
                                 </button>
                               ))}
                            </div>
                         ) : (
                            <div className="flex items-baseline gap-1">
                               <span className="text-2xl font-black text-black leading-none">${addon.price}</span>
                               <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest">/ {addon.unit}</span>
                            </div>
                         )}
                         <Button variant="black" className="px-6 py-3 h-auto">Inject</Button>
                      </div>
                      <AnimatedLine className="absolute bottom-0 left-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                   </div>
                 ))}
              </div>
           )}
         </motion.div>
      </AnimatePresence>

      {/* Modals */}
      <AnimatePresence>
        {showUpgradeModal && (
          <Modal title="Initialize Sync" size="md" isOpen={showUpgradeModal} onClose={() => setShowUpgradeModal(false)}>
            <div className="text-center py-8">
               <div className="w-20 h-20 bg-yellow-400 text-black flex items-center justify-center mx-auto mb-8 shadow-2xl">
                  <HiArrowUp className="w-10 h-10" />
               </div>
               <h3 className="text-3xl font-black tracking-tighter uppercase text-black mb-4">Switch to {selectedPlan?.name} protocol?</h3>
               <p className="text-sm font-medium text-gray-400 uppercase tracking-widest leading-relaxed max-w-sm mx-auto mb-12">Immediate account architecture reconfiguration required. All remaining credits will be synchronized.</p>
               <div className="flex gap-4">
                  <Button variant="secondary" className="flex-1" onClick={() => setShowUpgradeModal(false)}>Abort Change</Button>
                  <Button variant="primary" className="flex-1" onClick={() => { setBillingData(p => ({ ...p, subscription: { ...p.subscription, plan: selectedPlan.id } })); setShowUpgradeModal(false); }}>Confirm Sync</Button>
               </div>
            </div>
          </Modal>
        )}

        {showCancelModal && (
          <Modal title="Critical Warning" size="sm" isOpen={showCancelModal} onClose={() => setShowCancelModal(false)}>
            <div className="text-center py-8">
               <div className="w-20 h-20 bg-red-50 text-red-600 border border-red-100 flex items-center justify-center mx-auto mb-8 shadow-xl">
                  <HiExclamationCircle className="w-10 h-10" />
               </div>
               <h3 className="text-2xl font-black tracking-tighter uppercase text-black mb-4">Decommission Protocol?</h3>
               <p className="text-xs font-black text-gray-400 uppercase tracking-widest leading-relaxed mb-12">All advanced cinematic pipelines will be purged at the end of the current cycle.</p>
               <div className="flex gap-4">
                  <Button variant="secondary" className="flex-1" onClick={() => setShowCancelModal(false)}>Maintain</Button>
                  <Button variant="danger" className="flex-1 bg-red-600 text-white" onClick={() => setShowCancelModal(false)}>Suspend</Button>
               </div>
            </div>
          </Modal>
        )}
      </AnimatePresence>

      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
