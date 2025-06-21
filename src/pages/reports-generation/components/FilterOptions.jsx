import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const FilterOptions = ({ filters, onFiltersUpdate, onNext, onBack }) => {
  const [expandedSections, setExpandedSections] = useState({
    dateRange: true,
    departments: true,
    studentStatus: false,
    academicPrograms: false,
    demographics: false
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleFilterChange = (category, value) => {
    const updatedFilters = { ...filters };
    
    if (category === 'dateRange') {
      updatedFilters.dateRange = { ...updatedFilters.dateRange, ...value };
    } else if (Array.isArray(updatedFilters[category])) {
      const currentValues = updatedFilters[category];
      if (currentValues.includes(value)) {
        updatedFilters[category] = currentValues.filter(v => v !== value);
      } else {
        updatedFilters[category] = [...currentValues, value];
      }
    } else {
      updatedFilters[category] = { ...updatedFilters[category], ...value };
    }
    
    onFiltersUpdate(updatedFilters);
  };

  const departments = [
    'Computer Science', 'Engineering', 'Business Administration', 'Liberal Arts',
    'Sciences', 'Mathematics', 'Psychology', 'Education'
  ];

  const studentStatuses = [
    'Active', 'Graduated', 'Suspended', 'On Leave', 'Transferred', 'Dropped Out'
  ];

  const academicPrograms = [
    'Bachelor of Science', 'Bachelor of Arts', 'Master of Science', 'Master of Arts',
    'PhD Programs', 'Certificate Programs', 'Diploma Courses'
  ];

  const FilterSection = ({ title, isExpanded, onToggle, children, icon }) => (
    <div className="border border-border rounded-lg overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 bg-background hover:bg-primary-50 transition-smooth"
      >
        <div className="flex items-center space-x-3">
          <Icon name={icon} size={20} className="text-primary" />
          <h3 className="text-sm font-medium text-text-primary">{title}</h3>
        </div>
        <Icon 
          name={isExpanded ? "ChevronUp" : "ChevronDown"} 
          size={16} 
          className="text-text-secondary" 
        />
      </button>
      {isExpanded && (
        <div className="p-4 border-t border-border bg-surface">
          {children}
        </div>
      )}
    </div>
  );

  return (
    <div className="bg-surface rounded-xl border border-border p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-text-primary mb-2">Configure Filters</h2>
        <p className="text-text-secondary">Set criteria to refine your report data</p>
      </div>

      <div className="space-y-4">
        {/* Date Range Filter */}
        <FilterSection
          title="Date Range"
          icon="Calendar"
          isExpanded={expandedSections.dateRange}
          onToggle={() => toggleSection('dateRange')}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">Start Date</label>
              <input
                type="date"
                value={filters.dateRange.start}
                onChange={(e) => handleFilterChange('dateRange', { start: e.target.value })}
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">End Date</label>
              <input
                type="date"
                value={filters.dateRange.end}
                onChange={(e) => handleFilterChange('dateRange', { end: e.target.value })}
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {['Last 30 Days', 'Last 3 Months', 'Last 6 Months', 'Last Year'].map((preset) => (
              <button
                key={preset}
                onClick={() => {
                  const today = new Date();
                  const days = preset === 'Last 30 Days' ? 30 : 
                              preset === 'Last 3 Months' ? 90 :
                              preset === 'Last 6 Months' ? 180 : 365;
                  const startDate = new Date(today.getTime() - (days * 24 * 60 * 60 * 1000));
                  handleFilterChange('dateRange', {
                    start: startDate.toISOString().split('T')[0],
                    end: today.toISOString().split('T')[0]
                  });
                }}
                className="px-3 py-1 text-xs bg-primary-50 text-primary rounded-full hover:bg-primary-100 transition-smooth"
              >
                {preset}
              </button>
            ))}
          </div>
        </FilterSection>

        {/* Departments Filter */}
        <FilterSection
          title="Departments"
          icon="Building"
          isExpanded={expandedSections.departments}
          onToggle={() => toggleSection('departments')}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {departments.map((dept) => (
              <label key={dept} className="flex items-center space-x-3 p-2 hover:bg-background rounded-lg cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.departments.includes(dept)}
                  onChange={() => handleFilterChange('departments', dept)}
                  className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                />
                <span className="text-sm text-text-primary">{dept}</span>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Student Status Filter */}
        <FilterSection
          title="Student Status"
          icon="UserCheck"
          isExpanded={expandedSections.studentStatus}
          onToggle={() => toggleSection('studentStatus')}
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {studentStatuses.map((status) => (
              <label key={status} className="flex items-center space-x-3 p-2 hover:bg-background rounded-lg cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.studentStatus.includes(status)}
                  onChange={() => handleFilterChange('studentStatus', status)}
                  className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                />
                <span className="text-sm text-text-primary">{status}</span>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Academic Programs Filter */}
        <FilterSection
          title="Academic Programs"
          icon="GraduationCap"
          isExpanded={expandedSections.academicPrograms}
          onToggle={() => toggleSection('academicPrograms')}
        >
          <div className="space-y-2">
            {academicPrograms.map((program) => (
              <label key={program} className="flex items-center space-x-3 p-2 hover:bg-background rounded-lg cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.academicPrograms.includes(program)}
                  onChange={() => handleFilterChange('academicPrograms', program)}
                  className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                />
                <span className="text-sm text-text-primary">{program}</span>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Demographics Filter */}
        <FilterSection
          title="Demographics"
          icon="Users"
          isExpanded={expandedSections.demographics}
          onToggle={() => toggleSection('demographics')}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">Age Range</label>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={filters.demographics.ageMin || ''}
                  onChange={(e) => handleFilterChange('demographics', { ageMin: e.target.value })}
                  className="w-20 px-2 py-1 border border-border rounded text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <span className="text-text-secondary">to</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={filters.demographics.ageMax || ''}
                  onChange={(e) => handleFilterChange('demographics', { ageMax: e.target.value })}
                  className="w-20 px-2 py-1 border border-border rounded text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">Gender</label>
              <select
                value={filters.demographics.gender || ''}
                onChange={(e) => handleFilterChange('demographics', { gender: e.target.value })}
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
              >
                <option value="">All Genders</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                <option value="prefer_not_to_say">Prefer not to say</option>
              </select>
            </div>
          </div>
        </FilterSection>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 px-4 py-2 text-text-secondary hover:text-text-primary hover:bg-background rounded-lg transition-smooth"
        >
          <Icon name="ArrowLeft" size={16} />
          <span>Back</span>
        </button>
        
        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 text-text-secondary hover:text-text-primary hover:bg-background rounded-lg transition-smooth">
            Clear All Filters
          </button>
          <button
            onClick={onNext}
            className="flex items-center space-x-2 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-smooth"
          >
            <span>Continue</span>
            <Icon name="ArrowRight" size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterOptions;