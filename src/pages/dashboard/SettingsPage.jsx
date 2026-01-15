
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiUser, HiLockClosed, HiBell, HiCog, HiColorSwatch, HiShieldCheck,
  HiCamera, HiPencil, HiCheck, HiX, HiEye, HiEyeOff, HiExclamationCircle,
  HiTrash, HiDownload, HiLogout, HiGlobe, HiMail, HiDeviceMobile,
  HiArrowRight, HiShieldExclamation, HiBadgeCheck, HiKey, HiSelector
} from "react-icons/hi";
import { cn } from "@utils/cn";
import {
  validateEmail,
  validatePassword,
  getPasswordStrength,
} from "@utils/validators";

// Custom UI Components matching the Loomo design system
const AnimatedLine = ({ className = "" }) => (
  <div className={`h-[1px] bg-black/5 overflow-hidden ${className}`}>
    <motion.div
      className="w-1/3 h-full"
      style={{ backgroundColor: '#E7F014' }}
      animate={{ x: ["-100%", "300%"] }}
      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
    />
  </div>
);

const Button = ({ children, className = "", variant = "primary", ...props }) => {
  const variants = {
    primary: "bg-[#E7F014] text-black hover:opacity-90 shadow-xl hover:-translate-y-0.5 transition-all duration-300 font-bold disabled:opacity-50",
    secondary: "bg-white border border-black/10 shadow-sm hover:shadow-lg transition-all duration-300 text-black font-bold",
    ghost: "bg-black/5 hover:bg-black/10 text-black opacity-40 hover:opacity-100 transition-all font-bold",
    accent: "bg-[#E7F014]/20 text-black hover:bg-[#E7F014] transition-all font-bold",
    danger: "bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-all font-bold group",
    outline: "border-2 border-black/10 text-black hover:border-[#E7F014] hover:bg-[#E7F014]/5 transition-all font-bold"
  };
  return (
    <button className={cn("px-6 py-3 flex items-center justify-center gap-3 uppercase text-xs tracking-[0.2em] rounded-none", variants[variant], className)} {...props}>
      {children}
    </button>
  );
};

const Modal = ({ isOpen, onClose, title, children, size = "md" }) => {
  if (!isOpen) return null;
  const sizes = { sm: "max-w-md", md: "max-w-2xl", lg: "max-w-4xl", xl: "max-w-6xl" };
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#F2F2ED]/90 backdrop-blur-md" onClick={onClose}>
      <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className={cn("bg-white w-full border border-black/5 shadow-2xl relative overflow-hidden rounded-none", sizes[size])} onClick={(e) => e.stopPropagation()}>
        <div className="p-8 border-b border-black/5 flex items-center justify-between">
          <h2 className="text-xl font-bold text-black">{title}</h2>
          <button onClick={onClose} className="p-2 hover:bg-black/5 transition-colors text-black/40 hover:text-black rounded-none"><HiX className="w-6 h-6" /></button>
        </div>
        <div className="p-8">{children}</div>
        <AnimatedLine className="absolute bottom-0 left-0 right-0" />
      </motion.div>
    </div>
  );
};

const Toggle = ({ enabled, onChange, label, description }) => (
  <div className="flex items-center justify-between py-6 group">
    <div>
      <p className="text-xs font-black text-black uppercase tracking-widest">{label}</p>
      {description && (
        <p className="text-xs font-medium text-black opacity-40 uppercase tracking-widest mt-1">{description}</p>
      )}
    </div>
    <button
      onClick={() => onChange(!enabled)}
      className={cn(
        "relative inline-flex h-6 w-11 items-center transition-all duration-300 rounded-none",
        enabled ? "bg-[#E7F014]" : "bg-black/10"
      )}
    >
      <span
        className={cn(
          "inline-block h-4 w-4 transform transition-transform duration-300 rounded-none",
          enabled ? "translate-x-6 bg-black" : "translate-x-1 bg-white"
        )}
      />
    </button>
  </div>
);

