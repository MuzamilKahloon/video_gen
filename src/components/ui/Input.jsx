// client/src/components/ui/Input.jsx
import {forwardRef} from "react";
import {cn} from "@utils/cn";

const Input = forwardRef(
	(
		{
			label,
			error,
			helperText,
			leftIcon,
			rightIcon,
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
					{leftIcon && (
						<div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
							{leftIcon}
						</div>
					)}

					<input
						ref={ref}
						className={cn(
							"input",
							error && "input-error",
							leftIcon && "pl-10",
							rightIcon && "pr-10",
							className
						)}
						{...props}
					/>

					{rightIcon && (
						<div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
							{rightIcon}
						</div>
					)}
				</div>

				{error && <p className="error-text">{error}</p>}
				{!error && helperText && <p className="helper-text">{helperText}</p>}
			</div>
		);
	}
);

Input.displayName = "Input";

export default Input;
