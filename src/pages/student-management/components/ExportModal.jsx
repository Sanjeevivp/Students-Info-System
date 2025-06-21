import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const ExportModal = ({ onClose, selectedStudents, allStudents, onExport }) => {
  const [exportFormat, setExportFormat] = useState('csv');
  const [exportScope, setExportScope] = useState('selected');
  const [includeFields, setIncludeFields] = useState({
    basicInfo: true,
    contactInfo: true,
    academicInfo: true,
    enrollmentInfo: true,
    profilePhoto: false
  });

  const formatOptions = [
    {
      value: 'csv',
      label: 'CSV (Comma Separated Values)',
      description: 'Best for spreadsheet applications like Excel',
      icon: 'FileSpreadsheet'
    },
    {
      value: 'excel',
      label: 'Excel Workbook (.xlsx)',
      description: 'Native Excel format with formatting',
      icon: 'FileSpreadsheet'
    },
    {
      value: 'pdf',
      label: 'PDF Document',
      description: 'Formatted document for printing and sharing',
      icon: 'FileText'
    },
    {
      value: 'json',
      label: 'JSON Data',
      description: 'Structured data format for developers',
      icon: 'Code'
    }
  ];

  const scopeOptions = [
    {
      value: 'selected',
      label: `Selected Students (${selectedStudents.length})`,
      description: 'Export only the currently selected students',
      disabled: selectedStudents.length === 0
    },
    {
      value: 'filtered',
      label: `Filtered Results (${allStudents.length})`,
      description: 'Export all students matching current filters'
    },
    {
      value: 'all',
      label: 'All Students',
      description: 'Export complete student database'
    }
  ];

  const fieldOptions = [
    {
      key: 'basicInfo',
      label: 'Basic Information',
      description: 'Name, Student ID, Email',
      fields: ['Name', 'Student ID', 'Email']
    },
    {
      key: 'contactInfo',
      label: 'Contact Information',
      description: 'Phone, Address, Guardian',
      fields: ['Phone', 'Address', 'Guardian Name']
    },
    {
      key: 'academicInfo',
      label: 'Academic Information',
      description: 'Department, GPA, Status',
      fields: ['Department', 'GPA', 'Status', 'Academic Year']
    },
    {
      key: 'enrollmentInfo',
      label: 'Enrollment Information',
      description: 'Enrollment date, Date of birth',
      fields: ['Enrollment Date', 'Date of Birth']
    },
    {
      key: 'profilePhoto',
      label: 'Profile Photo URL',
      description: 'Link to student profile photos',
      fields: ['Profile Photo URL']
    }
  ];

  const handleFieldToggle = (fieldKey) => {
    setIncludeFields(prev => ({
      ...prev,
      [fieldKey]: !prev[fieldKey]
    }));
  };

  const getSelectedFieldsCount = () => {
    return Object.values(includeFields).filter(Boolean).length;
  };

  const getEstimatedStudentCount = () => {
    switch (exportScope) {
      case 'selected':
        return selectedStudents.length;
      case 'filtered':
        return allStudents.length;
      case 'all':
        return allStudents.length; // In a real app, this would be the total count
      default:
        return 0;
    }
  };

  const handleExport = () => {
    if (getSelectedFieldsCount() === 0) {
      alert('Please select at least one field to export.');
      return;
    }

    onExport(exportFormat, exportScope, includeFields);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-1000 p-4">
      <div className="bg-surface rounded-xl shadow-elevated max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-semibold text-text-primary">Export Students</h2>
            <p className="text-sm text-text-secondary mt-1">
              Choose format and data to export
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-background transition-smooth"
          >
            <Icon name="X" size={20} className="text-text-secondary" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)] space-y-6">
          {/* Export Format */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-text-primary">Export Format</h3>
            <div className="space-y-3">
              {formatOptions.map((format) => (
                <label
                  key={format.value}
                  className={`
                    flex items-start space-x-3 p-4 border rounded-lg cursor-pointer transition-smooth
                    ${exportFormat === format.value
                      ? 'border-primary bg-primary-50' :'border-border hover:bg-background'
                    }
                  `}
                >
                  <input
                    type="radio"
                    name="exportFormat"
                    value={format.value}
                    checked={exportFormat === format.value}
                    onChange={(e) => setExportFormat(e.target.value)}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <Icon name={format.icon} size={16} className="text-primary" />
                      <span className="font-medium text-text-primary">{format.label}</span>
                    </div>
                    <p className="text-sm text-text-secondary mt-1">{format.description}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Export Scope */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-text-primary">Export Scope</h3>
            <div className="space-y-3">
              {scopeOptions.map((scope) => (
                <label
                  key={scope.value}
                  className={`
                    flex items-start space-x-3 p-4 border rounded-lg cursor-pointer transition-smooth
                    ${scope.disabled
                      ? 'opacity-50 cursor-not-allowed'
                      : exportScope === scope.value
                      ? 'border-primary bg-primary-50' :'border-border hover:bg-background'
                    }
                  `}
                >
                  <input
                    type="radio"
                    name="exportScope"
                    value={scope.value}
                    checked={exportScope === scope.value}
                    onChange={(e) => setExportScope(e.target.value)}
                    disabled={scope.disabled}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <span className="font-medium text-text-primary">{scope.label}</span>
                    <p className="text-sm text-text-secondary mt-1">{scope.description}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Fields to Include */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-text-primary">Fields to Include</h3>
              <span className="text-sm text-text-secondary">
                {getSelectedFieldsCount()} of {fieldOptions.length} selected
              </span>
            </div>
            <div className="space-y-3">
              {fieldOptions.map((field) => (
                <label
                  key={field.key}
                  className={`
                    flex items-start space-x-3 p-4 border rounded-lg cursor-pointer transition-smooth
                    ${includeFields[field.key]
                      ? 'border-primary bg-primary-50' :'border-border hover:bg-background'
                    }
                  `}
                >
                  <input
                    type="checkbox"
                    checked={includeFields[field.key]}
                    onChange={() => handleFieldToggle(field.key)}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <span className="font-medium text-text-primary">{field.label}</span>
                    <p className="text-sm text-text-secondary mt-1">{field.description}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {field.fields.map((fieldName, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-background text-text-secondary text-xs rounded"
                        >
                          {fieldName}
                        </span>
                      ))}
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Export Summary */}
          <div className="bg-background border border-border rounded-lg p-4">
            <h4 className="font-medium text-text-primary mb-3">Export Summary</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-text-secondary">Format:</span>
                <span className="text-text-primary font-medium">
                  {formatOptions.find(f => f.value === exportFormat)?.label}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Students:</span>
                <span className="text-text-primary font-medium">
                  {getEstimatedStudentCount()} records
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Fields:</span>
                <span className="text-text-primary font-medium">
                  {getSelectedFieldsCount()} field groups
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-border">
          <button
            onClick={onClose}
            className="px-4 py-2 text-text-secondary hover:text-text-primary transition-smooth"
          >
            Cancel
          </button>
          <button
            onClick={handleExport}
            disabled={getSelectedFieldsCount() === 0}
            className="bg-primary text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-smooth flex items-center space-x-2"
          >
            <Icon name="Download" size={16} />
            <span>Export Data</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExportModal;