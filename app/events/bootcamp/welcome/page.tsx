import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight, Calendar, Check, Lock, Mail, MessageCircle,
  Sparkles, Star, Users, Heart,
} from "lucide-react";

export const metadata: Metadata = {
  title: "You're in ~ Cohort 1",
  description: "Welcome to Cohort 1 of the AI Business Bootcamp. Here's everything you need before Fri, Jun 5.",
  robots: { index: false, follow: false },
};

const INSIDE_URL = "/events/bootcamp/inside";
const FREE_SKOOL_URL = "https://www.skool.com/future-proof-with-ai-4339/about?ref=1d469fcf6dfe460c8c681c23ea85a7a7";
const PIN = "2028";

const schedule = [
  { tag: "Kickoff", date: "Fri, Jun 5", topic: "Welcome, orientation, Claude.ai setup" },
  { tag: "W1·S1", date: "Sat, Jun 6", topic: "Interface, Projects, your first conversation" },
  { tag: "W1·S2", date: "Sun, Jun 7", topic: "Custom instructions, file uploads" },
  { tag: "W2·S3", date: "Sat, Jun 13", topic: "AI employees ~ what Cowork makes real" },
  { tag: "W2·S4", date: "Sun, Jun 14", topic: "Build & test your first AI employee" },
  { tag: "W3·S5", date: "Sat, Jun 20", topic: "Claude Code ~ your first build" },
  { tag: "W3·S6", date: "Sun, Jun 21", topic: "Build your business dashboard" },
  { tag: "W4·S7", date: "Sat, Jun 27", topic: "Your full Claude stack working together" },
  { tag: "W4·S8", date: "Sun, Jun 28", topic: "Showcases & graduation" },
];

const happensNext = [
  {
    icon: <Mail className="w-4 h-4" />,
    when: "Within minutes",
    title: "Welcome email + receipt",
    desc: "Confirmation lands in your inbox. Add hello@talentmucho.com to your contacts so it doesn't drop into spam.",
  },
  {
    icon: <Users className="w-4 h-4" />,
    when: "Within 24 hours",
    title: "Skool invite ~ #cohort-1 channel",
    desc: "We invite you to the private Cohort 1 channel where homework, screenshots, and questions live all month.",
  },
  {
    icon: <Calendar className="w-4 h-4" />,
    when: "Before Fri, Jun 5",
    title: "Calendar invites for all 9 sessions",
    desc: "We'll send a single invite that drops all 9 sessions onto your calendar. You can decline what you can't attend.",
  },
  {
    icon: <MessageCircle className="w-4 h-4" />,
    when: "Day before Kickoff",
    title: "A personal note from Abie & Meri",
    desc: "We'll DM you directly to say hi, confirm setup, and ask what you want to build. This is your priority DM access ~ use it.",
  },
];

