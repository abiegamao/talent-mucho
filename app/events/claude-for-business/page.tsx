import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Calendar, Clock, Video, Star, FileText, Share2,
  RefreshCw, BarChart2, Search, ArrowRight, MapPin, Users,
  Play, Mail, CheckCircle,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Claude AI for Business Owners | Talent Mucho",
  description:
    "A hands-on Zoom session covering Claude Chat, Code, and Cowork. 300 registered · 54 attended live. Watch the replay.",
};

// ── Update these when links are available ──────────────────────────────────
const REPLAY_URL = "https://www.skool.com/future-proof-with-ai-4339/classroom/8703f5c7?md=87c6f6f824bf48019ea5d7c392522a0c";
const BOOTCAMP_URL = "/events/bootcamp";

const agendaItems = [
  {
    num: "01",
    title: "Stop Using AI Like Google",
    tool: "Claude Chat",
    desc: "Most people use Claude like a search bar. We show you how to use it as a real thinking partner ~ for emails, client communication, content, decisions, and everything in between.",
  },
  {
    num: "02",
    title: "Automate the Stuff That Eats Your Week",
    tool: "Claude Code",
    desc: "No coding background needed. We show you how Claude Code builds automations, generates reports, and creates custom tools for your specific business. No developer. No tech skills. Just results.",
  },
  {
    num: "03",
    title: "AI That Actually Lives in Your Workflow",
    tool: "Claude Cowork",
    desc: "Claude Cowork works with your files, tasks, and day-to-day operations directly ~ not as a tab you open occasionally, but as something that runs alongside how you already work.",
  },
  {
    num: "04",
    title: "Bring Your Actual Problems",
    tool: "Open Q&A",
    desc: "Bring the tasks that frustrate you most. We map them to Claude workflows live, on screen, no filters. You leave with a plan for your business ~ not a generic one.",
  },
];

const painPoints = [
  {
    icon: <Mail className="w-4 h-4" />,
    title: "Writing and follow-up emails",
    desc: "Clients love hearing from you. You hate writing to them. Claude handles the whole thread.",
  },
  {
    icon: <FileText className="w-4 h-4" />,
    title: "Proposals and contracts",
    desc: "High value, high effort. Claude drafts them in minutes so you can close faster.",
  },
  {
    icon: <Share2 className="w-4 h-4" />,
    title: "Social media content",
    desc: "You need to stay visible. Claude keeps your feed alive without stealing your weekends.",
  },
  {
    icon: <RefreshCw className="w-4 h-4" />,
    title: "Repetitive customer questions",
    desc: "Same 10 questions, 50 times a month. Claude answers them your way, every time.",
  },
  {
    icon: <BarChart2 className="w-4 h-4" />,
    title: "Reports and summaries",
    desc: "The data exists. Turning it into something readable is the painful part. Not anymore.",
  },
  {
    icon: <Search className="w-4 h-4" />,
    title: "Research and competitive analysis",
    desc: "Hours of reading condensed into a clear brief. Claude does the digging so you can decide.",
  },
];

const audiencePills = [
  "Founders & CEOs",
  "Coaches & Consultants",
  "Agencies",
  "E-commerce Brands",
  "Service Businesses",
  "Startups",
  "Solopreneurs",
  "Anyone curious about AI",
];

