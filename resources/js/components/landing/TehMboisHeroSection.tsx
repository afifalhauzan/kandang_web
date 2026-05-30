import { IconArrowNarrowRight, IconAward, IconLeaf, IconStarFilled } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import CircularText from "./CircularText";
import { Link } from "@inertiajs/react";
import { TEH_MBOIS_IMAGES } from "./constants";

type IceDecorPlacement = {
    left: string;
    top: string;
    size: number;
    rotation: number;
    depth: number;
    floatDuration: number;
    floatOffset: number;
    opacity?: number;
};

const ICE_GLOW_BLUR_PX = 18;

// Editable ice decoration layout (tweak freely)
const ICE_DECOR_LAYOUT: IceDecorPlacement[] = [
    { left: "11%", top: "12%", size: 100, rotation: -18, depth: 0.04, floatDuration: 5.2, floatOffset: 8, opacity: 0.86 },
    { left: "78%", top: "15%", size: 82, rotation: 14, depth: 0.05, floatDuration: 5.8, floatOffset: 12, opacity: 0.9 },
    { left: "21%", top: "66%", size: 200, rotation: 24, depth: 0.06, floatDuration: 6.1, floatOffset: 10, opacity: 0.82 },
    { left: "84%", top: "70%", size: 58, rotation: -12, depth: 0.035, floatDuration: 5.4, floatOffset: 14, opacity: 0.78 },
];

