import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const BulkActionsToolbar = ({ selectedCount, onBulkDelete, onBulkStatusUpdate, onExport }) => {
  const [showStatusMenu, setShowStatusMenu] = useState(false);

  const statusOptions = [
    { value: 'Active', label: 'Mark as Active', icon: 'CheckCircle', color: 'text-success' },
    { value: 'Inactive', label: 'Mark as Inactive', icon: 'XCircle', color: 'text-error' },
    { value: 'Suspended', label: 'Mark as Suspended', icon: 'AlertCircle', color: 'text-warning' }
  ];

  return (
    <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <Icon name="Check" size={16} className="text-white" />
          </div>
          <div>
            <p className="text-sm font-medium text-text-primary">
              {selectedCount} student{selectedCount !== 1 ? 's' : ''} selected
            </p>
            <p className="text-xs text-text-secondary">
              Choose an action to apply to selected students
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {/* Status Update Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowStatusMenu(!showStatusMenu)}
              className="flex items-center space-x-2 px-3 py-2 bg-surface text-text-primary border border-border rounded-lg hover:bg-background transition-smooth"
            >
              <Icon name="Edit" size={16} />
              <span className="hidden sm:inline">Update Status</span>
              <Icon name="ChevronDown" size={14} />
            </button>

            {showStatusMenu && (
              <>
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setShowStatusMenu(false)}
                ></div>
                <div className="absolute right-0 top-full mt-2 w-48 bg-surface rounded-lg shadow-elevated border border-border z-50">
                  <div className="py-2">
                    {statusOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          onBulkStatusUpdate(option.value);
                          setShowStatusMenu(false);
                        }}
                        className="w-full flex items-center space-x-3 px-3 py-2 text-sm hover:bg-background transition-smooth"
                      >
                        <Icon name={option.icon} size={16} className={option.color} />
                        <span>{option.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Export Button */}
          <button
            onClick={onExport}
            className="flex items-center space-x-2 px-3 py-2 bg-accent text-white rounded-lg hover:bg-accent-600 transition-smooth"
          >
            <Icon name="Download" size={16} />
            <span className="hidden sm:inline">Export</span>
          </button>

          {/* Delete Button */}
          <button
            onClick={() => {
              if (window.confirm(`Are you sure you want to delete ${selectedCount} selected student${selectedCount !== 1 ? 's' : ''}? This action cannot be undone.`)) {
                onBulkDelete();
              }
            }}
            className="flex items-center space-x-2 px-3 py-2 bg-error text-white rounded-lg hover:bg-red-600 transition-smooth"
          >
            <Icon name="Trash2" size={16} />
            <span className="hidden sm:inline">Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BulkActionsToolbar;