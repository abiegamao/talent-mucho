import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServer } from "@/lib/supabase";
import { sendEmail } from "@/lib/emails/send";
import { buildIntakeWelcomeEmail } from "@/lib/emails/intake-welcome";
import { buildIntakeDigestEmail } from "@/lib/emails/intake-digest";
import type { IntakeResponse } from "@/lib/intake/types";

const INTERNAL_DIGEST_TO = "hello@talentmucho.com";

const ALLOWED_FOCUS = new Set(["ops", "voice", "client", "sales"]);
const ALLOWED_VOICE = new Set(["mine", "company", "both"]);
const ALLOWED_AI_ROLE = new Set([
  "inbox_triage",
  "lead_qualifier",
  "content_reviewer",
  "custom",
]);
const ALLOWED_METRIC = new Set([
  "revenue",
  "leads",
  "time_per_workflow",
  "active_clients",
  "content_engagement",
  "custom",
]);
const ALLOWED_OS = new Set(["mac", "windows"]);
const ALLOWED_PEAK = new Set([
  "morning",
  "mid_morning",
  "afternoon",
  "evening",
  "late_night",
]);

function clean(value: unknown, max = 500): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim().slice(0, max);
  return trimmed.length ? trimmed : null;
}

function cleanEnum(value: unknown, set: Set<string>): string | null {
  const s = clean(value);
  return s && set.has(s) ? s : null;
}

function cleanMetrics(value: unknown): string[] | null {
  if (!Array.isArray(value)) return null;
  const filtered = value
    .map((v) => (typeof v === "string" ? v.trim() : ""))
    .filter((v) => ALLOWED_METRIC.has(v));
  return filtered.length ? Array.from(new Set(filtered)).slice(0, 4) : null;
}

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "invalid_json" },
      { status: 400 },
    );
  }

  const email = clean(body.email)?.toLowerCase();
  const firstName = clean(body.first_name, 80);

  if (!email || !email.includes("@") || !firstName) {
    return NextResponse.json(
      { error: "missing_required", message: "first_name and email are required." },
      { status: 400 },
    );
  }

  const row: Omit<IntakeResponse, "id" | "created_at" | "updated_at"> & {
    updated_at: string;
  } = {
    email,
    first_name: firstName,
    business_oneliner: clean(body.business_oneliner, 280),
    first_focus: cleanEnum(body.first_focus, ALLOWED_FOCUS) as IntakeResponse["first_focus"],
    voice_owner: cleanEnum(body.voice_owner, ALLOWED_VOICE) as IntakeResponse["voice_owner"],
    ai_employee_role: cleanEnum(
      body.ai_employee_role,
      ALLOWED_AI_ROLE,
    ) as IntakeResponse["ai_employee_role"],
    ai_employee_custom: clean(body.ai_employee_custom, 200),
    dashboard_metrics: cleanMetrics(body.dashboard_metrics) as IntakeResponse["dashboard_metrics"],
    dashboard_custom: clean(body.dashboard_custom, 200),
    os: cleanEnum(body.os, ALLOWED_OS) as IntakeResponse["os"],
    timezone: clean(body.timezone, 80),
    peak_time: cleanEnum(body.peak_time, ALLOWED_PEAK) as IntakeResponse["peak_time"],
    one_thing: clean(body.one_thing, 600),
    updated_at: new Date().toISOString(),
  };

  const supabase = getSupabaseServer();
  let saved: IntakeResponse | null = null;

  if (supabase) {
    const { data, error } = await supabase
      .from("bootcamp_intake")
      .upsert(row, { onConflict: "email" })
      .select()
      .single();
    if (error) {
      console.error("[intake] supabase upsert failed", error);
      return NextResponse.json(
        { error: "persist_failed", message: error.message },
        { status: 500 },
      );
    }
    saved = data as IntakeResponse;
  } else {
    console.warn("[intake] Supabase not configured — proceeding without persistence");
    saved = { ...row, id: "no-persist", created_at: row.updated_at } as IntakeResponse;
  }

  // Fire-and-forget emails (don't block response on email failures)
  const studentEmail = buildIntakeWelcomeEmail(saved);
  const digestEmail = buildIntakeDigestEmail(saved);

  await Promise.allSettled([
    sendEmail({
      to: saved.email,
      subject: studentEmail.subject,
      html: studentEmail.html,
      text: studentEmail.text,
      replyTo: "hello@talentmucho.com",
    }),
    sendEmail({
      to: INTERNAL_DIGEST_TO,
      subject: digestEmail.subject,
      html: digestEmail.html,
      text: digestEmail.text,
    }),
  ]);

  return NextResponse.json({ id: saved.id, email: saved.email }, { status: 200 });
}
