import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const BreadcrumbNavigation = ({ customBreadcrumbs = null }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const routeMap = {
    '/admin-dashboard': { label: 'Dashboard', icon: 'LayoutDashboard' },
    '/student-management': { label: 'Student Management', icon: 'Users' },
    '/student-profile-detail': { label: 'Student Profile', icon: 'UserCheck' },
    '/reports-generation': { label: 'Reports & Analytics', icon: 'BarChart3' },
    '/student-dashboard': { label: 'Student Dashboard', icon: 'User' }
  };

  const generateBreadcrumbs = () => {
    if (customBreadcrumbs) {
      return customBreadcrumbs;
    }

    const pathSegments = location.pathname.split('/').filter(segment => segment);
    const breadcrumbs = [{ label: 'Home', path: '/admin-dashboard', icon: 'Home' }];

    let currentPath = '';
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const routeInfo = routeMap[currentPath];
      
      if (routeInfo) {
        breadcrumbs.push({
          label: routeInfo.label,
          path: currentPath,
          icon: routeInfo.icon,
          isLast: index === pathSegments.length - 1
        });
      }
    });

    return breadcrumbs.length > 1 ? breadcrumbs : [];
  };

  const breadcrumbs = generateBreadcrumbs();

  if (breadcrumbs.length === 0) {
    return null;
  }

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <nav className="flex items-center space-x-2 px-4 lg:px-6 py-3 bg-background border-b border-border" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2 text-sm">
        {breadcrumbs.map((crumb, index) => (
          <li key={index} className="flex items-center space-x-2">
            {index > 0 && (
              <Icon name="ChevronRight" size={14} className="text-text-secondary" />
            )}
            
            {crumb.isLast ? (
              <span className="flex items-center space-x-2 text-text-primary font-medium">
                <Icon name={crumb.icon} size={16} className="text-primary" />
                <span>{crumb.label}</span>
              </span>
            ) : (
              <button
                onClick={() => handleNavigation(crumb.path)}
                className="flex items-center space-x-2 text-text-secondary hover:text-primary transition-smooth"
              >
                <Icon name={crumb.icon} size={16} />
                <span>{crumb.label}</span>
              </button>
            )}
          </li>
        ))}
      </ol>

      {/* Mobile Back Button */}
      <div className="ml-auto md:hidden">
        {breadcrumbs.length > 1 && (
          <button
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 px-3 py-1 text-sm text-text-secondary hover:text-primary hover:bg-primary-50 rounded-lg transition-smooth"
          >
            <Icon name="ArrowLeft" size={16} />
            <span>Back</span>
          </button>
        )}
      </div>
    </nav>
  );
};

export default BreadcrumbNavigation;