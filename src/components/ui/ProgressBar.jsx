// client/src/components/ui/ProgressBar.jsx
import {cn} from "@utils/cn";

const ProgressBar = ({value = 0, max = 100, className, showLabel = false}) => {
	const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

	return (
		<div className="w-full">
			{showLabel && (
				<div className="flex items-center justify-between mb-2">
					<span className="text-sm text-gray-600">Progress</span>
					<span className="text-sm font-medium text-gray-900">
						{Math.round(percentage)}%
					</span>
				</div>
			)}
			<div className={cn("progress-bar", className)}>
				<div className="progress-fill" style={{width: `${percentage}%`}} />
			</div>
		</div>
	);
};

export default ProgressBar;
