import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const AcademicRecordsTab = ({ academicRecords }) => {
  const [expandedSemester, setExpandedSemester] = useState(academicRecords[0]?.semester);

  const calculateSemesterGPA = (courses) => {
    const totalPoints = courses.reduce((sum, course) => sum + (course.gpa * course.credits), 0);
    const totalCredits = courses.reduce((sum, course) => sum + course.credits, 0);
    return totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : '0.00';
  };

  const getGradeColor = (grade) => {
    const gradeMap = {
      'A': 'text-success bg-success-50',
      'A-': 'text-success bg-success-50',
      'B+': 'text-accent-600 bg-accent-50',
      'B': 'text-accent-600 bg-accent-50',
      'B-': 'text-accent-600 bg-accent-50',
      'C+': 'text-warning bg-warning-50',
      'C': 'text-warning bg-warning-50',
      'C-': 'text-warning bg-warning-50',
      'D': 'text-error bg-error-50',
      'F': 'text-error bg-error-50'
    };
    return gradeMap[grade] || 'text-text-secondary bg-background';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-text-primary">Academic Records</h3>
        <button className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-smooth">
          <Icon name="Download" size={16} />
          <span>Export Transcript</span>
        </button>
      </div>

      {/* Overall Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-background rounded-lg p-4 border border-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-success-100 rounded-lg flex items-center justify-center">
              <Icon name="TrendingUp" size={20} className="text-success" />
            </div>
            <div>
              <p className="text-sm text-text-secondary">Cumulative GPA</p>
              <p className="text-xl font-semibold text-text-primary">3.85</p>
            </div>
          </div>
        </div>
        
        <div className="bg-background rounded-lg p-4 border border-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
              <Icon name="BookOpen" size={20} className="text-primary" />
            </div>
            <div>
              <p className="text-sm text-text-secondary">Total Credits</p>
              <p className="text-xl font-semibold text-text-primary">75</p>
            </div>
          </div>
        </div>
        
        <div className="bg-background rounded-lg p-4 border border-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-accent-100 rounded-lg flex items-center justify-center">
              <Icon name="Calendar" size={20} className="text-accent-600" />
            </div>
            <div>
              <p className="text-sm text-text-secondary">Semesters</p>
              <p className="text-xl font-semibold text-text-primary">{academicRecords.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-background rounded-lg p-4 border border-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-secondary-100 rounded-lg flex items-center justify-center">
              <Icon name="Award" size={20} className="text-secondary" />
            </div>
            <div>
              <p className="text-sm text-text-secondary">Class Rank</p>
              <p className="text-xl font-semibold text-text-primary">15/120</p>
            </div>
          </div>
        </div>
      </div>

      {/* Semester Records */}
      <div className="space-y-4">
        <h4 className="text-md font-semibold text-text-primary">Semester Records</h4>
        
        {academicRecords.map((semester, index) => (
          <div key={index} className="border border-border rounded-lg overflow-hidden">
            <button
              onClick={() => setExpandedSemester(expandedSemester === semester.semester ? null : semester.semester)}
              className="w-full flex items-center justify-between p-4 bg-background hover:bg-primary-50 transition-smooth"
            >
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                  <Icon name="Calendar" size={16} className="text-primary" />
                </div>
                <div className="text-left">
                  <h5 className="font-semibold text-text-primary">{semester.semester}</h5>
                  <p className="text-sm text-text-secondary">
                    {semester.courses.length} courses • GPA: {calculateSemesterGPA(semester.courses)}
                  </p>
                </div>
              </div>
              <Icon 
                name="ChevronDown" 
                size={20} 
                className={`text-text-secondary transition-transform duration-200 ${
                  expandedSemester === semester.semester ? 'rotate-180' : ''
                }`}
              />
            </button>
            
            {expandedSemester === semester.semester && (
              <div className="border-t border-border">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-background">
                      <tr>
                        <th className="text-left px-4 py-3 text-sm font-medium text-text-secondary">Course Code</th>
                        <th className="text-left px-4 py-3 text-sm font-medium text-text-secondary">Course Name</th>
                        <th className="text-center px-4 py-3 text-sm font-medium text-text-secondary">Credits</th>
                        <th className="text-center px-4 py-3 text-sm font-medium text-text-secondary">Grade</th>
                        <th className="text-center px-4 py-3 text-sm font-medium text-text-secondary">GPA Points</th>
                      </tr>
                    </thead>
                    <tbody>
                      {semester.courses.map((course, courseIndex) => (
                        <tr key={courseIndex} className="border-t border-border hover:bg-primary-50 transition-smooth">
                          <td className="px-4 py-3 text-sm font-medium text-text-primary">{course.code}</td>
                          <td className="px-4 py-3 text-sm text-text-primary">{course.name}</td>
                          <td className="px-4 py-3 text-sm text-center text-text-primary">{course.credits}</td>
                          <td className="px-4 py-3 text-center">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getGradeColor(course.grade)}`}>
                              {course.grade}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm text-center text-text-primary">{course.gpa.toFixed(1)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                {/* Semester Summary */}
                <div className="bg-background border-t border-border p-4">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-text-secondary">Semester Summary:</span>
                    <div className="flex space-x-6">
                      <span className="text-text-primary">
                        Total Credits: <strong>{semester.courses.reduce((sum, course) => sum + course.credits, 0)}</strong>
                      </span>
                      <span className="text-text-primary">
                        Semester GPA: <strong>{calculateSemesterGPA(semester.courses)}</strong>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Academic Progress Chart Placeholder */}
      <div className="bg-background rounded-lg p-6 border border-border">
        <h4 className="text-md font-semibold text-text-primary mb-4">GPA Trend</h4>
        <div className="h-64 flex items-center justify-center text-text-secondary">
          <div className="text-center">
            <Icon name="BarChart3" size={48} className="mx-auto mb-2 opacity-50" />
            <p>GPA trend chart would be displayed here</p>
            <p className="text-sm">Integration with charting library required</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcademicRecordsTab;