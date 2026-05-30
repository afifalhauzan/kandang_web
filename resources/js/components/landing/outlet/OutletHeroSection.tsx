import {  IconClockHour4, IconSchool, IconTrees } from "@tabler/icons-react";

const HERO_IMAGE =
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCpTRCGvgSGqq2xK7yHvDA4az6ly44TFigt0xvD5reYvClSO4ogO5EnY-GQigdlHxVtLklB5N8M1xTfglGLeJ10FJC-T-4yNNCEt_eaJx0fol_STgTsNYAyP6Amjz8hSggGtneltV1Hy7fQv4MFLdPZ3rzXnAvSrXVKEWAj7R9HvyODEqcABiMJCNEU9LmTMKj84FAVUwoa2xwujd8JVGEGz7EnUIrbwD9ubi5fVeB4dIzEdApYJZwd1BmxjTfnnBQ5dKBDm0Uo7qfi";

export default function OutletHeroSection() {
    return (
        <section className="relative flex h-[50vh] items-center overflow-hidden">
            <div className="absolute inset-0 z-0">
                <img src={HERO_IMAGE} alt="Outlet TehMbois" className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />
            </div>

            <div className="relative z-10 mx-auto w-full max-w-6xl px-4 md:px-0">
                <div className="max-w-4xl text-white">
                    <h1 className="font-cherry-freeland mb-6 text-5xl text-slate-100 leading-tight md:text-7xl">Nongkrong Mbois di Kota Malang</h1>
                    <p className="mb-10 text-lg text-white/90">
                        Nikmati suasana semi-outdoor yang cozy dengan sentuhan kayu hangat dan kesegaran es teh pilihan Wonosari.
                    </p>

                </div>
            </div>
        </section>
    );
}
