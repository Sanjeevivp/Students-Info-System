// src/pages/student-management/index.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import studentService from '../../utils/studentService';
import GlobalHeader from 'components/ui/GlobalHeader';
import AdminSidebar from 'components/ui/AdminSidebar';
import BreadcrumbNavigation from 'components/ui/BreadcrumbNavigation';
import Icon from 'components/AppIcon';

import StudentTable from './components/StudentTable';
import FilterPanel from './components/FilterPanel';
import BulkActionsToolbar from './components/BulkActionsToolbar';
import AddStudentModal from './components/AddStudentModal';
import AdvancedSearchModal from './components/AdvancedSearchModal';
import ExportModal from './components/ExportModal';

const StudentManagement = () => {
  const navigate = useNavigate();
  const { user, userProfile, signOut } = useAuth();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [activeFilters, setActiveFilters] = useState({});
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [departments, setDepartments] = useState([]);

  // Load initial data
  useEffect(() => {
    let isMounted = true;
    
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Load students and departments
        const [studentsResult, departmentsResult] = await Promise.all([
          studentService.getStudents(),
          studentService.getDepartments()
        ]);
        
        if (studentsResult?.success && isMounted) {
          const formattedStudents = studentsResult.data?.map(student => ({
            id: student?.id,
            name: student?.user_profiles?.full_name || 'Unknown',
            email: student?.user_profiles?.email || '',
            studentId: student?.student_id || '',
            department: student?.departments?.name || 'No Department',
            enrollmentDate: student?.enrollment_date || '',
            status: student?.status || 'Unknown',
            year: student?.year || '',
            gpa: student?.gpa || 0,
            phone: student?.user_profiles?.phone || '',
            address: student?.address || '',
            profilePhoto: student?.user_profiles?.profile_photo || '',
            dateOfBirth: student?.date_of_birth || '',
            guardian: student?.guardian_name || ''
          })) || [];
          
          setStudents(formattedStudents);
          setFilteredStudents(formattedStudents);
        } else if (isMounted) {
          setError(studentsResult?.error || 'Failed to load students');
        }
        
        if (departmentsResult?.success && isMounted) {
          setDepartments(departmentsResult.data || []);
        }
      } catch (err) {
        if (isMounted) {
          setError('Failed to load data');
          console.log('Load data error:', err);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };
    
    loadData();
    
    return () => {
      isMounted = false;
    };
  }, []);

  // Filter and search logic
  useEffect(() => {
    let filtered = [...students];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(student =>
        student?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student?.studentId?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student?.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student?.department?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply active filters
    Object.entries(activeFilters).forEach(([key, value]) => {
      if (value && value.length > 0) {
        filtered = filtered.filter(student => {
          if (key === 'department') {
            return value.includes(student?.department);
          }
          if (key === 'status') {
            return value.includes(student?.status);
          }
          if (key === 'year') {
            return value.includes(student?.year);
          }
          return true;
        });
      }
    });

    // Apply sorting
    if (sortConfig.key) {
      filtered.sort((a, b) => {
        const aValue = a?.[sortConfig.key] || '';
        const bValue = b?.[sortConfig.key] || '';
        
        if (aValue < bValue) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    setFilteredStudents(filtered);
  }, [students, searchQuery, activeFilters, sortConfig]);

  const handleLogout = async () => {
    await signOut();
    navigate('/login-screen');
  };

  const handleStudentSelect = (studentId, isSelected) => {
    if (isSelected) {
      setSelectedStudents(prev => [...prev, studentId]);
    } else {
      setSelectedStudents(prev => prev.filter(id => id !== studentId));
    }
  };

  const handleSelectAll = (isSelected) => {
    if (isSelected) {
      const currentPageStudents = getCurrentPageStudents().map(student => student?.id);
      setSelectedStudents(prev => [...new Set([...prev, ...currentPageStudents])]);
    } else {
      const currentPageStudents = getCurrentPageStudents().map(student => student?.id);
      setSelectedStudents(prev => prev.filter(id => !currentPageStudents.includes(id)));
    }
  };

  const getCurrentPageStudents = () => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return filteredStudents.slice(startIndex, endIndex);
  };

  const totalPages = Math.ceil(filteredStudents.length / pageSize);

  const handleFilterChange = (filterType, values) => {
    setActiveFilters(prev => ({
      ...prev,
      [filterType]: values
    }));
    setCurrentPage(1);
  };

  const handleRemoveFilter = (filterType, value) => {
    setActiveFilters(prev => ({
      ...prev,
      [filterType]: prev[filterType]?.filter(v => v !== value) || []
    }));
  };

  const handleClearAllFilters = () => {
    setActiveFilters({});
    setSearchQuery('');
    setCurrentPage(1);
  };

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleViewStudent = (studentId) => {
    navigate(`/student-profile-detail?id=${studentId}`);
  };

  const handleEditStudent = async (studentId) => {
    // In a real app, this would open an edit modal or navigate to edit page
    console.log('Edit student:', studentId);
  };

  const handleDeleteStudent = async (studentId) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        const result = await studentService.deleteStudent(studentId);
        if (result?.success) {
          setStudents(prev => prev.filter(student => student?.id !== studentId));
          setSelectedStudents(prev => prev.filter(id => id !== studentId));
          
          // Add activity log
          await studentService.addActivityLog(
            studentId,
            'Student Deletion',
            'Student record was deleted from the system'
          );
        } else {
          setError(result?.error || 'Failed to delete student');
        }
      } catch (err) {
        setError('Failed to delete student');
        console.log('Delete student error:', err);
      }
    }
  };

  const handleBulkDelete = async () => {
    if (window.confirm(`Are you sure you want to delete ${selectedStudents.length} selected students?`)) {
      try {
        const result = await studentService.bulkDeleteStudents(selectedStudents);
        if (result?.success) {
          setStudents(prev => prev.filter(student => !selectedStudents.includes(student?.id)));
          setSelectedStudents([]);
        } else {
          setError(result?.error || 'Failed to delete students');
        }
      } catch (err) {
        setError('Failed to delete students');
        console.log('Bulk delete error:', err);
      }
    }
  };

  const handleBulkStatusUpdate = async (newStatus) => {
    try {
      const result = await studentService.bulkUpdateStudents(selectedStudents, { status: newStatus });
      if (result?.success) {
        setStudents(prev => prev.map(student => 
          selectedStudents.includes(student?.id) 
            ? { ...student, status: newStatus }
            : student
        ));
        setSelectedStudents([]);
      } else {
        setError(result?.error || 'Failed to update students');
      }
    } catch (err) {
      setError('Failed to update students');
      console.log('Bulk status update error:', err);
    }
  };

  const handleAddStudent = async (newStudentData) => {
    try {
      const result = await studentService.createStudent(newStudentData);
      if (result?.success) {
        // Reload students to get the formatted data
        const studentsResult = await studentService.getStudents();
        if (studentsResult?.success) {
          const formattedStudents = studentsResult.data?.map(student => ({
            id: student?.id,
            name: student?.user_profiles?.full_name || 'Unknown',
            email: student?.user_profiles?.email || '',
            studentId: student?.student_id || '',
            department: student?.departments?.name || 'No Department',
            enrollmentDate: student?.enrollment_date || '',
            status: student?.status || 'Unknown',
            year: student?.year || '',
            gpa: student?.gpa || 0,
            phone: student?.user_profiles?.phone || '',
            address: student?.address || '',
            profilePhoto: student?.user_profiles?.profile_photo || '',
            dateOfBirth: student?.date_of_birth || '',
            guardian: student?.guardian_name || ''
          })) || [];
          
          setStudents(formattedStudents);
        }
        setShowAddModal(false);
      } else {
        setError(result?.error || 'Failed to add student');
      }
    } catch (err) {
      setError('Failed to add student');
      console.log('Add student error:', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-text-secondary">Loading students...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Error Display */}
      {error && (
        <div className="fixed top-4 right-4 bg-error text-white p-4 rounded-lg shadow-lg z-50">
          <div className="flex items-center space-x-2">
            <Icon name="AlertCircle" size={16} />
            <span>{error}</span>
            <button onClick={() => setError(null)} className="ml-2">
              <Icon name="X" size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Global Header */}
      <GlobalHeader
        user={{
          name: userProfile?.full_name || user?.email || 'User',
          email: user?.email || '',
          role: userProfile?.role || 'admin'
        }}
        onLogout={handleLogout}
        onMenuToggle={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
        isMobile={true}
      />

      {/* Admin Sidebar */}
      <AdminSidebar
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        isMobile={false}
      />

      {/* Mobile Sidebar */}
      <AdminSidebar
        isMobile={true}
        isOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main Content */}
      <div className={`
        pt-16 transition-all duration-300
        ${isSidebarCollapsed ? 'lg:pl-16' : 'lg:pl-64'}
      `}>
        {/* Breadcrumb Navigation */}
        <BreadcrumbNavigation />

        {/* Page Content */}
        <div className="p-4 lg:p-6 space-y-6">
          {/* Page Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div>
              <h1 className="text-2xl font-semibold text-text-primary">Student Management</h1>
              <p className="text-text-secondary mt-1">
                Manage and organize student records efficiently
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowAddModal(true)}
                className="bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-smooth flex items-center space-x-2"
              >
                <Icon name="Plus" size={16} />
                <span>Add Student</span>
              </button>
              <button
                onClick={() => setShowExportModal(true)}
                className="bg-surface text-text-primary px-4 py-2 rounded-lg font-medium border border-border hover:bg-background transition-smooth flex items-center space-x-2"
              >
                <Icon name="Download" size={16} />
                <span className="hidden sm:inline">Export</span>
              </button>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="bg-surface rounded-xl shadow-soft border border-border p-6 space-y-4">
            {/* Search Bar */}
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
              <div className="flex-1 relative">
                <Icon name="Search" size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" />
                <input
                  type="text"
                  placeholder="Search students by name, ID, email, or department..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-smooth"
                />
              </div>
              <button
                onClick={() => setShowAdvancedSearch(true)}
                className="bg-background text-text-primary px-4 py-3 rounded-lg font-medium border border-border hover:bg-primary-50 transition-smooth flex items-center space-x-2"
              >
                <Icon name="Filter" size={16} />
                <span>Advanced Search</span>
              </button>
            </div>

            {/* Filter Panel */}
            <FilterPanel
              activeFilters={activeFilters}
              onFilterChange={handleFilterChange}
              onRemoveFilter={handleRemoveFilter}
              onClearAll={handleClearAllFilters}
              departments={departments}
            />
          </div>

          {/* Bulk Actions Toolbar */}
          {selectedStudents.length > 0 && (
            <BulkActionsToolbar
              selectedCount={selectedStudents.length}
              onBulkDelete={handleBulkDelete}
              onBulkStatusUpdate={handleBulkStatusUpdate}
              onExport={() => setShowExportModal(true)}
            />
          )}

          {/* Students Table */}
          <div className="bg-surface rounded-xl shadow-soft border border-border overflow-hidden">
            <StudentTable
              students={getCurrentPageStudents()}
              selectedStudents={selectedStudents}
              sortConfig={sortConfig}
              onStudentSelect={handleStudentSelect}
              onSelectAll={handleSelectAll}
              onSort={handleSort}
              onView={handleViewStudent}
              onEdit={handleEditStudent}
              onDelete={handleDeleteStudent}
              totalStudents={filteredStudents.length}
            />

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="px-6 py-4 border-t border-border">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-text-secondary">Show</span>
                    <select
                      value={pageSize}
                      onChange={(e) => {
                        setPageSize(Number(e.target.value));
                        setCurrentPage(1);
                      }}
                      className="border border-border rounded px-2 py-1 text-sm"
                    >
                      <option value={10}>10</option>
                      <option value={25}>25</option>
                      <option value={50}>50</option>
                    </select>
                    <span className="text-sm text-text-secondary">
                      of {filteredStudents.length} students
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="p-2 rounded-lg border border-border hover:bg-background disabled:opacity-50 disabled:cursor-not-allowed transition-smooth"
                    >
                      <Icon name="ChevronLeft" size={16} />
                    </button>
                    
                    <div className="flex items-center space-x-1">
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        let pageNum;
                        if (totalPages <= 5) {
                          pageNum = i + 1;
                        } else if (currentPage <= 3) {
                          pageNum = i + 1;
                        } else if (currentPage >= totalPages - 2) {
                          pageNum = totalPages - 4 + i;
                        } else {
                          pageNum = currentPage - 2 + i;
                        }
                        
                        return (
                          <button
                            key={pageNum}
                            onClick={() => setCurrentPage(pageNum)}
                            className={`
                              px-3 py-1 rounded text-sm font-medium transition-smooth
                              ${currentPage === pageNum
                                ? 'bg-primary text-white' :'text-text-secondary hover:bg-background'
                              }
                            `}
                          >
                            {pageNum}
                          </button>
                        );
                      })}
                    </div>

                    <button
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="p-2 rounded-lg border border-border hover:bg-background disabled:opacity-50 disabled:cursor-not-allowed transition-smooth"
                    >
                      <Icon name="ChevronRight" size={16} />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      {showAddModal && (
        <AddStudentModal
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddStudent}
          departments={departments}
        />
      )}

      {showAdvancedSearch && (
        <AdvancedSearchModal
          onClose={() => setShowAdvancedSearch(false)}
          onSearch={(searchCriteria) => {
            // Apply advanced search logic
            setShowAdvancedSearch(false);
          }}
          departments={departments}
        />
      )}

      {showExportModal && (
        <ExportModal
          onClose={() => setShowExportModal(false)}
          selectedStudents={selectedStudents}
          allStudents={filteredStudents}
          onExport={(format, scope) => {
            // Handle export logic
            console.log('Export:', format, scope);
            setShowExportModal(false);
          }}
        />
      )}
    </div>
  );
};

export default StudentManagement;