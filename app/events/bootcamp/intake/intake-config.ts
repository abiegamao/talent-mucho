import type {
  AiEmployeeRole,
  DashboardMetric,
  FirstFocus,
  OsChoice,
  PeakTime,
  VoiceOwner,
} from "@/lib/intake/types";

export interface Option<T extends string = string> {
  value: T;
  label: string;
  hint?: string;
  icon?: string; // lucide icon name
}

export type QuestionType =
  | "text"
  | "longtext"
  | "email"
  | "cards"
  | "multi"
  | "toggle"
  | "tz_and_peak";

export interface BaseQuestion {
  id: string;
  type: QuestionType;
  label: string;
  why: string;
  required?: boolean;
  placeholder?: string;
  maxLength?: number;
  options?: Option[];
  multiMax?: number;
  customField?: string;
}

export interface Section {
  id: string;
  weekLabel: string | null;
  color: string;
  weekTitle: string | null;
  weekSubtitle: string | null;
  questions: BaseQuestion[];
  revealOnExit?: (answers: Record<string, unknown>) => string;
}

export const FIRST_FOCUS_OPTIONS: Option<FirstFocus>[] = [
  { value: "ops", label: "Operations & inbox", hint: "Email, scheduling, recurring admin", icon: "Inbox" },
  { value: "voice", label: "Voice & content", hint: "Writing in your tone, drafts, posts", icon: "PenLine" },
  { value: "client", label: "Client work", hint: "Onboarding, briefs, deliverables", icon: "Users" },
  { value: "sales", label: "Sales & leads", hint: "Discovery calls, follow-ups, proposals", icon: "Target" },
];

export const VOICE_OWNER_OPTIONS: Option<VoiceOwner>[] = [
  { value: "mine", label: "Mine", hint: "Personal brand", icon: "User" },
  { value: "company", label: "My company's", hint: "Brand voice, not me personally", icon: "Building2" },
  { value: "both", label: "Both", hint: "I write as me AND as the brand", icon: "Layers" },
];

export const AI_ROLE_OPTIONS: Option<AiEmployeeRole>[] = [
  { value: "inbox_triage", label: "Inbox Triage", hint: "Sorts, labels, and drafts replies", icon: "Mail" },
  { value: "lead_qualifier", label: "Lead Qualifier", hint: "Scores new leads, flags hot ones", icon: "Target" },
  { value: "content_reviewer", label: "Content Reviewer", hint: "Polishes drafts in your voice", icon: "PenLine" },
  { value: "custom", label: "Something custom", hint: "You'll describe it", icon: "Sparkles" },
];

export const DASHBOARD_METRIC_OPTIONS: Option<DashboardMetric>[] = [
  { value: "revenue", label: "Revenue this month", icon: "TrendingUp" },
  { value: "leads", label: "New leads", icon: "UserPlus" },
  { value: "time_per_workflow", label: "Time per workflow", icon: "Clock" },
  { value: "active_clients", label: "Active clients", icon: "Users" },
  { value: "content_engagement", label: "Content engagement", icon: "BarChart3" },
  { value: "custom", label: "Something custom", icon: "Sparkles" },
];

export const OS_OPTIONS: Option<OsChoice>[] = [
  { value: "mac", label: "Mac", icon: "Apple" },
  { value: "windows", label: "Windows", icon: "Monitor" },
];

export const PEAK_TIME_OPTIONS: Option<PeakTime>[] = [
  { value: "morning", label: "Morning", hint: "6–10 AM" },
  { value: "mid_morning", label: "Mid-morning", hint: "10 AM–1 PM" },
  { value: "afternoon", label: "Afternoon", hint: "1–5 PM" },
  { value: "evening", label: "Evening", hint: "5–9 PM" },
  { value: "late_night", label: "Late night", hint: "9 PM+" },
];

