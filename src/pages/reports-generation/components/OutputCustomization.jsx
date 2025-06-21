import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const OutputCustomization = ({ output, reportType, onOutputUpdate, onBack, onGenerate, isGenerating }) => {
  const [selectedFields, setSelectedFields] = useState(output.fields || []);

  const getAvailableFields = () => {
    const baseFields = [
      { id: 'student_id', label: 'Student ID', category: 'Basic' },
      { id: 'full_name', label: 'Full Name', category: 'Basic' },
      { id: 'email', label: 'Email Address', category: 'Contact' },
      { id: 'phone', label: 'Phone Number', category: 'Contact' },
      { id: 'date_of_birth', label: 'Date of Birth', category: 'Personal' },
      { id: 'gender', label: 'Gender', category: 'Personal' },
      { id: 'address', label: 'Address', category: 'Contact' },
      { id: 'enrollment_date', label: 'Enrollment Date', category: 'Academic' },
      { id: 'program', label: 'Academic Program', category: 'Academic' },
      { id: 'department', label: 'Department', category: 'Academic' },
      { id: 'year_level', label: 'Year Level', category: 'Academic' },
      { id: 'status', label: 'Student Status', category: 'Academic' }
    ];

    if (reportType === 'academic_performance') {
      return [
        ...baseFields,
        { id: 'gpa', label: 'GPA', category: 'Performance' },
        { id: 'credits_earned', label: 'Credits Earned', category: 'Performance' },
        { id: 'graduation_date', label: 'Expected Graduation', category: 'Performance' }
      ];
    }

    return baseFields;
  };

  const availableFields = getAvailableFields();
  const fieldCategories = [...new Set(availableFields.map(field => field.category))];

  const formatOptions = [
    {
      id: 'pdf',
      label: 'PDF Document',
      description: 'Professional formatted document',
      icon: 'FileText',
      preview: '/assets/images/pdf-preview.png'
    },
    {
      id: 'excel',
      label: 'Excel Spreadsheet',
      description: 'Editable spreadsheet format',
      icon: 'Table',
      preview: '/assets/images/excel-preview.png'
    },
    {
      id: 'csv',
      label: 'CSV File',
      description: 'Comma-separated values',
      icon: 'Database',
      preview: '/assets/images/csv-preview.png'
    }
  ];

  const sortingOptions = [
    { id: 'name_asc', label: 'Name (A-Z)' },
    { id: 'name_desc', label: 'Name (Z-A)' },
    { id: 'date_asc', label: 'Date (Oldest First)' },
    { id: 'date_desc', label: 'Date (Newest First)' },
    { id: 'id_asc', label: 'Student ID (Low to High)' },
    { id: 'id_desc', label: 'Student ID (High to Low)' }
  ];

  const handleFieldToggle = (fieldId) => {
    const updatedFields = selectedFields.includes(fieldId)
      ? selectedFields.filter(id => id !== fieldId)
      : [...selectedFields, fieldId];
    
    setSelectedFields(updatedFields);
    onOutputUpdate({ fields: updatedFields });
  };

  const handleSelectAllFields = (category) => {
    const categoryFields = availableFields
      .filter(field => field.category === category)
      .map(field => field.id);
    
    const otherFields = selectedFields.filter(fieldId => 
      !categoryFields.includes(fieldId)
    );
    
    const allCategorySelected = categoryFields.every(fieldId => 
      selectedFields.includes(fieldId)
    );
    
    const updatedFields = allCategorySelected 
      ? otherFields 
      : [...otherFields, ...categoryFields];
    
    setSelectedFields(updatedFields);
    onOutputUpdate({ fields: updatedFields });
  };

  const handleFormatChange = (format) => {
    onOutputUpdate({ format });
  };

  const handleSortingChange = (sorting) => {
    onOutputUpdate({ sorting });
  };

  return (
    <div className="space-y-6">
      {/* Field Selection */}
      <div className="bg-surface rounded-xl border border-border p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-text-primary mb-2">Select Fields</h2>
          <p className="text-text-secondary">Choose which data fields to include in your report</p>
        </div>

        <div className="space-y-6">
          {fieldCategories.map((category) => {
            const categoryFields = availableFields.filter(field => field.category === category);
            const selectedCategoryFields = categoryFields.filter(field => selectedFields.includes(field.id));
            const allSelected = selectedCategoryFields.length === categoryFields.length;
            const someSelected = selectedCategoryFields.length > 0;

            return (
              <div key={category} className="border border-border rounded-lg overflow-hidden">
                <div className="bg-background p-4 border-b border-border">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-text-primary">{category} Information</h3>
                    <button
                      onClick={() => handleSelectAllFields(category)}
                      className={`
                        text-xs px-3 py-1 rounded-full transition-smooth
                        ${allSelected 
                          ? 'bg-primary text-white' :'bg-primary-50 text-primary hover:bg-primary-100'
                        }
                      `}
                    >
                      {allSelected ? 'Deselect All' : 'Select All'}
                    </button>
                  </div>
                  {someSelected && (
                    <p className="text-xs text-text-secondary mt-1">
                      {selectedCategoryFields.length} of {categoryFields.length} selected
                    </p>
                  )}
                </div>
                <div className="p-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {categoryFields.map((field) => (
                      <label
                        key={field.id}
                        className="flex items-center space-x-3 p-2 hover:bg-background rounded-lg cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={selectedFields.includes(field.id)}
                          onChange={() => handleFieldToggle(field.id)}
                          className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                        />
                        <span className="text-sm text-text-primary">{field.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Format Selection */}
      <div className="bg-surface rounded-xl border border-border p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-text-primary mb-2">Output Format</h2>
          <p className="text-text-secondary">Choose how you want to receive your report</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {formatOptions.map((format) => (
            <button
              key={format.id}
              onClick={() => handleFormatChange(format.id)}
              className={`
                p-4 rounded-lg border-2 text-left transition-all duration-200 hover:shadow-soft
                ${output.format === format.id 
                  ? 'border-primary bg-primary-50' :'border-border hover:border-primary-200'
                }
              `}
            >
              <div className="flex items-center space-x-3 mb-3">
                <div className={`
                  w-10 h-10 rounded-lg flex items-center justify-center
                  ${output.format === format.id ? 'bg-primary text-white' : 'bg-background text-text-secondary'}
                `}>
                  <Icon name={format.icon} size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-text-primary">{format.label}</h3>
                  <p className="text-xs text-text-secondary">{format.description}</p>
                </div>
              </div>
              {output.format === format.id && (
                <div className="flex items-center space-x-2 text-primary">
                  <Icon name="CheckCircle" size={14} />
                  <span className="text-xs font-medium">Selected</span>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Sorting Options */}
      <div className="bg-surface rounded-xl border border-border p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-text-primary mb-2">Sorting & Organization</h2>
          <p className="text-text-secondary">Configure how data should be organized in your report</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">Sort By</label>
            <select
              value={output.sorting}
              onChange={(e) => handleSortingChange(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              {sortingOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">Records Per Page</label>
            <select
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="25">25 records</option>
              <option value="50">50 records</option>
              <option value="100">100 records</option>
              <option value="all">All records</option>
            </select>
          </div>
        </div>
      </div>

      {/* Advanced Options */}
      <div className="bg-surface rounded-xl border border-border p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-text-primary mb-2">Advanced Options</h2>
          <p className="text-text-secondary">Additional settings for report generation</p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-background rounded-lg">
            <div>
              <h4 className="text-sm font-medium text-text-primary">Include Summary Statistics</h4>
              <p className="text-xs text-text-secondary">Add totals, averages, and key metrics</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-border peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-3 bg-background rounded-lg">
            <div>
              <h4 className="text-sm font-medium text-text-primary">Email Report When Ready</h4>
              <p className="text-xs text-text-secondary">Send download link to your email</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-border peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-3 bg-background rounded-lg">
            <div>
              <h4 className="text-sm font-medium text-text-primary">Save as Template</h4>
              <p className="text-xs text-text-secondary">Reuse these settings for future reports</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-border peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-6 border-t border-border">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 px-4 py-2 text-text-secondary hover:text-text-primary hover:bg-background rounded-lg transition-smooth"
        >
          <Icon name="ArrowLeft" size={16} />
          <span>Back</span>
        </button>
        
        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 text-text-secondary hover:text-text-primary hover:bg-background rounded-lg transition-smooth">
            Save Template
          </button>
          <button
            onClick={onGenerate}
            disabled={isGenerating || selectedFields.length === 0}
            className={`
              flex items-center space-x-2 px-6 py-2 rounded-lg transition-smooth
              ${isGenerating || selectedFields.length === 0
                ? 'bg-border text-text-secondary cursor-not-allowed' :'bg-success text-white hover:bg-success-600'
              }
            `}
          >
            {isGenerating ? (
              <>
                <Icon name="Loader2" size={16} className="animate-spin" />
                <span>Generating...</span>
              </>
            ) : (
              <>
                <Icon name="Download" size={16} />
                <span>Generate Report</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OutputCustomization;