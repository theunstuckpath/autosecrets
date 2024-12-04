import React from 'react';
import { ExternalLink } from 'lucide-react';
import { useNotifications } from '../hooks/useNotifications';
import { getTimeSincePosted } from '../utils/date';
import { LoadingState } from './LoadingState';
import { ErrorState } from './ErrorState';
import { Link } from 'react-router-dom';

interface NotificationListProps {
  onClose?: () => void;
}

export function NotificationList({ onClose }: NotificationListProps) {
  const { notifications, isLoading, error, markAsRead } = useNotifications();

  if (isLoading) {
    return <LoadingState message="Loading notifications..." />;
  }

  if (error) {
    return <ErrorState message="Failed to load notifications" />;
  }

  if (!notifications.length) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No notifications yet</p>
      </div>
    );
  }

  const handleNotificationClick = (notification: any) => {
    if (!notification.read) {
      markAsRead(notification.id);
    }
    
    if (notification.data?.listingId) {
      onClose?.();
    }
  };

  return (
    <div className="divide-y">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`p-4 hover:bg-gray-50 transition-colors cursor-pointer ${
            notification.read ? 'bg-gray-50' : 'bg-white'
          }`}
          onClick={() => handleNotificationClick(notification)}
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <h4 className="font-medium text-gray-900 mb-1">
                {notification.title}
              </h4>
              <p className="text-gray-600 text-sm mb-2">{notification.message}</p>
              <span className="text-xs text-gray-500">
                {getTimeSincePosted(notification.createdAt)}
              </span>
            </div>
            {notification.data?.listingId && (
              <Link
                to={`/listing/${notification.data.listingId}`}
                className="flex-shrink-0 p-2 text-gray-400 hover:text-gray-600"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink className="w-4 h-4" />
              </Link>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
