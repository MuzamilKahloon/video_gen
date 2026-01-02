// client/src/components/layout/DashboardHeader.jsx
import {useState, useRef, useEffect} from "react";
import {Link} from "react-router-dom";
import {motion, AnimatePresence} from "framer-motion";
import {
	HiMenu,
	HiSearch,
	HiBell,
	HiLogout,
	HiCog,
	HiCreditCard,
	HiSparkles,
  HiLightningBolt
} from "react-icons/hi";
import {useUIStore} from "@store/uiStore";
import {useAuth} from "@hooks/useAuth";
import Avatar from "@components/ui/Avatar";

const DashboardHeader = () => {
	const {toggleSidebar} = useUIStore();
	const {user, logout} = useAuth();
	const [userMenuOpen, setUserMenuOpen] = useState(false);
	const [notificationsOpen, setNotificationsOpen] = useState(false);
	const [searchFocused, setSearchFocused] = useState(false);
	const userMenuRef = useRef(null);
	const notificationsRef = useRef(null);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
				setUserMenuOpen(false);
			}
			if (
				notificationsRef.current &&
				!notificationsRef.current.contains(event.target)
			) {
				setNotificationsOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	const notifications = [
		{ id: 1, title: "Forge Complete", message: "Render 'Modern Villa' finalized.", time: "5m ago", unread: true },
		{ id: 2, title: "Credits Reactive", message: "50 GHZ added to pipeline.", time: "2h ago", unread: true },
	];

	return (
		<header className="sticky top-0 z-40 bg-white/40 backdrop-blur-2xl border-b border-gray-100 font-['Plus_Jakarta_Sans',sans-serif]">
			<div className="flex items-center justify-between h-20 px-8">
				{/* Search Hub */}
				<div className="flex items-center gap-6 flex-1 max-w-2xl">
					<button onClick={toggleSidebar} className="lg:hidden p-2 text-gray-500 hover:text-black">
						<HiMenu className="w-6 h-6" />
					</button>

					<div className="relative w-full group">
						<HiSearch className={`absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 transition-all duration-500 ${
							searchFocused ? "text-yellow-500 scale-110" : "text-gray-400"
						}`} />
						<input
							type="text"
							placeholder="COMMAND + K TO SEARCH ASSETS..."
							onFocus={() => setSearchFocused(true)}
							onBlur={() => setSearchFocused(false)}
							className="w-full bg-transparent border-none pl-8 pr-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-black placeholder-gray-300 focus:outline-none transition-all duration-300"
						/>
            <div className={`absolute bottom-0 left-0 h-[1px] bg-black transition-all duration-500 ${searchFocused ? 'w-full' : 'w-4'}`} />
					</div>
				</div>

				{/* Right Control Sector */}
				<div className="flex items-center gap-6">
					<div className="relative" ref={notificationsRef}>
						<button
							onClick={() => setNotificationsOpen(!notificationsOpen)}
							className={`relative p-2.5 transition-all duration-300 rounded-full ${
								notificationsOpen ? "bg-black text-yellow-500" : "text-gray-400 hover:bg-gray-50"
							}`}
						>
							<HiBell className="w-5 h-5" />
							{notifications.some((n) => n.unread) && (
								<span className="absolute top-2 right-2 w-2 h-2 bg-yellow-400 border-2 border-white rounded-full" />
							)}
						</button>

						<AnimatePresence>
							{notificationsOpen && (
								<motion.div
									initial={{ opacity: 0, y: 10, scale: 0.95 }}
									animate={{ opacity: 1, y: 0, scale: 1 }}
									exit={{ opacity: 0, y: 10, scale: 0.95 }}
									className="absolute right-0 mt-4 w-80 bg-white border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.1)] overflow-hidden"
								>
									<div className="px-6 py-4 bg-black flex items-center justify-between">
										<p className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Flux Stream</p>
										<HiLightningBolt className="text-yellow-400 w-4 h-4" />
									</div>
									<div className="max-h-80 overflow-y-auto">
										{notifications.map((n) => (
											<div key={n.id} className="p-5 hover:bg-gray-50 border-b border-gray-50 transition-colors cursor-pointer group">
												<p className="text-[10px] font-black text-black uppercase tracking-tight group-hover:text-yellow-600">{n.title}</p>
												<p className="text-xs text-gray-400 mt-1 font-medium">{n.message}</p>
											</div>
										))}
									</div>
								</motion.div>
							)}
						</AnimatePresence>
					</div>

					{/* Profile Hub */}
					<div className="relative" ref={userMenuRef}>
						<button
							onClick={() => setUserMenuOpen(!userMenuOpen)}
							className={`flex items-center gap-4 py-2 pl-2 pr-4 transition-all duration-300 ${
								userMenuOpen ? "bg-black text-white" : "hover:bg-gray-50"
							}`}
						>
							<div className="relative flex items-center justify-center">
								<Avatar src={user?.avatar} name={user?.name} size="sm" className="rounded-none grayscale-[0.5] contrast-[1.2]" />
								<motion.div 
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 border-2 border-white" 
                />
							</div>
              <div className="hidden xl:block text-left">
                <p className={`text-[10px] font-black uppercase tracking-tight transition-colors ${userMenuOpen ? "text-yellow-400" : "text-black"}`}>
                  {user?.name}
                </p>
                <div className="flex items-center gap-1.5">
                  <span className="w-1 h-1 bg-yellow-400" />
                  <p className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter">Verified Agent</p>
                </div>
              </div>
						</button>

						<AnimatePresence>
							{userMenuOpen && (
								<motion.div
									initial={{ opacity: 0, y: 10 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: 10 }}
									className="absolute right-0 mt-4 w-60 bg-white border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.1)] overflow-hidden font-['Plus_Jakarta_Sans',sans-serif]"
								>
									<div className="p-6 bg-black border-b border-white/5">
                    <p className="text-[10px] font-black text-white uppercase tracking-widest">{user?.name}</p>
                    <p className="text-[9px] font-bold text-gray-500 uppercase tracking-tight truncate mt-1">{user?.email}</p>
									</div>

									<Link to="/dashboard/settings" onClick={() => setUserMenuOpen(false)}>
										<div className="flex items-center gap-4 px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-black hover:bg-gray-50 transition-all border-b border-gray-50">
											<HiCog className="w-4 h-4" />
											<span>Settings</span>
										</div>
									</Link>

									<button
										onClick={() => { logout(); setUserMenuOpen(false); }}
										className="flex items-center gap-4 px-6 py-4 text-[10px] font-black uppercase tracking-widest text-red-400 hover:text-white hover:bg-red-500 transition-all w-full"
									>
										<HiLogout className="w-4 h-4" />
										<span>Eject Session</span>
									</button>
								</motion.div>
							)}
						</AnimatePresence>
					</div>
				</div>
			</div>
		</header>
	);
};

export default DashboardHeader;
