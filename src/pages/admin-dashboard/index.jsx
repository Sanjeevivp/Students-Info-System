import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import GlobalHeader from 'components/ui/GlobalHeader';
import AdminSidebar from 'components/ui/AdminSidebar';
import BreadcrumbNavigation from 'components/ui/BreadcrumbNavigation';


import RecentActivity from './components/RecentActivity';
import QuickActions from './components/QuickActions';
import KPICards from './components/KPICards';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [selectedDateRange, setSelectedDateRange] = useState('7days');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [isLoading, setIsLoading] = useState(false);

  // Mock user data
  const currentUser = {
    name: "Dr. Sarah Johnson",
    email: "sarah.johnson@edumanage.edu",
    role: "admin",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
  };

  // Mock enrollment trends data
  const enrollmentTrendsData = [
    { month: 'Jan', students: 1200, newEnrollments: 150, graduations: 80 },
    { month: 'Feb', students: 1270, newEnrollments: 180, graduations: 110 },
    { month: 'Mar', students: 1350, newEnrollments: 200, graduations: 120 },
    { month: 'Apr', students: 1430, newEnrollments: 220, graduations: 140 },
    { month: 'May', students: 1510, newEnrollments: 190, graduations: 110 },
    { month: 'Jun', students: 1590, newEnrollments: 210, graduations: 130 }
  ];

  // Mock department distribution data
  const departmentData = [
    { name: 'Computer Science', value: 450, color: '#1E40AF' },
    { name: 'Engineering', value: 380, color: '#7C3AED' },
    { name: 'Business', value: 320, color: '#F59E0B' },
    { name: 'Arts & Sciences', value: 290, color: '#10B981' },
    { name: 'Medicine', value: 150, color: '#EF4444' }
  ];

  // Auto-refresh functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setIsLoading(true);
      // Simulate data refresh
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }, 300000); // 5 minutes

    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    navigate('/login-screen');
  };

  const handleDateRangeChange = (range) => {
    setSelectedDateRange(range);
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 800);
  };

  const handleDepartmentFilter = (dept) => {
    setSelectedDepartment(dept);
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 600);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Global Header */}
      <GlobalHeader
        user={currentUser}
        onLogout={handleLogout}
        onMenuToggle={() => setMobileSidebarOpen(!mobileSidebarOpen)}
        isMobile={window.innerWidth < 1024}
      />

      {/* Admin Sidebar */}
      <AdminSidebar
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        isMobile={window.innerWidth < 1024}
        isOpen={mobileSidebarOpen}
        onClose={() => setMobileSidebarOpen(false)}
      />

      {/* Main Content */}
      <div className={`
        pt-16 transition-all duration-300 ease-in-out
        ${sidebarCollapsed ? 'lg:pl-16' : 'lg:pl-64'}
      `}>
        {/* Breadcrumb Navigation */}
        <BreadcrumbNavigation />

        {/* Dashboard Content */}
        <main className="p-4 lg:p-6 space-y-6">
          {/* Page Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-text-primary">
                Admin Dashboard
              </h1>
              <p className="text-text-secondary mt-1">
                Welcome back, {currentUser.name}. Here's what's happening at your institution.
              </p>
            </div>
            
            {/* Refresh Indicator */}
            <div className="flex items-center space-x-3">
              {isLoading && (
                <div className="flex items-center space-x-2 text-text-secondary">
                  <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-sm">Updating...</span>
                </div>
              )}
              <div className="text-xs text-text-secondary">
                Last updated: {new Date().toLocaleTimeString()}
              </div>
            </div>
          </div>

          {/* KPI Cards */}
          <KPICards />

          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Charts Section - Takes 2 columns on XL screens */}
            <div className="xl:col-span-2 space-y-6">
              {/* Enrollment Trends Chart */}
              <div className="bg-surface rounded-xl shadow-soft border border-border p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 space-y-4 sm:space-y-0">
                  <div>
                    <h3 className="text-lg font-semibold text-text-primary">Enrollment Trends</h3>
                    <p className="text-sm text-text-secondary">Student enrollment over time</p>
                  </div>
                  
                  {/* Date Range Selector */}
                  <div className="flex items-center space-x-2">
                    <label className="text-sm text-text-secondary">Period:</label>
                    <select
                      value={selectedDateRange}
                      onChange={(e) => handleDateRangeChange(e.target.value)}
                      className="px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="7days">Last 7 days</option>
                      <option value="30days">Last 30 days</option>
                      <option value="6months">Last 6 months</option>
                      <option value="1year">Last year</option>
                    </select>
                  </div>
                </div>

                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={enrollmentTrendsData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                      <XAxis 
                        dataKey="month" 
                        stroke="#6B7280"
                        fontSize={12}
                      />
                      <YAxis 
                        stroke="#6B7280"
                        fontSize={12}
                      />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: '#FFFFFF',
                          border: '1px solid #E5E7EB',
                          borderRadius: '8px',
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                        }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="students" 
                        stroke="#1E40AF" 
                        strokeWidth={3}
                        dot={{ fill: '#1E40AF', strokeWidth: 2, r: 4 }}
                        name="Total Students"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="newEnrollments" 
                        stroke="#10B981" 
                        strokeWidth={2}
                        dot={{ fill: '#10B981', strokeWidth: 2, r: 3 }}
                        name="New Enrollments"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Department Distribution */}
              <div className="bg-surface rounded-xl shadow-soft border border-border p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 space-y-4 sm:space-y-0">
                  <div>
                    <h3 className="text-lg font-semibold text-text-primary">Department Distribution</h3>
                    <p className="text-sm text-text-secondary">Students by department</p>
                  </div>
                  
                  {/* Department Filter */}
                  <div className="flex items-center space-x-2">
                    <label className="text-sm text-text-secondary">Filter:</label>
                    <select
                      value={selectedDepartment}
                      onChange={(e) => handleDepartmentFilter(e.target.value)}
                      className="px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="all">All Departments</option>
                      <option value="cs">Computer Science</option>
                      <option value="eng">Engineering</option>
                      <option value="bus">Business</option>
                      <option value="arts">Arts & Sciences</option>
                      <option value="med">Medicine</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Pie Chart */}
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={departmentData}
                          cx="50%"
                          cy="50%"
                          innerRadius={40}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {departmentData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip 
                          contentStyle={{
                            backgroundColor: '#FFFFFF',
                            border: '1px solid #E5E7EB',
                            borderRadius: '8px'
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Legend */}
                  <div className="space-y-3">
                    {departmentData.map((dept, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div 
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: dept.color }}
                          ></div>
                          <span className="text-sm font-medium text-text-primary">
                            {dept.name}
                          </span>
                        </div>
                        <span className="text-sm font-semibold text-text-primary">
                          {dept.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Sidebar - Takes 1 column on XL screens */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <QuickActions />

              {/* Recent Activity */}
              <RecentActivity />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;