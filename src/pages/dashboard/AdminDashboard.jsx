import { useState } from "react";
import { motion } from "framer-motion";
import { 
  HiUsers, HiLightningBolt, HiDatabase, HiClock, 
  HiAdjustments, HiSearch, HiDotsVertical, 
  HiArrowUp, HiArrowDown,
  HiCheckCircle, HiXCircle, HiShieldCheck, HiPlay,
  HiCube, HiTrendingUp, HiTrendingDown
} from "react-icons/hi";
import { Helmet } from "react-helmet-async";
import { cn } from "@utils/cn";

// Signature animated line
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

const Card = ({ children, className = "", ...props }) => (
  <div className={cn("bg-white border border-black/5 shadow-sm relative overflow-hidden group", className)} {...props}>
    {children}
  </div>
);

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('stats');

  const stats = [
    { label: "Total Users", value: "1,284", change: "+12%", trending: "up", icon: HiUsers },
    { label: "Active Jobs", value: "43", change: "2 ongoing", trending: "neutral", icon: HiLightningBolt },
    { label: "System Load", value: "24%", change: "-5%", trending: "down", icon: HiDatabase },
    { label: "Avg. Latency", value: "4.2m", change: "+0.3m", trending: "up", icon: HiClock },
  ];

  return (
    <div className="min-h-screen bg-[#F2F2ED] p-6 lg:p-12 text-black" style={{ fontFamily: "'Neue Montreal', sans-serif" }}>
      <Helmet><title>System Node | VideoGen AI</title></Helmet>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-black px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em]" style={{ backgroundColor: '#E7F014' }}>Restricted Access</span>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-black opacity-40">Admin Console v1.0.4</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-black leading-tight">
              System <span className="opacity-40">Control</span>
            </h1>
          </div>

          <div className="flex bg-white border border-black/5 shadow-sm overflow-hidden">
             {['stats', 'users', 'jobs'].map(tab => (
                <button
                   key={tab}
                   onClick={() => setActiveTab(tab)}
                   className={cn(
                      "px-8 py-3 text-[10px] font-black uppercase tracking-[0.2em] transition-all",
                      activeTab === tab ? "bg-[#E7F014] text-black" : "text-black opacity-40 hover:text-black hover:bg-black/5"
                   )}
                >
                   {tab}
                </button>
             ))}
          </div>
        </div>

        {/* Stats Grid */}
        {activeTab === 'stats' && (
           <div className="space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                 {stats.map((s, idx) => (
                    <motion.div 
                       key={idx}
                       initial={{ opacity: 0, y: 20 }}
                       animate={{ opacity: 1, y: 0 }}
                       transition={{ delay: idx * 0.1 }}
                    >
                       <Card className="p-8 hover:shadow-xl transition-all duration-500 min-h-[180px] flex flex-col justify-between">
                          <div className="flex items-center justify-between mb-8">
                             <div className="w-10 h-10 bg-black text-white flex items-center justify-center">
                                <s.icon className="w-5 h-5" />
                             </div>
                              <div className={cn(
                                 "flex items-center gap-1 text-[10px] font-black",
                                 s.trending === 'up' ? "text-green-500" : s.trending === 'down' ? "text-red-500" : "text-black opacity-40"
                              )}>
                                 {s.change}
                                 {s.trending === 'up' ? <HiTrendingUp /> : s.trending === 'down' ? <HiTrendingDown /> : null}
                              </div>
                          </div>
                           <div>
                             <span className="text-[10px] font-black uppercase tracking-widest text-black opacity-40 block mb-1">{s.label}</span>
                            <span className="text-4xl font-black tracking-tighter">{s.value}</span>
                          </div>
                          <AnimatedLine className="absolute bottom-0 left-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                       </Card>
                    </motion.div>
                 ))}
              </div>

               {/* System Performance */}
               <div className="bg-white border border-black/5 p-12 shadow-2xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-96 h-96 bg-[#E7F014]/10 blur-[120px] rounded-full" />
                  <div className="flex items-center justify-between mb-12 relative z-10">
                     <h3 className="text-2xl font-bold text-black">Queue <span className="opacity-40">Stream</span></h3>
                    <div className="flex gap-4">
                       <span className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-green-500">
                          <HiLightningBolt className="w-3 h-3 animate-pulse" /> Live Deployment
                       </span>
                    </div>
                 </div>
                 
                 <div className="h-48 flex items-end gap-2 px-4 relative z-10">
                    {[40, 65, 45, 90, 30, 70, 55, 85, 40, 60, 45, 75].map((h, i) => (
                       <motion.div 
                          key={i}
                          initial={{ height: 0 }}
                          animate={{ height: `${h}%` }}
                          transition={{ delay: i * 0.05, duration: 1 }}
                          className="flex-1 bg-gradient-to-t from-yellow-400 to-yellow-500 opacity-20 hover:opacity-100 transition-all cursor-pointer"
                       />
                    ))}
                 </div>
                 <AnimatedLine className="absolute bottom-0 left-0 right-0" />
              </div>
           </div>
        )}

         {/* Users Management */}
         {activeTab === 'users' && (
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               className="bg-white border border-black/5 shadow-sm overflow-hidden"
            >
               <div className="p-10 border-b border-black/5 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                     <h3 className="text-2xl font-bold text-black">User Directory</h3>
                     <p className="text-black opacity-40 text-[10px] font-black uppercase tracking-widest mt-1">Authorized access nodes</p>
                  </div>
                  <div className="relative">
                     <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-black opacity-20" size={18} />
                     <input 
                        placeholder="Filter by identifier..."
                        className="pl-12 pr-6 py-4 bg-[#f9f9f7] border border-black/5 rounded-none text-xs font-bold outline-none focus:border-[#E7F014] w-full md:w-80 transition-all text-black"
                     />
                  </div>
               </div>

               <div className="overflow-x-auto font-medium">
                  <table className="w-full">
                     <thead className="bg-[#f9f9f7]">
                        <tr>
                           {['Identifier', 'Auth Level', 'Status', 'Payload CR', 'Integrated', ''].map(h => (
                              <th key={h} className="px-10 py-6 text-left text-[10px] font-black uppercase tracking-widest text-black opacity-40 whitespace-nowrap">{h}</th>
                           ))}
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-black/5">
                        {[1, 2, 3, 4, 5].map(i => (
                           <tr key={i} className="hover:bg-black/5 transition-colors group relative">
                              <td className="px-10 py-8 whitespace-nowrap">
                                 <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-[#f9f9f7] group-hover:bg-[#E7F014] transition-colors flex items-center justify-center text-black opacity-20 group-hover:opacity-100 font-bold">U{i}</div>
                                    <div>
                                       <span className="block text-sm font-black text-black">user_{i}@deployment.com</span>
                                       <span className="text-[10px] font-bold text-black opacity-20 uppercase font-mono tracking-tighter">ID: 9283-920{i}</span>
                                    </div>
                                 </div>
                              </td>
                              <td className="px-10 py-8 whitespace-nowrap">
                                 <span className={cn(
                                    "px-3 py-1 text-[10px] font-black uppercase tracking-widest border",
                                    i === 1 ? "bg-black text-white border-black" : "bg-white text-black opacity-40 border-black/10"
                                 )}>
                                    {i === 1 ? 'ADMIN' : 'Standard'}
                                 </span>
                              </td>
                             <td className="px-10 py-8 whitespace-nowrap">
                                <div className="flex items-center gap-2">
                                   <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                                   <span className="text-[10px] font-black uppercase tracking-widest text-black opacity-40">Active</span>
                                </div>
                             </td>
                             <td className="px-10 py-8 whitespace-nowrap">
                                <span className="text-sm font-black text-black">{(Math.random() * 50).toFixed(1)} CR</span>
                             </td>
                              <td className="px-10 py-8 whitespace-nowrap">
                                 <span className="text-[10px] font-bold text-black opacity-40 uppercase tracking-widest font-mono">2023-10-24</span>
                              </td>
                              <td className="px-10 py-8 text-right whitespace-nowrap">
                                 <button className="p-2 transition-all text-black opacity-20 hover:text-black hover:opacity-100">
                                    <HiDotsVertical size={18} />
                                 </button>
                              </td>
                          </tr>
                       ))}
                    </tbody>
                 </table>
              </div>
              <AnimatedLine className="absolute bottom-0 left-0 right-0" />
           </motion.div>
        )}

        {/* Jobs Management */}
        {activeTab === 'jobs' && (
           <div className="space-y-4">
              {[1, 2, 3].map(i => (
                 <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                 >
                    <Card className="p-8 border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-8 group hover:border-yellow-400/50 transition-all">
                       <div className="flex items-center gap-6">
                          <div className="w-16 h-16 bg-black flex items-center justify-center relative shadow-xl overflow-hidden">
                             <div className="absolute inset-0 bg-yellow-400/10 flex items-center justify-center">
                                <HiPlay size={24} className="text-white opacity-20 group-hover:opacity-100 group-hover:text-yellow-400 transition-all" />
                             </div>
                          </div>
                           <div>
                              <h4 className="text-lg font-bold mb-1 text-black">Stream_00{i}.mp4</h4>
                              <div className="flex items-center gap-4">
                                 <span className="text-[10px] font-black uppercase tracking-widest text-black opacity-40 flex items-center gap-2">
                                    <HiUsers size={12} /> user_{i}@node.io
                                 </span>
                                 <span className="text-[10px] font-black uppercase tracking-widest text-black opacity-40 flex items-center gap-2">
                                    <HiClock size={12} /> 12:43:08
                                 </span>
                              </div>
                           </div>
                        </div>

                        <div className="flex-1 md:max-w-xs">
                           <div className="flex justify-between items-center mb-2">
                              <span className="text-[10px] font-black uppercase tracking-widest text-black opacity-40">Pipeline Load</span>
                              <span className="text-[10px] font-black uppercase tracking-widest text-black animate-pulse">65% Processed</span>
                           </div>
                           <div className="h-1 bg-black/5 overflow-hidden">
                             <motion.div 
                                className="h-full bg-yellow-400"
                                initial={{ width: 0 }}
                                animate={{ width: '65%' }}
                                transition={{ duration: 1.5, repeat: Infinity, repeatType: 'reverse' }}
                             />
                          </div>
                       </div>

                        <div className="flex gap-4">
                           <button className="h-10 w-10 bg-black/5 hover:bg-black group/action transition-all flex items-center justify-center text-black">
                             <HiSearch className="w-4 h-4 opacity-20 group-hover/action:text-[#E7F014] group-hover/action:opacity-100" />
                           </button>
                           <button className="h-10 w-10 bg-red-50 hover:bg-red-600 group/action transition-all flex items-center justify-center text-red-600">
                             <HiXCircle className="w-4 h-4 opacity-40 group-hover/action:text-white group-hover/action:opacity-100" />
                           </button>
                        </div>
                       <AnimatedLine className="absolute bottom-0 left-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Card>
                 </motion.div>
              ))}
           </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
