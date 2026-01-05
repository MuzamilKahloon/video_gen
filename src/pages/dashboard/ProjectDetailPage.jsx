// client/src/pages/dashboard/ProjectDetailPage.jsx
import {useState, useEffect, useRef} from "react";
import {useParams, useNavigate, Link} from "react-router-dom";
import {Helmet} from "react-helmet-async";
import {motion} from "framer-motion";
import {
	HiArrowLeft,
	HiDownload,
	HiShare,
	HiTrash,
	HiRefresh,
	HiPlay,
	HiPause,
	HiVolumeUp,
	HiVolumeOff,
	HiDotsVertical,
	HiExternalLink,
	HiPhotograph,
	HiClock,
	HiCog,
	HiCheckCircle,
	HiExclamationCircle,
	HiLink,
	HiDuplicate,
	HiPencil,
	HiX,
	HiChevronLeft,
	HiChevronRight,
} from "react-icons/hi";
import {cn} from "@utils/cn";
import {
	formatDate,
	formatRelativeTime,
	formatDuration,
	formatFileSize,
} from "@utils/formatters";
import {JOB_STATUS_CONFIG, VIDEO_TEMPLATES} from "@utils/constants";
import Badge from "@components/ui/Badge";
import StatusBadge from "@components/ui/StatusBadge";
import Card from "@components/ui/Card";
import Modal from "@components/ui/Modal";
import Skeleton from "@components/ui/Skeleton";
import Alert from "@components/ui/Alert";
import Input from "@components/ui/Input";
import Select from "@components/ui/Select";
import {useProject} from "@hooks/useProject";
import toast from "react-hot-toast";

// Video Player Component
const VideoPlayer = ({videoUrl, thumbnail, onClose, isModal = false}) => {
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
		<div
			className={cn(
				"relative bg-gray-900 rounded-xl overflow-hidden group",
				"w-full aspect-video"
			)}
			onMouseEnter={() => setShowControls(true)}
			onMouseLeave={() => !isPlaying && setShowControls(true)}
		>
			<video
				ref={videoRef}
				src={videoUrl}
				poster={thumbnail}
				className="w-full h-full object-cover"
				onTimeUpdate={handleTimeUpdate}
				onLoadedMetadata={handleLoadedMetadata}
				onEnded={() => setIsPlaying(false)}
				onClick={togglePlay}
			/>

			{/* Play button overlay */}
			{!isPlaying && (
				<div className="absolute inset-0 flex items-center justify-center bg-black/30">
					<button
						onClick={togglePlay}
						className="w-20 h-20 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-all shadow-xl hover:scale-105"
					>
						<HiPlay className="w-10 h-10 text-gray-900 ml-1" />
					</button>
				</div>
			)}

			{/* Controls */}
			<div
				className={cn(
					"absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 transition-opacity duration-300",
					showControls || !isPlaying ? "opacity-100" : "opacity-0"
				)}
			>
				{/* Progress bar */}
				<div
					className="w-full h-1 bg-white/30 rounded-full mb-3 cursor-pointer"
					onClick={handleSeek}
				>
					<div
						className="h-full bg-white rounded-full transition-all"
						style={{width: `${duration ? (currentTime / duration) * 100 : 0}%`}}
					/>
				</div>

				<div className="flex items-center justify-between">
					<div className="flex items-center gap-3">
						<button
							onClick={togglePlay}
							className="w-8 h-8 flex items-center justify-center text-white hover:text-primary-400 transition-colors"
						>
							{isPlaying ? (
								<HiPause className="w-6 h-6" />
							) : (
								<HiPlay className="w-6 h-6" />
							)}
						</button>

						<button
							onClick={toggleMute}
							className="w-8 h-8 flex items-center justify-center text-white hover:text-primary-400 transition-colors"
						>
							{isMuted ? (
								<HiVolumeOff className="w-5 h-5" />
							) : (
								<HiVolumeUp className="w-5 h-5" />
							)}
						</button>

						<span className="text-sm text-white/80">
							{formatDuration(Math.floor(currentTime))} /{" "}
							{formatDuration(Math.floor(duration))}
						</span>
					</div>

					{isModal && onClose && (
						<button
							onClick={onClose}
							className="w-8 h-8 flex items-center justify-center text-white hover:text-primary-400 transition-colors"
						>
							<HiX className="w-5 h-5" />
						</button>
					)}
				</div>
			</div>
		</div>
	);
};

