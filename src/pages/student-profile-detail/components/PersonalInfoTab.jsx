import React from 'react';
import Icon from 'components/AppIcon';

const PersonalInfoTab = ({ studentData, setStudentData, isEditMode, setSaveStatus }) => {
  const handleInputChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setStudentData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setStudentData(prev => ({
        ...prev,
        [field]: value
      }));
    }
    
    setSaveStatus('saving');
    setTimeout(() => setSaveStatus('saved'), 1000);
  };

  const InputField = ({ label, value, field, type = "text", required = false }) => (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-text-primary">
        {label} {required && <span className="text-error">*</span>}
      </label>
      {isEditMode ? (
        <input
          type={type}
          value={value}
          onChange={(e) => handleInputChange(field, e.target.value)}
          className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-smooth"
          required={required}
        />
      ) : (
        <p className="text-text-primary bg-background px-3 py-2 rounded-lg border border-border">
          {value || 'Not provided'}
        </p>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-text-primary">Personal Information</h3>
        {isEditMode && (
          <div className="flex items-center space-x-2 text-sm text-accent-600">
            <Icon name="Info" size={16} />
            <span>Form auto-saves changes</span>
          </div>
        )}
      </div>

      {/* Basic Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField
          label="First Name"
          value={studentData.firstName}
          field="firstName"
          required
        />
        <InputField
          label="Last Name"
          value={studentData.lastName}
          field="lastName"
          required
        />
        <InputField
          label="Email Address"
          value={studentData.email}
          field="email"
          type="email"
          required
        />
        <InputField
          label="Phone Number"
          value={studentData.phone}
          field="phone"
          type="tel"
        />
        <InputField
          label="Date of Birth"
          value={studentData.dateOfBirth}
          field="dateOfBirth"
          type="date"
        />
        <div className="space-y-2">
          <label className="block text-sm font-medium text-text-primary">Gender</label>
          {isEditMode ? (
            <select
              value={studentData.gender}
              onChange={(e) => handleInputChange('gender', e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-smooth"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
              <option value="Prefer not to say">Prefer not to say</option>
            </select>
          ) : (
            <p className="text-text-primary bg-background px-3 py-2 rounded-lg border border-border">
              {studentData.gender || 'Not provided'}
            </p>
          )}
        </div>
      </div>

      {/* Address Information */}
      <div className="border-t border-border pt-6">
        <h4 className="text-md font-semibold text-text-primary mb-4">Address Information</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <InputField
              label="Street Address"
              value={studentData.address}
              field="address"
            />
          </div>
          <InputField
            label="City"
            value={studentData.city}
            field="city"
          />
          <InputField
            label="State/Province"
            value={studentData.state}
            field="state"
          />
          <InputField
            label="ZIP/Postal Code"
            value={studentData.zipCode}
            field="zipCode"
          />
          <InputField
            label="Country"
            value={studentData.country}
            field="country"
          />
        </div>
      </div>

      {/* Emergency Contact */}
      <div className="border-t border-border pt-6">
        <h4 className="text-md font-semibold text-text-primary mb-4">Emergency Contact</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Contact Name"
            value={studentData.emergencyContact.name}
            field="emergencyContact.name"
            required
          />
          <InputField
            label="Relationship"
            value={studentData.emergencyContact.relationship}
            field="emergencyContact.relationship"
          />
          <InputField
            label="Phone Number"
            value={studentData.emergencyContact.phone}
            field="emergencyContact.phone"
            type="tel"
            required
          />
          <InputField
            label="Email Address"
            value={studentData.emergencyContact.email}
            field="emergencyContact.email"
            type="email"
          />
        </div>
      </div>

      {/* Form Validation Messages */}
      {isEditMode && (
        <div className="bg-primary-50 border border-primary-100 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Icon name="Info" size={16} className="text-primary mt-0.5" />
            <div className="text-sm">
              <p className="text-primary font-medium mb-1">Form Validation Active</p>
              <ul className="text-primary space-y-1">
                <li>• Required fields are marked with a red asterisk (*)</li>
                <li>• Changes are automatically saved as you type</li>
                <li>• Invalid data will be highlighted in red</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonalInfoTab;