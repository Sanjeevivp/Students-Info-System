import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';

const QuickActions = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      title: 'Add New Student',
      description: 'Register a new student profile',
      icon: 'UserPlus',
      color: 'bg-primary text-white hover:bg-primary-700',
      action: () => navigate('/student-management')
    },
    {
      title: 'Generate Report',
      description: 'Create institutional reports',
      icon: 'FileText',
      color: 'bg-success text-white hover:bg-success-600',
      action: () => navigate('/reports-generation')
    },
    {
      title: 'Bulk Import',
      description: 'Import student data from CSV',
      icon: 'Upload',
      color: 'bg-accent-600 text-white hover:bg-accent-700',
      action: () => {
        // Mock bulk import functionality
        alert('Bulk import functionality would be implemented here');
      }
    },
    {
      title: 'View All Students',
      description: 'Browse student directory',
      icon: 'Users',
      color: 'bg-secondary text-white hover:bg-secondary-600',
      action: () => navigate('/student-management')
    }
  ];

  return (
    <div className="bg-surface rounded-xl shadow-soft border border-border p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
          <Icon name="Zap" size={16} className="text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-text-primary">Quick Actions</h3>
          <p className="text-sm text-text-secondary">Frequently used functions</p>
        </div>
      </div>

      <div className="space-y-3">
        {quickActions.map((action, index) => (
          <button
            key={index}
            onClick={action.action}
            className={`
              w-full p-4 rounded-lg text-left transition-all duration-200
              hover:shadow-soft active:scale-95
              ${action.color}
            `}
          >
            <div className="flex items-center space-x-3">
              <Icon name={action.icon} size={20} />
              <div className="flex-1">
                <h4 className="font-medium">{action.title}</h4>
                <p className="text-sm opacity-90">{action.description}</p>
              </div>
              <Icon name="ChevronRight" size={16} className="opacity-70" />
            </div>
          </button>
        ))}
      </div>

      {/* Additional Quick Stats */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-text-primary">98.5%</p>
            <p className="text-xs text-text-secondary">System Uptime</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-text-primary">4.8</p>
            <p className="text-xs text-text-secondary">Avg. Rating</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;