import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const FilterPanel = ({ activeFilters, onFilterChange, onRemoveFilter, onClearAll }) => {
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const filterOptions = {
    department: [
      'Computer Science',
      'Electrical Engineering',
      'Biology',
      'Mechanical Engineering',
      'Mathematics',
      'Physics',
      'Chemistry',
      'Business Administration'
    ],
    status: ['Active', 'Inactive', 'Suspended', 'Graduated'],
    year: ['2024', '2023', '2022', '2021', '2020']
  };

  const getActiveFilterCount = () => {
    return Object.values(activeFilters).reduce((count, values) => {
      return count + (values?.length || 0);
    }, 0);
  };

  const handleFilterToggle = (filterType, value) => {
    const currentValues = activeFilters[filterType] || [];
    const newValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value];
    
    onFilterChange(filterType, newValues);
  };

  const FilterChips = () => {
    const chips = [];
    
    Object.entries(activeFilters).forEach(([filterType, values]) => {
      if (values && values.length > 0) {
        values.forEach(value => {
          chips.push(
            <div
              key={`${filterType}-${value}`}
              className="flex items-center space-x-2 bg-primary-100 text-primary px-3 py-1 rounded-full text-sm"
            >
              <span className="capitalize">{filterType}: {value}</span>
              <button
                onClick={() => onRemoveFilter(filterType, value)}
                className="hover:bg-primary-200 rounded-full p-1 transition-smooth"
              >
                <Icon name="X" size={12} />
              </button>
            </div>
          );
        });
      }
    });

    return chips;
  };

  const FilterSection = ({ title, filterType, options, className = "" }) => (
    <div className={`space-y-2 ${className}`}>
      <h4 className="text-sm font-medium text-text-primary">{title}</h4>
      <div className="space-y-1">
        {options.map(option => (
          <label key={option} className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={(activeFilters[filterType] || []).includes(option)}
              onChange={() => handleFilterToggle(filterType, option)}
              className="rounded border-border focus:ring-2 focus:ring-primary"
            />
            <span className="text-sm text-text-secondary">{option}</span>
          </label>
        ))}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Filter Panel */}
      <div className="hidden lg:block">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-text-primary">Filters</h3>
          {getActiveFilterCount() > 0 && (
            <button
              onClick={onClearAll}
              className="text-sm text-error hover:text-error-600 transition-smooth"
            >
              Clear All ({getActiveFilterCount()})
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FilterSection
            title="Department"
            filterType="department"
            options={filterOptions.department}
          />
          <FilterSection
            title="Status"
            filterType="status"
            options={filterOptions.status}
          />
          <FilterSection
            title="Academic Year"
            filterType="year"
            options={filterOptions.year}
          />
        </div>

        {/* Active Filter Chips */}
        {getActiveFilterCount() > 0 && (
          <div className="mt-4 pt-4 border-t border-border">
            <div className="flex flex-wrap gap-2">
              <FilterChips />
            </div>
          </div>
        )}
      </div>

      {/* Mobile Filter Toggle */}
      <div className="lg:hidden">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="flex items-center space-x-2 px-4 py-2 bg-background border border-border rounded-lg hover:bg-primary-50 transition-smooth"
          >
            <Icon name="Filter" size={16} />
            <span>Filters</span>
            {getActiveFilterCount() > 0 && (
              <span className="bg-primary text-white text-xs px-2 py-1 rounded-full">
                {getActiveFilterCount()}
              </span>
            )}
            <Icon 
              name="ChevronDown" 
              size={16} 
              className={`transition-transform ${showMobileFilters ? 'rotate-180' : ''}`}
            />
          </button>
          
          {getActiveFilterCount() > 0 && (
            <button
              onClick={onClearAll}
              className="text-sm text-error hover:text-error-600 transition-smooth"
            >
              Clear All
            </button>
          )}
        </div>

        {/* Mobile Filter Panel */}
        {showMobileFilters && (
          <div className="mt-4 p-4 bg-background border border-border rounded-lg space-y-4">
            <FilterSection
              title="Department"
              filterType="department"
              options={filterOptions.department}
            />
            <FilterSection
              title="Status"
              filterType="status"
              options={filterOptions.status}
            />
            <FilterSection
              title="Academic Year"
              filterType="year"
              options={filterOptions.year}
            />
          </div>
        )}

        {/* Mobile Active Filter Chips */}
        {getActiveFilterCount() > 0 && (
          <div className="mt-3">
            <div className="flex flex-wrap gap-2">
              <FilterChips />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default FilterPanel;