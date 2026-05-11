export type FirstFocus = "ops" | "voice" | "client" | "sales";
export type VoiceOwner = "mine" | "company" | "both";
export type AiEmployeeRole =
  | "inbox_triage"
  | "lead_qualifier"
  | "content_reviewer"
  | "custom";
export type DashboardMetric =
  | "revenue"
  | "leads"
  | "time_per_workflow"
  | "active_clients"
  | "content_engagement"
  | "custom";
export type OsChoice = "mac" | "windows";
export type PeakTime =
  | "morning"
  | "mid_morning"
  | "afternoon"
  | "evening"
  | "late_night";

export interface IntakeResponse {
  id?: string;
  email: string;
  first_name: string;
  business_oneliner?: string | null;
  first_focus?: FirstFocus | null;
  voice_owner?: VoiceOwner | null;
  ai_employee_role?: AiEmployeeRole | null;
  ai_employee_custom?: string | null;
  dashboard_metrics?: DashboardMetric[] | null;
  dashboard_custom?: string | null;
  os?: OsChoice | null;
  timezone?: string | null;
  peak_time?: PeakTime | null;
  one_thing?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface IntakeDraft extends Partial<IntakeResponse> {
  email: string;
  first_name: string;
}
