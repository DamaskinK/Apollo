import React, { createContext, useContext, useState, useCallback } from 'react';
import Notification from '../components/ui/Notification';
import './NotificationContainer.css';

interface NotificationData {
    id: string;
    title: string;
    message: string;
    isClosing?: boolean;
}

interface NotificationContextType {
    showNotification: (title: string, message: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotification = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('useNotification must be used within NotificationProvider');
    }
    return context;
};

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [notifications, setNotifications] = useState<NotificationData[]>([]);

    const showNotification = useCallback((title: string, message: string) => {
        const id = Date.now().toString();
        const newNotification: NotificationData = { id, title, message, isClosing: false };

        setNotifications(prev => [...prev, newNotification]);

        // Start fade-out after 2.7 seconds
        setTimeout(() => {
            setNotifications(prev => prev.map(n =>
                n.id === id ? { ...n, isClosing: true } : n
            ));
        }, 2700);

        // Remove after fade-out animation completes (3 seconds total)
        setTimeout(() => {
            setNotifications(prev => prev.filter(n => n.id !== id));
        }, 3000);
    }, []);

    const handleClose = useCallback((id: string) => {
        // Start fade-out animation
        setNotifications(prev => prev.map(n =>
            n.id === id ? { ...n, isClosing: true } : n
        ));

        // Remove after animation completes
        setTimeout(() => {
            setNotifications(prev => prev.filter(n => n.id !== id));
        }, 300);
    }, []);

    return (
        <NotificationContext.Provider value={{ showNotification }}>
            {children}
            <div className="notification-container">
                {notifications.map((notification) => (
                    <Notification
                        key={notification.id}
                        title={notification.title}
                        message={notification.message}
                        onClose={() => handleClose(notification.id)}
                        className={notification.isClosing ? 'notification-slide-out' : 'notification-slide-in'}
                    />
                ))}
            </div>
        </NotificationContext.Provider>
    );
};
