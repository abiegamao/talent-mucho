import Link from "next/link";
import { ArrowRight, Users, Zap } from "lucide-react";

const FREE_URL = "https://www.skool.com/future-proof-with-ai-4339/about?ref=1d469fcf6dfe460c8c681c23ea85a7a7";

export default function CommunitySection() {
    return (
        <section className="section-padding bg-charcoal-900 relative overflow-hidden">
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.04]"
                style={{
                    backgroundImage:
                        "repeating-linear-gradient(0deg,#FAF8F5 0,#FAF8F5 1px,transparent 1px,transparent 56px),repeating-linear-gradient(90deg,#FAF8F5 0,#FAF8F5 1px,transparent 1px,transparent 56px)",
                }}
            />

            <div className="section-container relative">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-14">
                        <div className="inline-flex items-center gap-2 bg-clay-500/15 border border-clay-500/30 rounded-full px-4 py-2 mb-6">
                            <span className="w-2 h-2 rounded-full bg-clay-500 animate-pulse shrink-0" />
                            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-clay-500">
                                560+ members · Live on Skool
                            </span>
                        </div>

                        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-clay-500 mb-4">
                            The Talent Mucho Community
                        </p>
                        <h2
                            className="text-4xl md:text-5xl lg:text-6xl font-light text-beige-50 mb-6 leading-[1.05]"
                            style={{ fontFamily: "var(--font-cormorant), ui-serif, Georgia, serif" }}
                        >
                            Learn AI <em className="italic text-clay-500">in the room</em>, not alone.
                        </h2>
                        <p className="text-beige-200 font-light leading-relaxed text-lg max-w-2xl mx-auto">
                            Lurk in the free community first ~ then come build live with Cohort 1 of the bootcamp.
                            Replays, vault, and Abie&apos;s playbooks while you decide.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {/* Free community */}
                        <div className="bg-espresso-800/60 border border-white/5 rounded-2xl p-7 flex flex-col">
                            <div className="flex items-start justify-between mb-5">
                                <div className="w-11 h-11 rounded-xl bg-beige-100/10 flex items-center justify-center text-beige-200">
                                    <Users className="w-5 h-5" />
                                </div>
                                <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-beige-300/60">
                                    Step 1 · Free · Skool
                                </span>
                            </div>
                            <p
                                className="text-3xl font-light text-beige-50 mb-2"
                                style={{ fontFamily: "var(--font-cormorant), ui-serif, Georgia, serif" }}
                            >
                                Warm up <em className="italic text-beige-200/60">free</em>
                            </p>
                            <p className="text-2xl font-light text-clay-500 mb-4"
                                style={{ fontFamily: "var(--font-cormorant), ui-serif, Georgia, serif" }}
                            >
                                €0
                            </p>
                            <ul className="flex flex-col gap-2 mb-6 flex-1">
                                {[
                                    "Replays from every public event",
                                    "Free prompt + playbook vault",
                                    "Lurk, scroll, get the lay of the land",
                                    "First to hear when Cohort 2 opens",
                                ].map((item) => (
                                    <li key={item} className="flex items-start gap-2 text-sm text-beige-200 font-light leading-relaxed">
                                        <span className="text-clay-500 mt-1.5 text-[8px]">●</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                            <a
                                href={FREE_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 border border-white/15 hover:border-clay-500 text-beige-50 font-medium text-sm px-6 py-3 rounded-full transition-all duration-200 self-start"
                            >
                                Join free on Skool
                                <ArrowRight className="w-3.5 h-3.5" />
                            </a>
                        </div>

                        {/* Bootcamp */}
                        <div className="bg-clay-500/10 border border-clay-500/40 rounded-2xl p-7 flex flex-col relative">
                            <span className="absolute -top-2.5 left-7 bg-clay-500 text-beige-50 text-[9px] font-bold uppercase tracking-[0.18em] px-2.5 py-1 rounded-full">
                                Step 2 · Cohort 1 · Founding price
                            </span>
                            <div className="flex items-start justify-between mb-5">
                                <div className="w-11 h-11 rounded-xl bg-clay-500/20 flex items-center justify-center text-clay-500">
                                    <Zap className="w-5 h-5" />
                                </div>
                                <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-clay-500">
                                    Starts Sat, Jun 6
                                </span>
                            </div>
                            <p
                                className="text-3xl font-light text-beige-50 mb-2"
                                style={{ fontFamily: "var(--font-cormorant), ui-serif, Georgia, serif" }}
                            >
                                AI Business <em className="italic text-clay-500">Bootcamp</em>
                            </p>
                            <p
                                className="text-2xl font-light text-clay-500 mb-4"
                                style={{ fontFamily: "var(--font-cormorant), ui-serif, Georgia, serif" }}
                            >
                                €247
                            </p>
                            <ul className="flex flex-col gap-2 mb-6 flex-1">
                                {[
                                    "8 live sessions · Sat & Sun · 10 AM–1 PM EST (4–7 PM CEST · 10 PM–1 AM PHT)",
                                    "Four real deliverables you keep",
                                    "Small group · live mentorship",
                                    "VIP bundle included free (€397 value)",
                                ].map((item) => (
                                    <li key={item} className="flex items-start gap-2 text-sm text-beige-50 font-light leading-relaxed">
                                        <span className="text-clay-500 mt-1.5 text-[8px]">●</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                            <Link
                                href="/events/bootcamp"
                                className="inline-flex items-center justify-center gap-2 bg-clay-500 hover:bg-clay-600 text-beige-50 font-medium text-sm px-6 py-3 rounded-full transition-all duration-200 self-start"
                            >
                                See Cohort 1 details
                                <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
