// client/src/pages/dashboard/SettingsPage.jsx
import {useState} from "react";
import {Helmet} from "react-helmet-async";
import {motion} from "framer-motion";
import {
	HiUser,
	HiLockClosed,
	HiBell,
	HiCog,
	HiColorSwatch,
	HiShieldCheck,
	HiCamera,
	HiPencil,
	HiCheck,
	HiX,
	HiEye,
	HiEyeOff,
	HiExclamationCircle,
	HiTrash,
	HiDownload,
	HiLogout,
	HiGlobe,
	HiMail,
	HiDeviceMobile,
} from "react-icons/hi";
import {cn} from "@utils/cn";
import {
	validateEmail,
	validatePassword,
	getPasswordStrength,
} from "@utils/validators";
import PageHeader from "@components/ui/PageHeader";
import Card from "@components/ui/Card";
import Badge from "@components/ui/Badge";
import Modal from "@components/ui/Modal";
import Alert from "@components/ui/Alert";
import Avatar from "@components/ui/Avatar";
import ProgressBar from "@components/ui/ProgressBar";
import Tabs from "@components/ui/Tabs";

// Mock user data
const mockUser = {
	id: "user_123",
	firstName: "John",
	lastName: "Doe",
	email: "john.doe@example.com",
	avatar: null,
	phone: "+1 (555) 123-4567",
	company: "Real Estate Pro",
	role: "Pro Member",
	timezone: "America/New_York",
	language: "en",
	createdAt: "2023-06-15T10:30:00Z",
	twoFactorEnabled: false,
	emailVerified: true,
	notifications: {
		email: {
			projectComplete: true,
			projectFailed: true,
			weeklyReport: false,
			marketing: false,
		},
		push: {
			projectComplete: true,
			projectFailed: true,
		},
	},
	preferences: {
		defaultTemplate: "cinematic",
		defaultQuality: "1080p",
		defaultAspectRatio: "16:9",
		autoDownload: false,
		darkMode: false,
	},
	sessions: [
		{
			id: 1,
			device: "Chrome on MacOS",
			location: "New York, US",
			lastActive: "2024-01-15T10:30:00Z",
			current: true,
		},
		{
			id: 2,
			device: "Safari on iPhone",
			location: "New York, US",
			lastActive: "2024-01-14T18:20:00Z",
			current: false,
		},
	],
};

// Settings Tabs
const settingsTabs = [
	{id: "profile", label: "Profile", icon: HiUser},
	{id: "security", label: "Security", icon: HiLockClosed},
	{id: "notifications", label: "Notifications", icon: HiBell},
	{id: "preferences", label: "Preferences", icon: HiCog},
];

// Toggle Switch Component
const Toggle = ({enabled, onChange, label, description}) => (
	<div className="flex items-center justify-between py-3">
		<div>
			<p className="text-sm font-medium text-gray-900">{label}</p>
			{description && (
				<p className="text-sm text-gray-500 mt-0.5">{description}</p>
			)}
		</div>
		<button
			onClick={() => onChange(!enabled)}
			className={cn(
				"relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
				enabled ? "bg-primary-600" : "bg-gray-200"
			)}
		>
			<span
				className={cn(
					"inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-sm",
					enabled ? "translate-x-6" : "translate-x-1"
				)}
			/>
		</button>
	</div>
);

