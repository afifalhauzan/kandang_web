import { benefitCards } from "@/components/landing/content";
import { IconBolt, IconCalendarStats, IconEye, IconFiles, IconFolderStar } from "@tabler/icons-react";

const benefitIcons = [IconFiles, IconEye, IconCalendarStats, IconFolderStar, IconBolt] as const;
const benefitIconClasses = [
    "text-emerald-700",
    "text-amber-700",
    "text-rose-700",
    "text-stone-700",
    "text-emerald-700",
] as const;

export default function LandingBenefitsSection() {
    return (
        <section className="bg-[#f1f3ee] px-6 py-20">
            <div className="mx-auto w-full max-w-6xl">
                <div className="mb-12 text-center">
                    <h2 className="mt-3 font-[Manrope] text-3xl font-semibold text-slate-900 md:text-4xl">
                        Alat bantu kerja yang terasa nyata.
                    </h2>
                </div>

                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
                    {benefitCards.map((benefit, index) => {
                        const Icon = benefitIcons[index];

                        return (
                            <article
                                key={benefit.title}
                                className="rounded-[1.5rem] border border-white/80 bg-white p-5 text-center shadow-[0_12px_36px_rgba(15,23,42,0.05)]"
                            >
                                <div
                                    className={`mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#faf9f8] ${benefitIconClasses[index]}`}
                                >
                                    <Icon size={26} />
                                </div>
                                <h3 className="font-[Manrope] text-lg font-semibold text-slate-900">{benefit.title}</h3>
                                <p className="mt-3 text-sm leading-6 text-slate-600">{benefit.description}</p>
                            </article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
