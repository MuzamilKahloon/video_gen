// client/src/components/ui/Alert.jsx
import {
	HiCheckCircle,
	HiExclamation,
	HiInformationCircle,
	HiX,
	HiXCircle,
} from "react-icons/hi";
import {cn} from "@utils/cn";

const Alert = ({type = "info", title, message, onClose, className}) => {
	const types = {
		success: {
			icon: HiCheckCircle,
			bg: "bg-success-50",
			border: "border-success-200",
			iconColor: "text-success-600",
			titleColor: "text-success-900",
			textColor: "text-success-700",
		},
		error: {
			icon: HiXCircle,
			bg: "bg-error-50",
			border: "border-error-200",
			iconColor: "text-error-600",
			titleColor: "text-error-900",
			textColor: "text-error-700",
		},
		warning: {
			icon: HiExclamation,
			bg: "bg-warning-50",
			border: "border-warning-200",
			iconColor: "text-warning-600",
			titleColor: "text-warning-900",
			textColor: "text-warning-700",
		},
		info: {
			icon: HiInformationCircle,
			bg: "bg-info-50",
			border: "border-info-200",
			iconColor: "text-info-600",
			titleColor: "text-info-900",
			textColor: "text-info-700",
		},
	};

	const config = types[type];
	const Icon = config.icon;

	return (
		<div
			className={cn(
				"rounded-lg border p-4",
				config.bg,
				config.border,
				className
			)}
		>
			<div className="flex items-start gap-3">
				<Icon
					className={cn("w-5 h-5 flex-shrink-0 mt-0.5", config.iconColor)}
				/>

				<div className="flex-1 min-w-0">
					{title && (
						<h4 className={cn("font-medium text-sm mb-1", config.titleColor)}>
							{title}
						</h4>
					)}
					{message && (
						<p className={cn("text-sm", config.textColor)}>{message}</p>
					)}
				</div>

				{onClose && (
					<button
						onClick={onClose}
						className={cn(
							"p-1 rounded-lg hover:bg-black/5 transition-colors flex-shrink-0",
							config.iconColor
						)}
					>
						<HiX className="w-4 h-4" />
					</button>
				)}
			</div>
		</div>
	);
};

export default Alert;