// Profile Tab
const ProfileTab = ({user, onUpdate}) => {
	const [isEditing, setIsEditing] = useState(false);
	const [formData, setFormData] = useState({
		firstName: user.firstName,
		lastName: user.lastName,
		email: user.email,
		phone: user.phone,
		company: user.company,
	});
	const [errors, setErrors] = useState({});
	const [isSaving, setIsSaving] = useState(false);

	const handleChange = (e) => {
		const {name, value} = e.target;
		setFormData((prev) => ({...prev, [name]: value}));
		if (errors[name]) setErrors((prev) => ({...prev, [name]: null}));
	};

	const handleSave = async () => {
		const newErrors = {};
		if (!formData.firstName.trim())
			newErrors.firstName = "First name is required";
		if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
		if (!validateEmail(formData.email))
			newErrors.email = "Invalid email address";

		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors);
			return;
		}

		setIsSaving(true);
		await new Promise((resolve) => setTimeout(resolve, 1000));
		setIsSaving(false);
		setIsEditing(false);
		onUpdate(formData);
	};

	return (
		<div className="space-y-6">
			{/* Avatar Section */}
			<Card>
				<Card.Body>
					<div className="flex items-center gap-6">
						<div className="relative">
							<Avatar
								src={user.avatar}
								name={`${user.firstName} ${user.lastName}`}
								size="xl"
							/>
							<button className="absolute bottom-0 right-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-primary-700 transition-colors">
								<HiCamera className="w-4 h-4" />
							</button>
						</div>
						<div>
							<h3 className="text-lg font-semibold text-gray-900">
								{user.firstName} {user.lastName}
							</h3>
							<p className="text-sm text-gray-500">{user.email}</p>
							<Badge variant="primary" className="mt-2">
								{user.role}
							</Badge>
						</div>
					</div>
				</Card.Body>
			</Card>

			{/* Profile Information */}
			<Card>
				<Card.Header>
					<div className="flex items-center justify-between">
						<h3 className="font-semibold text-gray-900">Profile Information</h3>
						{!isEditing ? (
							<button
								onClick={() => setIsEditing(true)}
								className="btn-ghost btn-sm"
							>
								<HiPencil className="w-4 h-4" />
								Edit
							</button>
						) : (
							<div className="flex gap-2">
								<button
									onClick={() => setIsEditing(false)}
									className="btn-ghost btn-sm"
								>
									<HiX className="w-4 h-4" />
									Cancel
								</button>
								<button
									onClick={handleSave}
									disabled={isSaving}
									className="btn-primary btn-sm"
								>
									{isSaving ? (
										<div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
									) : (
										<HiCheck className="w-4 h-4" />
									)}
									Save
								</button>
							</div>
						)}
					</div>
				</Card.Header>
				<Card.Body>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div>
							<label className="label">First Name</label>
							{isEditing ? (
								<>
									<input
										type="text"
										name="firstName"
										value={formData.firstName}
										onChange={handleChange}
										className={cn("input", errors.firstName && "input-error")}
									/>
									{errors.firstName && (
										<p className="error-text">{errors.firstName}</p>
									)}
								</>
							) : (
								<p className="text-gray-900">{user.firstName}</p>
							)}
						</div>

						<div>
							<label className="label">Last Name</label>
							{isEditing ? (
								<>
									<input
										type="text"
										name="lastName"
										value={formData.lastName}
										onChange={handleChange}
										className={cn("input", errors.lastName && "input-error")}
									/>
									{errors.lastName && (
										<p className="error-text">{errors.lastName}</p>
									)}
								</>
							) : (
								<p className="text-gray-900">{user.lastName}</p>
							)}
						</div>

						<div>
							<label className="label">Email Address</label>
							{isEditing ? (
								<>
									<input
										type="email"
										name="email"
										value={formData.email}
										onChange={handleChange}
										className={cn("input", errors.email && "input-error")}
									/>
									{errors.email && <p className="error-text">{errors.email}</p>}
								</>
							) : (
								<div className="flex items-center gap-2">
									<p className="text-gray-900">{user.email}</p>
									{user.emailVerified && (
										<Badge variant="success">Verified</Badge>
									)}
								</div>
							)}
						</div>

						<div>
							<label className="label">Phone Number</label>
							{isEditing ? (
								<input
									type="tel"
									name="phone"
									value={formData.phone}
									onChange={handleChange}
									className="input"
								/>
							) : (
								<p className="text-gray-900">{user.phone || "Not set"}</p>
							)}
						</div>

						<div className="md:col-span-2">
							<label className="label">Company</label>
							{isEditing ? (
								<input
									type="text"
									name="company"
									value={formData.company}
									onChange={handleChange}
									className="input"
								/>
							) : (
								<p className="text-gray-900">{user.company || "Not set"}</p>
							)}
						</div>
					</div>
				</Card.Body>
			</Card>

			{/* Regional Settings */}
			<Card>
				<Card.Header>
					<h3 className="font-semibold text-gray-900">Regional Settings</h3>
				</Card.Header>
				<Card.Body>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div>
							<label className="label">Timezone</label>
							<select className="input">
								<option value="America/New_York">Eastern Time (ET)</option>
								<option value="America/Chicago">Central Time (CT)</option>
								<option value="America/Denver">Mountain Time (MT)</option>
								<option value="America/Los_Angeles">Pacific Time (PT)</option>
								<option value="Europe/London">London (GMT)</option>
								<option value="Australia/Sydney">Sydney (AEST)</option>
							</select>
						</div>
						<div>
							<label className="label">Language</label>
							<select className="input">
								<option value="en">English</option>
								<option value="es">Spanish</option>
								<option value="fr">French</option>
								<option value="de">German</option>
							</select>
						</div>
					</div>
				</Card.Body>
			</Card>
		</div>
	);
};

