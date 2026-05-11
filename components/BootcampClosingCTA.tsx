import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";

const FREE_SKOOL_URL = "https://www.skool.com/future-proof-with-ai-4339/about?ref=1d469fcf6dfe460c8c681c23ea85a7a7";

export default function BootcampClosingCTA() {
    return (
        <section className="bg-beige-50 py-20 md:py-24 border-t border-beige-200 relative overflow-hidden">
            {/* Subtle decorative accent */}
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-clay-500/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="section-container relative">
                <div className="max-w-3xl mx-auto text-center">

                    <div className="inline-flex items-center gap-2 bg-white border border-clay-500/30 rounded-full px-4 py-2 mb-7">
                        <Calendar className="w-3.5 h-3.5 text-clay-500" />
                        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-clay-500">
                            Cohort 1 starts Saturday, June 6
                        </span>
                    </div>

                    <h2
                        className="font-light tracking-tight text-charcoal-900 mb-6 leading-[1.05]"
                        style={{
                            fontFamily: "var(--font-cormorant), ui-serif, Georgia, serif",
                            fontSize: "clamp(2.5rem, 5.5vw, 4.5rem)",
                        }}
                    >
                        Stop saying you&apos;ll figure out AI.
                        <br />
                        <em className="italic text-clay-500" style={{ fontStyle: "italic" }}>Run it.</em>
                    </h2>

                    <p className="text-lg md:text-xl text-espresso-800 font-light leading-relaxed max-w-2xl mx-auto mb-10">
                        9 live sessions. Four real deliverables. One month inside the room with two operators
                        who run their own AI stacks every day. <span className="font-semibold text-charcoal-900">€247 founding price</span> ~ Cohort 2 opens at €397.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
                        <Link
                            href="/events/bootcamp"
                            className="inline-flex items-center gap-2 bg-clay-500 hover:bg-clay-600 text-beige-50 font-medium text-base px-9 py-4 rounded-full transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5"
                            data-cta="closing-bootcamp"
                        >
                            Join Cohort 1 ~ €247
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                        <a
                            href={FREE_SKOOL_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center px-9 py-4 text-base font-medium text-clay-500 border border-beige-300 rounded-full hover:border-clay-500 hover:bg-clay-500/5 transition-all duration-200"
                            data-cta="closing-free-skool"
                        >
                            Or warm up free
                        </a>
                    </div>

                    <p className="text-sm text-taupe-400 font-light italic">
                        Founding price disappears when Cohort 1 closes.
                    </p>
                </div>
            </div>
        </section>
    );
}
