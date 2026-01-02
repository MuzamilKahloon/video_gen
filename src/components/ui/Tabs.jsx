// client/src/components/ui/Tabs.jsx
import {useState} from "react";
import {cn} from "@utils/cn";

const Tabs = ({tabs, defaultTab, className, children}) => {
	const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

	return (
		<div className={cn("w-full", className)}>
			<div className="tabs">
				{tabs.map((tab) => (
					<button
						key={tab.id}
						onClick={() => setActiveTab(tab.id)}
						className={cn("tab", activeTab === tab.id && "tab-active")}
					>
						{tab.icon && <span className="mr-2">{tab.icon}</span>}
						{tab.label}
					</button>
				))}
			</div>

			<div className="mt-6">
				{typeof children === "function" ? children(activeTab) : children}
			</div>
		</div>
	);
};

export default Tabs;
