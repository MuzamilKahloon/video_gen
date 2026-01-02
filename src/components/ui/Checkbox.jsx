// client/src/components/ui/Checkbox.jsx
import {forwardRef} from "react";
import {cn} from "@utils/cn";

const Checkbox = forwardRef(
	({label, error, className, containerClassName, ...props}, ref) => {
		return (
			<div className={cn("", containerClassName)}>
				<label className="flex items-center gap-2 cursor-pointer group">
					<input
						ref={ref}
						type="checkbox"
						className={cn(
							"w-4 h-4 text-primary-600 bg-white border-gray-300 rounded",
							"focus:ring-2 focus:ring-primary-500 focus:ring-offset-0",
							"cursor-pointer transition-colors",
							error && "border-error-500",
							className
						)}
						{...props}
					/>
					{label && (
						<span className="text-sm text-gray-700 group-hover:text-gray-900">
							{label}
						</span>
					)}
				</label>

				{error && <p className="error-text">{error}</p>}
			</div>
		);
	}
);

Checkbox.displayName = "Checkbox";

export default Checkbox;
