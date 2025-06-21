import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/login-screen');
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="w-32 h-32 mx-auto bg-primary-50 rounded-full flex items-center justify-center mb-6">
            <Icon name="AlertTriangle" size={64} className="text-primary" />
          </div>
          <h1 className="text-6xl font-bold text-text-primary mb-2">404</h1>
          <h2 className="text-2xl font-semibold text-text-primary mb-4">Page Not Found</h2>
          <p className="text-text-secondary mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <button
            onClick={handleGoHome}
            className="w-full bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-smooth flex items-center justify-center space-x-2"
          >
            <Icon name="Home" size={20} />
            <span>Go to Login</span>
          </button>
          
          <button
            onClick={handleGoBack}
            className="w-full bg-surface text-text-primary px-6 py-3 rounded-lg font-medium border border-border hover:bg-background transition-smooth flex items-center justify-center space-x-2"
          >
            <Icon name="ArrowLeft" size={20} />
            <span>Go Back</span>
          </button>
        </div>

        {/* Help Text */}
        <div className="mt-8 pt-6 border-t border-border">
          <p className="text-sm text-text-secondary">
            Need help? Contact your system administrator or try refreshing the page.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;