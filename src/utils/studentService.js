// src/utils/studentService.js
import supabase from './supabase';

class StudentService {
  // Get all students with profile and department info
  async getStudents(options = {}) {
    try {
      let query = supabase
        .from('students')
        .select(`
          *,
          user_profiles!students_user_id_fkey(
            id,
            email,
            full_name,
            phone,
            profile_photo
          ),
          departments!students_department_id_fkey(
            id,
            name,
            code
          )
        `);

      // Apply filters
      if (options?.status) {
        query = query.eq('status', options.status);
      }
      
      if (options?.department) {
        query = query.eq('departments.name', options.department);
      }
      
      if (options?.year) {
        query = query.eq('year', options.year);
      }

      // Apply search
      if (options?.search) {
        query = query.or(
          `student_id.ilike.%${options.search}%,` +
          `user_profiles.full_name.ilike.%${options.search}%,` +
          `user_profiles.email.ilike.%${options.search}%`
        );
      }

      // Apply sorting
      if (options?.sortBy && options?.sortOrder) {
        const column = options.sortBy === 'name' ? 'user_profiles.full_name' : options.sortBy;
        query = query.order(column, { ascending: options.sortOrder === 'asc' });
      } else {
        query = query.order('created_at', { ascending: false });
      }

      // Apply pagination
      if (options?.page && options?.pageSize) {
        const from = (options.page - 1) * options.pageSize;
        const to = from + options.pageSize - 1;
        query = query.range(from, to);
      }

      const { data, error, count } = await query;
      
      if (error) {
        return { success: false, error: error.message };
      }
      
      return { success: true, data, count };
    } catch (error) {
      console.log('Get students error:', error);
      return { success: false, error: 'Failed to fetch students' };
    }
  }

  // Get student by ID
  async getStudentById(studentId) {
    try {
      const { data, error } = await supabase
        .from('students')
        .select(`
          *,
          user_profiles!students_user_id_fkey(
            id,
            email,
            full_name,
            phone,
            profile_photo,
            role
          ),
          departments!students_department_id_fkey(
            id,
            name,
            code,
            description
          )
        `)
        .eq('id', studentId)
        .single();
      
      if (error) {
        return { success: false, error: error.message };
      }
      
      return { success: true, data };
    } catch (error) {
      console.log('Get student by ID error:', error);
      return { success: false, error: 'Failed to fetch student details' };
    }
  }

  // Create new student
  async createStudent(studentData) {
    try {
      // First create user profile if needed
      let userId = studentData?.user_id;
      
      if (!userId && studentData?.email) {
        const { data: authData, error: authError } = await supabase.auth.signUp({
          email: studentData.email,
          password: studentData?.password || 'temporary123',
          options: {
            data: {
              full_name: studentData?.full_name || studentData?.name,
              role: 'student'
            }
          }
        });
        
        if (authError) {
          return { success: false, error: authError.message };
        }
        
        userId = authData?.user?.id;
      }

      const { data, error } = await supabase
        .from('students')
        .insert({
          user_id: userId,
          student_id: studentData?.student_id,
          department_id: studentData?.department_id,
          enrollment_date: studentData?.enrollment_date,
          status: studentData?.status || 'Active',
          year: studentData?.year,
          gpa: studentData?.gpa || 0.00,
          address: studentData?.address,
          date_of_birth: studentData?.date_of_birth,
          guardian_name: studentData?.guardian_name,
          guardian_phone: studentData?.guardian_phone,
          guardian_email: studentData?.guardian_email,
          emergency_contact: studentData?.emergency_contact,
          medical_info: studentData?.medical_info,
          notes: studentData?.notes
        })
        .select()
        .single();
      
      if (error) {
        return { success: false, error: error.message };
      }
      
      return { success: true, data };
    } catch (error) {
      console.log('Create student error:', error);
      return { success: false, error: 'Failed to create student' };
    }
  }

  // Update student
  async updateStudent(studentId, updates) {
    try {
      const { data, error } = await supabase
        .from('students')
        .update(updates)
        .eq('id', studentId)
        .select()
        .single();
      
      if (error) {
        return { success: false, error: error.message };
      }
      
      return { success: true, data };
    } catch (error) {
      console.log('Update student error:', error);
      return { success: false, error: 'Failed to update student' };
    }
  }

  // Delete student
  async deleteStudent(studentId) {
    try {
      const { error } = await supabase
        .from('students')
        .delete()
        .eq('id', studentId);
      
      if (error) {
        return { success: false, error: error.message };
      }
      
      return { success: true };
    } catch (error) {
      console.log('Delete student error:', error);
      return { success: false, error: 'Failed to delete student' };
    }
  }

