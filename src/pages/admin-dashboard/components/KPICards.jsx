import React from 'react';
import Icon from 'components/AppIcon';

const KPICards = () => {
  const kpiData = [
    {
      title: 'Total Students',
      value: '1,590',
      change: '+12.5%',
      changeType: 'increase',
      icon: 'Users',
      color: 'bg-primary-50 text-primary',
      description: 'Active enrollments'
    },
    {
      title: 'New Enrollments',
      value: '210',
      change: '+8.2%',
      changeType: 'increase',
      icon: 'UserPlus',
      color: 'bg-success-50 text-success',
      description: 'This month'
    },
    {
      title: 'Recent Registrations',
      value: '45',
      change: '+15.3%',
      changeType: 'increase',
      icon: 'UserCheck',
      color: 'bg-accent-50 text-accent-600',
      description: 'Last 7 days'
    },
    {
      title: 'Pending Actions',
      value: '23',
      change: '-5.1%',
      changeType: 'decrease',
      icon: 'AlertCircle',
      color: 'bg-error-50 text-error',
      description: 'Require attention'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
      {kpiData.map((kpi, index) => (
        <div
          key={index}
          className="bg-surface rounded-xl shadow-soft border border-border p-6 hover:shadow-elevated transition-all duration-200"
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${kpi.color}`}>
              <Icon name={kpi.icon} size={24} />
            </div>
            <div className={`
              flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium
              ${kpi.changeType === 'increase' ?'bg-success-100 text-success' :'bg-error-100 text-error'
              }
            `}>
              <Icon 
                name={kpi.changeType === 'increase' ? 'TrendingUp' : 'TrendingDown'} 
                size={12} 
              />
              <span>{kpi.change}</span>
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl font-bold text-text-primary mb-1">
              {kpi.value}
            </h3>
            <p className="text-sm font-medium text-text-primary mb-1">
              {kpi.title}
            </p>
            <p className="text-xs text-text-secondary">
              {kpi.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default KPICards;