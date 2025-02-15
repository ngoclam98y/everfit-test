import { IconProps } from "./declaration";
import "./style.scss";

export default function Icon({ className, icon, size, onClick }: IconProps) {
    return (
        <div className={`icon-wrap${className ? className = ` ${className}` : ''}`} style={{ fontSize: size }} onClick={onClick}>
            {icon}
        </div>
    )
}