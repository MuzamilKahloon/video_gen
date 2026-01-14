// client/src/components/layout/DashboardSidebar.jsx
import {Link, useLocation} from "react-router-dom";
import {motion} from "framer-motion";
import {
	HiHome,
	HiFolder,
	HiPhotograph,
	HiCog,
	HiCreditCard,
	HiPlus,
	HiChevronLeft,
	HiChevronRight,
	HiLightningBolt
} from "react-icons/hi";
import {useUIStore} from "@store/uiStore";
import {useAuthStore} from "@store/authStore";

const Logo = ({ collapsed }) => (
  <Link to="/" className={`flex items-center ${collapsed ? 'justify-center' : 'gap-1'}`}>
    <span className={`text-2xl font-[900] tracking-tighter text-black ${collapsed ? 'hidden' : 'block'}`}>l</span>
    <div className="relative w-5 h-5 flex items-center justify-center mx-[1px]">
      <motion.div 
        className="w-full h-full rounded-full border-[3px] border-black"
        animate={{ borderRadius: ["50%", "30%", "50%"] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute w-1 h-1 rounded-full"
        style={{ backgroundColor: '#E7F014' }}
        animate={{ scale: [1, 1.5, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </div>
    <div className="relative w-5 h-5 flex items-center justify-center mx-[1px]">
      <motion.div 
        className="w-full h-full rounded-full border-[3px] border-black"
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full" style={{ backgroundColor: '#E7F014' }} />
    </div>
    <span className={`text-2xl font-[900] tracking-tighter text-black ${collapsed ? 'hidden' : 'block'}`}>mo</span>
  </Link>
);

const DashboardSidebar = () => {
	const location = useLocation();
	const {sidebarOpen, toggleSidebar} = useUIStore();
	const {user} = useAuthStore();

	const navigation = [
		{name: "Overview", href: "/dashboard", icon: HiHome},
		{name: "My Projects", href: "/dashboard/projects", icon: HiFolder},
		{name: "Asset Library", href: "/dashboard/gallery", icon: HiPhotograph},
	];

	const bottomNavigation = [
		{name: "Billing", href: "/dashboard/billing", icon: HiCreditCard},
		{name: "Settings", href: "/dashboard/settings", icon: HiCog},
	];

	const isActive = (path) => {
		if (path === "/dashboard") {
			return location.pathname === path;
		}
		return location.pathname.startsWith(path);
	};

	return (
		<>
			{/* Mobile Overlay */}
			{sidebarOpen && (
				<div
					className="fixed inset-0 bg-black/60 backdrop-blur-md z-40 lg:hidden"
					onClick={toggleSidebar}
				/>
			)}

			{/* Sidebar */}
			<aside
				className={`fixed left-0 top-0 h-screen border-r border-black/5 z-50 transition-all duration-500 ease-[cubic-bezier(0.2,0,0,1)] ${
					sidebarOpen ? "w-64" : "w-20"
				}`}
        style={{ backgroundColor: '#F2F2ED' }}
			>
				<div className="flex flex-col h-full" style={{ fontFamily: "'Neue Montreal', sans-serif" }}>
					{/* Logo Area */}
					<div className="h-20 flex items-center justify-between px-6 mb-4">
						<Logo collapsed={!sidebarOpen} />
					</div>

					{/* Primary Action */}
					<div className="px-4 mb-8">
						<Link to="/dashboard/projects/new">
							<motion.button
								whileHover={{ scale: 1.02 }}
								whileTap={{ scale: 0.98 }}
								className={`w-full flex items-center gap-3 p-3.5 text-black font-bold uppercase tracking-widest text-[10px] shadow-[4px_4px_20px_0px_rgba(0,0,0,0.05)] hover:bg-black hover:text-white transition-all ${
									sidebarOpen ? "justify-start" : "justify-center"
								}`}
								style={{ backgroundColor: '#E7F014' }}
							>
								<HiPlus className="w-5 h-5" />
								{sidebarOpen && <span>Start Forge</span>}
							</motion.button>
						</Link>
					</div>

					{/* Navigation Groups */}
					<div className="flex-1 px-3 space-y-1 overflow-y-auto overflow-x-hidden">
						{navigation.map((item) => {
							const Icon = item.icon;
							const active = isActive(item.href);
							return (
								<Link key={item.name} to={item.href}>
									<motion.div
										className={`group relative flex items-center gap-4 px-4 py-3 cursor-pointer transition-all duration-300 ${
											!sidebarOpen && "justify-center"
										} ${
											active 
												? "text-black" 
												: "text-black opacity-40 hover:opacity-100"
										}`}
									>
                    {active && (
                      <motion.div 
                        layoutId="nav-glow"
                        className="absolute inset-0 bg-black/5 border-r-2"
                        style={{ borderColor: '#E7F014' }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
										<Icon className={`w-5 h-5 flex-shrink-0 transition-colors z-10 ${
												active ? "text-black" : "text-black/40 group-hover:text-black"
										}`} />
										{sidebarOpen && (
                      <span className="uppercase tracking-[0.2em] text-[10px] font-black z-10">
                        {item.name}
                      </span>
                    )}
									</motion.div>
								</Link>
							);
						})}
					</div>



					{/* Bottom Actions */}
					<div className="px-3 py-6 border-t border-black/5 space-y-1">
						{bottomNavigation.map((item) => {
							const Icon = item.icon;
							const active = isActive(item.href);
							return (
								<Link key={item.name} to={item.href}>
									<motion.div
										className={`group relative flex items-center gap-4 px-4 py-3 cursor-pointer transition-all duration-300 ${
											!sidebarOpen && "justify-center"
										} ${
											active 
												? "text-black font-black" 
												: "text-black opacity-40 hover:opacity-100"
										}`}
									>
                    {active && (
                      <motion.div 
                        layoutId="nav-glow-bottom"
                        className="absolute inset-0 bg-black/5 border-r-2"
                        style={{ borderColor: '#E7F014' }}
                      />
                    )}
										<Icon className={`w-5 h-5 flex-shrink-0 transition-colors z-10 ${
												active ? "text-black" : "text-black/40 group-hover:text-black"
										}`} />
										{sidebarOpen && (
                      <span className="uppercase tracking-[0.2em] text-[10px] font-black z-10">
                        {item.name}
                      </span>
                    )}
									</motion.div>
								</Link>
							);
						})}
					</div>

					{/* Collapse Toggle */}
					<button
						onClick={toggleSidebar}
						className="hidden lg:flex items-center justify-center h-14 border-t border-black/5 text-black opacity-40 hover:opacity-100 hover:bg-black/5 transition-all group"
					>
						{sidebarOpen ? (
							<HiChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
						) : (
							<HiChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
						)}
					</button>
				</div>
			</aside>
		</>
	);
};

export default DashboardSidebar;
