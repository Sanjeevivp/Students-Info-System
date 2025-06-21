import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import GlobalHeader from 'components/ui/GlobalHeader';
import AdminSidebar from 'components/ui/AdminSidebar';
import BreadcrumbNavigation from 'components/ui/BreadcrumbNavigation';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';
import PersonalInfoTab from './components/PersonalInfoTab';
import AcademicRecordsTab from './components/AcademicRecordsTab';
import DocumentsTab from './components/DocumentsTab';
import ActivityHistoryTab from './components/ActivityHistoryTab';

const StudentProfileDetail = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  
  // Mock user data
  const currentUser = {
    id: 1,
    name: "Admin User",
    email: "admin@edumanage.com",
    role: "admin"
  };

  // State management
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [saveStatus, setSaveStatus] = useState('saved'); // 'saving', 'saved', 'error'

  // Mock student data
  const [studentData, setStudentData] = useState({
    id: "STU001",
    firstName: "Sarah",
    lastName: "Johnson",
    email: "sarah.johnson@student.edu",
    phone: "+1 (555) 123-4567",
    dateOfBirth: "1998-03-15",
    gender: "Female",
    address: "123 Main Street, Apt 4B",
    city: "New York",
    state: "NY",
    zipCode: "10001",
    country: "United States",
    profilePhoto: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
    emergencyContact: {
      name: "Michael Johnson",
      relationship: "Father",
      phone: "+1 (555) 987-6543",
      email: "michael.johnson@email.com"
    },
    enrollment: {
      studentId: "STU001",
      program: "Computer Science",
      year: "Junior",
      semester: "Fall 2024",
      enrollmentDate: "2022-08-15",
      expectedGraduation: "2026-05-15",
      status: "Active",
      gpa: 3.85,
      totalCredits: 90,
      completedCredits: 75
    },
    academicRecords: [
      {
        semester: "Fall 2024",
        courses: [
          { code: "CS301", name: "Data Structures", credits: 3, grade: "A", gpa: 4.0 },
          { code: "CS302", name: "Algorithms", credits: 3, grade: "A-", gpa: 3.7 },
          { code: "MATH201", name: "Calculus II", credits: 4, grade: "B+", gpa: 3.3 },
          { code: "ENG102", name: "Technical Writing", credits: 3, grade: "A", gpa: 4.0 }
        ]
      },
      {
        semester: "Spring 2024",
        courses: [
          { code: "CS201", name: "Programming Fundamentals", credits: 3, grade: "A", gpa: 4.0 },
          { code: "CS202", name: "Object-Oriented Programming", credits: 3, grade: "A-", gpa: 3.7 },
          { code: "MATH101", name: "Calculus I", credits: 4, grade: "B+", gpa: 3.3 },
          { code: "PHY101", name: "Physics I", credits: 4, grade: "B", gpa: 3.0 }
        ]
      }
    ],
    documents: [
      { id: 1, name: "Transcript.pdf", type: "Academic", uploadDate: "2024-01-15", size: "2.3 MB" },
      { id: 2, name: "ID_Copy.pdf", type: "Identity", uploadDate: "2024-01-10", size: "1.1 MB" },
      { id: 3, name: "Medical_Records.pdf", type: "Medical", uploadDate: "2024-01-08", size: "3.2 MB" },
      { id: 4, name: "Financial_Aid.pdf", type: "Financial", uploadDate: "2024-01-05", size: "1.8 MB" }
    ],
    activityHistory: [
      { id: 1, action: "Profile Updated", details: "Contact information modified", timestamp: "2024-01-20 14:30", user: "Sarah Johnson" },
      { id: 2, action: "Grade Posted", details: "CS301 - Data Structures: A", timestamp: "2024-01-18 09:15", user: "Prof. Smith" },
      { id: 3, action: "Document Uploaded", details: "Transcript.pdf added", timestamp: "2024-01-15 16:45", user: "Sarah Johnson" },
      { id: 4, action: "Enrollment Confirmed", details: "Fall 2024 semester", timestamp: "2024-01-10 11:20", user: "Admin User" },
      { id: 5, action: "Profile Created", details: "Student account established", timestamp: "2022-08-15 10:00", user: "Admin User" }
    ]
  });

  const tabs = [
    { id: 'personal', label: 'Personal Information', icon: 'User' },
    { id: 'academic', label: 'Academic Records', icon: 'BookOpen' },
    { id: 'documents', label: 'Documents', icon: 'FileText' },
    { id: 'activity', label: 'Activity History', icon: 'Clock' }
  ];

  const handleLogout = () => {
    navigate('/login-screen');
  };

  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setStudentData(prev => ({
          ...prev,
          profilePhoto: e.target.result
        }));
        setSaveStatus('saving');
        setTimeout(() => setSaveStatus('saved'), 1000);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteStudent = () => {
    setShowDeleteDialog(false);
    navigate('/student-management');
  };

  const handlePrintProfile = () => {
    window.print();
  };

  const handleExportData = () => {
    const dataStr = JSON.stringify(studentData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${studentData.firstName}_${studentData.lastName}_profile.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const customBreadcrumbs = [
    { label: 'Dashboard', path: '/admin-dashboard', icon: 'Home' },
    { label: 'Students', path: '/student-management', icon: 'Users' },
    { label: `${studentData.firstName} ${studentData.lastName}`, path: '/student-profile-detail', icon: 'UserCheck', isLast: true }
  ];

  return (
    <div className="min-h-screen bg-background">
      <GlobalHeader 
        user={currentUser}
        onLogout={handleLogout}
        onMenuToggle={() => setMobileSidebarOpen(!mobileSidebarOpen)}
        isMobile={true}
      />

      <AdminSidebar
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        isMobile={true}
        isOpen={mobileSidebarOpen}
        onClose={() => setMobileSidebarOpen(false)}
      />

      <div className={`transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'}`}>
        <div className="pt-16">
          <BreadcrumbNavigation customBreadcrumbs={customBreadcrumbs} />
          
          <div className="p-4 lg:p-6">
            {/* Header Section */}
            <div className="bg-surface rounded-xl shadow-soft border border-border p-6 mb-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                    <Icon name="UserCheck" size={24} className="text-primary" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-semibold text-text-primary">
                      {studentData.firstName} {studentData.lastName}
                    </h1>
                    <p className="text-text-secondary">Student ID: {studentData.id}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        studentData.enrollment.status === 'Active' ?'bg-success-100 text-success' :'bg-error-100 text-error'
                      }`}>
                        {studentData.enrollment.status}
                      </span>
                      {saveStatus === 'saving' && (
                        <span className="flex items-center space-x-1 text-xs text-accent-600">
                          <Icon name="Loader2" size={12} className="animate-spin" />
                          <span>Saving...</span>
                        </span>
                      )}
                      {saveStatus === 'saved' && (
                        <span className="flex items-center space-x-1 text-xs text-success">
                          <Icon name="Check" size={12} />
                          <span>Saved</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setIsEditMode(!isEditMode)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-smooth ${
                      isEditMode 
                        ? 'bg-accent text-white hover:bg-accent-600' :'bg-primary text-white hover:bg-primary-700'
                    }`}
                  >
                    <Icon name={isEditMode ? "Save" : "Edit"} size={16} />
                    <span>{isEditMode ? 'Save Changes' : 'Edit Mode'}</span>
                  </button>
                  
                  <button
                    onClick={handlePrintProfile}
                    className="flex items-center space-x-2 px-4 py-2 bg-surface text-text-primary border border-border rounded-lg hover:bg-background transition-smooth"
                  >
                    <Icon name="Printer" size={16} />
                    <span className="hidden sm:inline">Print Profile</span>
                  </button>
                  
                  <button
                    onClick={handleExportData}
                    className="flex items-center space-x-2 px-4 py-2 bg-surface text-text-primary border border-border rounded-lg hover:bg-background transition-smooth"
                  >
                    <Icon name="Download" size={16} />
                    <span className="hidden sm:inline">Export Data</span>
                  </button>
                  
                  <button
                    onClick={() => setShowDeleteDialog(true)}
                    className="flex items-center space-x-2 px-4 py-2 bg-error text-white rounded-lg hover:bg-red-600 transition-smooth"
                  >
                    <Icon name="Trash2" size={16} />
                    <span className="hidden sm:inline">Delete</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column - Profile Photo & Summary */}
              <div className="lg:col-span-4 space-y-6">
                {/* Profile Photo */}
                <div className="bg-surface rounded-xl shadow-soft border border-border p-6">
                  <h3 className="text-lg font-semibold text-text-primary mb-4">Profile Photo</h3>
                  <div className="text-center">
                    <div className="relative inline-block">
                      <div className="w-32 h-32 rounded-full overflow-hidden bg-primary-100 mx-auto">
                        <Image
                          src={studentData.profilePhoto}
                          alt={`${studentData.firstName} ${studentData.lastName}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {isEditMode && (
                        <button
                          onClick={() => fileInputRef.current?.click()}
                          className="absolute bottom-0 right-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center hover:bg-primary-700 transition-smooth"
                        >
                          <Icon name="Camera" size={16} />
                        </button>
                      )}
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                    />
                    {isEditMode && (
                      <p className="text-xs text-text-secondary mt-2">
                        Click camera icon to change photo
                      </p>
                    )}
                  </div>
                </div>

                {/* Contact Information */}
                <div className="bg-surface rounded-xl shadow-soft border border-border p-6">
                  <h3 className="text-lg font-semibold text-text-primary mb-4">Contact Information</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Icon name="Mail" size={16} className="text-text-secondary" />
                      <span className="text-sm text-text-primary">{studentData.email}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Icon name="Phone" size={16} className="text-text-secondary" />
                      <span className="text-sm text-text-primary">{studentData.phone}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Icon name="MapPin" size={16} className="text-text-secondary" />
                      <span className="text-sm text-text-primary">
                        {studentData.city}, {studentData.state}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Enrollment Summary */}
                <div className="bg-surface rounded-xl shadow-soft border border-border p-6">
                  <h3 className="text-lg font-semibold text-text-primary mb-4">Enrollment Summary</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-text-secondary">Program</span>
                      <span className="text-sm font-medium text-text-primary">{studentData.enrollment.program}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-text-secondary">Year</span>
                      <span className="text-sm font-medium text-text-primary">{studentData.enrollment.year}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-text-secondary">GPA</span>
                      <span className="text-sm font-medium text-success">{studentData.enrollment.gpa}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-text-secondary">Credits</span>
                      <span className="text-sm font-medium text-text-primary">
                        {studentData.enrollment.completedCredits}/{studentData.enrollment.totalCredits}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Tabbed Content */}
              <div className="lg:col-span-8">
                <div className="bg-surface rounded-xl shadow-soft border border-border overflow-hidden">
                  {/* Tab Headers */}
                  <div className="border-b border-border">
                    <div className="flex overflow-x-auto">
                      {tabs.map((tab) => (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-smooth ${
                            activeTab === tab.id
                              ? 'text-primary border-primary bg-primary-50' :'text-text-secondary border-transparent hover:text-text-primary hover:bg-background'
                          }`}
                        >
                          <Icon name={tab.icon} size={16} />
                          <span>{tab.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Tab Content */}
                  <div className="p-6">
                    {activeTab === 'personal' && (
                      <PersonalInfoTab 
                        studentData={studentData}
                        setStudentData={setStudentData}
                        isEditMode={isEditMode}
                        setSaveStatus={setSaveStatus}
                      />
                    )}
                    {activeTab === 'academic' && (
                      <AcademicRecordsTab academicRecords={studentData.academicRecords} />
                    )}
                    {activeTab === 'documents' && (
                      <DocumentsTab documents={studentData.documents} />
                    )}
                    {activeTab === 'activity' && (
                      <ActivityHistoryTab activityHistory={studentData.activityHistory} />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      {showDeleteDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-1100 p-4">
          <div className="bg-surface rounded-xl shadow-elevated max-w-md w-full p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-error-100 rounded-full flex items-center justify-center">
                <Icon name="AlertTriangle" size={20} className="text-error" />
              </div>
              <h3 className="text-lg font-semibold text-text-primary">Delete Student</h3>
            </div>
            <p className="text-text-secondary mb-6">
              Are you sure you want to delete {studentData.firstName} {studentData.lastName}'s profile? 
              This action cannot be undone and will permanently remove all student data.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowDeleteDialog(false)}
                className="flex-1 px-4 py-2 bg-surface text-text-primary border border-border rounded-lg hover:bg-background transition-smooth"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteStudent}
                className="flex-1 px-4 py-2 bg-error text-white rounded-lg hover:bg-red-600 transition-smooth"
              >
                Delete Student
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentProfileDetail;