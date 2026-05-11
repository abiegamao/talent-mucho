// Thin Resend wrapper using fetch (no SDK dependency).
// Reads RESEND_API_KEY from env. Returns true if the API call succeeded.

interface SendArgs {
  to: string;
  subject: string;
  html: string;
  text?: string;
  from?: string;
  replyTo?: string;
}

const DEFAULT_FROM = "Talent Mucho <hello@talentmucho.com>";

export async function sendEmail(args: SendArgs): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("[email] RESEND_API_KEY not set — skipping send", {
      to: args.to,
      subject: args.subject,
    });
    return false;
  }
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: args.from ?? DEFAULT_FROM,
        to: args.to,
        subject: args.subject,
        html: args.html,
        text: args.text,
        reply_to: args.replyTo,
      }),
    });
    if (!res.ok) {
      const errorBody = await res.text();
      console.error("[email] Resend send failed", res.status, errorBody);
      return false;
    }
    return true;
  } catch (err) {
    console.error("[email] Resend send threw", err);
    return false;
  }
}
