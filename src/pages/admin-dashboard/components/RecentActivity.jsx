import React, { useState } from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const RecentActivity = () => {
  const [filter, setFilter] = useState('all');

  const recentActivities = [
    {
      id: 1,
      type: 'registration',
      title: 'New Student Registration',
      description: 'Emma Thompson registered for Computer Science program',
      user: 'Emma Thompson',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
      timestamp: new Date(Date.now() - 300000), // 5 minutes ago
      icon: 'UserPlus',
      color: 'bg-success-100 text-success'
    },
    {
      id: 2,
      type: 'update',
      title: 'Profile Updated',
      description: 'John Davis updated his contact information',
      user: 'John Davis',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
      timestamp: new Date(Date.now() - 900000), // 15 minutes ago
      icon: 'Edit',
      color: 'bg-primary-100 text-primary'
    },
    {
      id: 3,
      type: 'system',
      title: 'Bulk Import Completed',
      description: '150 student records imported successfully',
      user: 'System',
      avatar: null,
      timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
      icon: 'Upload',
      color: 'bg-accent-100 text-accent-600'
    },
    {
      id: 4,
      type: 'registration',
      title: 'New Student Registration',
      description: 'Michael Chen registered for Engineering program',
      user: 'Michael Chen',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      icon: 'UserPlus',
      color: 'bg-success-100 text-success'
    },
    {
      id: 5,
      type: 'update',
      title: 'Grade Updated',
      description: 'Sarah Wilson\'s Mathematics grade updated to A+',
      user: 'Prof. Anderson',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=40&h=40&fit=crop&crop=face',
      timestamp: new Date(Date.now() - 7200000), // 2 hours ago
      icon: 'Award',
      color: 'bg-secondary-100 text-secondary'
    },
    {
      id: 6,
      type: 'system',
      title: 'System Maintenance',
      description: 'Scheduled maintenance completed successfully',
      user: 'System',
      avatar: null,
      timestamp: new Date(Date.now() - 10800000), // 3 hours ago
      icon: 'Settings',
      color: 'bg-text-secondary bg-opacity-10 text-text-secondary'
    }
  ];

  const filteredActivities = filter === 'all' 
    ? recentActivities 
    : recentActivities.filter(activity => activity.type === filter);

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  return (
    <div className="bg-surface rounded-xl shadow-soft border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-secondary-100 rounded-lg flex items-center justify-center">
            <Icon name="Activity" size={16} className="text-secondary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-text-primary">Recent Activity</h3>
            <p className="text-sm text-text-secondary">Latest system updates</p>
          </div>
        </div>

        {/* Activity Filter */}
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-3 py-1 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        >
          <option value="all">All</option>
          <option value="registration">Registrations</option>
          <option value="update">Updates</option>
          <option value="system">System</option>
        </select>
      </div>

      <div className="space-y-4 max-h-96 overflow-y-auto">
        {filteredActivities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-start space-x-3 p-3 rounded-lg hover:bg-background transition-smooth"
          >
            {/* Activity Icon or Avatar */}
            <div className="flex-shrink-0">
              {activity.avatar ? (
                <Image
                  src={activity.avatar}
                  alt={activity.user}
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${activity.color}`}>
                  <Icon name={activity.icon} size={16} />
                </div>
              )}
            </div>

            {/* Activity Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-text-primary">
                    {activity.title}
                  </h4>
                  <p className="text-sm text-text-secondary mt-1">
                    {activity.description}
                  </p>
                  <div className="flex items-center space-x-2 mt-2">
                    <span className="text-xs text-text-secondary">
                      {activity.user}
                    </span>
                    <span className="text-xs text-text-secondary">•</span>
                    <span className="text-xs text-text-secondary">
                      {formatTimestamp(activity.timestamp)}
                    </span>
                  </div>
                </div>
                
                {/* Activity Type Badge */}
                <div className={`
                  px-2 py-1 rounded-full text-xs font-medium ml-3 flex-shrink-0
                  ${activity.color}
                `}>
                  <Icon name={activity.icon} size={12} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View All Button */}
      <div className="mt-6 pt-4 border-t border-border">
        <button className="w-full flex items-center justify-center space-x-2 py-2 text-sm font-medium text-primary hover:text-primary-700 transition-smooth">
          <span>View All Activity</span>
          <Icon name="ArrowRight" size={14} />
        </button>
      </div>
    </div>
  );
};

export default RecentActivity;