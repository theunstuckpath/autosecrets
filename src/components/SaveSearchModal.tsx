import React, { useState } from 'react';
import { X, Bell } from 'lucide-react';
import { useSavedSearches } from '../hooks/useSavedSearches';
import { useStore } from '../store/useStore';
import { useAuthStore } from '../store/useAuthStore';
import { LoadingSpinner } from './LoadingSpinner';
import toast from 'react-hot-toast';

interface SaveSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SaveSearchModal({ isOpen, onClose }: SaveSearchModalProps) {
  const [name, setName] = useState('');
  const [notifyOnNew, setNotifyOnNew] = useState(true);
  const [notifyOnPriceDrop, setNotifyOnPriceDrop] = useState(true);
  const { filters } = useStore();
  const { user } = useAuthStore();
  const { createSavedSearch, isLoading } = useSavedSearches();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error('Please sign in to save searches');
      return;
    }

    try {
      await createSavedSearch({
        userId: user.id,
        name,
        filters,
        notifyOnNew,
        notifyOnPriceDrop,
        createdAt: new Date().toISOString(),
      });
      onClose();
    } catch (error) {
      console.error('Error saving search:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-2xl font-bold mb-6">Save Search</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Search Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full"
              placeholder="e.g., Honda Civic in Toronto"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={notifyOnNew}
                onChange={(e) => setNotifyOnNew(e.target.checked)}
                className="rounded text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">
                Notify me about new listings
              </span>
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={notifyOnPriceDrop}
                onChange={(e) => setNotifyOnPriceDrop(e.target.checked)}
                className="rounded text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">
                Notify me about price drops
              </span>
            </label>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <LoadingSpinner size="sm" />
                Saving...
              </>
            ) : (
              <>
                <Bell className="w-4 h-4" />
                Save Search
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
