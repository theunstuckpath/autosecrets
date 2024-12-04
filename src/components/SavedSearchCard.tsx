import React from 'react';
import { Trash2, Bell, BellOff } from 'lucide-react';
import { useSavedSearches } from '../hooks/useSavedSearches';
import { useStore } from '../store/useStore';
import { formatDate } from '../utils/date';
import type { SavedSearch } from '../types/savedSearch';

interface SavedSearchCardProps {
  search: SavedSearch;
}

export function SavedSearchCard({ search }: SavedSearchCardProps) {
  const { deleteSavedSearch } = useSavedSearches();
  const { setFilters } = useStore();

  const handleApplySearch = () => {
    setFilters(search.filters);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-medium text-gray-900 mb-1">{search.name}</h3>
          <p className="text-sm text-gray-500 mb-2">
            Created on {formatDate(search.createdAt)}
          </p>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            {search.notifyOnNew && (
              <div className="flex items-center gap-1">
                <Bell className="w-4 h-4" />
                <span>New listings</span>
              </div>
            )}
            {search.notifyOnPriceDrop && (
              <div className="flex items-center gap-1">
                <BellOff className="w-4 h-4" />
                <span>Price drops</span>
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleApplySearch}
            className="px-3 py-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-md transition-colors"
          >
            Apply
          </button>
          <button
            onClick={() => deleteSavedSearch(search.id)}
            className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-gray-50 rounded-md transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
