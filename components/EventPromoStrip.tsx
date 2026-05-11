import Link from "next/link";
import { ArrowRight, Calendar, Sparkles } from "lucide-react";

export default function EventPromoStrip() {
    return (
        <div className="bg-clay-500 py-5">
            <div className="section-container">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                            <Sparkles className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <p className="font-semibold text-white text-sm">
                                Cohort 1 ~ AI Business Bootcamp · €247 founding price
                            </p>
                            <p className="text-white/70 text-xs flex items-center gap-1.5 mt-0.5">
                                <Calendar className="w-3 h-3" />
                                Starts June 6, 2026 · 9 live sessions · VIP bundle included free
                            </p>
                        </div>
                    </div>
                    <Link
                        href="/events/bootcamp"
                        className="inline-flex items-center gap-2 bg-white text-clay-600 font-semibold text-sm px-6 py-2.5 rounded-full hover:bg-beige-50 transition-colors shrink-0"
                    >
                        Join Cohort 1
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
