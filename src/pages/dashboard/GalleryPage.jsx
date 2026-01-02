import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiSearch, HiFilter, HiViewGrid, HiViewList, HiDownload,
  HiPlay, HiDotsVertical, HiTrash, HiExternalLink, HiVideoCamera,
  HiCheck, HiX, HiSortDescending, HiFolder, HiHeart, HiRefresh,
  HiSparkles
} from "react-icons/hi";
import { cn } from "@utils/cn";
import toast from "react-hot-toast";

// Minimal components
const AnimatedLine = ({ className = "" }) => (
  <div className={`h-[1px] bg-gray-200 overflow-hidden ${className}`}>
    <motion.div className="w-1/4 h-full bg-gradient-to-r from-transparent via-amber-400 to-transparent" animate={{ x: ["-100%", "400%"] }} transition={{ duration: 4, repeat: Infinity }} />
  </div>
);

const Button = ({ children, className = "", ...props }) => <button className={`px-4 py-2 font-medium rounded-lg transition-all ${className}`} {...props}>{children}</button>;

const Card = ({ children, className = "", hover = true }) => (
  <div className={`bg-white border border-gray-200 rounded-2xl ${hover ? "hover:border-gray-300 hover:shadow-xl" : ""} transition-all ${className}`}>
    {children}
  </div>
);

