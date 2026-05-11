"use client";

import { useState, useEffect, useRef } from "react";
import {
  Calendar, Clock, Check, Apple, Monitor, Terminal, Download,
  Users, BookOpen, Hammer, Sparkles, Heart, AlertCircle,
} from "lucide-react";
import {
  SESSIONS, COMMON_SETUP, MAC_SETUP, WINDOWS_SETUP, OUTCOMES,
  SESSION_ANATOMY, WONT_COVER, ROOM_CODE,
} from "./curriculum-data";

const PIN = "2028";
const STORAGE_KEY = "tm_bootcamp_inside_unlocked";

export default function InsideClient() {
  const [unlocked, setUnlocked] = useState<boolean | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setUnlocked(window.sessionStorage.getItem(STORAGE_KEY) === "1");
  }, []);

  function handleUnlock() {
    window.sessionStorage.setItem(STORAGE_KEY, "1");
    setUnlocked(true);
  }

  if (unlocked === null) {
    return <div className="min-h-screen bg-beige-50" />;
  }

  if (!unlocked) {
    return <PinGate onUnlock={handleUnlock} />;
  }

  return <Curriculum />;
}

/* ──────────────────────────────────────────
   PIN GATE
────────────────────────────────────────── */
function PinGate({ onUnlock }: { onUnlock: () => void }) {
  const [val, setVal] = useState("");
  const [shake, setShake] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { inputRef.current?.focus(); }, []);

  function tryPin(v: string) {
    if (v === PIN) { onUnlock(); return; }
    if (v.length === 4) {
      setShake(true); setVal("");
      setTimeout(() => setShake(false), 500);
    } else {
      setVal(v);
    }
  }

  return (
    <div className="min-h-screen bg-charcoal-900 flex items-center justify-center px-4">
      <div className="flex flex-col items-center gap-6 max-w-sm text-center">
        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-clay-500">
          Talent Mucho · Cohort 1
        </p>
        <h1
          className="text-3xl md:text-4xl font-light text-beige-50 leading-tight"
          style={{ fontFamily: "var(--font-cormorant), ui-serif, Georgia, serif" }}
        >
          Members only.
        </h1>
        <p className="text-sm text-beige-300 font-light leading-relaxed">
          Enter your access PIN to continue. Your PIN was sent in your welcome email.
        </p>
        <input
          ref={inputRef}
          type="password"
          inputMode="numeric"
          maxLength={4}
          value={val}
          onChange={e => tryPin(e.target.value.replace(/\D/g, ""))}
          aria-label="Access PIN"
          placeholder="····"
          className={`bg-espresso-800 border border-white/10 rounded-xl text-beige-50 text-2xl text-center w-40 outline-none focus:border-clay-500 transition-all ${shake ? "animate-shake" : ""}`}
          style={{ letterSpacing: "0.6em", padding: "14px 16px 14px 28px" }}
        />
        <p className="text-xs text-beige-300/50 font-light">
          Lost your PIN? DM us in the Skool community.
        </p>
        <style>{`
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-6px); }
            75% { transform: translateX(6px); }
          }
          .animate-shake { animation: shake 0.4s ease; }
        `}</style>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────
   CURRICULUM (post-unlock)
────────────────────────────────────────── */
function Curriculum() {
  return (
    <>
      {/* 1. HERO */}
      <section className="pt-20 pb-20 md:pt-28 md:pb-24 bg-beige-50">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white border border-clay-500/30 rounded-full px-4 py-2 mb-7">
              <span className="w-2 h-2 rounded-full bg-clay-500 animate-pulse" />
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-clay-500">
                Cohort 1 · Members Only
              </span>
            </div>

            <h1
              className="font-light tracking-tight text-charcoal-900 mb-6 leading-[1.05]"
              style={{
                fontFamily: "var(--font-cormorant), ui-serif, Georgia, serif",
                fontSize: "clamp(2.75rem, 6.5vw, 5rem)",
              }}
            >
              Welcome to Cohort 1.
              <br />
              <em className="italic text-clay-500">Here&apos;s the map.</em>
            </h1>

            <p className="text-lg md:text-xl text-espresso-800 font-light leading-relaxed max-w-2xl mx-auto mb-8">
              Bookmark this page. We&apos;ll keep updating it as the cohort progresses ~ schedule
              tweaks, homework briefs, and any links you&apos;ll need live here.
            </p>

            <div className="flex flex-wrap justify-center gap-3">
              {[
                { icon: <Calendar className="w-3.5 h-3.5" />, label: "Starts Fri, Jun 5" },
                { icon: <Clock className="w-3.5 h-3.5" />, label: "Sat & Sun · 10 AM–1 PM EST" },
                { icon: <Users className="w-3.5 h-3.5" />, label: "Small group · live on Zoom" },
              ].map(({ icon, label }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-2 bg-white border border-beige-200 rounded-full px-4 py-2 text-sm text-espresso-800 font-light"
                >
                  <span className="text-taupe-400">{icon}</span>
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. STATS STRIP */}
      <div className="bg-beige-100 border-y border-beige-200 py-8">
        <div className="section-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto text-center">
            {[
              { val: "9", label: "live sessions" },
              { val: "27 hrs", label: "total instruction" },
              { val: "~80%", label: "live building" },
              { val: "4", label: "deliverables you keep" },
            ].map((s) => (
              <div key={s.label}>
                <p
                  className="text-3xl md:text-4xl font-light text-clay-500 leading-none mb-1"
                  style={{ fontFamily: "var(--font-cormorant), ui-serif, Georgia, serif" }}
                >
                  {s.val}
                </p>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-taupe-400">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. THE 4 OUTCOMES */}
      <section className="section-padding bg-beige-50">
        <div className="section-container">
          <div className="max-w-2xl mb-12">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-clay-500 mb-3">
              What you walk away with
            </p>
            <h2
              className="text-4xl md:text-5xl font-light text-charcoal-900 mb-4"
              style={{ fontFamily: "var(--font-cormorant), ui-serif, Georgia, serif" }}
            >
              Four real outcomes. Yours to keep.
            </h2>
            <p className="text-espresso-800 font-light leading-relaxed">
              Not notes. Not inspiration. Four artifacts running inside your business by graduation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {OUTCOMES.map((o) => (
              <div key={o.week} className="bg-white border border-beige-200 rounded-2xl overflow-hidden flex flex-col">
                <div className="px-5 py-4" style={{ background: o.color }}>
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-beige-50/70">
                    {o.week}
                  </p>
                  <p
                    className="text-xl font-light text-beige-50 leading-tight mt-1"
                    style={{ fontFamily: "var(--font-cormorant), ui-serif, Georgia, serif" }}
                  >
                    {o.title}
                  </p>
                </div>
                <div className="p-5 flex-1">
                  <p className="text-sm text-charcoal-900 font-light leading-relaxed">
                    {o.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. PRE-BOOTCAMP SETUP */}
      <SetupSection />

      {/* 5. SESSION ANATOMY */}
      <section className="section-padding bg-beige-50">
        <div className="section-container">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-clay-500 mb-3">
                Anatomy of a session
              </p>
              <h2
                className="text-4xl md:text-5xl font-light text-charcoal-900 mb-4 leading-tight"
                style={{ fontFamily: "var(--font-cormorant), ui-serif, Georgia, serif" }}
              >
                What 3 hours <em className="italic text-clay-500">actually</em> looks like.
              </h2>
              <p className="text-espresso-800 font-light leading-relaxed max-w-xl mx-auto">
                This is a workshop, not a webinar. Roughly <span className="font-semibold">80% hands-on building</span>, 20% instruction. Here&apos;s how every session is structured.
              </p>
            </div>

            <div className="bg-white border border-beige-200 rounded-2xl overflow-hidden">
              {SESSION_ANATOMY.map((s, i) => (
                <div
                  key={s.range}
                  className={`grid grid-cols-[80px_1fr_auto] md:grid-cols-[110px_120px_1fr_auto] gap-4 items-center px-5 md:px-7 py-4 ${i < SESSION_ANATOMY.length - 1 ? "border-b border-beige-200" : ""}`}
                >
                  <span className="text-[11px] font-mono text-taupe-400 whitespace-nowrap">
                    {s.range}
                  </span>
                  <span
                    className={`text-[10px] font-bold uppercase tracking-[0.16em] px-2.5 py-1 rounded-full inline-block w-fit ${
                      s.kind === "build"
                        ? "bg-clay-500/15 text-clay-500 border border-clay-500/30"
                        : "bg-beige-100 text-taupe-400 border border-beige-200"
                    }`}
                  >
                    {s.kind === "build" ? "Build" : "Teach"}
                  </span>
                  <div className="col-span-2 md:col-span-1">
                    <p className="text-sm font-semibold text-charcoal-900">{s.label}</p>
                    <p className="text-xs text-taupe-400 font-light">{s.desc}</p>
                  </div>
                  <span className="hidden md:inline text-xs font-mono text-taupe-400 whitespace-nowrap">
                    {s.min} min
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-8 grid grid-cols-2 gap-5">
              <div className="bg-clay-500/10 border border-clay-500/20 rounded-xl p-5 text-center">
                <p className="text-3xl font-light text-clay-500 leading-none mb-2"
                  style={{ fontFamily: "var(--font-cormorant), ui-serif, Georgia, serif" }}
                >
                  ~135 min
                </p>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-clay-500">
                  Building
                </p>
              </div>
              <div className="bg-beige-100 border border-beige-200 rounded-xl p-5 text-center">
                <p className="text-3xl font-light text-taupe-400 leading-none mb-2"
                  style={{ fontFamily: "var(--font-cormorant), ui-serif, Georgia, serif" }}
                >
                  ~45 min
                </p>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-taupe-400">
                  Teaching
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. THE 9 SESSIONS */}
      <section className="section-padding bg-beige-100 border-y border-beige-200">
        <div className="section-container">
          <div className="max-w-2xl mb-12">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-clay-500 mb-3">
              The 9 sessions
            </p>
            <h2
              className="text-4xl md:text-5xl font-light text-charcoal-900 mb-4"
              style={{ fontFamily: "var(--font-cormorant), ui-serif, Georgia, serif" }}
            >
              Session by session, what we&apos;ll do.
            </h2>
            <p className="text-espresso-800 font-light leading-relaxed">
              Each card shows the date, what you&apos;ll build live, what we&apos;ll teach in service of that build, and the deliverable you walk away with.
            </p>
          </div>

          <div className="flex flex-col gap-5">
            {SESSIONS.map((s) => {
              const total = s.teachMin + s.buildMin;
              const buildPct = (s.buildMin / total) * 100;
              return (
                <div key={s.num} className="bg-white border border-beige-200 rounded-2xl overflow-hidden">
                  <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-0">
                    {/* Left rail */}
                    <div className="px-6 py-5 md:py-7" style={{ background: s.weekColor }}>
                      <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-beige-50/80 mb-2">
                        {s.num}
                      </p>
                      <p className="text-sm text-beige-50 font-medium mb-3">{s.date}</p>
                      <p
                        className="text-2xl font-light text-beige-50 leading-tight"
                        style={{ fontFamily: "var(--font-cormorant), ui-serif, Georgia, serif" }}
                      >
                        {s.title}{" "}
                        {s.italic && <em className="italic">{s.italic}</em>}
                      </p>
                    </div>

                    {/* Right body */}
                    <div className="p-6 md:p-7 flex flex-col gap-5">
                      {/* What you'll build live */}
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Hammer className="w-3.5 h-3.5 text-clay-500" />
                          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-clay-500">
                            What you&apos;ll build live
                          </p>
                        </div>
                        <p className="text-sm text-charcoal-900 font-light leading-relaxed">
                          {s.buildLive}
                        </p>
                      </div>

                      {/* What we'll teach */}
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <BookOpen className="w-3.5 h-3.5 text-taupe-400" />
                          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-taupe-400">
                            What we&apos;ll teach
                          </p>
                        </div>
                        <ul className="flex flex-col gap-1.5">
                          {s.teach.map((t, i) => (
                            <li key={i} className="flex gap-2 text-sm text-espresso-800 font-light leading-relaxed">
                              <span className="text-taupe-400 mt-1">·</span>
                              <span>{t}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Walk away */}
                      <div className="bg-beige-50 border-l-4 border-clay-500 rounded-r-lg px-4 py-3">
                        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-clay-500 mb-1">
                          Walk away with
                        </p>
                        <p className="text-sm text-charcoal-900 font-medium">{s.walkAway}</p>
                      </div>

                      {/* Build vs teach bar */}
                      <div>
                        <div className="flex justify-between text-[10px] font-mono text-taupe-400 mb-1.5">
                          <span>Building · {s.buildMin} min</span>
                          <span>Teaching · {s.teachMin} min</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-beige-200 overflow-hidden flex">
                          <div className="h-full bg-clay-500" style={{ width: `${buildPct}%` }} />
                          <div className="h-full bg-taupe-400/40" style={{ width: `${100 - buildPct}%` }} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. DAILY RITUAL */}
      <section className="section-padding bg-charcoal-900">
        <div className="section-container">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-clay-500 mb-3">
                Between sessions
              </p>
              <h2
                className="text-4xl md:text-5xl font-light text-beige-50 mb-4 leading-tight"
                style={{ fontFamily: "var(--font-cormorant), ui-serif, Georgia, serif" }}
              >
                The daily ritual.
                <br />
                <em className="italic text-clay-500">15 to 30 min, max.</em>
              </h2>
              <p className="text-beige-200 font-light leading-relaxed max-w-xl mx-auto">
                If you skip the days between sessions, you&apos;ll get half the value. The ritual is small on purpose ~ tiny daily reps compound across the month.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { num: "01", text: "Open Claude with yesterday's project loaded." },
                { num: "02", text: "Run the prompt from the homework brief." },
                { num: "03", text: "Ship one tiny improvement to your build." },
                { num: "04", text: "Drop a screenshot in the #wins channel." },
              ].map((step) => (
                <div key={step.num} className="bg-espresso-800/60 border border-white/5 rounded-xl p-5">
                  <p
                    className="text-3xl font-light text-clay-500 leading-none mb-3"
                    style={{ fontFamily: "var(--font-cormorant), ui-serif, Georgia, serif" }}
                  >
                    {step.num}
                  </p>
                  <p className="text-sm text-beige-200 font-light leading-relaxed">{step.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 8. WHAT WE WON'T COVER */}
      <section className="section-padding bg-beige-50">
        <div className="section-container">
          <div className="max-w-3xl mx-auto">
            <div className="mb-10">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-clay-500 mb-3">
                Scope clarity
              </p>
              <h2
                className="text-4xl md:text-5xl font-light text-charcoal-900 mb-4 leading-tight"
                style={{ fontFamily: "var(--font-cormorant), ui-serif, Georgia, serif" }}
              >
                What we <em className="italic text-clay-500">won&apos;t</em> cover.
              </h2>
              <p className="text-espresso-800 font-light leading-relaxed">
                We&apos;d rather be sharp on a small surface area than vague across everything. Here&apos;s what&apos;s out of scope ~ so you know up front.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              {WONT_COVER.map((item, i) => (
                <div key={i} className="flex items-start gap-3 bg-white border border-beige-200 rounded-xl px-5 py-4">
                  <AlertCircle className="w-4 h-4 text-taupe-400 shrink-0 mt-0.5" />
                  <p className="text-sm text-espresso-800 font-light leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 9. CODE OF THE ROOM */}
      <section className="section-padding bg-beige-100 border-y border-beige-200">
        <div className="section-container">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-clay-500 mb-3">
                Code of the room
              </p>
              <h2
                className="text-4xl md:text-5xl font-light text-charcoal-900 mb-4 leading-tight"
                style={{ fontFamily: "var(--font-cormorant), ui-serif, Georgia, serif" }}
              >
                Five small commitments.
              </h2>
              <p className="text-espresso-800 font-light leading-relaxed">
                Cohort 1 only works if everyone in the room agrees to these.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              {ROOM_CODE.map((c, i) => (
                <div key={c.title} className="bg-white border border-beige-200 rounded-2xl px-6 py-5 flex gap-5 items-start">
                  <span
                    className="text-3xl font-light leading-none text-beige-300 shrink-0"
                    style={{ fontFamily: "var(--font-cormorant), ui-serif, Georgia, serif" }}
                  >
                    0{i + 1}
                  </span>
                  <div>
                    <p className="font-semibold text-charcoal-900 text-base mb-1">{c.title}</p>
                    <p className="text-sm text-taupe-400 font-light leading-relaxed">{c.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 10. NOTE FROM INSTRUCTORS */}
      <section className="section-padding bg-charcoal-900">
        <div className="section-container">
          <div className="max-w-2xl mx-auto text-center">
            <Heart className="w-6 h-6 text-clay-500 mx-auto mb-6" />
            <h2
              className="text-3xl md:text-4xl font-light text-beige-50 mb-6 leading-tight"
              style={{ fontFamily: "var(--font-cormorant), ui-serif, Georgia, serif" }}
            >
              A note from <em className="italic text-clay-500">us.</em>
            </h2>
            <p className="text-beige-200 font-light leading-relaxed mb-5">
              You took a chance on Cohort 1. We don&apos;t take that lightly.
            </p>
            <p className="text-beige-200 font-light leading-relaxed mb-5">
              Show up. Build the boring thing first. Ask the dumb question (it isn&apos;t dumb). By July 1, AI will be running inside your business in ways most people are still talking about doing &ldquo;eventually.&rdquo;
            </p>
            <p
              className="text-beige-50 text-lg font-light italic mt-8"
              style={{ fontFamily: "var(--font-cormorant), ui-serif, Georgia, serif" }}
            >
              See you Friday, June 5.
            </p>
            <p className="text-sm text-beige-300/70 font-light mt-3">
              ~ Abie &amp; Meri
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

/* ──────────────────────────────────────────
   SETUP SECTION (Mac/Windows tabs)
────────────────────────────────────────── */
function SetupSection() {
  const [os, setOs] = useState<"mac" | "windows">("mac");
  const items = os === "mac" ? MAC_SETUP : WINDOWS_SETUP;

  return (
    <section className="section-padding bg-charcoal-900">
      <div className="section-container">
        <div className="max-w-3xl mx-auto">
          <div className="mb-12">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-clay-500 mb-3">
              Pre-bootcamp setup
            </p>
            <h2
              className="text-4xl md:text-5xl font-light text-beige-50 mb-4 leading-tight"
              style={{ fontFamily: "var(--font-cormorant), ui-serif, Georgia, serif" }}
            >
              Get this done <em className="italic text-clay-500">before</em> Fri, Jun 5.
            </h2>
            <p className="text-beige-200 font-light leading-relaxed">
              We want you building from minute 1 of Kickoff ~ not troubleshooting installs. Take 30 minutes this week to work through this list.
            </p>
          </div>

          {/* Common */}
          <div className="mb-10">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-beige-300/60 mb-4 flex items-center gap-2">
              <Sparkles className="w-3 h-3 text-clay-500" />
              Everyone
            </p>
            <div className="flex flex-col gap-3">
              {COMMON_SETUP.map((item) => (
                <SetupRow key={item.title} item={item} dark />
              ))}
            </div>
          </div>

          {/* Mac/Windows tabs */}
          <div>
            <div className="flex gap-2 mb-5">
              <button
                onClick={() => setOs("mac")}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  os === "mac"
                    ? "bg-clay-500 text-beige-50"
                    : "bg-espresso-800 text-beige-200 hover:bg-espresso-700/60 border border-white/10"
                }`}
              >
                <Apple className="w-4 h-4" />
                Mac
              </button>
              <button
                onClick={() => setOs("windows")}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  os === "windows"
                    ? "bg-clay-500 text-beige-50"
                    : "bg-espresso-800 text-beige-200 hover:bg-espresso-700/60 border border-white/10"
                }`}
              >
                <Monitor className="w-4 h-4" />
                Windows
              </button>
            </div>

            <div className="flex flex-col gap-3">
              {items.map((item) => (
                <SetupRow key={item.title} item={item} dark />
              ))}
            </div>
          </div>

          {/* Help callout */}
          <div className="mt-10 bg-espresso-800/60 border-l-4 border-clay-500 rounded-r-xl px-5 py-4 flex items-start gap-3">
            <Terminal className="w-4 h-4 text-clay-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-beige-50 mb-1">Stuck?</p>
              <p className="text-xs text-beige-200/70 font-light leading-relaxed">
                Drop a screenshot in the Skool <span className="font-mono text-clay-500">#setup-help</span> channel. Don&apos;t bring setup issues to your first live session.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SetupRow({ item, dark }: { item: { title: string; desc: string; link?: { label: string; href: string } }; dark?: boolean }) {
  return (
    <div className={`flex items-start gap-4 rounded-xl px-5 py-4 border ${dark ? "bg-espresso-800 border-white/5" : "bg-white border-beige-200"}`}>
      <span className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${dark ? "bg-clay-500/20 text-clay-500" : "bg-clay-500/10 text-clay-500"}`}>
        <Check className="w-3.5 h-3.5" strokeWidth={2.5} />
      </span>
      <div className="flex-1">
        <p className={`text-sm font-semibold mb-1 ${dark ? "text-beige-50" : "text-charcoal-900"}`}>{item.title}</p>
        <p className={`text-xs font-light leading-relaxed ${dark ? "text-beige-200/70" : "text-taupe-400"}`}>
          {item.desc}
        </p>
        {item.link && (
          <a
            href={item.link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-medium text-clay-500 hover:underline mt-1.5"
          >
            <Download className="w-3 h-3" />
            {item.link.label}
          </a>
        )}
      </div>
    </div>
  );
}
