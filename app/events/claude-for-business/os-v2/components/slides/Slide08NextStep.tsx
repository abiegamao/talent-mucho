"use client";

import { useState, useEffect } from "react";
import type { SlideProps } from "../../types";

// ── URLs ──────────────────────────────────────────────────────────────────────
const SKOOL_FREE_URL = "https://talentmucho.com/events/claude-for-business/guide";
const SKOOL_MONTHLY_URL = "https://buy.stripe.com/cNifZb3qm7cTdOFf8h73G05";
const SKOOL_ANNUAL_URL = "https://buy.stripe.com/14A6oBgd8gNtfWN7FP73G06";

// ── BootcampPreview data ──────────────────────────────────────────────────────
const BOOTCAMP_WEEKS = [
  {
    week: "Week 1",
    title: "Knowing Claude",
    color: "#C4A882",
    deliverable:
      "3 configured Claude.ai Projects loaded with your docs, business context, and brand voice.",
  },
  {
    week: "Week 2",
    title: "Delegating to Claude",
    color: "#7D6B5A",
    deliverable:
      "1 named AI employee in Cowork, briefed and tested against real scenarios from your business.",
  },
  {
    week: "Week 3",
    title: "Building with Claude",
    color: "#5A7A6B",
    deliverable:
      "1 custom business dashboard built with Claude Code. No coding experience needed.",
  },
  {
    week: "Week 4",
    title: "Living with Claude",
    color: "#6B5A7A",
    deliverable:
      "A written daily Claude routine: 3 specific moments in your workday where Claude is open and ready.",
  },
];

const BOOTCAMP_VIP_PERKS = [
  {
    title: "Small groups",
    desc: "Live sessions capped so everyone gets airtime and real feedback",
  },
  {
    title: "Custom prompt buildout",
    desc: "Prompts written specifically for your business and niche",
  },
  {
    title: "30-day community access",
    desc: "Free 30-day access to the Skool premium community for the duration of the bootcamp",
  },
  {
    title: "Priority DM support",
    desc: "Direct access to the instructor throughout the full bootcamp",
  },
];

const ROI_ROWS = [
  {
    task: "Emails and DM replies",
    before: "3 hrs/wk",
    after: "45 min/wk",
    saved: "Save 2h 15m",
  },
  {
    task: "Weekly content creation",
    before: "4 hrs/wk",
    after: "1 hr/wk",
    saved: "Save 3h",
  },
  {
    task: "Client proposals & quotes",
    before: "2 hrs/wk",
    after: "25 min/wk",
    saved: "Save 1h 35m",
  },
  {
    task: "Customer FAQ and replies",
    before: "1.5 hrs/wk",
    after: "20 min/wk",
    saved: "Save 1h 10m",
  },
  {
    task: "Research and planning",
    before: "2 hrs/wk",
    after: "30 min/wk",
    saved: "Save 1h 30m",
  },
];

// ── ValueStack data ───────────────────────────────────────────────────────────
const VIP_STACK = [
  {
    name: "Full replay + transcript",
    desc: "Rewatch any demo · copy any prompt · 30-day access",
    value: 97 as number | "priceless",
  },
  {
    name: "The Claude Vault",
    desc: "Private dashboard setups + Talent Mucho's premium proprietary Claude skills",
    value: 297 as number | "priceless",
  },
  {
    name: "VIP-only group follow-up",
    desc: "45-min private session with Abie & Meri · small group",
    value: "priceless" as number | "priceless",
  },
  {
    name: "30-day Premium Skool access",
    desc: "Closed mentorship · weekly Vibe Coding · €49/mo after, cancel anytime",
    value: 49 as number | "priceless",
  },
];

// ── ThreeDoorsOut data ────────────────────────────────────────────────────────
interface DoorOption {
  label: string;
  name: string;
  italic: string;
  price: string;
  pitch: string;
  bestFor: string;
  whatYouGet: string[];
  nextStep: string;
  cta: string;
  ctaUrl: string;
  secondaryCta?: string;
  secondaryCtaUrl?: string;
  highlight?: boolean;
}

const THREE_DOORS: DoorOption[] = [
  {
    label: "Door 1",
    name: "Free",
    italic: "just try it",
    price: "€0",
    pitch: "Open Claude tonight. Try one prompt from what you saw.",
    bestFor:
      "You're curious. Not ready to commit. Totally valid ~ tonight already moved you forward.",
    whatYouGet: [
      "Free Skool community ~ 560+ already in",
      "Tonight's freebie drop at midnight ~ every prompt and framework cleaned up",
      "Abie's AI Playbooks ~ free and growing every week",
    ],
    nextStep:
      "Join the free Skool tier, grab the playbooks, open Claude tonight.",
    cta: "Join free community",
    ctaUrl:
      "https://www.skool.com/future-proof-with-ai-4339/about?ref=1d469fcf6dfe460c8c681c23ea85a7a7",
  },
  {
    label: "Door 2",
    name: "Inner Circle",
    italic: "€49/mo ~ accountability",
    price: "€49/mo",
    pitch:
      "Stay close. Weekly group calls, replay vault, 30% off every bootcamp.",
    bestFor:
      "You want the ongoing support without the intensive. Or you want to join the bootcamp later with the discount locked.",
    whatYouGet: [
      "Weekly live group calls ~ starts Fri Jun 5",
      "Full replay vault ~ everything we've ever built",
      "Vibe coding sessions ~ build real things together",
      "30% off all future bootcamps ~ locked as long as you stay",
      "Direct access to Abie & Meri",
    ],
    nextStep:
      "Rate locks tonight at €49/mo. Going to €97. Scan the QR or click below.",
    cta: "Join community ~ €49/mo",
    ctaUrl: SKOOL_MONTHLY_URL,
    secondaryCta: "Annual ~ €399/yr (save 32%)",
    secondaryCtaUrl: SKOOL_ANNUAL_URL,
  },
  {
    label: "Door 3",
    name: "Bootcamp",
    italic: "€247 ~ tonight only",
    price: "€247",
    pitch:
      "One month. 9 live sessions. Four deliverables. AI running inside your business by Week 4.",
    bestFor:
      "You're done waiting. You want the full transformation, not just the inspiration.",
    whatYouGet: [
      "9 live sessions ~ Saturdays & Sundays, small groups",
      "Week 1: AI foundations + first Claude Project live",
      "Week 2: AI content engine built and running",
      "Week 3: AI employees in your workflows",
      "Week 4: custom dashboard + daily AI routine",
      "VIP bundle included free ~ €397 value (custom prompts, 30-day community, priority DM access)",
    ],
    nextStep:
      "Cohort 1 closes at midnight. €247 tonight ~ €397 next cohort. Link in chat.",
    cta: "Join Bootcamp ~ €247",
    ctaUrl: "https://buy.stripe.com/00wbIV3qm1SzcKBd0973G07",
    highlight: true,
  },
];

// ── BonusSlide data ───────────────────────────────────────────────────────────
const BONUS_NUGGETS = [
  {
    icon: "✉️",
    title: "The 15-min email trick",
    desc: "Paste your last 5 sent emails into Claude. Ask it to write your next 10 in your exact voice. Done.",
  },
  {
    icon: "🃏",
    title: "Build your first skill card",
    desc: "Pick one task you repeat every week. Describe it to Claude step by step. Ask it to turn it into a reusable skill prompt.",
  },
  {
    icon: "🧠",
    title: "The brain dump → action plan",
    desc: "Paste your messy notes, voice memo transcript, or scattered ideas. Ask Claude: \"Turn this into a structured action plan with priorities.\"",
  },
  {
    icon: "🪪",
    title: "Write your system prompt",
    desc: "Tell Claude who you are, what you do, and how you communicate. Ask it to write a system prompt you paste at the start of every session.",
  },
  {
    icon: "📅",
    title: "The Friday review ritual",
    desc: "Every Friday: give Claude your wins, blocks, and open loops. Ask: \"What patterns do you see? What should I prioritize Monday?\"",
  },
];

// ── QRBlock helper ────────────────────────────────────────────────────────────
function QRBlock({
  url,
  label,
  sublabel,
  size,
  C,
  mono,
  sans,
}: {
  url: string;
  label: string;
  sublabel: string;
  size: number;
  C: Record<string, string>;
  mono: React.CSSProperties;
  sans: React.CSSProperties;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: size * 0.08,
        flexShrink: 0,
      }}
    >
      <div
        style={{
          ...mono,
          fontSize: size * 0.07,
          fontWeight: 700,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: C.muted,
        }}
      >
        {label}
      </div>
      <div
        style={{
          background: "#FFFFFF",
          padding: size * 0.075,
          borderRadius: size * 0.1,
          border: `1px solid ${C.border}`,
          boxShadow: `0 4px 24px ${C.text}08`,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(url)}&color=2A2520&bgcolor=ffffff&margin=0`}
          alt={label}
          width={size}
          height={size}
          style={{ display: "block" }}
        />
      </div>
      <div
        style={{
          ...sans,
          fontSize: size * 0.07,
          color: C.primary,
          fontWeight: 600,
        }}
      >
        {sublabel}
      </div>
    </div>
  );
}

// ── BootcampPreview ───────────────────────────────────────────────────────────
export function BootcampPreview({ C, mono, sans, serif, scale = 1 }: SlideProps) {
  const sz = (n: number) => Math.round(n * scale);
  const dark = "#2A2120";
  const onDark = "#FAF8F5";
  const [roiOpen, setRoiOpen] = useState(false);

  return (
    <div style={{ maxWidth: 1500, margin: "48px auto 0" }}>
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          marginBottom: sz(28),
          gap: sz(24),
        }}
      >
        <div style={{ flex: 1 }}>
          <div
            style={{
              ...mono,
              fontSize: sz(11),
              fontWeight: 700,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: C.primary,
              marginBottom: sz(6),
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <span
              style={{
                display: "inline-block",
                width: 22,
                height: 1,
                background: C.primary,
              }}
            />
            Talent Mucho · AI Business Bootcamp
          </div>
          <div
            style={{
              ...sans,
              fontSize: sz(30),
              fontWeight: 700,
              color: C.text,
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
            }}
          >
            One month. Three tools.
          </div>
          <div
            style={{
              ...sans,
              fontSize: sz(18),
              color: C.primary,
              fontStyle: "italic",
              marginTop: sz(2),
              marginBottom: sz(10),
            }}
          >
            A business that runs differently.
          </div>
          <div
            style={{
              ...sans,
              fontSize: sz(15),
              color: C.muted,
              lineHeight: 1.5,
            }}
          >
            9 sessions · 27 hrs live instruction · Tuesdays &amp; Thursdays ·
            June 2026
          </div>
        </div>
        {/* Stat pills */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: sz(10),
            flexShrink: 0,
          }}
        >
          {[
            { val: "9", label: "sessions total" },
            { val: "€9.15", label: "per hour" },
            { val: "< 1 wk", label: "to break even" },
          ].map((s) => (
            <div
              key={s.label}
              style={{
                padding: `${sz(10)}px ${sz(18)}px`,
                borderRadius: sz(12),
                background: dark,
                textAlign: "center",
              }}
            >
              <div
                style={{
                  ...mono,
                  fontSize: sz(20),
                  fontWeight: 800,
                  color: C.primary,
                  letterSpacing: "-0.01em",
                  lineHeight: 1,
                }}
              >
                {s.val}
              </div>
              <div
                style={{
                  ...mono,
                  fontSize: sz(9),
                  fontWeight: 600,
                  color: onDark,
                  opacity: 0.6,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  marginTop: 2,
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4 week cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: sz(14),
          marginBottom: sz(20),
        }}
      >
        {BOOTCAMP_WEEKS.map((w) => (
          <div
            key={w.week}
            style={{
              borderRadius: sz(14),
              overflow: "hidden",
              border: `1px solid ${C.border}`,
              background: C.surface,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                background: w.color,
                padding: `${sz(16)}px ${sz(18)}px`,
              }}
            >
              <div
                style={{
                  ...mono,
                  fontSize: sz(9),
                  fontWeight: 700,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "rgba(250,248,245,0.7)",
                  marginBottom: sz(4),
                }}
              >
                {w.week}
              </div>
              <div
                style={{
                  ...sans,
                  fontSize: sz(18),
                  fontWeight: 700,
                  color: "#FAF8F5",
                  letterSpacing: "-0.01em",
                  lineHeight: 1.1,
                }}
              >
                {w.title}
              </div>
            </div>
            <div
              style={{ padding: `${sz(14)}px ${sz(16)}px`, flex: 1 }}
            >
              <div
                style={{
                  ...sans,
                  fontSize: sz(13),
                  color: C.text,
                  lineHeight: 1.5,
                }}
              >
                {w.deliverable}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Schedule */}
      <div
        style={{
          marginBottom: sz(20),
          borderRadius: sz(14),
          border: `1px solid ${C.border}`,
          overflow: "hidden",
          background: C.surface,
        }}
      >
        <div
          style={{
            padding: `${sz(14)}px ${sz(20)}px`,
            borderBottom: `1px solid ${C.border}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: sz(12) }}>
            <span
              style={{
                ...mono,
                fontSize: sz(10),
                fontWeight: 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: C.primary,
              }}
            >
              June 2026 Schedule
            </span>
            <span style={{ ...sans, fontSize: sz(13), color: C.muted }}>
              Sat &amp; Sun · 10 AM–1 PM EST · 3 hrs each
            </span>
          </div>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "auto auto 1fr auto",
            gap: `${sz(8)}px ${sz(20)}px`,
            padding: `${sz(14)}px ${sz(20)}px`,
            alignItems: "center",
          }}
        >
          {[
            { session: "Kickoff", date: "Fri Jun 5", topic: "Welcome, orientation, Claude.ai setup" },
            { session: "W1 · S1", date: "Sat Jun 6", topic: "The interface, Projects, your first conversation" },
            { session: "W1 · S2", date: "Sun Jun 7", topic: "Custom instructions, file uploads" },
            { session: "W2 · S3", date: "Sat Jun 13", topic: "AI employees ~ what Cowork makes real" },
            { session: "W2 · S4", date: "Sun Jun 14", topic: "Build and test your first AI employee live" },
            { session: "W3 · S5", date: "Sat Jun 20", topic: "Claude Code ~ your first build" },
            { session: "W3 · S6", date: "Sun Jun 21", topic: "Build your business dashboard" },
            { session: "W4 · S7", date: "Sat Jun 27", topic: "Your full Claude stack working together" },
            { session: "W4 · S8", date: "Sun Jun 28", topic: "Showcases, Q&A, and graduation" },
          ].map((r, i) => (
            <>
              <div
                key={`s${i}`}
                style={{
                  ...mono,
                  fontSize: sz(10),
                  fontWeight: 700,
                  color: i === 0 ? C.primary : C.muted,
                  letterSpacing: "0.1em",
                  whiteSpace: "nowrap",
                }}
              >
                {r.session}
              </div>
              <div
                key={`d${i}`}
                style={{
                  ...sans,
                  fontSize: sz(13),
                  fontWeight: 600,
                  color: C.text,
                  whiteSpace: "nowrap",
                }}
              >
                {r.date}
              </div>
              <div
                key={`t${i}`}
                style={{ ...sans, fontSize: sz(13), color: C.muted }}
              >
                {r.topic}
              </div>
              <div
                key={`tz${i}`}
                style={{
                  ...mono,
                  fontSize: sz(10),
                  color: C.muted,
                  whiteSpace: "nowrap",
                }}
              >
                10 AM–1 PM EST
              </div>
            </>
          ))}
        </div>
      </div>

      {/* Collapsible ROI table */}
      <div
        style={{
          marginBottom: sz(20),
          borderRadius: sz(14),
          border: `1px solid ${C.border}`,
          overflow: "hidden",
        }}
      >
        <button
          onClick={() => setRoiOpen((o) => !o)}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: `${sz(14)}px ${sz(20)}px`,
            background: C.surface,
            border: "none",
            cursor: "pointer",
            borderBottom: roiOpen ? `1px solid ${C.border}` : "none",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: sz(12) }}>
            <span
              style={{
                ...mono,
                fontSize: sz(10),
                fontWeight: 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: C.primary,
              }}
            >
              Where the hours come back
            </span>
            <span style={{ ...sans, fontSize: sz(13), color: C.muted }}>
              ~9.5 hrs/week · €1,140/month returned
            </span>
          </div>
          <span
            style={{
              ...mono,
              fontSize: sz(13),
              color: C.muted,
              transition: "transform 0.2s",
              display: "inline-block",
              transform: roiOpen ? "rotate(180deg)" : "rotate(0deg)",
            }}
          >
            ▾
          </span>
        </button>

        {roiOpen && (
          <div style={{ background: C.bg }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr auto auto auto",
                gap: sz(12),
                padding: `${sz(10)}px ${sz(20)}px`,
                borderBottom: `1px solid ${C.border}`,
                background: C.surface2,
              }}
            >
              {["Task", "Before Claude", "With Claude", "Saved"].map((h) => (
                <div
                  key={h}
                  style={{
                    ...mono,
                    fontSize: sz(9),
                    fontWeight: 700,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: C.muted,
                  }}
                >
                  {h}
                </div>
              ))}
            </div>
            {ROI_ROWS.map((r, i) => (
              <div
                key={i}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr auto auto auto",
                  gap: sz(12),
                  padding: `${sz(12)}px ${sz(20)}px`,
                  background: i % 2 === 0 ? C.bg : C.surface,
                  borderBottom:
                    i < ROI_ROWS.length - 1 ? `1px solid ${C.border}` : "none",
                  alignItems: "center",
                }}
              >
                <div style={{ ...sans, fontSize: sz(14), color: C.text }}>
                  {r.task}
                </div>
                <div
                  style={{
                    ...mono,
                    fontSize: sz(13),
                    color: C.muted,
                    whiteSpace: "nowrap",
                  }}
                >
                  {r.before}
                </div>
                <div
                  style={{
                    ...mono,
                    fontSize: sz(13),
                    color: C.text,
                    whiteSpace: "nowrap",
                  }}
                >
                  {r.after}
                </div>
                <div
                  style={{
                    ...sans,
                    fontSize: sz(13),
                    fontStyle: "italic",
                    color: C.primary,
                    whiteSpace: "nowrap",
                    fontWeight: 600,
                  }}
                >
                  {r.saved}
                </div>
              </div>
            ))}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr auto auto auto",
                gap: sz(12),
                padding: `${sz(14)}px ${sz(20)}px`,
                background: dark,
              }}
            >
              <div
                style={{
                  ...sans,
                  fontSize: sz(14),
                  fontWeight: 700,
                  color: onDark,
                }}
              >
                Total saved per week
              </div>
              <div
                style={{ ...mono, fontSize: sz(13), color: "rgba(250,248,245,0.5)" }}
              />
              <div
                style={{ ...mono, fontSize: sz(13), color: "rgba(250,248,245,0.5)" }}
              />
              <div
                style={{
                  ...sans,
                  fontSize: sz(20),
                  fontWeight: 800,
                  color: C.primary,
                  fontStyle: "italic",
                  whiteSpace: "nowrap",
                }}
              >
                ~9.5 hrs
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Early bird offer */}
      <div
        style={{
          borderRadius: sz(18),
          background: dark,
          padding: `${sz(24)}px ${sz(28)}px`,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            backgroundImage:
              "repeating-linear-gradient(0deg,rgba(255,255,255,0.03) 0,rgba(255,255,255,0.03) 1px,transparent 1px,transparent 48px),repeating-linear-gradient(90deg,rgba(255,255,255,0.03) 0,rgba(255,255,255,0.03) 1px,transparent 1px,transparent 48px)",
          }}
        />
        <div style={{ position: "relative" }}>
          <div
            style={{
              ...mono,
              fontSize: sz(10),
              fontWeight: 700,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: C.primary,
              marginBottom: sz(8),
            }}
          >
            Cohort 1 founding price · Tonight only · Cohort 2 opens at €397
          </div>
          <div
            style={{
              ...sans,
              fontSize: sz(26),
              fontWeight: 700,
              color: onDark,
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              marginBottom: sz(4),
            }}
          >
            €247 tonight. €397 next cohort.
          </div>
          <div
            style={{
              ...sans,
              fontSize: sz(18),
              color: C.primary,
              fontStyle: "italic",
              marginBottom: sz(18),
            }}
          >
            Plus get the €397 VIP package free ~ tonight only.
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: sz(12),
              marginBottom: sz(20),
            }}
          >
            {BOOTCAMP_VIP_PERKS.map((p) => (
              <div
                key={p.title}
                style={{
                  background: "rgba(255,255,255,0.06)",
                  borderRadius: sz(10),
                  padding: `${sz(14)}px ${sz(16)}px`,
                  borderBottom: `2px solid ${C.primary}40`,
                }}
              >
                <div
                  style={{
                    ...sans,
                    fontSize: sz(13),
                    fontWeight: 700,
                    color: onDark,
                    marginBottom: sz(6),
                  }}
                >
                  {p.title}
                </div>
                <div
                  style={{
                    ...sans,
                    fontSize: sz(12),
                    color: "rgba(250,248,245,0.6)",
                    lineHeight: 1.4,
                  }}
                >
                  {p.desc}
                </div>
              </div>
            ))}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: sz(24),
              padding: `${sz(14)}px ${sz(20)}px`,
              borderRadius: sz(10),
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <div style={{ flex: 1, textAlign: "center" }}>
              <div
                style={{
                  ...mono,
                  fontSize: sz(9),
                  color: "rgba(250,248,245,0.5)",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                }}
              >
                Cohort 1 price
              </div>
              <div
                style={{
                  ...sans,
                  fontSize: sz(22),
                  fontWeight: 800,
                  color: onDark,
                }}
              >
                <span style={{ color: C.primary }}>€247</span>
              </div>
              <div
                style={{
                  ...mono,
                  fontSize: sz(9),
                  color: "rgba(250,248,245,0.5)",
                  letterSpacing: "0.1em",
                }}
              >
                cohort 2 opens at €397
              </div>
            </div>
            <div
              style={{
                width: 1,
                alignSelf: "stretch",
                background: "rgba(255,255,255,0.1)",
              }}
            />
            <div style={{ flex: 1, textAlign: "center" }}>
              <div
                style={{
                  ...mono,
                  fontSize: sz(9),
                  color: "rgba(250,248,245,0.5)",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                }}
              >
                VIP upgrade
              </div>
              <div
                style={{
                  ...sans,
                  fontSize: sz(22),
                  fontWeight: 800,
                  color: C.primary,
                }}
              >
                €397{" "}
                <span style={{ fontStyle: "italic", fontWeight: 400 }}>
                  free
                </span>
              </div>
              <div
                style={{
                  ...mono,
                  fontSize: sz(9),
                  color: "rgba(250,248,245,0.5)",
                  letterSpacing: "0.1em",
                }}
              >
                included at no extra cost
              </div>
            </div>
            <div
              style={{
                width: 1,
                alignSelf: "stretch",
                background: "rgba(255,255,255,0.1)",
              }}
            />
            <div style={{ flex: 1, textAlign: "center" }}>
              <div
                style={{
                  ...mono,
                  fontSize: sz(9),
                  color: "rgba(250,248,245,0.5)",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                }}
              >
                Total value
              </div>
              <div
                style={{
                  ...sans,
                  fontSize: sz(22),
                  fontWeight: 800,
                  color: onDark,
                }}
              >
                €644
              </div>
              <div
                style={{
                  ...mono,
                  fontSize: sz(9),
                  color: "rgba(250,248,245,0.5)",
                  letterSpacing: "0.1em",
                }}
              >
                for the price of €247
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: sz(24),
              marginTop: sz(16),
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: sz(8),
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  background: "#FAF8F5",
                  padding: sz(10),
                  borderRadius: sz(12),
                  border: `2px solid ${C.primary}`,
                  boxShadow: `0 8px 20px -6px ${C.primary}50`,
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent("https://buy.stripe.com/00wbIV3qm1SzcKBd0973G07")}&margin=0&color=2A2520&bgcolor=FAF8F5`}
                  width={sz(100)}
                  height={sz(100)}
                  alt="Scan to join Bootcamp Cohort 1"
                  style={{ display: "block" }}
                />
              </div>
              <div
                style={{
                  ...mono,
                  fontSize: sz(9),
                  fontWeight: 700,
                  color: C.primary,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                }}
              >
                Scan to join
              </div>
            </div>
            <div
              style={{
                ...sans,
                fontSize: sz(12),
                color: "rgba(250,248,245,0.5)",
                lineHeight: 1.6,
              }}
            >
              ● Cohort 1 closes tonight at midnight. €247 is the founding price
              ~ Cohort 2 opens at €397.
              <br />
              The VIP upgrade (€397 free tonight) returns to full price after
              midnight.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── ValueStack ────────────────────────────────────────────────────────────────
export function ValueStack({ C, mono, sans, serif, scale = 1 }: SlideProps) {
  const onDark = "#FAF8F5";
  const sz = (px: number) => Math.round(px * scale);
  const totalNumeric = VIP_STACK.reduce(
    (s, item) => s + (typeof item.value === "number" ? item.value : 0),
    0,
  );
  const [pricesRevealed, setPricesRevealed] = useState(false);
  const [revealedItems, setRevealedItems] = useState(0);

  useEffect(() => {
    if (!pricesRevealed) {
      setRevealedItems(0);
      return;
    }
    setRevealedItems(0);
    let i = 0;
    const tick = () => {
      i += 1;
      setRevealedItems(i);
      if (i < VIP_STACK.length) setTimeout(tick, 280);
    };
    const initial = setTimeout(tick, 200);
    return () => clearTimeout(initial);
  }, [pricesRevealed]);

  const allItemsRevealed = revealedItems >= VIP_STACK.length;

  return (
    <div style={{ maxWidth: 1500, margin: "48px auto 0" }}>
      <div
        style={{
          ...mono,
          fontSize: sz(13),
          fontWeight: 700,
          color: C.primary,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          marginBottom: 8,
          display: "flex",
          alignItems: "center",
          gap: 12,
          justifyContent: "space-between",
        }}
      >
        <span style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span
            style={{
              display: "inline-block",
              width: 22,
              height: 1,
              background: C.primary,
            }}
          />
          The VIP stack
        </span>
        <button
          onClick={() => setPricesRevealed((p) => !p)}
          style={{
            ...mono,
            fontSize: sz(11),
            fontWeight: 700,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: pricesRevealed
              ? C.muted
              : C.text === "#2A2520"
                ? onDark
                : C.bg,
            background: pricesRevealed ? "transparent" : C.primary,
            border: `1px solid ${pricesRevealed ? C.border : C.primary}`,
            borderRadius: 100,
            padding: "6px 16px",
            cursor: "pointer",
            transition: "all 0.2s",
          }}
        >
          {pricesRevealed ? "↺ Hide the math" : "▸ Reveal the math"}
        </button>
      </div>
      <div
        style={{
          ...serif,
          fontSize: sz(20),
          color: C.muted,
          marginBottom: 26,
          lineHeight: 1.5,
        }}
      >
        {pricesRevealed
          ? "Honest values. Math doesn't lie."
          : "Click reveal when you're ready to drop the math."}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: 8,
          marginBottom: 18,
        }}
      >
        {VIP_STACK.map((item, i) => {
          const isPriceless = item.value === "priceless";
          const showPrice = pricesRevealed && i < revealedItems;
          return (
            <div
              key={item.name}
              style={{
                display: "grid",
                gridTemplateColumns: "auto 1fr auto",
                gap: 18,
                alignItems: "center",
                padding: "18px 22px",
                borderRadius: 12,
                background: C.surface,
                border: `1px solid ${C.border}`,
              }}
            >
              <div
                style={{
                  width: sz(34),
                  height: sz(34),
                  borderRadius: "50%",
                  background: `${C.primary}20`,
                  color: C.primary,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  ...mono,
                  fontSize: sz(13),
                  fontWeight: 800,
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </div>
              <div>
                <div
                  style={{
                    ...sans,
                    fontSize: sz(20),
                    fontWeight: 700,
                    color: C.text,
                    letterSpacing: "-0.01em",
                    marginBottom: 3,
                  }}
                >
                  {item.name}
                </div>
                <div
                  style={{
                    ...serif,
                    fontSize: sz(15),
                    color: C.muted,
                    lineHeight: 1.45,
                  }}
                >
                  {item.desc}
                </div>
              </div>
              <div
                style={{
                  ...mono,
                  fontSize: sz(16),
                  fontWeight: 800,
                  color: showPrice
                    ? isPriceless
                      ? C.primary
                      : C.text
                    : C.muted,
                  letterSpacing: "0.02em",
                  whiteSpace: "nowrap",
                  opacity: showPrice ? 1 : 0.4,
                  transition: "all 0.4s ease",
                  transform: showPrice ? "translateY(0)" : "translateY(4px)",
                  filter: showPrice ? "none" : "blur(6px)",
                  userSelect: showPrice ? "auto" : "none",
                }}
              >
                {showPrice
                  ? isPriceless
                    ? "priceless"
                    : `€${item.value}`
                  : "€▒▒▒"}
              </div>
            </div>
          );
        })}
      </div>

      {allItemsRevealed && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 18,
            padding: "24px 28px",
            borderRadius: 16,
            background: C.text,
            color: onDark,
            boxShadow: `0 18px 40px -14px ${C.text}40`,
            animation: "fadeInUp 0.5s ease forwards",
          }}
        >
          <div>
            <div
              style={{
                ...mono,
                fontSize: sz(11),
                fontWeight: 700,
                color: "rgba(250,248,245,0.5)",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                marginBottom: 6,
              }}
            >
              Real value if bought separately
            </div>
            <div
              style={{
                ...sans,
                fontSize: sz(36),
                fontWeight: 700,
                color: "rgba(250,248,245,0.6)",
                letterSpacing: "-0.02em",
                textDecoration: "line-through",
                textDecorationThickness: 2,
              }}
            >
              €{totalNumeric}+
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div
              style={{
                ...mono,
                fontSize: sz(11),
                fontWeight: 700,
                color: C.primary,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                marginBottom: 6,
              }}
            >
              Tonight only
            </div>
            <div
              style={{
                ...sans,
                fontSize: sz(48),
                fontWeight: 800,
                color: C.primary,
                letterSpacing: "-0.03em",
                lineHeight: 1,
              }}
            >
              €47
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── SkoolJoinCard ─────────────────────────────────────────────────────────────
export function SkoolJoinCard({ C, mono, sans, serif, scale = 1 }: SlideProps) {
  const sz = (n: number) => Math.round(n * scale);
  const qrSize = sz(140);

  return (
    <div
      style={{
        maxWidth: 1500,
        margin: `${sz(40)}px auto 0`,
        padding: `${sz(32)}px ${sz(36)}px`,
        borderRadius: 18,
        background: C.surface,
        border: `1px solid ${C.border}`,
        display: "flex",
        alignItems: "center",
        gap: sz(40),
      }}
    >
      {/* QR codes side by side */}
      <div style={{ display: "flex", gap: sz(24), flexShrink: 0 }}>
        <QRBlock
          url={SKOOL_MONTHLY_URL}
          label="Monthly · €49/mo"
          sublabel="€49/mo"
          size={qrSize}
          C={C}
          mono={mono}
          sans={sans}
        />
        <QRBlock
          url={SKOOL_ANNUAL_URL}
          label="Annual · €399/yr"
          sublabel="Save 32%"
          size={qrSize}
          C={C}
          mono={mono}
          sans={sans}
        />
      </div>

      {/* Divider */}
      <div
        style={{
          width: 1,
          alignSelf: "stretch",
          background: C.border,
          flexShrink: 0,
        }}
      />

      {/* Right: details */}
      <div style={{ flex: 1 }}>
        <div
          style={{
            ...sans,
            fontSize: sz(13),
            color: C.muted,
            fontStyle: "italic",
            marginBottom: sz(10),
          }}
        >
          Not ready for the bootcamp? Join for accountability.
        </div>
        <div
          style={{
            ...mono,
            fontSize: sz(11),
            fontWeight: 700,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: C.primary,
            marginBottom: sz(6),
          }}
        >
          Premium membership
        </div>
        <div
          style={{
            ...sans,
            fontSize: sz(28),
            fontWeight: 700,
            color: C.text,
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
            marginBottom: sz(6),
          }}
        >
          Talent Mucho
        </div>
        <div
          style={{
            ...sans,
            fontSize: sz(15),
            color: C.muted,
            marginBottom: sz(20),
          }}
        >
          Live workshops · Vault access · Inner circle · Vibe coding sessions
        </div>

        {/* Pricing row */}
        <div
          style={{
            display: "flex",
            gap: sz(14),
            alignItems: "center",
            marginBottom: sz(20),
          }}
        >
          <div
            style={{
              padding: `${sz(10)}px ${sz(18)}px`,
              borderRadius: 100,
              border: `2px solid ${C.border}`,
              background: C.bg,
            }}
          >
            <div
              style={{
                ...mono,
                fontSize: sz(10),
                fontWeight: 700,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: C.muted,
                marginBottom: 2,
              }}
            >
              Monthly
            </div>
            <div
              style={{
                ...sans,
                fontSize: sz(20),
                fontWeight: 800,
                color: C.text,
                letterSpacing: "-0.02em",
              }}
            >
              €49{" "}
              <span style={{ fontSize: sz(12), fontWeight: 400, color: C.muted }}>
                /mo
              </span>
            </div>
          </div>
          <div style={{ ...mono, fontSize: sz(12), color: C.muted }}>or</div>
          <div
            style={{
              padding: `${sz(10)}px ${sz(18)}px`,
              borderRadius: 100,
              border: `2px solid ${C.primary}`,
              background: `${C.primary}15`,
            }}
          >
            <div
              style={{
                ...mono,
                fontSize: sz(10),
                fontWeight: 700,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: C.primary,
                marginBottom: 2,
              }}
            >
              Annual · save 32%
            </div>
            <div
              style={{
                ...sans,
                fontSize: sz(20),
                fontWeight: 800,
                color: C.text,
                letterSpacing: "-0.02em",
              }}
            >
              €399{" "}
              <span style={{ fontSize: sz(12), fontWeight: 400, color: C.muted }}>
                /yr
              </span>
            </div>
          </div>
        </div>

        <div
          style={{
            ...mono,
            fontSize: sz(11),
            color: C.primary,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: sz(6),
          }}
        >
          ✦ Price goes to €97/mo soon ~ lock in €49 tonight
        </div>
        <div
          style={{
            ...mono,
            fontSize: sz(11),
            color: C.muted,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          Not happy? Message us directly ~ we&apos;ll refund you.
        </div>
      </div>
    </div>
  );
}

// ── ThreeDoorsOut ─────────────────────────────────────────────────────────────
export function ThreeDoorsOut({ C, mono, sans, serif, scale = 1 }: SlideProps) {
  const [activeDoor, setActiveDoor] = useState(1);
  const onDark = "#FAF8F5";
  const sz = (px: number) => Math.round(px * scale);

  return (
    <div style={{ maxWidth: 1500, margin: "56px auto 0" }}>
      <div
        style={{
          ...mono,
          fontSize: sz(13),
          fontWeight: 700,
          color: C.primary,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          marginBottom: 8,
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        <span
          style={{
            display: "inline-block",
            width: 22,
            height: 1,
            background: C.primary,
          }}
        />
        Three doors out
      </div>
      <div
        style={{
          ...sans,
          fontSize: sz(20),
          color: C.muted,
          marginBottom: 32,
          lineHeight: 1.5,
        }}
      >
        Three ways to use what you learned tonight. Mapped to how we work at
        Talent Mucho ~{" "}
        <span style={{ color: C.primary, fontWeight: 600 }}>
          Educate · Educate Deeper · Build &amp; Operate.
        </span>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 16,
          alignItems: "stretch",
        }}
      >
        {THREE_DOORS.map((door, i) => {
          const isActive = activeDoor === i;
          const accentBg = door.highlight
            ? C.primary
            : isActive
              ? C.text
              : C.surface;
          return (
            <div
              key={door.label}
              onClick={() => setActiveDoor(i)}
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "26px 26px 22px",
                borderRadius: 18,
                background: door.highlight
                  ? C.text
                  : isActive
                    ? C.surface2
                    : C.surface,
                border: `2px solid ${door.highlight ? C.primary : isActive ? C.primary : C.border}`,
                cursor: "pointer",
                transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                boxShadow: door.highlight
                  ? `0 24px 48px -12px ${C.primary}55`
                  : isActive
                    ? `0 12px 28px -10px ${C.text}25`
                    : "none",
                transform: door.highlight ? "translateY(-4px)" : "none",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {door.highlight && (
                <div
                  style={{
                    position: "absolute",
                    top: 14,
                    right: 16,
                    ...mono,
                    fontSize: sz(9),
                    fontWeight: 800,
                    color: C.text,
                    background: C.primary,
                    padding: "4px 10px",
                    borderRadius: 100,
                    letterSpacing: "0.18em",
                  }}
                >
                  RECOMMENDED
                </div>
              )}

              <div
                style={{
                  ...mono,
                  fontSize: sz(10),
                  fontWeight: 700,
                  color: door.highlight ? C.primary : C.muted,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  marginBottom: 8,
                }}
              >
                {door.label}
              </div>
              <div
                style={{
                  ...sans,
                  fontSize: sz(34),
                  fontWeight: 700,
                  color: door.highlight ? onDark : C.text,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.05,
                  marginBottom: 4,
                }}
              >
                {door.name}
              </div>
              <div
                style={{
                  ...sans,
                  fontSize: sz(18),
                  color: C.primary,
                  marginBottom: 14,
                  lineHeight: 1.3,
                }}
              >
                ~ {door.italic}
              </div>
              <div
                style={{
                  ...sans,
                  fontSize: sz(16),
                  fontWeight: 600,
                  color: door.highlight ? onDark : C.text,
                  marginBottom: 14,
                  lineHeight: 1.4,
                }}
              >
                {door.pitch}
              </div>
              <div
                style={{
                  ...sans,
                  fontSize: sz(15),
                  color: door.highlight
                    ? "rgba(250,248,245,0.7)"
                    : C.muted,
                  marginBottom: 16,
                  lineHeight: 1.45,
                  paddingBottom: 12,
                  borderBottom: `1px solid ${door.highlight ? "rgba(250,248,245,0.18)" : C.border}`,
                }}
              >
                <span
                  style={{
                    ...mono,
                    fontSize: sz(9),
                    fontWeight: 700,
                    color: C.primary,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    marginRight: 6,
                  }}
                >
                  Best for ~
                </span>
                {door.bestFor}
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 7,
                  marginBottom: 18,
                  flex: 1,
                }}
              >
                {door.whatYouGet.map((item, ii) => (
                  <div
                    key={ii}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 10,
                      ...sans,
                      fontSize: sz(15),
                      color: door.highlight
                        ? "rgba(250,248,245,0.88)"
                        : C.text,
                      lineHeight: 1.4,
                    }}
                  >
                    <span
                      style={{
                        ...mono,
                        fontSize: sz(12),
                        color: C.primary,
                        flexShrink: 0,
                        paddingTop: 2,
                      }}
                    >
                      ~
                    </span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: "auto" }}>
                <div
                  style={{
                    ...mono,
                    fontSize: sz(9),
                    fontWeight: 700,
                    color: C.primary,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    marginBottom: 6,
                  }}
                >
                  Next step ~
                </div>
                <div
                  style={{
                    ...sans,
                    fontSize: sz(15),
                    color: door.highlight
                      ? "rgba(250,248,245,0.78)"
                      : C.muted,
                    lineHeight: 1.5,
                    marginBottom: 14,
                  }}
                >
                  {door.nextStep}
                </div>
                <a
                  href={door.ctaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    display: "block",
                    padding: `${sz(14)}px ${sz(20)}px`,
                    borderRadius: 100,
                    textAlign: "center",
                    textDecoration: "none",
                    ...mono,
                    fontSize: sz(12),
                    fontWeight: 800,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    background: door.highlight
                      ? C.primary
                      : accentBg === C.text
                        ? C.primary
                        : C.text,
                    color: door.highlight
                      ? onDark
                      : accentBg === C.text
                        ? C.text
                        : onDark,
                    border: "none",
                    marginBottom: door.secondaryCta ? sz(10) : 0,
                  }}
                >
                  {door.cta} →
                </a>
                {door.secondaryCta && door.secondaryCtaUrl && (
                  <a
                    href={door.secondaryCtaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    style={{
                      display: "block",
                      padding: `${sz(12)}px ${sz(20)}px`,
                      borderRadius: 100,
                      textAlign: "center",
                      textDecoration: "none",
                      ...mono,
                      fontSize: sz(11),
                      fontWeight: 700,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      background: "transparent",
                      color: C.primary,
                      border: `1.5px solid ${C.primary}`,
                    }}
                  >
                    {door.secondaryCta} →
                  </a>
                )}
                {/* QR for each door */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: sz(16),
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: sz(6),
                    }}
                  >
                    <div
                      style={{
                        background: "#ffffff",
                        padding: sz(8),
                        borderRadius: sz(10),
                        border: `1.5px solid ${door.highlight ? C.primary : C.border}`,
                      }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(door.ctaUrl)}&margin=0&color=2A2520&bgcolor=ffffff`}
                        width={sz(80)}
                        height={sz(80)}
                        alt={`Scan for ${door.name}`}
                        style={{ display: "block" }}
                      />
                    </div>
                    <div
                      style={{
                        ...mono,
                        fontSize: sz(9),
                        fontWeight: 700,
                        color: door.highlight ? C.primary : C.muted,
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                      }}
                    >
                      Scan to join
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── BonusSlide ────────────────────────────────────────────────────────────────
export function BonusSlide({ C, mono, sans, scale = 1 }: SlideProps) {
  const sz = (n: number) => Math.round(n * scale);

  return (
    <div style={{ maxWidth: 1500, margin: `${sz(40)}px auto 0` }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: sz(14),
          marginBottom: sz(24),
        }}
      >
        <div
          style={{
            ...mono,
            fontSize: sz(10),
            fontWeight: 700,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: C.primary,
            padding: `${sz(4)}px ${sz(12)}px`,
            borderRadius: 100,
            border: `1px solid ${C.primary}`,
            background: `${C.primary}15`,
          }}
        >
          🎁 Bonus
        </div>
        <div style={{ flex: 1, height: 1, background: C.border }} />
      </div>

      <div
        style={{
          ...sans,
          fontSize: sz(26),
          fontWeight: 400,
          color: C.text,
          lineHeight: 1.2,
          marginBottom: sz(6),
        }}
      >
        Five things to do this week.
      </div>
      <div
        style={{
          ...sans,
          fontSize: sz(13),
          color: C.muted,
          marginBottom: sz(24),
          lineHeight: 1.5,
        }}
      >
        No setup needed. No paid tools. Just Claude and 15 minutes.
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: sz(14),
        }}
      >
        {BONUS_NUGGETS.map((n, i) => (
          <div
            key={i}
            style={{
              padding: `${sz(20)}px ${sz(22)}px`,
              borderRadius: 14,
              background: C.surface,
              border: `1px solid ${C.border}`,
              gridColumn: i === 4 ? "span 2" : undefined,
            }}
          >
            <div style={{ fontSize: sz(22), marginBottom: sz(8) }}>
              {n.icon}
            </div>
            <div
              style={{
                ...sans,
                fontSize: sz(13),
                fontWeight: 700,
                color: C.text,
                marginBottom: sz(6),
                letterSpacing: "-0.01em",
              }}
            >
              {n.title}
            </div>
            <div
              style={{
                ...sans,
                fontSize: sz(12),
                color: C.muted,
                lineHeight: 1.55,
              }}
            >
              {n.desc}
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          ...mono,
          fontSize: sz(11),
          color: C.primary,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          marginTop: sz(20),
          textAlign: "center",
        }}
      >
        ✦ These are in your workbook ~ take them home tonight
      </div>
    </div>
  );
}

