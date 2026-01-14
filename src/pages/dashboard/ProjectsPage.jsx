import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
import {
  HiPlus, HiSearch, HiFolder, HiEye,
  HiDownload, HiTrash, HiDotsVertical, HiClock, HiArrowRight, HiCube, HiLightningBolt
} from "react-icons/hi";
import { cn } from "@utils/cn";
import toast from "react-hot-toast";
import StatusBadge from "@components/ui/StatusBadge";
import { formatRelativeTime } from "@utils/formatters";

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

const Button = ({ children, className = "", variant = "primary", ...props }) => {
  const variants = {
    primary: "bg-[#E7F014] text-black hover:bg-black hover:text-white transition-all duration-300 font-bold",
    secondary: "bg-white border border-black/10 shadow-sm hover:shadow-lg transition-all duration-300 text-black font-bold",
    ghost: "bg-black/5 hover:bg-black/10 text-black opacity-40 hover:opacity-100 transition-all font-bold",
    danger: "bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-all font-bold"
  };
  return (
    <button className={cn("px-6 py-3 flex items-center justify-center gap-2 uppercase text-[10px] tracking-widest", variants[variant], className)} {...props}>
      {children}
    </button>
  );
};

const Modal = ({ isOpen, onClose, title, children, size = "md" }) => {
  if (!isOpen) return null;
  const sizes = { sm: "max-w-md", md: "max-w-2xl", lg: "max-w-4xl" };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={onClose}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 10 }} 
        animate={{ opacity: 1, scale: 1, y: 0 }} 
        exit={{ opacity: 0, scale: 0.95, y: 10 }} 
        className={cn("bg-white shadow-2xl w-full overflow-hidden", sizes[size])} 
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-8 border-b border-black/5 flex items-center justify-between">
          <h2 className="text-xl font-bold text-black">{title}</h2>
          <button onClick={onClose} className="p-2 hover:bg-black/5 transition-colors text-black/40 hover:text-black">
            <HiXCircle className="w-5 h-5" />
          </button>
        </div>
        <div className="p-8">{children}</div>
      </motion.div>
    </div>
  );
};

