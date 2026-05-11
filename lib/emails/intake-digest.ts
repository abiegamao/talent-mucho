import type { IntakeResponse } from "../intake/types";
import {
  AI_ROLE_LABEL,
  DASHBOARD_METRIC_LABEL,
  FOCUS_LABEL,
  PEAK_TIME_LABEL,
  VOICE_OWNER_LABEL,
} from "../intake/personalize";

export function buildIntakeDigestEmail(intake: IntakeResponse): {
  subject: string;
  html: string;
  text: string;
} {
  const first = intake.first_name.trim();
  const subject = `[Cohort 1 intake] ${first} ${intake.email}`;

  const rows: Array<[string, string]> = [
    ["First name", first],
    ["Email", intake.email],
    ["Business", intake.business_oneliner ?? "—"],
    ["First focus", intake.first_focus ? FOCUS_LABEL[intake.first_focus] : "—"],
    ["Voice owner", intake.voice_owner ? VOICE_OWNER_LABEL[intake.voice_owner] : "—"],
    [
      "AI employee",
      intake.ai_employee_role === "custom"
        ? `Custom: ${intake.ai_employee_custom ?? "(blank)"}`
        : intake.ai_employee_role
          ? AI_ROLE_LABEL[intake.ai_employee_role]
          : "—",
    ],
    [
      "Dashboard metrics",
      (intake.dashboard_metrics ?? [])
        .map((m) =>
          m === "custom"
            ? `Custom: ${intake.dashboard_custom ?? "(blank)"}`
            : DASHBOARD_METRIC_LABEL[m],
        )
        .join(", ") || "—",
    ],
    ["OS", intake.os ?? "—"],
    ["Timezone", intake.timezone ?? "—"],
    ["Peak time", intake.peak_time ? PEAK_TIME_LABEL[intake.peak_time] : "—"],
    ["One thing they want", intake.one_thing ?? "—"],
  ];

  const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n");

  const html = `<!DOCTYPE html><html><body style="font-family:Helvetica,Arial,sans-serif;color:#2D2520;background:#F5F0E8;padding:24px;">
    <h2 style="margin:0 0 12px 0;font-size:18px;">New Cohort 1 intake</h2>
    <p style="margin:0 0 16px 0;font-size:13px;color:#7D6B5A;">${escapeHtml(first)} · ${escapeHtml(intake.email)}</p>
    <table cellpadding="8" cellspacing="0" style="background:#FFFFFF;border:1px solid #E5D9C7;border-collapse:collapse;font-size:13px;width:100%;max-width:640px;">
      ${rows
        .map(
          ([k, v]) =>
            `<tr><td style="border-bottom:1px solid #E5D9C7;font-weight:600;color:#7D6B5A;width:180px;vertical-align:top;">${escapeHtml(k)}</td><td style="border-bottom:1px solid #E5D9C7;color:#2D2520;">${escapeHtml(v)}</td></tr>`,
        )
        .join("")}
    </table>
  </body></html>`;

  return { subject, html, text };
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
