import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const ActivityHistoryTab = ({ activityHistory }) => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const activityTypes = [
    { value: 'all', label: 'All Activities', icon: 'Activity' },
    { value: 'profile', label: 'Profile Changes', icon: 'User' },
    { value: 'academic', label: 'Academic Updates', icon: 'BookOpen' },
    { value: 'document', label: 'Document Changes', icon: 'FileText' },
    { value: 'system', label: 'System Events', icon: 'Settings' }
  ];

  const getActivityType = (action) => {
    if (action.includes('Profile') || action.includes('Contact')) return 'profile';
    if (action.includes('Grade') || action.includes('Enrollment')) return 'academic';
    if (action.includes('Document') || action.includes('Upload')) return 'document';
    return 'system';
  };

  const getActivityIcon = (action) => {
    if (action.includes('Profile') || action.includes('Contact')) return 'User';
    if (action.includes('Grade')) return 'Award';
    if (action.includes('Document') || action.includes('Upload')) return 'FileText';
    if (action.includes('Enrollment')) return 'UserCheck';
    if (action.includes('Created')) return 'Plus';
    return 'Activity';
  };

  const getActivityColor = (action) => {
    if (action.includes('Profile') || action.includes('Contact')) return 'bg-primary-100 text-primary';
    if (action.includes('Grade')) return 'bg-success-100 text-success';
    if (action.includes('Document') || action.includes('Upload')) return 'bg-accent-100 text-accent-600';
    if (action.includes('Enrollment')) return 'bg-secondary-100 text-secondary';
    if (action.includes('Created')) return 'bg-success-100 text-success';
    return 'bg-background text-text-secondary';
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    if (diffInHours < 48) return 'Yesterday';
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredActivities = activityHistory.filter(activity => {
    const matchesFilter = filter === 'all' || getActivityType(activity.action) === filter;
    const matchesSearch = searchTerm === '' || 
      activity.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.user.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  const groupedActivities = filteredActivities.reduce((groups, activity) => {
    const date = new Date(activity.timestamp).toDateString();
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(activity);
    return groups;
  }, {});

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <h3 className="text-lg font-semibold text-text-primary">Activity History</h3>
        
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
          {/* Search */}
          <div className="relative">
            <Icon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" />
            <input
              type="text"
              placeholder="Search activities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-smooth w-full sm:w-64"
            />
          </div>
          
          {/* Filter */}
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-smooth"
          >
            {activityTypes.map(type => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Activity Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {activityTypes.slice(1).map((type) => {
          const count = activityHistory.filter(activity => getActivityType(activity.action) === type.value).length;
          return (
            <div key={type.value} className="bg-background rounded-lg p-4 border border-border">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                  <Icon name={type.icon} size={16} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm text-text-secondary">{type.label}</p>
                  <p className="text-lg font-semibold text-text-primary">{count}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Activity Timeline */}
      <div className="space-y-6">
        {Object.keys(groupedActivities).length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Activity" size={24} className="text-primary" />
            </div>
            <h4 className="text-lg font-semibold text-text-primary mb-2">No Activities Found</h4>
            <p className="text-text-secondary">Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          Object.entries(groupedActivities).map(([date, activities]) => (
            <div key={date} className="space-y-4">
              {/* Date Header */}
              <div className="flex items-center space-x-4">
                <h4 className="text-sm font-semibold text-text-primary">
                  {new Date(date).toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </h4>
                <div className="flex-1 h-px bg-border"></div>
              </div>
              
              {/* Activities for this date */}
              <div className="space-y-3">
                {activities.map((activity) => (
                  <div key={activity.id} className="bg-surface border border-border rounded-lg p-4 hover:shadow-soft transition-smooth">
                    <div className="flex items-start space-x-4">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${getActivityColor(activity.action)}`}>
                        <Icon name={getActivityIcon(activity.action)} size={16} />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h5 className="font-medium text-text-primary">{activity.action}</h5>
                            <p className="text-sm text-text-secondary mt-1">{activity.details}</p>
                            <div className="flex items-center space-x-4 mt-2 text-xs text-text-secondary">
                              <span className="flex items-center space-x-1">
                                <Icon name="User" size={12} />
                                <span>by {activity.user}</span>
                              </span>
                              <span className="flex items-center space-x-1">
                                <Icon name="Clock" size={12} />
                                <span>{formatTimestamp(activity.timestamp)}</span>
                              </span>
                            </div>
                          </div>
                          
                          <button className="p-1 text-text-secondary hover:text-primary hover:bg-primary-50 rounded transition-smooth">
                            <Icon name="MoreHorizontal" size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Load More Button */}
      {filteredActivities.length > 0 && (
        <div className="text-center pt-6 border-t border-border">
          <button className="flex items-center space-x-2 px-6 py-3 bg-surface text-text-primary border border-border rounded-lg hover:bg-background transition-smooth mx-auto">
            <Icon name="RotateCcw" size={16} />
            <span>Load More Activities</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default ActivityHistoryTab;