export default function ClaudeEventPage() {
  return (
    <>
      {/* ══════════════════════════════════════
          SESSION COMPLETE BANNER
      ══════════════════════════════════════ */}
      <div className="bg-charcoal-900 border-b border-clay-500/20 py-3">
        <div className="section-container">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-center sm:text-left">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-clay-500 shrink-0" />
              <span className="text-beige-100 text-sm font-medium">
                Session complete · May 1, 2026
              </span>
            </div>
            <span className="hidden sm:block text-beige-100/20">·</span>
            <span className="text-beige-300 text-sm font-light">
              300 registered · <span className="text-clay-500 font-medium">54 attended live</span>
            </span>
            {REPLAY_URL && (
              <>
                <span className="hidden sm:block text-beige-100/20">·</span>
                <a
                  href={REPLAY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-clay-500 hover:text-clay-400 text-sm font-semibold transition-colors"
                >
                  <Play className="w-3.5 h-3.5" />
                  Watch replay
                </a>
              </>
            )}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════
          HERO — post-event
      ══════════════════════════════════════ */}
      <section className="pt-20 pb-16 md:pt-28 md:pb-24 bg-beige-50">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-12 lg:gap-16 items-start max-w-7xl mx-auto">

            {/* ── LEFT ── */}
            <div>
              <div className="flex items-center gap-4 mb-8">
                <Image
                  src="/assets/website-samples/hero_image.png"
                  alt="Abie Maxey and Meri"
                  width={120}
                  height={144}
                  className="w-24 object-contain drop-shadow-md"
                />
                <div>
                  <p className="text-espresso-800/50 text-sm font-light italic">
                    by Abie Maxey and Meri Gee
                  </p>
                  <p className="text-espresso-800/40 text-xs uppercase tracking-[0.18em] mt-1">
                    Talent Mucho · Educate
                  </p>
                </div>
              </div>

              {/* Badge — session complete */}
              <div className="inline-flex items-center gap-2 bg-white border border-beige-300 rounded-full px-4 py-2 mb-7">
                <CheckCircle className="w-3.5 h-3.5 text-clay-500 shrink-0" />
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-espresso-800">
                  Session Complete · May 1, 2026
                </span>
              </div>

              <p className="text-espresso-800/60 font-light text-lg mb-3 italic">Hey you,</p>
              <h1
                className="font-light tracking-tight text-charcoal-900 mb-6"
                style={{
                  fontFamily: "var(--font-cormorant), ui-serif, Georgia, serif",
                  fontSize: "clamp(2.75rem, 7vw, 5.5rem)",
                  lineHeight: 1.0,
                }}
              >
                This is where
                <br />
                <em className="italic text-clay-500">you start.</em>
              </h1>

              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-taupe-400 mb-4">
                Claude AI for Business Owners
              </p>

              <p className="text-base md:text-lg text-espresso-800 font-light leading-relaxed mb-8 max-w-xl">
                300 people registered. 54 joined live. The session covered Claude Chat, Code, and Cowork ~ real tools, real business tasks, no theory.
              </p>

              {/* Stats row */}
              <div className="flex flex-wrap gap-3 mb-8">
                {[
                  { icon: <Users className="w-3.5 h-3.5" />, label: "300 registered" },
                  { icon: <CheckCircle className="w-3.5 h-3.5" />, label: "54 attended live" },
                  { icon: <Calendar className="w-3.5 h-3.5" />, label: "May 1, 2026" },
                  { icon: <Clock className="w-3.5 h-3.5" />, label: "2 hours" },
                  { icon: <Star className="w-3.5 h-3.5" />, label: "Free to watch" },
                ].map(({ icon, label }) => (
                  <span
                    key={label}
                    className="inline-flex items-center gap-1.5 bg-white border border-beige-200 rounded-full px-3.5 py-1.5 text-xs text-espresso-800 font-medium"
                  >
                    <span className="text-taupe-400">{icon}</span>
                    {label}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm items-center">
                <Link
                  href="#replay"
                  className="text-clay-500 hover:text-clay-600 font-medium transition-colors inline-flex items-center gap-1"
                >
                  Watch the replay
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <span className="text-beige-300">·</span>
                <Link
                  href={BOOTCAMP_URL}
                  className="text-charcoal-900/70 hover:text-charcoal-900 font-medium transition-colors inline-flex items-center gap-1.5"
                >
                  <span className="inline-flex items-center gap-1 bg-clay-500/10 border border-clay-500/30 rounded-full px-2 py-0.5 text-[11px] font-semibold text-clay-500 uppercase tracking-[0.1em]">
                    New
                  </span>
                  Join the bootcamp
                </Link>
              </div>
            </div>

            {/* ── RIGHT: post-event card ── */}
            <div className="lg:sticky lg:top-24 self-start w-full">
              <div className="bg-white border border-beige-200 rounded-2xl p-7 md:p-8 shadow-elegant">
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle className="w-4 h-4 text-clay-500" />
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-clay-500">Session complete</span>
                </div>
                <p
                  className="text-2xl md:text-3xl font-light text-charcoal-900 mb-2 leading-tight"
                  style={{ fontFamily: "var(--font-cormorant), ui-serif, Georgia, serif" }}
                >
                  Registration is closed.
                </p>
                <p className="text-sm text-taupe-400 font-light mb-6 leading-relaxed">
                  This event has passed. 54 people joined us live on May 1st.
                </p>

                {/* Replay CTA */}
                <div id="replay" className="mb-5">
                  {REPLAY_URL ? (
                    <a
                      href={REPLAY_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 bg-charcoal-900 hover:bg-charcoal-800 text-beige-50 font-medium text-sm px-6 py-3.5 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg"
                    >
                      <Play className="w-4 h-4" />
                      Watch the replay
                    </a>
                  ) : (
                    <div className="w-full flex items-center justify-center gap-2 bg-charcoal-900/10 border border-charcoal-900/10 text-charcoal-900/40 text-sm px-6 py-3.5 rounded-xl cursor-default select-none">
                      <Play className="w-4 h-4" />
                      Replay coming soon
                    </div>
                  )}
                </div>

                {/* Bootcamp CTA */}
                <Link
                  href={BOOTCAMP_URL}
                  className="w-full flex items-center justify-center gap-2 bg-clay-500 hover:bg-clay-600 text-beige-50 font-medium text-sm px-6 py-3.5 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  Join the 4-week bootcamp
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <div className="mt-5 pt-5 border-t border-beige-200">
                  <p className="text-xs text-taupe-400 font-light leading-relaxed text-center">
                    Want the full experience? The bootcamp starts June 6 ~ 9 live sessions, 4 deliverables, your AI version built from scratch.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          REPLAY — dark · featured
      ══════════════════════════════════════ */}
      <section className="py-16 md:py-20 bg-charcoal-900 border-y border-white/5">
        <div className="section-container">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-clay-500/10 border border-clay-500/30 rounded-full px-4 py-2 mb-6">
              <Play className="w-3.5 h-3.5 text-clay-500" />
              <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-clay-500">Now available</span>
            </div>
            <h2
              className="text-4xl md:text-5xl font-light text-beige-50 mb-4 leading-tight"
              style={{ fontFamily: "var(--font-cormorant), ui-serif, Georgia, serif" }}
            >
              Missed it live?{" "}
              <em className="italic text-clay-500">Watch the replay.</em>
            </h2>
            <p className="text-beige-300 font-light text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
              The full 2-hour session ~ Claude Chat, Code, and Cowork, shown live on real business tasks. 54 people were in the room. Now you can be too.
            </p>

            {/* Replay CTA card */}
            <div className="max-w-3xl mx-auto mb-8">
              <a
                href={REPLAY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-6 bg-espresso-800 border border-white/10 hover:border-clay-500/40 rounded-2xl p-8 text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl"
              >
                <div className="w-16 h-16 rounded-full bg-clay-500 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-200">
                  <Play className="w-6 h-6 text-white ml-0.5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-beige-50 font-medium text-lg mb-1">Watch the full replay</p>
                  <p className="text-beige-300 font-light text-sm">2 hours · Claude Chat, Code &amp; Cowork · Hosted on Skool</p>
                </div>
                <ArrowRight className="w-5 h-5 text-clay-500 shrink-0 group-hover:translate-x-1 transition-transform duration-200" />
              </a>
            </div>

            <a
              href={REPLAY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-clay-500 hover:bg-clay-600 text-beige-50 font-medium text-base px-8 py-4 rounded-full transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5"
            >
              <Play className="w-4 h-4" />
              Watch the full replay
            </a>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          BOOTCAMP FEATURE — light
      ══════════════════════════════════════ */}
      <section className="py-16 md:py-24 bg-beige-50 border-b border-beige-200">
        <div className="section-container">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-clay-500/10 border border-clay-500/30 rounded-full px-4 py-2 mb-6">
                  <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-clay-500">What&apos;s next</span>
                </div>
                <h2
                  className="text-4xl md:text-5xl font-light text-charcoal-900 mb-5 leading-tight"
                  style={{ fontFamily: "var(--font-cormorant), ui-serif, Georgia, serif" }}
                >
                  Ready to go{" "}
                  <em className="italic text-clay-500">deeper?</em>
                </h2>
                <p className="text-espresso-800 font-light text-lg leading-relaxed mb-8">
                  The free session was the intro. The bootcamp is where you actually build ~ your voice, your ops, your AI employee, your dashboard. Live with us over 4 weeks.
                </p>

                <ul className="flex flex-col gap-4 mb-8">
                  {[
                    "Claude trained on your voice, your offers, your clients",
                    "1 AI employee in Cowork handling real work in your business",
                    "1 custom dashboard built with Claude Code ~ no prior coding",
                    "A Claude stack that thinks and works like you ~ 24/7",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full bg-clay-500 flex items-center justify-center shrink-0 mt-0.5">
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                          <path d="M2 5l2.5 2.5L8 2.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      <span className="text-sm text-espresso-800 font-light leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={BOOTCAMP_URL}
                  className="inline-flex items-center gap-2 bg-clay-500 hover:bg-clay-600 text-beige-50 font-medium text-base px-8 py-4 rounded-full transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5"
                >
                  See the bootcamp
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="bg-charcoal-900 rounded-3xl p-8 text-left">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-clay-500 mb-6">Cohort 1 · Jun 5 – Jun 28</p>
                {[
                  { week: "Week 1", title: "Your Claude Projects", desc: "Voice, ops, clients ~ Claude trained on your actual business" },
                  { week: "Week 2", title: "Your AI Employee", desc: "Cowork with file access ~ it executes tasks while you sleep" },
                  { week: "Week 3", title: "Claude Code", desc: "Describe it in English ~ Claude builds the software" },
                  { week: "Week 4", title: "The Full Stack", desc: "Everything running together in under 10 minutes a day" },
                ].map((item, i) => (
                  <div
                    key={item.week}
                    className={`flex gap-4 items-start ${i < 3 ? "mb-6 pb-6 border-b border-white/5" : ""}`}
                  >
                    <div className="w-8 h-8 rounded-lg bg-clay-500/20 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-clay-500">{i + 1}</span>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-beige-300/50 mb-0.5">{item.week}</p>
                      <p className="font-medium text-beige-50 text-sm mb-0.5">{item.title}</p>
                      <p className="text-xs text-beige-300 font-light leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
                <div className="mt-6 pt-6 border-t border-white/5 text-center">
                  <p className="text-beige-300/60 text-xs font-light mb-1">Founding price</p>
                  <p
                    className="text-3xl font-light text-beige-50"
                    style={{ fontFamily: "var(--font-cormorant), ui-serif, Georgia, serif" }}
                  >
                    €247
                  </p>
                  <p className="text-clay-500 text-xs font-medium mt-1">9 live sessions · 4 deliverables</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          COMMUNITY — light
      ══════════════════════════════════════ */}
      <section id="community" className="py-14 md:py-20 bg-beige-100 border-y border-beige-200 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-50">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-clay-500/15 rounded-full blur-[120px]" />
        </div>

        <div className="section-container relative">
          <div className="max-w-5xl mx-auto">
            <div className="bg-white border border-clay-500/30 rounded-3xl shadow-elegant overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-[auto_1fr_auto] gap-8 md:gap-12 items-center p-8 md:p-12">

                <div className="text-center md:text-left flex-shrink-0">
                  <div className="inline-flex items-center gap-2 bg-clay-500/10 border border-clay-500/30 rounded-full px-3 py-1 mb-4">
                    <span className="text-base">🔥</span>
                    <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-clay-500">And growing</span>
                  </div>
                  <div
                    className="text-7xl md:text-8xl font-light text-charcoal-900 leading-none"
                    style={{ fontFamily: "var(--font-cormorant), ui-serif, Georgia, serif" }}
                  >
                    <em className="italic text-clay-500">560+</em>
                  </div>
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-taupe-400 mt-2">
                    members
                  </p>
                  <p className="text-xs text-clay-500 italic mt-1 font-light">
                    and still growing daily
                  </p>
                </div>

                <div className="text-center md:text-left">
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-clay-500 mb-3">
                    Join our community
                  </p>
                  <h2
                    className="text-3xl md:text-4xl font-light text-charcoal-900 mb-4 leading-tight"
                    style={{ fontFamily: "var(--font-cormorant), ui-serif, Georgia, serif" }}
                  >
                    300 people said yes. <em className="italic text-clay-500">Will you?</em>
                  </h2>
                  <p className="text-espresso-800 font-light leading-relaxed text-base mb-5">
                    Our Skool community passed 560 members. Founders, VAs, freelancers, and operators ~ all building with AI together. <span className="text-clay-500 font-medium">Free to join.</span>
                  </p>

                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-2">
                      {['🌴', '☕', '🌸', '🍷', '⚡'].map((emoji, i) => (
                        <div
                          key={i}
                          className="w-9 h-9 rounded-full bg-gradient-to-br from-beige-200 to-beige-300 border-2 border-white flex items-center justify-center text-base shadow-sm"
                        >
                          {emoji}
                        </div>
                      ))}
                      <div className="w-9 h-9 rounded-full bg-clay-500 border-2 border-white flex items-center justify-center text-[10px] font-bold text-white shadow-sm">
                        +295
                      </div>
                    </div>
                    <p className="text-xs text-taupe-400 font-light italic">
                      and counting, every day
                    </p>
                  </div>
                </div>

                <div className="flex justify-center md:justify-end flex-shrink-0">
                  <a
                    href="https://www.skool.com/future-proof-with-ai-4339/about?ref=1d469fcf6dfe460c8c681c23ea85a7a7"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex flex-col items-center gap-2 bg-clay-500 hover:bg-clay-600 text-beige-50 font-medium text-base px-7 py-5 rounded-2xl transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5"
                  >
                    <span className="flex items-center gap-2">
                      Join the community
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                    </span>
                    <span className="text-[11px] uppercase tracking-[0.16em] font-semibold text-beige-50/70">
                      Free Skool tier
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          AUDIENCE — dark
      ══════════════════════════════════════ */}
      <section className="py-16 bg-charcoal-900">
        <div className="section-container text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-clay-500 mb-6">
            Who this is built for
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {audiencePills.map((pill) => (
              <span
                key={pill}
                className="border border-beige-100/15 rounded-full px-5 py-2.5 text-sm text-beige-200 font-light hover:border-clay-500 hover:text-beige-50 transition-colors duration-200 cursor-default"
              >
                {pill}
              </span>
            ))}
          </div>
          <p className="text-beige-300 font-light text-sm max-w-md mx-auto mb-10">
            If you run a business ~ or you&apos;re building one ~ and AI still feels like something you&apos;re supposed to figure out, this was your session. The replay is free.
          </p>

          <div className="max-w-2xl mx-auto bg-espresso-800/60 border border-clay-500/20 rounded-2xl px-8 py-7 text-left">
            <p className="text-beige-300/60 text-xs font-bold uppercase tracking-[0.2em] mb-3">Wait ~ not a business owner?</p>
            <p className="text-beige-50 text-lg font-light leading-relaxed mb-3"
              style={{ fontFamily: "var(--font-cormorant), ui-serif, Georgia, serif" }}>
              Actually ~ you are.
            </p>
            <p className="text-beige-200/70 text-sm font-light leading-relaxed">
              If you manage a household, freelance on the side, handle your own schedule and income, or support your family financially ~ you&apos;re already running a business. You just haven&apos;t called it that yet. This session was for you too.
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          AGENDA — light
      ══════════════════════════════════════ */}
      <section id="learn" className="section-padding bg-beige-50 border-y border-beige-200">
        <div className="section-container">
          <div className="max-w-xl mb-14">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-clay-500 mb-3">What we covered</p>
            <h2
              className="text-4xl md:text-5xl font-light text-charcoal-900 mb-4"
              style={{ fontFamily: "var(--font-cormorant), ui-serif, Georgia, serif" }}
            >
              The session agenda
            </h2>
            <p className="text-espresso-800 font-light leading-relaxed">
              No slides full of theory. Each tool was shown live on real business tasks. Watch the replay to see it all.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {agendaItems.map((item) => (
              <div
                key={item.num}
                className="bg-beige-100 border border-beige-200 rounded-2xl p-7 flex flex-col gap-4"
              >
                <div className="flex items-start justify-between gap-4">
                  <span
                    className="text-5xl font-light leading-none text-beige-300"
                    style={{ fontFamily: "var(--font-cormorant), ui-serif, Georgia, serif" }}
                  >
                    {item.num}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-clay-500 bg-clay-500/10 px-3 py-1.5 rounded-full shrink-0">
                    {item.tool}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-charcoal-900 text-base mb-2">{item.title}</p>
                  <p className="text-sm text-taupe-400 font-light leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          PAIN POINTS — dark
      ══════════════════════════════════════ */}
      <section className="section-padding bg-charcoal-900">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-14">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-clay-500 mb-4">
                The Real Question
              </p>
              <h2
                className="text-4xl md:text-5xl font-light text-beige-50 leading-snug"
                style={{ fontFamily: "var(--font-cormorant), ui-serif, Georgia, serif" }}
              >
                What would you do with{" "}
                <em className="italic text-clay-500">10 extra hours</em> every week?
              </h2>
            </div>
            <div>
              <p className="text-beige-200 font-light leading-relaxed text-lg">
                Most business owners are doing tasks that Claude can handle in minutes. Not someday ~ right now. The session showed exactly where your time is going and how to get it back.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {painPoints.map((p) => (
              <div
                key={p.title}
                className="bg-espresso-800 border border-white/5 rounded-xl p-5 flex gap-4 items-start"
              >
                <div className="w-8 h-8 rounded-lg bg-clay-500/20 flex items-center justify-center shrink-0 mt-0.5 text-clay-500">
                  {p.icon}
                </div>
                <div>
                  <p className="font-semibold text-sm text-beige-50 mb-1">{p.title}</p>
                  <p className="text-xs text-beige-300 font-light leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 p-7 border-l-4 border-clay-500 bg-espresso-800/60 rounded-r-2xl">
            <p
              className="text-xl text-beige-50 font-light leading-relaxed"
              style={{ fontFamily: "var(--font-cormorant), ui-serif, Georgia, serif" }}
            >
              This is not about future-proofing your business. It&apos;s about what Claude can do for your business ~ and your life ~ right now.
            </p>
            <p className="text-sm text-beige-300 font-light mt-2">Watch the replay. Then build.</p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          STAT STRIP
      ══════════════════════════════════════ */}
      <div className="bg-beige-100 border-y border-beige-200 py-12">
        <div className="section-container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="w-12 h-12 rounded-full bg-clay-500 flex items-center justify-center shrink-0">
                <Users className="w-5 h-5 text-beige-50" />
              </div>
              <div>
                <p className="font-semibold text-charcoal-900 text-base">500 registered · 54 attended live</p>
                <p className="text-sm text-taupe-400 font-light">
                  The replay is free ~ watch it whenever you&apos;re ready.
                </p>
              </div>
            </div>
            <Link
              href={BOOTCAMP_URL}
              className="inline-flex items-center gap-2 bg-clay-500 hover:bg-clay-600 text-beige-50 font-medium text-sm px-8 py-3.5 rounded-full transition-all duration-200 shadow-md hover:shadow-lg shrink-0"
            >
              Join the bootcamp
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════
          EVENT DETAILS + HOST — dark
      ══════════════════════════════════════ */}
      <section className="section-padding bg-charcoal-900">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-clay-500 mb-3">
                Event Details
              </p>
              <h2
                className="text-4xl md:text-5xl font-light text-beige-50 mb-10"
                style={{ fontFamily: "var(--font-cormorant), ui-serif, Georgia, serif" }}
              >
                About the session
              </h2>
              <div className="flex flex-col gap-6">
                {[
                  { icon: <Calendar className="w-4 h-4" />, key: "Date", val: "Friday, May 1, 2026" },
                  { icon: <Clock className="w-4 h-4" />, key: "Time", val: "6:00 PM to 8:00 PM EST" },
                  { icon: <Video className="w-4 h-4" />, key: "Format", val: "Live on Zoom · 54 attended", sub: "Replay available ~ watch at your own pace" },
                  { icon: <MapPin className="w-4 h-4" />, key: "Organizer", val: "Talent Mucho ~ Abie Maxey and Meri" },
                ].map(({ icon, key, val, sub }) => (
                  <div key={key} className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-lg bg-clay-500/20 flex items-center justify-center shrink-0 mt-0.5 text-clay-500">
                      {icon}
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-beige-300/60 mb-0.5">{key}</p>
                      <p className="font-medium text-beige-50 text-sm">{val}</p>
                      {sub && <p className="text-xs text-beige-300 font-light mt-0.5">{sub}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-clay-500 mb-3">
                Your Host
              </p>
              <h2
                className="text-4xl md:text-5xl font-light text-beige-50 mb-10"
                style={{ fontFamily: "var(--font-cormorant), ui-serif, Georgia, serif" }}
              >
                Meet the host
              </h2>
              <div className="flex gap-5 items-start mb-8">
                <Image
                  src="/assets/website-samples/hero_image.png"
                  alt="Abie Maxey and Meri Gee"
                  width={80}
                  height={96}
                  className="w-20 object-contain shrink-0 drop-shadow-md"
                />
                <div>
                  <p
                    className="text-2xl font-light text-beige-50 mb-0.5"
                    style={{ fontFamily: "var(--font-cormorant), ui-serif, Georgia, serif" }}
                  >
                    Abie Maxey &amp; Meri Gee
                  </p>
                  <p className="text-xs font-semibold uppercase tracking-[0.1em] text-clay-500 mb-4">
                    Tech · Business · AI
                  </p>
                  <p className="text-beige-200 font-light leading-relaxed text-sm">
                    Between the two of us, we bring tech, business strategy, and hands-on AI experience ~ and we combined all of it into something we wish we had when we were starting out.
                  </p>
                </div>
              </div>

              <div className="bg-espresso-800/60 border border-clay-500/20 rounded-2xl p-6">
                <p className="text-beige-200/60 text-xs font-bold uppercase tracking-[0.18em] mb-3">Our mission</p>
                <p
                  className="text-beige-50 text-lg font-light leading-relaxed mb-3"
                  style={{ fontFamily: "var(--font-cormorant), ui-serif, Georgia, serif" }}
                >
                  Tech + Business + AI = Superpowers.
                </p>
                <p className="text-beige-200/70 text-sm font-light leading-relaxed">
                  We built this event for people who are just getting started and want to maximise AI in their lives ~ not just at work, but everywhere. No gatekeeping. No overwhelm. Just real tools, real talk, and two people who genuinely want to see you win.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          FINAL CTA — bootcamp
      ══════════════════════════════════════ */}
      <section className="py-16 md:py-20 bg-beige-50 border-t border-beige-200">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-clay-500 mb-4">
              The next step
            </p>
            <h2
              className="text-3xl md:text-4xl font-light text-charcoal-900 mb-5 leading-tight"
              style={{ fontFamily: "var(--font-cormorant), ui-serif, Georgia, serif" }}
            >
              You watched the intro. Now build the real thing.
            </h2>
            <p className="text-espresso-800/70 font-light leading-relaxed mb-8">
              The bootcamp starts June 6. 9 live sessions. 4 weeks. You leave with the AI version of yourself ~ built live, owned forever.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href={BOOTCAMP_URL}
                className="inline-flex items-center gap-2 bg-clay-500 hover:bg-clay-600 text-beige-50 font-medium text-base px-9 py-4 rounded-full transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5"
              >
                Join the bootcamp ~ €247
                <ArrowRight className="w-4 h-4" />
              </Link>
              {REPLAY_URL && (
                <a
                  href={REPLAY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-beige-300 text-espresso-800 hover:border-clay-500 hover:text-clay-600 font-medium text-base px-9 py-4 rounded-full transition-all duration-200"
                >
                  <Play className="w-4 h-4" />
                  Watch the replay first
                </a>
              )}
            </div>
            <p className="text-xs text-taupe-400 font-light italic mt-4">
              Founding price · closes when cohort fills
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
