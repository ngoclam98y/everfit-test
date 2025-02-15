import { ButtonProps } from "./declaration";
import "./style.scss";

const Button: React.FC<ButtonProps> = ({
    variant = "primary",
    size = "medium",
    className,
    children,
    ...props
}) => {
    return (
        <button className={`button ${variant} ${size} ${className || ""}`} {...props}>
            {children}
        </button>
    );
};

export default Button;