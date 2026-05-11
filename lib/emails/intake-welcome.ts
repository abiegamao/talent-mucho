import type { IntakeResponse } from "../intake/types";
import {
  aiEmployeeLabel,
  dashboardMetricLabel,
  morningMoment,
  osLabel,
  projectNames,
} from "../intake/personalize";

export function buildIntakeWelcomeEmail(intake: IntakeResponse): {
  subject: string;
  html: string;
  text: string;
} {
  const projects = projectNames(intake);
  const employee = aiEmployeeLabel(intake);
  const metric = dashboardMetricLabel(intake);
  const ritual = morningMoment(intake);
  const os = osLabel(intake);
  const first = intake.first_name.trim();

  const subject = `Your Bootcamp Map, ${first} — see you Friday, June 5`;

  const text = [
    `Hey ${first},`,
    ``,
    `Your Bootcamp Map is locked in. Here's what's queued up for you across the 4 weeks:`,
    ``,
    `Week 1 · Three Claude Projects`,
    `  • ${projects.ops}`,
    `  • ${projects.voice}`,
    `  • ${projects.client}`,
    ``,
    `Week 2 · Your AI Employee`,
    `  • ${employee}`,
    ``,
    `Week 3 · Your Dashboard`,
    `  • ${metric}`,
    `  • Built on ${os === "mac" ? "Mac" : "Windows"} with Claude Code`,
    ``,
    `Week 4 · Your Daily Ritual`,
    `  • Morning moment anchored to ${ritual.local} (${ritual.est} on Zoom)`,
    ``,
    `Next steps:`,
    `  1. Open your member area: https://talentmucho.com/events/bootcamp/inside (PIN: 2028)`,
    `  2. Join the Skool community: https://www.skool.com/future-proof-with-ai-4339/about`,
    `  3. Calendar invites for all 9 sessions arrive before Friday, June 5.`,
    ``,
    `See you Friday, June 5 — kickoff is 6 PM EST, Zoom.`,
    ``,
    `~ Abie & Meri`,
  ].join("\n");

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>${escapeHtml(subject)}</title>
</head>
<body style="margin:0;padding:0;background:#F5F0E8;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;color:#2D2520;">
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:#F5F0E8;padding:32px 12px;">
    <tr><td align="center">
      <table role="presentation" cellpadding="0" cellspacing="0" width="600" style="max-width:600px;background:#FFFFFF;border:1px solid #E5D9C7;border-radius:16px;overflow:hidden;">
        <tr><td style="background:#1F1A16;padding:32px;color:#F5F0E8;text-align:center;">
          <p style="margin:0 0 8px 0;font-size:11px;font-weight:700;letter-spacing:0.22em;text-transform:uppercase;color:#C4A882;">Cohort 1 · Founding Member</p>
          <h1 style="margin:0;font-family:Georgia,'Cormorant',serif;font-weight:300;font-size:38px;line-height:1.1;color:#F5F0E8;">
            Welcome to the room, <em style="color:#C4A882;">${escapeHtml(first)}</em>.
          </h1>
          <p style="margin:16px 0 0 0;font-size:15px;line-height:1.6;color:#D4C9B5;">
            Your Bootcamp Map is locked in. Below is what we'll build for you, week by week.
          </p>
        </td></tr>

        ${weekCard("Week 01", "#C4A882", "The 3 Projects you'll build", [
          projects.ops,
          projects.voice,
          projects.client,
        ])}
        ${weekCard("Week 02", "#7D6B5A", "Your first AI Employee", [employee])}
        ${weekCard("Week 03", "#5A7A6B", "Your custom Dashboard", [
          metric,
          `Built on ${os === "mac" ? "Mac" : "Windows"} with Claude Code`,
        ])}
        ${weekCard("Week 04", "#6B5A7A", "Your daily Claude ritual", [
          `Morning moment · ${ritual.local}`,
          `Live sessions at ${ritual.est} EST on Zoom`,
        ])}

        <tr><td style="padding:24px 32px;background:#F5F0E8;border-top:1px solid #E5D9C7;">
          <p style="margin:0 0 16px 0;font-size:11px;font-weight:700;letter-spacing:0.22em;text-transform:uppercase;color:#C4A882;">What's next</p>
          <p style="margin:0 0 12px 0;font-size:14px;line-height:1.6;">
            <strong>1.</strong> Open your member area &nbsp;
            <a href="https://talentmucho.com/events/bootcamp/inside" style="color:#C4A882;font-weight:600;">Bookmark /inside →</a><br>
            <span style="font-size:12px;color:#7D6B5A;">PIN: <code style="background:#1F1A16;color:#F5F0E8;padding:2px 8px;border-radius:4px;letter-spacing:0.3em;">2028</code></span>
          </p>
          <p style="margin:0 0 12px 0;font-size:14px;line-height:1.6;">
            <strong>2.</strong> Drop into the Skool community &nbsp;
            <a href="https://www.skool.com/future-proof-with-ai-4339/about" style="color:#C4A882;font-weight:600;">Join #cohort-1 →</a>
          </p>
          <p style="margin:0;font-size:14px;line-height:1.6;">
            <strong>3.</strong> Calendar invites for all 9 sessions arrive before Friday, June 5.
          </p>
        </td></tr>

        <tr><td style="padding:32px;background:#1F1A16;color:#D4C9B5;text-align:center;">
          <p style="margin:0 0 6px 0;font-family:Georgia,'Cormorant',serif;font-size:22px;font-style:italic;color:#F5F0E8;">
            See you Friday, June 5.
          </p>
          <p style="margin:0;font-size:13px;color:#A8967E;">
            Kickoff at 6 PM EST · Zoom link lands in your inbox 24h before.
          </p>
          <p style="margin:24px 0 0 0;font-size:12px;color:#A8967E;">
            ~ Abie &amp; Meri
          </p>
        </td></tr>
      </table>
      <p style="font-size:11px;color:#7D6B5A;margin:18px 0 0 0;">
        Talent Mucho · hello@talentmucho.com
      </p>
    </td></tr>
  </table>
</body>
</html>`;

  return { subject, html, text };
}

function weekCard(
  weekLabel: string,
  color: string,
  title: string,
  items: string[],
): string {
  return `<tr><td style="padding:24px 32px;border-bottom:1px solid #E5D9C7;">
    <p style="margin:0 0 4px 0;font-size:10px;font-weight:700;letter-spacing:0.22em;text-transform:uppercase;color:${color};">${escapeHtml(weekLabel)}</p>
    <p style="margin:0 0 12px 0;font-family:Georgia,'Cormorant',serif;font-size:22px;font-weight:300;color:#2D2520;">${escapeHtml(title)}</p>
    <ul style="margin:0;padding:0;list-style:none;">
      ${items
        .map(
          (item) =>
            `<li style="margin:0 0 6px 0;padding:0 0 0 16px;font-size:14px;line-height:1.5;color:#3D352E;position:relative;"><span style="position:absolute;left:0;top:7px;width:6px;height:6px;border-radius:50%;background:${color};display:inline-block;"></span>${escapeHtml(item)}</li>`,
        )
        .join("")}
    </ul>
  </td></tr>`;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