// Security Tab
const SecurityTab = ({user}) => {
	const [showPasswordModal, setShowPasswordModal] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [showPassword, setShowPassword] = useState({
		current: false,
		new: false,
		confirm: false,
	});
	const [passwordData, setPasswordData] = useState({
		current: "",
		new: "",
		confirm: "",
	});
	const [passwordErrors, setPasswordErrors] = useState({});

	const passwordStrength = getPasswordStrength(passwordData.new);

	const handlePasswordChange = (field, value) => {
		setPasswordData((prev) => ({...prev, [field]: value}));
		if (passwordErrors[field])
			setPasswordErrors((prev) => ({...prev, [field]: null}));
	};

	const handleSavePassword = async () => {
		const errors = {};
		if (!passwordData.current) errors.current = "Current password is required";
		if (!validatePassword(passwordData.new)) {
			errors.new =
				"Password must be 8+ chars with uppercase, lowercase, and number";
		}
		if (passwordData.new !== passwordData.confirm) {
			errors.confirm = "Passwords do not match";
		}

		if (Object.keys(errors).length > 0) {
			setPasswordErrors(errors);
			return;
		}

		// API call here
		await new Promise((resolve) => setTimeout(resolve, 1000));
		setShowPasswordModal(false);
		setPasswordData({current: "", new: "", confirm: ""});
	};

	return (
		<div className="space-y-6">
			{/* Password */}
			<Card>
				<Card.Header>
					<h3 className="font-semibold text-gray-900">Password</h3>
				</Card.Header>
				<Card.Body>
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm text-gray-900">Change your password</p>
							<p className="text-sm text-gray-500">Last changed 30 days ago</p>
						</div>
						<button
							onClick={() => setShowPasswordModal(true)}
							className="btn-secondary btn-md"
						>
							Change Password
						</button>
					</div>
				</Card.Body>
			</Card>

			{/* Two-Factor Authentication */}
			<Card>
				<Card.Header>
					<h3 className="font-semibold text-gray-900">
						Two-Factor Authentication
					</h3>
				</Card.Header>
				<Card.Body>
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-4">
							<div
								className={cn(
									"w-12 h-12 rounded-full flex items-center justify-center",
									user.twoFactorEnabled
										? "bg-success-100 text-success-600"
										: "bg-gray-100 text-gray-400"
								)}
							>
								<HiShieldCheck className="w-6 h-6" />
							</div>
							<div>
								<p className="text-sm font-medium text-gray-900">
									{user.twoFactorEnabled ? "Enabled" : "Not enabled"}
								</p>
								<p className="text-sm text-gray-500">
									Add an extra layer of security to your account
								</p>
							</div>
						</div>
						<button className="btn-secondary btn-md">
							{user.twoFactorEnabled ? "Manage" : "Enable"}
						</button>
					</div>
				</Card.Body>
			</Card>

			{/* Active Sessions */}
			<Card>
				<Card.Header>
					<div className="flex items-center justify-between">
						<h3 className="font-semibold text-gray-900">Active Sessions</h3>
						<button className="btn-ghost btn-sm text-error-600">
							Sign out all other sessions
						</button>
					</div>
				</Card.Header>
				<Card.Body className="divide-y divide-gray-100">
					{user.sessions.map((session) => (
						<div
							key={session.id}
							className="flex items-center justify-between py-4 first:pt-0 last:pb-0"
						>
							<div className="flex items-center gap-4">
								<div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
									<HiDeviceMobile className="w-5 h-5 text-gray-500" />
								</div>
								<div>
									<div className="flex items-center gap-2">
										<p className="text-sm font-medium text-gray-900">
											{session.device}
										</p>
										{session.current && (
											<Badge variant="success">Current</Badge>
										)}
									</div>
									<p className="text-sm text-gray-500">
										{session.location} • Last active:{" "}
										{new Date(session.lastActive).toLocaleDateString()}
									</p>
								</div>
							</div>
							{!session.current && (
								<button className="btn-ghost btn-sm text-error-600">
									<HiLogout className="w-4 h-4" />
									Revoke
								</button>
							)}
						</div>
					))}
				</Card.Body>
			</Card>

			{/* Danger Zone */}
			<Card className="border-error-200">
				<Card.Header className="bg-error-50">
					<h3 className="font-semibold text-error-700">Danger Zone</h3>
				</Card.Header>
				<Card.Body>
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm font-medium text-gray-900">
								Delete Account
							</p>
							<p className="text-sm text-gray-500">
								Permanently delete your account and all data
							</p>
						</div>
						<button
							onClick={() => setShowDeleteModal(true)}
							className="btn-danger btn-md"
						>
							<HiTrash className="w-4 h-4" />
							Delete Account
						</button>
					</div>
				</Card.Body>
			</Card>

			{/* Change Password Modal */}
			<Modal
				isOpen={showPasswordModal}
				onClose={() => {
					setShowPasswordModal(false);
					setPasswordData({current: "", new: "", confirm: ""});
					setPasswordErrors({});
				}}
				title="Change Password"
			>
				<div className="p-6 space-y-4">
					<div>
						<label className="label">Current Password</label>
						<div className="relative">
							<input
								type={showPassword.current ? "text" : "password"}
								value={passwordData.current}
								onChange={(e) =>
									handlePasswordChange("current", e.target.value)
								}
								className={cn(
									"input pr-10",
									passwordErrors.current && "input-error"
								)}
							/>
							<button
								type="button"
								onClick={() =>
									setShowPassword((prev) => ({...prev, current: !prev.current}))
								}
								className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
							>
								{showPassword.current ? (
									<HiEyeOff className="w-5 h-5" />
								) : (
									<HiEye className="w-5 h-5" />
								)}
							</button>
						</div>
						{passwordErrors.current && (
							<p className="error-text">{passwordErrors.current}</p>
						)}
					</div>

					<div>
						<label className="label">New Password</label>
						<div className="relative">
							<input
								type={showPassword.new ? "text" : "password"}
								value={passwordData.new}
								onChange={(e) => handlePasswordChange("new", e.target.value)}
								className={cn(
									"input pr-10",
									passwordErrors.new && "input-error"
								)}
							/>
							<button
								type="button"
								onClick={() =>
									setShowPassword((prev) => ({...prev, new: !prev.new}))
								}
								className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
							>
								{showPassword.new ? (
									<HiEyeOff className="w-5 h-5" />
								) : (
									<HiEye className="w-5 h-5" />
								)}
							</button>
						</div>
						{passwordData.new && (
							<div className="mt-2">
								<div className="flex items-center justify-between text-sm mb-1">
									<span className="text-gray-500">Password strength</span>
									<span
										className={cn(
											"font-medium",
											passwordStrength.color === "error" && "text-error-600",
											passwordStrength.color === "warning" &&
												"text-warning-600",
											passwordStrength.color === "success" && "text-success-600"
										)}
									>
										{passwordStrength.level}
									</span>
								</div>
								<ProgressBar
									value={passwordStrength.percentage}
									variant={passwordStrength.color}
									size="sm"
								/>
							</div>
						)}
						{passwordErrors.new && (
							<p className="error-text">{passwordErrors.new}</p>
						)}
					</div>

					<div>
						<label className="label">Confirm New Password</label>
						<div className="relative">
							<input
								type={showPassword.confirm ? "text" : "password"}
								value={passwordData.confirm}
								onChange={(e) =>
									handlePasswordChange("confirm", e.target.value)
								}
								className={cn(
									"input pr-10",
									passwordErrors.confirm && "input-error"
								)}
							/>
							<button
								type="button"
								onClick={() =>
									setShowPassword((prev) => ({...prev, confirm: !prev.confirm}))
								}
								className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
							>
								{showPassword.confirm ? (
									<HiEyeOff className="w-5 h-5" />
								) : (
									<HiEye className="w-5 h-5" />
								)}
							</button>
						</div>
						{passwordErrors.confirm && (
							<p className="error-text">{passwordErrors.confirm}</p>
						)}
					</div>
				</div>
				<div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
					<button
						onClick={() => setShowPasswordModal(false)}
						className="btn-secondary btn-md"
					>
						Cancel
					</button>
					<button onClick={handleSavePassword} className="btn-primary btn-md">
						Update Password
					</button>
				</div>
			</Modal>

			{/* Delete Account Modal */}
			<Modal
				isOpen={showDeleteModal}
				onClose={() => setShowDeleteModal(false)}
				title="Delete Account"
				size="sm"
			>
				<div className="p-6">
					<div className="flex items-center justify-center w-12 h-12 bg-error-100 rounded-full mx-auto mb-4">
						<HiExclamationCircle className="w-6 h-6 text-error-600" />
					</div>
					<h3 className="text-lg font-semibold text-gray-900 text-center mb-2">
						Are you absolutely sure?
					</h3>
					<p className="text-sm text-gray-500 text-center mb-4">
						This action cannot be undone. This will permanently delete your
						account, videos, and all associated data.
					</p>
					<Alert variant="warning" className="mb-4">
						Please type <strong>DELETE</strong> to confirm.
					</Alert>
					<input
						type="text"
						placeholder="Type DELETE to confirm"
						className="input mb-4"
					/>
					<div className="flex gap-3">
						<button
							onClick={() => setShowDeleteModal(false)}
							className="btn-secondary btn-md flex-1"
						>
							Cancel
						</button>
						<button className="btn-danger btn-md flex-1">Delete Forever</button>
					</div>
				</div>
			</Modal>
		</div>
	);
};