// Mock user data
const mockUser = {
  id: "user_123",
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
  avatar: null,
  phone: "+1 (555) 123-4567",
  company: "Loomo Systems",
  role: "Elite Protocol Member",
  timezone: "America/New_York",
  language: "en",
  createdAt: "2023-06-15T10:30:00Z",
  twoFactorEnabled: false,
  emailVerified: true,
  notifications: {
    email: { projectComplete: true, projectFailed: true, weeklyReport: false, marketing: false },
    push: { projectComplete: true, projectFailed: true }
  },
  preferences: {
    defaultTemplate: "cinematic",
    defaultQuality: "1080p",
    defaultAspectRatio: "16:9",
    autoDownload: false,
    darkMode: true
  },
  sessions: [
    { id: 1, device: "Chrome Terminal v122", location: "Sector 7, NY", lastActive: "2024-01-15T10:30:00Z", current: true },
    { id: 2, device: "Mobile Uplink v18", location: "Sector 7, NY", lastActive: "2024-01-14T18:20:00Z", current: false }
  ]
};

export default function SettingsPage() {
  const [user, setUser] = useState(mockUser);
  const [activeTab, setActiveTab] = useState("profile");
  const [isLoading, setIsLoading] = useState(true);

  // Profile Tab state
  const [profileData, setProfileData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone,
    company: user.company
  });
  const [isSaving, setIsSaving] = useState(false);

  // Security Tab state
  const [passwordData, setPasswordData] = useState({ current: "", new: "", confirm: "" });
  const [showPassModal, setShowPassModal] = useState(false);
  const [showDelModal, setShowDelModal] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 800);
  }, []);

  const tabs = [
    { id: "profile", label: "Identity", icon: HiUser },
    { id: "security", label: "Encryption", icon: HiLockClosed },
    { id: "notifications", label: "Transmissions", icon: HiBell },
    { id: "preferences", label: "Parameters", icon: HiCog }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F2F2ED] p-12" style={{ fontFamily: "'Neue Montreal', sans-serif" }}>
        <div className="max-w-7xl mx-auto animate-pulse">
           <div className="h-20 bg-black/5 w-1/3 mb-12 rounded-none" />
           <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <div className="lg:col-span-1 space-y-4">
                 {[...Array(4)].map((_, i) => <div key={i} className="h-16 bg-black/5 rounded-none" />)}
              </div>
              <div className="lg:col-span-3 h-96 bg-black/5 rounded-none" />
           </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F2F2ED] text-black p-6 lg:p-12" style={{ fontFamily: "'Neue Montreal', sans-serif" }}>
      <Helmet><title>System Settings - VideoGen AI</title></Helmet>

      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20 pb-12 border-b border-black/5">
           <div>
               <div className="flex items-center gap-4 mb-4">
                  <span className="text-black px-4 py-2 text-xs font-black uppercase tracking-[0.2em] rounded-none" style={{ backgroundColor: '#E7F014' }}>Core Configuration</span>
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-black opacity-40">User Hub v1.0</span>
               </div>
                <h1 className="text-4xl md:text-6xl font-bold text-black leading-tight">
                  Identity <span className="opacity-40">&amp; Access</span>
                </h1>
           </div>
           <div className="flex flex-col items-end gap-1">
               <span className="text-xs font-bold text-black opacity-40 uppercase tracking-widest">Node Status</span>
               <span className="text-black px-4 py-1 text-xs font-bold uppercase tracking-widest rounded-none" style={{ backgroundColor: '#E7F014' }}>Active Protocol</span>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
             <div className="bg-white border border-black/5 p-2 shadow-sm sticky top-12 rounded-none">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "w-full flex items-center gap-4 py-6 px-8 uppercase text-xs font-black tracking-widest transition-all duration-300 rounded-none",
                      activeTab === tab.id ? "bg-[#E7F014] text-black shadow-lg" : "text-black opacity-40 hover:text-black hover:bg-black/5"
                    )}
                  >
                    <tab.icon className={cn("w-5 h-5", activeTab === tab.id ? "text-black" : "text-black/40")} />
                    {tab.label}
                  </button>
                ))}
             </div>
          </div>

          {/* Configuration Panels */}
          <div className="lg:col-span-3">
             <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-12"
                >
                  {activeTab === "profile" && (
                    <>
                      {/* Avatar Control */}
                      <div className="bg-white border border-black/5 p-12 relative group overflow-hidden rounded-none">
                         <div className="flex items-center gap-10">
                            <div className="relative group">
                               <div className="w-32 h-32 bg-[#E7F014] flex items-center justify-center text-4xl font-bold text-black tracking-tighter shadow-2xl rounded-none">
                                  {user.firstName[0]}{user.lastName[0]}
                               </div>
                               <button className="absolute -bottom-2 -right-2 bg-white border border-black/5 p-3 shadow-xl hover:bg-[#E7F014] transition-all rounded-none">
                                  <HiCamera className="w-5 h-5 text-black" />
                               </button>
                            </div>
                            <div>
                               <h3 className="text-3xl font-bold">{user.firstName} {user.lastName}</h3>
                               <p className="text-xs font-bold text-black opacity-40 uppercase tracking-widest mt-1">{user.role}</p>
                               <div className="flex items-center gap-3 mt-4">
                                  <span className="bg-green-100 text-green-700 px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-none">Identity Verified</span>
                                  <span className="text-[10px] font-bold text-black opacity-40 uppercase tracking-widest">Active since June '23</span>
                                </div>
                            </div>
                         </div>
                         <AnimatedLine className="absolute bottom-0 left-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>

                      {/* Personal Parameters */}
                      <div className="bg-white border border-black/5 p-12 rounded-none">
                         <h3 className="text-xl font-bold mb-10 pb-4 border-b border-black/5">Identity Parameters</h3>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            {[
                               { label: "Given Name", name: "firstName", value: profileData.firstName },
                               { label: "Family Name", name: "lastName", value: profileData.lastName },
                               { label: "Transmission Email", name: "email", value: profileData.email, disabled: true },
                               { label: "Phone Uplink", name: "phone", value: profileData.phone },
                               { label: "Organization", name: "company", value: profileData.company }
                            ].map((input) => (
                              <div key={input.name} className="space-y-2 group">
                                 <label className="text-xs font-black text-black opacity-40 uppercase tracking-widest">{input.label}</label>
                                 <div className="relative">
                                    <input
                                      type="text"
                                      disabled={input.disabled}
                                      value={input.value}
                                      className={cn(
                                        "w-full bg-[#f9f9f7] border-0 p-4 text-xs font-bold uppercase tracking-widest outline-none focus:ring-1 focus:ring-[#E7F014] transition-all text-black rounded-none",
                                        input.disabled && "opacity-50 cursor-not-allowed"
                                      )}
                                    />
                                    <div className="absolute bottom-0 left-0 h-[1px] bg-[#E7F014] w-0 group-hover:w-full transition-all duration-500" />
                                 </div>
                              </div>
                            ))}
                         </div>
                         <div className="mt-12 pt-10 border-t border-black/5 flex gap-4">
                            <Button className="h-14">Synchronize Identity</Button>
                            <Button variant="secondary" className="h-14">Revert Sync</Button>
                         </div>
                      </div>

                      {/* Regional Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                         <div className="bg-white border border-black/5 p-10 hover:border-black/20 transition-all rounded-none">
                            <div className="flex items-center gap-4 mb-10">
                               <div className="p-3 bg-[#E7F014] text-black rounded-none"><HiGlobe className="w-5 h-5" /></div>
                               <h4 className="text-xs font-black uppercase tracking-widest">Chronometry Sync</h4>
                            </div>
                            <div className="relative group">
                               <select className="w-full bg-[#f9f9f7] border-0 p-4 text-xs font-black uppercase tracking-widest outline-none appearance-none text-black rounded-none">
                                  <option>America/New_York (UTC-5)</option>
                                  <option>Europe/London (UTC+0)</option>
                                  <option>Asia/Tokyo (UTC+9)</option>
                               </select>
                               <HiSelector className="absolute right-4 top-1/2 -translate-y-1/2 text-black opacity-30 group-hover:text-black transition-colors" />
                            </div>
                         </div>
                         <div className="bg-white border border-black/5 p-10 hover:border-black/20 transition-all rounded-none">
                            <div className="flex items-center gap-4 mb-10">
                               <div className="p-3 bg-[#E7F014] text-black rounded-none"><HiMail className="w-5 h-5" /></div>
                               <h4 className="text-xs font-black uppercase tracking-widest">Dialect Matrix</h4>
                            </div>
                            <div className="relative group">
                               <select className="w-full bg-[#f9f9f7] border-0 p-4 text-xs font-black uppercase tracking-widest outline-none appearance-none text-black rounded-none">
                                  <option>English (US Alpha)</option>
                                  <option>German (DE Beta)</option>
                                  <option>Spanish (ES Gamma)</option>
                               </select>
                               <HiSelector className="absolute right-4 top-1/2 -translate-y-1/2 text-black opacity-30 group-hover:text-black transition-colors" />
                            </div>
                         </div>
                      </div>
                    </>
                  )}

                  {activeTab === "security" && (
                    <>
                      {/* Encryption Status */}
                       <div className="bg-white border border-black/5 p-12 relative overflow-hidden group shadow-lg rounded-none">
                          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10">
                             <div className="max-w-md">
                                <div className="flex items-center gap-3 mb-6">
                                   <div className="w-10 h-10 bg-[#E7F014] text-black flex items-center justify-center rounded-none">
                                      <HiShieldCheck className="w-6 h-6" />
                                   </div>
                                    <span className="text-xs font-bold uppercase tracking-[0.25em] text-black opacity-40">Encryption Active</span>
                                </div>
                                <h3 className="text-3xl font-bold text-black">Access Protocols</h3>
                                <p className="text-black opacity-40 text-xs font-black uppercase tracking-widest mt-4 leading-relaxed">System security is maintained through recursive encryption cycles. Regular key rotation recommended.</p>
                             </div>
                             <Button className="h-16 px-10" onClick={() => setShowPassModal(true)}>Rotate Access Keys</Button>
                          </div>
                          <AnimatedLine className="absolute bottom-0 left-0 right-0" />
                       </div>

                       {/* 2FA & Sessions */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                         <div className="bg-white border border-black/5 p-10 relative group rounded-none">
                            <div className="flex justify-between items-start mb-10">
                               <div className="p-4 bg-[#E7F014]/10 text-black opacity-40 group-hover:bg-[#E7F014] group-hover:text-black group-hover:opacity-100 transition-all rounded-none">
                                  <HiShieldExclamation className="w-6 h-6" />
                                </div>
                                <span className="bg-red-50 text-red-600 px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-none">Disabled</span>
                            </div>
                            <h4 className="text-xs font-black uppercase tracking-widest mb-2">Dual-Channel Sync</h4>
                            <p className="text-xs font-medium text-black opacity-40 uppercase mb-8">Synchronize secondary device for mission-critical authorization.</p>
                            <Button variant="outline" className="w-full text-[10px]">Enable Protocols</Button>
                            <AnimatedLine className="absolute bottom-0 left-0 right-0 opacity-0 group-hover:opacity-100" />
                         </div>
                         <div className="bg-white border border-black/5 p-10 relative group rounded-none">
                            <div className="flex justify-between items-start mb-10">
                               <div className="p-4 bg-[#E7F014]/10 text-black opacity-40 group-hover:bg-[#E7F014] group-hover:text-black group-hover:opacity-100 transition-all rounded-none">
                                  <HiDeviceMobile className="w-6 h-6" />
                                </div>
                                <span className="text-[10px] font-bold uppercase tracking-widest text-black/40">2 Active Links</span>
                            </div>
                            <h4 className="text-xs font-black uppercase tracking-widest mb-2">Terminal Access</h4>
                            <p className="text-xs font-medium text-black opacity-40 uppercase mb-8">Monitoring all authorized uplink points for suspicious activity.</p>
                            <Button variant="outline" className="w-full text-[10px]">Manage Sessions</Button>
                            <div className="absolute bottom-0 left-0 h-[1px] bg-[#E7F014] w-0 group-hover:w-full transition-all" />
                         </div>
                      </div>

                      {/* Decommission Zone */}
                      <div className="bg-red-50 border border-red-100 p-12 rounded-none">
                         <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
                            <div>
                               <h3 className="text-xl font-bold text-red-600 mb-2">Decommission Protocol</h3>
                               <p className="text-xs font-bold text-red-700/50 uppercase tracking-widest leading-relaxed">Permanent erasure of all identity data, archival assets, and system footprints. Irreversible action.</p>
                            </div>
                            <Button variant="danger" className="h-14 px-10" onClick={() => setShowDelModal(true)}>Execute Purge</Button>
                         </div>
                      </div>
                    </>
                  )}

                   {activeTab === "notifications" && (
                    <div className="space-y-8">
                       <div className="bg-white border border-black/5 p-12 rounded-none">
                          <h3 className="text-xl font-bold mb-10 pb-4 border-b border-black/5">Frequency Settings</h3>
                          <div className="space-y-2">
                             <Toggle label="Uplink Success" description="Signal injection when deployment reaches 100% completion." enabled={user.notifications.email.projectComplete} />
                             <div className="h-px bg-black/5" />
                             <Toggle label="Protocol Disruption" description="Critical alerts for system failure or generation timeouts." enabled={user.notifications.email.projectFailed} />
                             <div className="h-px bg-black/5" />
                             <Toggle label="Tactical Intelligence" description="Receive full sector analysis and weekly metrics report." enabled={user.notifications.email.weeklyReport} />
                             <div className="h-px bg-black/5" />
                             <Toggle label="Mission Updates" description="Inbound signals regarding core system evolution." enabled={user.notifications.email.marketing} />
                          </div>
                       </div>
                        <div className="bg-white border border-black/5 p-12 relative overflow-hidden group shadow-lg rounded-none">
                           <div className="flex items-center gap-10 relative z-10">
                              <div className="w-20 h-20 bg-[#E7F014] text-black flex items-center justify-center shadow-lg rounded-none">
                                 <HiBell className="w-8 h-8" />
                              </div>
                              <div>
                                 <h3 className="text-2xl font-bold text-black">Haptic Signals</h3>
                                 <p className="text-black opacity-40 text-xs font-bold uppercase tracking-widest mt-2 leading-relaxed">Tactile browser transmissions for low-latency operational awareness.</p>
                              </div>
                              <div className="ml-auto">
                                 <Button variant="secondary" className="h-12 uppercase text-[10px]">Request Authorization</Button>
                              </div>
                           </div>
                           <AnimatedLine className="absolute bottom-0 left-0 right-0" />
                        </div>
                    </div>
                  )}

                  {activeTab === "preferences" && (
                    <div className="space-y-8">
                       <div className="bg-white border border-black/5 p-12 rounded-none">
                          <h3 className="text-xl font-bold mb-10 pb-4 border-b border-black/5">Operational Defaults</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                             {[
                                { label: "Deployment Schema", options: ["Cinematic Pipeline", "Archive Direct", "Raw Extraction"] },
                                { label: "Output Density", options: ["Ultra HD 4K", "Standard 1080P", "Optimized Mobile"] },
                                { label: "Aspect Ratio", options: ["Widescreen 16:9", "Vertical 9:16", "Cinemascope 21:9"] }
                             ].map((select) => (
                                <div key={select.label} className="space-y-4">
                                   <label className="text-xs font-bold text-black opacity-40 uppercase tracking-widest">{select.label}</label>
                                   <div className="relative group">
                                      <select className="w-full bg-[#f9f9f7] border-0 p-5 text-xs font-bold uppercase tracking-widest outline-none appearance-none text-black rounded-none">
                                         {select.options.map(o => <option key={o}>{o}</option>)}
                                      </select>
                                      <HiSelector className="absolute right-5 top-1/2 -translate-y-1/2 text-black opacity-30 group-hover:text-black transition-colors" />
                                   </div>
                               </div>
                             ))}
                          </div>
                       </div>
                        <div className="bg-white border border-black/5 p-12 relative group shadow-sm rounded-none">
                           <div className="flex items-center justify-between">
                              <div className="max-w-md">
                                 <h4 className="text-xs font-bold uppercase tracking-widest mb-2 text-black">Automated Indexing</h4>
                                 <p className="text-xs font-medium text-black opacity-40 uppercase">Instantly synchronize local archives upon project finalization. Recommended for high-velocity workflows.</p>
                              </div>
                              <Toggle enabled={user.preferences.autoDownload} onChange={() => {}} />
                           </div>
                           <div className="h-px bg-black/5 my-8" />
                           <div className="flex items-center justify-between">
                              <div className="max-w-md">
                                 <h4 className="text-xs font-bold uppercase tracking-widest mb-2 text-black">Stealth Interface</h4>
                                 <p className="text-xs font-medium text-black opacity-40 uppercase">Low-luminance system skin for nocturnal operational focus.</p>
                              </div>
                              <Toggle enabled={user.preferences.darkMode} onChange={() => {}} />
                           </div>
                          <AnimatedLine className="absolute bottom-0 left-0 right-0 opacity-0 group-hover:opacity-100" />
                       </div>
                    </div>
                  )}
                </motion.div>
             </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Modals */}
      <AnimatePresence>
         {showPassModal && (
           <Modal isOpen={showPassModal} onClose={() => setShowPassModal(false)} title="Security Key Rotation" size="md">
              <div className="space-y-8 py-4">
                 <div className="grid grid-cols-1 gap-6">
                    <div>
                       <label className="text-xs font-black text-black opacity-40 uppercase tracking-widest block mb-2">Original Key</label>
                       <input type="password" placeholder="••••••••" className="w-full bg-[#f9f9f7] border-0 p-5 text-xs font-black uppercase tracking-widest outline-none focus:ring-1 focus:ring-black text-black rounded-none" />
                    </div>
                    <div>
                       <label className="text-xs font-black text-black opacity-40 uppercase tracking-widest block mb-2">New Access Frequency</label>
                       <input type="password" placeholder="••••••••" className="w-full bg-[#f9f9f7] border-0 p-5 text-xs font-black uppercase tracking-widest outline-none focus:ring-1 focus:ring-black text-black rounded-none" />
                    </div>
                    <div>
                       <label className="text-xs font-black text-black opacity-40 uppercase tracking-widest block mb-2">Confirm New Protocol</label>
                       <input type="password" placeholder="••••••••" className="w-full bg-[#f9f9f7] border-0 p-5 text-xs font-black uppercase tracking-widest outline-none focus:ring-1 focus:ring-black text-black rounded-none" />
                    </div>
                 </div>
                 <div className="flex gap-4 pt-4 border-t border-black/5">
                    <Button className="flex-1" onClick={() => setShowPassModal(false)}>Synchronize New Keys</Button>
                    <Button variant="secondary" className="px-10" onClick={() => setShowPassModal(false)}>Cancel</Button>
                 </div>
              </div>
           </Modal>
         )}

         {showDelModal && (
           <Modal isOpen={showDelModal} onClose={() => setShowDelModal(false)} title="De-authorization Required" size="sm">
              <div className="space-y-10 py-6 text-center">
                 <div className="w-20 h-20 bg-red-50 text-red-600 flex items-center justify-center mx-auto shadow-xl rounded-none">
                    <HiShieldExclamation className="w-10 h-10" />
                 </div>
                 <div>
                     <h3 className="text-2xl font-bold text-black">Terminate Identity?</h3>
                     <p className="text-xs font-bold text-black opacity-40 uppercase tracking-widest leading-relaxed mt-2 max-w-xs mx-auto">This will trigger a total system wipe. All archival assets and protocol parameters will be permanently lost.</p>
                 </div>
                 <div className="space-y-4">
                    <input type="text" placeholder="Type 'TERMINATE' to confirm" className="w-full bg-red-50/50 border border-red-100 p-5 text-center text-xs font-black uppercase tracking-[0.3em] outline-none focus:border-red-600 transition-all placeholder:text-red-300 text-black rounded-none" />
                    <div className="grid grid-cols-2 gap-4">
                       <Button variant="danger" className="bg-red-600 text-white hover:bg-black" onClick={() => setShowDelModal(false)}>Execute</Button>
                       <Button variant="secondary" onClick={() => setShowDelModal(false)}>Abort</Button>
                    </div>
                 </div>
              </div>
           </Modal>
         )}
      </AnimatePresence>
    </div>
  );
}