// Image Gallery Component
const ImageGallery = ({images}) => {
	const [selectedIndex, setSelectedIndex] = useState(0);
	const [isModalOpen, setIsModalOpen] = useState(false);

	if (!images || images.length === 0) {
		return (
			<div className="aspect-video bg-gray-100 rounded-xl flex items-center justify-center">
				<p className="text-gray-500">No images available</p>
			</div>
		);
	}

	const goToPrevious = () => {
		setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
	};

	const goToNext = () => {
		setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
	};

	return (
		<div>
			{/* Main Image */}
			<div
				className="relative aspect-video bg-gray-100 rounded-xl overflow-hidden mb-3 cursor-pointer group"
				onClick={() => setIsModalOpen(true)}
			>
				<img
					src={images[selectedIndex]?.url || images[selectedIndex]?.thumbnail}
					alt={images[selectedIndex]?.caption || `Image ${selectedIndex + 1}`}
					className="w-full h-full object-cover"
				/>
				<div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
					<div className="opacity-0 group-hover:opacity-100 transition-opacity">
						<div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
							<HiPhotograph className="w-6 h-6 text-gray-700" />
						</div>
					</div>
				</div>

				{/* Navigation arrows */}
				{images.length > 1 && (
					<>
						<button
							onClick={(e) => {
								e.stopPropagation();
								goToPrevious();
							}}
							className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
						>
							<HiChevronLeft className="w-5 h-5 text-gray-700" />
						</button>
						<button
							onClick={(e) => {
								e.stopPropagation();
								goToNext();
							}}
							className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
						>
							<HiChevronRight className="w-5 h-5 text-gray-700" />
						</button>
					</>
				)}

				{/* Image counter */}
				<div className="absolute bottom-2 right-2 px-2 py-1 bg-black/60 rounded-md text-xs text-white">
					{selectedIndex + 1} / {images.length}
				</div>
			</div>

			{/* Thumbnail strip */}
			<div className="flex gap-2 overflow-x-auto pb-2">
				{images.map((image, index) => (
					<button
						key={image._id || index}
						onClick={() => setSelectedIndex(index)}
						className={cn(
							"flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all",
							selectedIndex === index
								? "border-primary-500 ring-2 ring-primary-100"
								: "border-transparent hover:border-gray-300"
						)}
					>
						<img
							src={image.thumbnail || image.url}
							alt={image.caption || `Thumbnail ${index + 1}`}
							className="w-full h-full object-cover"
						/>
					</button>
				))}
			</div>

			{/* Fullscreen Modal */}
			<Modal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				size="xl"
				title={images[selectedIndex]?.caption || "Image Preview"}
			>
				<div className="relative">
					<img
						src={images[selectedIndex]?.url}
						alt={images[selectedIndex]?.caption}
						className="w-full rounded-lg"
					/>
					{images.length > 1 && (
						<div className="flex justify-center gap-4 mt-4">
							<button onClick={goToPrevious} className="btn-secondary btn-sm">
								<HiChevronLeft className="w-4 h-4" />
								Previous
							</button>
							<button onClick={goToNext} className="btn-secondary btn-sm">
								Next
								<HiChevronRight className="w-4 h-4" />
							</button>
						</div>
					)}
				</div>
			</Modal>
		</div>
	);
};

// Processing Steps Component
const ProcessingSteps = ({steps}) => {
	if (!steps || steps.length === 0) return null;

	return (
		<div className="space-y-3">
			{steps.map((step, index) => {
				const isCompleted = step.status === "completed";
				const isActive = step.status === "processing";
				const isPending = step.status === "pending";

				return (
					<div key={step.name} className="flex items-center gap-3">
						<div
							className={cn(
								"flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center",
								isCompleted && "bg-success-100 text-success-600",
								isActive && "bg-primary-100 text-primary-600",
								isPending && "bg-gray-100 text-gray-400"
							)}
						>
							{isCompleted ? (
								<HiCheckCircle className="w-5 h-5" />
							) : isActive ? (
								<div className="w-4 h-4 border-2 border-primary-600 border-t-transparent rounded-full animate-spin" />
							) : (
								<span className="text-sm font-medium">{index + 1}</span>
							)}
						</div>

						<div className="flex-1">
							<p
								className={cn(
									"text-sm font-medium",
									isCompleted && "text-gray-900",
									isActive && "text-primary-600",
									isPending && "text-gray-400"
								)}
							>
								{step.name}
							</p>
							{step.duration && isCompleted && (
								<p className="text-xs text-gray-500">
									Completed in {step.duration}s
								</p>
							)}
						</div>
					</div>
				);
			})}
		</div>
	);
};

// Edit Settings Modal Component
const EditSettingsModal = ({isOpen, onClose, project, onSave, loading}) => {
	const [formData, setFormData] = useState({
		title: project?.title || "",
		description: project?.description || "",
	});

	useEffect(() => {
		if (project) {
			setFormData({
				title: project.title || "",
				description: project.description || "",
			});
		}
	}, [project]);

	const handleSubmit = (e) => {
		e.preventDefault();
		onSave(formData);
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose} title="Edit Project Settings">
			<form onSubmit={handleSubmit} className="p-6 space-y-4">
				<Input
					label="Project Title"
					value={formData.title}
					onChange={(e) => setFormData({...formData, title: e.target.value})}
					placeholder="Enter project title"
				/>

				<div>
					<label className="label">Description</label>
					<textarea
						value={formData.description}
						onChange={(e) =>
							setFormData({...formData, description: e.target.value})
						}
						placeholder="Enter project description (optional)"
						className="input min-h-[100px]"
					/>
				</div>

				<div className="flex gap-3 pt-4">
					<button
						type="button"
						onClick={onClose}
						className="btn-secondary btn-md flex-1"
					>
						Cancel
					</button>
					<button
						type="submit"
						disabled={loading}
						className="btn-primary btn-md flex-1"
					>
						{loading ? "Saving..." : "Save Changes"}
					</button>
				</div>
			</form>
		</Modal>
	);
};

