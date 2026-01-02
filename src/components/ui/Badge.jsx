// client/src/components/ui/Badge.jsx
import {cn} from "@utils/cn";

const Badge = ({children, variant = "gray", className, ...props}) => {
	const variants = {
		gray: "badge-gray",
		primary: "badge-primary",
		success: "badge-success",
		warning: "badge-warning",
		error: "badge-error",
		info: "badge-info",
	};

	return (
		<span className={cn("badge", variants[variant], className)} {...props}>
			{children}
		</span>
	);
};

export default Badge;
