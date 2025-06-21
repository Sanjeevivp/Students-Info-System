import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const StudentNavigation = ({ user }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  const quickActions = [
    {
      label: 'View Grades',
      icon: 'Award',
      description: 'Check your academic performance',
      action: () => setActiveTab('grades'),
      color: 'bg-success-50 text-success border-success-100'
    },
    {
      label: 'Assignments',
      icon: 'FileText',
      description: 'View pending and completed tasks',
      action: () => setActiveTab('assignments'),
      color: 'bg-accent-50 text-accent-600 border-accent-100'
    },
    {
      label: 'Schedule',
      icon: 'Calendar',
      description: 'Your class timetable',
      action: () => setActiveTab('schedule'),
      color: 'bg-primary-50 text-primary border-primary-100'
    },
    {
      label: 'Messages',
      icon: 'MessageSquare',
      description: 'Communication with instructors',
      action: () => setActiveTab('messages'),
      color: 'bg-secondary-50 text-secondary border-secondary-100'
    }
  ];

  const profileTabs = [
    { id: 'overview', label: 'Overview', icon: 'User' },
    { id: 'grades', label: 'Grades', icon: 'Award' },
    { id: 'assignments', label: 'Assignments', icon: 'FileText' },
    { id: 'schedule', label: 'Schedule', icon: 'Calendar' },
    { id: 'messages', label: 'Messages', icon: 'MessageSquare' }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary to-primary-600 rounded-xl p-6 text-white">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            <Icon name="User" size={24} className="text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold">Welcome back, {user?.name || 'Student'}!</h1>
            <p className="text-primary-100 mt-1">Ready to continue your learning journey?</p>
          </div>
        </div>
      </div>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickActions.map((action, index) => (
          <button
            key={index}
            onClick={action.action}
            className={`
              p-4 rounded-xl border-2 text-left transition-all duration-200
              hover:shadow-soft hover:scale-105 active:scale-95
              ${action.color}
            `}
          >
            <div className="flex items-center space-x-3 mb-2">
              <Icon name={action.icon} size={20} />
              <h3 className="font-semibold">{action.label}</h3>
            </div>
            <p className="text-sm opacity-80">{action.description}</p>
          </button>
        ))}
      </div>

      {/* Navigation Tabs */}
      <div className="bg-surface rounded-xl shadow-soft border border-border overflow-hidden">
        {/* Tab Headers */}
        <div className="flex overflow-x-auto border-b border-border">
          {profileTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex items-center space-x-2 px-6 py-4 text-sm font-medium whitespace-nowrap
                transition-all duration-200 border-b-2
                ${activeTab === tab.id
                  ? 'text-primary border-primary bg-primary-50' :'text-text-secondary border-transparent hover:text-text-primary hover:bg-background'
                }
              `}
            >
              <Icon name={tab.icon} size={16} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-text-primary">Student Overview</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-background rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-success-100 rounded-lg flex items-center justify-center">
                      <Icon name="TrendingUp" size={20} className="text-success" />
                    </div>
                    <div>
                      <p className="text-sm text-text-secondary">Current GPA</p>
                      <p className="text-xl font-semibold text-text-primary">3.85</p>
                    </div>
                  </div>
                </div>
                <div className="bg-background rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-accent-100 rounded-lg flex items-center justify-center">
                      <Icon name="BookOpen" size={20} className="text-accent-600" />
                    </div>
                    <div>
                      <p className="text-sm text-text-secondary">Courses</p>
                      <p className="text-xl font-semibold text-text-primary">6</p>
                    </div>
                  </div>
                </div>
                <div className="bg-background rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                      <Icon name="Clock" size={20} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-text-secondary">Study Hours</p>
                      <p className="text-xl font-semibold text-text-primary">24.5</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'grades' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-text-primary">Academic Performance</h3>
              <div className="space-y-3">
                {['Mathematics', 'Physics', 'Chemistry', 'English'].map((subject, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-background rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Icon name="BookOpen" size={16} className="text-text-secondary" />
                      <span className="font-medium text-text-primary">{subject}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-text-secondary">Grade:</span>
                      <span className="font-semibold text-success">A-</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'assignments' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-text-primary">Assignments & Tasks</h3>
              <div className="space-y-3">
                {[
                  { title: 'Math Problem Set 5', due: '2 days', status: 'pending' },
                  { title: 'Physics Lab Report', due: '1 week', status: 'in-progress' },
                  { title: 'English Essay', due: 'Completed', status: 'completed' }
                ].map((assignment, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-background rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Icon name="FileText" size={16} className="text-text-secondary" />
                      <div>
                        <p className="font-medium text-text-primary">{assignment.title}</p>
                        <p className="text-sm text-text-secondary">Due: {assignment.due}</p>
                      </div>
                    </div>
                    <span className={`
                      px-2 py-1 rounded-full text-xs font-medium
                      ${assignment.status === 'completed' ? 'bg-success-100 text-success' :
                        assignment.status === 'in-progress'? 'bg-accent-100 text-accent-600' : 'bg-error-100 text-error'}
                    `}>
                      {assignment.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'schedule' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-text-primary">Class Schedule</h3>
              <div className="space-y-3">
                {[
                  { time: '09:00 AM', subject: 'Mathematics', room: 'Room 101' },
                  { time: '11:00 AM', subject: 'Physics', room: 'Lab 203' },
                  { time: '02:00 PM', subject: 'Chemistry', room: 'Lab 105' }
                ].map((class_, index) => (
                  <div key={index} className="flex items-center space-x-4 p-3 bg-background rounded-lg">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                      <Icon name="Clock" size={16} className="text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-text-primary">{class_.subject}</p>
                      <p className="text-sm text-text-secondary">{class_.time} • {class_.room}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'messages' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-text-primary">Recent Messages</h3>
              <div className="space-y-3">
                {[
                  { from: 'Prof. Johnson', subject: 'Assignment Feedback', time: '2 hours ago' },
                  { from: 'Academic Office', subject: 'Schedule Update', time: '1 day ago' },
                  { from: 'Library', subject: 'Book Return Reminder', time: '3 days ago' }
                ].map((message, index) => (
                  <div key={index} className="flex items-center space-x-4 p-3 bg-background rounded-lg hover:bg-primary-50 transition-smooth cursor-pointer">
                    <div className="w-10 h-10 bg-secondary-100 rounded-full flex items-center justify-center">
                      <Icon name="MessageSquare" size={16} className="text-secondary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-text-primary">{message.subject}</p>
                      <p className="text-sm text-text-secondary">From: {message.from} • {message.time}</p>
                    </div>
                    <Icon name="ChevronRight" size={16} className="text-text-secondary" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentNavigation;