import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const AdvancedSearchModal = ({ onClose, onSearch }) => {
  const [searchCriteria, setSearchCriteria] = useState({
    name: '',
    studentId: '',
    email: '',
    department: '',
    status: '',
    year: '',
    enrollmentDateFrom: '',
    enrollmentDateTo: '',
    gpaMin: '',
    gpaMax: '',
    phone: '',
    address: ''
  });

  const departments = [
    'Computer Science',
    'Electrical Engineering',
    'Biology',
    'Mechanical Engineering',
    'Mathematics',
    'Physics',
    'Chemistry',
    'Business Administration'
  ];

  const statusOptions = ['Active', 'Inactive', 'Suspended', 'Graduated'];
  const yearOptions = ['2024', '2023', '2022', '2021', '2020'];

  const handleInputChange = (field, value) => {
    setSearchCriteria(prev => ({ ...prev, [field]: value }));
  };

  const handleSearch = () => {
    // Filter out empty values
    const filteredCriteria = Object.entries(searchCriteria).reduce((acc, [key, value]) => {
      if (value && value.toString().trim() !== '') {
        acc[key] = value;
      }
      return acc;
    }, {});

    onSearch(filteredCriteria);
  };

  const handleReset = () => {
    setSearchCriteria({
      name: '',
      studentId: '',
      email: '',
      department: '',
      status: '',
      year: '',
      enrollmentDateFrom: '',
      enrollmentDateTo: '',
      gpaMin: '',
      gpaMax: '',
      phone: '',
      address: ''
    });
  };

  const getActiveSearchCount = () => {
    return Object.values(searchCriteria).filter(value => value && value.toString().trim() !== '').length;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-1000 p-4">
      <div className="bg-surface rounded-xl shadow-elevated max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-semibold text-text-primary">Advanced Search</h2>
            <p className="text-sm text-text-secondary mt-1">
              Use multiple criteria to find specific students
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
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-text-primary flex items-center space-x-2">
                <Icon name="User" size={20} className="text-primary" />
                <span>Basic Information</span>
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Student Name
                  </label>
                  <input
                    type="text"
                    value={searchCriteria.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-smooth"
                    placeholder="Enter name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Student ID
                  </label>
                  <input
                    type="text"
                    value={searchCriteria.studentId}
                    onChange={(e) => handleInputChange('studentId', e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-smooth"
                    placeholder="STU2024001"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={searchCriteria.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-smooth"
                    placeholder="student@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={searchCriteria.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-smooth"
                    placeholder="+1-555-0123"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Address
                  </label>
                  <input
                    type="text"
                    value={searchCriteria.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-smooth"
                    placeholder="Enter address"
                  />
                </div>
              </div>
            </div>

            {/* Academic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-text-primary flex items-center space-x-2">
                <Icon name="GraduationCap" size={20} className="text-primary" />
                <span>Academic Information</span>
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Department
                  </label>
                  <select
                    value={searchCriteria.department}
                    onChange={(e) => handleInputChange('department', e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-smooth"
                  >
                    <option value="">All Departments</option>
                    {departments.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Status
                  </label>
                  <select
                    value={searchCriteria.status}
                    onChange={(e) => handleInputChange('status', e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-smooth"
                  >
                    <option value="">All Statuses</option>
                    {statusOptions.map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Academic Year
                  </label>
                  <select
                    value={searchCriteria.year}
                    onChange={(e) => handleInputChange('year', e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-smooth"
                  >
                    <option value="">All Years</option>
                    {yearOptions.map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Date Range */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-text-primary flex items-center space-x-2">
                <Icon name="Calendar" size={20} className="text-primary" />
                <span>Enrollment Date Range</span>
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    From Date
                  </label>
                  <input
                    type="date"
                    value={searchCriteria.enrollmentDateFrom}
                    onChange={(e) => handleInputChange('enrollmentDateFrom', e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-smooth"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    To Date
                  </label>
                  <input
                    type="date"
                    value={searchCriteria.enrollmentDateTo}
                    onChange={(e) => handleInputChange('enrollmentDateTo', e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-smooth"
                  />
                </div>
              </div>
            </div>

            {/* GPA Range */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-text-primary flex items-center space-x-2">
                <Icon name="Award" size={20} className="text-primary" />
                <span>GPA Range</span>
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Minimum GPA
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="4"
                    step="0.01"
                    value={searchCriteria.gpaMin}
                    onChange={(e) => handleInputChange('gpaMin', e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-smooth"
                    placeholder="0.00"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Maximum GPA
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="4"
                    step="0.01"
                    value={searchCriteria.gpaMax}
                    onChange={(e) => handleInputChange('gpaMax', e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-smooth"
                    placeholder="4.00"
                  />
                </div>
              </div>
            </div>

            {/* Search Summary */}
            {getActiveSearchCount() > 0 && (
              <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <Icon name="Search" size={16} className="text-primary" />
                  <span className="text-sm font-medium text-primary">
                    {getActiveSearchCount()} search criteria active
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border">
          <button
            onClick={handleReset}
            className="flex items-center space-x-2 px-4 py-2 text-text-secondary hover:text-text-primary transition-smooth"
          >
            <Icon name="RotateCcw" size={16} />
            <span>Reset All</span>
          </button>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-text-secondary hover:text-text-primary transition-smooth"
            >
              Cancel
            </button>
            <button
              onClick={handleSearch}
              className="bg-primary text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-700 transition-smooth flex items-center space-x-2"
            >
              <Icon name="Search" size={16} />
              <span>Search Students</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedSearchModal;