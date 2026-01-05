// client/src/pages/dashboard/ProjectsPage.jsx
import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {motion} from 'framer-motion';
import {
  HiPlus,
  HiSearch,
  HiFilter,
  HiFolder,
  HiEye,
  HiDownload,
  HiTrash,
  HiDotsVertical,
} from 'react-icons/hi';
import PageHeader from '@components/ui/PageHeader';
import Card from '@components/ui/Card';
import Button from '@components/ui/Button';
import Input from '@components/ui/Input';
import Select from '@components/ui/Select';
import EmptyState from '@components/ui/EmptyState';
import LoadingSpinner from '@components/ui/LoadingSpinner';
import StatusBadge from '@components/ui/StatusBadge';
import Modal from '@components/ui/Modal';
import {useProject} from '@hooks/useProject';
import {formatRelativeTime} from '@utils/formatters';
import toast from 'react-hot-toast';

const ProjectsPage = () => {
  const {projects, loading, fetchProjects, deleteProject} = useProject();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [viewMode, setViewMode] = useState('grid'); // grid or list
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDelete = async () => {
    if (!projectToDelete) return;

    const result = await deleteProject(projectToDelete._id);
    if (result.success) {
      setDeleteModalOpen(false);
      setProjectToDelete(null);
    }
  };

  const filteredProjects = projects?.filter((project) => {
    const matchesSearch =
      !searchQuery ||
      project.title?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      filterStatus === 'all' || project.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      <PageHeader
        title="Projects"
        subtitle="Manage all your video generation projects"
        actions={
          <Link to="/dashboard/projects/new">
            <Button>
              <HiPlus className="w-5 h-5" />
              New Project
            </Button>
          </Link>
        }
      />

      {/* Filters */}
      <Card className="mb-6">
        <Card.Body>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                leftIcon={<HiSearch className="w-5 h-5" />}
              />
            </div>
            <Select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              options={[
                {value: 'all', label: 'All Status'},
                {value: 'pending', label: 'Pending'},
                {value: 'processing', label: 'Processing'},
                {value: 'completed', label: 'Completed'},
                {value: 'failed', label: 'Failed'},
              ]}
              className="md:w-48"
            />
          </div>
        </Card.Body>
      </Card>

      {/* Projects Grid/List */}
      {loading ? (
        <Card>
          <Card.Body>
            <div className="py-12">
              <LoadingSpinner text="Loading projects..." />
            </div>
          </Card.Body>
        </Card>
      ) : filteredProjects && filteredProjects.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project._id}
              initial={{opacity: 0, y: 20}}
              animate={{opacity: 1, y: 0}}
              transition={{delay: index * 0.05}}
            >
              <Card hover>
                <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative overflow-hidden rounded-t-xl">
                  {project.status === 'completed' && project.thumbnailUrl ? (
                    <img
                      src={project.thumbnailUrl}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-6xl">🎬</div>
                  )}
                  <div className="absolute top-3 right-3">
                    <StatusBadge status={project.status} />
                  </div>
                </div>

                <Card.Body>
                  <div className="flex items-start justify-between mb-2">
                    <Link
                      to={`/dashboard/projects/${project._id}`}
                      className="flex-1"
                    >
                      <h3 className="font-semibold text-gray-900 hover:text-primary-600 transition-colors line-clamp-1">
                        {project.title || 'Untitled Project'}
                      </h3>
                    </Link>
                  </div>

                  <p className="text-sm text-gray-600 mb-4">
                    {formatRelativeTime(project.createdAt)}
                  </p>

                  <div className="flex items-center gap-2">
                    <Link
                      to={`/dashboard/projects/${project._id}`}
                      className="flex-1"
                    >
                      <Button variant="secondary" size="sm" className="w-full">
                        <HiEye className="w-4 h-4" />
                        View
                      </Button>
                    </Link>

                    {project.status === 'completed' && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          // Handle download
                          toast.success('Download started');
                        }}
                      >
                        <HiDownload className="w-4 h-4" />
                      </Button>
                    )}

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setProjectToDelete(project);
                        setDeleteModalOpen(true);
                      }}
                    >
                      <HiTrash className="w-4 h-4 text-error-600" />
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </motion.div>
          ))}
        </div>
      ) : (
        <Card>
          <Card.Body>
            <EmptyState
              icon={<HiFolder className="w-8 h-8" />}
              title={searchQuery ? 'No projects found' : 'No projects yet'}
              description={
                searchQuery
                  ? 'Try adjusting your search or filters'
                  : 'Create your first project to get started'
              }
              action={
                !searchQuery && (
                  <Link to="/dashboard/projects/new">
                    <Button>
                      <HiPlus className="w-5 h-5" />
                      Create Project
                    </Button>
                  </Link>
                )
              }
            />
          </Card.Body>
        </Card>
      )}

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title="Delete Project"
        footer={
          <>
            <Button variant="secondary" onClick={() => setDeleteModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              Delete
            </Button>
          </>
        }
      >
        <p className="text-gray-700">
          Are you sure you want to delete "
          <span className="font-medium">{projectToDelete?.title}</span>"? This
          action cannot be undone.
        </p>
      </Modal>
    </div>
  );
};

export default ProjectsPage;