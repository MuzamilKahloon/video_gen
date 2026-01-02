// client/src/components/ui/StatusBadge.jsx
import Badge from "@components/ui/Badge";
import {JOB_STATUS_CONFIG} from "@utils/constants";

const StatusBadge = ({status}) => {
	const config = JOB_STATUS_CONFIG[status] || JOB_STATUS_CONFIG.pending;

	const variantMap = {
		success: "success",
		error: "error",
		warning: "warning",
		info: "info",
	};

	return (
		<Badge variant={variantMap[config.color] || "gray"}>{config.label}</Badge>
	);
};

export default StatusBadge;