// ── FreeGuideCTA ──────────────────────────────────────────────────────────────
export function FreeGuideCTA({ C, mono, sans, serif, scale = 1 }: SlideProps) {
  const sz = (px: number) => Math.round(px * scale);
  const onDark = "#FAF8F5";

  return (
    <div style={{ maxWidth: 1500, margin: "36px auto 0" }}>
      <div
        style={{
          position: "relative",
          background: C.text,
          color: onDark,
          borderRadius: sz(24),
          padding: `${sz(48)}px ${sz(44)}px`,
          overflow: "hidden",
          boxShadow: `0 32px 64px -20px ${C.text}55`,
        }}
      >
        {/* Glow accent */}
        <div
          style={{
            position: "absolute",
            top: "-30%",
            right: "-10%",
            width: "50%",
            height: "160%",
            background: `radial-gradient(ellipse, ${C.primary}40 0%, transparent 60%)`,
            pointerEvents: "none",
          }}
        />
        {/* Grid pattern */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "repeating-linear-gradient(0deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 48px), repeating-linear-gradient(90deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 48px)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            position: "relative",
            display: "grid",
            gridTemplateColumns: "1fr auto",
            gap: sz(48),
            alignItems: "center",
          }}
        >
          <div>
            <div
              style={{
                ...mono,
                fontSize: sz(11),
                fontWeight: 700,
                letterSpacing: "0.24em",
                textTransform: "uppercase",
                color: C.primary,
                marginBottom: sz(14),
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  width: sz(8),
                  height: sz(8),
                  borderRadius: "50%",
                  background: C.primary,
                  animation: "pulse 1.6s ease-in-out infinite",
                }}
              />
              Tonight only ~ free guide drop
            </div>
            <div
              style={{
                ...serif,
                fontSize: sz(56),
                fontWeight: 300,
                color: onDark,
                letterSpacing: "-0.025em",
                lineHeight: 1.05,
                marginBottom: sz(18),
              }}
            >
              Everything you saw tonight ~<br />
              <span style={{ color: C.primary }}>
                turned into your starter playbook.
              </span>
            </div>
            <div
              style={{
                ...sans,
                fontSize: sz(17),
                color: "rgba(250,248,245,0.78)",
                lineHeight: 1.55,
                maxWidth: sz(560),
              }}
            >
              We&apos;re posting it inside Skool ~ for free ~ at midnight
              tonight. Every prompt, every framework, every demo we just ran.
              Cleaned up, copy-paste ready, and yours forever.
            </div>
          </div>

          {/* QR + scan instruction */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: sz(14),
            }}
          >
            <div
              style={{
                ...mono,
                fontSize: sz(10),
                fontWeight: 700,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: C.primary,
              }}
            >
              Scan to claim
            </div>
            <div
              style={{
                background: "#FAF8F5",
                padding: sz(14),
                borderRadius: sz(16),
                boxShadow: `0 16px 32px -10px ${C.primary}80`,
                border: `2px solid ${C.primary}`,
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=${sz(220)}x${sz(220)}&data=${encodeURIComponent(SKOOL_FREE_URL)}&margin=0&color=2A2520&bgcolor=FAF8F5`}
                width={sz(200)}
                height={sz(200)}
                alt="Scan to join the free Skool community"
                style={{ display: "block" }}
              />
            </div>
            <div
              style={{
                ...sans,
                fontSize: sz(13),
                fontWeight: 600,
                color: onDark,
                letterSpacing: "0.02em",
                textAlign: "center",
              }}
            >
              Future Proof with AI
            </div>
            <div
              style={{
                ...sans,
                fontSize: sz(11),
                color: "rgba(250,248,245,0.55)",
                textAlign: "center",
              }}
            >
              Free tier · join in 30 seconds
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
