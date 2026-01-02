// client/src/components/ui/EmptyState.jsx
import {cn} from "@utils/cn";

const EmptyState = ({icon, title, description, action, className}) => {
	return (
		<div className={cn("empty-state", className)}>
			{icon && <div className="empty-state-icon">{icon}</div>}
			{title && <h3 className="empty-state-title">{title}</h3>}
			{description && <p className="empty-state-description">{description}</p>}
			{action && <div className="mt-6">{action}</div>}
		</div>
	);
};

export default EmptyState;
