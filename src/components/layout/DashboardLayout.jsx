import {Outlet} from "react-router-dom";
import DashboardSidebar from "./DashboardSidebar";
import DashboardHeader from "./DashboardHeader";
import {useUIStore} from "@store/uiStore";

const DashboardLayout = () => {
	const {sidebarOpen} = useUIStore();

	return (
		<div className="min-h-screen bg-white text-black flex relative overflow-hidden" style={{ fontFamily: "'Neue Montreal', sans-serif" }}>
			{/* Ambient background glow - refined for Elite 2.0 */}
			<div className="absolute inset-0 -z-10 pointer-events-none">
				<div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#E7F014]/5 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2" />
				<div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-black/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />
        <div className="absolute top-1/2 left-1/2 w-[500px] h-[500px] bg-[#E7F014]/3 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
			</div>

			{/* Sidebar */}
			<div className="relative z-20">
				<DashboardSidebar />
			</div>

			{/* Main Content */}
			<div
				className={`flex-1 flex flex-col transition-all duration-500 relative z-10 ${
					sidebarOpen ? "lg:ml-64" : "lg:ml-20"
				}`}
			>
				{/* Header */}
				<DashboardHeader />

				{/* Page Content */}
				<main className="flex-1 p-4 md:p-6 lg:p-8">
					<div className="max-w-7xl mx-auto">
						<Outlet />
					</div>
				</main>
			</div>
		</div>
	);
};

export default DashboardLayout;