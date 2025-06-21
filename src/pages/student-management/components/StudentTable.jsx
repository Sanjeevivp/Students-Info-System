import React from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const StudentTable = ({
  students,
  selectedStudents,
  sortConfig,
  onStudentSelect,
  onSelectAll,
  onSort,
  onView,
  onEdit,
  onDelete,
  totalStudents
}) => {
  const isAllSelected = students.length > 0 && students.every(student => selectedStudents.includes(student.id));
  const isIndeterminate = students.some(student => selectedStudents.includes(student.id)) && !isAllSelected;

  const getSortIcon = (columnKey) => {
    if (sortConfig.key !== columnKey) {
      return <Icon name="ArrowUpDown" size={14} className="text-text-secondary opacity-0 group-hover:opacity-100 transition-opacity" />;
    }
    return sortConfig.direction === 'asc' 
      ? <Icon name="ArrowUp" size={14} className="text-primary" />
      : <Icon name="ArrowDown" size={14} className="text-primary" />;
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      'Active': 'bg-success-100 text-success border-success-200',
      'Inactive': 'bg-error-100 text-error border-error-200',
      'Suspended': 'bg-warning-100 text-warning border-warning-200',
      'Graduated': 'bg-primary-100 text-primary border-primary-200'
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${statusConfig[status] || 'bg-gray-100 text-gray-600 border-gray-200'}`}>
        {status}
      </span>
    );
  };

  // Desktop Table View
  const DesktopTable = () => (
    <div className="hidden lg:block overflow-x-auto">
      <table className="w-full">
        <thead className="bg-background border-b border-border">
          <tr>
            <th className="px-6 py-4 text-left">
              <input
                type="checkbox"
                checked={isAllSelected}
                ref={input => {
                  if (input) input.indeterminate = isIndeterminate;
                }}
                onChange={(e) => onSelectAll(e.target.checked)}
                className="rounded border-border focus:ring-2 focus:ring-primary"
              />
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
              Student
            </th>
            {['name', 'studentId', 'department', 'enrollmentDate', 'status'].map((column) => (
              <th
                key={column}
                className="px-6 py-4 text-left text-xs font-medium text-text-secondary uppercase tracking-wider cursor-pointer group hover:bg-primary-50 transition-smooth"
                onClick={() => onSort(column)}
              >
                <div className="flex items-center space-x-1">
                  <span>
                    {column === 'studentId' ? 'Student ID' :
                     column === 'enrollmentDate' ? 'Enrollment Date' :
                     column.charAt(0).toUpperCase() + column.slice(1)}
                  </span>
                  {getSortIcon(column)}
                </div>
              </th>
            ))}
            <th className="px-6 py-4 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {students.map((student) => (
            <tr
              key={student.id}
              className="hover:bg-primary-50 transition-smooth"
            >
              <td className="px-6 py-4">
                <input
                  type="checkbox"
                  checked={selectedStudents.includes(student.id)}
                  onChange={(e) => onStudentSelect(student.id, e.target.checked)}
                  className="rounded border-border focus:ring-2 focus:ring-primary"
                />
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-primary-100 flex-shrink-0">
                    <Image
                      src={student.profilePhoto}
                      alt={student.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-text-primary">{student.name}</p>
                    <p className="text-xs text-text-secondary">{student.email}</p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 text-sm text-text-primary font-medium">
                {student.name}
              </td>
              <td className="px-6 py-4 text-sm text-text-secondary font-mono">
                {student.studentId}
              </td>
              <td className="px-6 py-4 text-sm text-text-primary">
                {student.department}
              </td>
              <td className="px-6 py-4 text-sm text-text-secondary">
                {new Date(student.enrollmentDate).toLocaleDateString()}
              </td>
              <td className="px-6 py-4">
                {getStatusBadge(student.status)}
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => onView(student.id)}
                    className="p-2 rounded-lg hover:bg-primary-100 text-primary transition-smooth"
                    title="View Details"
                  >
                    <Icon name="Eye" size={16} />
                  </button>
                  <button
                    onClick={() => onEdit(student.id)}
                    className="p-2 rounded-lg hover:bg-accent-100 text-accent-600 transition-smooth"
                    title="Edit Student"
                  >
                    <Icon name="Edit" size={16} />
                  </button>
                  <button
                    onClick={() => onDelete(student.id)}
                    className="p-2 rounded-lg hover:bg-error-100 text-error transition-smooth"
                    title="Delete Student"
                  >
                    <Icon name="Trash2" size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  // Mobile Card View
  const MobileCards = () => (
    <div className="lg:hidden space-y-4 p-4">
      {students.map((student) => (
        <div
          key={student.id}
          className="bg-background rounded-lg border border-border p-4 space-y-3"
        >
          {/* Card Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={selectedStudents.includes(student.id)}
                onChange={(e) => onStudentSelect(student.id, e.target.checked)}
                className="rounded border-border focus:ring-2 focus:ring-primary"
              />
              <div className="w-12 h-12 rounded-full overflow-hidden bg-primary-100 flex-shrink-0">
                <Image
                  src={student.profilePhoto}
                  alt={student.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-medium text-text-primary">{student.name}</h3>
                <p className="text-sm text-text-secondary font-mono">{student.studentId}</p>
              </div>
            </div>
            {getStatusBadge(student.status)}
          </div>

          {/* Card Details */}
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-text-secondary">Department</p>
              <p className="text-text-primary font-medium">{student.department}</p>
            </div>
            <div>
              <p className="text-text-secondary">Enrolled</p>
              <p className="text-text-primary font-medium">
                {new Date(student.enrollmentDate).toLocaleDateString()}
              </p>
            </div>
            <div className="col-span-2">
              <p className="text-text-secondary">Email</p>
              <p className="text-text-primary">{student.email}</p>
            </div>
          </div>

          {/* Card Actions */}
          <div className="flex items-center justify-end space-x-2 pt-2 border-t border-border">
            <button
              onClick={() => onView(student.id)}
              className="flex items-center space-x-1 px-3 py-2 text-sm text-primary hover:bg-primary-50 rounded-lg transition-smooth"
            >
              <Icon name="Eye" size={14} />
              <span>View</span>
            </button>
            <button
              onClick={() => onEdit(student.id)}
              className="flex items-center space-x-1 px-3 py-2 text-sm text-accent-600 hover:bg-accent-50 rounded-lg transition-smooth"
            >
              <Icon name="Edit" size={14} />
              <span>Edit</span>
            </button>
            <button
              onClick={() => onDelete(student.id)}
              className="flex items-center space-x-1 px-3 py-2 text-sm text-error hover:bg-error-50 rounded-lg transition-smooth"
            >
              <Icon name="Trash2" size={14} />
              <span>Delete</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  if (students.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 mx-auto bg-primary-100 rounded-full flex items-center justify-center mb-4">
          <Icon name="Users" size={24} className="text-primary" />
        </div>
        <h3 className="text-lg font-medium text-text-primary mb-2">No students found</h3>
        <p className="text-text-secondary">
          {totalStudents === 0 
            ? "No students have been added yet. Click 'Add Student' to get started." :"No students match your current search and filter criteria."
          }
        </p>
      </div>
    );
  }

  return (
    <>
      <DesktopTable />
      <MobileCards />
    </>
  );
};

export default StudentTable;