  // Bulk update students
  async bulkUpdateStudents(studentIds, updates) {
    try {
      const { data, error } = await supabase
        .from('students')
        .update(updates)
        .in('id', studentIds)
        .select();
      
      if (error) {
        return { success: false, error: error.message };
      }
      
      return { success: true, data };
    } catch (error) {
      console.log('Bulk update students error:', error);
      return { success: false, error: 'Failed to update students' };
    }
  }

  // Bulk delete students
  async bulkDeleteStudents(studentIds) {
    try {
      const { error } = await supabase
        .from('students')
        .delete()
        .in('id', studentIds);
      
      if (error) {
        return { success: false, error: error.message };
      }
      
      return { success: true };
    } catch (error) {
      console.log('Bulk delete students error:', error);
      return { success: false, error: 'Failed to delete students' };
    }
  }

  // Get departments
  async getDepartments() {
    try {
      const { data, error } = await supabase
        .from('departments')
        .select('*')
        .order('name');
      
      if (error) {
        return { success: false, error: error.message };
      }
      
      return { success: true, data };
    } catch (error) {
      console.log('Get departments error:', error);
      return { success: false, error: 'Failed to fetch departments' };
    }
  }

  // Get academic records for student
  async getAcademicRecords(studentId) {
    try {
      const { data, error } = await supabase
        .from('academic_records')
        .select('*')
        .eq('student_id', studentId)
        .order('year', { ascending: false })
        .order('semester');
      
      if (error) {
        return { success: false, error: error.message };
      }
      
      return { success: true, data };
    } catch (error) {
      console.log('Get academic records error:', error);
      return { success: false, error: 'Failed to fetch academic records' };
    }
  }

  // Get student documents
  async getStudentDocuments(studentId) {
    try {
      const { data, error } = await supabase
        .from('student_documents')
        .select('*')
        .eq('student_id', studentId)
        .order('uploaded_at', { ascending: false });
      
      if (error) {
        return { success: false, error: error.message };
      }
      
      return { success: true, data };
    } catch (error) {
      console.log('Get student documents error:', error);
      return { success: false, error: 'Failed to fetch student documents' };
    }
  }

  // Get activity history
  async getActivityHistory(studentId) {
    try {
      const { data, error } = await supabase
        .from('activity_history')
        .select(`
          *,
          performed_by_profile:user_profiles!activity_history_performed_by_fkey(
            full_name,
            email
          )
        `)
        .eq('student_id', studentId)
        .order('created_at', { ascending: false });
      
      if (error) {
        return { success: false, error: error.message };
      }
      
      return { success: true, data };
    } catch (error) {
      console.log('Get activity history error:', error);
      return { success: false, error: 'Failed to fetch activity history' };
    }
  }

  // Add activity log
  async addActivityLog(studentId, activityType, description, metadata = {}) {
    try {
      const { data: currentUser } = await supabase.auth.getUser();
      
      const { data, error } = await supabase
        .from('activity_history')
        .insert({
          student_id: studentId,
          activity_type: activityType,
          description: description,
          performed_by: currentUser?.user?.id,
          metadata: metadata
        })
        .select()
        .single();
      
      if (error) {
        return { success: false, error: error.message };
      }
      
      return { success: true, data };
    } catch (error) {
      console.log('Add activity log error:', error);
      return { success: false, error: 'Failed to add activity log' };
    }
  }

  // Get student statistics
  async getStudentStatistics() {
    try {
      const { data, error } = await supabase
        .rpc('get_student_statistics');
      
      if (error) {
        // Fallback to manual calculation if RPC doesn't exist
        const [totalResult, activeResult, departmentResult] = await Promise.all([
          supabase.from('students').select('id', { count: 'exact', head: true }),
          supabase.from('students').select('id', { count: 'exact', head: true }).eq('status', 'Active'),
          supabase.from('students').select('department_id, departments!students_department_id_fkey(name)', { count: 'exact' })
        ]);
        
        return {
          success: true,
          data: {
            total_students: totalResult?.count || 0,
            active_students: activeResult?.count || 0,
            departments: departmentResult?.data || []
          }
        };
      }
      
      return { success: true, data };
    } catch (error) {
      console.log('Get student statistics error:', error);
      return { success: false, error: 'Failed to fetch student statistics' };
    }
  }
}

const studentService = new StudentService();
export default studentService;