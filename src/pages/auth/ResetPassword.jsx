// client/src/pages/auth/ResetPasswordPage.jsx
import {useState} from "react";
import {Link, useParams, useNavigate} from "react-router-dom";
import {motion} from "framer-motion";
import {HiLockClosed, HiEye, HiEyeOff, HiCheckCircle} from "react-icons/hi";
import Input from "@components/ui/Input";
import Button from "@components/ui/Button";
import authService from "@services/auth.service";
import {validatePassword, getPasswordStrength} from "@utils/validators";
import toast from "react-hot-toast";

const ResetPasswordPage = () => {
	const {token} = useParams();
	const navigate = useNavigate();
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [formData, setFormData] = useState({
		password: "",
		confirmPassword: "",
	});
	const [errors, setErrors] = useState({});
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);

	const handleChange = (e) => {
		const {name, value} = e.target;
		setFormData((prev) => ({...prev, [name]: value}));
		if (errors[name]) {
			setErrors((prev) => ({...prev, [name]: ""}));
		}
	};

	const validate = () => {
		const newErrors = {};

		if (!formData.password) {
			newErrors.password = "Password is required";
		} else if (!validatePassword(formData.password)) {
			newErrors.password =
				"Password must be at least 8 characters with uppercase, lowercase, and number";
		}

		if (!formData.confirmPassword) {
			newErrors.confirmPassword = "Please confirm your password";
		} else if (formData.password !== formData.confirmPassword) {
			newErrors.confirmPassword = "Passwords do not match";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!validate()) return;

		try {
			setLoading(true);
			await authService.resetPassword(token, formData.password);
			setSuccess(true);
			toast.success("Password reset successfully");
			setTimeout(() => navigate("/login"), 3000);
		} catch (err) {
			toast.error(err.response?.data?.message || "Failed to reset password");
		} finally {
			setLoading(false);
		}
	};

	const passwordStrength = formData.password
		? getPasswordStrength(formData.password)
		: null;

	if (success) {
		return (
			<motion.div
				initial={{opacity: 0, scale: 0.95}}
				animate={{opacity: 1, scale: 1}}
				transition={{duration: 0.4}}
				className="text-center"
			>
				<div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-4">
					<HiCheckCircle className="w-8 h-8 text-success-600" />
				</div>

				<h1 className="text-2xl font-bold text-gray-900 mb-2">
					Password reset successful!
				</h1>
				<p className="text-gray-600 mb-6">
					Your password has been reset. Redirecting to login...
				</p>

				<Link to="/login">
					<Button className="w-full">Continue to Login</Button>
				</Link>
			</motion.div>
		);
	}

	return (
		<motion.div
			initial={{opacity: 0, y: 20}}
			animate={{opacity: 1, y: 0}}
			transition={{duration: 0.4}}
		>
			{/* Header */}
			<div className="text-center mb-8">
				<h1 className="text-3xl font-bold text-gray-900 mb-2">
					Set new password
				</h1>
				<p className="text-gray-600">Please enter your new password</p>
			</div>

			{/* Form */}
			<form onSubmit={handleSubmit} className="space-y-5">
				<div>
					<Input
						label="New password"
						type={showPassword ? "text" : "password"}
						name="password"
						value={formData.password}
						onChange={handleChange}
						placeholder="Create a strong password"
						leftIcon={<HiLockClosed className="w-5 h-5" />}
						rightIcon={
							<button
								type="button"
								onClick={() => setShowPassword(!showPassword)}
								className="focus:outline-none"
							>
								{showPassword ? (
									<HiEyeOff className="w-5 h-5" />
								) : (
									<HiEye className="w-5 h-5" />
								)}
							</button>
						}
						error={errors.password}
						autoFocus
					/>

					{/* Password Strength Indicator */}
					{formData.password && passwordStrength && (
						<div className="mt-2">
							<div className="flex items-center justify-between mb-1">
								<span className="text-xs text-gray-600">Password strength</span>
								<span
									className={`text-xs font-medium text-${passwordStrength.color}-600`}
								>
									{passwordStrength.level}
								</span>
							</div>
							<div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
								<div
									className={`h-full bg-${passwordStrength.color}-500 transition-all duration-300`}
									style={{width: `${passwordStrength.percentage}%`}}
								/>
							</div>
						</div>
					)}
				</div>

				<Input
					label="Confirm new password"
					type={showConfirmPassword ? "text" : "password"}
					name="confirmPassword"
					value={formData.confirmPassword}
					onChange={handleChange}
					placeholder="Re-enter your password"
					leftIcon={<HiLockClosed className="w-5 h-5" />}
					rightIcon={
						<button
							type="button"
							onClick={() => setShowConfirmPassword(!showConfirmPassword)}
							className="focus:outline-none"
						>
							{showConfirmPassword ? (
								<HiEyeOff className="w-5 h-5" />
							) : (
								<HiEye className="w-5 h-5" />
							)}
						</button>
					}
					error={errors.confirmPassword}
				/>

				<Button type="submit" className="w-full" size="lg" loading={loading}>
					Reset Password
				</Button>
			</form>

			{/* Back to Login */}
			<Link to="/login">
				<Button variant="ghost" className="w-full mt-4">
					Back to sign in
				</Button>
			</Link>
		</motion.div>
	);
};

export default ResetPasswordPage;
