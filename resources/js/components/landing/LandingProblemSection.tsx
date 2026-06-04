import { problemCards } from "@/components/landing/content";
import { IconAlertTriangle, IconClipboardText, IconHistory, IconTrendingUp3 } from "@tabler/icons-react";

const icons = [IconClipboardText, IconAlertTriangle, IconHistory, IconTrendingUp3] as const;
const accentClasses = [
    "bg-stone-200 text-stone-700",
    "bg-rose-100 text-rose-700",
    "bg-amber-100 text-amber-700",
    "bg-emerald-100 text-emerald-700",
] as const;

export default function LandingProblemSection() {
    return (
        <section id="masalah" className="bg-[#f1f3ee] px-6 py-20">
            <div className="mx-auto w-full max-w-6xl">
                <div className="mx-auto mb-12 max-w-3xl text-center">
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-700">Tantangan harian</p>
                    <h2 className="mt-3 font-[Manrope] text-3xl font-semibold text-slate-900 md:text-4xl">
                        Tantangan operasional peternakan sering terasa kecil per hari, tapi besar dampaknya.
                    </h2>
                    <p className="mt-4 text-base leading-7 text-slate-600">
                        Landing page ini kami bingkai sebagai bantuan nyata untuk peternak dan pengelola kandang, bukan janji teknologi yang terlalu jauh dari kebutuhan lapangan.
                    </p>
                </div>

                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                    {problemCards.map((card, index) => {
                        const Icon = icons[index];

                        return (
                            <article
                                key={card.title}
                                className="rounded-[1.5rem] border border-white/80 bg-white p-6 shadow-[0_14px_40px_rgba(15,23,42,0.06)] transition-transform duration-300 hover:-translate-y-1"
                            >
                                <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl ${accentClasses[index]}`}>
                                    <Icon size={22} />
                                </div>
                                <h3 className="font-[Manrope] text-xl font-semibold text-slate-900">{card.title}</h3>
                                <p className="mt-3 text-sm leading-6 text-slate-600">{card.description}</p>
                            </article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
