// client/src/components/ui/Tooltip.jsx
import {useState} from "react";
import {cn} from "@utils/cn";

const Tooltip = ({children, content, position = "top"}) => {
	const [visible, setVisible] = useState(false);

	const positions = {
		top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
		bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
		left: "right-full top-1/2 -translate-y-1/2 mr-2",
		right: "left-full top-1/2 -translate-y-1/2 ml-2",
	};

	return (
		<div
			className="relative inline-block"
			onMouseEnter={() => setVisible(true)}
			onMouseLeave={() => setVisible(false)}
		>
			{children}
			{visible && content && (
				<div className={cn("tooltip", positions[position])}>{content}</div>
			)}
		</div>
	);
};

export default Tooltip;
