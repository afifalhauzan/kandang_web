import { IconCheck, IconLeaf } from "@tabler/icons-react";
import { TEH_MBOIS_IMAGES } from "./constants";
import { Button } from "../ui/button";

export default function TehMboisHighlightsSection() {
    return (
        <section
            className="relative overflow-x-hidden py-14 pt-0"
            style={{
                background:
                    "linear-gradient(to bottom, rgba(245,236,220,0.8) 0%, rgb(255, 255, 255) 100%)",
            }}
        >
            <div
                className="pointer-events-none absolute -top-12 left-1/2 h-36 w-[110%] -translate-x-1/2 blur-3xl"
                style={{
                    background:
                        "radial-gradient(ellipse at center, rgba(29,158,117,0.14) 0%, rgba(29,158,117,0) 72%)",
                }}
            />
            <div className="relative mx-auto grid w-full max-w-[1280px] grid-cols-1 gap-6 px-4 md:grid-cols-3 md:px-8">
                <div className="group relative flex min-h-[280px] flex-col justify-between overflow-hidden rounded-3xl border border-[#bec9c4]/30 bg-[#f1f4f1] p-8">
                    <div className="relative z-10 max-w-[60%]">
                        <h3 className="mb-3 text-2xl font-bold text-[#181c1b]">Segarnya Teh Wonosari</h3>
                        <p className="mb-6 text-[#3f4945]">Daun teh pilihan dari perkebunan Wonosari Lawang untuk rasa otentik.</p>
                    </div>
                    <img
                        src={TEH_MBOIS_IMAGES.teaLeaf}
                        alt="Tea Leaves"
                        className="absolute -bottom-4 -right-4 h-48 w-48 rotate-12 object-contain transition-transform group-hover:scale-110"
                    />
                </div>

                <div className="group relative flex min-h-[280px] flex-col justify-between overflow-hidden rounded-3xl border border-[#bec9c4]/30 bg-[#f1f4f1] p-8">
                    <div className="relative z-10 max-w-[65%]">
                        <h3 className="mb-3 text-2xl font-bold text-[#181c1b]">Es Teh Tarik Mbois</h3>
                        <p className="mb-4 text-sm text-[#3f4945]">Perpaduan teh pekat dan susu kental yang ditarik hingga berbuih lembut.</p>
                        <div className="flex items-center flex-wrap gap-4">
                            <span className="text-2xl font-bold text-[#181c1b]">Rp 7.000</span>
                            <a href="#menu" className="flex items-center justify-center text-center gap-2 rounded-full  bg-white px-6 py-3 text-sm font-medium transition-all text-[#181c1b] hover:border-[#096956] hover:bg-[#096956] hover:text-white">
                                Cobain sekarang juga!
                            </a>
                        </div>
                    </div>
                    <img
                        src={TEH_MBOIS_IMAGES.heroDrink}
                        alt="Teh Tarik"
                        className="absolute -bottom-8 -right-8 h-60 w-60  transition-transform group-hover:scale-105"
                    />
                </div>

                <div className="group relative flex min-h-[280px] flex-col justify-between overflow-hidden rounded-3xl border border-[#bec9c4]/30 bg-[#f1f4f1] p-8">
                    <div className="relative z-10">
                        <div className="mb-4 flex items-start justify-between">
                            <h3 className="max-w-[200px] text-2xl font-bold text-[#181c1b]">Mbois Banget, Gak Pake Kimia</h3>
                            <div className="opacity-60">
                                <IconLeaf className="text-[#096956]" size={60} />
                            </div>
                        </div>
                        <div className="mt-4 flex flex-wrap gap-4 text-xs font-semibold text-xl">
                            <span className="-rotate-2 rounded-full bg-[#FFD966]/40 px-6 py-1.5 text-[#5B4100] transition-transform duration-200 hover:rotate-0">
                                Gula Aren
                            </span>
                            <span className="rotate-1 rounded-full bg-[#E6E0D9] px-6 py-1.5 text-[#4A443F] transition-transform duration-200 hover:rotate-0">
                                Lemon Sereh
                            </span>
                            <span className="-rotate-1 rounded-full bg-[#FCE4EC] px-12 py-1.5 text-[#880E4F] transition-transform duration-200 hover:rotate-0">
                                Susu Coklat
                            </span>
                            <span className="rotate-2 rounded-full bg-[#FFCCBC] px-6 py-2 text-[#BF360C] transition-transform duration-200 hover:rotate-0">
                                Jahe Merah
                            </span>
                            <span className="-rotate-1 inline-flex items-center gap-1 rounded-full bg-[#096956]/20 px-20 py-1.5 text-[#096956] transition-transform duration-200 hover:rotate-0">
                                Alami
                                <IconCheck size={14} />
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
