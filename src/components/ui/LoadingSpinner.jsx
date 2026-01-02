// client/src/components/ui/LoadingSpinner.jsx
import {cn} from "@utils/cn";

const LoadingSpinner = ({size = "md", className, text}) => {
	const sizes = {
		sm: "w-4 h-4 border-2",
		md: "w-8 h-8 border-2",
		lg: "w-12 h-12 border-3",
		xl: "w-16 h-16 border-4",
	};

	return (
		<div className="flex flex-col items-center justify-center gap-3">
			<div
				className={cn(
					"border-gray-200 border-t-primary-600 rounded-full animate-spin",
					sizes[size],
					className
				)}
			/>
			{text && <p className="text-sm text-gray-600">{text}</p>}
		</div>
	);
};

export default LoadingSpinner;
