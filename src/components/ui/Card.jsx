// client/src/components/ui/Card.jsx
import {cn} from "@utils/cn";

const Card = ({children, className, hover = false, ...props}) => {
	return (
		<div className={cn("card", hover && "card-hover", className)} {...props}>
			{children}
		</div>
	);
};

const CardHeader = ({children, className, ...props}) => {
	return (
		<div className={cn("card-header", className)} {...props}>
			{children}
		</div>
	);
};

const CardBody = ({children, className, ...props}) => {
	return (
		<div className={cn("card-body", className)} {...props}>
			{children}
		</div>
	);
};

const CardFooter = ({children, className, ...props}) => {
	return (
		<div className={cn("card-footer", className)} {...props}>
			{children}
		</div>
	);
};

Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;

export default Card;
