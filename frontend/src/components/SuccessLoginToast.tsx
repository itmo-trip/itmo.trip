import { useEffect, useState } from "react";
import "./css/SuccessLoginToast.css";

interface Props {
    message: string;
    duration?: number;
    onClose: () => void;
}

export function SuccessLoginToast({ message, duration = 1500, onClose }: Props) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setVisible(true);
        const hideTimer = setTimeout(() => setVisible(false), duration);

        const removeTimer = setTimeout(onClose, duration + 500);

        return () => {
            clearTimeout(hideTimer);
            clearTimeout(removeTimer);
        };
    }, [duration, onClose]);

    return (
        <div className="toast-wrapper">
            {(message || visible) && (
                <div className={`success-login-toast ${visible ? "show" : "hide"}`}>
                    {message}
                </div>
            )}
        </div>
    );
}
