import { Badge } from "@/components/ui/badge";
import { aiAssistCards } from "@/components/landing/content";
import { IconBrain, IconCalculator, IconMessageCircle2, IconScanEye } from "@tabler/icons-react";

const featureIcons = [IconScanEye, IconCalculator] as const;

export default function LandingAiSection() {
    return (
        <section id="ai-support" className="bg-[#efefeb] px-6 py-20">
            <div className="mx-auto w-full max-w-6xl">
                <div className="mb-10 max-w-2xl">
                    <Badge className="mb-4 bg-emerald-700 text-white hover:bg-emerald-700">
                        <IconBrain size={14} />
                        AI-assisted
                    </Badge>
                    <h2 className="font-[Manrope] text-3xl font-semibold text-slate-900 md:text-4xl">
                        Workflow berbasis AI sudah punya tempat yang jelas di dalam produk.
                    </h2>
                </div>

                <div className="grid gap-5 md:grid-cols-12">
                    <article className="relative overflow-hidden rounded-[2rem] border border-white/80 bg-white p-8 shadow-[0_18px_50px_rgba(15,23,42,0.06)] md:col-span-7 lg:col-span-8">
                        <div className="relative z-10 max-w-xl">
                            <h3 className="font-[Manrope] text-2xl font-semibold text-slate-900">Smart Farm Assistant Chat</h3>
                            <p className="mt-4 text-base leading-7 text-slate-600">
                                Konsultasi cepat, penjelasan kondisi ternak, dan tindak lanjut sederhana bisa diperkenalkan sebagai alur pendamping digital. Saat ini masih mock, tetapi sudah tepat untuk framing produk di sprint awal.
                            </p>
                            <span className="mt-6 inline-flex rounded-full bg-amber-50 px-3 py-1 text-sm font-medium text-amber-800">
                                Ready for future AI integration
                            </span>
                        </div>

                        <div className="pointer-events-none absolute -bottom-12 right-0 opacity-10">
                            <IconMessageCircle2 size={260} className="text-emerald-800" />
                        </div>
                    </article>

                    <div className="space-y-5 md:col-span-5 lg:col-span-4">
                        {aiAssistCards.map((card, index) => {
                            const Icon = featureIcons[index];

                            return (
                                <article
                                    key={card.title}
                                    className="rounded-[1.5rem] border border-white/80 bg-white p-6 shadow-[0_14px_40px_rgba(15,23,42,0.06)]"
                                >
                                    <div className="mb-3 flex items-center gap-3">
                                        <Icon size={20} className={index === 0 ? "text-emerald-700" : "text-amber-700"} />
                                        <h4 className="font-[Manrope] text-xl font-semibold text-slate-900">{card.title}</h4>
                                    </div>
                                    <p className="text-sm leading-6 text-slate-600">{card.description}</p>
                                    <span className="mt-4 inline-block text-xs italic text-slate-500">{card.badge}</span>
                                </article>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
