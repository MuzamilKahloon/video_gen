import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiArrowLeft, HiDownload, HiShare, HiTrash, HiRefresh, HiPlay,
  HiPause, HiVolumeUp, HiVolumeOff, HiExternalLink,
  HiPhotograph, HiClock, HiExclamationCircle, HiLink,
  HiDuplicate, HiPencil, HiX, HiChevronLeft, HiChevronRight, HiCube, HiLightningBolt, HiArrowRight
} from "react-icons/hi";
import { cn } from "@utils/cn";
import { formatDate, formatDuration, formatFileSize } from "@utils/formatters";
import toast from "react-hot-toast";
import StatusBadge from "@components/ui/StatusBadge";

// Signature animated line
const AnimatedLine = ({ className = "" }) => (
  <div className={`h-[1px] bg-gray-200 overflow-hidden ${className}`}>
    <motion.div
      className="w-1/3 h-full bg-yellow-400"
      animate={{ x: ["-100%", "300%"] }}
      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
    />
  </div>
);

const Button = ({ children, className = "", variant = "primary", ...props }) => {
  const variants = {
    primary: "bg-black text-white hover:bg-yellow-400 hover:text-black transition-all duration-300 font-bold",
    secondary: "bg-white border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 text-black font-bold",
    ghost: "bg-gray-50 hover:bg-gray-100 text-gray-500 hover:text-black transition-all font-bold",
    danger: "bg-red-50 hover:bg-red-600 hover:text-white transition-all font-bold",
    icon: "bg-white border border-gray-100 shadow-sm hover:bg-yellow-400 hover:text-black transition-all"
  };
  return (
    <button className={cn("px-6 py-3 flex items-center justify-center gap-2 uppercase text-[10px] tracking-widest", variants[variant], className)} {...props}>
      {children}
    </button>
  );
};

const Modal = ({ isOpen, onClose, title, children, size = "md" }) => {
  if (!isOpen) return null;
  const sizes = { sm: "max-w-md", md: "max-w-2xl", lg: "max-w-4xl", xl: "max-w-6xl" };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={onClose}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 10 }} 
        animate={{ opacity: 1, scale: 1, y: 0 }} 
        exit={{ opacity: 0, scale: 0.95, y: 10 }} 
        className={cn("bg-white shadow-2xl w-full overflow-hidden", sizes[size])} 
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-8 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-xl font-black tracking-tight text-black uppercase">{title}</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 transition-colors text-gray-400">
            <HiX className="w-5 h-5" />
          </button>
        </div>
        <div className="p-8">{children}</div>
      </motion.div>
    </div>
  );
};

