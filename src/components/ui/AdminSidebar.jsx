import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const AdminSidebar = ({ isCollapsed = false, onToggleCollapse, isMobile = false, isOpen = false, onClose }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    {
      label: 'Dashboard',
      path: '/admin-dashboard',
      icon: 'LayoutDashboard',
      tooltip: 'Overview and key metrics'
    },
    {
      label: 'Students',
      path: '/student-management',
      icon: 'Users',
      tooltip: 'Manage student records'
    },
    {
      label: 'Student Profile',
      path: '/student-profile-detail',
      icon: 'UserCheck',
      tooltip: 'Detailed student information'
    },
    {
      label: 'Reports',
      path: '/reports-generation',
      icon: 'BarChart3',
      tooltip: 'Analytics and reporting'
    }
  ];

  const handleNavigation = (path) => {
    navigate(path);
    if (isMobile && onClose) {
      onClose();
    }
  };

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  // Mobile Overlay Sidebar
  if (isMobile) {
    return (
      <>
        {/* Mobile Overlay */}
        {isOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-950 lg:hidden"
            onClick={onClose}
          ></div>
        )}
        
        {/* Mobile Sidebar */}
        <aside className={`
          fixed top-0 left-0 h-full w-64 bg-surface border-r border-border shadow-elevated z-950
          transform transition-transform duration-300 ease-in-out lg:hidden
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
          <div className="flex flex-col h-full">
            {/* Mobile Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Icon name="GraduationCap" size={20} className="text-white" />
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-text-primary">EduTech</h2>
                  <p className="text-xs text-text-secondary">Admin Panel</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-primary-50 transition-smooth"
              >
                <Icon name="X" size={20} className="text-text-secondary" />
              </button>
            </div>

            {/* Navigation Items */}
            <nav className="flex-1 p-4">
              <ul className="space-y-2">
                {navigationItems.map((item) => (
                  <li key={item.path}>
                    <button
                      onClick={() => handleNavigation(item.path)}
                      className={`
                        w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-left
                        transition-smooth group
                        ${isActiveRoute(item.path)
                          ? 'bg-primary text-white shadow-soft'
                          : 'text-text-primary hover:bg-primary-50 hover:text-primary'
                        }
                      `}
                    >
                      <Icon 
                        name={item.icon} 
                        size={20} 
                        className={isActiveRoute(item.path) ? 'text-white' : 'text-text-secondary group-hover:text-primary'}
                      />
                      <span className="font-medium">{item.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </aside>
      </>
    );
  }

  // Desktop Sidebar
  return (
    <aside className={`
      fixed top-16 left-0 h-[calc(100vh-4rem)] bg-surface border-r border-border z-900
      transition-all duration-300 ease-in-out hidden lg:block
      ${isCollapsed ? 'w-16' : 'w-64'}
    `}>
      <div className="flex flex-col h-full">
        {/* Collapse Toggle */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          {!isCollapsed && (
            <div>
              <h2 className="text-sm font-semibold text-text-primary">Navigation</h2>
              <p className="text-xs text-text-secondary">Admin Panel</p>
            </div>
          )}
          <button
            onClick={onToggleCollapse}
            className="p-2 rounded-lg hover:bg-primary-50 transition-smooth ml-auto"
            title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <Icon 
              name={isCollapsed ? "ChevronRight" : "ChevronLeft"} 
              size={16} 
              className="text-text-secondary" 
            />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {navigationItems.map((item) => (
              <li key={item.path}>
                <button
                  onClick={() => handleNavigation(item.path)}
                  className={`
                    w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-left
                    transition-smooth group relative
                    ${isActiveRoute(item.path)
                      ? 'bg-primary text-white shadow-soft'
                      : 'text-text-primary hover:bg-primary-50 hover:text-primary'
                    }
                  `}
                  title={isCollapsed ? item.tooltip : ''}
                >
                  <Icon 
                    name={item.icon} 
                    size={20} 
                    className={isActiveRoute(item.path) ? 'text-white' : 'text-text-secondary group-hover:text-primary'}
                  />
                  {!isCollapsed && (
                    <span className="font-medium">{item.label}</span>
                  )}
                  
                  {/* Tooltip for collapsed state */}
                  {isCollapsed && (
                    <div className="absolute left-full ml-2 px-2 py-1 bg-text-primary text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-1100">
                      {item.label}
                    </div>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-border">
          {!isCollapsed ? (
            <div className="text-xs text-text-secondary">
              <p>EduTech Admin v2.1</p>
              <p>© 2024 All rights reserved</p>
            </div>
          ) : (
            <div className="flex justify-center">
              <Icon name="Info" size={16} className="text-text-secondary" />
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;