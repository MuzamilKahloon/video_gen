import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiArrowLeft, HiDownload, HiShare, HiTrash, HiRefresh, HiPlay,
  HiPause, HiVolumeUp, HiVolumeOff, HiExternalLink,
  HiPhotograph, HiClock, HiExclamationCircle, HiLink,
  HiDuplicate, HiPencil, HiX, HiChevronLeft, HiChevronRight
} from "react-icons/hi";
import { cn } from "@utils/cn";
import { formatDate, formatDuration, formatFileSize } from "@utils/formatters";
import toast from "react-hot-toast";

// Minimal components
const AnimatedLine = ({ className = "" }) => (
  <div className={`h-[1px] bg-gray-200 overflow-hidden ${className}`}>
    <motion.div className="w-1/4 h-full bg-gradient-to-r from-transparent via-amber-400 to-transparent" animate={{ x: ["-100%", "400%"] }} transition={{ duration: 4, repeat: Infinity }} />
  </div>
);

const StatusBadge = ({ status }) => {
  const styles = {
    completed: "bg-green-100 text-green-700", processing: "bg-amber-100 text-amber-700",
    failed: "bg-red-100 text-red-700", draft: "bg-gray-100 text-gray-700",
    queued: "bg-blue-100 text-blue-700"
  };
  return <span className={`px-3 py-1 text-xs font-medium rounded-full ${styles[status] || styles.draft}`}>{status?.charAt(0).toUpperCase() + status?.slice(1)}</span>;
};

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