// Notifications Tab
const NotificationsTab = ({user, onUpdate}) => {
	const [notifications, setNotifications] = useState(user.notifications);

	const handleToggle = (category, key) => {
		setNotifications((prev) => ({
			...prev,
			[category]: {
				...prev[category],
				[key]: !prev[category][key],
			},
		}));
	};

	return (
		<div className="space-y-6">
			{/* Email Notifications */}
			<Card>
				<Card.Header>
					<div className="flex items-center gap-3">
						<HiMail className="w-5 h-5 text-gray-500" />
						<h3 className="font-semibold text-gray-900">Email Notifications</h3>
					</div>
				</Card.Header>
				<Card.Body className="divide-y divide-gray-100">
					<Toggle
						enabled={notifications.email.projectComplete}
						onChange={() => handleToggle("email", "projectComplete")}
						label="Project completed"
						description="Get notified when your video is ready"
					/>
					<Toggle
						enabled={notifications.email.projectFailed}
						onChange={() => handleToggle("email", "projectFailed")}
						label="Project failed"
						description="Get notified if video generation fails"
					/>
					<Toggle
						enabled={notifications.email.weeklyReport}
						onChange={() => handleToggle("email", "weeklyReport")}
						label="Weekly report"
						description="Receive a weekly summary of your activity"
					/>
					<Toggle
						enabled={notifications.email.marketing}
						onChange={() => handleToggle("email", "marketing")}
						label="Marketing emails"
						description="News, updates, and promotional content"
					/>
				</Card.Body>
			</Card>

			{/* Push Notifications */}
			<Card>
				<Card.Header>
					<div className="flex items-center gap-3">
						<HiBell className="w-5 h-5 text-gray-500" />
						<h3 className="font-semibold text-gray-900">Push Notifications</h3>
					</div>
				</Card.Header>
				<Card.Body className="divide-y divide-gray-100">
					<Toggle
						enabled={notifications.push.projectComplete}
						onChange={() => handleToggle("push", "projectComplete")}
						label="Project completed"
						description="Browser notification when video is ready"
					/>
					<Toggle
						enabled={notifications.push.projectFailed}
						onChange={() => handleToggle("push", "projectFailed")}
						label="Project failed"
						description="Browser notification if processing fails"
					/>
				</Card.Body>
			</Card>
		</div>
	);
};

// Preferences Tab
const PreferencesTab = ({user, onUpdate}) => {
	const [preferences, setPreferences] = useState(user.preferences);

	const handleChange = (key, value) => {
		setPreferences((prev) => ({...prev, [key]: value}));
	};

	return (
		<div className="space-y-6">
			{/* Default Video Settings */}
			<Card>
				<Card.Header>
					<h3 className="font-semibold text-gray-900">
						Default Video Settings
					</h3>
				</Card.Header>
				<Card.Body className="space-y-6">
					<div>
						<label className="label">Default Template</label>
						<select
							value={preferences.defaultTemplate}
							onChange={(e) => handleChange("defaultTemplate", e.target.value)}
							className="input max-w-xs"
						>
							<option value="cinematic">🎬 Cinematic</option>
							<option value="dynamic">⚡ Dynamic</option>
							<option value="elegant">✨ Elegant</option>
							<option value="showcase">🏠 Property Showcase</option>
							<option value="aerial">🚁 Aerial View</option>
						</select>
					</div>

					<div>
						<label className="label">Default Quality</label>
						<select
							value={preferences.defaultQuality}
							onChange={(e) => handleChange("defaultQuality", e.target.value)}
							className="input max-w-xs"
						>
							<option value="720p">720p HD</option>
							<option value="1080p">1080p Full HD</option>
							<option value="4k">4K Ultra HD</option>
						</select>
					</div>

					<div>
						<label className="label">Default Aspect Ratio</label>
						<select
							value={preferences.defaultAspectRatio}
							onChange={(e) =>
								handleChange("defaultAspectRatio", e.target.value)
							}
							className="input max-w-xs"
						>
							<option value="16:9">16:9 Landscape</option>
							<option value="9:16">9:16 Portrait</option>
							<option value="1:1">1:1 Square</option>
							<option value="4:3">4:3 Standard</option>
						</select>
					</div>
				</Card.Body>
			</Card>

			{/* Appearance */}
			<Card>
				<Card.Header>
					<div className="flex items-center gap-3">
						<HiColorSwatch className="w-5 h-5 text-gray-500" />
						<h3 className="font-semibold text-gray-900">Appearance</h3>
					</div>
				</Card.Header>
				<Card.Body>
					<Toggle
						enabled={preferences.darkMode}
						onChange={(value) => handleChange("darkMode", value)}
						label="Dark Mode"
						description="Use dark theme across the platform"
					/>
				</Card.Body>
			</Card>

			{/* Behavior */}
			<Card>
				<Card.Header>
					<h3 className="font-semibold text-gray-900">Behavior</h3>
				</Card.Header>
				<Card.Body>
					<Toggle
						enabled={preferences.autoDownload}
						onChange={(value) => handleChange("autoDownload", value)}
						label="Auto-download completed videos"
						description="Automatically download videos when ready"
					/>
				</Card.Body>
			</Card>

			{/* Data Export */}
			<Card>
				<Card.Header>
					<h3 className="font-semibold text-gray-900">Data & Privacy</h3>
				</Card.Header>
				<Card.Body>
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm font-medium text-gray-900">
								Export your data
							</p>
							<p className="text-sm text-gray-500">
								Download a copy of all your data
							</p>
						</div>
						<button className="btn-secondary btn-md">
							<HiDownload className="w-4 h-4" />
							Export Data
						</button>
					</div>
				</Card.Body>
			</Card>
		</div>
	);
};

