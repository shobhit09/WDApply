-- Create updated_at function for triggers
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create profiles table if not exists
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  first_name TEXT,
  last_name TEXT,
  email TEXT,
  phone TEXT,
  address TEXT,
  city TEXT,
  state TEXT,
  zip TEXT,
  country TEXT,
  headline TEXT,
  summary TEXT,
  resume_url TEXT,
  linkedin_url TEXT,
  github_url TEXT,
  portfolio_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create work_history table if not exists
CREATE TABLE IF NOT EXISTS public.work_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  company TEXT NOT NULL,
  title TEXT NOT NULL,
  location TEXT,
  start_date DATE NOT NULL,
  end_date DATE,
  current_job BOOLEAN DEFAULT false,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create education table if not exists
CREATE TABLE IF NOT EXISTS public.education (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  institution TEXT NOT NULL,
  degree TEXT NOT NULL,
  field_of_study TEXT,
  start_date DATE,
  end_date DATE,
  current BOOLEAN DEFAULT false,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create certifications table if not exists
CREATE TABLE IF NOT EXISTS public.certifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  issuing_organization TEXT NOT NULL,
  issue_date DATE,
  expiration_date DATE,
  credential_id TEXT,
  credential_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create skills table if not exists
CREATE TABLE IF NOT EXISTS public.skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  proficiency TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create questions table if not exists
CREATE TABLE IF NOT EXISTS public.questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create applications table if not exists
CREATE TABLE IF NOT EXISTS public.applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  company TEXT NOT NULL,
  position TEXT NOT NULL,
  job_url TEXT,
  job_description TEXT,
  status TEXT DEFAULT 'pending',
  applied_date TIMESTAMP WITH TIME ZONE DEFAULT now(),
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create application_logs table if not exists
CREATE TABLE IF NOT EXISTS public.application_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id UUID REFERENCES public.applications(id) ON DELETE CASCADE,
  step TEXT NOT NULL,
  status TEXT NOT NULL,
  message TEXT,
  details JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Workday specific tables

-- Create workday_form_fields table if not exists
CREATE TABLE IF NOT EXISTS public.workday_form_fields (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  field_name TEXT NOT NULL,
  field_type TEXT NOT NULL,
  field_label TEXT NOT NULL,
  field_options JSONB,
  is_required BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create workday_company_configs table if not exists
CREATE TABLE IF NOT EXISTS public.workday_company_configs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name TEXT NOT NULL,
  company_domain TEXT NOT NULL,
  login_url TEXT,
  application_base_url TEXT,
  form_structure JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create workday_application_templates table if not exists
CREATE TABLE IF NOT EXISTS public.workday_application_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_config_id UUID REFERENCES public.workday_company_configs(id) ON DELETE CASCADE,
  template_name TEXT NOT NULL,
  template_fields JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create workday_session_data table if not exists
CREATE TABLE IF NOT EXISTS public.workday_session_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id UUID REFERENCES public.applications(id) ON DELETE CASCADE,
  session_token TEXT,
  cookies JSONB,
  form_state JSONB,
  last_page_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create triggers for updated_at timestamps
CREATE TRIGGER set_profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER set_work_history_updated_at
BEFORE UPDATE ON public.work_history
FOR EACH ROW
EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER set_education_updated_at
BEFORE UPDATE ON public.education
FOR EACH ROW
EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER set_certifications_updated_at
BEFORE UPDATE ON public.certifications
FOR EACH ROW
EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER set_skills_updated_at
BEFORE UPDATE ON public.skills
FOR EACH ROW
EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER set_questions_updated_at
BEFORE UPDATE ON public.questions
FOR EACH ROW
EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER set_applications_updated_at
BEFORE UPDATE ON public.applications
FOR EACH ROW
EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER set_application_logs_updated_at
BEFORE UPDATE ON public.application_logs
FOR EACH ROW
EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER set_workday_form_fields_updated_at
BEFORE UPDATE ON public.workday_form_fields
FOR EACH ROW
EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER set_workday_company_configs_updated_at
BEFORE UPDATE ON public.workday_company_configs
FOR EACH ROW
EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER set_workday_application_templates_updated_at
BEFORE UPDATE ON public.workday_application_templates
FOR EACH ROW
EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER set_workday_session_data_updated_at
BEFORE UPDATE ON public.workday_session_data
FOR EACH ROW
EXECUTE FUNCTION public.set_updated_at();

-- Create trigger to create a profile when a new user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email)
  VALUES (NEW.id, NEW.email);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Enable row level security for all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.work_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.education ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.application_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workday_form_fields ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workday_company_configs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workday_application_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workday_session_data ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
CREATE POLICY "Users can view their own profile"
ON public.profiles FOR SELECT
USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
CREATE POLICY "Users can update their own profile"
ON public.profiles FOR UPDATE
USING (auth.uid() = id);

-- Create policies for work_history
DROP POLICY IF EXISTS "Users can view their own work history" ON public.work_history;
CREATE POLICY "Users can view their own work history"
ON public.work_history FOR SELECT
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own work history" ON public.work_history;
CREATE POLICY "Users can insert their own work history"
ON public.work_history FOR INSERT
WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own work history" ON public.work_history;
CREATE POLICY "Users can update their own work history"
ON public.work_history FOR UPDATE
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their own work history" ON public.work_history;
CREATE POLICY "Users can delete their own work history"
ON public.work_history FOR DELETE
USING (auth.uid() = user_id);

-- Create policies for education
DROP POLICY IF EXISTS "Users can view their own education" ON public.education;
CREATE POLICY "Users can view their own education"
ON public.education FOR SELECT
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own education" ON public.education;
CREATE POLICY "Users can insert their own education"
ON public.education FOR INSERT
WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own education" ON public.education;
CREATE POLICY "Users can update their own education"
ON public.education FOR UPDATE
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their own education" ON public.education;
CREATE POLICY "Users can delete their own education"
ON public.education FOR DELETE
USING (auth.uid() = user_id);

-- Create policies for certifications
DROP POLICY IF EXISTS "Users can view their own certifications" ON public.certifications;
CREATE POLICY "Users can view their own certifications"
ON public.certifications FOR SELECT
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own certifications" ON public.certifications;
CREATE POLICY "Users can insert their own certifications"
ON public.certifications FOR INSERT
WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own certifications" ON public.certifications;
CREATE POLICY "Users can update their own certifications"
ON public.certifications FOR UPDATE
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their own certifications" ON public.certifications;
CREATE POLICY "Users can delete their own certifications"
ON public.certifications FOR DELETE
USING (auth.uid() = user_id);

-- Create policies for skills
DROP POLICY IF EXISTS "Users can view their own skills" ON public.skills;
CREATE POLICY "Users can view their own skills"
ON public.skills FOR SELECT
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own skills" ON public.skills;
CREATE POLICY "Users can insert their own skills"
ON public.skills FOR INSERT
WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own skills" ON public.skills;
CREATE POLICY "Users can update their own skills"
ON public.skills FOR UPDATE
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their own skills" ON public.skills;
CREATE POLICY "Users can delete their own skills"
ON public.skills FOR DELETE
USING (auth.uid() = user_id);

-- Create policies for questions
DROP POLICY IF EXISTS "Users can view their own questions" ON public.questions;
CREATE POLICY "Users can view their own questions"
ON public.questions FOR SELECT
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own questions" ON public.questions;
CREATE POLICY "Users can insert their own questions"
ON public.questions FOR INSERT
WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own questions" ON public.questions;
CREATE POLICY "Users can update their own questions"
ON public.questions FOR UPDATE
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their own questions" ON public.questions;
CREATE POLICY "Users can delete their own questions"
ON public.questions FOR DELETE
USING (auth.uid() = user_id);

-- Create policies for applications
DROP POLICY IF EXISTS "Users can view their own applications" ON public.applications;
CREATE POLICY "Users can view their own applications"
ON public.applications FOR SELECT
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own applications" ON public.applications;
CREATE POLICY "Users can insert their own applications"
ON public.applications FOR INSERT
WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own applications" ON public.applications;
CREATE POLICY "Users can update their own applications"
ON public.applications FOR UPDATE
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their own applications" ON public.applications;
CREATE POLICY "Users can delete their own applications"
ON public.applications FOR DELETE
USING (auth.uid() = user_id);

-- Create policies for application_logs
DROP POLICY IF EXISTS "Users can view their own application logs" ON public.application_logs;
CREATE POLICY "Users can view their own application logs"
ON public.application_logs FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.applications
    WHERE applications.id = application_logs.application_id
    AND applications.user_id = auth.uid()
  )
);

DROP POLICY IF EXISTS "Users can insert their own application logs" ON public.application_logs;
CREATE POLICY "Users can insert their own application logs"
ON public.application_logs FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.applications
    WHERE applications.id = application_logs.application_id
    AND applications.user_id = auth.uid()
  )
);

-- Enable realtime for all tables
alter publication supabase_realtime add table public.profiles;
alter publication supabase_realtime add table public.work_history;
alter publication supabase_realtime add table public.education;
alter publication supabase_realtime add table public.certifications;
alter publication supabase_realtime add table public.skills;
alter publication supabase_realtime add table public.questions;
alter publication supabase_realtime add table public.applications;
alter publication supabase_realtime add table public.application_logs;
alter publication supabase_realtime add table public.workday_form_fields;
alter publication supabase_realtime add table public.workday_company_configs;
alter publication supabase_realtime add table public.workday_application_templates;
alter publication supabase_realtime add table public.workday_session_data;