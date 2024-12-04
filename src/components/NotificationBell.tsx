import React, { useState } from 'react';
import { Bell } from 'lucide-react';
import { useNotifications } from '../hooks/useNotifications';
import { NotificationList } from './NotificationList';
import { LoadingSpinner } from './LoadingSpinner';

export function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false);
  const { notifications, isLoading } = useNotifications();
  const unreadCount = notifications.filter(n => !n.read).length;

  if (isLoading) {
    return <LoadingSpinner size="sm" />;
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-full hover:bg-gray-100 transition-colors"
      >
        <Bell className="w-6 h-6 text-gray-600" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-30"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border z-40 max-h-[80vh] overflow-y-auto">
            <div className="p-4 border-b">
              <h3 className="font-semibold text-gray-900">Notifications</h3>
            </div>
            <NotificationList onClose={() => setIsOpen(false)} />
          </div>
        </>
      )}
    </div>
  );
}
