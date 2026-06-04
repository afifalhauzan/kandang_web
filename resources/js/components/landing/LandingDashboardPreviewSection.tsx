import { Link } from "@inertiajs/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    dashboardStats,
    landingImages,
    livestockPreviewRows,
    priceRadarItems,
} from "@/components/landing/content";
import { IconBell, IconCircleCheckFilled, IconEye, IconShieldCheck } from "@tabler/icons-react";

export default function LandingDashboardPreviewSection() {
    return (
        <section id="dashboard-preview" className="overflow-hidden bg-[#faf9f8] px-6 py-20">
            <div className="mx-auto mb-10 w-full max-w-4xl text-center">
                <h2 className="mt-3 font-[Manrope] text-3xl font-semibold text-slate-900 md:text-4xl">
                    Monitor seluruh peternakan dalam satu tampilan yang terasa familiar untuk tim lapangan.
                </h2>
            </div>

            <div className="relative mx-auto w-full max-w-5xl rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_30px_80px_rgba(15,23,42,0.08)] md:p-8">
                <div className="space-y-8">
                    <div className="flex flex-col gap-4 border-b border-slate-200 pb-6 md:flex-row md:items-center md:justify-between">
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-700 text-white">
                                <IconShieldCheck size={22} />
                            </div>
                            <div>
                                <h3 className="font-[Manrope] text-xl font-semibold text-slate-900">Main Dashboard</h3>
                                <p className="text-sm text-slate-500">Ringkasan operasional farm, kandang, kesehatan, dan harga.</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-[#f6f6f2] text-slate-600">
                                <IconBell size={18} />
                            </div>
                            <Avatar className="h-10 w-10 border border-slate-200">
                                <AvatarImage src={landingImages.managerPortrait} alt="Farm manager" />
                                <AvatarFallback>FM</AvatarFallback>
                            </Avatar>
                        </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {dashboardStats.map((stat) => (
                            <div key={stat.label} className="rounded-2xl border border-slate-200 bg-[#faf9f8] p-4">
                                <p className="text-sm text-slate-500">{stat.label}</p>
                                <p className={`mt-2 font-[Manrope] text-3xl font-bold ${stat.tone}`}>{stat.value}</p>
                            </div>
                        ))}
                    </div>

                    <div className="grid gap-6 lg:grid-cols-[1.5fr_0.9fr]">
                        <div>
                            <div className="mb-4 flex items-center justify-between gap-3">
                                <h4 className="font-[Manrope] text-lg font-semibold text-slate-900">Daftar populasi ternak</h4>
                                <Button variant="outline" className="border-emerald-200 bg-white text-emerald-800 hover:bg-emerald-50">
                                    Filter
                                </Button>
                            </div>

                            <div className="overflow-hidden rounded-[1.5rem] border border-slate-200">
                                <table className="w-full text-left text-sm">
                                    <thead className="bg-[#faf9f8] text-slate-500">
                                        <tr>
                                            <th className="px-4 py-3 font-medium">ID Tag</th>
                                            <th className="px-4 py-3 font-medium">Spesies</th>
                                            <th className="px-4 py-3 font-medium">Status</th>
                                            <th className="px-4 py-3 font-medium">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {livestockPreviewRows.map((row) => (
                                            <tr key={row.code} className="border-t border-slate-100">
                                                <td className="px-4 py-4 font-semibold text-slate-900">{row.code}</td>
                                                <td className="px-4 py-4 text-slate-700">{row.species}</td>
                                                <td className="px-4 py-4">
                                                    <span
                                                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                                            row.tone === "healthy"
                                                                ? "bg-emerald-50 text-emerald-700"
                                                                : "bg-amber-50 text-amber-700"
                                                        }`}
                                                    >
                                                        {row.status}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-4 text-emerald-700">
                                                    <IconEye size={18} />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <aside className="rounded-[1.5rem] border border-slate-200 bg-[#faf9f8] p-5">
                            <h4 className="font-[Manrope] text-lg font-semibold text-slate-900">Radar harga pasar</h4>
                            <div className="mt-5 space-y-4">
                                {priceRadarItems.map((item) => (
                                    <div key={item.name} className="flex items-center justify-between gap-4 text-sm">
                                        <span className="text-slate-600">{item.name}</span>
                                        <span className="font-semibold text-slate-900">{item.price}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-6 border-t border-slate-200 pt-5">
                                <p className="text-sm italic leading-6 text-slate-500">
                                    "Harga sapi dan pakan minggu ini memberi konteks tambahan untuk keputusan pembelian dan penjualan ternak."
                                </p>
                            </div>
                        </aside>
                    </div>
                </div>

                <div className="absolute -left-8 -top-8 hidden md:block">
                    <div className="flex items-center gap-3 rounded-2xl border border-emerald-100 bg-white px-4 py-3 shadow-lg">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-700 text-white">
                            <IconCircleCheckFilled size={16} />
                        </div>
                        <p className="text-sm font-semibold text-slate-900">Data operasional siap dipresentasikan</p>
                    </div>
                </div>

                <div className="mt-8 flex flex-wrap justify-center gap-3">
                    <Button asChild className="bg-emerald-700 text-white hover:bg-emerald-800">
                        <Link href="/dashboard">Masuk ke dashboard</Link>
                    </Button>
                    <Button asChild variant="outline" className="border-emerald-200 bg-white hover:bg-emerald-50">
                        <Link href="/register">Coba alur MVP</Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
