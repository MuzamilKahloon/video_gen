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

const AnimatedLine = ({ className = "" }) => (
  <div className={`h-[1px] bg-gray-100 overflow-hidden ${className}`}>
    <motion.div
      className="w-1/3 h-full"
      style={{ backgroundColor: '#E7F014' }}
      animate={{ x: ["-100%", "300%"] }}
      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
    />
  </div>
);

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

				<h1 className="text-2xl font-bold text-black mb-2">
					Password reset successful!
				</h1>
				<p className="text-base mb-6" style={{ color: '#C5C2BF' }}>
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
			<div className="mb-14 text-center">
				<motion.div 
					initial={{ opacity: 0, y: -10 }}
					animate={{ opacity: 1, y: 0 }}
					className="inline-block bg-white border-2 border-black font-bold text-[10px] uppercase tracking-widest px-3 py-1 mb-6"
					style={{ color: 'black' }}
				>
					Security Update
				</motion.div>
				
				<h1 className="text-4xl font-bold text-black mb-4 md:mb-6 leading-tight uppercase">
					Set <span style={{ color: '#C5C2BF' }}>new password</span>
				</h1>
				<p className="text-base" style={{ color: '#C5C2BF' }}>Please enter your new security credentials below.</p>
			</div>

			{/* Form */}
			<form onSubmit={handleSubmit} className="space-y-5">
				<div>
				<div className="space-y-2">
					<label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">
						New password
					</label>
					<div className="relative group">
						<div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-black transition-colors">
							<HiLockClosed className="w-5 h-5" />
						</div>
						<input
							type={showPassword ? "text" : "password"}
							name="password"
							value={formData.password}
							onChange={handleChange}
							placeholder="Create a strong password"
							className={`w-full bg-white text-black placeholder-gray-300 border-2 rounded-none py-4 pl-12 pr-12 outline-none transition-all duration-300 font-bold ${errors.password ? "border-red-500" : "border-gray-100 focus:border-black shadow-none focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:border-gray-200"}`}
							autoFocus
						/>
						<button
							type="button"
							onClick={() => setShowPassword(!showPassword)}
							className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-black focus:outline-none transition-colors"
						>
							{showPassword ? <HiEyeOff className="w-5 h-5" /> : <HiEye className="w-5 h-5" />}
						</button>
					</div>
					{errors.password && <p className="text-[10px] font-bold text-red-500 uppercase tracking-tighter mt-1 ml-1">{errors.password}</p>}
				</div>

					{/* Password Strength Indicator */}
						<div className="mt-2 px-1">
							<div className="flex items-center justify-between mb-1 text-[10px] font-black uppercase tracking-widest text-gray-400">
								<span>Security Strength</span>
								<span className={passwordStrength.level === 'Strong' ? 'text-green-500' : 'text-[#E7F014]'}>
									{passwordStrength.level}
								</span>
							</div>
							<div className="h-2 bg-gray-100 flex">
								<motion.div
									className="h-full"
									style={{ 
										width: `${passwordStrength.percentage}%`,
										backgroundColor: passwordStrength.level === 'Strong' ? '#22c55e' : '#E7F014' 
									}}
									animate={{ width: `${passwordStrength.percentage}%` }}
								/>
							</div>
						</div>
				</div>

				<div className="space-y-2 mt-4">
					<label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">
						Confirm new password
					</label>
					<div className="relative group">
						<div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-black transition-colors">
							<HiLockClosed className="w-5 h-5" />
						</div>
						<input
							type={showConfirmPassword ? "text" : "password"}
							name="confirmPassword"
							value={formData.confirmPassword}
							onChange={handleChange}
							placeholder="Re-enter your password"
							className={`w-full bg-white text-black placeholder-gray-300 border-2 rounded-none py-4 pl-12 pr-12 outline-none transition-all duration-300 font-bold ${errors.confirmPassword ? "border-red-500" : "border-gray-100 focus:border-black shadow-none focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:border-gray-200"}`}
						/>
						<button
							type="button"
							onClick={() => setShowConfirmPassword(!showConfirmPassword)}
							className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-black focus:outline-none transition-colors"
						>
							{showConfirmPassword ? <HiEyeOff className="w-5 h-5" /> : <HiEye className="w-5 h-5" />}
						</button>
					</div>
					{errors.confirmPassword && <p className="text-[10px] font-bold text-red-500 uppercase tracking-tighter mt-1 ml-1">{errors.confirmPassword}</p>}
				</div>

				<motion.button
					type="submit"
					disabled={loading}
					whileHover={{ scale: 1.02 }}
					whileTap={{ scale: 0.98 }}
					className="w-full py-5 text-black font-black uppercase tracking-[0.2em] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center justify-center gap-3 group mt-12"
					style={{ backgroundColor: '#E7F014' }}
				>
					{loading ? (
						<div className="w-5 h-5 border-4 border-black/20 border-t-black rounded-full animate-spin" />
					) : (
						"Reset Password"
					)}
				</motion.button>
			</form>

			{/* Back to Login */}
			<Link to="/login" className="block mt-6">
				<button className="w-full py-4 border-2 border-gray-100 hover:border-black transition-all font-bold text-sm tracking-widest uppercase flex items-center justify-center gap-2">
					<HiArrowLeft className="w-4 h-4" />
					Back to sign in
				</button>
			</Link>
		</motion.div>
	);
};

export default ResetPasswordPage;
