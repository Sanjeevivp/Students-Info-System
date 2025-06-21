import React from 'react';
import Icon from 'components/AppIcon';

const ReportPreview = ({ reportData, currentStep, isGenerating }) => {
  const getReportTypeName = (type) => {
    const types = {
      'student_enrollment': 'Student Enrollment',
      'academic_performance': 'Academic Performance',
      'demographic_analysis': 'Demographic Analysis',
      'custom_query': 'Custom Query'
    };
    return types[type] || 'Select Report Type';
  };

  const getEstimatedSize = () => {
    const baseSize = 50; // KB
    const fieldMultiplier = reportData.output.fields.length * 5;
    const filterMultiplier = Object.values(reportData.filters).flat().length * 2;
    return Math.max(baseSize + fieldMultiplier + filterMultiplier, 25);
  };

  const getEstimatedTime = () => {
    const complexity = reportData.output.fields.length + Object.values(reportData.filters).flat().length;
    if (complexity < 10) return '< 1 minute';
    if (complexity < 20) return '1-2 minutes';
    return '2-5 minutes';
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (reportData.filters.dateRange.start || reportData.filters.dateRange.end) count++;
    count += reportData.filters.departments.length;
    count += reportData.filters.studentStatus.length;
    count += reportData.filters.academicPrograms.length;
    if (Object.keys(reportData.filters.demographics).length > 0) count++;
    return count;
  };

  return (
    <div className="space-y-4">
      {/* Report Summary Card */}
      <div className="bg-surface rounded-xl border border-border p-6 sticky top-4">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
            <Icon name="FileText" size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-text-primary">Report Preview</h3>
            <p className="text-sm text-text-secondary">Configuration summary</p>
          </div>
        </div>

        {/* Report Type */}
        <div className="space-y-4">
          <div className="p-3 bg-background rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-text-primary">Report Type</span>
              {currentStep > 1 && (
                <Icon name="Check" size={16} className="text-success" />
              )}
            </div>
            <p className="text-sm text-text-secondary">
              {reportData.type ? getReportTypeName(reportData.type) : 'Not selected'}
            </p>
          </div>

          {/* Filters Summary */}
          <div className="p-3 bg-background rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-text-primary">Active Filters</span>
              {currentStep > 2 && (
                <Icon name="Check" size={16} className="text-success" />
              )}
            </div>
            <p className="text-sm text-text-secondary">
              {getActiveFiltersCount()} filter{getActiveFiltersCount() !== 1 ? 's' : ''} applied
            </p>
            {getActiveFiltersCount() > 0 && (
              <div className="mt-2 space-y-1">
                {reportData.filters.dateRange.start && (
                  <div className="flex items-center space-x-2 text-xs text-text-secondary">
                    <Icon name="Calendar" size={12} />
                    <span>Date range selected</span>
                  </div>
                )}
                {reportData.filters.departments.length > 0 && (
                  <div className="flex items-center space-x-2 text-xs text-text-secondary">
                    <Icon name="Building" size={12} />
                    <span>{reportData.filters.departments.length} department{reportData.filters.departments.length !== 1 ? 's' : ''}</span>
                  </div>
                )}
                {reportData.filters.studentStatus.length > 0 && (
                  <div className="flex items-center space-x-2 text-xs text-text-secondary">
                    <Icon name="UserCheck" size={12} />
                    <span>{reportData.filters.studentStatus.length} status filter{reportData.filters.studentStatus.length !== 1 ? 's' : ''}</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Output Configuration */}
          <div className="p-3 bg-background rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-text-primary">Output Settings</span>
              {currentStep === 3 && reportData.output.fields.length > 0 && (
                <Icon name="Check" size={16} className="text-success" />
              )}
            </div>
            <div className="space-y-1">
              <p className="text-sm text-text-secondary">
                {reportData.output.fields.length} field{reportData.output.fields.length !== 1 ? 's' : ''} selected
              </p>
              <p className="text-sm text-text-secondary">
                Format: {reportData.output.format?.toUpperCase() || 'Not selected'}
              </p>
            </div>
          </div>
        </div>

        {/* Estimated Report Info */}
        {reportData.type && reportData.output.fields.length > 0 && (
          <div className="mt-6 pt-4 border-t border-border">
            <h4 className="text-sm font-medium text-text-primary mb-3">Estimated Report</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-text-secondary">File Size:</span>
                <span className="text-text-primary font-medium">{getEstimatedSize()} KB</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-text-secondary">Generation Time:</span>
                <span className="text-text-primary font-medium">{getEstimatedTime()}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-text-secondary">Records:</span>
                <span className="text-text-primary font-medium">~1,247</span>
              </div>
            </div>
          </div>
        )}

        {/* Generation Status */}
        {isGenerating && (
          <div className="mt-6 pt-4 border-t border-border">
            <div className="flex items-center space-x-3 p-3 bg-primary-50 rounded-lg">
              <Icon name="Loader2" size={20} className="text-primary animate-spin" />
              <div>
                <p className="text-sm font-medium text-primary">Generating Report...</p>
                <p className="text-xs text-primary-600">This may take a few moments</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="bg-surface rounded-xl border border-border p-4">
        <h4 className="text-sm font-medium text-text-primary mb-3">Quick Actions</h4>
        <div className="space-y-2">
          <button className="w-full flex items-center space-x-3 p-2 text-left hover:bg-background rounded-lg transition-smooth">
            <Icon name="History" size={16} className="text-text-secondary" />
            <span className="text-sm text-text-primary">View Recent Reports</span>
          </button>
          <button className="w-full flex items-center space-x-3 p-2 text-left hover:bg-background rounded-lg transition-smooth">
            <Icon name="BookOpen" size={16} className="text-text-secondary" />
            <span className="text-sm text-text-primary">Load Template</span>
          </button>
          <button className="w-full flex items-center space-x-3 p-2 text-left hover:bg-background rounded-lg transition-smooth">
            <Icon name="Calendar" size={16} className="text-text-secondary" />
            <span className="text-sm text-text-primary">Schedule Report</span>
          </button>
        </div>
      </div>

      {/* Help & Support */}
      <div className="bg-accent-50 rounded-xl border border-accent-200 p-4">
        <div className="flex items-start space-x-3">
          <Icon name="HelpCircle" size={16} className="text-accent-600 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-accent-800 mb-1">Need Help?</h4>
            <p className="text-xs text-accent-700 mb-2">
              Having trouble with report generation? Check our documentation or contact support.
            </p>
            <button className="text-xs text-accent-600 hover:text-accent-800 font-medium">
              View Documentation →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportPreview;