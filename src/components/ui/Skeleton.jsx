// client/src/components/ui/Skeleton.jsx
import {cn} from "@utils/cn";

const Skeleton = ({
	className,
	variant = "rectangular",
	width,
	height,
	...props
}) => {
	const variants = {
		rectangular: "rounded",
		circular: "rounded-full",
		text: "rounded h-4",
	};

	return (
		<div
			className={cn("skeleton", variants[variant], className)}
			style={{width, height}}
			{...props}
		/>
	);
};

export default Skeleton;
