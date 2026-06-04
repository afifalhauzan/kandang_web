import { Link } from "@inertiajs/react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { proofPoints } from "@/components/landing/content";
import {
    IconArrowRight,
    IconCalendarDue,
    IconHeartRateMonitor,
    IconHomeStats,
    IconTrendingUp,
} from "@tabler/icons-react";

const quickStats = [
    {
        label: "Total livestock",
        value: "1.248",
        icon: IconHomeStats,
        cardClass: "border-emerald-100 bg-emerald-50/70",
        iconClass: "text-emerald-700",
        valueClass: "text-emerald-800",
    },
    {
        label: "Active barns",
        value: "24",
        icon: IconTrendingUp,
        cardClass: "border-amber-100 bg-amber-50/70",
        iconClass: "text-amber-700",
        valueClass: "text-amber-800",
    },
] as const;

const vaccinationRows = [
    { name: "Sapi-042 (PMK)", status: "Terlewat", tone: "danger" },
    { name: "Kambing-A12 (Antraks)", status: "Besok", tone: "success" },
] as const;

export default function LandingHeroSection() {
    return (
        <section className="relative overflow-hidden px-6 pb-16 pt-30">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(127,252,151,0.16),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(251,146,60,0.10),transparent_35%)]" />
            <div className="relative mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
                <div className="space-y-6">
                    <Badge variant="outline" className="border-emerald-300 bg-emerald-50 px-3 py-1 text-emerald-800">
                        Operasional Peternak lebih Rapi
                    </Badge>

                    <div className="space-y-4">
                        <h1 className="max-w-3xl font-[Manrope] text-4xl font-bold leading-tight tracking-[-0.03em] text-slate-900 md:text-6xl">
                            Kelola peternakan lebih mudah dalam satu dashboard.
                        </h1>
                        <p className="max-w-2xl text-base leading-7 text-slate-600 md:text-lg">
                            Pantau farm, kandang, ternak, kesehatan, vaksinasi, harga pasar, dan cuaca tanpa catatan yang tercecer. TernakMVP dirancang sebagai partner kerja harian yang membumi dan siap tumbuh ke workflow AI.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-3">
                        <Button asChild size="lg" className="bg-emerald-700 text-white hover:bg-emerald-800">
                            <Link href="/register">
                                Mulai Gratis
                                <IconArrowRight size={18} />
                            </Link>
                        </Button>
                        <Button asChild size="lg" variant="outline" className="border-emerald-200 bg-white/80 hover:bg-emerald-50">
                            <Link href="/dashboard">Lihat Dashboard</Link>
                        </Button>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {proofPoints.map((item) => (
                            <div
                                key={item}
                                className="inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/90 px-3 py-2 text-sm text-slate-700 shadow-sm"
                            >
                                <IconHeartRateMonitor size={16} className="text-emerald-700" />
                                <span>{item}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="relative">
                    <div className="rounded-[2rem] border border-emerald-950/10 bg-[#fcfcfa] p-5 shadow-[0_30px_80px_rgba(15,23,42,0.10)]">
                        <div className="space-y-5 rounded-[1.5rem] p-2">
                            <div className="grid gap-4 sm:grid-cols-2">
                                {quickStats.map(({ label, value, icon: Icon, cardClass, iconClass, valueClass }) => (
                                    <div key={label} className={`rounded-2xl border p-4 ${cardClass}`}>
                                        <div className="flex items-start justify-between gap-3">
                                            <span className="text-sm font-medium text-slate-500">{label}</span>
                                            <Icon size={20} className={iconClass} />
                                        </div>
                                        <p className={`mt-3 font-[Manrope] text-3xl font-bold ${valueClass}`}>{value}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="rounded-2xl border border-slate-200 bg-white p-4">
                                <div className="mb-3 flex items-center justify-between gap-3">
                                    <div>
                                        <h3 className="font-[Manrope] text-lg font-semibold text-slate-900">Jadwal Vaksinasi</h3>
                                        <p className="text-sm text-slate-500">Pantau prioritas perawatan yang paling dekat.</p>
                                    </div>
                                    <IconCalendarDue size={20} className="text-emerald-700" />
                                </div>

                                <div className="space-y-2">
                                    {vaccinationRows.map((row) => (
                                        <div
                                            key={row.name}
                                            className={`flex items-center justify-between rounded-xl border px-3 py-3 text-sm ${
                                                row.tone === "danger"
                                                    ? "border-rose-200 bg-rose-50 text-rose-700"
                                                    : "border-emerald-200 bg-emerald-50 text-emerald-700"
                                            }`}
                                        >
                                            <span className="font-medium">{row.name}</span>
                                            <span className="font-semibold">{row.status}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pointer-events-none absolute -bottom-10 -right-8 h-32 w-32 rounded-full bg-amber-200/40 blur-3xl" />
                </div>
            </div>
        </section>
    );
}