const Modal = ({ isOpen, onClose, title, children, size = "md" }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className={`bg-white border border-gray-200 rounded-2xl shadow-2xl w-full max-w-${size} max-h-[90vh] overflow-y-auto`} onClick={(e) => e.stopPropagation()}>
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-xl font-normal text-black">{title}</h2>
          <Button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg text-gray-500"><HiX className="w-5 h-5" /></Button>
        </div>
        <div className="p-6">{children}</div>
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
      <Card className="flex items-center gap-4 p-4">
        <input type="checkbox" checked={isSelected} onChange={() => onSelect(video.id)} className="w-4 h-4 text-amber-500 border-gray-300 rounded focus:ring-amber-500" />
        <div className="relative w-32 h-20 flex-shrink-0 rounded-lg overflow-hidden cursor-pointer group" onClick={() => onPlay(video)}>
          <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <HiPlay className="w-8 h-8 text-white" />
          </div>
          <div className="absolute bottom-1 right-1 px-1.5 py-0.5 bg-black/70 rounded text-xs text-white font-medium">
            {formatDuration(video.duration)}
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-medium text-black truncate">{video.title}</h3>
            {video.isFavorite && <HiHeart className="w-4 h-4 text-amber-500 flex-shrink-0" />}
          </div>
          <div className="flex items-center gap-3 mt-1 text-sm text-gray-500">
            <span className="flex items-center gap-1"><span>🎬</span>{video.template}</span>
            <span>{video.quality}</span>
          </div>
        </div>
        <div className="flex items-center gap-6 text-sm text-gray-500">
          <div className="text-right">
            <div className="text-black font-medium">{formatFileSize(video.size)}</div>
            <div>{formatRelativeTime(video.createdAt)}</div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Button onClick={() => onDownload(video)} className="p-2 text-gray-500 hover:text-black hover:bg-gray-100 rounded-lg"><HiDownload className="w-4 h-4" /></Button>
          <Button onClick={() => onToggleFavorite(video.id)} className={`p-2 rounded-lg ${video.isFavorite ? "text-amber-500 bg-amber-50" : "text-gray-500 hover:text-amber-500 hover:bg-gray-100"}`}><HiHeart className="w-4 h-4" /></Button>
          <div className="relative">
            <Button onClick={() => setShowMenu(!showMenu)} className="p-2 text-gray-500 hover:text-black hover:bg-gray-100 rounded-lg"><HiDotsVertical className="w-4 h-4" /></Button>
            {showMenu && (
              <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-xl shadow-xl z-50 min-w-[160px]">
                <Link to={`/dashboard/projects/${video.id}`} className="flex items-center gap-3 px-4 py-2 text-sm text-gray-600 hover:text-black hover:bg-gray-50">View Details</Link>
                <Button onClick={() => onDownload(video)} className="w-full flex items-center gap-3 px-4 py-2 text-sm text-left text-gray-600 hover:text-black hover:bg-gray-50">Download</Button>
                <Button onClick={() => onToggleFavorite(video.id)} className="w-full flex items-center gap-3 px-4 py-2 text-sm text-left text-gray-600 hover:text-black hover:bg-gray-50">
                  {video.isFavorite ? "Remove Favorite" : "Add Favorite"}
                </Button>
                <div className="h-px bg-gray-200 my-1" />
                <Button onClick={() => onDelete(video)} className="w-full flex items-center gap-3 px-4 py-2 text-sm text-left text-red-600 hover:text-red-700 hover:bg-red-50">Delete</Button>
              </div>
            )}
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="group overflow-hidden">
      <div className="relative aspect-video bg-gradient-to-br from-gray-100 to-gray-200 cursor-pointer overflow-hidden" onClick={() => onPlay(video)} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
        <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        <div className={`absolute inset-0 bg-black/40 transition-opacity flex items-center justify-center ${isHovered ? "opacity-100" : "opacity-0"}`}>
          <div className="w-14 h-14 bg-amber-500 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
            <HiPlay className="w-7 h-7 text-white ml-1" />
          </div>
        </div>
        <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/70 rounded-md text-xs text-white font-medium">{formatDuration(video.duration)}</div>
        {video.isFavorite && <div className="absolute top-2 right-2"><HiHeart className="w-5 h-5 text-amber-500" /></div>}
        <div className={`absolute top-2 left-2 transition-opacity ${isHovered || isSelected ? "opacity-100" : "opacity-0"}`}>
          <input type="checkbox" checked={isSelected} onChange={(e) => { e.stopPropagation(); onSelect(video.id); }} className="w-5 h-5 text-amber-500 border-2 border-white rounded focus:ring-amber-500 bg-gray-800" />
        </div>
        <div className="absolute top-2 left-10">
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${video.quality === "4k" ? "bg-amber-100 text-amber-700" : "bg-gray-100 text-gray-700"}`}>{video.quality}</span>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="font-medium text-black truncate">{video.title}</h3>
            <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
              <span className="flex items-center gap-1"><span>🎬</span>{video.template}</span>
              <span>•</span>
              <span>{video.aspectRatio}</span>
            </div>
          </div>
          <div className="relative">
            <Button onClick={() => setShowMenu(!showMenu)} className="p-2 text-gray-500 hover:text-black hover:bg-gray-100 rounded-lg"><HiDotsVertical className="w-4 h-4" /></Button>
            {showMenu && (
              <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-xl shadow-xl z-50 min-w-[160px]">
                <Link to={`/dashboard/projects/${video.id}`} className="flex items-center gap-3 px-4 py-2 text-sm text-gray-600 hover:text-black hover:bg-gray-50">View Details</Link>
                <Button onClick={() => onDownload(video)} className="w-full flex items-center gap-3 px-4 py-2 text-sm text-left text-gray-600 hover:text-black hover:bg-gray-50">Download</Button>
                <Button onClick={() => onToggleFavorite(video.id)} className="w-full flex items-center gap-3 px-4 py-2 text-sm text-left text-gray-600 hover:text-black hover:bg-gray-50">
                  {video.isFavorite ? "Remove Favorite" : "Add Favorite"}
                </Button>
                <div className="h-px bg-gray-200 my-1" />
                <Button onClick={() => onDelete(video)} className="w-full flex items-center gap-3 px-4 py-2 text-sm text-left text-red-600 hover:text-red-700 hover:bg-red-50">Delete</Button>
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200 text-sm text-gray-500">
          <span>{formatFileSize(video.size)}</span>
          <span>{formatRelativeTime(video.createdAt)}</span>
        </div>
      </div>
    </Card>
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
    toast.success(`Downloading "${video.title}"...`);
  };

  const handleDelete = (video) => {
    setVideoToDelete(video);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    setVideos(prev => prev.filter(v => v.id !== videoToDelete.id));
    setShowDeleteModal(false);
    setVideoToDelete(null);
    toast.success("Video deleted successfully");
  };

  const handleToggleFavorite = (videoId) => {
    setVideos(prev => prev.map(v => v.id === videoId ? { ...v, isFavorite: !v.isFavorite } : v));
  };

  const clearFilters = () => {
    setFilters({ template: "all", quality: "all", showFavoritesOnly: false });
    setSearchQuery("");
  };

  const hasActiveFilters = searchQuery || filters.template !== "all" || filters.quality !== "all" || filters.showFavoritesOnly;

  const stats = {
    total: videos.length,
    favorites: videos.filter(v => v.isFavorite).length,
    totalSize: videos.reduce((acc, v) => acc + v.size, 0),
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white text-black p-4 md:p-6 lg:p-8">
      <Helmet><title>Video Gallery - VideoGen AI</title></Helmet>
      <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-400/5 rounded-full blur-[150px]" />
      </div>
      
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-normal text-black mb-2">Video Gallery</h1>
            <p className="text-lg text-gray-600">Browse and manage all your generated videos</p>
          </div>
          <Link to="/dashboard/projects/new">
            <Button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-lg flex items-center gap-2">
              <HiVideoCamera className="w-5 h-5" /> Create New Video
            </Button>
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-6 mb-8 text-sm">
          <div className="flex items-center gap-2">
            <HiVideoCamera className="w-4 h-4 text-gray-500" />
            <span className="text-gray-600">{stats.total} videos</span>
          </div>
          <div className="flex items-center gap-2">
            <HiHeart className="w-4 h-4 text-amber-500" />
            <span className="text-gray-600">{stats.favorites} favorites</span>
          </div>
          <div className="flex items-center gap-2">
            <HiFolder className="w-4 h-4 text-gray-500" />
            <span className="text-gray-600">{formatFileSize(stats.totalSize)} total</span>
          </div>
        </motion.div>

        {/* Toolbar */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex items-center gap-3 flex-1">
            <div className="relative flex-1">
              <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input type="text" placeholder="Search videos..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full bg-gray-100 border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 outline-none focus:border-amber-400" />
            </div>
            <Button onClick={() => setShowFilters(!showFilters)} className={`px-4 py-2.5 bg-gray-100 border border-gray-200 rounded-xl hover:border-gray-300 ${showFilters ? "border-amber-400 text-amber-600" : "text-gray-600"}`}>
              <HiFilter className="w-4 h-4" /> Filters
            </Button>
            <Button onClick={() => setFilters(prev => ({ ...prev, showFavoritesOnly: !prev.showFavoritesOnly }))} className={`px-4 py-2.5 bg-gray-100 border border-gray-200 rounded-xl hover:border-gray-300 ${filters.showFavoritesOnly ? "border-amber-400 text-amber-600" : "text-gray-600"}`}>
              <HiHeart className="w-4 h-4" /> Favorites
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="bg-gray-100 border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:border-amber-400 min-w-[160px]">
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="name">Name (A-Z)</option>
              <option value="size">File Size</option>
            </select>
            <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
              <Button onClick={() => setViewMode("grid")} className={`p-2.5 ${viewMode === "grid" ? "bg-gray-100 text-black" : "text-gray-500 hover:text-black"}`}><HiViewGrid className="w-5 h-5" /></Button>
              <Button onClick={() => setViewMode("list")} className={`p-2.5 ${viewMode === "list" ? "bg-gray-100 text-black" : "text-gray-500 hover:text-black"}`}><HiViewList className="w-5 h-5" /></Button>
            </div>
          </div>
        </motion.div>

        {/* Filters Panel */}
        {showFilters && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="mb-8 overflow-hidden">
            <Card hover={false} className="p-4">
              <div className="flex flex-wrap items-center gap-4">
                <select value={filters.template} onChange={(e) => setFilters(prev => ({ ...prev, template: e.target.value }))} className="bg-gray-100 border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:border-amber-400 min-w-[180px]">
                  <option value="all">All Templates</option>
                  <option value="cinematic">Cinematic</option>
                  <option value="dynamic">Dynamic</option>
                  <option value="elegant">Elegant</option>
                  <option value="property">Property</option>
                  <option value="aerial">Aerial</option>
                </select>
                <select value={filters.quality} onChange={(e) => setFilters(prev => ({ ...prev, quality: e.target.value }))} className="bg-gray-100 border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:border-amber-400 min-w-[180px]">
                  <option value="all">All Qualities</option>
                  <option value="720p">720p HD</option>
                  <option value="1080p">1080p Full HD</option>
                  <option value="4k">4K Ultra HD</option>
                </select>
                {hasActiveFilters && <Button onClick={clearFilters} className="px-4 py-2 text-gray-600 hover:text-black hover:bg-gray-100"><HiX className="w-4 h-4" /> Clear all</Button>}
              </div>
            </Card>
          </motion.div>
        )}

        {/* Bulk Actions */}
        {selectedVideos.length > 0 && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="mb-8">
            <Card hover={false} className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Button onClick={handleSelectAll} className="px-3 py-2 text-gray-600 hover:text-black hover:bg-gray-100">
                    {selectedVideos.length === filteredVideos.length ? <HiX className="w-4 h-4" /> : <HiCheck className="w-4 h-4" />}
                    {selectedVideos.length === filteredVideos.length ? "Deselect all" : "Select all"}
                  </Button>
                  <span className="text-amber-600 font-medium">{selectedVideos.length} selected</span>
                </div>
                <div className="flex items-center gap-2">
                  <Button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-black"><HiDownload className="w-4 h-4" /> Download All</Button>
                  <Button className="px-4 py-2 bg-red-100 hover:bg-red-200 text-red-600 hover:text-red-700"><HiTrash className="w-4 h-4" /> Delete</Button>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Content */}
        {isLoading ? (
          <div className={cn(viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" : "space-y-6")}>
            {[...Array(8)].map((_, i) => (
              <div key={i} className={cn("bg-white border border-gray-200 rounded-2xl overflow-hidden", viewMode === "grid" ? "aspect-[4/3]" : "h-24")}>
                <div className="w-full h-full bg-gray-100 animate-pulse" />
              </div>
            ))}
          </div>
        ) : filteredVideos.length === 0 ? (
          <Card hover={false} className="p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <HiVideoCamera className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-black mb-2">No videos found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your filters</p>
            <Button onClick={clearFilters} className="bg-gradient-to-r from-amber-500 to-orange-500 text-white">
              <HiRefresh className="w-4 h-4" /> Clear Filters
            </Button>
          </Card>
        ) : (
          <div className={cn(viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" : "space-y-6")}>
            {filteredVideos.map((video) => (
              <VideoCard key={video.id} video={video} viewMode={viewMode} onPlay={handlePlayVideo} onDownload={handleDownload} onDelete={handleDelete} onToggleFavorite={handleToggleFavorite} isSelected={selectedVideos.includes(video.id)} onSelect={handleSelectVideo} />
            ))}
          </div>
        )}
      </div>

      {/* Video Modal */}
      <Modal isOpen={showVideoModal} onClose={() => { setShowVideoModal(false); setActiveVideo(null); }} size="xl" title={activeVideo?.title}>
        {activeVideo && (
          <div className="space-y-4">
            <video src={activeVideo.videoUrl} poster={activeVideo.thumbnail} controls autoPlay className="w-full rounded-xl" />
            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div className="text-sm text-gray-600">
                {formatDuration(activeVideo.duration)} • {activeVideo.quality} • {formatFileSize(activeVideo.size)}
              </div>
              <div className="flex gap-2">
                <Button onClick={() => handleDownload(activeVideo)} className="bg-gradient-to-r from-amber-500 to-orange-500 text-white">
                  <HiDownload className="w-4 h-4" /> Download
                </Button>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Delete Modal */}
      <Modal isOpen={showDeleteModal} onClose={() => { setShowDeleteModal(false); setVideoToDelete(null); }} title="Delete Video" size="sm">
        <div className="space-y-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <HiTrash className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-xl font-medium text-black mb-2">Delete "{videoToDelete?.title}"?</h3>
            <p className="text-gray-600">This action cannot be undone.</p>
          </div>
          <div className="flex gap-3">
            <Button onClick={() => { setShowDeleteModal(false); setVideoToDelete(null); }} className="flex-1 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-black rounded-lg">
              Cancel
            </Button>
            <Button onClick={confirmDelete} className="flex-1 px-6 py-3 bg-red-100 hover:bg-red-200 text-red-600 hover:text-red-700 rounded-lg">
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
} 