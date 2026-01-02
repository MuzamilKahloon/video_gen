// client/src/App.jsx
import { Routes, Route } from "react-router-dom";

// Layouts
import MainLayout from "@components/layout/MainLayout";
import AuthLayout from "@components/layout/AuthLayout";
import DashboardLayout from "@components/layout/DashboardLayout";

// Public Pages
import LandingPage from "@pages/LandingPage";
import PricingPage from "@pages/PricingPage";
import FeaturesPage from "@pages/FeaturesPage";
import TemplatesPage from "@pages/TemplatesPage";
import ShowcasePage from "@pages/ShowcasePage";

// Auth Pages
import LoginPage from "@pages/auth/LoginPage";
import RegisterPage from "@pages/auth/RegisterPage";
import ForgotPasswordPage from "@pages/auth/ForgotPassword";
import ResetPasswordPage from "@pages/auth/ResetPassword";

// Dashboard Pages
import DashboardHome from "@pages/dashboard/DashboardHome";
import ProjectsPage from "@pages/dashboard/ProjectsPage";
import CreateProjectPage from "@pages/dashboard/CreateProjectPage";
import ProjectDetailPage from "@pages/dashboard/ProjectDetailPage";
import GalleryPage from "@pages/dashboard/GalleryPage";
import SettingsPage from "@pages/dashboard/SettingsPage";
import BillingPage from "@pages/dashboard/BillingPage";

function App() {
	return (
		<Routes>
			{/* Public Routes with Main Layout */}
			<Route element={<MainLayout />}>
				<Route path="/" element={<LandingPage />} />
				<Route path="/pricing" element={<PricingPage />} />
				<Route path="/features" element={<FeaturesPage />} />
				<Route path="/templates" element={<TemplatesPage />} />
				<Route path="/showcase" element={<ShowcasePage />} />
			</Route>

			{/* Auth Routes */}
			<Route element={<AuthLayout />}>
				<Route path="/login" element={<LoginPage />} />
				<Route path="/register" element={<RegisterPage />} />
				<Route path="/forgot-password" element={<ForgotPasswordPage />} />
				<Route path="/reset-password/:token" element={<ResetPasswordPage />} />
			</Route>

			{/* Dashboard Routes - Accessible to All */}
			<Route path="/dashboard" element={<DashboardLayout />}>
				<Route index element={<DashboardHome />} />
				<Route path="projects" element={<ProjectsPage />} />
				<Route path="projects/new" element={<CreateProjectPage />} />
				<Route path="projects/:id" element={<ProjectDetailPage />} />
				<Route path="gallery" element={<GalleryPage />} />
				<Route path="settings" element={<SettingsPage />} />
				<Route path="billing" element={<BillingPage />} />
			</Route>

			{/* 404 Route */}
			<Route
				path="*"
				element={
					<div className="min-h-screen bg-dark-950 flex items-center justify-center">
						<div className="text-center">
							<h1 className="text-6xl font-bold gradient-text mb-4">404</h1>
							<p className="text-dark-400 mb-8">Page not found</p>
							<a href="/" className="btn-primary">
								Go Home
							</a>
						</div>
					</div>
				}
			/>
		</Routes>
	);
}

export default App;