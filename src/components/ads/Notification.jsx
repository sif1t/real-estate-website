import React from 'react';
import { useAdContext } from '../../context/AdContext';

const Notification = () => {
    const { notification, showNotification, dismissNotification } = useAdContext();

    if (!showNotification || !notification) {
        return null;
    }

    const notificationTypeClasses = {
        property: 'bg-blue-500',
        promotion: 'bg-green-500',
        agent: 'bg-purple-500',
        investment: 'bg-amber-500',
        service: 'bg-indigo-500'
    };

    const notificationBgClass = notificationTypeClasses[notification.type] || 'bg-gray-500';

    // Format the timestamp for display
    const formatTime = (timestamp) => {
        return new Intl.DateTimeFormat('en-US', {
            hour: '2-digit',
            minute: '2-digit'
        }).format(timestamp);
    };

    return (
        <div className={`fixed top-5 right-5 z-50 max-w-xs w-full shadow-lg rounded-md overflow-hidden transition-all duration-500 transform ${showNotification ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}>
            <div className={`${notificationBgClass} px-4 py-2 text-white flex items-center justify-between`}>
                <span className="font-medium">{notification.title}</span>
                <span className="text-xs">{formatTime(notification.timestamp)}</span>
            </div>
            <div className="bg-white p-3">
                <div className="flex items-start">
                    <div className="flex-1">
                        <p className="text-gray-800">
                            {notification.message}
                        </p>
                        <div className="mt-2 flex justify-end">
                            <button
                                onClick={dismissNotification}
                                className="text-xs text-gray-500 hover:text-gray-700 transition-colors"
                            >
                                Dismiss
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Notification;