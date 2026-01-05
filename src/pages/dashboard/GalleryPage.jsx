// client/src/pages/dashboard/GalleryPage.jsx
import {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import {Helmet} from "react-helmet-async";
import {motion, AnimatePresence} from "framer-motion";
import {
	HiSearch,
	HiFilter,
	HiViewGrid,
	HiViewList,
	HiDownload,
	HiPlay,
	HiDotsVertical,
	HiTrash,
	HiShare,
	HiExternalLink,
	HiVideoCamera,
	HiCheck,
	HiX,
	HiSortDescending,
	HiFolder,
	HiHeart,
	HiRefresh,
} from "react-icons/hi";
import {cn} from "@utils/cn";
import {
	formatDate,
	formatRelativeTime,
	formatDuration,
	formatFileSize,
} from "@utils/formatters";
import {VIDEO_TEMPLATES} from "@utils/constants";
import PageHeader from "@components/ui/PageHeader";
import Card from "@components/ui/Card";
import Badge from "@components/ui/Badge";
import Modal from "@components/ui/Modal";
import EmptyState from "@components/ui/EmptyState";
import Skeleton from "@components/ui/Skeleton";

// Mock data
const mockVideos = [
	{
		id: "vid_1",
		title: "Luxury Beachfront Villa",
		thumbnail:
			"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400",
		videoUrl:
			"https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
		duration: 12,
		template: "cinematic",
		quality: "1080p",
		aspectRatio: "16:9",
		size: 45678900,
		createdAt: "2024-01-15T10:30:00Z",
		isFavorite: true,
		downloads: 5,
	},
	{
		id: "vid_2",
		title: "Modern City Apartment",
		thumbnail:
			"https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400",
		videoUrl:
			"https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
		duration: 8,
		template: "dynamic",
		quality: "1080p",
		aspectRatio: "16:9",
		size: 32456000,
		createdAt: "2024-01-14T15:20:00Z",
		isFavorite: false,
		downloads: 2,
	},
	{
		id: "vid_3",
		title: "Cozy Suburban Home",
		thumbnail:
			"https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400",
		videoUrl:
			"https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
		duration: 15,
		template: "showcase",
		quality: "4k",
		aspectRatio: "16:9",
		size: 89123000,
		createdAt: "2024-01-13T09:15:00Z",
		isFavorite: true,
		downloads: 8,
	},
	{
		id: "vid_4",
		title: "Penthouse with Ocean View",
		thumbnail:
			"https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400",
		videoUrl:
			"https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
		duration: 10,
		template: "elegant",
		quality: "1080p",
		aspectRatio: "9:16",
		size: 41567000,
		createdAt: "2024-01-12T14:45:00Z",
		isFavorite: false,
		downloads: 3,
	},
	{
		id: "vid_5",
		title: "Historic Colonial Estate",
		thumbnail:
			"https://images.unsplash.com/photo-1600573472591-ee6c563aaec5?w=400",
		videoUrl:
			"https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
		duration: 20,
		template: "aerial",
		quality: "4k",
		aspectRatio: "16:9",
		size: 125678000,
		createdAt: "2024-01-11T11:30:00Z",
		isFavorite: false,
		downloads: 12,
	},
	{
		id: "vid_6",
		title: "Contemporary Loft Space",
		thumbnail:
			"https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=400",
		videoUrl:
			"https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
		duration: 8,
		template: "cinematic",
		quality: "720p",
		aspectRatio: "1:1",
		size: 28456000,
		createdAt: "2024-01-10T16:20:00Z",
		isFavorite: true,
		downloads: 1,
	},
];

const filterOptions = {
	templates: [
		{id: "all", label: "All Templates"},
		...VIDEO_TEMPLATES.map((t) => ({id: t.id, label: t.name})),
	],
	quality: [
		{id: "all", label: "All Qualities"},
		{id: "720p", label: "720p HD"},
		{id: "1080p", label: "1080p Full HD"},
		{id: "4k", label: "4K Ultra HD"},
	],
	sortBy: [
		{id: "newest", label: "Newest First"},
		{id: "oldest", label: "Oldest First"},
		{id: "name", label: "Name (A-Z)"},
		{id: "size", label: "File Size"},
	],
};

// Video Card Component
const VideoCard = ({
	video,
	viewMode,
	onPlay,
	onDownload,
	onDelete,
	onToggleFavorite,
	isSelected,
	onSelect,
}) => {
	const [showMenu, setShowMenu] = useState(false);
	const [isHovered, setIsHovered] = useState(false);
	const template = VIDEO_TEMPLATES.find((t) => t.id === video.template);

	if (viewMode === "list") {
		return (
			<motion.div
				layout
				initial={{opacity: 0, y: 20}}
				animate={{opacity: 1, y: 0}}
				exit={{opacity: 0, y: -20}}
				className="flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-xl hover:shadow-card-hover transition-shadow"
			>
				<input
					type="checkbox"
					checked={isSelected}
					onChange={() => onSelect(video.id)}
					className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
				/>

				<div
					className="relative w-32 h-20 flex-shrink-0 rounded-lg overflow-hidden cursor-pointer group"
					onClick={() => onPlay(video)}
				>
					<img
						src={video.thumbnail}
						alt={video.title}
						className="w-full h-full object-cover"
					/>
					<div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
						<HiPlay className="w-8 h-8 text-white" />
					</div>
					<div className="absolute bottom-1 right-1 px-1.5 py-0.5 bg-black/70 rounded text-xs text-white">
						{formatDuration(video.duration)}
					</div>
				</div>

				<div className="flex-1 min-w-0">
					<div className="flex items-center gap-2">
						<h3 className="font-medium text-gray-900 truncate">
							{video.title}
						</h3>
						{video.isFavorite && (
							<HiHeart className="w-4 h-4 text-error-500 flex-shrink-0" />
						)}
					</div>
					<div className="flex items-center gap-3 mt-1 text-sm text-gray-500">
						<span className="flex items-center gap-1">
							<span>{template?.icon}</span>
							{template?.name}
						</span>
						<span>{video.quality}</span>
					</div>
				</div>

				<div className="flex items-center gap-6 text-sm text-gray-500">
					<div className="text-right">
						<div className="text-gray-900 font-medium">
							{formatFileSize(video.size)}
						</div>
						<div>{formatRelativeTime(video.createdAt)}</div>
					</div>
				</div>

				<div className="flex items-center gap-1">
					<button
						onClick={() => onDownload(video)}
						className="btn-ghost btn-sm"
					>
						<HiDownload className="w-4 h-4" />
					</button>
					<button
						onClick={() => onToggleFavorite(video.id)}
						className={cn(
							"btn-ghost btn-sm",
							video.isFavorite && "text-error-500"
						)}
					>
						<HiHeart className="w-4 h-4" />
					</button>
					<div className="relative">
						<button
							onClick={() => setShowMenu(!showMenu)}
							className="btn-ghost btn-sm"
						>
							<HiDotsVertical className="w-4 h-4" />
						</button>
						{showMenu && (
							<>
								<div
									className="fixed inset-0 z-40"
									onClick={() => setShowMenu(false)}
								/>
								<div className="dropdown-menu right-0 top-full mt-1">
									<Link
										to={`/dashboard/projects/${video.id}`}
										className="dropdown-item"
									>
										<HiExternalLink className="w-4 h-4" />
										View Details
									</Link>
									<button className="dropdown-item">
										<HiShare className="w-4 h-4" />
										Share
									</button>
									<div className="dropdown-divider" />
									<button
										onClick={() => onDelete(video)}
										className="dropdown-item-danger"
									>
										<HiTrash className="w-4 h-4" />
										Delete
									</button>
								</div>
							</>
						)}
					</div>
				</div>
			</motion.div>
		);
	}

	// Grid view
	return (
		<motion.div
			layout
			initial={{opacity: 0, scale: 0.95}}
			animate={{opacity: 1, scale: 1}}
			exit={{opacity: 0, scale: 0.95}}
			className="group"
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => {
				setIsHovered(false);
				setShowMenu(false);
			}}
		>
			<Card className="overflow-hidden hover:shadow-card-hover transition-shadow">
				<div
					className="relative aspect-video cursor-pointer"
					onClick={() => onPlay(video)}
				>
					<img
						src={video.thumbnail}
						alt={video.title}
						className="w-full h-full object-cover"
					/>

					<div
						className={cn(
							"absolute inset-0 bg-black/40 transition-opacity flex items-center justify-center",
							isHovered ? "opacity-100" : "opacity-0"
						)}
					>
						<div className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center">
							<HiPlay className="w-7 h-7 text-gray-900 ml-1" />
						</div>
					</div>

					<div className="absolute bottom-2 right-2 px-2 py-1 bg-black/70 rounded-md text-xs text-white font-medium">
						{formatDuration(video.duration)}
					</div>

					{video.isFavorite && (
						<div className="absolute top-2 right-2">
							<HiHeart className="w-5 h-5 text-error-500 drop-shadow-md" />
						</div>
					)}

					<div
						className={cn(
							"absolute top-2 left-2 transition-opacity",
							isHovered || isSelected ? "opacity-100" : "opacity-0"
						)}
					>
						<input
							type="checkbox"
							checked={isSelected}
							onChange={(e) => {
								e.stopPropagation();
								onSelect(video.id);
							}}
							className="w-5 h-5 text-primary-600 border-2 border-white rounded focus:ring-primary-500 bg-white/80"
						/>
					</div>

					<div className="absolute top-2 left-10">
						<Badge variant={video.quality === "4k" ? "primary" : "gray"}>
							{video.quality}
						</Badge>
					</div>
				</div>

				<div className="p-4">
					<div className="flex items-start justify-between gap-2">
						<div className="min-w-0">
							<h3 className="font-medium text-gray-900 truncate">
								{video.title}
							</h3>
							<div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
								<span className="flex items-center gap-1">
									<span>{template?.icon}</span>
									{template?.name}
								</span>
								<span>•</span>
								<span>{video.aspectRatio}</span>
							</div>
						</div>

						<div className="relative">
							<button
								onClick={() => setShowMenu(!showMenu)}
								className="btn-ghost btn-sm -mr-2"
							>
								<HiDotsVertical className="w-4 h-4" />
							</button>
							{showMenu && (
								<>
									<div
										className="fixed inset-0 z-40"
										onClick={() => setShowMenu(false)}
									/>
									<div className="dropdown-menu right-0 top-full mt-1">
										<Link
											to={`/dashboard/projects/${video.id}`}
											className="dropdown-item"
										>
											<HiExternalLink className="w-4 h-4" />
											View Details
										</Link>
										<button
											onClick={() => onDownload(video)}
											className="dropdown-item"
										>
											<HiDownload className="w-4 h-4" />
											Download
										</button>
										<button
											onClick={() => onToggleFavorite(video.id)}
											className="dropdown-item"
										>
											<HiHeart className="w-4 h-4" />
											{video.isFavorite ? "Remove Favorite" : "Add Favorite"}
										</button>
										<div className="dropdown-divider" />
										<button
											onClick={() => onDelete(video)}
											className="dropdown-item-danger"
										>
											<HiTrash className="w-4 h-4" />
											Delete
										</button>
									</div>
								</>
							)}
						</div>
					</div>

					<div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100 text-sm text-gray-500">
						<span>{formatFileSize(video.size)}</span>
						<span>{formatRelativeTime(video.createdAt)}</span>
					</div>
				</div>
			</Card>
		</motion.div>
	);
};

