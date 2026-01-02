// client/src/components/ui/Modal.jsx
import {useEffect} from "react";
import {motion, AnimatePresence} from "framer-motion";
import {HiX} from "react-icons/hi";
import {cn} from "@utils/cn";

const Modal = ({
	isOpen,
	onClose,
	title,
	children,
	footer,
	size = "md",
	closeOnOverlayClick = true,
	showCloseButton = true,
}) => {
	// Close on ESC key
	useEffect(() => {
		const handleEscape = (e) => {
			if (e.key === "Escape" && isOpen) {
				onClose();
			}
		};

		document.addEventListener("keydown", handleEscape);
		return () => document.removeEventListener("keydown", handleEscape);
	}, [isOpen, onClose]);

	// Prevent body scroll when modal is open
	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "unset";
		}

		return () => {
			document.body.style.overflow = "unset";
		};
	}, [isOpen]);

	const sizes = {
		sm: "max-w-md",
		md: "max-w-lg",
		lg: "max-w-2xl",
		xl: "max-w-4xl",
		full: "max-w-full mx-4",
	};

	return (
		<AnimatePresence>
			{isOpen && (
				<div
					className="modal-overlay"
					onClick={closeOnOverlayClick ? onClose : undefined}
				>
					<motion.div
						initial={{opacity: 0, scale: 0.95}}
						animate={{opacity: 1, scale: 1}}
						exit={{opacity: 0, scale: 0.95}}
						transition={{duration: 0.2}}
						className={cn("modal-content", sizes[size])}
						onClick={(e) => e.stopPropagation()}
					>
						{/* Header */}
						{(title || showCloseButton) && (
							<div className="modal-header">
								{title && (
									<h3 className="text-lg font-semibold text-gray-900">
										{title}
									</h3>
								)}
								{showCloseButton && (
									<button
										onClick={onClose}
										className="p-1 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
									>
										<HiX className="w-5 h-5" />
									</button>
								)}
							</div>
						)}

						{/* Body */}
						<div className="modal-body">{children}</div>

						{/* Footer */}
						{footer && <div className="modal-footer">{footer}</div>}
					</motion.div>
				</div>
			)}
		</AnimatePresence>
	);
};

export default Modal;
