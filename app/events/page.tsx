import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight, Calendar, Clock, Users, Star, Video, Sparkles, Bell,
  PlayCircle, BookOpen,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Events & Workshops",
  description:
    "Live workshops, trainings, and bootcamps from Talent Mucho. Cohort 1 of the AI Business Bootcamp starts June 5, 2026. Past events and replays live in our free Skool community.",
  alternates: { canonical: "/events" },
  openGraph: {
    title: "Events & Workshops | Talent Mucho",
    description:
      "Live workshops, trainings, and bootcamps. Bootcamp Cohort 1 starts June 5. Replays of past events in the free Skool.",
    url: "/events",
    type: "website",
    images: [
      {
        url: "/assets/website-samples/hero_image.png",
        width: 1200,
        height: 630,
        alt: "Talent Mucho Events",
      },
    ],
  },
};

const FREE_SKOOL_URL = "https://www.skool.com/future-proof-with-ai-4339/about?ref=1d469fcf6dfe460c8c681c23ea85a7a7";

interface EventEntry {
  status: "upcoming" | "past";
  date: string;
  dateRange?: string;
  format: string;
  title: string;
  italic?: string;
  kicker: string;
  description: string;
  highlights: string[];
  meta?: string;
  cta: { label: string; href: string; primary?: boolean };
  secondary?: { label: string; href: string };
}

const upcoming: EventEntry[] = [
  {
    status: "upcoming",
    date: "Fri, Jun 5 ~ Sun, Jun 28, 2026",
    dateRange: "9 sessions over 4 weeks",
    format: "Live on Zoom · Small group",
    title: "AI Business Bootcamp",
    italic: "Cohort 1",
    kicker: "Cohort 1 · Founding price",
    description:
      "One month. Three tools. A business that runs differently. 9 live sessions, four real deliverables you walk away with, VIP bundle included free.",
    highlights: [
      "8 live sessions · Sat & Sun · 10 AM–1 PM EST (4–7 PM CEST · 10 PM–1 AM PHT)",
      "Week 1: 3 Claude Projects · Week 2: AI employee · Week 3: Custom dashboard · Week 4: Daily routine",
      "VIP bundle included free (€397 value)",
      "€247 founding price ~ Cohort 2 opens at €397",
    ],
    cta: { label: "See Cohort 1 details", href: "/events/bootcamp", primary: true },
    secondary: { label: "Read curriculum (members)", href: "/events/bootcamp/inside" },
  },
];

const past: EventEntry[] = [
  {
    status: "past",
    date: "Fri, May 1, 2026",
    format: "Free live Zoom training",
    title: "Claude AI for Business Owners",
    italic: "Free workshop",
    kicker: "May 2026 · Public training",
    description:
      "A free 2-hour Zoom workshop introducing Claude Chat, Claude Code, and Claude Cowork ~ what each one does, how we use them every day, and how to get started without any tech background.",
    highlights: [
      "270+ registered · 2-hour live workshop",
      "Live demos: file organisation, Instagram carousels, competitor analysis",
      "Open Q&A with real business problems mapped to Claude workflows",
      "Replay + workbook live in the free Skool community",
    ],
    cta: { label: "See the event page", href: "/events/claude-for-business" },
    secondary: { label: "Get the replay (free Skool)", href: FREE_SKOOL_URL },
  },
];

