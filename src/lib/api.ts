import { supabase } from "./supabaseClient";

// Profile API
export const getProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) throw error;
  return data;
};

export const updateProfile = async (userId: string, updates: any) => {
  const { data, error } = await supabase
    .from("profiles")
    .update(updates)
    .eq("id", userId);

  if (error) throw error;
  return data;
};

// Work History API
export const getWorkHistory = async (userId: string) => {
  const { data, error } = await supabase
    .from("work_history")
    .select("*")
    .eq("user_id", userId)
    .order("start_date", { ascending: false });

  if (error) throw error;
  return data;
};

export const addWorkHistory = async (userId: string, workHistory: any) => {
  const { data, error } = await supabase
    .from("work_history")
    .insert({ ...workHistory, user_id: userId })
    .select();

  if (error) throw error;
  return data;
};

export const updateWorkHistory = async (id: string, updates: any) => {
  const { data, error } = await supabase
    .from("work_history")
    .update(updates)
    .eq("id", id)
    .select();

  if (error) throw error;
  return data;
};

export const deleteWorkHistory = async (id: string) => {
  const { error } = await supabase.from("work_history").delete().eq("id", id);

  if (error) throw error;
};

// Education API
export const getEducation = async (userId: string) => {
  const { data, error } = await supabase
    .from("education")
    .select("*")
    .eq("user_id", userId)
    .order("start_date", { ascending: false });

  if (error) throw error;
  return data;
};

export const addEducation = async (userId: string, education: any) => {
  const { data, error } = await supabase
    .from("education")
    .insert({ ...education, user_id: userId })
    .select();

  if (error) throw error;
  return data;
};

export const updateEducation = async (id: string, updates: any) => {
  const { data, error } = await supabase
    .from("education")
    .update(updates)
    .eq("id", id)
    .select();

  if (error) throw error;
  return data;
};

export const deleteEducation = async (id: string) => {
  const { error } = await supabase.from("education").delete().eq("id", id);

  if (error) throw error;
};

// Certifications API
export const getCertifications = async (userId: string) => {
  const { data, error } = await supabase
    .from("certifications")
    .select("*")
    .eq("user_id", userId);

  if (error) throw error;
  return data;
};

export const addCertification = async (userId: string, certification: any) => {
  const { data, error } = await supabase
    .from("certifications")
    .insert({ ...certification, user_id: userId })
    .select();

  if (error) throw error;
  return data;
};

export const updateCertification = async (id: string, updates: any) => {
  const { data, error } = await supabase
    .from("certifications")
    .update(updates)
    .eq("id", id)
    .select();

  if (error) throw error;
  return data;
};

export const deleteCertification = async (id: string) => {
  const { error } = await supabase.from("certifications").delete().eq("id", id);

  if (error) throw error;
};

// Skills API
export const getSkills = async (userId: string) => {
  const { data, error } = await supabase
    .from("skills")
    .select("*")
    .eq("user_id", userId);

  if (error) throw error;
  return data;
};

export const addSkill = async (userId: string, skill: any) => {
  const { data, error } = await supabase
    .from("skills")
    .insert({ ...skill, user_id: userId })
    .select();

  if (error) throw error;
  return data;
};

export const updateSkill = async (id: string, updates: any) => {
  const { data, error } = await supabase
    .from("skills")
    .update(updates)
    .eq("id", id)
    .select();

  if (error) throw error;
  return data;
};

export const deleteSkill = async (id: string) => {
  const { error } = await supabase.from("skills").delete().eq("id", id);

  if (error) throw error;
};

// Questions API
export const getQuestions = async (userId: string) => {
  const { data, error } = await supabase
    .from("questions")
    .select("*")
    .eq("user_id", userId);

  if (error) throw error;
  return data;
};

export const addQuestion = async (userId: string, question: any) => {
  const { data, error } = await supabase
    .from("questions")
    .insert({ ...question, user_id: userId })
    .select();

  if (error) throw error;
  return data;
};

export const updateQuestion = async (id: string, updates: any) => {
  const { data, error } = await supabase
    .from("questions")
    .update(updates)
    .eq("id", id)
    .select();

  if (error) throw error;
  return data;
};

export const deleteQuestion = async (id: string) => {
  const { error } = await supabase.from("questions").delete().eq("id", id);

  if (error) throw error;
};

// Applications API
export const getApplications = async (userId: string) => {
  const { data, error } = await supabase
    .from("applications")
    .select("*")
    .eq("user_id", userId)
    .order("applied_date", { ascending: false });

  if (error) throw error;
  return data;
};

export const addApplication = async (userId: string, application: any) => {
  const { data, error } = await supabase
    .from("applications")
    .insert({ ...application, user_id: userId })
    .select();

  if (error) throw error;
  return data;
};

