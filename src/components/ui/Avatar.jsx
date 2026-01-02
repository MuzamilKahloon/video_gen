// client/src/components/ui/Avatar.jsx
import {cn} from "@utils/cn";

const Avatar = ({src, name, size = "md", className}) => {
	const sizes = {
		xs: "avatar-xs",
		sm: "avatar-sm",
		md: "avatar-md",
		lg: "avatar-lg",
		xl: "avatar-xl",
	};

	const getInitials = (name) => {
		if (!name) return "?";
		return name
			.split(" ")
			.map((n) => n[0])
			.join("")
			.toUpperCase()
			.slice(0, 2);
	};

	return (
		<div className={cn("avatar", sizes[size], className)}>
			{src ? (
				<img src={src} alt={name} className="w-full h-full object-cover" />
			) : (
				<span>{getInitials(name)}</span>
			)}
		</div>
	);
};

export default Avatar;
