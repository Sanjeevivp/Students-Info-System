import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GlobalHeader from 'components/ui/GlobalHeader';
import StudentNavigation from 'components/ui/StudentNavigation';
import BreadcrumbNavigation from 'components/ui/BreadcrumbNavigation';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Mock student data
  const currentUser = {
    id: "STU001",
    name: "Sarah Johnson",
    email: "sarah.johnson@university.edu",
    role: "student",
    profilePhoto: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
    studentId: "2024STU001",
    program: "Computer Science",
    year: "3rd Year",
    semester: "Fall 2024",
    gpa: 3.85,
    enrollmentStatus: "Active",
    phone: "+1 (555) 123-4567",
    address: "123 University Ave, Campus City, ST 12345",
    emergencyContact: {
      name: "Michael Johnson",
      relationship: "Father",
      phone: "+1 (555) 987-6543"
    }
  };

  const quickStats = [
    {
      label: "Current GPA",
      value: "3.85",
      icon: "TrendingUp",
      color: "text-success",
      bgColor: "bg-success-50",
      iconColor: "text-success"
    },
    {
      label: "Enrolled Courses",
      value: "6",
      icon: "BookOpen",
      color: "text-primary",
      bgColor: "bg-primary-50",
      iconColor: "text-primary"
    },
    {
      label: "Completed Credits",
      value: "89",
      icon: "Award",
      color: "text-accent-600",
      bgColor: "bg-accent-50",
      iconColor: "text-accent-600"
    },
    {
      label: "Attendance",
      value: "94%",
      icon: "Calendar",
      color: "text-secondary",
      bgColor: "bg-secondary-50",
      iconColor: "text-secondary"
    }
  ];

  const recentAnnouncements = [
    {
      id: 1,
      title: "Mid-term Examination Schedule Released",
      content: "The mid-term examination schedule for Fall 2024 semester has been published. Please check your student portal for detailed timings and venue information.",
      date: "2024-03-15",
      priority: "high",
      category: "Academic"
    },
    {
      id: 2,
      title: "Library Extended Hours During Finals",
      content: "The university library will be open 24/7 during the final examination period from March 20-30, 2024.",
      date: "2024-03-12",
      priority: "medium",
      category: "Facility"
    },
    {
      id: 3,
      title: "Career Fair Registration Open",
      content: "Annual Career Fair registration is now open. Over 100 companies will be participating. Register by March 25th to secure your spot.",
      date: "2024-03-10",
      priority: "medium",
      category: "Career"
    }
  ];

  const upcomingDeadlines = [
    {
      id: 1,
      title: "Physics Lab Report",
      course: "PHY 301",
      dueDate: "2024-03-18",
      daysLeft: 3,
      type: "Assignment"
    },
    {
      id: 2,
      title: "Database Project Submission",
      course: "CS 401",
      dueDate: "2024-03-22",
      daysLeft: 7,
      type: "Project"
    },
    {
      id: 3,
      title: "Mathematics Quiz",
      course: "MATH 205",
      dueDate: "2024-03-20",
      daysLeft: 5,
      type: "Quiz"
    }
  ];

  const recentGrades = [
    {
      id: 1,
      course: "Data Structures",
      courseCode: "CS 301",
      assignment: "Assignment 3",
      grade: "A-",
      points: "92/100",
      date: "2024-03-10"
    },
    {
      id: 2,
      course: "Linear Algebra",
      courseCode: "MATH 205",
      assignment: "Midterm Exam",
      grade: "B+",
      points: "87/100",
      date: "2024-03-08"
    },
    {
      id: 3,
      course: "Physics Lab",
      courseCode: "PHY 301",
      assignment: "Lab Report 2",
      grade: "A",
      points: "95/100",
      date: "2024-03-05"
    }
  ];

  const handleLogout = () => {
    navigate('/login-screen');
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getDaysLeft = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'border-l-error bg-error-50';
      case 'medium':
        return 'border-l-accent-600 bg-accent-50';
      default:
        return 'border-l-primary bg-primary-50';
    }
  };

  const getGradeColor = (grade) => {
    if (grade.startsWith('A')) return 'text-success bg-success-100';
    if (grade.startsWith('B')) return 'text-primary bg-primary-100';
    if (grade.startsWith('C')) return 'text-accent-600 bg-accent-100';
    return 'text-text-secondary bg-background';
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Global Header */}
      <GlobalHeader
        user={currentUser}
        onLogout={handleLogout}
        onMenuToggle={handleMobileMenuToggle}
        isMobile={true}
      />

      {/* Main Content */}
      <main className="pt-16">
        {/* Breadcrumb Navigation */}
        <BreadcrumbNavigation />

        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6">
          {/* Welcome Section */}
          <div className="bg-gradient-to-r from-primary to-primary-600 rounded-xl p-6 mb-8 text-white">
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white border-opacity-30 flex-shrink-0">
                <Image
                  src={currentUser.profilePhoto}
                  alt={currentUser.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h1 className="text-2xl lg:text-3xl font-bold mb-2">
                  Welcome back, {currentUser.name}!
                </h1>
                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 space-y-1 sm:space-y-0 text-primary-100">
                  <span className="flex items-center space-x-2">
                    <Icon name="User" size={16} />
                    <span>{currentUser.studentId}</span>
                  </span>
                  <span className="flex items-center space-x-2">
                    <Icon name="BookOpen" size={16} />
                    <span>{currentUser.program}</span>
                  </span>
                  <span className="flex items-center space-x-2">
                    <Icon name="Calendar" size={16} />
                    <span>{currentUser.year} - {currentUser.semester}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {quickStats.map((stat, index) => (
              <div key={index} className="bg-surface rounded-xl p-4 border border-border shadow-soft">
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.bgColor}`}>
                    <Icon name={stat.icon} size={20} className={stat.iconColor} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-text-primary">{stat.value}</p>
                    <p className="text-sm text-text-secondary">{stat.label}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Student Navigation */}
            <div className="lg:col-span-2">
              <StudentNavigation user={currentUser} />
            </div>

            {/* Right Column - Quick Info */}
            <div className="space-y-6">
              {/* Upcoming Deadlines */}
              <div className="bg-surface rounded-xl p-6 border border-border shadow-soft">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-text-primary">Upcoming Deadlines</h3>
                  <Icon name="Clock" size={20} className="text-text-secondary" />
                </div>
                <div className="space-y-3">
                  {upcomingDeadlines.map((deadline) => (
                    <div key={deadline.id} className="p-3 bg-background rounded-lg border border-border">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <p className="font-medium text-text-primary text-sm">{deadline.title}</p>
                          <p className="text-xs text-text-secondary">{deadline.course}</p>
                        </div>
                        <span className={`
                          px-2 py-1 rounded-full text-xs font-medium
                          ${deadline.daysLeft <= 3 ? 'bg-error-100 text-error' :
                            deadline.daysLeft <= 7 ? 'bg-accent-100 text-accent-600': 'bg-success-100 text-success'}
                        `}>
                          {deadline.daysLeft}d left
                        </span>
                      </div>
                      <p className="text-xs text-text-secondary">Due: {formatDate(deadline.dueDate)}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Grades */}
              <div className="bg-surface rounded-xl p-6 border border-border shadow-soft">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-text-primary">Recent Grades</h3>
                  <Icon name="Award" size={20} className="text-text-secondary" />
                </div>
                <div className="space-y-3">
                  {recentGrades.map((grade) => (
                    <div key={grade.id} className="p-3 bg-background rounded-lg border border-border">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex-1">
                          <p className="font-medium text-text-primary text-sm">{grade.assignment}</p>
                          <p className="text-xs text-text-secondary">{grade.courseCode} - {grade.course}</p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getGradeColor(grade.grade)}`}>
                          {grade.grade}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs text-text-secondary">
                        <span>{grade.points}</span>
                        <span>{formatDate(grade.date)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Announcements */}
              <div className="bg-surface rounded-xl p-6 border border-border shadow-soft">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-text-primary">Announcements</h3>
                  <Icon name="Bell" size={20} className="text-text-secondary" />
                </div>
                <div className="space-y-3">
                  {recentAnnouncements.map((announcement) => (
                    <div key={announcement.id} className={`p-3 rounded-lg border-l-4 ${getPriorityColor(announcement.priority)}`}>
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-text-primary text-sm">{announcement.title}</h4>
                        <span className="px-2 py-1 bg-surface rounded-full text-xs font-medium text-text-secondary">
                          {announcement.category}
                        </span>
                      </div>
                      <p className="text-xs text-text-secondary mb-2 line-clamp-2">
                        {announcement.content}
                      </p>
                      <p className="text-xs text-text-secondary">{formatDate(announcement.date)}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;