// Main Component
const GalleryPage = () => {
	const [videos, setVideos] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [viewMode, setViewMode] = useState("grid");
	const [searchQuery, setSearchQuery] = useState("");
	const [showFilters, setShowFilters] = useState(false);
	const [filters, setFilters] = useState({
		template: "all",
		quality: "all",
		showFavoritesOnly: false,
	});
	const [sortBy, setSortBy] = useState("newest");
	const [selectedVideos, setSelectedVideos] = useState([]);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [videoToDelete, setVideoToDelete] = useState(null);
	const [showVideoModal, setShowVideoModal] = useState(false);
	const [activeVideo, setActiveVideo] = useState(null);

	useEffect(() => {
		const fetchVideos = async () => {
			setIsLoading(true);
			await new Promise((resolve) => setTimeout(resolve, 1000));
			setVideos(mockVideos);
			setIsLoading(false);
		};
		fetchVideos();
	}, []);

	const filteredVideos = videos
		.filter((video) => {
			if (
				searchQuery &&
				!video.title.toLowerCase().includes(searchQuery.toLowerCase())
			)
				return false;
			if (filters.template !== "all" && video.template !== filters.template)
				return false;
			if (filters.quality !== "all" && video.quality !== filters.quality)
				return false;
			if (filters.showFavoritesOnly && !video.isFavorite) return false;
			return true;
		})
		.sort((a, b) => {
			switch (sortBy) {
				case "oldest":
					return new Date(a.createdAt) - new Date(b.createdAt);
				case "name":
					return a.title.localeCompare(b.title);
				case "size":
					return b.size - a.size;
				default:
					return new Date(b.createdAt) - new Date(a.createdAt);
			}
		});

	const handleSelectVideo = (videoId) => {
		setSelectedVideos((prev) =>
			prev.includes(videoId)
				? prev.filter((id) => id !== videoId)
				: [...prev, videoId]
		);
	};

	const handleSelectAll = () => {
		if (selectedVideos.length === filteredVideos.length) {
			setSelectedVideos([]);
		} else {
			setSelectedVideos(filteredVideos.map((v) => v.id));
		}
	};

	const handlePlayVideo = (video) => {
		setActiveVideo(video);
		setShowVideoModal(true);
	};

	const handleDownload = (video) => {
		const link = document.createElement("a");
		link.href = video.videoUrl;
		link.download = `${video.title.replace(/\s+/g, "_")}.mp4`;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};

	const handleDelete = (video) => {
		setVideoToDelete(video);
		setShowDeleteModal(true);
	};

	const confirmDelete = async () => {
		setVideos((prev) => prev.filter((v) => v.id !== videoToDelete.id));
		setShowDeleteModal(false);
		setVideoToDelete(null);
	};

	const handleToggleFavorite = (videoId) => {
		setVideos((prev) =>
			prev.map((v) =>
				v.id === videoId ? {...v, isFavorite: !v.isFavorite} : v
			)
		);
	};

	const clearFilters = () => {
		setFilters({template: "all", quality: "all", showFavoritesOnly: false});
		setSearchQuery("");
	};

	const hasActiveFilters =
		searchQuery ||
		filters.template !== "all" ||
		filters.quality !== "all" ||
		filters.showFavoritesOnly;

	const stats = {
		total: videos.length,
		favorites: videos.filter((v) => v.isFavorite).length,
		totalSize: videos.reduce((acc, v) => acc + v.size, 0),
	};

	return (
		<>
			<Helmet>
				<title>Video Gallery - VideoGen AI</title>
			</Helmet>

			<div className="p-6">
				<PageHeader
					title="Video Gallery"
					subtitle="Browse and manage all your generated videos"
					action={
						<Link to="/dashboard/projects/new" className="btn-primary btn-md">
							<HiVideoCamera className="w-4 h-4" />
							Create New Video
						</Link>
					}
				/>

				{/* Stats */}
				<div className="flex items-center gap-6 mb-6 text-sm">
					<div className="flex items-center gap-2">
						<HiVideoCamera className="w-4 h-4 text-gray-400" />
						<span className="text-gray-600">{stats.total} videos</span>
					</div>
					<div className="flex items-center gap-2">
						<HiHeart className="w-4 h-4 text-error-400" />
						<span className="text-gray-600">{stats.favorites} favorites</span>
					</div>
					<div className="flex items-center gap-2">
						<HiFolder className="w-4 h-4 text-gray-400" />
						<span className="text-gray-600">
							{formatFileSize(stats.totalSize)} total
						</span>
					</div>
				</div>

				{/* Toolbar */}
				<div className="flex items-center justify-between gap-4 mb-6">
					<div className="flex items-center gap-3 flex-1">
						<div className="relative flex-1 max-w-md">
							<HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
							<input
								type="text"
								placeholder="Search videos..."
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								className="input pl-10"
							/>
						</div>

						<button
							onClick={() => setShowFilters(!showFilters)}
							className={cn(
								"btn-secondary btn-md",
								showFilters && "bg-gray-100"
							)}
						>
							<HiFilter className="w-4 h-4" />
							Filters
							{hasActiveFilters && (
								<span className="w-2 h-2 bg-primary-500 rounded-full" />
							)}
						</button>

						<button
							onClick={() =>
								setFilters((prev) => ({
									...prev,
									showFavoritesOnly: !prev.showFavoritesOnly,
								}))
							}
							className={cn(
								"btn-secondary btn-md",
								filters.showFavoritesOnly &&
									"bg-error-50 border-error-200 text-error-600"
							)}
						>
							<HiHeart className="w-4 h-4" />
							Favorites
						</button>
					</div>

					<div className="flex items-center gap-2">
						<div className="relative">
							<select
								value={sortBy}
								onChange={(e) => setSortBy(e.target.value)}
								className="input pr-10 min-w-[160px]"
							>
								{filterOptions.sortBy.map((option) => (
									<option key={option.id} value={option.id}>
										{option.label}
									</option>
								))}
							</select>
							<HiSortDescending className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
						</div>

						<div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
							<button
								onClick={() => setViewMode("grid")}
								className={cn(
									"p-2 transition-colors",
									viewMode === "grid"
										? "bg-gray-100 text-gray-900"
										: "text-gray-500 hover:text-gray-700"
								)}
							>
								<HiViewGrid className="w-5 h-5" />
							</button>
							<button
								onClick={() => setViewMode("list")}
								className={cn(
									"p-2 transition-colors",
									viewMode === "list"
										? "bg-gray-100 text-gray-900"
										: "text-gray-500 hover:text-gray-700"
								)}
							>
								<HiViewList className="w-5 h-5" />
							</button>
						</div>
					</div>
				</div>

				{/* Filters Panel */}
				<AnimatePresence>
					{showFilters && (
						<motion.div
							initial={{opacity: 0, height: 0}}
							animate={{opacity: 1, height: "auto"}}
							exit={{opacity: 0, height: 0}}
							className="overflow-hidden mb-6"
						>
							<Card>
								<Card.Body className="flex items-center gap-4">
									<select
										value={filters.template}
										onChange={(e) =>
											setFilters((prev) => ({
												...prev,
												template: e.target.value,
											}))
										}
										className="input max-w-[180px]"
									>
										{filterOptions.templates.map((option) => (
											<option key={option.id} value={option.id}>
												{option.label}
											</option>
										))}
									</select>

									<select
										value={filters.quality}
										onChange={(e) =>
											setFilters((prev) => ({...prev, quality: e.target.value}))
										}
										className="input max-w-[180px]"
									>
										{filterOptions.quality.map((option) => (
											<option key={option.id} value={option.id}>
												{option.label}
											</option>
										))}
									</select>

									{hasActiveFilters && (
										<button
											onClick={clearFilters}
											className="btn-ghost btn-sm text-gray-500"
										>
											<HiX className="w-4 h-4" />
											Clear all
										</button>
									)}
								</Card.Body>
							</Card>
						</motion.div>
					)}
				</AnimatePresence>

				{/* Bulk Actions */}
				<AnimatePresence>
					{selectedVideos.length > 0 && (
						<motion.div
							initial={{opacity: 0, y: -10}}
							animate={{opacity: 1, y: 0}}
							exit={{opacity: 0, y: -10}}
							className="mb-6"
						>
							<Card className="bg-primary-50 border-primary-100">
								<Card.Body className="flex items-center justify-between py-3">
									<div className="flex items-center gap-3">
										<button
											onClick={handleSelectAll}
											className="btn-ghost btn-sm"
										>
											{selectedVideos.length === filteredVideos.length ? (
												<>
													<HiX className="w-4 h-4" /> Deselect all
												</>
											) : (
												<>
													<HiCheck className="w-4 h-4" /> Select all
												</>
											)}
										</button>
										<span className="text-sm text-primary-700 font-medium">
											{selectedVideos.length} selected
										</span>
									</div>

									<div className="flex items-center gap-2">
										<button className="btn-secondary btn-sm">
											<HiDownload className="w-4 h-4" />
											Download All
										</button>
										<button className="btn-danger btn-sm">
											<HiTrash className="w-4 h-4" />
											Delete
										</button>
									</div>
								</Card.Body>
							</Card>
						</motion.div>
					)}
				</AnimatePresence>

				{/* Content */}
				{isLoading ? (
					<div
						className={cn(
							viewMode === "grid"
								? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
								: "space-y-4"
						)}
					>
						{[...Array(8)].map((_, i) => (
							<Skeleton
								key={i}
								className={
									viewMode === "grid"
										? "aspect-[4/3] rounded-xl"
										: "h-24 rounded-xl"
								}
							/>
						))}
					</div>
				) : filteredVideos.length === 0 ? (
					<EmptyState
						icon={hasActiveFilters ? HiSearch : HiVideoCamera}
						title={hasActiveFilters ? "No videos found" : "No videos yet"}
						description={
							hasActiveFilters
								? "Try adjusting your filters"
								: "Create your first video"
						}
						action={
							hasActiveFilters ? (
								<button onClick={clearFilters} className="btn-secondary btn-md">
									<HiRefresh className="w-4 h-4" />
									Clear Filters
								</button>
							) : (
								<Link
									to="/dashboard/projects/new"
									className="btn-primary btn-md"
								>
									<HiVideoCamera className="w-4 h-4" />
									Create Video
								</Link>
							)
						}
					/>
				) : (
					<motion.div
						layout
						className={cn(
							viewMode === "grid"
								? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
								: "space-y-4"
						)}
					>
						<AnimatePresence mode="popLayout">
							{filteredVideos.map((video) => (
								<VideoCard
									key={video.id}
									video={video}
									viewMode={viewMode}
									onPlay={handlePlayVideo}
									onDownload={handleDownload}
									onDelete={handleDelete}
									onToggleFavorite={handleToggleFavorite}
									isSelected={selectedVideos.includes(video.id)}
									onSelect={handleSelectVideo}
								/>
							))}
						</AnimatePresence>
					</motion.div>
				)}
			</div>

			{/* Video Modal */}
			<Modal
				isOpen={showVideoModal}
				onClose={() => {
					setShowVideoModal(false);
					setActiveVideo(null);
				}}
				size="xl"
				title={activeVideo?.title}
			>
				{activeVideo && (
					<div className="p-4">
						<video
							src={activeVideo.videoUrl}
							poster={activeVideo.thumbnail}
							controls
							autoPlay
							className="w-full rounded-lg"
						/>
						<div className="flex items-center justify-between mt-4">
							<div className="text-sm text-gray-500">
								{formatDuration(activeVideo.duration)} • {activeVideo.quality} •{" "}
								{formatFileSize(activeVideo.size)}
							</div>
							<div className="flex gap-2">
								<button
									onClick={() => handleDownload(activeVideo)}
									className="btn-primary btn-sm"
								>
									<HiDownload className="w-4 h-4" />
									Download
								</button>
							</div>
						</div>
					</div>
				)}
			</Modal>

			{/* Delete Modal */}
			<Modal
				isOpen={showDeleteModal}
				onClose={() => {
					setShowDeleteModal(false);
					setVideoToDelete(null);
				}}
				title="Delete Video"
				size="sm"
			>
				<div className="p-6">
					<div className="flex items-center justify-center w-12 h-12 bg-error-100 rounded-full mx-auto mb-4">
						<HiTrash className="w-6 h-6 text-error-600" />
					</div>
					<h3 className="text-lg font-semibold text-gray-900 text-center mb-2">
						Delete "{videoToDelete?.title}"?
					</h3>
					<p className="text-sm text-gray-500 text-center mb-6">
						This action cannot be undone.
					</p>
					<div className="flex gap-3">
						<button
							onClick={() => {
								setShowDeleteModal(false);
								setVideoToDelete(null);
							}}
							className="btn-secondary btn-md flex-1"
						>
							Cancel
						</button>
						<button
							onClick={confirmDelete}
							className="btn-danger btn-md flex-1"
						>
							Delete
						</button>
					</div>
				</div>
			</Modal>
		</>
	);
};

export default GalleryPage;