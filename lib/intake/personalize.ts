import type {
  AiEmployeeRole,
  DashboardMetric,
  FirstFocus,
  IntakeResponse,
  PeakTime,
  VoiceOwner,
} from "./types";

export const FOCUS_LABEL: Record<FirstFocus, string> = {
  ops: "Operations & inbox",
  voice: "Voice & content",
  client: "Client work",
  sales: "Sales & leads",
};

export const VOICE_OWNER_LABEL: Record<VoiceOwner, string> = {
  mine: "Personal brand",
  company: "Company brand",
  both: "Personal + company",
};

export const AI_ROLE_LABEL: Record<AiEmployeeRole, string> = {
  inbox_triage: "Inbox Triage",
  lead_qualifier: "Lead Qualifier",
  content_reviewer: "Content Reviewer",
  custom: "Custom role",
};

export const DASHBOARD_METRIC_LABEL: Record<DashboardMetric, string> = {
  revenue: "Revenue this month",
  leads: "New leads",
  time_per_workflow: "Time per workflow",
  active_clients: "Active clients",
  content_engagement: "Content engagement",
  custom: "Custom metric",
};

export const PEAK_TIME_LABEL: Record<PeakTime, string> = {
  morning: "Morning (6–10 AM)",
  mid_morning: "Mid-morning (10 AM–1 PM)",
  afternoon: "Afternoon (1–5 PM)",
  evening: "Evening (5–9 PM)",
  late_night: "Late night (9 PM+)",
};

export const PEAK_TIME_HOUR: Record<PeakTime, number> = {
  morning: 7,
  mid_morning: 11,
  afternoon: 14,
  evening: 19,
  late_night: 22,
};

export function projectNames(intake: IntakeResponse) {
  const focus = intake.first_focus ?? "ops";
  const voiceOwner = intake.voice_owner ?? "mine";
  const focusedTag =
    focus === "ops" ? " (focus)" : focus === "client" ? " (focus)" : "";
  return {
    ops: `Your Ops Project${focus === "ops" ? " (focus)" : ""}`,
    voice: `Your Voice & Brand Project · ${VOICE_OWNER_LABEL[voiceOwner]}${focus === "voice" ? " (focus)" : ""}`,
    client: `Your Client Hub${focusedTag}`,
  };
}

export function aiEmployeeLabel(intake: IntakeResponse): string {
  if (!intake.ai_employee_role) return "Your AI employee";
  if (intake.ai_employee_role === "custom") {
    return intake.ai_employee_custom?.trim() || "Custom AI employee";
  }
  return AI_ROLE_LABEL[intake.ai_employee_role];
}

export function dashboardMetricLabel(intake: IntakeResponse): string {
  const picks = intake.dashboard_metrics ?? [];
  if (picks.length === 0) return "Your daily metric";
  const labels = picks.map((m) =>
    m === "custom"
      ? intake.dashboard_custom?.trim() || "Custom metric"
      : DASHBOARD_METRIC_LABEL[m],
  );
  return labels.join(" · ");
}

export function osLabel(intake: IntakeResponse): "mac" | "windows" {
  return intake.os === "windows" ? "windows" : "mac";
}

export function timezoneShort(intake: IntakeResponse): string {
  const tz = intake.timezone;
  if (!tz) return "your timezone";
  // Use abbreviation if available, otherwise the IANA name
  try {
    const short = new Intl.DateTimeFormat("en-US", {
      timeZone: tz,
      timeZoneName: "short",
    })
      .formatToParts(new Date())
      .find((p) => p.type === "timeZoneName")?.value;
    return short ?? tz;
  } catch {
    return tz;
  }
}

export function morningMoment(intake: IntakeResponse): {
  local: string;
  est: string;
  hourLocal: number;
  label: string;
} {
  const peak = intake.peak_time ?? "morning";
  const hourLocal = PEAK_TIME_HOUR[peak];
  const tzShort = timezoneShort(intake);
  const local = `${formatHour(hourLocal)} ${tzShort}`;
  const estHour = convertHourLocalToEst(hourLocal, intake.timezone);
  const est = `${formatHour(estHour)} EST`;
  return {
    local,
    est,
    hourLocal,
    label: peak === "morning" ? "morning ritual" : `${PEAK_TIME_LABEL[peak].split(" (")[0].toLowerCase()} ritual`,
  };
}

function formatHour(h24: number): string {
  const h = ((h24 % 24) + 24) % 24;
  const period = h < 12 ? "AM" : "PM";
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${hour12}:00 ${period}`;
}

function convertHourLocalToEst(hourLocal: number, tz: string | null | undefined): number {
  if (!tz) return hourLocal;
  try {
    // Build a date at hourLocal in tz, read it back as EST hour
    const now = new Date();
    const isoDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}T${String(hourLocal).padStart(2, "0")}:00:00`;
    // Compute UTC offset for tz at this moment
    const tzOffsetMin = getTzOffsetMinutes(tz, now);
    const estOffsetMin = getTzOffsetMinutes("America/New_York", now);
    const localAsUtc = new Date(isoDate + "Z").getTime() - tzOffsetMin * 60_000;
    const estDate = new Date(localAsUtc + estOffsetMin * 60_000);
    return estDate.getUTCHours();
  } catch {
    return hourLocal;
  }
}

function getTzOffsetMinutes(tz: string, at: Date): number {
  // Returns offset in minutes from UTC for the given tz at the given moment.
  // Positive means east of UTC.
  const dtf = new Intl.DateTimeFormat("en-US", {
    timeZone: tz,
    hour12: false,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  const parts = dtf.formatToParts(at);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "00";
  const asUtc = Date.UTC(
    Number(get("year")),
    Number(get("month")) - 1,
    Number(get("day")),
    Number(get("hour")),
    Number(get("minute")),
    Number(get("second")),
  );
  return Math.round((asUtc - at.getTime()) / 60_000);
}
