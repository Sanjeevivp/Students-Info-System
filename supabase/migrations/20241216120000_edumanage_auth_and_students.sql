-- supabase/migrations/20241216120000_edumanage_auth_and_students.sql
-- EduManage Pro - Authentication and Student Management Module

-- 1. Create Types
CREATE TYPE public.user_role AS ENUM ('admin', 'student', 'teacher');
CREATE TYPE public.student_status AS ENUM ('Active', 'Inactive', 'Graduated', 'Suspended');
CREATE TYPE public.department_type AS ENUM (
  'Computer Science',
  'Electrical Engineering', 
  'Biology',
  'Mechanical Engineering',
  'Mathematics',
  'Physics',
  'Chemistry',
  'Business Administration',
  'English Literature',
  'History'
);

-- 2. User Profiles Table (Critical intermediary for auth relationships)
CREATE TABLE public.user_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    role public.user_role DEFAULT 'student'::public.user_role,
    phone TEXT,
    profile_photo TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 3. Departments Table
CREATE TABLE public.departments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name public.department_type NOT NULL UNIQUE,
    code TEXT NOT NULL UNIQUE,
    description TEXT,
    head_of_department UUID REFERENCES public.user_profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 4. Students Table (Core entity for education management)
CREATE TABLE public.students (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    student_id TEXT NOT NULL UNIQUE,
    department_id UUID REFERENCES public.departments(id) ON DELETE SET NULL,
    enrollment_date DATE NOT NULL,
    graduation_date DATE,
    status public.student_status DEFAULT 'Active'::public.student_status,
    year TEXT NOT NULL,
    gpa DECIMAL(3,2) DEFAULT 0.00,
    address TEXT,
    date_of_birth DATE,
    guardian_name TEXT,
    guardian_phone TEXT,
    guardian_email TEXT,
    emergency_contact TEXT,
    medical_info TEXT,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 5. Academic Records Table
CREATE TABLE public.academic_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID REFERENCES public.students(id) ON DELETE CASCADE,
    semester TEXT NOT NULL,
    year TEXT NOT NULL,
    courses_enrolled INTEGER DEFAULT 0,
    courses_completed INTEGER DEFAULT 0,
    semester_gpa DECIMAL(3,2) DEFAULT 0.00,
    cumulative_gpa DECIMAL(3,2) DEFAULT 0.00,
    credits_earned INTEGER DEFAULT 0,
    total_credits INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 6. Student Documents Table
CREATE TABLE public.student_documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID REFERENCES public.students(id) ON DELETE CASCADE,
    document_name TEXT NOT NULL,
    document_type TEXT NOT NULL,
    file_url TEXT NOT NULL,
    file_size INTEGER,
    uploaded_by UUID REFERENCES public.user_profiles(id) ON DELETE SET NULL,
    uploaded_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 7. Activity History Table
CREATE TABLE public.activity_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID REFERENCES public.students(id) ON DELETE CASCADE,
    activity_type TEXT NOT NULL,
    description TEXT NOT NULL,
    performed_by UUID REFERENCES public.user_profiles(id) ON DELETE SET NULL,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 8. Essential Indexes
CREATE INDEX idx_user_profiles_email ON public.user_profiles(email);
CREATE INDEX idx_user_profiles_role ON public.user_profiles(role);
CREATE INDEX idx_students_user_id ON public.students(user_id);
CREATE INDEX idx_students_student_id ON public.students(student_id);
CREATE INDEX idx_students_department_id ON public.students(department_id);
CREATE INDEX idx_students_status ON public.students(status);
CREATE INDEX idx_students_year ON public.students(year);
CREATE INDEX idx_academic_records_student_id ON public.academic_records(student_id);
CREATE INDEX idx_student_documents_student_id ON public.student_documents(student_id);
CREATE INDEX idx_activity_history_student_id ON public.activity_history(student_id);

-- 9. Enable Row Level Security
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.academic_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_history ENABLE ROW LEVEL SECURITY;

-- 10. Helper Functions for RLS
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
SELECT EXISTS (
    SELECT 1 FROM public.user_profiles up
    WHERE up.id = auth.uid() AND up.role = 'admin'::public.user_role
)
$$;

CREATE OR REPLACE FUNCTION public.is_student_owner(student_uuid UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
SELECT EXISTS (
    SELECT 1 FROM public.students s
    WHERE s.id = student_uuid AND s.user_id = auth.uid()
)
$$;

CREATE OR REPLACE FUNCTION public.can_view_student(student_uuid UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
SELECT (
    public.is_admin() OR
    public.is_student_owner(student_uuid)
)
$$;

-- 11. RLS Policies
-- User Profiles Policies
CREATE POLICY "users_view_own_profile" ON public.user_profiles
FOR SELECT TO authenticated
USING (auth.uid() = id OR public.is_admin());

CREATE POLICY "users_update_own_profile" ON public.user_profiles
FOR UPDATE TO authenticated
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

CREATE POLICY "admins_manage_profiles" ON public.user_profiles
FOR ALL TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- Departments Policies
CREATE POLICY "everyone_view_departments" ON public.departments
FOR SELECT TO authenticated
USING (true);

CREATE POLICY "admins_manage_departments" ON public.departments
FOR ALL TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- Students Policies
CREATE POLICY "view_student_records" ON public.students
FOR SELECT TO authenticated
USING (public.can_view_student(id));

CREATE POLICY "admins_manage_students" ON public.students
FOR ALL TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- Academic Records Policies
CREATE POLICY "view_academic_records" ON public.academic_records
FOR SELECT TO authenticated
USING (public.can_view_student(student_id));

CREATE POLICY "admins_manage_academic_records" ON public.academic_records
FOR ALL TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- Student Documents Policies
CREATE POLICY "view_student_documents" ON public.student_documents
FOR SELECT TO authenticated
USING (public.can_view_student(student_id));

CREATE POLICY "admins_manage_documents" ON public.student_documents
FOR ALL TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- Activity History Policies
CREATE POLICY "view_activity_history" ON public.activity_history
FOR SELECT TO authenticated
USING (public.can_view_student(student_id));

CREATE POLICY "admins_manage_activity" ON public.activity_history
FOR ALL TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- 12. Functions for automatic profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
SECURITY DEFINER
LANGUAGE plpgsql
AS $$
BEGIN
  INSERT INTO public.user_profiles (id, email, full_name, role)
  VALUES (
    NEW.id, 
    NEW.email, 
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    COALESCE((NEW.raw_user_meta_data->>'role')::public.user_role, 'student'::public.user_role)
  );  
  RETURN NEW;
END;
$$;

-- 13. Trigger for new user creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 14. Function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$;

-- 15. Triggers for updated_at timestamps
CREATE TRIGGER update_user_profiles_updated_at
    BEFORE UPDATE ON public.user_profiles
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_students_updated_at
    BEFORE UPDATE ON public.students
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 16. Mock Data for Development
DO $$
DECLARE
    admin_user_id UUID := gen_random_uuid();
    student_user_id UUID := gen_random_uuid();
    student2_user_id UUID := gen_random_uuid();
    cs_dept_id UUID := gen_random_uuid();
    ee_dept_id UUID := gen_random_uuid();
    student1_id UUID := gen_random_uuid();
    student2_id UUID := gen_random_uuid();
BEGIN
    -- Create auth users with complete required fields
    INSERT INTO auth.users (
        id, instance_id, aud, role, email, encrypted_password, email_confirmed_at,
        created_at, updated_at, raw_user_meta_data, raw_app_meta_data,
        is_sso_user, is_anonymous, confirmation_token, confirmation_sent_at,
        recovery_token, recovery_sent_at, email_change_token_new, email_change,
        email_change_sent_at, email_change_token_current, email_change_confirm_status,
        reauthentication_token, reauthentication_sent_at, phone, phone_change,
        phone_change_token, phone_change_sent_at
    ) VALUES
        (admin_user_id, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
         'admin@edumanage.edu', crypt('admin123', gen_salt('bf', 10)), now(), now(), now(),
         '{"full_name": "Admin User", "role": "admin"}'::jsonb, '{"provider": "email", "providers": ["email"]}'::jsonb,
         false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null),
        (student_user_id, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
         'student@edumanage.edu', crypt('student123', gen_salt('bf', 10)), now(), now(), now(),
         '{"full_name": "Alice Johnson", "role": "student"}'::jsonb, '{"provider": "email", "providers": ["email"]}'::jsonb,
         false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null),
        (student2_user_id, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
         'michael.chen@student.edu', crypt('student123', gen_salt('bf', 10)), now(), now(), now(),
         '{"full_name": "Michael Chen", "role": "student"}'::jsonb, '{"provider": "email", "providers": ["email"]}'::jsonb,
         false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null);

    -- Create departments
    INSERT INTO public.departments (id, name, code, description)
    VALUES
        (cs_dept_id, 'Computer Science'::public.department_type, 'CS', 'Department of Computer Science and Information Technology'),
        (ee_dept_id, 'Electrical Engineering'::public.department_type, 'EE', 'Department of Electrical and Electronics Engineering');

    -- Create students
    INSERT INTO public.students (id, user_id, student_id, department_id, enrollment_date, status, year, gpa, address, date_of_birth, guardian_name, guardian_phone)
    VALUES
        (student1_id, student_user_id, 'CS2024001', cs_dept_id, '2024-01-15', 'Active'::public.student_status, '2024', 3.85, '123 Campus Drive, University City', '2002-03-15', 'Robert Johnson', '+1-555-0123'),
        (student2_id, student2_user_id, 'EE2024002', ee_dept_id, '2024-01-20', 'Active'::public.student_status, '2024', 3.92, '456 Tech Boulevard, Innovation District', '2001-07-22', 'Linda Chen', '+1-555-0124');

    -- Create academic records
    INSERT INTO public.academic_records (student_id, semester, year, courses_enrolled, courses_completed, semester_gpa, cumulative_gpa, credits_earned, total_credits)
    VALUES
        (student1_id, 'Fall', '2024', 6, 6, 3.85, 3.85, 18, 18),
        (student2_id, 'Fall', '2024', 6, 6, 3.92, 3.92, 18, 18);

    -- Create activity history
    INSERT INTO public.activity_history (student_id, activity_type, description, performed_by)
    VALUES
        (student1_id, 'Enrollment', 'Student enrolled in Computer Science program', admin_user_id),
        (student2_id, 'Enrollment', 'Student enrolled in Electrical Engineering program', admin_user_id),
        (student1_id, 'Grade Update', 'Semester GPA updated to 3.85', admin_user_id),
        (student2_id, 'Grade Update', 'Semester GPA updated to 3.92', admin_user_id);

EXCEPTION
    WHEN foreign_key_violation THEN
        RAISE NOTICE 'Foreign key error during mock data creation: %', SQLERRM;
    WHEN unique_violation THEN
        RAISE NOTICE 'Unique constraint error during mock data creation: %', SQLERRM;
    WHEN OTHERS THEN
        RAISE NOTICE 'Unexpected error during mock data creation: %', SQLERRM;
END $$;

-- 17. Cleanup function for development
CREATE OR REPLACE FUNCTION public.cleanup_test_data()
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    auth_user_ids_to_delete UUID[];
BEGIN
    -- Get auth user IDs for test data
    SELECT ARRAY_AGG(id) INTO auth_user_ids_to_delete
    FROM auth.users
    WHERE email IN ('admin@edumanage.edu', 'student@edumanage.edu', 'michael.chen@student.edu');

    -- Delete in dependency order
    DELETE FROM public.activity_history WHERE student_id IN (
        SELECT id FROM public.students WHERE user_id = ANY(auth_user_ids_to_delete)
    );
    DELETE FROM public.academic_records WHERE student_id IN (
        SELECT id FROM public.students WHERE user_id = ANY(auth_user_ids_to_delete)
    );
    DELETE FROM public.student_documents WHERE student_id IN (
        SELECT id FROM public.students WHERE user_id = ANY(auth_user_ids_to_delete)
    );
    DELETE FROM public.students WHERE user_id = ANY(auth_user_ids_to_delete);
    DELETE FROM public.user_profiles WHERE id = ANY(auth_user_ids_to_delete);
    DELETE FROM auth.users WHERE id = ANY(auth_user_ids_to_delete);

EXCEPTION
    WHEN foreign_key_violation THEN
        RAISE NOTICE 'Foreign key constraint prevents deletion: %', SQLERRM;
    WHEN OTHERS THEN
        RAISE NOTICE 'Cleanup failed: %', SQLERRM;
END;
$$;