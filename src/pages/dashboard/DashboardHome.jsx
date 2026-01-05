// client/src/pages/dashboard/DashboardHome.jsx
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {motion} from "framer-motion";
import {
	HiPlus,
	HiFolder,
	HiClock,
	HiCheckCircle,
	HiXCircle,
	HiEye,
	HiLightningBolt,
	HiSparkles,
	HiArrowRight,
  HiCube
} from "react-icons/hi";
import LoadingSpinner from "@components/ui/LoadingSpinner";
import StatusBadge from "@components/ui/StatusBadge";
import {useAuthStore} from "@store/authStore";
import {useProject} from "@hooks/useProject";
import {formatRelativeTime} from "@utils/formatters";

// Enhanced animated line from FeaturesPage
const AnimatedLine = ({ className = "" }) => (
	<div className={`h-[1px] bg-gray-200 overflow-hidden ${className}`}>
		<motion.div
			className="w-1/3 h-full bg-yellow-400"
			animate={{ x: ["-100%", "300%"] }}
			transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
		/>
	</div>
);

const DashboardHome = () => {
	const {user} = useAuthStore();
	const {projects, loading, fetchProjects} = useProject();
	const [stats, setStats] = useState({
		total: 0,
		completed: 0,
		processing: 0,
		failed: 0,
	});

	useEffect(() => {
		fetchProjects({limit: 5});
	}, []);

	useEffect(() => {
		if (projects) {
			setStats({
				total: projects.length,
				completed: projects.filter((p) => p.status === "completed").length,
				processing: projects.filter((p) => p.status === "processing").length,
				failed: projects.filter((p) => p.status === "failed").length,
			});
		}
	}, [projects]);

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: { staggerChildren: 0.1 }
		}
	};

	const itemVariants = {
		hidden: { y: 20, opacity: 0 },
		visible: { 
			y: 0, 
			opacity: 1,
			transition: { duration: 0.5, ease: "easeOut" }
		}
	};

	const statCards = [
		{
			label: "Total Projects",
			value: stats.total,
			icon: HiFolder,
      color: "bg-black",
      textColor: "text-white",
      iconColor: "text-yellow-400"
		},
		{
			label: "Completed",
			value: stats.completed,
			icon: HiCheckCircle,
      color: "bg-white",
      textColor: "text-black",
      iconColor: "text-green-500"
		},
		{
			label: "Processing",
			value: stats.processing,
			icon: HiClock,
      color: "bg-yellow-400",
      textColor: "text-black",
      iconColor: "text-black"
		},
		{
			label: "Failed",
			value: stats.failed,
			icon: HiXCircle,
      color: "bg-white",
      textColor: "text-black",
      iconColor: "text-red-500"
		},
	];

	return (
		<div className="min-h-screen bg-[#f9f9f7] text-black font-['Plus_Jakarta_Sans',sans-serif] p-6 lg:p-12">
			
      {/* Welcome Hero */}
			<div className="mb-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-block mb-6"
        >
          <span className="bg-yellow-400 text-black font-black text-[10px] uppercase tracking-[0.2em] px-4 py-2">
            Workspace Active
          </span>
        </motion.div>
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-black text-black tracking-tighter leading-none mb-4 uppercase"
            >
              Welcome back,<br /><span className="text-gray-300">{user?.name?.split(" ")[0] || "Agent"}</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-gray-500 max-w-xl leading-relaxed font-medium"
            >
              Your production pipeline is ready. Create stunning cinematic videos in seconds.
            </motion.p>
          </div>
          
          <motion.div
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ delay: 0.3 }}
          >
            <Link to="/dashboard/projects/new">
              <button className="bg-black text-white font-bold px-8 py-4 hover:bg-yellow-400 hover:text-black transition-all shadow-xl hover:-translate-y-1 flex items-center gap-3 group">
                <HiPlus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
                Initialize Project
              </button>
            </Link>
          </motion.div>
        </div>
      </div>

			{/* Stats Grid - Feature Stylized */}
			<motion.div 
				variants={containerVariants}
				initial="hidden"
				animate="visible"
				className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
			>
				{statCards.map((stat, index) => {
					const Icon = stat.icon;
					return (
						<motion.div 
              key={stat.label} 
              variants={itemVariants} 
              className={`relative p-8 ${stat.color} ${stat.textColor} shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col justify-between min-h-[180px] group overflow-hidden`}
            >
              <div className="flex justify-between items-start mb-4 relative z-10">
                <p className="text-xs font-black uppercase tracking-[0.2em] opacity-70">{stat.label}</p>
                <Icon className={`w-6 h-6 ${stat.iconColor}`} />
              </div>
              <p className="text-5xl font-black tracking-tighter relative z-10">{stat.value}</p>
              
              {/* Decoration */}
              <AnimatedLine className="absolute bottom-0 left-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
					);
				})}
			</motion.div>

			{/* Operational Grid (Bento Style) */}
			<div className="grid lg:grid-cols-3 gap-8 mb-16">
        {/* Quick Actions */}
				<motion.div variants={itemVariants} initial="hidden" animate="visible" className="lg:col-span-1 space-y-6">
          <div className="flex items-center gap-4 mb-2">
            <h2 className="text-xl font-black tracking-tight uppercase">Quick Actions</h2>
            <div className="h-[1px] bg-gray-200 flex-1" />
          </div>

					<Link to="/dashboard/projects/new" className="block group">
						<div className="bg-white p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
							<div className="w-12 h-12 bg-yellow-400 flex items-center justify-center mb-6">
								<HiLightningBolt className="w-6 h-6 text-black" />
							</div>
							<h3 className="text-xl font-bold mb-2 tracking-tight group-hover:text-yellow-600 transition-colors">
								New Deployment
							</h3>
							<p className="text-gray-500 text-sm leading-relaxed mb-6">
                Instant generation pipeline. From URL to video in 60s.
							</p>
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest group-hover:gap-4 transition-all">
                Start Now <HiArrowRight />
              </div>
						</div>
					</Link>

          <div className="grid grid-cols-2 gap-4">
             <Link to="/dashboard/gallery" className="group">
                <div className="bg-white p-6 border border-gray-100 shadow-sm hover:shadow-lg transition-all h-full">
                   <HiEye className="w-8 h-8 text-black mb-4 group-hover:scale-110 transition-transform" />
                   <p className="font-bold text-sm">Gallery</p>
                </div>
             </Link>
             <Link to="/dashboard/billing" className="group">
                <div className="bg-black p-6 border border-gray-100 shadow-sm hover:shadow-lg transition-all h-full">
                   <HiSparkles className="w-8 h-8 text-yellow-400 mb-4 group-hover:scale-110 transition-transform" />
                   <p className="font-bold text-sm text-white">Credits</p>
                </div>
             </Link>
          </div>
				</motion.div>

        {/* Recent Projects List */}
        <motion.div variants={itemVariants} initial="hidden" animate="visible" className="lg:col-span-2">
           <div className="flex items-center justify-between gap-4 mb-8">
            <h2 className="text-xl font-black tracking-tight uppercase">Recent Deployments</h2>
            <Link to="/dashboard/projects" className="text-xs font-black uppercase tracking-widest text-gray-400 hover:text-black transition-colors">
              View Archive →
            </Link>
          </div>

          {loading ? (
						<div className="py-20 flex justify-center"><LoadingSpinner text="SYNCING..." /></div>
					) : projects?.length > 0 ? (
						<div className="bg-white border border-gray-100 shadow-sm">
							{projects.slice(0, 5).map((project, i) => (
								<Link key={project._id} to={`/dashboard/projects/${project._id}`} className="block group">
									<div className={`p-6 flex items-center justify-between hover:bg-gray-50 transition-all ${i !== projects.slice(0,5).length -1 ? 'border-b border-gray-100' : ''}`}>
										<div className="flex items-center gap-6 flex-1 min-w-0">
                      <div className="w-12 h-12 bg-[#f9f9f7] flex items-center justify-center shrink-0 group-hover:bg-yellow-400 transition-colors">
                        <HiCube className="w-5 h-5 text-gray-400 group-hover:text-black" />
                      </div>
                      <div className="truncate">
											  <h3 className="text-base font-bold text-black tracking-tight truncate group-hover:text-yellow-600 transition-colors">
												  {project.title || "Untitled Asset"}
											  </h3>
											  <div className="flex items-center gap-4 text-xs font-medium text-gray-400 mt-1">
													<span className="flex items-center gap-1.5"><HiClock className="w-3.5 h-3.5" /> {formatRelativeTime(project.createdAt)}</span>
                          <span className="w-1 h-1 bg-gray-300 rounded-full" />
													<span>{project.template || "Cinematic"}</span>
											  </div>
                      </div>
										</div>
                    <div className="flex items-center gap-6">
                      <StatusBadge status={project.status} className="" />
                      <HiArrowRight className="w-5 h-5 text-gray-300 group-hover:text-black group-hover:translate-x-1 transition-all" />
                    </div>
									</div>
								</Link>
							))}
						</div>
					) : (
						<div className="bg-white border border-gray-100 p-12 text-center">
							<p className="text-gray-400 font-medium mb-6">No cinematic assets detected in your stream.</p>
              <Link to="/dashboard/projects/new">
                <button className="text-sm font-black uppercase tracking-widest border-b-2 border-yellow-400 pb-1 hover:text-yellow-600 transition-colors">
                  Initiate First Project
                </button>
              </Link>
						</div>
					)}
        </motion.div>
			</div>
		</div>
	);
};

export default DashboardHome;