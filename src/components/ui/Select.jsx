// client/src/components/ui/Select.jsx
import {forwardRef} from "react";
import {cn} from "@utils/cn";
import {HiChevronDown} from "react-icons/hi";

const Select = forwardRef(
	(
		{
			label,
			error,
			helperText,
			options = [],
			placeholder,
			className,
			containerClassName,
			...props
		},
		ref
	) => {
		return (
			<div className={cn("w-full", containerClassName)}>
				{label && <label className="label">{label}</label>}

				<div className="relative">
					<select
						ref={ref}
						className={cn(
							"input pr-10 appearance-none cursor-pointer",
							error && "input-error",
							className
						)}
						{...props}
					>
						{placeholder && (
							<option value="" disabled>
								{placeholder}
							</option>
						)}
						{options.map((option) => (
							<option key={option.value} value={option.value}>
								{option.label}
							</option>
						))}
					</select>

					<HiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
				</div>

				{error && <p className="error-text">{error}</p>}
				{!error && helperText && <p className="helper-text">{helperText}</p>}
			</div>
		);
	}
);

Select.displayName = "Select";

export default Select;