export const SECTIONS: Section[] = [
  {
    id: "who",
    weekLabel: null,
    color: "#C4A882",
    weekTitle: null,
    weekSubtitle: null,
    questions: [
      {
        id: "first_name",
        type: "text",
        label: "Hey — what's your first name?",
        why: "We'll greet you by name inside your member area and in every email.",
        required: true,
        placeholder: "First name",
        maxLength: 80,
      },
      {
        id: "email",
        type: "email",
        label: "What email did you use at checkout?",
        why: "We lock your map to this email so you can come back to it from any device.",
        required: true,
        placeholder: "you@example.com",
        maxLength: 200,
      },
    ],
  },
  {
    id: "projects",
    weekLabel: "Week 01",
    color: "#C4A882",
    weekTitle: "The 3 Projects you'll build",
    weekSubtitle:
      "By end of Week 1 you'll have three Claude Projects loaded with your business. Let's shape them now.",
    questions: [
      {
        id: "business_oneliner",
        type: "text",
        label: "In one line, what does your business do?",
        why: "This becomes the seed knowledge for your Voice & Brand Project in Session 1.",
        placeholder: "I help [audience] do [outcome] by [method]",
        maxLength: 280,
      },
      {
        id: "first_focus",
        type: "cards",
        label: "Which part of your business gets Claude FIRST?",
        why: "This is the Project we configure live together in Session 1, before anything else.",
        options: FIRST_FOCUS_OPTIONS as Option[],
      },
      {
        id: "voice_owner",
        type: "cards",
        label: "Whose voice should Claude learn?",
        why: "We shape your Voice & Brand Project's system prompt around this.",
        options: VOICE_OWNER_OPTIONS as Option[],
      },
    ],
    revealOnExit: () =>
      "Your 3 Projects are queued: Ops · Voice · Client Hub.",
  },
  {
    id: "employee",
    weekLabel: "Week 02",
    color: "#7D6B5A",
    weekTitle: "Your first AI Employee",
    weekSubtitle:
      "In Week 2 you'll brief, test, and ship one AI employee inside Cowork. Pick who they'll be.",
    questions: [
      {
        id: "ai_employee_role",
        type: "cards",
        label: "If you could hire someone to handle ONE recurring task forever, what would it be?",
        why: "This is the AI employee you'll brief and stress-test live in W2·S4.",
        options: AI_ROLE_OPTIONS as Option[],
        customField: "ai_employee_custom",
      },
    ],
    revealOnExit: (answers) => {
      const role = answers.ai_employee_role as string | undefined;
      const custom = (answers.ai_employee_custom as string | undefined)?.trim();
      const label =
        role === "custom"
          ? custom || "your custom role"
          : role === "inbox_triage"
            ? "Inbox Triage"
            : role === "lead_qualifier"
              ? "Lead Qualifier"
              : role === "content_reviewer"
                ? "Content Reviewer"
                : "your AI employee";
      return `Your AI employee is queued. We'll brief ${label} together in Week 2.`;
    },
  },
  {
    id: "dashboard",
    weekLabel: "Week 03",
    color: "#5A7A6B",
    weekTitle: "Your custom Dashboard",
    weekSubtitle:
      "In Week 3 you'll build a dashboard with Claude Code — no design needed. Pick what it should track.",
    questions: [
      {
        id: "dashboard_metrics",
        type: "multi",
        label: "What number do you wish you could see every morning?",
        why: "Pick up to 2. Your dashboard surfaces these as soon as you open it.",
        options: DASHBOARD_METRIC_OPTIONS as Option[],
        multiMax: 2,
        customField: "dashboard_custom",
      },
      {
        id: "os",
        type: "toggle",
        label: "Mac or Windows?",
        why: "This pre-selects your setup track and Claude Code install path inside your member area.",
        options: OS_OPTIONS as Option[],
      },
    ],
    revealOnExit: (answers) => {
      const os = answers.os === "windows" ? "Windows" : "Mac";
      return `Your dashboard is queued. Built on ${os} with Claude Code.`;
    },
  },
  {
    id: "ritual",
    weekLabel: "Week 04",
    color: "#6B5A7A",
    weekTitle: "Your daily Claude ritual",
    weekSubtitle:
      "Week 4 turns the stack into a daily rhythm. Let's anchor it to when you actually work.",
    questions: [
      {
        id: "tz_and_peak",
        type: "tz_and_peak",
        label: "Where are you, and when are you sharpest?",
        why: "We use this to draft your morning Claude moment in your timezone in W4·S8.",
      },
      {
        id: "one_thing",
        type: "longtext",
        label:
          "If June 28 comes and you got exactly ONE thing from bootcamp — what would it be?",
        why: "Abie and Meri read every single one of these before kickoff. Promise.",
        placeholder: "I want to walk away with…",
        maxLength: 600,
      },
    ],
    revealOnExit: () =>
      "Locked in. Your bootcamp is shaped around you.",
  },
];

export function allQuestions(): { sectionId: string; question: BaseQuestion }[] {
  return SECTIONS.flatMap((s) =>
    s.questions.map((q) => ({ sectionId: s.id, question: q })),
  );
}

export const TOTAL_QUESTIONS = allQuestions().length;