export default function BootcampWelcomePage() {
  return (
    <>
      {/* ══════════════════════════════════════
          1. HERO ~ confirmation
      ══════════════════════════════════════ */}
      <section className="pt-20 pb-20 md:pt-28 md:pb-24 bg-charcoal-900 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[400px] bg-clay-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="section-container relative">
          <div className="max-w-3xl mx-auto text-center">

            <div className="flex flex-col items-center gap-3 mb-8">
              <Image
                src="/assets/website-samples/hero_image.png"
                alt="Abie Maxey and Meri Gee"
                width={140}
                height={168}
                className="w-28 object-contain drop-shadow-md"
              />
              <p className="text-beige-300/60 text-sm font-light italic">
                from Abie &amp; Meri
              </p>
            </div>

            <div className="inline-flex items-center gap-2 bg-clay-500/15 border border-clay-500/40 rounded-full px-4 py-2 mb-7">
              <Star className="w-3.5 h-3.5 text-clay-500 fill-clay-500" />
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-clay-500">
                Payment received · Cohort 1 · Founding member
              </span>
            </div>

            <h1
              className="font-light tracking-tight text-beige-50 mb-6 leading-[1.05]"
              style={{
                fontFamily: "var(--font-cormorant), ui-serif, Georgia, serif",
                fontSize: "clamp(2.75rem, 7vw, 5.5rem)",
              }}
            >
              You&apos;re in.
              <br />
              <em className="italic text-clay-500">Welcome to Cohort 1.</em>
            </h1>

            <p className="text-lg md:text-xl text-beige-200 font-light leading-relaxed max-w-2xl mx-auto mb-9">
              Big breath. The hardest part is done ~ you&apos;ve committed. Now bookmark this page,
              read what&apos;s next, and we&apos;ll see you live on <span className="font-semibold text-beige-50">Friday, June 5</span>.
            </p>

            <Link
              href={INSIDE_URL}
              className="inline-flex items-center gap-2 bg-clay-500 hover:bg-clay-600 text-beige-50 font-medium text-base px-9 py-4 rounded-full transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5"
            >
              Open the curriculum
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          2. PIN + INSIDE ACCESS
      ══════════════════════════════════════ */}
      <section className="py-14 bg-beige-100 border-y border-beige-200">
        <div className="section-container">
          <div className="max-w-3xl mx-auto bg-white border border-beige-200 rounded-2xl p-7 md:p-9 shadow-elegant">
            <div className="flex items-start gap-4 mb-5">
              <div className="w-11 h-11 rounded-xl bg-clay-500/10 flex items-center justify-center shrink-0 text-clay-500">
                <Lock className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-clay-500 mb-2">
                  Step 01 · Save this access PIN
                </p>
                <p
                  className="text-2xl md:text-3xl font-light text-charcoal-900 leading-tight"
                  style={{ fontFamily: "var(--font-cormorant), ui-serif, Georgia, serif" }}
                >
                  Your members-only curriculum lives at <em className="italic text-clay-500">/events/bootcamp/inside</em>
                </p>
              </div>
            </div>

            <p className="text-sm text-taupe-400 font-light leading-relaxed mb-5">
              We&apos;ll keep updating that page all month with homework briefs, schedule tweaks,
              and any links you need. Bookmark it. Check it weekly.
            </p>

            <div className="bg-charcoal-900 rounded-xl px-6 py-5 flex items-center justify-between gap-4 mb-5">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-clay-500 mb-1">
                  Your PIN
                </p>
                <p
                  className="text-3xl md:text-4xl font-light text-beige-50 tabular-nums tracking-[0.4em]"
                  style={{ fontFamily: "var(--font-cormorant), ui-serif, Georgia, serif" }}
                >
                  {PIN}
                </p>
              </div>
              <Link
                href={INSIDE_URL}
                className="inline-flex items-center gap-2 bg-clay-500 hover:bg-clay-600 text-beige-50 font-medium text-sm px-6 py-3 rounded-full transition-all duration-200 shrink-0"
              >
                Open curriculum
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <p className="text-xs text-taupe-400 font-light italic">
              Lost this PIN later? It&apos;s the same one for the whole cohort ~ DM us in the Skool community and we&apos;ll resend.
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          3. WHAT HAPPENS NEXT
      ══════════════════════════════════════ */}
      <section className="section-padding bg-beige-50">
        <div className="section-container">
          <div className="max-w-3xl mx-auto">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-clay-500 mb-3 text-center">
              What happens next
            </p>
            <h2
              className="text-4xl md:text-5xl font-light text-charcoal-900 mb-12 text-center leading-tight"
              style={{ fontFamily: "var(--font-cormorant), ui-serif, Georgia, serif" }}
            >
              You don&apos;t have to do anything yet.
            </h2>

            <div className="flex flex-col gap-4">
              {happensNext.map((item) => (
                <div
                  key={item.title}
                  className="bg-white border border-beige-200 rounded-2xl p-5 md:p-6 flex gap-5 items-start"
                >
                  <div className="w-10 h-10 rounded-xl bg-clay-500/10 flex items-center justify-center shrink-0 mt-0.5 text-clay-500">
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-clay-500 mb-1">
                      {item.when}
                    </p>
                    <p className="text-base font-semibold text-charcoal-900 mb-1">{item.title}</p>
                    <p className="text-sm text-taupe-400 font-light leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          4. WHILE YOU WAIT ~ free Skool CTA
      ══════════════════════════════════════ */}
      <section className="section-padding bg-charcoal-900">
        <div className="section-container">
          <div className="max-w-3xl mx-auto bg-clay-500/10 border border-clay-500/30 rounded-2xl p-8 md:p-10">
            <div className="flex items-start gap-4 mb-5">
              <div className="w-11 h-11 rounded-xl bg-clay-500/20 flex items-center justify-center shrink-0 text-clay-500">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-clay-500 mb-2">
                  Step 02 · Optional but recommended
                </p>
                <p
                  className="text-2xl md:text-3xl font-light text-beige-50 leading-tight"
                  style={{ fontFamily: "var(--font-cormorant), ui-serif, Georgia, serif" }}
                >
                  While you wait for Jun 5, <em className="italic text-clay-500">hang out in the free Skool.</em>
                </p>
              </div>
            </div>

            <p className="text-beige-200 font-light leading-relaxed mb-7">
              The free community has 560+ members ~ replays from past events, the prompt vault,
              and Abie&apos;s growing playbook library. Lurk, scroll, drop a hi. You&apos;ll know
              the room before Kickoff.
            </p>

            <a
              href={FREE_SKOOL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-clay-500 hover:bg-clay-600 text-beige-50 font-medium text-sm px-7 py-3 rounded-full transition-all duration-200"
            >
              Join the free community
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          5. SCHEDULE AT A GLANCE
      ══════════════════════════════════════ */}
      <section className="section-padding bg-beige-100 border-y border-beige-200">
        <div className="section-container">
          <div className="max-w-3xl mx-auto">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-clay-500 mb-3 text-center">
              Mark your calendar
            </p>
            <h2
              className="text-4xl md:text-5xl font-light text-charcoal-900 mb-3 text-center leading-tight"
              style={{ fontFamily: "var(--font-cormorant), ui-serif, Georgia, serif" }}
            >
              All 9 sessions.
            </h2>
            <p className="text-center text-espresso-800 font-light mb-10">
              Sat &amp; Sun · 10 AM–1 PM EST · 3 hrs each. Calendar invites land before Kickoff.
            </p>

            <div className="bg-white border border-beige-200 rounded-2xl overflow-hidden">
              {schedule.map((s, i) => (
                <div
                  key={s.tag}
                  className={`grid grid-cols-[110px_140px_1fr] gap-3 md:gap-6 items-center px-5 md:px-7 py-4 ${i < schedule.length - 1 ? "border-b border-beige-200" : ""}`}
                >
                  <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-clay-500 px-2.5 py-1 bg-clay-500/10 rounded-full inline-block w-fit">
                    {s.tag}
                  </span>
                  <span className="text-sm font-semibold text-charcoal-900">{s.date}</span>
                  <span className="text-sm text-taupe-400 font-light">{s.topic}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          6. NOTE FROM INSTRUCTORS
      ══════════════════════════════════════ */}
      <section className="section-padding bg-charcoal-900">
        <div className="section-container">
          <div className="max-w-2xl mx-auto text-center">
            <Heart className="w-7 h-7 text-clay-500 mx-auto mb-6" />
            <h2
              className="text-3xl md:text-4xl font-light text-beige-50 mb-6 leading-tight"
              style={{ fontFamily: "var(--font-cormorant), ui-serif, Georgia, serif" }}
            >
              Thank you, <em className="italic text-clay-500">truly.</em>
            </h2>
            <p className="text-beige-200 font-light leading-relaxed mb-5">
              You&apos;re in Cohort 1 ~ the founding cohort. That means more than a price tag to us.
              You took a chance on a programme nobody&apos;s graduated from yet, on the strength
              of what we said we&apos;d deliver.
            </p>
            <p className="text-beige-200 font-light leading-relaxed mb-5">
              We&apos;re going to deliver. By Jun 28 you&apos;ll have a Claude stack running inside
              your business and a daily routine that compounds. That&apos;s the whole bet.
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

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link
                href={INSIDE_URL}
                className="inline-flex items-center gap-2 bg-clay-500 hover:bg-clay-600 text-beige-50 font-medium text-sm px-7 py-3 rounded-full transition-all duration-200"
              >
                Open the curriculum
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <a
                href={FREE_SKOOL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-7 py-3 text-sm font-medium text-beige-50 border border-white/20 rounded-full hover:border-clay-500 hover:bg-clay-500/10 transition-all duration-200"
              >
                Join free Skool
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Back link */}
      <div className="py-8 bg-beige-100 border-t border-beige-200 text-center">
        <Link
          href="/events/bootcamp"
          className="text-sm text-taupe-400 font-light hover:text-clay-500 transition-colors"
        >
          ← Back to bootcamp page
        </Link>
      </div>
    </>
  );
}