export default function EventsIndexPage() {
  return (
    <>
      {/* ══════════════════════════════════════
          1. HERO
      ══════════════════════════════════════ */}
      <section className="pt-20 pb-16 md:pt-28 md:pb-20 bg-beige-50">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center">

            <div className="flex flex-col items-center gap-3 mb-8">
              <Image
                src="/assets/website-samples/hero_image.png"
                alt="Abie Maxey and Meri Gee"
                width={120}
                height={144}
                className="w-24 object-contain drop-shadow-md"
              />
              <p className="text-espresso-800/60 text-sm font-light italic">
                hosted by Abie &amp; Meri
              </p>
            </div>

            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-clay-500 mb-4">
              Talent Mucho · Events
            </p>

            <h1
              className="font-light tracking-tight text-charcoal-900 mb-6 leading-[1.05]"
              style={{
                fontFamily: "var(--font-cormorant), ui-serif, Georgia, serif",
                fontSize: "clamp(2.75rem, 6.5vw, 5.5rem)",
              }}
            >
              Workshops, trainings,
              <br />
              <em className="italic text-clay-500">and bootcamps.</em>
            </h1>

            <p className="text-lg md:text-xl text-espresso-800 font-light leading-relaxed max-w-2xl mx-auto mb-8">
              Where we teach what we run inside our own businesses. Live, hands-on, no jargon ~
              and the replays of past events live free in the Skool community.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/events/bootcamp"
                className="inline-flex items-center gap-2 bg-clay-500 hover:bg-clay-600 text-beige-50 font-medium text-base px-9 py-4 rounded-full transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5"
              >
                See the bootcamp
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={FREE_SKOOL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-9 py-4 text-base font-medium text-clay-500 border border-beige-300 rounded-full hover:border-clay-500 hover:bg-clay-500/5 transition-all duration-200"
              >
                Get event updates ~ free Skool
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          2. UPCOMING
      ══════════════════════════════════════ */}
      <section className="section-padding bg-charcoal-900">
        <div className="section-container">
          <div className="max-w-2xl mb-12">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-clay-500 mb-3">
              Upcoming
            </p>
            <h2
              className="text-4xl md:text-5xl font-light text-beige-50 mb-4 leading-tight"
              style={{ fontFamily: "var(--font-cormorant), ui-serif, Georgia, serif" }}
            >
              What&apos;s next.
            </h2>
            <p className="text-beige-200 font-light leading-relaxed">
              Live cohorts, workshops, and trainings on the calendar. Seats are real, recordings
              go to attendees first, and the most useful ones become free replays in Skool.
            </p>
          </div>

          <div className="flex flex-col gap-5">
            {upcoming.map((e) => (
              <EventCard key={e.title} event={e} dark />
            ))}

            {/* Cohort 2 teaser */}
            <div className="bg-espresso-800/40 border border-dashed border-white/10 rounded-2xl px-6 md:px-8 py-7 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-beige-200/10 flex items-center justify-center shrink-0 mt-0.5 text-beige-300/60">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-semibold text-beige-50 text-sm mb-1">
                    Cohort 2 ~ planning for late summer 2026
                  </p>
                  <p className="text-xs text-beige-300 font-light leading-relaxed">
                    Same 4-week structure, opens at €397 (no founding discount). Free Skool members hear about it first.
                  </p>
                </div>
              </div>
              <a
                href={FREE_SKOOL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-clay-500 hover:text-beige-50 transition-colors shrink-0"
              >
                Join Skool to hear first
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          3. SKOOL FEATURE ~ updates hub
      ══════════════════════════════════════ */}
      <section className="section-padding bg-beige-100 border-y border-beige-200">
        <div className="section-container">
          <div className="max-w-4xl mx-auto bg-white border border-beige-200 rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-[1.5fr_1fr]">

            <div className="p-8 md:p-10">
              <div className="inline-flex items-center gap-2 bg-clay-500/10 border border-clay-500/30 rounded-full px-3 py-1.5 mb-5">
                <Bell className="w-3 h-3 text-clay-500" />
                <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-clay-500">
                  Where updates drop
                </span>
              </div>
              <h2
                className="text-3xl md:text-4xl font-light text-charcoal-900 mb-4 leading-tight"
                style={{ fontFamily: "var(--font-cormorant), ui-serif, Georgia, serif" }}
              >
                The Skool community is <em className="italic text-clay-500">our event hub.</em>
              </h2>
              <p className="text-espresso-800 font-light leading-relaxed mb-6">
                Every new workshop, training, and bootcamp gets announced inside Skool first ~
                with reminders, replays, and a place to ask questions. Free to join, 560+ members already.
              </p>

              <ul className="flex flex-col gap-3 mb-8">
                {[
                  { icon: <Bell className="w-3.5 h-3.5" />, text: "First to hear about new cohorts and workshops" },
                  { icon: <PlayCircle className="w-3.5 h-3.5" />, text: "Free replays of past public events" },
                  { icon: <BookOpen className="w-3.5 h-3.5" />, text: "Workbook + prompt vault from each event" },
                  { icon: <Users className="w-3.5 h-3.5" />, text: "560+ members posting wins and questions weekly" },
                ].map((b) => (
                  <li key={b.text} className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-md bg-clay-500/10 flex items-center justify-center shrink-0 mt-0.5 text-clay-500">
                      {b.icon}
                    </span>
                    <span className="text-sm text-charcoal-900 font-light leading-relaxed">{b.text}</span>
                  </li>
                ))}
              </ul>

              <a
                href={FREE_SKOOL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-clay-500 hover:bg-clay-600 text-beige-50 font-medium text-base px-8 py-3.5 rounded-full transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5"
              >
                Join free on Skool
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            <div className="bg-charcoal-900 p-8 md:p-10 flex flex-col justify-center">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-clay-500 mb-4">
                Skool community
              </p>
              <p
                className="text-5xl md:text-6xl font-light text-beige-50 leading-none mb-2"
                style={{ fontFamily: "var(--font-cormorant), ui-serif, Georgia, serif" }}
              >
                560+
              </p>
              <p className="text-sm text-beige-300 font-light mb-8">members &amp; growing</p>

              <div className="space-y-3">
                {[
                  { label: "Cost", value: "Free, forever" },
                  { label: "Format", value: "Live on Skool" },
                  { label: "Topics", value: "Claude · AI · Operators" },
                ].map((s) => (
                  <div key={s.label} className="flex items-center justify-between text-xs border-b border-white/10 pb-2.5 last:border-b-0">
                    <span className="text-beige-300/60 uppercase tracking-[0.14em] font-bold">{s.label}</span>
                    <span className="text-beige-100 font-medium">{s.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          4. PAST EVENTS
      ══════════════════════════════════════ */}
      <section className="section-padding bg-beige-50">
        <div className="section-container">
          <div className="max-w-2xl mb-12">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-clay-500 mb-3">
              Past events
            </p>
            <h2
              className="text-4xl md:text-5xl font-light text-charcoal-900 mb-4 leading-tight"
              style={{ fontFamily: "var(--font-cormorant), ui-serif, Georgia, serif" }}
            >
              What we&apos;ve run.
            </h2>
            <p className="text-espresso-800 font-light leading-relaxed">
              Receipts. Every public event below has its replay or workbook waiting in the free Skool.
            </p>
          </div>

          <div className="flex flex-col gap-5">
            {past.map((e) => (
              <EventCard key={e.title} event={e} />
            ))}
          </div>

          <div className="mt-10 text-center">
            <p className="text-sm text-taupe-400 font-light italic">
              We started running public workshops in May 2026. The list grows from here.
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          5. PRIVATE / CUSTOM
      ══════════════════════════════════════ */}
      <section className="section-padding bg-charcoal-900">
        <div className="section-container">
          <div className="max-w-2xl mx-auto text-center">
            <Sparkles className="w-7 h-7 text-clay-500 mx-auto mb-5" />
            <h2
              className="text-3xl md:text-4xl font-light text-beige-50 mb-5 leading-tight"
              style={{ fontFamily: "var(--font-cormorant), ui-serif, Georgia, serif" }}
            >
              Want us to run something <em className="italic text-clay-500">just for your team?</em>
            </h2>
            <p className="text-beige-200 font-light leading-relaxed mb-8">
              We do private workshops and custom AI trainings for teams of 5–50. Same hands-on
              format, scoped to your business. We take 1–2 of these per month.
            </p>
            <Link
              href="/booking"
              className="inline-flex items-center gap-2 bg-clay-500 hover:bg-clay-600 text-beige-50 font-medium text-base px-8 py-3.5 rounded-full transition-all duration-200"
            >
              Book a discovery call
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

/* ──────────────────────────────────────────
   Event card
────────────────────────────────────────── */
function EventCard({ event, dark }: { event: EventEntry; dark?: boolean }) {
  const isPast = event.status === "past";
  return (
    <article
      className={`rounded-2xl overflow-hidden border ${
        dark
          ? "bg-espresso-800/60 border-white/5"
          : "bg-white border-beige-200"
      }`}
    >
      <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-0">
        {/* Left rail ~ date */}
        <div className={`p-6 md:p-7 ${dark ? "bg-clay-500/10 md:bg-clay-500/5" : "bg-beige-100"}`}>
          <p className={`text-[10px] font-bold uppercase tracking-[0.22em] mb-2 ${dark ? "text-clay-500" : "text-clay-500"}`}>
            {event.kicker}
          </p>
          <p className={`text-base font-semibold mb-1 ${dark ? "text-beige-50" : "text-charcoal-900"}`}>
            {event.date}
          </p>
          {event.dateRange && (
            <p className={`text-xs font-light ${dark ? "text-beige-300/70" : "text-taupe-400"}`}>
              {event.dateRange}
            </p>
          )}
          <div className={`mt-4 inline-flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.14em] px-2.5 py-1 rounded-full ${
            isPast
              ? dark ? "bg-white/5 text-beige-300/70 border border-white/10" : "bg-beige-200 text-taupe-400"
              : "bg-clay-500/20 text-clay-500 border border-clay-500/30"
          }`}>
            {isPast ? <Clock className="w-3 h-3" /> : <Star className="w-3 h-3 fill-clay-500" />}
            {isPast ? "Past" : "Upcoming"}
          </div>
        </div>

        {/* Body */}
        <div className="p-6 md:p-8">
          <h3
            className={`text-2xl md:text-3xl font-light mb-2 leading-tight ${dark ? "text-beige-50" : "text-charcoal-900"}`}
            style={{ fontFamily: "var(--font-cormorant), ui-serif, Georgia, serif" }}
          >
            {event.title}{" "}
            {event.italic && <em className="italic text-clay-500">{event.italic}</em>}
          </h3>
          <p className={`text-xs font-medium uppercase tracking-[0.14em] mb-4 ${dark ? "text-beige-300/70" : "text-taupe-400"}`}>
            <Video className="w-3 h-3 inline-block mr-1.5" />
            {event.format}
          </p>
          <p className={`text-sm font-light leading-relaxed mb-5 ${dark ? "text-beige-200" : "text-espresso-800"}`}>
            {event.description}
          </p>

          <ul className="flex flex-col gap-2 mb-6">
            {event.highlights.map((h) => (
              <li key={h} className={`flex items-start gap-2 text-sm font-light leading-relaxed ${dark ? "text-beige-200/90" : "text-charcoal-900"}`}>
                <span className="text-clay-500 mt-1.5 text-[8px]">●</span>
                <span>{h}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-3">
            <Link
              href={event.cta.href}
              {...(event.cta.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" as const } : {})}
              className={`inline-flex items-center gap-2 ${
                event.cta.primary
                  ? "bg-clay-500 hover:bg-clay-600 text-beige-50"
                  : dark
                    ? "border border-white/15 hover:border-clay-500 text-beige-50"
                    : "border border-beige-300 hover:border-clay-500 text-clay-500"
              } font-medium text-sm px-6 py-3 rounded-full transition-all duration-200`}
            >
              {event.cta.label}
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            {event.secondary && (
              <Link
                href={event.secondary.href}
                {...(event.secondary.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" as const } : {})}
                className={`inline-flex items-center gap-2 text-sm font-medium px-6 py-3 transition-colors ${
                  dark ? "text-clay-500 hover:text-beige-50" : "text-taupe-400 hover:text-clay-500"
                }`}
              >
                {event.secondary.label}
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