export const updateApplication = async (id: string, updates: any) => {
  const { data, error } = await supabase
    .from("applications")
    .update(updates)
    .eq("id", id)
    .select();

  if (error) throw error;
  return data;
};

export const deleteApplication = async (id: string) => {
  const { error } = await supabase.from("applications").delete().eq("id", id);

  if (error) throw error;
};

// Application Logs API
export const getApplicationLogs = async (applicationId: string) => {
  const { data, error } = await supabase
    .from("application_logs")
    .select("*")
    .eq("application_id", applicationId)
    .order("created_at", { ascending: true });

  if (error) throw error;
  return data;
};

export const addApplicationLog = async (applicationId: string, log: any) => {
  const { data, error } = await supabase
    .from("application_logs")
    .insert({ ...log, application_id: applicationId })
    .select();

  if (error) throw error;
  return data;
};

// Workday Form Fields API
export const getWorkdayFormFields = async () => {
  const { data, error } = await supabase
    .from("workday_form_fields")
    .select("*");

  if (error) throw error;
  return data;
};

export const addWorkdayFormField = async (formField: any) => {
  const { data, error } = await supabase
    .from("workday_form_fields")
    .insert(formField)
    .select();

  if (error) throw error;
  return data;
};

export const updateWorkdayFormField = async (id: string, updates: any) => {
  const { data, error } = await supabase
    .from("workday_form_fields")
    .update(updates)
    .eq("id", id)
    .select();

  if (error) throw error;
  return data;
};

export const deleteWorkdayFormField = async (id: string) => {
  const { error } = await supabase
    .from("workday_form_fields")
    .delete()
    .eq("id", id);

  if (error) throw error;
};

// Workday Company Configs API
export const getWorkdayCompanyConfigs = async () => {
  const { data, error } = await supabase
    .from("workday_company_configs")
    .select("*");

  if (error) throw error;
  return data;
};

export const getWorkdayCompanyConfigByDomain = async (domain: string) => {
  const { data, error } = await supabase
    .from("workday_company_configs")
    .select("*")
    .ilike("company_domain", `%${domain}%`)
    .single();

  if (error && error.code !== "PGRST116") throw error;
  return data;
};

export const addWorkdayCompanyConfig = async (config: any) => {
  const { data, error } = await supabase
    .from("workday_company_configs")
    .insert(config)
    .select();

  if (error) throw error;
  return data;
};

export const updateWorkdayCompanyConfig = async (id: string, updates: any) => {
  const { data, error } = await supabase
    .from("workday_company_configs")
    .update(updates)
    .eq("id", id)
    .select();

  if (error) throw error;
  return data;
};

export const deleteWorkdayCompanyConfig = async (id: string) => {
  const { error } = await supabase
    .from("workday_company_configs")
    .delete()
    .eq("id", id);

  if (error) throw error;
};

// Workday Application Templates API
export const getWorkdayApplicationTemplates = async (
  companyConfigId: string,
) => {
  const { data, error } = await supabase
    .from("workday_application_templates")
    .select("*")
    .eq("company_config_id", companyConfigId);

  if (error) throw error;
  return data;
};

export const addWorkdayApplicationTemplate = async (template: any) => {
  const { data, error } = await supabase
    .from("workday_application_templates")
    .insert(template)
    .select();

  if (error) throw error;
  return data;
};

export const updateWorkdayApplicationTemplate = async (
  id: string,
  updates: any,
) => {
  const { data, error } = await supabase
    .from("workday_application_templates")
    .update(updates)
    .eq("id", id)
    .select();

  if (error) throw error;
  return data;
};

export const deleteWorkdayApplicationTemplate = async (id: string) => {
  const { error } = await supabase
    .from("workday_application_templates")
    .delete()
    .eq("id", id);

  if (error) throw error;
};

// Workday Session Data API
export const getWorkdaySessionData = async (applicationId: string) => {
  const { data, error } = await supabase
    .from("workday_session_data")
    .select("*")
    .eq("application_id", applicationId)
    .single();

  if (error && error.code !== "PGRST116") throw error;
  return data;
};

export const addWorkdaySessionData = async (sessionData: any) => {
  const { data, error } = await supabase
    .from("workday_session_data")
    .insert(sessionData)
    .select();

  if (error) throw error;
  return data;
};

export const updateWorkdaySessionData = async (id: string, updates: any) => {
  const { data, error } = await supabase
    .from("workday_session_data")
    .update(updates)
    .eq("id", id)
    .select();

  if (error) throw error;
  return data;
};

export const deleteWorkdaySessionData = async (id: string) => {
  const { error } = await supabase
    .from("workday_session_data")
    .delete()
    .eq("id", id);

  if (error) throw error;
};
