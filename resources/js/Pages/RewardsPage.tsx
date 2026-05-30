import { Head } from "@inertiajs/react";
import Lenis from "lenis";
import {
    IconArrowNarrowRight,
    IconCoffee,
    IconGift,
    IconQrcode,
    IconSparkles,
    IconStarFilled,
    IconTrophy,
} from "@tabler/icons-react";
import { useEffect } from "react";
import TehMboisFooter from "../components/landing/TehMboisFooter";
import TehMboisTopNav from "../components/landing/TehMboisTopNav";
import { TEH_MBOIS_IMAGES } from "../components/landing/constants";
import AppLayout from "../layouts/AppLayout";
import { Link } from "@inertiajs/react";

export default function RewardsPage() {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 0.9,
            smoothWheel: true,
            wheelMultiplier: 1,
        });

        let rafId = 0;
        const raf = (time: number) => {
            lenis.raf(time);
            rafId = window.requestAnimationFrame(raf);
        };
        rafId = window.requestAnimationFrame(raf);

        const handleAnchorClick = (event: Event) => {
            const target = event.target as HTMLElement | null;
            const anchor = target?.closest('a[href^="#"]') as HTMLAnchorElement | null;

            if (!anchor) {
                return;
            }

            const hash = anchor.getAttribute("href");
            if (!hash) {
                return;
            }

            if (hash === "#") {
                event.preventDefault();
                lenis.scrollTo(0, { duration: 0.8 });
                return;
            }

            const element = document.querySelector(hash) as HTMLElement | null;
            if (!element) {
                return;
            }

            event.preventDefault();
            lenis.scrollTo(element, { offset: -72, duration: 0.9 });
        };

        document.addEventListener("click", handleAnchorClick);

        return () => {
            document.removeEventListener("click", handleAnchorClick);
            window.cancelAnimationFrame(rafId);
            lenis.destroy();
        };
    }, []);

    return (
        <AppLayout className="bg-[#f7faf7] text-[#181c1b]">
            <Head title="TehMbois Rewards - Ngumpulin Poin? Mbois Dong." />

            <div className="font-plus-jakarta bg-[#f7faf7] text-[#181c1b]">
                <TehMboisTopNav />

                <main id="rewards" className="overflow-hidden pb-20 pt-6">
                    <section className="relative mx-auto max-w-6xl px-4 pb-14 pt-8 md:pt-10">
                        <div
                            className="absolute inset-0 -z-10 rounded-3xl opacity-50"
                            style={{
                                backgroundImage: "radial-gradient(rgba(9, 105, 86, 0.1) 2px, transparent 2px)",
                                backgroundSize: "20px 20px",
                            }}
                        />

                        <div className="relative z-10 flex flex-col gap-8">
                            <div className="space-y-12">
                                {/* <div className="inline-flex items-center gap-2 rounded-full bg-[#30826e] px-4 py-2 text-xs font-bold tracking-wide text-white shadow-sm">
                                    <IconSparkles size={16} />
                                    1 Gelas = 10 P
                                    
                                    <oin
                                </div> */}

                                <div className="flex flex-col gap-4">
                                    <h1 className="text-4xl font-cherry-freeland leading-tight md:text-7xl">
                                        Ngumpulin Poin? <span className="text-[#096956]">Mbois Dong.</span>
                                    </h1>

                                    <p className="max-w-2xl text-base text-[#3f4945] md:text-lg">
                                        Gabung jadi member TehMbois, kumpulin poin tiap jajan, dan tukerin jadi minuman gratis plus benefit
                                        eksklusif lainnya.
                                    </p>
                                </div>

                                <div className="flex flex-col gap-5 sm:flex-row">
                                    <Link href="/register">
                                        <button className="inline-flex items-center justify-center gap-2 rounded-full bg-[#096956] px-7 py-3 text-sm font-semibold text-white shadow-md transition-all hover:opacity-90">
                                            Gabung Rewards
                                            <IconArrowNarrowRight size={18} />
                                        </button>
                                    </Link>
                                    {/* <a href="#benefits" className="inline-flex items-center justify-center rounded-full bg-[#ebefeb] px-7 py-3 text-sm font-semibold text-[#181c1b] transition-all hover:bg-[#e0e3e0]">
                                        Lihat Benefit
                                    </a> */}
                                </div>
                            </div>

                            {/* <div className="rounded-2xl border border-[#bec9c4]/40 bg-white/80 p-5 shadow-sm backdrop-blur-sm">
                                <div className="mb-4 flex items-start justify-between">
                                    <div>
                                        <p className="text-xs uppercase tracking-wider text-[#3f4945]">Member Mbois</p>
                                        <h3 className="mt-1 text-xl font-bold text-[#096956]">Budi Santoso</h3>
                                    </div>
                                    <div className="rounded-full bg-[#30826e] p-2 text-white">
                                        <IconQrcode size={18} />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-xs font-semibold">
                                        <span className="text-[#3f4945]">Progress Reward</span>
                                        <span className="font-bold text-[#096956]">120 / 200 Poin</span>
                                    </div>
                                    <div className="h-3 w-full overflow-hidden rounded-full bg-[#ebefeb]">
                                        <div className="h-full w-[60%] rounded-full bg-[#096956]" />
                                    </div>
                                    <p className="mt-1 text-xs text-[#8d493c]">80 poin lagi menuju Free Es Teh Tarik</p>
                                </div>
                            </div> */}
                        </div>
                    </section>

                    <section className="bg-white py-20">
                        <div className="mx-auto max-w-7xl px-4 md:px-0">
                            <div className="mx-auto mb-16 max-w-2xl text-center">
                                <h2 className="mb-4 text-4xl font-bold md:text-5xl">Gampang Banget Caranya</h2>
                                <p className="text-[#3f4945]">Tiga langkah gampang buat dapetin reward seger dari TehMbois.</p>
                            </div>

                            <div className="grid grid-cols-1 gap-6 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-center">
                                <div className="group relative overflow-hidden rounded-3xl border border-[#bec9c4]/40 bg-[#f7faf7] p-8 shadow-sm transition-shadow hover:shadow-md">
                                    <div className="absolute right-0 top-0 -z-10 h-32 w-32 rounded-bl-full bg-[#a2f2da]/25 transition-transform group-hover:scale-110" />
                                    <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#096956] text-white shadow-md shadow-[#096956]/20">
                                        <IconCoffee size={24} />
                                    </div>
                                    <h3 className="mb-3 text-2xl font-bold">1. Beli & Buat Akun</h3>
                                    <p className="text-[#3f4945]">Daftarkan akunmu, lalu jajan TehMbois favoritmu di outlet terdekat.</p>
                                </div>

                                <div className="hidden md:flex items-center justify-center text-[#096956]">
                                    <IconArrowNarrowRight size={34} />
                                </div>

                                <div className="group relative overflow-hidden rounded-3xl border border-[#bec9c4]/40 bg-[#f7faf7] p-8 shadow-sm transition-shadow hover:shadow-md">
                                    <div className="absolute right-0 top-0 -z-10 h-32 w-32 rounded-bl-full bg-[#C7EF9D]/40 transition-transform group-hover:scale-110" />
                                    <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#86D18C] text-[#005141] shadow-md shadow-[#86D18C]/30">
                                        <IconStarFilled size={22} />
                                    </div>
                                    <h3 className="mb-3 text-2xl font-bold">2. Kumpulkan Poin</h3>
                                    <p className="text-[#3f4945]">Tunjukin QR member saat bayar. Setiap gelas langsung nambah poin.</p>
                                </div>

                                <div className="hidden md:flex items-center justify-center text-[#096956]">
                                    <IconArrowNarrowRight size={34} />
                                </div>

                                <div className="group relative overflow-hidden rounded-3xl border border-[#bec9c4]/40 bg-[#f7faf7] p-8 shadow-sm transition-shadow hover:shadow-md">
                                    <div className="absolute right-0 top-0 -z-10 h-32 w-32 rounded-bl-full bg-[#ffdad3]/45 transition-transform group-hover:scale-110" />
                                    <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#8d493c] text-white shadow-md shadow-[#8d493c]/30">
                                        <IconGift size={24} />
                                    </div>
                                    <h3 className="mb-3 text-2xl font-bold">3. Tukarkan Reward</h3>
                                    <p className="text-[#3f4945]">Pilih reward yang kamu mau, dari topping gratis sampai bundle eksklusif.</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="relative py-20">
                        <div className="absolute inset-0 -z-20 origin-top-left skew-y-3 bg-[#ebefeb]" />

                        <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-0">
                            <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                                <div className="flex w-full justify-between items-center gap-4">
                                    <h2 className="mb-4 text-4xl font-bold md:text-5xl">Tukerin Poinmu Jadi...</h2>
                                    <p className="text-[#3f4945]">Makin banyak poin, makin banyak pilihan reward mbois buat kamu.</p>
                                </div>
                                {/* <button className="inline-flex items-center gap-1 text-sm font-bold text-[#096956] hover:underline">
                                    Lihat Katalog Lengkap
                                    <IconArrowNarrowRight size={16} />
                                </button> */}
                            </div>

                            <div className="grid auto-rows-[240px] grid-cols-1 gap-6 md:grid-cols-4">
                                <div className="group relative col-span-1 row-span-1 flex items-center justify-between overflow-hidden rounded-[32px] bg-white p-6 md:col-span-2">
                                    <div className="z-10 max-w-[220px]">
                                        <div className="mb-4 inline-block rounded-full border border-[#bec9c4] bg-[#f1f4f1] px-3 py-1 text-xs font-semibold">50 Poin</div>
                                        <h3 className="text-2xl font-bold">Free Topping</h3>
                                        <p className="mt-2 text-sm text-[#3f4945]">Boba, jelly, atau pudding gratis buat tambahan seger-seger.</p>
                                    </div>
                                    <div className="absolute inset-y-0 right-0 w-1/2">
                                        <img src={TEH_MBOIS_IMAGES.heroDrink} alt="Reward topping" className="h-full w-full object-cover opacity-80 transition-transform duration-500 group-hover:scale-105" />
                                        <div className="absolute inset-0 bg-gradient-to-r from-white to-transparent" />
                                    </div>
                                </div>

                                <div className="relative col-span-1 row-span-1 overflow-hidden rounded-[32px] bg-[#a2f2da] p-6">
                                    <div className="mb-3 inline-block rounded-full bg-[#096956] px-3 py-1 text-xs font-semibold text-white">100 Poin</div>
                                    <h3 className="text-2xl font-bold leading-tight text-[#005141]">Es Teh Original</h3>
                                    <span className="absolute bottom-4 right-4 text-[#096956]/25">
                                    </span>
                                </div>

                                <div className="group relative col-span-1 row-span-2 flex flex-col overflow-hidden rounded-[32px] bg-[#ab6153] p-6 text-white">
                                    <div>
                                        <div className="mb-4 inline-block rounded-full bg-[#8d493c] px-3 py-1 text-xs font-semibold">200 Poin</div>
                                        <h3 className="mb-2 text-2xl font-bold">Free Best Seller</h3>
                                        <p className="text-sm text-white/90">Bebas pilih menu favorit ukuran reguler.</p>
                                    </div>
                                    <div className="relative -mx-6 -mb-6 mt-auto h-48">
                                        <img src={TEH_MBOIS_IMAGES.heroDrink} alt="Best seller reward" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                    </div>
                                </div>

                                <div className="relative col-span-1 row-span-1 flex items-center justify-between overflow-hidden rounded-[32px] border border-[#bec9c4]/50 bg-[#f1f4f1] p-8 md:col-span-3">
                                    <div
                                        className="absolute inset-0 -z-10 opacity-30"
                                        style={{
                                            backgroundImage: "radial-gradient(rgba(9, 105, 86, 0.1) 2px, transparent 2px)",
                                            backgroundSize: "20px 20px",
                                        }}
                                    />
                                    <div className="flex w-full items-center gap-8">
                                        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-[#30826e] text-white">
                                            <IconTrophy size={36} />
                                        </div>
                                        <div className="flex-1">
                                            {/* <div className="mb-2 inline-block rounded-full bg-white px-3 py-1 text-xs font-semibold shadow-sm">350 Poin</div> */}
                                            <h3 className="text-2xl font-bold">Exclusive Mbois Bundle</h3>
                                            <p className="mt-1 text-sm text-[#3f4945]">2 Minuman Large + 2 Snack + Merchandise Eksklusif</p>
                                        </div>
                                        {/* <button className="hidden whitespace-nowrap rounded-full bg-[#181c1b] px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-80 md:flex">
                                            Tukar Sekarang
                                        </button> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="relative overflow-hidden py-10">
                        <div className="absolute inset-0 -z-20 bg-[#096956]" />
                        <div
                            className="absolute inset-0 -z-10 opacity-30"
                            style={{
                                backgroundImage: "radial-gradient(rgba(255,255,255,0.15) 2px, transparent 2px)",
                                backgroundSize: "28px 28px",
                            }}
                        />

                        <div className="mx-auto max-w-7xl px-4 py-20 rounded-2xl text-center text-white bg-[#096956] md:px-8">
                            <h2 className="mb-6 text-4xl font-bold md:text-6xl">Siap Jadi Anak Mbois?</h2>
                            <p className="mx-auto mb-10 max-w-2xl text-lg text-[#a2f2da]">
                                Gabung sekarang, langsung dapet 20 poin pertama gratis buat modal nongkrong!
                            </p>
                            <Link href="/register">
                                <button className="rounded-full bg-white px-10 py-4 text-lg font-bold text-[#096956] shadow-xl transition-all hover:scale-105 hover:shadow-2xl">
                                    Daftar Member Sekarang
                                </button>
                            </Link>
                        </div>
                    </section>
                </main>

                <TehMboisFooter />
            </div>
        </AppLayout>
    );
}
