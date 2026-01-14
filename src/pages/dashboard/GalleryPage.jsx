import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiSearch, HiFilter, HiViewGrid, HiViewList, HiDownload,
  HiPlay, HiDotsVertical, HiTrash, HiExternalLink, HiVideoCamera,
  HiCheck, HiX, HiSortDescending, HiFolder, HiHeart, HiRefresh,
  HiSparkles, HiArrowRight, HiCube, HiClock
} from "react-icons/hi";
import { cn } from "@utils/cn";
import toast from "react-hot-toast";

// Custom UI Components matching the new design system
const AnimatedLine = ({ className = "" }) => (
  <div className={`h-[1px] bg-gray-200 overflow-hidden ${className}`}>
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
    primary: "bg-[#E7F014] text-black hover:bg-black hover:text-white shadow-xl hover:-translate-y-0.5 transition-all duration-300 font-bold disabled:opacity-50",
    secondary: "bg-white border border-black/10 shadow-sm hover:shadow-lg transition-all duration-300 text-black font-bold",
    ghost: "bg-black/5 hover:bg-black/10 text-black opacity-40 hover:opacity-100 transition-all",
    black: "bg-black text-white hover:bg-black/90 transition-all font-bold",
    danger: "bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-all font-bold",
    outline: "border-2 border-black text-black hover:bg-black hover:text-white transition-all font-bold"
  };
  return (
    <button className={cn("px-6 py-3 flex items-center justify-center gap-3 uppercase text-[10px] tracking-[0.2em]", variants[variant], className)} {...props}>
      {children}
    </button>
  );
};

const Modal = ({ isOpen, onClose, title, children, size = "md" }) => {
  if (!isOpen) return null;
  const sizes = { sm: "max-w-md", md: "max-w-2xl", lg: "max-w-4xl", xl: "max-w-6xl" };
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md" onClick={onClose}>
      <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className={cn("bg-white w-full shadow-2xl relative overflow-hidden", sizes[size])} onClick={(e) => e.stopPropagation()}>
        <div className="p-8 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-xl font-bold text-black">{title}</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 transition-colors text-gray-400 hover:text-black"><HiX className="w-6 h-6" /></button>
        </div>
        <div className="p-8">{children}</div>
        <AnimatedLine className="absolute bottom-0 left-0 right-0" />
      </motion.div>
    </div>
  );
};

// Format utilities
const formatDuration = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

const formatFileSize = (bytes) => {
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  if (bytes === 0) return '0 Bytes';
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return Math.round(bytes / Math.pow(1024, i)) + ' ' + sizes[i];
};

const formatRelativeTime = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};

// Mock data
const mockVideos = [
  {
    id: "vid_1",
    title: "Luxury Beachfront Villa",
    thumbnail: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&auto=format&fit=crop",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    duration: 12,
    template: "cinematic",
    quality: "1080p",
    aspectRatio: "16:9",
    size: 45678900,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    isFavorite: true,
    downloads: 5,
  },
  {
    id: "vid_2",
    title: "Modern City Apartment",
    thumbnail: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&auto=format&fit=crop",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    duration: 8,
    template: "dynamic",
    quality: "1080p",
    aspectRatio: "16:9",
    size: 32456000,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    isFavorite: false,
    downloads: 2,
  },
  {
    id: "vid_3",
    title: "Cozy Suburban Home",
    thumbnail: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&auto=format&fit=crop",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    duration: 15,
    template: "elegant",
    quality: "4k",
    aspectRatio: "16:9",
    size: 89123000,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    isFavorite: true,
    downloads: 8,
  },
  {
    id: "vid_4",
    title: "Penthouse with Ocean View",
    thumbnail: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400&auto=format&fit=crop",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    duration: 10,
    template: "property",
    quality: "1080p",
    aspectRatio: "9:16",
    size: 41567000,
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    isFavorite: false,
    downloads: 3,
  },
  {
    id: "vid_5",
    title: "Historic Colonial Estate",
    thumbnail: "https://images.unsplash.com/photo-1600573472591-ee6c563aaec5?w=400&auto=format&fit=crop",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    duration: 20,
    template: "aerial",
    quality: "4k",
    aspectRatio: "16:9",
    size: 125678000,
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    isFavorite: false,
    downloads: 12,
  },
  {
    id: "vid_6",
    title: "Contemporary Loft Space",
    thumbnail: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=400&auto=format&fit=crop",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    duration: 8,
    template: "cinematic",
    quality: "720p",
    aspectRatio: "1:1",
    size: 28456000,
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    isFavorite: true,
    downloads: 1,
  },
];

