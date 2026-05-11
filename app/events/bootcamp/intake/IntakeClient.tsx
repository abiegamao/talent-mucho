"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Apple,
  BarChart3,
  Building2,
  CheckCircle2,
  Clock,
  Inbox,
  Layers,
  Mail,
  Monitor,
  PenLine,
  Sparkles,
  Target,
  TrendingUp,
  User,
  UserPlus,
  Users,
  Loader2,
} from "lucide-react";

import {
  SECTIONS,
  PEAK_TIME_OPTIONS,
  TOTAL_QUESTIONS,
  type BaseQuestion,
  type Option,
  type Section,
} from "./intake-config";

type IconComponent = React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
const ICONS: Record<string, IconComponent> = {
  Apple, BarChart3, Building2, Clock, Inbox, Layers, Mail, Monitor, PenLine,
  Sparkles, Target, TrendingUp, User, UserPlus, Users,
};

const DRAFT_KEY = "bootcamp-intake-draft";
const EMAIL_LOCAL_KEY = "bootcamp-intake-email";

type Answers = Record<string, string | string[] | undefined>;

interface FlatStep {
  sectionIndex: number;
  questionIndex: number;
  section: Section;
  question: BaseQuestion;
  globalIndex: number; // 0-based across all questions
}

function buildSteps(): FlatStep[] {
  const steps: FlatStep[] = [];
  let g = 0;
  SECTIONS.forEach((section, sectionIndex) => {
    section.questions.forEach((question, questionIndex) => {
      steps.push({ sectionIndex, questionIndex, section, question, globalIndex: g++ });
    });
  });
  return steps;
}