const VideoPlayer = ({ videoUrl, thumbnail }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const videoRef = useRef(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) { videoRef.current.pause(); } 
      else { videoRef.current.play(); }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    if (videoRef.current) {
      videoRef.current.currentTime = percent * duration;
    }
  };

  return (
    <div className="relative bg-black group w-full aspect-video overflow-hidden" onMouseEnter={() => setShowControls(true)} onMouseLeave={() => !isPlaying && setShowControls(true)}>
      <video 
        ref={videoRef} 
        src={videoUrl} 
        poster={thumbnail} 
        className="w-full h-full object-contain" 
        onTimeUpdate={() => setCurrentTime(videoRef.current?.currentTime || 0)} 
        onLoadedMetadata={() => setDuration(videoRef.current?.duration || 0)} 
        onEnded={() => setIsPlaying(false)} 
        onClick={togglePlay} 
      />
      
      <AnimatePresence>
        {!isPlaying && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px]">
            <button onClick={togglePlay} className="w-20 h-20 bg-yellow-400 text-black hover:scale-110 transition-transform flex items-center justify-center">
              <HiPlay className="w-10 h-10 ml-1" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6 transition-opacity duration-500 ${showControls || !isPlaying ? "opacity-100" : "opacity-0"}`}>
        <div className="w-full h-1 bg-white/20 mb-4 cursor-pointer relative group/timeline" onClick={handleSeek}>
          <div className="absolute h-full bg-yellow-400" style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }} />
          <div className="absolute h-3 w-3 bg-white rounded-full -top-1 opacity-0 group-hover/timeline:opacity-100 transition-opacity" style={{ left: `${duration ? (currentTime / duration) * 100 : 0}%` }} />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={togglePlay} className="text-white hover:text-yellow-400 transition-colors">
              {isPlaying ? <HiPause className="w-6 h-6" /> : <HiPlay className="w-6 h-6" />}
            </button>
            <button onClick={toggleMute} className="text-white hover:text-yellow-400 transition-colors">
              {isMuted ? <HiVolumeOff className="w-5 h-5" /> : <HiVolumeUp className="w-5 h-5" />}
            </button>
            <span className="text-[10px] font-black tracking-widest text-white/60">
              {formatDuration(Math.floor(currentTime))} <span className="text-white/20">/</span> {formatDuration(Math.floor(duration))}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="bg-yellow-400 text-black text-[10px] font-black px-2 py-0.5 uppercase tracking-tighter">HD 1080P</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const ImageGallery = ({ images }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!images?.length) return (
    <div className="aspect-video bg-[#f9f9f7] flex items-center justify-center border border-gray-100">
      <p className="text-gray-400 font-bold tracking-widest uppercase text-[10px]">No Assets detected</p>
    </div>
  );

  return (
    <div>
      <div className="relative aspect-video bg-[#f9f9f7] overflow-hidden mb-6 cursor-pointer group" onClick={() => setIsModalOpen(true)}>
        <img src={images[selectedIndex]?.url} alt={`Image ${selectedIndex + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <div className="w-12 h-12 bg-yellow-400 text-black flex items-center justify-center">
              <HiPhotograph className="w-6 h-6" />
            </div>
        </div>
        <div className="absolute bottom-6 right-6 px-4 py-2 bg-black text-white text-[10px] font-black uppercase tracking-widest">{selectedIndex + 1} / {images.length}</div>
      </div>

      <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
        {images.map((image, index) => (
          <button 
            key={index} 
            onClick={() => setSelectedIndex(index)} 
            className={cn(
              "aspect-square overflow-hidden transition-all duration-300 relative",
              selectedIndex === index ? "border-2 border-yellow-400" : "opacity-40 hover:opacity-100"
            )}
          >
            <img src={image.thumbnail || image.url} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} size="xl" title="Asset Inspection">
            <div className="relative">
              <img src={images[selectedIndex]?.url} alt={`Image ${selectedIndex + 1}`} className="w-full" />
              <div className="flex justify-between mt-8">
                <Button variant="ghost" onClick={() => setSelectedIndex(prev => prev === 0 ? images.length - 1 : prev - 1)}>
                  <HiChevronLeft className="w-5 h-5" /> Previous
                </Button>
                <Button variant="ghost" onClick={() => setSelectedIndex(prev => prev === images.length - 1 ? 0 : prev + 1)}>
                  Next <HiChevronRight className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function ProjectDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    // Mock data fetching to match current project state
    setTimeout(() => {
      setProject({
        _id: id,
        title: "Real Estate Walkthrough Video",
        status: "completed",
        createdAt: new Date(Date.now() - 3600000).toISOString(),
        completedAt: new Date().toISOString(),
        images: [
          { url: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&auto=format&fit=crop", thumbnail: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=200&auto=format&fit=crop" },
          { url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format&fit=crop", thumbnail: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=200&auto=format&fit=crop" },
          { url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop", thumbnail: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=200&auto=format&fit=crop" }
        ],
        video: {
          url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
          format: "mp4",
          size: 12582912
        },
        settings: {
          template: "Cinematic",
          quality: "1080p MASTER",
          aspectRatio: "16:9 Landscape",
          duration: 30
        },
        creditsUsed: 1,
        description: "A premium cinematic walkthrough of the property listing, optimized for high-end conversion."
      });
      setIsLoading(false);
    }, 800);
  }, [id]);

  const handleDelete = async () => {
    setActionLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setActionLoading(false);
    setShowDeleteModal(false);
    navigate("/dashboard/projects");
    toast.success("Deployment decommissioned successfully");
  };

  const handleDuplicate = async () => {
    setActionLoading(true);
    await new Promise(r => setTimeout(r, 800));
    setActionLoading(false);
    toast.success("Stream duplicated!");
  };

  if (isLoading) return (
    <div className="min-h-screen bg-[#f9f9f7] p-12 flex flex-col items-center justify-center">
       <div className="w-12 h-12 border-4 border-black border-t-yellow-400 rounded-full animate-spin mb-4" />
       <p className="font-black tracking-[0.3em] text-[10px] uppercase text-gray-400">Syncing Stream Data</p>
    </div>
  );

  if (!project) return (
    <div className="min-h-screen bg-[#f9f9f7] p-12 flex items-center justify-center">
      <div className="bg-black text-white p-12 shadow-2xl max-w-lg text-center">
        <h3 className="text-3xl font-black tracking-tight mb-4 uppercase">404: Missing Node</h3>
        <p className="text-gray-400 font-medium mb-8 leading-relaxed">The requested cinematic deployment has been decommissioned or moved from the production grid.</p>
        <Link to="/dashboard/projects">
          <Button variant="primary">Return to Workspace</Button>
        </Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f9f9f7] text-black font-['Plus_Jakarta_Sans',sans-serif] p-6 lg:p-12">
      <Helmet><title>MASTER | {project.title}</title></Helmet>
      
      <div className="max-w-7xl mx-auto">
        {/* Navigation & Header */}
        <div className="mb-12">
          <Link to="/dashboard/projects" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-black transition-colors mb-8 group">
            <HiArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Workspace
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-3xl">
              <div className="flex items-center gap-4 mb-4">
                <StatusBadge status={project.status} />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-300">STREAM-ID: {project._id?.slice(-8).toUpperCase()}</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-black tracking-tighter leading-none mb-6 uppercase">
                {project.title.split(' ')[0]} <span className="text-gray-300">{project.title.split(' ').slice(1).join(' ')}</span>
              </h1>
              <p className="text-lg text-gray-500 font-medium max-w-2xl leading-relaxed">
                {project.description}
              </p>
            </div>
            
            <div className="flex flex-wrap gap-3">
               {project.status === "completed" && (
                 <>
                   <Button variant="secondary" onClick={() => setShowShareModal(true)}>
                     <HiShare className="w-5 h-5" /> Share
                   </Button>
                   <Button variant="primary" onClick={() => toast.success("Export Initialized")}>
                     <HiDownload className="w-5 h-5" /> Download Master
                   </Button>
                 </>
               )}
            </div>
          </div>
        </div>

        {/* Operational Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            {/* Visual Output */}
            <div className="bg-white p-2 border border-gray-100 shadow-sm relative group">
               <VideoPlayer videoUrl={project.video?.url} thumbnail={project.images?.[0]?.url} />
               <AnimatedLine className="absolute bottom-0 left-0 right-0" />
            </div>

            {/* Source Materials */}
            <div className="bg-white border border-gray-100 shadow-sm relative group overflow-hidden">
              <div className="p-8 border-b border-gray-50 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#f9f9f7] flex items-center justify-center group-hover:bg-yellow-400 transition-colors">
                    <HiPhotograph className="w-5 h-5 text-gray-400 group-hover:text-black" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black tracking-tight uppercase">Raw Pipeline Assets</h3>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{project.images?.length || 0} Frames Ingested</p>
                  </div>
                </div>
              </div>
              <div className="p-8">
                <ImageGallery images={project.images || []} />
              </div>
              <AnimatedLine className="absolute bottom-0 left-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>

          {/* Sidebar Area */}
          <div className="space-y-8">
            {/* Specs Block */}
            <div className="bg-black text-white p-8 shadow-2xl relative overflow-hidden group">
               <h3 className="text-xl font-black tracking-tight uppercase mb-8 border-b border-white/10 pb-4">Specifications</h3>
               
               <div className="space-y-6">
                 {[
                   { label: "Template", value: project.settings?.template, icon: HiLightningBolt },
                   { label: "Resolution", value: project.settings?.quality, icon: HiCube },
                   { label: "Ratio", value: project.settings?.aspectRatio, icon: HiLink },
                   { label: "Duration", value: `${project.settings?.duration}s`, icon: HiClock },
                   { label: "Node Cost", value: `${project.creditsUsed} CR`, icon: HiLightningBolt, active: true },
                 ].map((spec) => (
                   <div key={spec.label} className="flex items-center justify-between">
                     <span className="text-[10px] font-black uppercase tracking-widest text-gray-500 flex items-center gap-2">
                       <spec.icon className="w-3.5 h-3.5" /> {spec.label}
                     </span>
                     <span className={cn("text-xs font-bold tracking-tight", spec.active ? "text-yellow-400" : "text-white")}>{spec.value}</span>
                   </div>
                 ))}
               </div>
               
               <div className="mt-12 pt-6 border-t border-white/10 space-y-3">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="font-black uppercase tracking-widest text-zinc-600">Generated</span>
                    <span className="font-bold text-zinc-400 font-mono tracking-tighter">{formatDate(project.createdAt)}</span>
                  </div>
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="font-black uppercase tracking-widest text-zinc-600">Certified</span>
                    <span className="font-bold text-zinc-400 font-mono tracking-tighter">{formatDate(project.completedAt)}</span>
                  </div>
               </div>
               <AnimatedLine className="absolute bottom-0 left-0 right-0" />
            </div>

            {/* Operations Block */}
            <div className="bg-white border border-gray-100 p-8 shadow-sm">
               <h3 className="text-xl font-black tracking-tight uppercase mb-6">Operations</h3>
               <div className="space-y-3">
                 <button onClick={handleDuplicate} className="w-full p-4 bg-[#f9f9f7] flex items-center justify-between hover:bg-black hover:text-white transition-all group/opt">
                    <span className="text-[10px] font-black uppercase tracking-widest">Duplicate Master</span>
                    <HiDuplicate className="w-5 h-5 text-gray-300 group-hover/opt:text-yellow-400 transition-colors" />
                 </button>
                 <button onClick={() => setShowEditModal(true)} className="w-full p-4 bg-[#f9f9f7] flex items-center justify-between hover:bg-black hover:text-white transition-all group/opt">
                    <span className="text-[10px] font-black uppercase tracking-widest">Modify Metadata</span>
                    <HiPencil className="w-5 h-5 text-gray-300 group-hover/opt:text-yellow-400 transition-colors" />
                 </button>
                 <button onClick={() => setShowDeleteModal(true)} className="w-full p-4 bg-red-50 text-red-600 flex items-center justify-between hover:bg-red-600 hover:text-white transition-all group/opt">
                    <span className="text-[10px] font-black uppercase tracking-widest">Decommission Asset</span>
                    <HiTrash className="w-5 h-5 text-red-300 group-hover/opt:text-white transition-colors" />
                 </button>
               </div>
            </div>
            
            {/* Asset Data Data Block */}
            {project.status === "completed" && project.video && (
               <div className="bg-white border border-gray-100 p-8 shadow-sm relative group overflow-hidden">
                  <h3 className="text-xl font-black tracking-tight uppercase mb-6">Payload Metadata</h3>
                  <div className="space-y-4">
                     <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Total Size</span>
                        <span className="text-xs font-bold">{formatFileSize(project.video.size)}</span>
                     </div>
                     <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Master Type</span>
                        <span className="text-xs font-bold uppercase tracking-tighter">{project.video.format} / H.264</span>
                     </div>
                     <Button variant="primary" className="w-full py-4 mt-6 text-[10px] tracking-[0.2em] uppercase" onClick={() => toast.success("Export Initialized")}>
                        <HiDownload className="w-4 h-4" /> Export Data Block
                     </Button>
                  </div>
                  <AnimatedLine className="absolute bottom-0 left-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity" />
               </div>
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {showDeleteModal && (
          <Modal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)} title="Decommission Node" size="sm">
            <div className="space-y-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-red-50 flex items-center justify-center mx-auto mb-6">
                  <HiTrash className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-2xl font-black tracking-tight mb-2 uppercase">Terminate Asset?</h3>
                <p className="text-gray-500 font-medium leading-relaxed text-sm">Target sequence will be permanently removed from the production grid. This action is irreversible.</p>
              </div>
              <div className="flex flex-col gap-3">
                <Button onClick={handleDelete} variant="danger" className="w-full py-4">
                  {actionLoading ? "Processing Purge..." : "Confirm Termination"}
                </Button>
                <Button onClick={() => setShowDeleteModal(false)} variant="secondary" className="w-full py-4">
                  Abort Sequence
                </Button>
              </div>
            </div>
          </Modal>
        )}

        {showShareModal && (
          <Modal isOpen={showShareModal} onClose={() => setShowShareModal(false)} title="Master Node Token">
            <div className="space-y-6">
              <p className="text-gray-500 font-medium text-sm">Generate a high-bandwidth access link for this deployment.</p>
              <div className="flex items-center gap-2 p-2 bg-[#f9f9f7] border border-gray-100">
                <input
                  type="text"
                  value={project.video?.url || ""}
                  readOnly
                  className="flex-1 bg-transparent border-none outline-none text-[10px] font-bold text-gray-400 px-4 font-mono"
                />
                <Button onClick={() => { navigator.clipboard.writeText(project.video?.url || ""); toast.success("Token Synced"); }} className="py-2 px-6">
                  Copy
                </Button>
              </div>
            </div>
          </Modal>
        )}

        {showEditModal && (
          <Modal isOpen={showEditModal} onClose={() => setShowEditModal(false)} title="Modify Metadata">
            <form onSubmit={(e) => {
              e.preventDefault();
              setActionLoading(true);
              setTimeout(() => {
                setProject(prev => ({ ...prev, title: e.target.title.value, description: e.target.description.value }));
                setActionLoading(false);
                setShowEditModal(false);
                toast.success("Parameters Updated");
              }, 800);
            }} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Node Identifier</label>
                <input
                  name="title"
                  defaultValue={project.title}
                  className="w-full bg-[#f9f9f7] border border-gray-100 p-4 text-sm font-bold outline-none focus:border-yellow-400 transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Production Brief</label>
                <textarea
                  name="description"
                  defaultValue={project.description}
                  className="w-full bg-[#f9f9f7] border border-gray-100 p-4 text-sm font-bold outline-none focus:border-yellow-400 transition-colors min-h-[120px] resize-none"
                />
              </div>
              <div className="flex gap-4 pt-4">
                <Button type="button" onClick={() => setShowEditModal(false)} variant="secondary" className="flex-1">
                  Cancel
                </Button>
                <Button type="submit" variant="primary" className="flex-1">
                  {actionLoading ? "Syncing..." : "Apply Changes"}
                </Button>
              </div>
            </form>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
}