export default function TehMboisHeroSection() {
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        let rafId = 0;

        const onScroll = () => {
            if (rafId) {
                return;
            }

            rafId = window.requestAnimationFrame(() => {
                setScrollY(window.scrollY);
                rafId = 0;
            });
        };

        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });

        return () => {
            window.removeEventListener("scroll", onScroll);
            if (rafId) {
                window.cancelAnimationFrame(rafId);
            }
        };
    }, []);

    const teaLeavesOffset = Math.min(scrollY * 0.14 - 20, 200);  //delay scroll

    const teaOffset = Math.min(scrollY * 0.14 - 20, 90);  //delay scroll
    const ratingOffset = Math.min(scrollY * 0.20, 52);
    const asliOffset = Math.min(scrollY * 0.11, 68);
    const bestOffset = Math.min(scrollY * 0.1, 60);

    return (
        <section
            id="tehmbois-hero"
            className="relative flex min-h-[80vh] flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#f7faf7] to-[#f1f4f1] pt-6"
        >
            <div
                className="pointer-events-none absolute inset-0 opacity-10"
                style={{
                    backgroundImage: "radial-gradient(#096956 1px, transparent 2px)",
                    backgroundSize: "32px 32px",
                }}
            />

            <div className="relative z-10 mx-auto w-full max-w-[1280px] px-4 text-center md:px-8">
                <div className="mx-auto flex max-w-6xl flex-col items-center gap-6">
                    <div className="inline-flex items-center gap-4 rounded-full  bg-[#BA7517]/10 px-8 py-3 text-sm font-semibold tracking-[0.08em] text-[#BA7517]">
                        <IconLeaf size={18} stroke={2} />
                        Segarkan Harimu dengan Mbois!
                    </div>

                    <h1 className="font-cherry-freeland text-6xl leading-[1.02] tracking-[0.02em] text-slate-800 md:text-9xl">
                        SEGAR, MBOIS, <br />
                        <span className="relative inline-block text-[#1D9E75]">
                            {/* 1. Wrap the text and give it a higher z-index */}
                            <span className="relative z-20">ORA MAHAL.</span>

                            {/* 2. The SVG sits at a lower z-index */}
                            <svg
                                className="absolute -bottom-5 left-0 w-full text-yellow-800/60 opacity-50 z-10"
                                preserveAspectRatio="none"
                                viewBox="0 0 100 20"
                            >
                                <path d="M0 10 Q 50 20 100 10" fill="none" stroke="currentColor" strokeWidth="4" />
                            </svg>
                        </span>
                    </h1>

                    <div className="mt-2 flex w-full max-w-4xl flex-col items-center gap-3 md:flex-row md:items-center md:justify-between">
                        <p className="max-w-3xl text-center text-lg md:text-xl md:text-left text-[#3f4945]">
                            Es teh khas Malang dari teh pilihan <strong>Wonosari</strong>, dipadukan rasa lokal yang segar dan ramah di
                            kantong.
                        </p>

                        <div className="flex items-center w-full justify-start gap-6 md:justify-end">
                            <a
                                href="#menu"
                                className="group inline-flex items-center gap-2 rounded-full bg-[#1D9E75] px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-[#1D9E75]/20 transition-colors hover:bg-[#1D9E75]/90"
                            >
                                Lihat Menu
                                <IconArrowNarrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                            </a>
                            <Link href="/outlet">
                                <a
                                    href="#outlet"
                                    className="inline-flex items-center gap-2 rounded-full border-2 border-[#BA7517]/30 px-8 py-4 text-sm font-semibold text-[#BA7517] transition-colors hover:bg-[#BA7517]/5"
                                >
                                    <IconLeaf size={18} />
                                    Kunjungi Outlet
                                </a>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="relative flex h-[400px] w-full items-end justify-center md:h-[600px]">
                    <div className="absolute inset-0 top-90 w-full rounded-full bg-[#F4E2D3]/100 blur-3xl animate-pulse" />
                    {TEH_MBOIS_IMAGES.iceDecor.map((src, index) => {
                        const config = ICE_DECOR_LAYOUT[index];
                        if (!config) {
                            return null;
                        }

                        return (
                            <img
                                key={`${src}-${index}`}
                                src={src}
                                alt=""
                                aria-hidden="true"
                                className="pointer-events-none absolute z-20 hidden select-none object-contain md:block"
                                style={{
                                    left: config.left,
                                    top: config.top,
                                    width: `${config.size}px`,
                                    height: `${config.size}px`,
                                    opacity: config.opacity ?? 0.85,
                                    animation: `float-${index} ${config.floatDuration}s ease-in-out infinite alternate`,
                                    transform: `translate3d(0, ${scrollY * config.depth}px, 0) rotate(${config.rotation}deg)`,
                                    filter: `drop-shadow(0 0 30px rgba(255, 255, 255, 0.8)) drop-shadow(0 0 ${ICE_GLOW_BLUR_PX}px rgba(255,255,255,0.6))`,
                                }}
                            />
                        );
                    })}

                    <div
                        className="absolute left-10 top-1/4 z-30 hidden items-center gap-3 rounded-2xl border border-[#BA7517]/35 bg-[#FCE6CC] p-4 shadow-xl backdrop-blur-sm md:flex animate-bounce will-change-transform"
                        style={{
                            animationDuration: "4s",
                            transform: `translate3d(0, ${ratingOffset}px, 0)`,
                        }}
                    >
                        <div className="rounded-full bg-[#BA7517]/25 p-2 text-[#8A5A12]">
                            <IconStarFilled size={18} />
                        </div>
                        <div className="text-left">
                            <p className="text-xs text-[#8A5A12]">Rating</p>
                            <p className="text-2xl font-bold leading-none text-[#8A5A12]">4.9</p>
                        </div>
                    </div>

                    <div
                        className="absolute right-10 top-1/3 z-30 hidden items-center gap-3 rounded-2xl border border-[#1D9E75]/35 bg-[#1D9E75] p-4 shadow-xl backdrop-blur-sm md:flex animate-bounce will-change-transform"
                        style={{
                            animationDuration: "3.5s",
                            animationDelay: "1s",
                            transform: `translate3d(0, ${asliOffset}px, 0)`,
                        }}
                    >
                        <div className="rounded-full bg-white/20 p-2 text-white">
                            <IconLeaf size={18} />
                        </div>
                        <div className="text-left">
                            <p className="text-xs text-white/90">100% Asli</p>
                            <p className="text-base font-bold leading-none text-white">Teh Wonosari Segar</p>
                        </div>
                    </div>

                    {/* <div
                        className="absolute bottom-1/4 left-1/4 z-100 hidden items-center gap-3 rounded-2xl border border-[#8B4513]/35 bg-[#F4E2D3] p-4 shadow-xl backdrop-blur-sm md:flex will-change-transform"
                        style={{
                            transform: `translate3d(-50%, ${bestOffset}px, 0)`,
                        }}
                    >
                        <div className="rounded-full bg-[#8B4513]/20 p-2 text-[#8B4513]">
                            <IconAward size={18} />
                        </div>
                        <div className="text-left">
                            <p className="text-base font-bold leading-none text-[#8B4513]">Terbaik di Malang</p>
                        </div>
                    </div> */}

                    <img
                        src={TEH_MBOIS_IMAGES.heroDrink}
                        alt="Es Teh Tarik Segar"
                        className="relative z-50 h-full scale-100 object-contain drop-shadow-2xl will-change-transform"
                        style={{
                            transform: `translate3d(0, ${teaOffset}px, 0)`,
                        }}
                    />



                    <img
                        src={TEH_MBOIS_IMAGES.teaLeaf}
                        alt="Tea Leaves"
                        className="absolute rotate-30 left-1/3 top-10 z-10 h-24 w-24 object-contain drop-shadow-xl"
                        style={{ transform: `translate3d(0, ${teaLeavesOffset}px, 0)` }}
                    />
                    <img
                        src={TEH_MBOIS_IMAGES.teaLeaf}
                        alt="Tea Leaves"
                        className="absolute bottom-10 right-1/3 z-0 h-32 w-32 rotate-45 animate-bounce object-contain opacity-80 blur-[2px] drop-shadow-lg"
                        style={{ animationDuration: "6s" }}
                    />
                </div>
            </div>

            {/* Steam-like dissolve bridge into next section */}
            <div className="absolute inset-x-0 bottom-0 pointer-events-none overflow-hidden h-48 z-20 select-none">

                {/* Base Linear Dissolve: Transitions into the next section's starting cream color */}
                <div
                    className="absolute inset-x-0 bottom-0 h-full z-10"
                    style={{
                        background: "linear-gradient(to top, rgba(245, 236, 220, 1) 0%, rgba(245, 236, 220, 0.4) 50%, rgba(255, 255, 255, 0) 80%, rgba(187, 138, 23, 0) 90%)",
                    }}
                />

                {/* Primary Billowing Steam: Deep Warm Tea-Tone Mist Core */}
                <div
                    className="absolute -bottom-16 left-1/4 h-64 w-[70%] rounded-full blur-3xl z-10 opacity-70 mix-blend-multiply scale-x-125 animate-pulse duration-[6000ms]"
                    style={{
                        background: "radial-gradient(circle at center, rgba(141, 73, 60, 0.15) 0%, rgba(245, 236, 220, 0) 70%)",
                    }}
                />

                {/* Secondary Billowing Steam: Fresh Green Tea Accent Mist */}
                <div
                    className="absolute -bottom-20 right-1/4 h-60 w-[65%] rounded-full blur-3xl z-10 opacity-40 mix-blend-multiply scale-y-75 animate-pulse duration-[4000ms]"
                    style={{
                        background: "radial-gradient(circle at center, rgba(9, 105, 86, 0.1) 0%, rgba(245, 236, 220, 0) 75%)",
                    }}
                />

                {/* Intense Warm Vapor Core: Perfectly matches the next section's color to mask the seam */}
                <div
                    className="absolute -bottom-12 left-1/2 -translate-x-1/2 h-52 w-[115%] blur-2xl z-10 opacity-95"
                    style={{
                        background: "radial-gradient(ellipse at center, rgba(245, 236, 220, 1) 0%, rgba(245, 236, 220, 0) 80%)",
                    }}
                />

                {/* Soft Ambient Blend Layer */}
                <div
                    className="absolute inset-x-0 bottom-0 h-20 opacity-50 blur-md"
                    style={{
                        background: "linear-gradient(to top, rgba(245, 236, 220, 0.6), transparent)",
                    }}
                />
            </div>

            <div
                className="absolute bottom-38 left-1/3 z-30 hidden items-center gap-3 rounded-2xl border border-[#8B4513]/35 bg-[#F4E2D3] p-4 shadow-xl backdrop-blur-sm md:flex will-change-transform"
                style={{
                    transform: `translate3d(-50%, ${bestOffset}px, 0)`,
                }}
            >
                <div className="rounded-full bg-[#8B4513]/20 p-2 text-[#8B4513]">
                    <IconAward size={18} />
                </div>
                <div className="text-left">
                    <p className="text-base font-bold leading-none text-[#8B4513]">Terbaik di Malang</p>
                </div>
            </div>

            <div className="absolute right-1/4 -bottom-10 z-40 hidden -translate-y-1/2 lg:block">
                <div className="rounded-full border border-white/40 bg-white/10 p-3 backdrop-blur-sm">
                    <CircularText
                        text="SEGAR*ORA*MAHAL*"
                        onHover="speedUp"
                        spinDuration={20}
                        className="scale-90"
                    />
                </div>
            </div>

            <style>{`
                @keyframes float-0 { from { margin-top: 0px; } to { margin-top: -${ICE_DECOR_LAYOUT[0]?.floatOffset ?? 8}px; } }
                @keyframes float-1 { from { margin-top: 0px; } to { margin-top: -${ICE_DECOR_LAYOUT[1]?.floatOffset ?? 10}px; } }
                @keyframes float-2 { from { margin-top: 0px; } to { margin-top: -${ICE_DECOR_LAYOUT[2]?.floatOffset ?? 12}px; } }
                @keyframes float-3 { from { margin-top: 0px; } to { margin-top: -${ICE_DECOR_LAYOUT[3]?.floatOffset ?? 14}px; } }
            `}</style>
        </section>
    );
}
