// src/pages/login-screen/index.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Icon from 'components/AppIcon';

const LoginScreen = () => {
  const navigate = useNavigate();
  const { signIn, authError, clearError } = useAuth();
  const [selectedRole, setSelectedRole] = useState('admin');
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Mock credentials for different roles (for demonstration)
  const mockCredentials = {
    admin: {
      email: 'admin@edumanage.edu',
      password: 'admin123'
    },
    student: {
      email: 'student@edumanage.edu',
      password: 'student123'
    }
  };

  const handleRoleChange = (role) => {
    setSelectedRole(role);
    setFormData({ email: '', password: '' });
    setErrors({});
    clearError();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    
    // Clear auth error when user starts typing
    if (authError) {
      clearError();
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = selectedRole === 'admin' ? 'Email address is required' : 'Student ID is required';
    } else if (selectedRole === 'admin' && !formData.email.includes('@')) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    clearError();

    try {
      const result = await signIn(formData.email, formData.password);
      
      if (result?.success) {
        // Get user profile to determine role-based navigation
        if (selectedRole === 'admin') {
          navigate('/admin-dashboard');
        } else {
          navigate('/student-dashboard');
        }
      }
    } catch (error) {
      console.log('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    if (formData.email) {
      // In a real app, this would use the resetPassword function
      alert('Password reset instructions would be sent to your email.');
    } else {
      alert('Please enter your email address first.');
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Login Card */}
        <div className="bg-surface rounded-xl shadow-elevated border border-border p-8">
          {/* Institution Logo & Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center mx-auto mb-4">
              <Icon name="GraduationCap" size={32} className="text-white" />
            </div>
            <h1 className="text-2xl font-semibold text-text-primary mb-2">EduManage Pro</h1>
            <p className="text-text-secondary">Sign in to your account</p>
          </div>

          {/* Role Selection Toggle */}
          <div className="mb-6">
            <div className="bg-background rounded-lg p-1 flex">
              <button
                type="button"
                onClick={() => handleRoleChange('admin')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-smooth ${
                  selectedRole === 'admin' ?'bg-primary text-white shadow-soft' :'text-text-secondary hover:text-text-primary'
                }`}
              >
                <div className="flex items-center justify-center space-x-2">
                  <Icon name="Shield" size={16} />
                  <span>Administrator</span>
                </div>
              </button>
              <button
                type="button"
                onClick={() => handleRoleChange('student')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-smooth ${
                  selectedRole === 'student' ?'bg-primary text-white shadow-soft' :'text-text-secondary hover:text-text-primary'
                }`}
              >
                <div className="flex items-center justify-center space-x-2">
                  <Icon name="User" size={16} />
                  <span>Student</span>
                </div>
              </button>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* General Error Message */}
            {authError && (
              <div className="bg-error-50 border border-error-100 rounded-lg p-3 flex items-center space-x-2">
                <Icon name="AlertCircle" size={16} className="text-error flex-shrink-0" />
                <p className="text-sm text-error">{authError}</p>
              </div>
            )}

            {/* Email/Student ID Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-2">
                {selectedRole === 'admin' ? 'Email Address' : 'Student ID'}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Icon 
                    name={selectedRole === 'admin' ? 'Mail' : 'User'} 
                    size={16} 
                    className="text-text-secondary" 
                  />
                </div>
                <input
                  type={selectedRole === 'admin' ? 'email' : 'text'}
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder={selectedRole === 'admin' ? 'admin@edumanage.edu' : 'Enter your student ID'}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-smooth ${
                    errors.email ? 'border-error' : 'border-border'
                  }`}
                  disabled={isLoading}
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-error flex items-center space-x-1">
                  <Icon name="AlertCircle" size={12} />
                  <span>{errors.email}</span>
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-text-primary mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Icon name="Lock" size={16} className="text-text-secondary" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-smooth ${
                    errors.password ? 'border-error' : 'border-border'
                  }`}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  disabled={isLoading}
                >
                  <Icon 
                    name={showPassword ? 'EyeOff' : 'Eye'} 
                    size={16} 
                    className="text-text-secondary hover:text-text-primary transition-smooth" 
                  />
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-error flex items-center space-x-1">
                  <Icon name="AlertCircle" size={12} />
                  <span>{errors.password}</span>
                </p>
              )}
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-white py-3 px-4 rounded-lg font-medium hover:bg-primary-700 focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-smooth disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Signing In...</span>
                </>
              ) : (
                <>
                  <Icon name="LogIn" size={16} />
                  <span>Sign In</span>
                </>
              )}
            </button>
          </form>

          {/* Forgot Password Link */}
          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-sm text-primary hover:text-primary-700 transition-smooth"
            >
              Forgot your password?
            </button>
          </div>

          {/* Mock Credentials Info */}
          <div className="mt-8 pt-6 border-t border-border">
            <div className="bg-primary-50 rounded-lg p-4">
              <h4 className="text-sm font-medium text-primary mb-2 flex items-center space-x-2">
                <Icon name="Info" size={14} />
                <span>Demo Credentials</span>
              </h4>
              <div className="space-y-2 text-xs text-primary">
                <div>
                  <strong>Admin:</strong> admin@edumanage.edu / admin123
                </div>
                <div>
                  <strong>Student:</strong> student@edumanage.edu / student123
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-sm text-text-secondary">
            © {new Date().getFullYear()} EduManage Pro. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;