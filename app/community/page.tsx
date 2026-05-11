import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Calendar, Users, Sparkles, Video, ArrowRight, Heart, BookOpen,
  Zap, Hammer,
} from "lucide-react";

export const metadata: Metadata = {
  title: "The Talent Mucho Community",
  description:
    "Free Skool community ~ replays, vault, and Abie's AI Playbooks. Join 560+ members learning Claude alongside other operators. Premium membership opens July 2026 after Cohort 1 graduates.",
  alternates: { canonical: "/community" },
  openGraph: {
    title: "The Talent Mucho Community",
    description:
      "Free Skool community ~ replays, vault, AI Playbooks. 560+ members learning Claude together.",
    url: "/community",
    type: "website",
    images: [
      {
        url: "/assets/website-samples/hero_image.png",
        width: 1200,
        height: 630,
        alt: "Talent Mucho Community",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Talent Mucho Community",
    description: "Free Skool community ~ 560+ members. Premium opens July 2026.",
    images: ["/assets/website-samples/hero_image.png"],
  },
};

const FREE_URL = "https://www.skool.com/future-proof-with-ai-4339/about?ref=1d469fcf6dfe460c8c681c23ea85a7a7";
const BOOTCAMP_URL = "/events/bootcamp";

const freePerks = [
  {
    icon: <Video className="w-4 h-4" />,
    title: "Free event replays",
    desc: "Every public workshop, training, and live event we run lands here. Watch on your time.",
  },
  {
    icon: <BookOpen className="w-4 h-4" />,
    title: "Free vault",
    desc: "Prompts, frameworks, playbook excerpts. Cleaned up after each event, free to copy.",
  },
  {
    icon: <Users className="w-4 h-4" />,
    title: "560+ members",
    desc: "Founders, coaches, agencies, freelancers ~ all learning AI alongside you.",
  },
  {
    icon: <Sparkles className="w-4 h-4" />,
    title: "Abie's AI Playbooks",
    desc: "Free and growing every week. New playbook drops show up in the feed first.",
  },
];

const premiumPreviewPerks = [
  {
    icon: <Calendar className="w-4 h-4" />,
    title: "Weekly group calls",
    desc: "Live every week. Build alongside the room ~ bring your project, get unstuck.",
  },
  {
    icon: <Video className="w-4 h-4" />,
    title: "Premium vault",
    desc: "Every replay, every workshop, every prompt we've ever built. Searchable, organised.",
  },
  {
    icon: <Hammer className="w-4 h-4" />,
    title: "Vibe coding sessions",
    desc: "Live build sessions where we make real things together with Claude Code.",
  },
  {
    icon: <Zap className="w-4 h-4" />,
    title: "30% off every bootcamp",
    desc: "Locked as long as you stay. Skip a cohort? Catch the next at 30% off.",
  },
];

const faqs = [
  {
    q: "When will premium open?",
    a: "July 2026, right after Cohort 1 of the bootcamp graduates. We want premium to launch with real alumni, real case studies, and a track record ~ not just promises. Join the free community now and you'll be first in line.",
  },
  {
    q: "Why not premium and bootcamp at the same time?",
    a: "Honest answer: we'd rather do one thing well than two things halfway. June is bootcamp month ~ Abie & Meri are heads-down delivering Cohort 1. Premium opens once we can give it the focus it deserves.",
  },
  {
    q: "Is the bootcamp paid or free?",
    a: "Paid ~ €247 for Cohort 1 (founding price). Includes the VIP bundle (€397 value): custom prompt buildout, priority DM access, 30-day premium-vault preview. See the full curriculum on the bootcamp page.",
  },
  {
    q: "What's in the free community right now?",
    a: "Replays of public events, the free vault (prompts and frameworks cleaned up after each session), Abie's AI Playbook library, and 560+ members posting wins, questions, and resources every week.",
  },
  {
    q: "Will premium have a founding rate?",
    a: "Yes. Free community members will get a one-time founding rate when premium opens ~ locked as long as you stay. Details announced in the community first.",
  },
];

export default function CommunityPage() {
  return (
    <>
      {/* ══════════════════════════════════════
          1. HERO
      ══════════════════════════════════════ */}
      <section className="pt-20 pb-20 md:pt-28 md:pb-24 bg-beige-50">
        <div className="section-container">
          <div className="max-w-4xl mx-auto text-center">

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

            <div className="inline-flex items-center gap-2 bg-white border border-clay-500/30 rounded-full px-4 py-2 mb-7">
              <span className="w-2 h-2 rounded-full bg-clay-500 animate-pulse shrink-0" />
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-clay-500">
                560+ members · Live on Skool
              </span>
            </div>

            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-taupe-400 mb-4">
              Talent Mucho · Community
            </p>

            <h1
              className="font-light tracking-tight text-charcoal-900 mb-6 leading-[1.05]"
              style={{
                fontFamily: "var(--font-cormorant), ui-serif, Georgia, serif",
                fontSize: "clamp(2.75rem, 6.5vw, 5.5rem)",
              }}
            >
              Learn AI <em className="italic text-clay-500">in the room.</em>
            </h1>

            <p className="text-lg md:text-xl text-espresso-800 font-light leading-relaxed max-w-2xl mx-auto mb-9">
              Free Skool community for replays, the vault, and Abie&apos;s growing playbook library.
              Premium membership opens July 2026 ~ after Cohort 1 of the bootcamp graduates.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <a
                href={FREE_URL}
                target="_blank"
                rel="noopener noreferrer"
                data-cta="community-hero-free"
                className="inline-flex items-center gap-2 bg-clay-500 hover:bg-clay-600 text-beige-50 font-medium text-base px-9 py-4 rounded-full transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5"
              >
                Join free on Skool
                <ArrowRight className="w-4 h-4" />
              </a>
              <Link
                href={BOOTCAMP_URL}
                className="inline-flex items-center justify-center px-9 py-4 text-base font-medium text-clay-500 border border-beige-300 rounded-full hover:border-clay-500 hover:bg-clay-500/5 transition-all duration-200"
              >
                See the bootcamp
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          2. WHY A COMMUNITY
      ══════════════════════════════════════ */}
      <section className="py-16 md:py-20 bg-charcoal-900">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-clay-500 mb-4">
              Why a community
            </p>
            <h2
              className="text-3xl md:text-4xl font-light text-beige-50 mb-6 leading-tight"
              style={{ fontFamily: "var(--font-cormorant), ui-serif, Georgia, serif" }}
            >
              Watching tutorials alone is <em className="italic text-clay-500">not</em> the same as building with operators in the room.
            </h2>
            <p className="text-beige-200 font-light leading-relaxed text-lg">
              We started this because every AI course we tried felt like watching someone else
              succeed. Here, you build alongside people exactly where you are ~ and the recording
              from last week is in the vault when this week&apos;s lesson hits.
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          3. FREE TIER ~ the focus
      ══════════════════════════════════════ */}
      <section id="free" className="section-padding bg-beige-50">
        <div className="section-container">
          <div className="max-w-2xl mb-12">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-clay-500 mb-3">
              What&apos;s open right now
            </p>
            <h2
              className="text-4xl md:text-5xl font-light text-charcoal-900 mb-4"
              style={{ fontFamily: "var(--font-cormorant), ui-serif, Georgia, serif" }}
            >
              The free community.
            </h2>
            <p className="text-espresso-800 font-light leading-relaxed">
              The free tier is real ~ not a teaser. We share replays from every public event, our
              growing playbook library, and a free vault of prompts cleaned up after each workshop.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {freePerks.map((p) => (
              <div
                key={p.title}
                className="bg-white border border-beige-200 rounded-2xl p-6 flex flex-col gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-clay-500/10 flex items-center justify-center text-clay-500">
                  {p.icon}
                </div>
                <p className="font-semibold text-sm text-charcoal-900">{p.title}</p>
                <p className="text-xs text-taupe-400 font-light leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-white border border-beige-200 rounded-2xl p-7 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 max-w-3xl mx-auto">
            <div>
              <p className="font-semibold text-charcoal-900 text-base mb-1">Free, forever.</p>
              <p className="text-sm text-taupe-400 font-light">
                No card, no upsell. Sign up with your email and you&apos;re in.
              </p>
            </div>
            <a
              href={FREE_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-cta="community-free-card"
              className="inline-flex items-center gap-2 bg-charcoal-900 hover:bg-espresso-800 text-beige-50 font-medium text-sm px-7 py-3 rounded-full transition-all duration-200 shrink-0"
            >
              Join free on Skool
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          4. THE BOOTCAMP (the only paid offer right now)
      ══════════════════════════════════════ */}
      <section className="section-padding bg-charcoal-900">
        <div className="section-container">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-clay-500 mb-3">
                Want to go deeper?
              </p>
              <h2
                className="text-4xl md:text-5xl font-light text-beige-50 mb-4 leading-tight"
                style={{ fontFamily: "var(--font-cormorant), ui-serif, Georgia, serif" }}
              >
                The bootcamp is <em className="italic text-clay-500">the room</em> right now.
              </h2>
              <p className="text-beige-200 font-light leading-relaxed text-lg">
                One month. 9 live sessions. Four deliverables you keep. Cohort 1 founding price ~
                once it graduates, premium opens for everyone.
              </p>
            </div>

            <div className="bg-clay-500/10 border border-clay-500/40 rounded-2xl p-8 md:p-10">
              <div className="flex items-start gap-3 mb-5">
                <Calendar className="w-5 h-5 text-clay-500 mt-1" />
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-clay-500 mb-1">
                    Cohort 1 · Starts Fri, Jun 5, 2026
                  </p>
                  <p className="text-2xl md:text-3xl font-light text-beige-50 leading-tight"
                    style={{ fontFamily: "var(--font-cormorant), ui-serif, Georgia, serif" }}
                  >
                    AI Business Bootcamp ~ <em className="italic text-clay-500">€247 founding price.</em>
                  </p>
                </div>
              </div>
              <p className="text-beige-200 font-light leading-relaxed mb-6 text-sm">
                Sat &amp; Sun · 10 AM–1 PM EST · Live on Zoom · Small group with live
                mentorship from Abie &amp; Meri. VIP bundle included free (€397 value).
              </p>
              <Link
                href={BOOTCAMP_URL}
                className="inline-flex items-center gap-2 bg-clay-500 hover:bg-clay-600 text-beige-50 font-medium text-base px-8 py-3.5 rounded-full transition-all duration-200"
              >
                See Cohort 1 details
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          5. PREMIUM PREVIEW (opens July 2026)
      ══════════════════════════════════════ */}
      <section id="premium" className="section-padding bg-beige-100 border-y border-beige-200">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 bg-white border border-clay-500/30 rounded-full px-4 py-2 mb-5">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-clay-500">
                  ✦ Opens July 2026
                </span>
              </div>
              <h2
                className="text-4xl md:text-5xl font-light text-charcoal-900 mb-4 leading-tight"
                style={{ fontFamily: "var(--font-cormorant), ui-serif, Georgia, serif" }}
              >
                Premium membership <em className="italic text-clay-500">~ coming after Cohort 1.</em>
              </h2>
              <p className="text-espresso-800 font-light leading-relaxed text-lg max-w-2xl mx-auto">
                We&apos;re launching premium with the alumni of Cohort 1 ~ real graduates, real case
                studies, real proof. Here&apos;s what&apos;s coming:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
              {premiumPreviewPerks.map((p) => (
                <div
                  key={p.title}
                  className="bg-white border border-beige-200 rounded-xl p-5 flex gap-4 items-start opacity-90"
                >
                  <div className="w-9 h-9 rounded-lg bg-beige-200 flex items-center justify-center shrink-0 mt-0.5 text-taupe-400">
                    {p.icon}
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-charcoal-900 mb-1">{p.title}</p>
                    <p className="text-xs text-taupe-400 font-light leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-charcoal-900 rounded-2xl p-7 md:p-9 text-center">
              <Heart className="w-6 h-6 text-clay-500 mx-auto mb-4" />
              <p
                className="text-xl md:text-2xl font-light text-beige-50 mb-3 leading-tight"
                style={{ fontFamily: "var(--font-cormorant), ui-serif, Georgia, serif" }}
              >
                Free community members get <em className="italic text-clay-500">first access</em> to premium when it opens.
              </p>
              <p className="text-beige-200 font-light text-sm mb-6 max-w-xl mx-auto">
                Including a one-time founding rate, locked as long as you stay. Join free now,
                we&apos;ll announce premium inside the community first.
              </p>
              <a
                href={FREE_URL}
                target="_blank"
                rel="noopener noreferrer"
                data-cta="community-premium-waitlist"
                className="inline-flex items-center gap-2 bg-clay-500 hover:bg-clay-600 text-beige-50 font-medium text-sm px-7 py-3 rounded-full transition-all duration-200"
              >
                Join free + get first access
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          6. FAQ
      ══════════════════════════════════════ */}
      <section className="section-padding bg-beige-50">
        <div className="section-container">
          <div className="max-w-3xl mx-auto">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-clay-500 mb-3 text-center">
              FAQ
            </p>
            <h2
              className="text-4xl md:text-5xl font-light text-charcoal-900 mb-12 text-center leading-tight"
              style={{ fontFamily: "var(--font-cormorant), ui-serif, Georgia, serif" }}
            >
              Quick answers.
            </h2>

            <div className="flex flex-col gap-4">
              {faqs.map((f, i) => (
                <div
                  key={i}
                  className="bg-white border border-beige-200 rounded-2xl p-6"
                >
                  <p className="text-base font-semibold text-charcoal-900 mb-2">{f.q}</p>
                  <p className="text-sm text-taupe-400 font-light leading-relaxed">{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          7. FINAL CTA
      ══════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-charcoal-900">
        <div className="section-container">
          <div className="max-w-2xl mx-auto text-center">
            <Heart className="w-7 h-7 text-clay-500 mx-auto mb-5" />
            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-light text-beige-50 mb-6 leading-[1.05]"
              style={{ fontFamily: "var(--font-cormorant), ui-serif, Georgia, serif" }}
            >
              The room is open.
              <br />
              <em className="italic text-clay-500">Pull up a chair.</em>
            </h2>
            <p className="text-beige-200 font-light leading-relaxed mb-10 text-lg">
              Whatever door you walk through ~ we&apos;ll see you in the chat.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <a
                href={FREE_URL}
                target="_blank"
                rel="noopener noreferrer"
                data-cta="community-final-free"
                className="inline-flex items-center gap-2 bg-clay-500 hover:bg-clay-600 text-beige-50 font-medium text-base px-9 py-4 rounded-full transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5"
              >
                Join free on Skool
                <ArrowRight className="w-4 h-4" />
              </a>
              <Link
                href={BOOTCAMP_URL}
                className="inline-flex items-center justify-center px-9 py-4 text-base font-medium text-beige-50 border border-white/20 rounded-full hover:border-clay-500 hover:bg-clay-500/10 transition-all duration-200"
              >
                See the bootcamp
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
