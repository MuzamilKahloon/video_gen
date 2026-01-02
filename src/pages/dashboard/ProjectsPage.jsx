import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
import {
  HiPlus, HiSearch, HiFilter, HiFolder, HiEye,
  HiDownload, HiTrash, HiDotsVertical, HiClock, HiSparkles
} from "react-icons/hi";
import { cn } from "@utils/cn";
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
    pending: "bg-blue-100 text-blue-700"
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
          <Button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg text-gray-500"><HiDotsVertical className="w-5 h-5 rotate-90" /></Button>
        </div>
        <div className="p-6">{children}</div>
      </motion.div>
    </div>
  );
};

const formatRelativeTime = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);

  // Mock projects data
  useEffect(() => {
    setTimeout(() => {
      setProjects([
        {
          _id: "1",
          title: "Real Estate Walkthrough",
          status: "completed",
          createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          thumbnailUrl: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400&auto=format&fit=crop",
          videoUrl: "https://example.com/video1.mp4"
        },
        {
          _id: "2",
          title: "Product Demo Video",
          status: "processing",
          createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
          thumbnailUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w-400&auto=format&fit=crop"
        },
        {
          _id: "3",
          title: "Social Media Ad",
          status: "failed",
          createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
          thumbnailUrl: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&auto=format&fit=crop"
        },
        {
          _id: "4",
          title: "Real Estate Tour 4K",
          status: "completed",
          createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
          thumbnailUrl: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=400&auto=format&fit=crop"
        },
        {
          _id: "5",
          title: "E-commerce Product Video",
          status: "draft",
          createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
          _id: "6",
          title: "YouTube Intro",
          status: "pending",
          createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString()
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
    toast.success("Project deleted successfully");
  };

  const filteredProjects = projects.filter((project) => {
    const matchesSearch = !searchQuery || project.title?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === "all" || project.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white text-black p-4 md:p-6 lg:p-8">
      <Helmet><title>Projects - VideoGen AI</title></Helmet>
      <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-400/5 rounded-full blur-[150px]" />
      </div>
      
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-normal text-black mb-2">Projects</h1>
            <p className="text-lg text-gray-600">Manage all your video generation projects</p>
          </div>
          <Link to="/dashboard/projects/new">
            <Button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-lg shadow-lg flex items-center gap-2">
              <HiPlus className="w-5 h-5" /> New Project
            </Button>
          </Link>
        </motion.div>

        {/* Filters */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <Card hover={false} className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-gray-100 border border-gray-200 rounded-lg pl-10 pr-4 py-2.5 outline-none focus:border-amber-400"
                />
              </div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="md:w-48 bg-gray-100 border border-gray-200 rounded-lg px-4 py-2.5 outline-none focus:border-amber-400"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="completed">Completed</option>
                <option value="failed">Failed</option>
                <option value="draft">Draft</option>
              </select>
            </div>
          </Card>
        </motion.div>

        {/* Projects Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
                <div className="aspect-video bg-gray-100 animate-pulse" />
                <div className="p-6 space-y-3">
                  <div className="h-4 bg-gray-100 rounded animate-pulse" />
                  <div className="h-3 bg-gray-100 rounded animate-pulse w-24" />
                  <div className="h-10 bg-gray-100 rounded-lg animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredProjects.length > 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <Card key={project._id} className="overflow-hidden group">
                <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative overflow-hidden">
                  {project.thumbnailUrl ? (
                    <img
                      src={project.thumbnailUrl}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="text-6xl opacity-20">🎬</div>
                  )}
                  <div className="absolute top-3 right-3">
                    <StatusBadge status={project.status} />
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <Link to={`/dashboard/projects/${project._id}`} className="flex-1">
                      <h3 className="font-medium text-black hover:text-amber-600 transition-colors line-clamp-1">
                        {project.title || "Untitled Project"}
                      </h3>
                    </Link>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                    <HiClock className="w-4 h-4" />
                    {formatRelativeTime(project.createdAt)}
                  </div>

                  <div className="flex items-center gap-2">
                    <Link to={`/dashboard/projects/${project._id}`} className="flex-1">
                      <Button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-black rounded-lg">
                        <HiEye className="w-4 h-4" /> View
                      </Button>
                    </Link>

                    {project.status === "completed" && (
                      <Button
                        onClick={() => toast.success("Download started!")}
                        className="p-2 bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-black rounded-lg"
                      >
                        <HiDownload className="w-4 h-4" />
                      </Button>
                    )}

                    <Button
                      onClick={() => {
                        setProjectToDelete(project);
                        setDeleteModalOpen(true);
                      }}
                      className="p-2 bg-gray-100 hover:bg-red-50 text-gray-600 hover:text-red-600 rounded-lg"
                    >
                      <HiTrash className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </motion.div>
        ) : (
          <Card hover={false} className="p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <HiFolder className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-black mb-2">
              {searchQuery ? "No projects found" : "No projects yet"}
            </h3>
            <p className="text-gray-600 mb-6">
              {searchQuery
                ? "Try adjusting your search or filters"
                : "Create your first project to get started"}
            </p>
            {!searchQuery && (
              <Link to="/dashboard/projects/new">
                <Button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-lg shadow-lg">
                  <HiPlus className="w-4 h-4" /> Create Project
                </Button>
              </Link>
            )}
          </Card>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={deleteModalOpen} onClose={() => setDeleteModalOpen(false)} title="Delete Project" size="sm">
        <div className="space-y-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <HiTrash className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-xl font-medium text-black mb-2">Delete "{projectToDelete?.title}"?</h3>
            <p className="text-gray-600">This action cannot be undone.</p>
          </div>
          <div className="flex gap-3">
            <Button onClick={() => setDeleteModalOpen(false)} className="flex-1 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-black rounded-lg">
              Cancel
            </Button>
            <Button onClick={handleDelete} className="flex-1 px-6 py-3 bg-red-100 hover:bg-red-200 text-red-600 hover:text-red-700 rounded-lg">
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}