// client/src/pages/auth/ForgotPasswordPage.jsx
import {useState} from "react";
import {Link} from "react-router-dom";
import {motion} from "framer-motion";
import {HiMail, HiArrowLeft} from "react-icons/hi";
import Input from "@components/ui/Input";
import Button from "@components/ui/Button";
import Alert from "@components/ui/Alert";
import authService from "@services/auth.service";
import {validateEmail} from "@utils/validators";
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

const ForgotPasswordPage = () => {
	const [email, setEmail] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const [submitted, setSubmitted] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");

		if (!email) {
			setError("Email is required");
			return;
		}

		if (!validateEmail(email)) {
			setError("Invalid email address");
			return;
		}

		try {
			setLoading(true);
			await authService.forgotPassword(email);
			setSubmitted(true);
			toast.success("Reset link sent to your email");
		} catch (err) {
			setError(err.response?.data?.message || "Failed to send reset link");
		} finally {
			setLoading(false);
		}
	};

	if (submitted) {
		return (
			<motion.div
				initial={{opacity: 0, scale: 0.95}}
				animate={{opacity: 1, scale: 1}}
				transition={{duration: 0.4}}
				className="text-center"
			>
				<div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-4">
					<HiMail className="w-8 h-8 text-success-600" />
				</div>

				<h1 className="text-2xl font-bold text-black mb-2">
					Check your email
				</h1>
				<p className="text-base mb-6" style={{ color: '#C5C2BF' }}>
					We've sent a password reset link to{" "}
					<span className="font-medium text-black">{email}</span>
				</p>

				<Alert
					type="info"
					message="Didn't receive the email? Check your spam folder or try again."
					className="mb-6"
				/>

				<div className="space-y-3">
					<Button
						onClick={() => setSubmitted(false)}
						variant="secondary"
						className="w-full"
					>
						Try another email
					</Button>

					<Link to="/login" className="block">
						<button 
							className="w-full py-4 border-2 border-gray-100 hover:border-black transition-all font-bold text-sm tracking-widest uppercase flex items-center justify-center gap-2"
						>
							<HiArrowLeft className="w-4 h-4" />
							Back to sign in
						</button>
					</Link>
				</div>
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
					Account Recovery
				</motion.div>
				
				<h1 className="text-4xl font-bold text-black mb-4 md:mb-6 leading-tight uppercase">
					Forgot <span style={{ color: '#C5C2BF' }}>password?</span>
				</h1>
				<p className="text-base" style={{ color: '#C5C2BF' }}>
					No worries, we'll send you reset instructions.
				</p>
			</div>

			{/* Form */}
			<form onSubmit={handleSubmit} className="space-y-6">
				<div className="space-y-2">
					<label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">
						Email address
					</label>
					<div className="relative group">
						<div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-black transition-colors">
							<HiMail className="w-5 h-5" />
						</div>
						<input
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder="you@example.com"
							className={`w-full bg-white text-black placeholder-gray-300 border-2 rounded-none py-4 pl-12 pr-4 outline-none transition-all duration-300 font-bold ${error ? "border-red-500" : "border-gray-100 focus:border-black shadow-none focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:border-gray-200"}`}
							autoComplete="email"
							autoFocus
						/>
						{error && <p className="text-[10px] font-bold text-red-500 uppercase tracking-tighter mt-1 ml-1">{error}</p>}
					</div>
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
						"Send Reset Link"
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

export default ForgotPasswordPage;