// Main Component
const ProjectDetailPage = () => {
	const {id} = useParams();
	const navigate = useNavigate();
	const {fetchProject, updateProject, deleteProject, loading} = useProject();

	const [project, setProject] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [showShareModal, setShowShareModal] = useState(false);
	const [showEditModal, setShowEditModal] = useState(false);
	const [actionLoading, setActionLoading] = useState(false);

	// Fetch project on mount
	useEffect(() => {
		const loadProject = async () => {
			setIsLoading(true);
			const result = await fetchProject(id);
			if (result.success) {
				setProject(result.data);
			} else {
				toast.error("Failed to load project");
			}
			setIsLoading(false);
		};
		loadProject();
	}, [id]);

	// Poll for status updates if processing
	useEffect(() => {
		if (project?.status === "processing") {
			const interval = setInterval(async () => {
				const result = await fetchProject(id);
				if (result.success) {
					setProject(result.data);
					if (result.data.status !== "processing") {
						clearInterval(interval);
						if (result.data.status === "completed") {
							toast.success("Video generation completed!");
						} else if (result.data.status === "failed") {
							toast.error("Video generation failed");
						}
					}
				}
			}, 5000); // Poll every 5 seconds

			return () => clearInterval(interval);
		}
	}, [project?.status, id]);

	const handleDelete = async () => {
		setActionLoading(true);
		const result = await deleteProject(id);
		setActionLoading(false);

		if (result.success) {
			setShowDeleteModal(false);
			navigate("/dashboard/projects");
		}
	};

	const handleDuplicate = async () => {
		setActionLoading(true);
		try {
			// Create a new project with the same settings
			const {createProject} = await import("@services/project.service").then(
				(m) => m.default
			);
			const response = await createProject({
				title: `${project.title} (Copy)`,
				description: project.description,
				sourceUrl: project.sourceUrl,
				sourceType: project.sourceType,
				settings: project.settings,
			});

			toast.success("Project duplicated successfully!");
			navigate(`/dashboard/projects/${response.data.project._id}`);
		} catch (err) {
			toast.error("Failed to duplicate project");
		} finally {
			setActionLoading(false);
		}
	};

	const handleEditSave = async (formData) => {
		setActionLoading(true);
		const result = await updateProject(id, formData);
		setActionLoading(false);

		if (result.success) {
			setProject({...project, ...formData});
			setShowEditModal(false);
			toast.success("Project updated successfully!");
		}
	};

	const handleDownload = (format = "mp4") => {
		if (!project?.video?.url) {
			toast.error("Video not available for download");
			return;
		}

		const link = document.createElement("a");
		link.href = project.video.url;
		link.download = `${project.title.replace(/\s+/g, "_")}.${format}`;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
		toast.success("Download started!");
	};

	const handleCopyLink = () => {
		if (project?.video?.url) {
			navigator.clipboard.writeText(project.video.url);
			toast.success("Link copied to clipboard!");
		}
	};

	const handleRetry = async () => {
		// Navigate to regenerate or trigger regeneration
		toast.info("Retry functionality coming soon");
	};

	if (isLoading) {
		return (
			<div className="p-6">
				<div className="flex items-center gap-4 mb-6">
					<Skeleton className="w-10 h-10 rounded-lg" />
					<div>
						<Skeleton className="h-6 w-48 mb-2" />
						<Skeleton className="h-4 w-32" />
					</div>
				</div>
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
					<div className="lg:col-span-2">
						<Skeleton className="aspect-video rounded-xl mb-6" />
						<Skeleton className="h-40 rounded-xl" />
					</div>
					<div>
						<Skeleton className="h-80 rounded-xl" />
					</div>
				</div>
			</div>
		);
	}

	if (!project) {
		return (
			<div className="p-6">
				<Alert variant="error" title="Project not found">
					The project you're looking for doesn't exist or has been deleted.
				</Alert>
				<Link to="/dashboard/projects" className="btn-primary btn-md mt-4">
					<HiArrowLeft className="w-4 h-4" />
					Back to Projects
				</Link>
			</div>
		);
	}

	const template = VIDEO_TEMPLATES.find(
		(t) => t.id === project.settings?.template
	);

	return (
		<>
			<Helmet>
				<title>{project.title} - VideoGen AI</title>
			</Helmet>

			<div className="p-6">
				{/* Header */}
				<div className="flex items-start justify-between mb-6">
					<div className="flex items-center gap-4">
						<button
							onClick={() => navigate("/dashboard/projects")}
							className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
						>
							<HiArrowLeft className="w-5 h-5 text-gray-600" />
						</button>
						<div>
							<div className="flex items-center gap-3">
								<h1 className="text-2xl font-bold text-gray-900">
									{project.title}
								</h1>
								<StatusBadge status={project.status} />
							</div>
							<p className="text-sm text-gray-500 mt-1">
								Created {formatRelativeTime(project.createdAt)} · ID:{" "}
								{project._id}
							</p>
						</div>
					</div>

					<div className="flex items-center gap-2">
						{project.status === "completed" && (
							<>
								<button
									onClick={() => setShowShareModal(true)}
									className="btn-secondary btn-md"
								>
									<HiShare className="w-4 h-4" />
									Share
								</button>
								<button
									onClick={() => handleDownload()}
									className="btn-primary btn-md"
								>
									<HiDownload className="w-4 h-4" />
									Download
								</button>
							</>
						)}

						{project.status === "failed" && (
							<button onClick={handleRetry} className="btn-primary btn-md">
								<HiRefresh className="w-4 h-4" />
								Retry
							</button>
						)}
					</div>
				</div>

				{/* Progress Bar for Processing */}
				{project.status === "processing" && (
					<Card className="mb-6">
						<Card.Body>
							<div className="flex items-center justify-between mb-2">
								<span className="text-sm font-medium text-gray-700">
									{project.statusMessage || "Processing..."}
								</span>
								<span className="text-sm text-gray-500">
									{project.progress || 0}%
								</span>
							</div>
							<div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
								<div
									className="h-full bg-primary-600 transition-all duration-500"
									style={{width: `${project.progress || 0}%`}}
								/>
							</div>
						</Card.Body>
					</Card>
				)}

				{/* Main Content */}
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
					{/* Left Column - Video/Preview */}
					<div className="lg:col-span-2 space-y-6">
						{/* Video Player or Preview */}
						<Card>
							<Card.Body className="p-0">
								{project.status === "completed" && project.video ? (
									<VideoPlayer
										videoUrl={project.video.url}
										thumbnail={project.images?.[0]?.thumbnail}
									/>
								) : project.status === "processing" ? (
									<div className="aspect-video bg-gray-100 rounded-xl flex flex-col items-center justify-center">
										<div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mb-4" />
										<p className="text-lg font-medium text-gray-900 mb-2">
											Generating your video...
										</p>
										<p className="text-sm text-gray-500">
											This usually takes 2-5 minutes
										</p>
									</div>
								) : project.status === "failed" ? (
									<div className="aspect-video bg-error-50 rounded-xl flex flex-col items-center justify-center">
										<HiExclamationCircle className="w-16 h-16 text-error-500 mb-4" />
										<p className="text-lg font-medium text-gray-900 mb-2">
											Video generation failed
										</p>
										<p className="text-sm text-gray-500 mb-4">
											{project.errorMessage ||
												"There was an error processing your video"}
										</p>
										<button
											onClick={handleRetry}
											className="btn-primary btn-md"
										>
											<HiRefresh className="w-4 h-4" />
											Try Again
										</button>
									</div>
								) : (
									<div className="aspect-video bg-gray-100 rounded-xl flex flex-col items-center justify-center">
										<HiClock className="w-16 h-16 text-gray-400 mb-4" />
										<p className="text-lg font-medium text-gray-900 mb-2">
											{project.status === "draft"
												? "Ready to generate"
												: "Waiting in queue"}
										</p>
										<p className="text-sm text-gray-500">
											{project.status === "draft"
												? "Configure your settings and start generation"
												: "Your video will start processing soon"}
										</p>
									</div>
								)}
							</Card.Body>
						</Card>

						{/* Source Images */}
						<Card>
							<Card.Header>
								<div className="flex items-center justify-between">
									<div className="flex items-center gap-2">
										<HiPhotograph className="w-5 h-5 text-gray-500" />
										<h3 className="font-semibold text-gray-900">
											Source Images
										</h3>
										<Badge variant="gray">
											{project.images?.length || 0} images
										</Badge>
									</div>
									{project.sourceUrl && (
										<a
											href={project.sourceUrl}
											target="_blank"
											rel="noopener noreferrer"
											className="btn-ghost btn-sm text-primary-600"
										>
											<HiExternalLink className="w-4 h-4" />
											View Listing
										</a>
									)}
								</div>
							</Card.Header>
							<Card.Body>
								<ImageGallery images={project.images || []} />
							</Card.Body>
						</Card>
					</div>

					{/* Right Column - Details */}
					<div className="space-y-6">
						{/* Project Info */}
						<Card>
							<Card.Header>
								<h3 className="font-semibold text-gray-900">Project Details</h3>
							</Card.Header>
							<Card.Body className="space-y-4">
								<div className="flex items-center justify-between">
									<span className="text-sm text-gray-500">Status</span>
									<StatusBadge status={project.status} />
								</div>

								<div className="flex items-center justify-between">
									<span className="text-sm text-gray-500">Template</span>
									<div className="flex items-center gap-2">
										<span>{template?.icon}</span>
										<span className="text-sm font-medium text-gray-900">
											{template?.name || project.settings?.template}
										</span>
									</div>
								</div>

								<div className="flex items-center justify-between">
									<span className="text-sm text-gray-500">Quality</span>
									<span className="text-sm font-medium text-gray-900">
										{project.settings?.quality || "1080p"}
									</span>
								</div>

								<div className="flex items-center justify-between">
									<span className="text-sm text-gray-500">Aspect Ratio</span>
									<span className="text-sm font-medium text-gray-900">
										{project.settings?.aspectRatio || "16:9"}
									</span>
								</div>

								{project.settings?.duration && (
									<div className="flex items-center justify-between">
										<span className="text-sm text-gray-500">Duration</span>
										<span className="text-sm font-medium text-gray-900">
											{project.settings.duration}s
										</span>
									</div>
								)}

								<div className="flex items-center justify-between">
									<span className="text-sm text-gray-500">Credits Used</span>
									<span className="text-sm font-medium text-gray-900">
										{project.creditsUsed || project.estimatedCredits || 0}{" "}
										credits
									</span>
								</div>

								<div className="border-t border-gray-100 pt-4">
									<div className="flex items-center justify-between mb-2">
										<span className="text-sm text-gray-500">Created</span>
										<span className="text-sm text-gray-900">
											{formatDate(project.createdAt)}
										</span>
									</div>
									{project.completedAt && (
										<div className="flex items-center justify-between">
											<span className="text-sm text-gray-500">Completed</span>
											<span className="text-sm text-gray-900">
												{formatDate(project.completedAt)}
											</span>
										</div>
									)}
								</div>
							</Card.Body>
						</Card>

						{/* Video File Info */}
						{project.status === "completed" && project.video && (
							<Card>
								<Card.Header>
									<h3 className="font-semibold text-gray-900">Video File</h3>
								</Card.Header>
								<Card.Body className="space-y-3">
									<div className="flex items-center justify-between">
										<span className="text-sm text-gray-500">Format</span>
										<span className="text-sm font-medium text-gray-900 uppercase">
											{project.video.format || "mp4"}
										</span>
									</div>
									{project.video.width && project.video.height && (
										<div className="flex items-center justify-between">
											<span className="text-sm text-gray-500">Resolution</span>
											<span className="text-sm font-medium text-gray-900">
												{project.video.width}x{project.video.height}
											</span>
										</div>
									)}
									{project.video.size && (
										<div className="flex items-center justify-between">
											<span className="text-sm text-gray-500">File Size</span>
											<span className="text-sm font-medium text-gray-900">
												{formatFileSize(project.video.size)}
											</span>
										</div>
									)}
								</Card.Body>
								<Card.Footer>
									<div className="flex gap-2">
										<button
											onClick={() => handleDownload("mp4")}
											className="btn-primary btn-sm flex-1"
										>
											<HiDownload className="w-4 h-4" />
											MP4
										</button>
									</div>
								</Card.Footer>
							</Card>
						)}

						{/* Source URL */}
						{project.sourceUrl && (
							<Card>
								<Card.Header>
									<div className="flex items-center gap-2">
										<HiLink className="w-5 h-5 text-gray-500" />
										<h3 className="font-semibold text-gray-900">Source URL</h3>
									</div>
								</Card.Header>
								<Card.Body>
									<div className="flex items-center gap-2">
										<input
											type="text"
											value={project.sourceUrl}
											readOnly
											className="input text-xs truncate"
										/>
										<button
											onClick={() => {
												navigator.clipboard.writeText(project.sourceUrl);
												toast.success("URL copied!");
											}}
											className="btn-ghost btn-sm flex-shrink-0"
										>
											<HiDuplicate className="w-4 h-4" />
										</button>
									</div>
								</Card.Body>
							</Card>
						)}

						{/* Actions */}
						<Card>
							<Card.Body className="space-y-2">
								<button
									onClick={handleDuplicate}
									disabled={actionLoading}
									className="btn-ghost btn-md w-full justify-start"
								>
									<HiDuplicate className="w-4 h-4" />
									Duplicate Project
								</button>
								<button
									onClick={() => setShowEditModal(true)}
									disabled={!["draft", "failed"].includes(project.status)}
									className="btn-ghost btn-md w-full justify-start disabled:opacity-50"
								>
									<HiPencil className="w-4 h-4" />
									Edit Settings
								</button>
								<button
									onClick={() => setShowDeleteModal(true)}
									className="btn-ghost btn-md w-full justify-start text-error-600 hover:bg-error-50"
								>
									<HiTrash className="w-4 h-4" />
									Delete Project
								</button>
							</Card.Body>
						</Card>
					</div>
				</div>
			</div>

			{/* Delete Confirmation Modal */}
			<Modal
				isOpen={showDeleteModal}
				onClose={() => setShowDeleteModal(false)}
				title="Delete Project"
				size="sm"
			>
				<div className="p-6">
					<div className="flex items-center justify-center w-12 h-12 bg-error-100 rounded-full mx-auto mb-4">
						<HiTrash className="w-6 h-6 text-error-600" />
					</div>
					<h3 className="text-lg font-semibold text-gray-900 text-center mb-2">
						Delete "{project.title}"?
					</h3>
					<p className="text-sm text-gray-500 text-center mb-6">
						This action cannot be undone. The video and all associated data will
						be permanently deleted.
					</p>
					<div className="flex gap-3">
						<button
							onClick={() => setShowDeleteModal(false)}
							className="btn-secondary btn-md flex-1"
						>
							Cancel
						</button>
						<button
							onClick={handleDelete}
							disabled={actionLoading}
							className="btn-danger btn-md flex-1"
						>
							{actionLoading ? "Deleting..." : "Delete"}
						</button>
					</div>
				</div>
			</Modal>

			{/* Share Modal */}
			<Modal
				isOpen={showShareModal}
				onClose={() => setShowShareModal(false)}
				title="Share Video"
			>
				<div className="p-6">
					<p className="text-sm text-gray-600 mb-4">
						Share this video with a direct link. Anyone with the link can view
						and download the video.
					</p>
					<div className="flex items-center gap-2 mb-6">
						<input
							type="text"
							value={project.video?.url || ""}
							readOnly
							className="input"
						/>
						<button
							onClick={handleCopyLink}
							className="btn-primary btn-md flex-shrink-0"
						>
							<HiDuplicate className="w-4 h-4" />
							Copy
						</button>
					</div>
				</div>
			</Modal>

			{/* Edit Settings Modal */}
			<EditSettingsModal
				isOpen={showEditModal}
				onClose={() => setShowEditModal(false)}
				project={project}
				onSave={handleEditSave}
				loading={actionLoading}
			/>
		</>
	);
};

export default ProjectDetailPage;