const VideoCard = ({ video, viewMode, onPlay, onDownload, onDelete, onToggleFavorite, isSelected, onSelect }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  if (viewMode === "list") {
    return (
      <div className={cn("group bg-white border border-gray-100 p-4 transition-all duration-300 relative", isSelected ? "bg-yellow-50" : "hover:shadow-xl hover:z-10")}>
        <div className="flex items-center gap-6">
          <input type="checkbox" checked={isSelected} onChange={() => onSelect(video.id)} className="w-5 h-5 accent-black rounded-none cursor-pointer" />
          <div className="relative w-40 h-24 flex-shrink-0 cursor-pointer group/thumb" onClick={() => onPlay(video)}>
            <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/thumb:opacity-100 transition-opacity flex items-center justify-center">
              <HiPlay className="w-10 h-10 text-white" />
            </div>
            <div className="absolute bottom-1 right-1 px-2 py-0.5 bg-black text-white text-[10px] font-black uppercase tracking-widest">{formatDuration(video.duration)}</div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3">
              <h3 className="font-bold text-black truncate">{video.title}</h3>
              {video.isFavorite && <HiHeart className="w-4 h-4 text-yellow-400" />}
            </div>
            <div className="flex items-center gap-4 mt-2">
              <span className="bg-[#E7F014] text-black px-2 py-0.5 text-[8px] font-black uppercase tracking-widest leading-none">{video.template}</span>
              <span className="text-[10px] font-bold text-black opacity-40 uppercase tracking-widest">{video.quality} • {video.aspectRatio}</span>
            </div>
          </div>
          <div className="hidden md:flex flex-col items-end gap-1">
             <span className="text-xs font-black text-black">{formatFileSize(video.size)}</span>
             <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{formatRelativeTime(video.createdAt)}</span>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => onDownload(video)} className="p-3 bg-gray-50 hover:bg-black hover:text-white transition-all"><HiDownload className="w-5 h-5" /></button>
            <button onClick={() => onToggleFavorite(video.id)} className={cn("p-3 transition-all", video.isFavorite ? "bg-yellow-400 text-black" : "bg-gray-50 hover:bg-yellow-100")}><HiHeart className="w-5 h-5" /></button>
            <div className="relative">
              <button onClick={() => setShowMenu(!showMenu)} className="p-3 bg-gray-50 hover:bg-black hover:text-white transition-all"><HiDotsVertical className="w-5 h-5" /></button>
              <AnimatePresence>
                {showMenu && (
                  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="absolute right-0 top-full mt-2 bg-white text-black w-48 shadow-2xl z-[60] border border-black/5">
                    <Link to={`/dashboard/projects/${video.id}`} className="block px-6 py-4 text-[10px] font-black uppercase tracking-widest hover:bg-[#E7F014] transition-colors">Operational View</Link>
                    <button onClick={() => { onDownload(video); setShowMenu(false); }} className="w-full text-left px-6 py-4 text-[10px] font-black uppercase tracking-widest hover:bg-[#E7F014] transition-colors">Acquire Assets</button>
                    <button onClick={() => { onDelete(video); setShowMenu(false); }} className="w-full text-left px-6 py-4 text-[10px] font-black uppercase tracking-widest bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-colors">Decommission</button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
        <AnimatedLine className="absolute bottom-0 left-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    );
  }

  return (
    <div 
      className={cn(
        "group bg-white border border-gray-100 relative overflow-hidden transition-all duration-300",
        isSelected ? "p-2 bg-yellow-400" : "hover:shadow-2xl hover:-translate-y-1"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); setShowMenu(false); }}
    >
      <div className="relative aspect-video bg-black cursor-pointer overflow-hidden" onClick={() => onPlay(video)}>
        <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100" />
        <div className={cn("absolute inset-0 flex items-center justify-center bg-black/20 transition-opacity duration-300", isHovered ? "opacity-100" : "opacity-0")}>
           <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center shadow-2xl scale-0 group-hover:scale-100 transition-transform duration-500">
             <HiPlay className="w-8 h-8 text-black ml-1" />
           </div>
        </div>
        <div className="absolute top-4 left-4 flex gap-2">
           <input type="checkbox" checked={isSelected} onClick={(e) => e.stopPropagation()} onChange={() => onSelect(video.id)} className="w-5 h-5 accent-black rounded-none cursor-pointer" />
           <span className="bg-[#E7F014] text-black px-2 py-0.5 text-[8px] font-black uppercase tracking-widest">{video.quality}</span>
        </div>
        <div className="absolute bottom-4 right-4 bg-[#F2F2ED] text-black px-2 py-1 text-[10px] font-black tracking-widest">{formatDuration(video.duration)}</div>
        {video.isFavorite && <div className="absolute top-4 right-4 text-yellow-400"><HiHeart className="w-5 h-5" /></div>}
      </div>
      
      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h3 className="text-lg font-bold text-black leading-tight truncate">{video.title}</h3>
            <div className="flex items-center gap-3 mt-2">
              <span className="text-[10px] font-black uppercase tracking-widest text-black opacity-30">{video.template}</span>
              <div className="w-1 h-1 bg-black/5 rounded-full" />
              <span className="text-[10px] font-bold text-black opacity-30 uppercase tracking-widest">{formatRelativeTime(video.createdAt)}</span>
            </div>
          </div>
          <div className="relative">
             <button onClick={() => setShowMenu(!showMenu)} className="p-2 text-gray-400 hover:text-black hover:bg-gray-100 transition-all"><HiDotsVertical className="w-5 h-5" /></button>
             <AnimatePresence>
                {showMenu && (
                  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="absolute right-0 bottom-full mb-2 bg-white text-black w-48 shadow-2xl z-[50] overflow-hidden border border-black/5">
                    <Link to={`/dashboard/projects/${video.id}`} className="block px-6 py-4 text-[10px] font-black uppercase tracking-widest hover:bg-[#E7F014] transition-colors">Details</Link>
                    <button onClick={() => onDownload(video)} className="w-full text-left px-6 py-4 text-[10px] font-black uppercase tracking-widest hover:bg-[#E7F014] transition-colors">Download</button>
                    <button onClick={() => onDelete(video)} className="w-full text-left px-6 py-4 text-[10px] font-black uppercase tracking-widest bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-colors">Decommission</button>
                  </motion.div>
                )}
             </AnimatePresence>
          </div>
        </div>
      </div>
      <AnimatedLine className="absolute bottom-0 left-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  );
};

export default function GalleryPage() {
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({ template: "all", quality: "all", showFavoritesOnly: false });
  const [sortBy, setSortBy] = useState("newest");
  const [selectedVideos, setSelectedVideos] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [videoToDelete, setVideoToDelete] = useState(null);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [activeVideo, setActiveVideo] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setVideos(mockVideos);
      setIsLoading(false);
    }, 800);
  }, []);

  const filteredVideos = videos
    .filter((video) => {
      if (searchQuery && !video.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      if (filters.template !== "all" && video.template !== filters.template) return false;
      if (filters.quality !== "all" && video.quality !== filters.quality) return false;
      if (filters.showFavoritesOnly && !video.isFavorite) return false;
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "oldest": return new Date(a.createdAt) - new Date(b.createdAt);
        case "name": return a.title.localeCompare(b.title);
        case "size": return b.size - a.size;
        default: return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });

  const handleSelectVideo = (videoId) => {
    setSelectedVideos(prev => prev.includes(videoId) ? prev.filter(id => id !== videoId) : [...prev, videoId]);
  };

  const handleSelectAll = () => {
    if (selectedVideos.length === filteredVideos.length) {
      setSelectedVideos([]);
    } else {
      setSelectedVideos(filteredVideos.map(v => v.id));
    }
  };

  const handlePlayVideo = (video) => {
    setActiveVideo(video);
    setShowVideoModal(true);
  };

  const handleDownload = (video) => {
    toast.success(`Exporting sequence: ${video.title}`);
  };

  const handleDelete = (video) => {
    setVideoToDelete(video);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    setVideos(prev => prev.filter(v => v.id !== videoToDelete.id));
    setShowDeleteModal(false);
    setVideoToDelete(null);
    toast.success("Asset decommissioned");
  };

  const handleToggleFavorite = (videoId) => {
    setVideos(prev => prev.map(v => v.id === videoId ? { ...v, isFavorite: !v.isFavorite } : v));
  };

  const clearFilters = () => {
    setFilters({ template: "all", quality: "all", showFavoritesOnly: false });
    setSearchQuery("");
  };

  const stats = {
    total: videos.length,
    favorites: videos.filter(v => v.isFavorite).length,
    totalSize: videos.reduce((acc, v) => acc + v.size, 0),
  };

  return (
    <div className="min-h-screen bg-[#F2F2ED] text-black p-6 lg:p-12" style={{ fontFamily: "'Neue Montreal', sans-serif" }}>
      <Helmet><title>Asset Archive - VideoGen AI</title></Helmet>
      
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 pb-12 border-b border-gray-200">
           <div>
               <div className="flex items-center gap-4 mb-4">
                  <span className="text-black px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em]" style={{ backgroundColor: '#E7F014' }}>Asset Archive</span>
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-black opacity-40">Repository Control</span>
               </div>
               <h1 className="text-4xl md:text-6xl font-bold text-black leading-tight">
                 Deployment <span className="opacity-40">Gallery</span>
               </h1>
           </div>
           
           <div className="flex flex-wrap items-center gap-8">
               <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-black text-black opacity-40 uppercase tracking-widest">Total sequences</span>
                  <span className="text-2xl font-bold">{stats.total}</span>
               </div>
               <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-black text-black opacity-40 uppercase tracking-widest">Storage used</span>
                  <span className="text-2xl font-bold">{formatFileSize(stats.totalSize)}</span>
               </div>
              <Link to="/dashboard/projects/new">
                <Button className="h-16 px-10">Initialize New Project <HiArrowRight className="w-5 h-5" /></Button>
              </Link>
           </div>
        </div>

        {/* Toolbar - Bento Style */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-12">
          {/* Search Box */}
          <div className="lg:col-span-2 relative group bg-white border border-black/5 p-2 flex items-center shadow-sm focus-within:border-[#E7F014] transition-colors">
            <HiSearch className="w-6 h-6 text-black opacity-20 ml-4" />
            <input 
              type="text" 
              placeholder="Search by mission title..." 
              value={searchQuery} 
              onChange={(e) => setSearchQuery(e.target.value)} 
              className="flex-1 bg-transparent p-4 outline-none text-sm font-bold placeholder:text-black/10 text-black"
            />
            <AnimatedLine className="absolute bottom-0 left-0 right-0 group-hover:opacity-100 opacity-0 transition-opacity" />
          </div>

          {/* Quick Filters */}
          <div className="flex bg-white border border-gray-100 p-2 shadow-sm">
             <button onClick={() => setViewMode("grid")} className={cn("flex-1 flex items-center justify-center p-3 gap-2 transition-all", viewMode === "grid" ? "bg-black text-white" : "hover:bg-gray-50 text-black opacity-40 hover:opacity-100")}>
               <HiViewGrid className="w-5 h-5" />
             </button>
             <button onClick={() => setViewMode("list")} className={cn("flex-1 flex items-center justify-center p-3 gap-2 transition-all", viewMode === "list" ? "bg-black text-white" : "hover:bg-gray-50 text-black opacity-40 hover:opacity-100")}>
               <HiViewList className="w-5 h-5" />
             </button>
          </div>

          {/* Filter Toggle */}
          <button onClick={() => setShowFilters(!showFilters)} className={cn("border-2 border-black flex items-center justify-center gap-4 py-4 px-6 uppercase text-[10px] font-black tracking-widest transition-all", showFilters ? "bg-black text-white" : "hover:bg-black hover:text-white")}>
            <HiFilter className="w-5 h-5" /> {showFilters ? "Close Filters" : "Operational Settings"}
          </button>
        </div>

        {/* Extended Filters */}
        <AnimatePresence>
          {showFilters && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="mb-12 bg-white border border-black/5 text-black p-8 relative overflow-hidden shadow-sm">
               <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                  <div className="space-y-3">
                     <label className="text-[10px] font-black uppercase tracking-widest text-black/40 flex items-center gap-2"><HiCube className="w-3 h-3" /> Template Type</label>
                     <select value={filters.template} onChange={(e) => setFilters(prev => ({ ...prev, template: e.target.value }))} className="w-full bg-[#F2F2ED] border border-black/5 p-4 outline-none focus:border-[#E7F014] font-bold text-sm appearance-none">
                        <option value="all">Archival Default</option>
                        <option value="cinematic">Cinematic</option><option value="dynamic">Dynamic</option>
                        <option value="elegant">Elegant</option><option value="property">Property</option>
                     </select>
                  </div>
                  <div className="space-y-3">
                     <label className="text-[10px] font-black uppercase tracking-widest text-black/40 flex items-center gap-2"><HiExternalLink className="w-3 h-3" /> Quality Scale</label>
                     <select value={filters.quality} onChange={(e) => setFilters(prev => ({ ...prev, quality: e.target.value }))} className="w-full bg-[#F2F2ED] border border-black/5 p-4 outline-none focus:border-[#E7F014] font-bold text-sm appearance-none">
                        <option value="all">All Resolutions</option>
                        <option value="720p">720P HD</option><option value="1080p">1080P FHD</option>
                        <option value="4k">4K UHD</option>
                     </select>
                  </div>
                  <div className="space-y-3">
                     <label className="text-[10px] font-black uppercase tracking-widest text-black/40 flex items-center gap-2"><HiSortDescending className="w-3 h-3" /> Sequence Sort</label>
                     <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="w-full bg-[#F2F2ED] border border-black/5 p-4 outline-none focus:border-[#E7F014] font-bold text-sm appearance-none">
                        <option value="newest">Recent Deployment</option>
                        <option value="oldest">Legacy Archives</option>
                        <option value="name">Alphanumeric (A-Z)</option>
                        <option value="size">Size Projection</option>
                     </select>
                  </div>
                  <div className="flex flex-col justify-end">
                     <button onClick={clearFilters} className="w-full py-4 bg-[#E7F014] text-black font-black uppercase text-[10px] tracking-widest hover:bg-black hover:text-white transition-colors">Reset Archive Parameters</button>
                  </div>
               </div>
               <div className="mt-8 pt-8 border-t border-black/5 flex items-center gap-6">
                  <button onClick={() => setFilters(prev => ({ ...prev, showFavoritesOnly: !prev.showFavoritesOnly }))} className={cn("flex items-center gap-3 px-4 py-2 text-[10px] font-black uppercase tracking-widest border transition-all", filters.showFavoritesOnly ? "bg-[#E7F014] text-black border-[#E7F014]" : "text-black opacity-40 border-black/10 hover:border-black/40 hover:opacity-100")}>
                    <HiHeart className="w-4 h-4" /> Priority Assets Only
                  </button>
               </div>
               <AnimatedLine className="absolute bottom-0 left-0 right-0" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bulk Control Bar */}
        <AnimatePresence>
          {selectedVideos.length > 0 && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="fixed bottom-12 left-1/2 -translate-x-1/2 z-[100] w-full max-w-2xl px-6">
              <div className="bg-white text-black p-6 shadow-[0_40px_100px_rgba(0,0,0,0.1)] flex items-center justify-between gap-8 border border-black/5 relative overflow-hidden">
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 text-black flex items-center justify-center font-bold shadow-xl" style={{ backgroundColor: '#E7F014' }}>{selectedVideos.length}</div>
                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-black opacity-30">Active Selection</h4>
                    <button onClick={handleSelectAll} className="text-[10px] font-black uppercase tracking-[0.2em] text-black hover:opacity-60 transition-colors">
                      {selectedVideos.length === filteredVideos.length ? "Clear Archive Selection" : "Claim Remaining Assets"}
                    </button>
                  </div>
                </div>
                <div className="flex gap-4">
                  <button className="flex items-center gap-2 p-4 bg-[#F2F2ED] hover:bg-[#E7F014] transition-all text-xs font-black uppercase tracking-widest"><HiDownload /> Batch Export</button>
                  <button className="flex items-center gap-2 p-4 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-all text-xs font-black uppercase tracking-widest"><HiTrash /> Decommission</button>
                  <button onClick={() => setSelectedVideos([])} className="p-4 bg-black/5 hover:bg-black/10 transition-all text-black"><HiX /></button>
                </div>
                <AnimatedLine className="absolute top-0 left-0 right-0" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Gallery Content */}
        {isLoading ? (
          <div className={cn(viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" : "space-y-6")}>
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white border border-gray-100 aspect-video animate-pulse" />
            ))}
          </div>
        ) : filteredVideos.length === 0 ? (
          <div className="bg-white border border-black/5 p-32 text-center relative group shadow-sm">
            <h3 className="text-4xl font-bold mb-4 text-black">No Archives Found</h3>
            <p className="text-black opacity-40 font-medium mb-12">Deployment repository empty for current operational parameters.</p>
            <Button onClick={clearFilters} variant="outline" className="mx-auto">Recalibrate Archive Filters</Button>
            <AnimatedLine className="absolute bottom-0 left-0 right-0" />
          </div>
        ) : (
          <div className={cn(viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-32" : "space-y-4 pb-32")}>
            {filteredVideos.map((video) => (
              <VideoCard key={video.id} video={video} viewMode={viewMode} onPlay={handlePlayVideo} onDownload={handleDownload} onDelete={handleDelete} onToggleFavorite={handleToggleFavorite} isSelected={selectedVideos.includes(video.id)} onSelect={handleSelectVideo} />
            ))}
          </div>
        )}
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {showVideoModal && (
          <Modal isOpen={showVideoModal} onClose={() => { setShowVideoModal(false); setActiveVideo(null); }} size="xl" title={activeVideo?.title}>
            <div className="space-y-8">
               <div className="bg-black aspect-video relative group overflow-hidden">
                  <video src={activeVideo?.videoUrl} poster={activeVideo?.thumbnail} controls autoPlay className="w-full h-full object-contain" />
                  <div className="absolute top-6 right-6 flex items-center gap-3">
                     <span className="bg-[#E7F014] text-black px-3 py-1 text-[10px] font-black uppercase tracking-widest shadow-xl">Original asset</span>
                  </div>
               </div>
               <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pt-4">
                  <div className="flex gap-12">
                     <div className="flex flex-col">
                        <span className="text-[10px] font-black text-black opacity-30 uppercase tracking-widest mb-1">Configuration</span>
                         <span className="text-lg font-bold text-black">{activeVideo?.template}</span>
                     </div>
                     <div className="flex flex-col">
                        <span className="text-[10px] font-black text-black opacity-30 uppercase tracking-widest mb-1">Resolution</span>
                         <span className="text-lg font-bold text-black">{activeVideo?.quality}</span>
                     </div>
                     <div className="flex flex-col">
                        <span className="text-[10px] font-black text-black opacity-30 uppercase tracking-widest mb-1">Deployment</span>
                         <span className="text-lg font-bold text-black">{formatRelativeTime(activeVideo?.createdAt)}</span>
                     </div>
                  </div>
                  <div className="flex gap-4">
                     <Button variant="secondary" onClick={() => handleDownload(activeVideo)} className="flex-1"><HiDownload className="w-4 h-4" /> Download</Button>
                     <Button className="flex-1">Share Mission Link <HiExternalLink className="w-4 h-4" /></Button>
                  </div>
               </div>
            </div>
          </Modal>
        )}
      </AnimatePresence>

      {/* Delete Confirmation */}
      <Modal isOpen={showDeleteModal} onClose={() => { setShowDeleteModal(false); setVideoToDelete(null); }} title="Critical Task: Decommission" size="sm">
         <div className="space-y-8 text-center pt-4">
            <div className="w-24 h-24 bg-red-50 text-red-600 rounded-none flex items-center justify-center mx-auto border border-red-100 shadow-xl">
               <HiTrash className="w-10 h-10" />
            </div>
             <div>
                <h3 className="text-2xl font-bold mb-2 text-black">Permanent Removal</h3>
                <p className="text-black opacity-60 font-medium">Attempting to decommission archive <span className="text-black font-extrabold">{videoToDelete?.title}</span>. This operational action is irreversible.</p>
             </div>
            <div className="grid grid-cols-2 gap-4">
               <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Abort Task</Button>
               <Button onClick={confirmDelete} className="bg-red-600 hover:bg-black text-white hover:text-white border-none">Execute</Button>
            </div>
         </div>
      </Modal>
    </div>
  );
} 
