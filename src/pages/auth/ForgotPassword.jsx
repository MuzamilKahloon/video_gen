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

				<h1 className="text-2xl font-bold text-gray-900 mb-2">
					Check your email
				</h1>
				<p className="text-gray-600 mb-6">
					We've sent a password reset link to{" "}
					<span className="font-medium text-gray-900">{email}</span>
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

					<Link to="/login">
						<Button variant="ghost" className="w-full">
							<HiArrowLeft className="w-4 h-4" />
							Back to sign in
						</Button>
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
			<div className="text-center mb-8">
				<h1 className="text-3xl font-bold text-gray-900 mb-2">
					Forgot password?
				</h1>
				<p className="text-gray-600">
					No worries, we'll send you reset instructions
				</p>
			</div>

			{/* Form */}
			<form onSubmit={handleSubmit} className="space-y-5">
				<Input
					label="Email address"
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					placeholder="you@example.com"
					leftIcon={<HiMail className="w-5 h-5" />}
					error={error}
					autoComplete="email"
					autoFocus
				/>

				<Button type="submit" className="w-full" size="lg" loading={loading}>
					Send Reset Link
				</Button>
			</form>

			{/* Back to Login */}
			<Link to="/login">
				<Button variant="ghost" className="w-full mt-4">
					<HiArrowLeft className="w-4 h-4" />
					Back to sign in
				</Button>
			</Link>
		</motion.div>
	);
};

export default ForgotPasswordPage;