const HiXCircle = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);

  useEffect(() => {
    // Simulating project fetch
    setTimeout(() => {
      setProjects([
        {
          _id: "1",
          title: "Real Estate Walkthrough",
          status: "completed",
          createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          thumbnailUrl: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400&auto=format&fit=crop",
          template: "Cinematic"
        },
        {
          _id: "2",
          title: "Product Demo Video",
          status: "processing",
          createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
          thumbnailUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&auto=format&fit=crop",
          template: "Commercial"
        },
        {
          _id: "3",
          title: "Social Media Ad",
          status: "failed",
          createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
          thumbnailUrl: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&auto=format&fit=crop",
          template: "Vertical"
        },
        {
          _id: "4",
          title: "Real Estate Tour 4K",
          status: "completed",
          createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
          thumbnailUrl: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=400&auto=format&fit=crop",
          template: "Ultra HD"
        }
      ]);
      setLoading(false);
    }, 800);
  }, []);

  const handleDelete = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    setProjects(prev => prev.filter(p => p._id !== projectToDelete._id));
    setLoading(false);
    setDeleteModalOpen(false);
    setProjectToDelete(null);
    toast.success("Deployment decommissioned");
  };

  const filteredProjects = projects.filter((project) => {
    const matchesSearch = !searchQuery || project.title?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === "all" || project.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-[#F2F2ED] text-black p-6 lg:p-12" style={{ fontFamily: "'Neue Montreal', sans-serif" }}>
      <Helmet><title>Repository | VideoGen AI</title></Helmet>
      
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-black px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em]" style={{ backgroundColor: '#E7F014' }}>Asset Repository</span>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-black opacity-40">Total Deployments: {projects.length}</span>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold text-black leading-tight mb-4 md:mb-6">
                Active <span className="opacity-40">Workspace</span>
              </h1>
              <p className="text-black opacity-60 text-base max-w-xl">
                Manage your cinematic output stream and track high-bandwidth assets.
              </p>
            </div>
            
            <Link to="/dashboard/projects/new">
              <Button className="group">
                <HiPlus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
                Initialize Deployment
              </Button>
            </Link>
          </div>
        </div>

        {/* Filters Bento Block */}
        <div className="grid lg:grid-cols-4 gap-6 mb-12">
          <div className="lg:col-span-3 bg-white p-6 border border-black/5 shadow-sm relative group overflow-hidden">
            <div className="relative z-10 flex items-center">
              <HiSearch className="w-5 h-5 text-black opacity-30 mr-4" />
              <input
                type="text"
                placeholder="Search deployment nodes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none text-black font-bold placeholder:text-black/20 text-lg uppercase tracking-tight"
              />
            </div>
            <AnimatedLine className="absolute bottom-0 left-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          
          <div className="bg-white p-6 border border-black/5 shadow-sm relative group">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full bg-transparent border-none outline-none text-black font-black uppercase tracking-widest text-[10px] appearance-none cursor-pointer"
            >
              <option value="all">Global Stream</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="completed">Completed</option>
              <option value="failed">Failed</option>
            </select>
            <div className="absolute top-1/2 right-4 -translate-y-1/2 pointer-events-none">
              <HiArrowRight className="w-4 h-4 text-black opacity-20" />
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-black">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white border border-black/5 h-80 animate-pulse" />
            ))}
          </div>
        ) : filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, idx) => (
              <motion.div 
                key={project._id} 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-white border border-black/5 shadow-sm hover:shadow-xl transition-all duration-500 group relative overflow-hidden flex flex-col h-full"
              >
                {/* Thumbnail Layer */}
                <div className="aspect-video bg-[#F2F2ED] relative overflow-hidden">
                  {project.thumbnailUrl ? (
                    <img
                      src={project.thumbnailUrl}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <HiCube className="w-12 h-12 text-black opacity-5" />
                    </div>
                  )}
                  
                  <div className="absolute top-4 right-4 z-10">
                    <StatusBadge status={project.status} />
                  </div>
                  
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                    <Link to={`/dashboard/projects/${project._id}`}>
                      <button className="w-12 h-12 text-black flex items-center justify-center hover:scale-110 transition-transform" style={{ backgroundColor: '#E7F014' }}>
                        <HiEye className="w-6 h-6" />
                      </button>
                    </Link>
                  </div>
                </div>

                {/* Content Layer */}
                <div className="p-8 flex-1 flex flex-col justify-between relative">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 bg-[#F2F2ED] flex items-center justify-center transition-colors hover:bg-[#E7F014]">
                           <HiLightningBolt className="w-4 h-4 text-black opacity-30 group-hover:text-black" />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-black opacity-30">{project.template || "Standard"}</span>
                    </div>

                    <Link to={`/dashboard/projects/${project._id}`}>
                      <h3 className="text-xl font-bold text-black mb-4 line-clamp-1">
                        {project.title || "Untitled Sequence"}
                      </h3>
                    </Link>

                    <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-black opacity-40">
                       <span className="flex items-center gap-1.5"><HiClock className="w-3.5 h-3.5" /> {formatRelativeTime(project.createdAt)}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-8 mt-8 border-t border-black/5">
                     <Link to={`/dashboard/projects/${project._id}`} className="text-[10px] font-bold uppercase tracking-widest text-black opacity-40 hover:opacity-100 transition-colors flex items-center gap-2">
                       Inspect Stream <HiArrowRight className="w-3.5 h-3.5" />
                    </Link>
                    <button 
                      onClick={() => {
                        setProjectToDelete(project);
                        setDeleteModalOpen(true);
                      }}
                      className="p-2 text-black opacity-20 hover:text-red-600 hover:opacity-100 transition-colors"
                    >
                      <HiTrash className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <AnimatedLine className="absolute bottom-0 left-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="bg-white border border-black/5 py-32 text-center relative overflow-hidden group text-black">
            <div className="w-16 h-16 bg-black/5 flex items-center justify-center mx-auto mb-8 group-hover:bg-[#E7F014] transition-colors text-black opacity-20 group-hover:opacity-100">
              <HiFolder className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold mb-4">
              {searchQuery ? "No matching assets" : "Stream Offline"}
            </h3>
            <p className="text-black opacity-40 font-medium mb-12 max-w-sm mx-auto text-sm">
              {searchQuery
                ? "Your search query returned no active cinematic deployments."
                : "No cinematic assets detected in your current workspace stream."}
            </p>
            {!searchQuery && (
              <Link to="/dashboard/projects/new">
                <Button>
                  Initialize Execution
                </Button>
              </Link>
            )}
            <AnimatedLine className="absolute bottom-0 left-0 right-0" />
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteModalOpen && (
          <Modal isOpen={deleteModalOpen} onClose={() => setDeleteModalOpen(false)} title="Decommission Node" size="sm">
            <div className="space-y-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-red-50 flex items-center justify-center mx-auto mb-6">
                  <HiTrash className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-2xl font-bold mb-2 text-black">Terminate Asset?</h3>
                <p className="text-black opacity-60 font-medium leading-relaxed text-sm">Deployment will be permanently purged from the production grid. This action is irreversible.</p>
              </div>
              
              <div className="flex flex-col gap-3">
                <Button onClick={handleDelete} variant="danger" className="w-full py-4">
                  Confirm Termination
                </Button>
                <Button onClick={() => setDeleteModalOpen(false)} variant="secondary" className="w-full py-4">
                  Abort Sequence
                </Button>
              </div>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
}