// Main Component
const SettingsPage = () => {
	const [activeTab, setActiveTab] = useState("profile");
	const [user, setUser] = useState(mockUser);

	const handleUpdateUser = (updates) => {
		setUser((prev) => ({...prev, ...updates}));
	};

	const renderTabContent = () => {
		switch (activeTab) {
			case "profile":
				return <ProfileTab user={user} onUpdate={handleUpdateUser} />;
			case "security":
				return <SecurityTab user={user} />;
			case "notifications":
				return <NotificationsTab user={user} onUpdate={handleUpdateUser} />;
			case "preferences":
				return <PreferencesTab user={user} onUpdate={handleUpdateUser} />;
			default:
				return null;
		}
	};

	return (
		<>
			<Helmet>
				<title>Settings - VideoGen AI</title>
			</Helmet>

			<div className="p-6">
				<PageHeader
					title="Settings"
					subtitle="Manage your account settings and preferences"
				/>

				<div className="flex flex-col lg:flex-row gap-6">
					{/* Sidebar Navigation */}
					<div className="lg:w-64 flex-shrink-0">
						<Card>
							<Card.Body className="p-2">
								<nav className="space-y-1">
									{settingsTabs.map((tab) => (
										<button
											key={tab.id}
											onClick={() => setActiveTab(tab.id)}
											className={cn(
												"w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
												activeTab === tab.id
													? "bg-primary-50 text-primary-700"
													: "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
											)}
										>
											<tab.icon className="w-5 h-5" />
											{tab.label}
										</button>
									))}
								</nav>
							</Card.Body>
						</Card>
					</div>

					{/* Content */}
					<div className="flex-1 min-w-0">
						<motion.div
							key={activeTab}
							initial={{opacity: 0, y: 10}}
							animate={{opacity: 1, y: 0}}
							transition={{duration: 0.2}}
						>
							{renderTabContent()}
						</motion.div>
					</div>
				</div>
			</div>
		</>
	);
};

export default SettingsPage;