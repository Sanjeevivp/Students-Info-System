import React from 'react';
import Icon from 'components/AppIcon';

const ReportTypeSelector = ({ selectedType, onTypeSelect }) => {
  const reportTypes = [
    {
      id: 'student_enrollment',
      title: 'Student Enrollment',
      description: 'Comprehensive enrollment statistics, admission trends, and demographic breakdowns across academic periods',
      icon: 'Users',
      color: 'bg-primary-50 border-primary-200 hover:bg-primary-100',
      iconColor: 'text-primary',
      features: ['Enrollment trends', 'Demographic analysis', 'Program distribution', 'Admission statistics']
    },
    {
      id: 'academic_performance',
      title: 'Academic Performance',
      description: 'Detailed analysis of student grades, GPA distributions, course completion rates, and academic achievements',
      icon: 'Award',
      color: 'bg-success-50 border-success-200 hover:bg-success-100',
      iconColor: 'text-success',
      features: ['Grade distributions', 'GPA analysis', 'Course performance', 'Achievement tracking']
    },
    {
      id: 'demographic_analysis',
      title: 'Demographic Analysis',
      description: 'In-depth demographic insights including age groups, geographic distribution, and diversity metrics',
      icon: 'BarChart3',
      color: 'bg-accent-50 border-accent-200 hover:bg-accent-100',
      iconColor: 'text-accent-600',
      features: ['Age distribution', 'Geographic analysis', 'Diversity metrics', 'Trend analysis']
    },
    {
      id: 'custom_query',
      title: 'Custom Query',
      description: 'Build custom reports with advanced filtering options and personalized data combinations',
      icon: 'Settings',
      color: 'bg-secondary-50 border-secondary-200 hover:bg-secondary-100',
      iconColor: 'text-secondary',
      features: ['Custom fields', 'Advanced filters', 'Flexible formatting', 'Saved templates']
    }
  ];

  return (
    <div className="bg-surface rounded-xl border border-border p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-text-primary mb-2">Select Report Type</h2>
        <p className="text-text-secondary">Choose the type of report you want to generate</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reportTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => onTypeSelect(type.id)}
            className={`
              p-6 rounded-xl border-2 text-left transition-all duration-200 hover:shadow-soft
              ${selectedType === type.id 
                ? 'border-primary bg-primary-50 shadow-soft' 
                : `${type.color} border-opacity-50`
              }
            `}
          >
            <div className="flex items-start space-x-4">
              <div className={`
                w-12 h-12 rounded-lg flex items-center justify-center
                ${selectedType === type.id ? 'bg-primary text-white' : `bg-white ${type.iconColor}`}
              `}>
                <Icon name={type.icon} size={24} />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-text-primary mb-2">{type.title}</h3>
                <p className="text-sm text-text-secondary mb-4">{type.description}</p>
                <div className="space-y-1">
                  {type.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Icon name="Check" size={14} className="text-success" />
                      <span className="text-xs text-text-secondary">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {selectedType === type.id && (
              <div className="mt-4 pt-4 border-t border-primary-200">
                <div className="flex items-center space-x-2 text-primary">
                  <Icon name="CheckCircle" size={16} />
                  <span className="text-sm font-medium">Selected</span>
                </div>
              </div>
            )}
          </button>
        ))}
      </div>

      <div className="mt-8 p-4 bg-background rounded-lg">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={20} className="text-primary mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-text-primary mb-1">Need Help Choosing?</h4>
            <p className="text-xs text-text-secondary">
              Each report type offers different insights. Student Enrollment focuses on admission data, 
              Academic Performance analyzes grades and achievements, Demographic Analysis provides population insights, 
              and Custom Query allows you to build personalized reports.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportTypeSelector;