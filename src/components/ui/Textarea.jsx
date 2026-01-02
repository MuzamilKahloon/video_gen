// client/src/components/ui/Textarea.jsx
import {forwardRef} from "react";
import {cn} from "@utils/cn";

const Textarea = forwardRef(
	(
		{
			label,
			error,
			helperText,
			className,
			containerClassName,
			rows = 4,
			...props
		},
		ref
	) => {
		return (
			<div className={cn("w-full", containerClassName)}>
				{label && <label className="label">{label}</label>}

				<textarea
					ref={ref}
					rows={rows}
					className={cn("input resize-none", error && "input-error", className)}
					{...props}
				/>

				{error && <p className="error-text">{error}</p>}
				{!error && helperText && <p className="helper-text">{helperText}</p>}
			</div>
		);
	}
);

Textarea.displayName = "Textarea";

export default Textarea;
