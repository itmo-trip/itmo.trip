import { useEffect } from "react";
import "./css/SuccessLoginToast.css";

interface Props {
    message: string;
    duration?: number;
    onClose: () => void;
}

export function SuccessLoginToast({ message, duration = 3000, onClose }: Props) {
    useEffect(() => {
        const timer = setTimeout(onClose, duration);
        return () => clearTimeout(timer);
    }, [duration, onClose]);

    return (
        <div className="toast-wrapper">
            <div className="success-login-toast">{message}</div>
        </div>
    );
}