export default function IntakeClient() {
  const router = useRouter();
  const steps = useMemo(buildSteps, []);
  const [answers, setAnswers] = useState<Answers>({});
  const [currentStep, setCurrentStep] = useState(0);
  const [showSectionIntro, setShowSectionIntro] = useState(false);
  const [showSectionReveal, setShowSectionReveal] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);

  // Hydrate from sessionStorage
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(DRAFT_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as { answers?: Answers; step?: number };
        if (parsed.answers) setAnswers(parsed.answers);
        if (typeof parsed.step === "number" && parsed.step < steps.length) {
          setCurrentStep(parsed.step);
        }
      }
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, [steps.length]);

  // Persist draft
  useEffect(() => {
    if (!hydrated) return;
    try {
      sessionStorage.setItem(
        DRAFT_KEY,
        JSON.stringify({ answers, step: currentStep }),
      );
    } catch {
      /* ignore */
    }
  }, [answers, currentStep, hydrated]);

  // Focus first input on step change
  useEffect(() => {
    if (!hydrated) return;
    inputRef.current?.focus();
  }, [currentStep, hydrated, showSectionIntro]);

  // Show section intro when entering a new section (except section 0)
  useEffect(() => {
    if (!hydrated) return;
    const step = steps[currentStep];
    if (!step) return;
    if (step.questionIndex === 0 && step.section.weekTitle) {
      setShowSectionIntro(true);
    } else {
      setShowSectionIntro(false);
    }
  }, [currentStep, steps, hydrated]);

  // Auto-detect timezone once on mount
  useEffect(() => {
    if (!hydrated) return;
    if (!answers.timezone) {
      try {
        const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
        if (tz) setAnswers((a) => ({ ...a, timezone: tz }));
      } catch {
        /* ignore */
      }
    }
  }, [hydrated, answers.timezone]);

  if (!hydrated) {
    return (
      <div className="min-h-screen bg-beige-50 flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-clay-500" />
      </div>
    );
  }

  const step = steps[currentStep];
  const sectionsCompleted = step.sectionIndex;
  const progressPct = ((currentStep + 1) / steps.length) * 100;

  const setAnswer = (id: string, value: string | string[]) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
    setError(null);
  };

  const isAnswerValid = (q: BaseQuestion, raw: Answers): boolean => {
    const v = raw[q.id];
    if (q.required) {
      if (q.type === "multi") return Array.isArray(v) && v.length > 0;
      if (typeof v !== "string" || !v.trim()) return false;
      if (q.type === "email") return /.+@.+\..+/.test(v.trim());
    }
    if (q.type === "tz_and_peak") {
      return Boolean(raw.timezone && raw.peak_time);
    }
    return true;
  };

  const goNext = () => {
    if (!isAnswerValid(step.question, answers)) {
      setError(
        step.question.type === "email"
          ? "Please enter a valid email."
          : "Please fill this in before continuing.",
      );
      return;
    }

    // Detect end-of-section: next step is in a different section OR no next step
    const next = steps[currentStep + 1];
    const isSectionEnd = !next || next.sectionIndex !== step.sectionIndex;

    if (isSectionEnd && step.section.revealOnExit) {
      const revealText = step.section.revealOnExit(answers);
      setShowSectionReveal(revealText);
      // Reveal stays on screen for 1.4s then advances
      setTimeout(() => {
        setShowSectionReveal(null);
        if (next) {
          setCurrentStep(currentStep + 1);
        } else {
          void submit();
        }
      }, 1400);
      return;
    }

    if (!next) {
      void submit();
      return;
    }
    setCurrentStep(currentStep + 1);
  };

  const goBack = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const submit = async () => {
    setSubmitting(true);
    setError(null);
    try {
      const payload = {
        first_name: answers.first_name,
        email: answers.email,
        business_oneliner: answers.business_oneliner,
        first_focus: answers.first_focus,
        voice_owner: answers.voice_owner,
        ai_employee_role: answers.ai_employee_role,
        ai_employee_custom: answers.ai_employee_custom,
        dashboard_metrics: answers.dashboard_metrics,
        dashboard_custom: answers.dashboard_custom,
        os: answers.os,
        timezone: answers.timezone,
        peak_time: answers.peak_time,
        one_thing: answers.one_thing,
      };
      const res = await fetch("/api/events/bootcamp/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { message?: string };
        throw new Error(data.message || `Request failed (${res.status})`);
      }
      // Persist email so /done and /inside can fetch the full row
      try {
        const email = String(answers.email ?? "").toLowerCase();
        localStorage.setItem(EMAIL_LOCAL_KEY, email);
        sessionStorage.setItem(EMAIL_LOCAL_KEY, email);
      } catch { /* ignore */ }
      router.push("/events/bootcamp/intake/done");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong. Try again.");
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-beige-50 flex flex-col">
      {/* Progress strip */}
      <div className="sticky top-0 z-30 bg-beige-50/80 backdrop-blur border-b border-beige-200">
        <div className="section-container py-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-clay-500">
              Cohort 1 · Bootcamp Map
            </p>
            <p className="text-[11px] font-medium text-taupe-400 tabular-nums">
              {Math.min(currentStep + 1, TOTAL_QUESTIONS)} / {TOTAL_QUESTIONS}
            </p>
          </div>
          <div className="flex gap-1.5 h-1.5">
            {SECTIONS.map((s, i) => {
              const isComplete = i < sectionsCompleted;
              const isActive = i === sectionsCompleted;
              return (
                <div
                  key={s.id}
                  className="flex-1 rounded-full bg-beige-200 overflow-hidden"
                >
                  <div
                    className="h-full transition-all duration-500"
                    style={{
                      width: isComplete ? "100%" : isActive ? "60%" : "0%",
                      background: s.color,
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Section reveal overlay */}
      {showSectionReveal && (
        <div className="fixed inset-0 z-40 bg-charcoal-900/90 backdrop-blur-sm flex items-center justify-center animate-fade-in">
          <div className="max-w-md mx-auto text-center px-6 animate-fade-in-up">
            <div
              className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6"
              style={{ background: step.section.color, opacity: 0.2 }}
            >
              <CheckCircle2
                className="w-8 h-8"
                style={{ color: step.section.color }}
              />
            </div>
            <p
              className="text-[10px] font-bold uppercase tracking-[0.22em] mb-3"
              style={{ color: step.section.color }}
            >
              {step.section.weekLabel}
            </p>
            <h2
              className="text-3xl md:text-4xl font-light text-beige-50 leading-tight"
              style={{ fontFamily: "var(--font-cormorant), ui-serif, Georgia, serif" }}
            >
              {showSectionReveal}
            </h2>
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex items-center">
        <div className="section-container py-12 md:py-20 w-full">
          <div className="max-w-2xl mx-auto">
            {showSectionIntro && step.section.weekTitle ? (
              <SectionIntro
                section={step.section}
                onContinue={() => setShowSectionIntro(false)}
              />
            ) : (
              <QuestionView
                key={step.question.id}
                question={step.question}
                section={step.section}
                answers={answers}
                onChange={setAnswer}
                inputRef={inputRef as React.MutableRefObject<HTMLInputElement | HTMLTextAreaElement | null>}
              />
            )}

            {error && !showSectionIntro && (
              <p className="mt-4 text-sm text-red-600 font-medium animate-fade-in">
                {error}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Sticky footer */}
      {!showSectionIntro && (
        <div className="sticky bottom-0 z-30 bg-beige-50/95 backdrop-blur border-t border-beige-200">
          <div className="section-container py-4 flex items-center justify-between gap-4">
            <button
              onClick={goBack}
              disabled={currentStep === 0 || submitting}
              className="inline-flex items-center gap-1.5 text-sm font-light text-taupe-400 hover:text-charcoal-900 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back
            </button>
            <button
              onClick={goNext}
              disabled={submitting}
              className="inline-flex items-center gap-2 bg-clay-500 hover:bg-clay-600 text-beige-50 font-medium text-sm md:text-base px-7 md:px-9 py-3 md:py-4 rounded-full transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Locking in your map…
                </>
              ) : currentStep === steps.length - 1 ? (
                <>
                  Lock in my map
                  <ArrowRight className="w-4 h-4" />
                </>
              ) : (
                <>
                  Continue
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function SectionIntro({
  section,
  onContinue,
}: {
  section: Section;
  onContinue: () => void;
}) {
  return (
    <div className="text-center animate-fade-in-up">
      <p
        className="text-[10px] font-bold uppercase tracking-[0.22em] mb-4"
        style={{ color: section.color }}
      >
        {section.weekLabel}
      </p>
      <h2
        className="text-4xl md:text-5xl font-light text-charcoal-900 mb-6 leading-[1.05]"
        style={{ fontFamily: "var(--font-cormorant), ui-serif, Georgia, serif" }}
      >
        {section.weekTitle}
      </h2>
      <p className="text-lg text-espresso-800 font-light leading-relaxed max-w-xl mx-auto mb-10">
        {section.weekSubtitle}
      </p>
      <button
        onClick={onContinue}
        className="inline-flex items-center gap-2 bg-clay-500 hover:bg-clay-600 text-beige-50 font-medium text-base px-9 py-4 rounded-full transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5"
      >
        Start this section
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}

function QuestionView({
  question,
  section,
  answers,
  onChange,
  inputRef,
}: {
  question: BaseQuestion;
  section: Section;
  answers: Answers;
  onChange: (id: string, value: string | string[]) => void;
  inputRef: React.MutableRefObject<HTMLInputElement | HTMLTextAreaElement | null>;
}) {
  return (
    <div className="animate-fade-in-up">
      {section.weekLabel && (
        <p
          className="text-[10px] font-bold uppercase tracking-[0.22em] mb-4"
          style={{ color: section.color }}
        >
          {section.weekLabel}
        </p>
      )}
      <h1
        className="text-2xl md:text-4xl font-light text-charcoal-900 mb-3 leading-[1.15]"
        style={{ fontFamily: "var(--font-cormorant), ui-serif, Georgia, serif" }}
      >
        {question.label}
      </h1>
      <p className="text-sm text-taupe-400 font-light italic mb-8 leading-relaxed">
        {question.why}
      </p>

      {question.type === "text" && (
        <input
          ref={inputRef as React.MutableRefObject<HTMLInputElement | null>}
          type="text"
          value={(answers[question.id] as string) ?? ""}
          onChange={(e) => onChange(question.id, e.target.value)}
          placeholder={question.placeholder}
          maxLength={question.maxLength}
          className="w-full bg-white border border-beige-300 focus:border-clay-500 focus:ring-2 focus:ring-clay-500/20 outline-none rounded-2xl px-5 py-4 text-lg font-light text-charcoal-900 placeholder:text-taupe-400/60 transition-all"
        />
      )}

      {question.type === "email" && (
        <input
          ref={inputRef as React.MutableRefObject<HTMLInputElement | null>}
          type="email"
          inputMode="email"
          autoComplete="email"
          value={(answers[question.id] as string) ?? ""}
          onChange={(e) => onChange(question.id, e.target.value)}
          placeholder={question.placeholder}
          maxLength={question.maxLength}
          className="w-full bg-white border border-beige-300 focus:border-clay-500 focus:ring-2 focus:ring-clay-500/20 outline-none rounded-2xl px-5 py-4 text-lg font-light text-charcoal-900 placeholder:text-taupe-400/60 transition-all"
        />
      )}

      {question.type === "longtext" && (
        <textarea
          ref={inputRef as React.MutableRefObject<HTMLTextAreaElement | null>}
          value={(answers[question.id] as string) ?? ""}
          onChange={(e) => onChange(question.id, e.target.value)}
          placeholder={question.placeholder}
          maxLength={question.maxLength}
          rows={4}
          className="w-full bg-white border border-beige-300 focus:border-clay-500 focus:ring-2 focus:ring-clay-500/20 outline-none rounded-2xl px-5 py-4 text-base font-light text-charcoal-900 placeholder:text-taupe-400/60 transition-all resize-none"
        />
      )}

      {question.type === "cards" && (
        <CardGrid
          options={question.options ?? []}
          value={(answers[question.id] as string) ?? ""}
          onChange={(v) => onChange(question.id, v)}
          color={section.color}
          customField={question.customField}
          customValue={(answers[question.customField ?? ""] as string) ?? ""}
          onCustomChange={(v) =>
            question.customField && onChange(question.customField, v)
          }
        />
      )}

      {question.type === "multi" && (
        <MultiSelect
          options={question.options ?? []}
          values={(answers[question.id] as string[]) ?? []}
          onChange={(v) => onChange(question.id, v)}
          color={section.color}
          max={question.multiMax ?? 99}
          customField={question.customField}
          customValue={(answers[question.customField ?? ""] as string) ?? ""}
          onCustomChange={(v) =>
            question.customField && onChange(question.customField, v)
          }
        />
      )}

      {question.type === "toggle" && (
        <ToggleRow
          options={question.options ?? []}
          value={(answers[question.id] as string) ?? ""}
          onChange={(v) => onChange(question.id, v)}
          color={section.color}
        />
      )}

      {question.type === "tz_and_peak" && (
        <TzAndPeak
          timezone={(answers.timezone as string) ?? ""}
          peak={(answers.peak_time as string) ?? ""}
          onTimezone={(v) => onChange("timezone", v)}
          onPeak={(v) => onChange("peak_time", v)}
          color={section.color}
        />
      )}
    </div>
  );
}

function CardGrid({
  options,
  value,
  onChange,
  color,
  customField,
  customValue,
  onCustomChange,
}: {
  options: Option[];
  value: string;
  onChange: (v: string) => void;
  color: string;
  customField?: string;
  customValue: string;
  onCustomChange: (v: string) => void;
}) {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {options.map((opt) => {
          const selected = value === opt.value;
          const Icon = opt.icon ? ICONS[opt.icon] : null;
          return (
            <button
              key={opt.value}
              onClick={() => onChange(opt.value)}
              type="button"
              className={`text-left rounded-2xl p-5 transition-all duration-200 ${
                selected
                  ? "bg-white border-2 shadow-md -translate-y-0.5"
                  : "bg-white border border-beige-200 hover:border-clay-500 hover:shadow-md hover:-translate-y-0.5"
              }`}
              style={selected ? { borderColor: color } : undefined}
            >
              <div className="flex items-start gap-3">
                {Icon && (
                  <span
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{
                      background: selected ? `${color}25` : "#F5F0E8",
                      color: selected ? color : "#7D6B5A",
                    }}
                  >
                    <Icon className="w-5 h-5" />
                  </span>
                )}
                <div>
                  <p className="text-base font-medium text-charcoal-900 mb-0.5">
                    {opt.label}
                  </p>
                  {opt.hint && (
                    <p className="text-xs text-taupe-400 font-light leading-relaxed">
                      {opt.hint}
                    </p>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>
      {customField && value === "custom" && (
        <input
          type="text"
          value={customValue}
          onChange={(e) => onCustomChange(e.target.value)}
          placeholder="Describe it in a few words…"
          maxLength={200}
          className="mt-4 w-full bg-white border border-beige-300 focus:border-clay-500 focus:ring-2 focus:ring-clay-500/20 outline-none rounded-2xl px-5 py-4 text-base font-light text-charcoal-900 placeholder:text-taupe-400/60 transition-all"
        />
      )}
    </>
  );
}

function MultiSelect({
  options,
  values,
  onChange,
  color,
  max,
  customField,
  customValue,
  onCustomChange,
}: {
  options: Option[];
  values: string[];
  onChange: (v: string[]) => void;
  color: string;
  max: number;
  customField?: string;
  customValue: string;
  onCustomChange: (v: string) => void;
}) {
  const toggle = (v: string) => {
    if (values.includes(v)) {
      onChange(values.filter((x) => x !== v));
    } else if (values.length < max) {
      onChange([...values, v]);
    } else {
      // Replace oldest pick to keep within max
      onChange([...values.slice(1), v]);
    }
  };

  return (
    <>
      <p className="text-xs text-taupe-400 font-light italic mb-3">
        Pick up to {max}. {values.length}/{max} selected.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {options.map((opt) => {
          const selected = values.includes(opt.value);
          const Icon = opt.icon ? ICONS[opt.icon] : null;
          return (
            <button
              key={opt.value}
              onClick={() => toggle(opt.value)}
              type="button"
              className={`text-left rounded-2xl p-4 transition-all duration-200 ${
                selected
                  ? "bg-white border-2 shadow-md"
                  : "bg-white border border-beige-200 hover:border-clay-500"
              }`}
              style={selected ? { borderColor: color } : undefined}
            >
              <div className="flex items-center gap-3">
                {Icon && (
                  <span
                    className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                    style={{
                      background: selected ? `${color}25` : "#F5F0E8",
                      color: selected ? color : "#7D6B5A",
                    }}
                  >
                    <Icon className="w-4 h-4" />
                  </span>
                )}
                <p className="text-base font-medium text-charcoal-900">
                  {opt.label}
                </p>
              </div>
            </button>
          );
        })}
      </div>
      {customField && values.includes("custom") && (
        <input
          type="text"
          value={customValue}
          onChange={(e) => onCustomChange(e.target.value)}
          placeholder="Your custom metric…"
          maxLength={200}
          className="mt-4 w-full bg-white border border-beige-300 focus:border-clay-500 focus:ring-2 focus:ring-clay-500/20 outline-none rounded-2xl px-5 py-4 text-base font-light text-charcoal-900 placeholder:text-taupe-400/60 transition-all"
        />
      )}
    </>
  );
}

function ToggleRow({
  options,
  value,
  onChange,
  color,
}: {
  options: Option[];
  value: string;
  onChange: (v: string) => void;
  color: string;
}) {
  return (
    <div className="grid grid-cols-2 gap-3 max-w-sm">
      {options.map((opt) => {
        const selected = value === opt.value;
        const Icon = opt.icon ? ICONS[opt.icon] : null;
        return (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            type="button"
            className={`flex items-center justify-center gap-2 rounded-2xl py-5 px-6 transition-all duration-200 ${
              selected
                ? "bg-white border-2 shadow-md -translate-y-0.5"
                : "bg-white border border-beige-200 hover:border-clay-500"
            }`}
            style={selected ? { borderColor: color } : undefined}
          >
            {Icon && (
              <Icon
                className="w-5 h-5"
                style={{ color: selected ? color : "#7D6B5A" }}
              />
            )}
            <span className="text-base font-medium text-charcoal-900">
              {opt.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function TzAndPeak({
  timezone,
  peak,
  onTimezone,
  onPeak,
  color,
}: {
  timezone: string;
  peak: string;
  onTimezone: (v: string) => void;
  onPeak: (v: string) => void;
  color: string;
}) {
  return (
    <div className="space-y-6">
      <div>
        <label className="text-xs font-semibold uppercase tracking-[0.18em] text-taupe-400 mb-2 block">
          Your timezone
        </label>
        <input
          type="text"
          value={timezone}
          onChange={(e) => onTimezone(e.target.value)}
          placeholder="e.g. America/New_York"
          className="w-full bg-white border border-beige-300 focus:border-clay-500 focus:ring-2 focus:ring-clay-500/20 outline-none rounded-2xl px-5 py-4 text-base font-light text-charcoal-900 placeholder:text-taupe-400/60 transition-all"
        />
        <p className="mt-2 text-xs text-taupe-400 font-light italic">
          We auto-detected this from your browser. Edit if it's wrong.
        </p>
      </div>
      <div>
        <label className="text-xs font-semibold uppercase tracking-[0.18em] text-taupe-400 mb-3 block">
          When are you sharpest?
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {PEAK_TIME_OPTIONS.map((opt) => {
            const selected = peak === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => onPeak(opt.value)}
                className={`rounded-2xl px-3 py-3 text-left transition-all duration-200 ${
                  selected
                    ? "bg-white border-2 shadow-md"
                    : "bg-white border border-beige-200 hover:border-clay-500"
                }`}
                style={selected ? { borderColor: color } : undefined}
              >
                <p className="text-sm font-medium text-charcoal-900">
                  {opt.label}
                </p>
                {opt.hint && (
                  <p className="text-[10px] text-taupe-400 font-light mt-0.5">
                    {opt.hint}
                  </p>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
