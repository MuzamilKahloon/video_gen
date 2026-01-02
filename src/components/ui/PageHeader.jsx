// client/src/components/ui/PageHeader.jsx
import {cn} from "@utils/cn";
import { Link } from "react-router-dom";

const PageHeader = ({title, subtitle, actions, breadcrumbs, className}) => {
	return (
		<div className={cn("mb-6", className)}>
			{breadcrumbs && (
				<div className="flex items-center gap-2 text-sm text-slate-400 mb-2">
					{breadcrumbs.map((crumb, index) => (
						<div key={index} className="flex items-center gap-2">
							{index > 0 && <span className="text-slate-600">/</span>}
							{crumb.href ? (
								<Link
									to={crumb.href}
									className="hover:text-white transition-colors"
								>
									{crumb.label}
								</Link>
							) : (
								<span className="text-white">{crumb.label}</span>
							)}
						</div>
					))}
				</div>
			)}

			<div className="flex items-start justify-between gap-4">
				<div>
					<h1 className="text-2xl font-bold text-gray-900">{title}</h1>
					{subtitle && <p className="text-gray-600 mt-1">{subtitle}</p>}
				</div>

				{actions && <div className="flex items-center gap-3">{actions}</div>}
			</div>
		</div>
	);
};

export default PageHeader;
