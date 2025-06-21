import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const GlobalHeader = ({ user, onLogout, onMenuToggle, isMobile = false }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = () => {
    setShowUserMenu(false);
    if (onLogout) {
      onLogout();
    }
    navigate('/login-screen');
  };

  const getPageTitle = () => {
    const path = location.pathname;
    switch (path) {
      case '/admin-dashboard':
        return 'Admin Dashboard';
      case '/student-management':
        return 'Student Management';
      case '/student-profile-detail':
        return 'Student Profile';
      case '/student-dashboard':
        return 'Student Dashboard';
      case '/reports-generation':
        return 'Reports & Analytics';
      default:
        return 'EduTech Portal';
    }
  };

  const isStudentRole = user?.role === 'student';

  return (
    <header className="fixed top-0 left-0 right-0 z-1000 bg-surface border-b border-border shadow-soft">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Left Section - Logo and Menu */}
        <div className="flex items-center space-x-4">
          {/* Mobile Menu Toggle */}
          {isMobile && !isStudentRole && (
            <button
              onClick={onMenuToggle}
              className="p-2 rounded-lg hover:bg-primary-50 transition-smooth lg:hidden"
              aria-label="Toggle navigation menu"
            >
              <Icon name="Menu" size={20} className="text-text-primary" />
            </button>
          )}
          
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="GraduationCap" size={20} className="text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-semibold text-text-primary">EduTech</h1>
              <p className="text-xs text-text-secondary -mt-1">Learning Management</p>
            </div>
          </div>
        </div>

        {/* Center Section - Page Title (Desktop) */}
        <div className="hidden md:block">
          <h2 className="text-sm font-medium text-text-secondary">
            {getPageTitle()}
          </h2>
        </div>

        {/* Right Section - User Menu */}
        <div className="flex items-center space-x-4">
          {/* Notifications (Admin only) */}
          {!isStudentRole && (
            <button className="p-2 rounded-lg hover:bg-primary-50 transition-smooth relative">
              <Icon name="Bell" size={20} className="text-text-secondary" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full"></span>
            </button>
          )}

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-primary-50 transition-smooth"
            >
              <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                <Icon name="User" size={16} className="text-primary" />
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-medium text-text-primary">
                  {user?.name || 'User'}
                </p>
                <p className="text-xs text-text-secondary capitalize">
                  {user?.role || 'Student'}
                </p>
              </div>
              <Icon 
                name="ChevronDown" 
                size={16} 
                className={`text-text-secondary transition-transform duration-200 ${
                  showUserMenu ? 'rotate-180' : ''
                }`} 
              />
            </button>

            {/* User Dropdown Menu */}
            {showUserMenu && (
              <>
                <div 
                  className="fixed inset-0 z-950" 
                  onClick={() => setShowUserMenu(false)}
                ></div>
                <div className="absolute right-0 top-full mt-2 w-48 bg-surface rounded-lg shadow-elevated border border-border z-1100">
                  <div className="p-3 border-b border-border">
                    <p className="text-sm font-medium text-text-primary">
                      {user?.name || 'User'}
                    </p>
                    <p className="text-xs text-text-secondary">
                      {user?.email || 'user@example.com'}
                    </p>
                  </div>
                  <div className="py-2">
                    <button
                      onClick={() => {
                        setShowUserMenu(false);
                        // Navigate to profile or settings
                      }}
                      className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-text-primary hover:bg-primary-50 transition-smooth"
                    >
                      <Icon name="Settings" size={16} />
                      <span>Settings</span>
                    </button>
                    <button
                      onClick={() => {
                        setShowUserMenu(false);
                        // Navigate to help
                      }}
                      className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-text-primary hover:bg-primary-50 transition-smooth"
                    >
                      <Icon name="HelpCircle" size={16} />
                      <span>Help & Support</span>
                    </button>
                    <hr className="my-2 border-border" />
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-error hover:bg-error-50 transition-smooth"
                    >
                      <Icon name="LogOut" size={16} />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default GlobalHeader;