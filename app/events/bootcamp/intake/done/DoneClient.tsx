"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Calendar,
  Users,
  Sparkles,
  Loader2,
} from "lucide-react";
import type { IntakeResponse } from "@/lib/intake/types";
import {
  aiEmployeeLabel,
  dashboardMetricLabel,
  morningMoment,
  osLabel,
  projectNames,
} from "@/lib/intake/personalize";

const EMAIL_LOCAL_KEY = "bootcamp-intake-email";
const SKOOL_URL =
  "https://www.skool.com/future-proof-with-ai-4339/about?ref=1d469fcf6dfe460c8c681c23ea85a7a7";

export default function DoneClient() {
  const [intake, setIntake] = useState<IntakeResponse | null>(null);
  const [emailInput, setEmailInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    void hydrate();
  }, []);

  const hydrate = async () => {
    setLoading(true);
    setError(null);
    let email: string | null = null;
    try {
      email =
        sessionStorage.getItem(EMAIL_LOCAL_KEY) ||
        localStorage.getItem(EMAIL_LOCAL_KEY);
    } catch {
      /* ignore */
    }
    if (!email) {
      setLoading(false);
      return;
    }
    await fetchByEmail(email);
  };

  const fetchByEmail = async (email: string) => {
    try {
      const res = await fetch(
        `/api/events/bootcamp/intake/${encodeURIComponent(email.trim().toLowerCase())}`,
      );
      if (res.status === 404) {
        setError("We don't have your map yet. Want to build it?");
        setLoading(false);
        return;
      }
      if (!res.ok) {
        throw new Error(`Lookup failed (${res.status})`);
      }
      const data = (await res.json()) as IntakeResponse;
      setIntake(data);
      try {
        localStorage.setItem(EMAIL_LOCAL_KEY, data.email);
      } catch { /* ignore */ }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Lookup failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim()) return;
    setLoading(true);
    await fetchByEmail(emailInput);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-beige-50 flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-clay-500" />
      </div>
    );
  }

  if (!intake) {
    return (
      <div className="min-h-screen bg-beige-50 flex items-center">
        <div className="section-container py-20 w-full">
          <div className="max-w-md mx-auto text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-clay-500 mb-3">
              Your Bootcamp Map
            </p>
            <h1
              className="text-3xl md:text-4xl font-light text-charcoal-900 mb-4"
              style={{ fontFamily: "var(--font-cormorant), ui-serif, Georgia, serif" }}
            >
              Enter your email to see your map.
            </h1>
            {error && (
              <p className="text-sm text-red-600 mb-4">{error}</p>
            )}
            <form onSubmit={handleLookup} className="space-y-3">
              <input
                type="email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full bg-white border border-beige-300 focus:border-clay-500 focus:ring-2 focus:ring-clay-500/20 outline-none rounded-2xl px-5 py-4 text-base font-light text-charcoal-900 placeholder:text-taupe-400/60 transition-all"
              />
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 bg-clay-500 hover:bg-clay-600 text-beige-50 font-medium text-base px-7 py-4 rounded-full transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5"
              >
                Show me my map
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
            <p className="mt-6 text-sm text-taupe-400 font-light">
              No map yet?{" "}
              <Link href="/events/bootcamp/intake" className="text-clay-500 font-medium hover:text-clay-600">
                Build one →
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
  }

  const projects = projectNames(intake);
  const employee = aiEmployeeLabel(intake);
  const metric = dashboardMetricLabel(intake);
  const ritual = morningMoment(intake);
  const os = osLabel(intake);

  return (
    <div className="min-h-screen bg-beige-50">
      {/* Hero */}
      <section className="pt-20 pb-12 md:pt-28 md:pb-16 bg-charcoal-900 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[400px] bg-clay-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="section-container relative">
          <div className="max-w-3xl mx-auto text-center animate-fade-in-up">
            <div className="inline-flex items-center gap-2 bg-clay-500/15 border border-clay-500/40 rounded-full px-4 py-2 mb-7">
              <Sparkles className="w-3.5 h-3.5 text-clay-500" />
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-clay-500">
                Your Bootcamp Map · Cohort 1
              </span>
            </div>
            <h1
              className="font-light tracking-tight text-beige-50 mb-6 leading-[1.05]"
              style={{
                fontFamily: "var(--font-cormorant), ui-serif, Georgia, serif",
                fontSize: "clamp(2.75rem, 7vw, 5.5rem)",
              }}
            >
              Welcome to the room,
              <br />
              <em className="italic text-clay-500">{intake.first_name}</em>.
            </h1>
            {intake.business_oneliner && (
              <p className="text-lg md:text-xl text-beige-200 font-light leading-relaxed max-w-2xl mx-auto mb-2 italic">
                &ldquo;{intake.business_oneliner}&rdquo;
              </p>
            )}
            <p className="text-base text-beige-300/70 font-light max-w-xl mx-auto">
              Here's what we'll build for you across the next four weeks.
            </p>
          </div>
        </div>
      </section>

      {/* Four week cards */}
      <section className="py-16 md:py-20 bg-beige-50">
        <div className="section-container">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5">
            <WeekCard
              label="Week 01"
              color="#C4A882"
              title="Three Claude Projects"
              items={[projects.ops, projects.voice, projects.client]}
              delay={100}
            />
            <WeekCard
              label="Week 02"
              color="#7D6B5A"
              title="Your AI Employee"
              items={[employee, "Briefed in Cowork · tested on real scenarios"]}
              delay={200}
            />
            <WeekCard
              label="Week 03"
              color="#5A7A6B"
              title="Your custom Dashboard"
              items={[metric, `Built on ${os === "mac" ? "Mac" : "Windows"} with Claude Code`]}
              delay={300}
            />
            <WeekCard
              label="Week 04"
              color="#6B5A7A"
              title="Your daily Claude ritual"
              items={[
                `Morning moment · ${ritual.local}`,
                `Live sessions land at ${ritual.est} for you`,
              ]}
              delay={400}
            />
          </div>
        </div>
      </section>

      {/* Confirmation chip */}
      <section className="py-12 bg-beige-100 border-y border-beige-200">
        <div className="section-container">
          <div className="max-w-3xl mx-auto bg-white border border-beige-200 rounded-2xl p-6 md:p-7 shadow-sm flex items-start gap-4">
            <div className="w-11 h-11 rounded-xl bg-clay-500/15 flex items-center justify-center text-clay-500 shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-clay-500 mb-1">
                Confirmation
              </p>
              <p className="text-base font-light text-charcoal-900 leading-relaxed">
                We just sent your full map to <strong>{intake.email}</strong>.
                Calendar invites for all 9 sessions land before Friday, June 5.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Next steps */}
      <section className="py-16 md:py-20 bg-beige-50">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-clay-500 mb-3">
              What's next
            </p>
            <h2
              className="text-3xl md:text-4xl font-light text-charcoal-900 mb-8 leading-tight"
              style={{ fontFamily: "var(--font-cormorant), ui-serif, Georgia, serif" }}
            >
              Two things to do, while you wait for <em className="italic text-clay-500">June 5</em>.
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
              <Link
                href="/events/bootcamp/inside"
                className="group bg-white border border-beige-200 hover:border-clay-500 rounded-2xl p-6 text-left transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
              >
                <div className="w-10 h-10 rounded-xl bg-clay-500/15 flex items-center justify-center text-clay-500 mb-4">
                  <Calendar className="w-5 h-5" />
                </div>
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-clay-500 mb-2">
                  Step 01
                </p>
                <p className="text-lg font-medium text-charcoal-900 mb-1">
                  Open your member area
                </p>
                <p className="text-sm text-taupe-400 font-light leading-relaxed">
                  Curriculum, setup, and your personalized map. PIN: 2028.
                </p>
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-clay-500 mt-4 group-hover:gap-2 transition-all">
                  Open /inside <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>

              <a
                href={SKOOL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white border border-beige-200 hover:border-clay-500 rounded-2xl p-6 text-left transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
              >
                <div className="w-10 h-10 rounded-xl bg-clay-500/15 flex items-center justify-center text-clay-500 mb-4">
                  <Users className="w-5 h-5" />
                </div>
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-clay-500 mb-2">
                  Step 02
                </p>
                <p className="text-lg font-medium text-charcoal-900 mb-1">
                  Drop into Skool
                </p>
                <p className="text-sm text-taupe-400 font-light leading-relaxed">
                  We invite you to #cohort-1 within 24h. Lurk freely until then.
                </p>
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-clay-500 mt-4 group-hover:gap-2 transition-all">
                  Join free → <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </a>
            </div>

            <p className="text-sm text-taupe-400 font-light italic">
              See you Friday, June 5, {intake.first_name}.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

function WeekCard({
  label,
  color,
  title,
  items,
  delay,
}: {
  label: string;
  color: string;
  title: string;
  items: string[];
  delay: number;
}) {
  return (
    <div
      className="bg-white border border-beige-200 rounded-2xl overflow-hidden shadow-sm animate-fade-in-up"
      style={{ animationDelay: `${delay}ms`, animationFillMode: "both" }}
    >
      <div className="px-6 py-5" style={{ background: color }}>
        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-beige-50/80 mb-1">
          {label}
        </p>
        <p
          className="text-2xl md:text-3xl font-light text-beige-50 leading-tight"
          style={{ fontFamily: "var(--font-cormorant), ui-serif, Georgia, serif" }}
        >
          {title}
        </p>
      </div>
      <div className="p-6">
        <ul className="space-y-3">
          {items.map((item) => (
            <li
              key={item}
              className="flex items-start gap-2.5 text-sm text-charcoal-900 font-light leading-relaxed"
            >
              <span
                className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                style={{ background: color }}
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
