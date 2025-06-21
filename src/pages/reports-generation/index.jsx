import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';
import GlobalHeader from 'components/ui/GlobalHeader';
import AdminSidebar from 'components/ui/AdminSidebar';
import BreadcrumbNavigation from 'components/ui/BreadcrumbNavigation';
import ReportTypeSelector from './components/ReportTypeSelector';
import FilterOptions from './components/FilterOptions';
import OutputCustomization from './components/OutputCustomization';
import ReportPreview from './components/ReportPreview';

const ReportsGeneration = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Mock user data
  const mockUser = {
    id: 1,
    name: "Dr. Sarah Johnson",
    email: "sarah.johnson@edumanage.com",
    role: "admin",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg"
  };

  // Report generation state
  const [reportData, setReportData] = useState({
    type: null,
    filters: {
      dateRange: { start: '', end: '' },
      departments: [],
      studentStatus: [],
      academicPrograms: [],
      demographics: {}
    },
    output: {
      fields: [],
      format: 'pdf',
      sorting: 'name_asc'
    }
  });

  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = () => {
    navigate('/login-screen');
  };

  const handleStepChange = (step) => {
    setCurrentStep(step);
  };

  const handleReportDataUpdate = (section, data) => {
    setReportData(prev => ({
      ...prev,
      [section]: { ...prev[section], ...data }
    }));
  };

  const handleGenerateReport = async () => {
    setIsGenerating(true);
    
    // Simulate report generation
    setTimeout(() => {
      setIsGenerating(false);
      // In a real app, this would trigger download or show success message
      alert('Report generated successfully! Download will begin shortly.');
    }, 3000);
  };

  const steps = [
    { id: 1, title: 'Report Type', description: 'Select report category' },
    { id: 2, title: 'Filters', description: 'Configure data criteria' },
    { id: 3, title: 'Output', description: 'Customize format & fields' }
  ];

  const getStepStatus = (stepId) => {
    if (stepId < currentStep) return 'completed';
    if (stepId === currentStep) return 'active';
    return 'pending';
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Global Header */}
      <GlobalHeader
        user={mockUser}
        onLogout={handleLogout}
        onMenuToggle={() => setMobileSidebarOpen(!mobileSidebarOpen)}
        isMobile={isMobile}
      />

      {/* Admin Sidebar */}
      <AdminSidebar
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        isMobile={isMobile}
        isOpen={mobileSidebarOpen}
        onClose={() => setMobileSidebarOpen(false)}
      />

      {/* Main Content */}
      <div className={`
        pt-16 transition-all duration-300
        ${isMobile ? 'lg:pl-0' : sidebarCollapsed ? 'lg:pl-16' : 'lg:pl-64'}
      `}>
        {/* Breadcrumb Navigation */}
        <BreadcrumbNavigation />

        {/* Page Content */}
        <div className="p-4 lg:p-6">
          {/* Page Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl font-semibold text-text-primary">Reports Generation</h1>
                <p className="text-text-secondary mt-1">Create comprehensive institutional reports with flexible filtering options</p>
              </div>
              <div className="hidden md:flex items-center space-x-3">
                <button className="flex items-center space-x-2 px-4 py-2 text-sm text-text-secondary hover:text-primary hover:bg-primary-50 rounded-lg transition-smooth">
                  <Icon name="History" size={16} />
                  <span>Report History</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 text-sm text-text-secondary hover:text-primary hover:bg-primary-50 rounded-lg transition-smooth">
                  <Icon name="BookOpen" size={16} />
                  <span>Templates</span>
                </button>
              </div>
            </div>

            {/* Progress Steps */}
            <div className="bg-surface rounded-xl border border-border p-6 mb-6">
              <div className="flex items-center justify-between">
                {steps.map((step, index) => (
                  <div key={step.id} className="flex items-center">
                    <div className="flex items-center">
                      <button
                        onClick={() => handleStepChange(step.id)}
                        className={`
                          w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-200
                          ${getStepStatus(step.id) === 'completed' 
                            ? 'bg-success text-white' 
                            : getStepStatus(step.id) === 'active' ?'bg-primary text-white' :'bg-background text-text-secondary border-2 border-border'
                          }
                        `}
                      >
                        {getStepStatus(step.id) === 'completed' ? (
                          <Icon name="Check" size={16} />
                        ) : (
                          step.id
                        )}
                      </button>
                      <div className="ml-3 hidden sm:block">
                        <p className={`text-sm font-medium ${
                          getStepStatus(step.id) === 'active' ? 'text-primary' : 'text-text-primary'
                        }`}>
                          {step.title}
                        </p>
                        <p className="text-xs text-text-secondary">{step.description}</p>
                      </div>
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`
                        w-12 sm:w-20 h-0.5 mx-4
                        ${getStepStatus(step.id) === 'completed' ? 'bg-success' : 'bg-border'}
                      `} />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            {/* Step Content */}
            <div className="xl:col-span-3">
              {currentStep === 1 && (
                <ReportTypeSelector
                  selectedType={reportData.type}
                  onTypeSelect={(type) => {
                    handleReportDataUpdate('type', type);
                    setCurrentStep(2);
                  }}
                />
              )}

              {currentStep === 2 && (
                <FilterOptions
                  filters={reportData.filters}
                  onFiltersUpdate={(filters) => handleReportDataUpdate('filters', filters)}
                  onNext={() => setCurrentStep(3)}
                  onBack={() => setCurrentStep(1)}
                />
              )}

              {currentStep === 3 && (
                <OutputCustomization
                  output={reportData.output}
                  reportType={reportData.type}
                  onOutputUpdate={(output) => handleReportDataUpdate('output', output)}
                  onBack={() => setCurrentStep(2)}
                  onGenerate={handleGenerateReport}
                  isGenerating={isGenerating}
                />
              )}
            </div>

            {/* Report Preview Panel */}
            <div className="xl:col-span-1">
              <ReportPreview
                reportData={reportData}
                currentStep={currentStep}
                isGenerating={isGenerating}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsGeneration;