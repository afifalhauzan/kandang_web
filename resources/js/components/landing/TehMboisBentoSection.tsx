import { IconArrowNarrowRight, IconCheck, IconTrendingUp } from "@tabler/icons-react";
import { TEH_MBOIS_IMAGES } from "./constants";
import { Button } from "../ui/button";
import { Link } from "@inertiajs/react";

const chartBars = ["40%", "60%", "85%", "70%", "100%", "50%"];
const chartLabels = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
const chartClasses = [
    "bg-[#C7EF9D]/50 hover:bg-[#C7EF9D]/70",
    "bg-[#86D18C]/50 hover:bg-[#86D18C]/70",
    "bg-[#4FAE83]/70 hover:bg-[#4FAE83]/90",
    "bg-[#2E8873]/80 hover:bg-[#2E8873]",
    "bg-[#096956] hover:bg-[#096956]/90",
    "bg-[#276D5F]/50 hover:bg-[#276D5F]/70",
];

export default function TehMboisBentoSection() {
    return (
        <section className="bg-[#f7faf7] py-20" id="insight">
            <div className="mx-auto w-full max-w-[1280px] px-4 md:px-8">
                <div className="grid auto-rows-[minmax(300px,auto)] grid-cols-1 gap-6 lg:grid-cols-12">
                    {/* <div id="outlet" className="lg:col-span-12">
                        <p className="mb-2 text-xs font-bold uppercase tracking-[0.14em] text-[#8d493c]">Outlet</p>
                        <h3 className="mb-2 text-4xl font-bold text-[#181c1b]">Mampir ke Booth Kami</h3>
                        <p className="max-w-3xl text-[#3f4945]">
                            Suasana cozy semi-outdoor dengan sentuhan kayu natural. Tempat asik buat nongkrong santai sambil
                            nikmatin racikan teh segar kami.
                        </p>
                    </div> */}

                    {/* <div className="relative flex flex-col justify-between overflow-hidden rounded-3xl bg-[#30826e] p-8 text-white lg:col-span-4">
                        <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-[#096956]/20 blur-2xl" />
                        <div>
                            <div className="mb-6 flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#096956] text-white">
                                    <IconBulb size={18} />
                                </div>
                                <span className="text-sm font-bold uppercase tracking-wide text-[#a2f2da]">AI Insight</span>
                            </div>
                            <p className="mb-4 text-2xl font-semibold leading-snug">
                                "Es Teh Tarik diprediksi <span className="text-[#a2f2da]">naik 18%</span> saat jam makan siang."
                            </p>
                            <p className="text-sm opacity-80">Berdasarkan data cuaca dan tren penjualan historis 30 hari terakhir.</p>
                        </div>
                        <div className="mt-8 flex justify-end">
                            <div className="h-2 w-full overflow-hidden rounded-full bg-[#096956]/30">
                                <div className="relative h-full w-[82%] rounded-full bg-[#a2f2da]">
                                    <div className="absolute right-0 top-0 h-full w-2 animate-ping bg-white/50" />
                                </div>
                            </div>
                        </div>
                    </div> */}

                    <div className="relative overflow-hidden rounded-3xl border border-[#bec9c4]/30 bg-[#0b3f35] p-6 md:p-8 lg:col-span-12">
                        <img
                            src={TEH_MBOIS_IMAGES.outlet}
                            alt="Preview Outlet TehMbois"
                            className="absolute inset-0 h-full w-full object-cover"
                        />
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#0b3f35]/95 from-40% via-[#0b3f35]/70 via-65% to-transparent" />
                        <div className="pointer-events-none absolute -right-16 top-1/2 h-44 w-44 -translate-y-1/2 rounded-full bg-[#096956]/10 blur-3xl" />

                        <div className="relative z-10 flex flex-col items-stretch justify-between gap-6 md:flex-row md:items-center">
                            <div className="max-w-3xl">
                                <div className="flex flex-col gap-4 ">
                                    <p className="mb-2 text-xs font-bold uppercase tracking-[0.14em] text-green-100">KUNJUNGI OUTLET KAMI</p>
                                    <h3 className="mb-2 text-3xl font-bold text-white md:text-4xl">Temukan Pengalaman Nongkrong TehMbois di Outlet Kami</h3>
                                    <p className="text-slate-200">
                                        Dari area duduk semi-outdoor sampai suasana hangat khas Malang, lihat sekilas tempat favorit pelanggan
                                        sebelum mampir langsung ke booth TehMbois.
                                    </p>
                                </div>
                                <div className="pt-14">
                                    <Link href="/outlet">
                                        <a
                                            className="mt-5 inline-flex w-fit max-w-full self-start items-center gap-2 rounded-full border-2 border-[#096956] bg-white px-6 py-3 text-sm font-semibold text-[#096956] hover:text-white hover:bg-white/70 transition-colors"
                                        >
                                            Lihat Preview Outlet
                                            <IconArrowNarrowRight size={18} />
                                        </a>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* <div
                        id="dashboard"
                        className="flex flex-col items-center gap-8 rounded-3xl border border-[#bec9c4]/30 bg-white p-8 shadow-sm md:flex-row lg:col-span-12"
                    >
                        <div className="w-full flex-1">
                            <div className="mb-6 flex items-center gap-2 text-[#3f4945]">
                                <IconTrendingUp size={18} />
                                <h3 className="text-sm font-bold uppercase tracking-wider">Dashboard Operational</h3>
                            </div>
                            <div className="mb-8 grid grid-cols-2 gap-4">
                                <div className="rounded-2xl border border-[#bec9c4]/20 bg-[#f1f4f1] p-4">
                                    <p className="mb-1 text-xs text-[#3f4945]">Pendapatan Harian</p>
                                    <p className="text-2xl font-bold text-[#181c1b]">Rp 845.000</p>
                                    <div className="mt-2 flex items-center gap-1 text-xs font-bold text-[#4FAE83]">
                                        <IconTrendingUp size={14} />
                                        +12.5% vs kemarin
                                    </div>
                                </div>
                                <div className="rounded-2xl border border-[#bec9c4]/20 bg-[#f1f4f1] p-4">
                                    <p className="mb-1 text-xs text-[#3f4945]">Rata-rata Penjualan/Hari</p>
                                    <p className="text-2xl font-bold text-[#181c1b]">120 Gelas</p>
                                    <div className="mt-2 flex items-center gap-1 text-xs font-bold text-[#2E8873]">
                                        <IconCheck size={14} />
                                        Sesuai target
                                    </div>
                                </div>
                            </div>

                            <div className="flex h-32 w-full items-end gap-2 px-2">
                                {chartBars.map((height, index) => (
                                    <div
                                        key={chartLabels[index]}
                                        className={`group relative w-1/6 rounded-t-md transition-colors ${chartClasses[index]}`}
                                        style={{ height }}
                                    >
                                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 rounded bg-white px-2 py-1 text-xs opacity-0 shadow-md transition-opacity group-hover:opacity-100">
                                            {chartLabels[index]}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="w-full flex-1 md:pl-12">
                            <h3 className="mb-4 text-4xl font-bold text-[#181c1b]">Kelola Bisnis Makin Mudah</h3>
                            <p className="mb-6 text-lg text-[#3f4945]">
                                Pantau penjualan, atur stok, hingga dapatkan prediksi AI untuk maksimalkan profit harianmu. Semua
                                dalam satu dashboard Mbois yang user-friendly.
                            </p>
                            <Link href="/dashboard">
                                <Button className="bg-white inline-flex items-center gap-2 rounded-full border-2 border-[#096956] px-6 py-6 text-sm font-semibold text-[#096956] transition-colors hover:bg-[#096956]/5">
                                    Jelajahi Fitur Dashboard
                                    <IconArrowNarrowRight size={18} />
                                </Button>
                            </Link>
                        </div>
                    </div> */}
                </div>
            </div>
        </section>
    );
}