const VideoPlayer = ({ videoUrl, thumbnail }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const videoRef = useRef(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
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
    <div className="relative bg-black rounded-2xl overflow-hidden group w-full aspect-video" onMouseEnter={() => setShowControls(true)} onMouseLeave={() => !isPlaying && setShowControls(true)}>
      <video ref={videoRef} src={videoUrl} poster={thumbnail} className="w-full h-full object-cover" onTimeUpdate={handleTimeUpdate} onLoadedMetadata={handleLoadedMetadata} onEnded={() => setIsPlaying(false)} onClick={togglePlay} />
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
          <Button onClick={togglePlay} className="w-20 h-20 bg-amber-500 hover:bg-amber-600 rounded-full flex items-center justify-center shadow-xl">
            <HiPlay className="w-10 h-10 text-white ml-1" />
          </Button>
        </div>
      )}
      <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4 transition-opacity duration-300 ${showControls || !isPlaying ? "opacity-100" : "opacity-0"}`}>
        <div className="w-full h-1 bg-gray-700 rounded-full mb-3 cursor-pointer" onClick={handleSeek}>
          <div className="h-full bg-amber-500 rounded-full" style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }} />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button onClick={togglePlay} className="w-8 h-8 text-white hover:text-amber-500">
              {isPlaying ? <HiPause className="w-6 h-6" /> : <HiPlay className="w-6 h-6" />}
            </Button>
            <Button onClick={toggleMute} className="w-8 h-8 text-white hover:text-amber-500">
              {isMuted ? <HiVolumeOff className="w-5 h-5" /> : <HiVolumeUp className="w-5 h-5" />}
            </Button>
            <span className="text-sm text-gray-300">{formatDuration(Math.floor(currentTime))} / {formatDuration(Math.floor(duration))}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const ImageGallery = ({ images }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!images?.length) return <div className="aspect-video bg-gray-100 rounded-2xl flex items-center justify-center"><p className="text-gray-400">No images available</p></div>;

  return (
    <div>
      <div className="relative aspect-video bg-gray-100 rounded-2xl overflow-hidden mb-3 cursor-pointer group" onClick={() => setIsModalOpen(true)}>
        <img src={images[selectedIndex]?.url} alt={`Image ${selectedIndex + 1}`} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center"><HiPhotograph className="w-6 h-6 text-white" /></div>
          </div>
        </div>
        {images.length > 1 && (
          <>
            <Button onClick={(e) => { e.stopPropagation(); setSelectedIndex(prev => prev === 0 ? images.length - 1 : prev - 1); }} className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/90 hover:bg-black rounded-full opacity-0 group-hover:opacity-100">
              <HiChevronLeft className="w-5 h-5 text-white" />
            </Button>
            <Button onClick={(e) => { e.stopPropagation(); setSelectedIndex(prev => prev === images.length - 1 ? 0 : prev + 1); }} className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/90 hover:bg-black rounded-full opacity-0 group-hover:opacity-100">
              <HiChevronRight className="w-5 h-5 text-white" />
            </Button>
          </>
        )}
        <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/60 rounded-md text-xs text-white">{selectedIndex + 1} / {images.length}</div>
      </div>
      <div className="flex gap-2 overflow-x-auto pb-2">
        {images.map((image, index) => (
          <Button key={index} onClick={() => setSelectedIndex(index)} className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 ${selectedIndex === index ? "border-amber-500 ring-2 ring-amber-500/20" : "border-transparent hover:border-gray-300"}`}>
            <img src={image.thumbnail || image.url} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
          </Button>
        ))}
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} size="xl" title="Image Preview">
        <div className="relative">
          <img src={images[selectedIndex]?.url} alt={`Image ${selectedIndex + 1}`} className="w-full rounded-lg" />
          {images.length > 1 && (
            <div className="flex justify-center gap-4 mt-4">
              <Button onClick={() => setSelectedIndex(prev => prev === 0 ? images.length - 1 : prev - 1)} className="px-4 py-2 bg-gray-100 border border-gray-200 rounded-lg text-gray-600 hover:border-amber-400">
                <HiChevronLeft className="w-4 h-4" /> Previous
              </Button>
              <Button onClick={() => setSelectedIndex(prev => prev === images.length - 1 ? 0 : prev + 1)} className="px-4 py-2 bg-gray-100 border border-gray-200 rounded-lg text-gray-600 hover:border-amber-400">
                Next <HiChevronRight className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      </Modal>
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

  // Mock project data
  useEffect(() => {
    setTimeout(() => {
      setProject({
        _id: id,
        title: "Real Estate Walkthrough Video",
        status: "completed",
        createdAt: new Date().toISOString(),
        completedAt: new Date().toISOString(),
        sourceUrl: "https://example.com/listing",
        sourceType: "url",
        images: [
          { url: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&auto=format&fit=crop", thumbnail: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=200&auto=format&fit=crop" },
          { url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format&fit=crop", thumbnail: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=200&auto=format&fit=crop" },
          { url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop", thumbnail: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=200&auto=format&fit=crop" }
        ],
        video: {
          url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
          format: "mp4",
          width: 1920,
          height: 1080,
          size: 12582912
        },
        settings: {
          template: "real-estate",
          quality: "1080p",
          aspectRatio: "16:9",
          duration: 30
        },
        creditsUsed: 15,
        description: "A beautiful walkthrough video of a modern apartment"
      });
      setIsLoading(false);
    }, 800);
  }, [id]);

  const handleDelete = async () => {
    setActionLoading(true);
    await new Promise(r => setTimeout(r, 800));
    setActionLoading(false);
    setShowDeleteModal(false);
    navigate("/dashboard/projects");
    toast.success("Project deleted successfully");
  };

  const handleDuplicate = async () => {
    setActionLoading(true);
    await new Promise(r => setTimeout(r, 800));
    setActionLoading(false);
    toast.success("Project duplicated successfully!");
  };

  const handleEditSave = async (formData) => {
    setActionLoading(true);
    await new Promise(r => setTimeout(r, 800));
    setProject(prev => ({ ...prev, ...formData }));
    setActionLoading(false);
    setShowEditModal(false);
    toast.success("Project updated successfully!");
  };

  const handleDownload = (format = "mp4") => {
    toast.success(`Downloading as ${format.toUpperCase()}...`);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(project?.video?.url || "");
    toast.success("Link copied to clipboard!");
  };

  const handleRetry = () => toast.info("Retrying generation...");

  if (isLoading) return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white text-black p-6">
      <div className="mb-8">
        <div className="h-10 bg-gray-100 rounded-xl animate-pulse w-64" />
        <div className="h-4 bg-gray-100 rounded mt-2 w-96" />
      </div>
      <div className="grid grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => <div key={i} className="h-40 bg-gray-100 rounded-2xl animate-pulse" />)}
      </div>
    </div>
  );

  if (!project) return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white text-black p-6">
      <div className="bg-red-100 border border-red-200 rounded-2xl p-6 mb-4">
        <h3 className="font-medium text-red-700 mb-2">Project not found</h3>
        <p className="text-red-700">The project doesn't exist or has been deleted.</p>
      </div>
      <Link to="/dashboard/projects" className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg">
        <HiArrowLeft className="w-4 h-4" />Back to Projects
      </Link>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white text-black p-4 md:p-6 lg:p-8">
      <Helmet><title>{project.title} - VideoGen AI</title></Helmet>
      <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-400/5 rounded-full blur-[150px]" />
      </div>
      
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-start justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button onClick={() => navigate("/dashboard/projects")} className="p-2 hover:bg-gray-100 rounded-lg border border-gray-200">
              <HiArrowLeft className="w-5 h-5 text-gray-600" />
            </Button>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-3xl font-light text-black">{project.title}</h1>
                <StatusBadge status={project.status} />
              </div>
              <p className="text-gray-500">Created {formatDate(project.createdAt)}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {project.status === "completed" && (
              <>
                <Button onClick={() => setShowShareModal(true)} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-black rounded-lg">
                  <HiShare className="w-4 h-4" /> Share
                </Button>
                <Button onClick={() => handleDownload()} className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg shadow-lg">
                  <HiDownload className="w-4 h-4" /> Download
                </Button>
              </>
            )}
            {project.status === "failed" && (
              <Button onClick={handleRetry} className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg">
                <HiRefresh className="w-4 h-4" /> Retry
              </Button>
            )}
          </div>
        </motion.div>

        {project.status === "processing" && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <Card hover={false} className="p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-gray-600">Processing...</span>
                <span className="text-gray-500">45%</span>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <motion.div className="h-full bg-gradient-to-r from-amber-500 to-orange-500" initial={{ width: 0 }} animate={{ width: "45%" }} />
              </div>
            </Card>
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Card>
              <VideoPlayer videoUrl={project.video?.url} thumbnail={project.images?.[0]?.thumbnail} />
            </Card>
            <Card>
              <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <HiPhotograph className="w-5 h-5 text-gray-500" />
                  <h3 className="font-medium text-black">Source Images</h3>
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">{project.images?.length || 0} images</span>
                </div>
                {project.sourceUrl && (
                  <a href={project.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:text-amber-700 text-sm font-medium">
                    <HiExternalLink className="w-4 h-4" /> View Listing
                  </a>
                )}
              </div>
              <div className="p-6">
                <ImageGallery images={project.images || []} />
              </div>
            </Card>
          </div>

          <div className="space-y-8">
            <Card>
              <div className="p-6 border-b border-gray-200">
                <h3 className="font-medium text-black">Project Details</h3>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Status</span>
                  <StatusBadge status={project.status} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Template</span>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🏠</span>
                    <span className="font-medium">{project.settings?.template || "Custom"}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Quality</span>
                  <span className="font-medium">{project.settings?.quality || "1080p"}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Aspect Ratio</span>
                  <span className="font-medium">{project.settings?.aspectRatio || "16:9"}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Duration</span>
                  <span className="font-medium">{project.settings?.duration || 30}s</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Credits Used</span>
                  <span className="font-medium">{project.creditsUsed || 0} credits</span>
                </div>
                <div className="pt-4 border-t border-gray-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Created</span>
                    <span className="text-gray-500">{formatDate(project.createdAt)}</span>
                  </div>
                  {project.completedAt && (
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Completed</span>
                      <span className="text-gray-500">{formatDate(project.completedAt)}</span>
                    </div>
                  )}
                </div>
              </div>
            </Card>

            {project.status === "completed" && project.video && (
              <Card>
                <div className="p-6 border-b border-gray-200">
                  <h3 className="font-medium text-black">Video File</h3>
                </div>
                <div className="p-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Format</span>
                    <span className="font-medium uppercase">{project.video.format || "mp4"}</span>
                  </div>
                  {project.video.width && project.video.height && (
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Resolution</span>
                      <span className="font-medium">{project.video.width}x{project.video.height}</span>
                    </div>
                  )}
                  {project.video.size && (
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">File Size</span>
                      <span className="font-medium">{formatFileSize(project.video.size)}</span>
                    </div>
                  )}
                </div>
                <div className="p-6 pt-0">
                  <Button onClick={() => handleDownload("mp4")} className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white">
                    <HiDownload className="w-4 h-4" /> Download MP4
                  </Button>
                </div>
              </Card>
            )}

            {project.sourceUrl && (
              <Card>
                <div className="p-6 border-b border-gray-200 flex items-center gap-2">
                  <HiLink className="w-5 h-5 text-gray-500" />
                  <h3 className="font-medium text-black">Source URL</h3>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={project.sourceUrl}
                      readOnly
                      className="flex-1 bg-gray-100 border border-gray-200 rounded-lg px-3 py-2 outline-none text-sm text-gray-700"
                    />
                    <Button onClick={() => navigator.clipboard.writeText(project.sourceUrl)} className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg">
                      <HiDuplicate className="w-4 h-4 text-gray-600" />
                    </Button>
                  </div>
                </div>
              </Card>
            )}

            <Card>
              <div className="p-6 space-y-2">
                <Button onClick={handleDuplicate} disabled={actionLoading} className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 text-gray-700">
                  <HiDuplicate className="w-4 h-4" /> Duplicate Project
                </Button>
                <Button onClick={() => setShowEditModal(true)} disabled={!["draft", "failed"].includes(project.status)} className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 text-gray-700">
                  <HiPencil className="w-4 h-4" /> Edit Settings
                </Button>
                <Button onClick={() => setShowDeleteModal(true)} className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-red-50 text-red-600 hover:text-red-700">
                  <HiTrash className="w-4 h-4" /> Delete Project
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Modals */}
      <Modal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)} title="Delete Project" size="sm">
        <div className="space-y-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <HiTrash className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-xl font-medium text-black mb-2">Delete "{project.title}"?</h3>
            <p className="text-gray-600">This action cannot be undone.</p>
          </div>
          <div className="flex gap-3">
            <Button onClick={() => setShowDeleteModal(false)} className="flex-1 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-black rounded-lg">
              Cancel
            </Button>
            <Button onClick={handleDelete} disabled={actionLoading} className="flex-1 px-6 py-3 bg-red-100 hover:bg-red-200 text-red-600 hover:text-red-700 rounded-lg">
              {actionLoading ? "Deleting..." : "Delete"}
            </Button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={showShareModal} onClose={() => setShowShareModal(false)} title="Share Video">
        <div className="space-y-4">
          <p className="text-gray-600">Share this video with a direct link.</p>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={project.video?.url || ""}
              readOnly
              className="flex-1 bg-gray-100 border border-gray-200 rounded-lg px-3 py-2 outline-none text-gray-700"
            />
            <Button onClick={handleCopyLink} className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg">
              <HiDuplicate className="w-4 h-4" /> Copy
            </Button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={showEditModal} onClose={() => setShowEditModal(false)} title="Edit Project">
        <form onSubmit={(e) => {
          e.preventDefault();
          handleEditSave({
            title: e.target.title.value,
            description: e.target.description.value
          });
        }} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">Title</label>
            <input
              name="title"
              defaultValue={project.title}
              className="w-full bg-gray-100 border border-gray-200 rounded-lg px-4 py-2.5 text-black outline-none focus:border-amber-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">Description</label>
            <textarea
              name="description"
              defaultValue={project.description}
              className="w-full bg-gray-100 border border-gray-200 rounded-lg px-4 py-2.5 text-black outline-none focus:border-amber-400 min-h-[100px]"
            />
          </div>
          <div className="flex gap-3 pt-4">
            <Button type="button" onClick={() => setShowEditModal(false)} className="flex-1 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-black rounded-lg">
              Cancel
            </Button>
            <Button type="submit" disabled={actionLoading} className="flex-1 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg">
              {actionLoading ? "Saving..." : "Save"}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}