import './Notification.css';
import { Info, X } from 'lucide-react';

type NotificationProps = {
    title?: string;
    message?: string;
    onClose?: () => void;
    className?: string;
};

export default function Notification({
    title = 'Notification',
    message = 'File download successful !',
    onClose,
    className = ''
}: NotificationProps) {
    return (
        <div className={`notification ${className}`}>
            <div className="notification-content">
                <Info className="notification-icon" size={20} />
                <div className="notification-text">
                    <p className="notification-title">{title}</p>
                    <p className="notification-message">{message}</p>
                </div>
                {onClose && (
                    <button 
                        className="notification-close" 
                        onClick={onClose}
                        type="button"
                        aria-label="Close notification"
                    >
                        <X size={16} />
                    </button>
                )}
            </div>
        </div>
    );
}
