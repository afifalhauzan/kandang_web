import { solutionPillars } from "@/components/landing/content";
import { IconChecks, IconLayoutDashboard, IconStethoscope, IconTrendingUp } from "@tabler/icons-react";

const pillarIcons = [IconLayoutDashboard, IconStethoscope, IconTrendingUp] as const;
const pillarIconClasses = ["text-emerald-700", "text-amber-700", "text-stone-700"] as const;

export default function LandingSolutionSection() {
    return (
        <section id="solusi" className="bg-[#faf9f8] px-6 py-20">
            <div className="mx-auto w-full max-w-6xl">
                <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                    <div className="max-w-2xl">
                        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-700">Satu platform</p>
                        <h2 className="mt-3 font-[Manrope] text-3xl font-semibold text-slate-900 md:text-4xl">
                            Seluruh alur operasional peternakan dirangkum ke satu tempat yang tenang dan mudah dibaca.
                        </h2>
                        <p className="mt-4 text-base leading-7 text-slate-600">
                            Struktur ini mengikuti model dan controller yang memang sudah ada di aplikasi sekarang, jadi cerita marketing-nya tetap nyambung dengan produk yang benar-benar bisa kita demo-kan.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        <span className="rounded-full bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-800">Terintegrasi</span>
                    </div>  
                </div>

                <div className="grid gap-8 lg:grid-cols-3">
                    {solutionPillars.map((pillar, index) => {
                        const Icon = pillarIcons[index];

                        return (
                            <article key={pillar.title} className="flex flex-col gap-5">
                                <div className="aspect-video overflow-hidden rounded-[1.75rem] bg-slate-200">
                                    <img src={pillar.image} alt={pillar.title} className="h-full w-full object-cover" />
                                </div>

                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <Icon size={22} className={pillarIconClasses[index]} />
                                        <h3 className="font-[Manrope] text-2xl font-semibold text-slate-900">{pillar.title}</h3>
                                    </div>
                                    <p className="text-sm leading-6 text-slate-600">{pillar.description}</p>
                                    <ul className="space-y-2 text-sm text-slate-700">
                                        {pillar.points.map((point) => (
                                            <li key={point} className="flex items-start gap-2">
                                                <IconChecks size={18} className={pillarIconClasses[index]} />
                                                <span>{point}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
