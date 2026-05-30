import { IconChartBar } from "@tabler/icons-react";
import { IconMug } from '@tabler/icons-react';
import { Link, usePage } from "@inertiajs/react";

export default function TehMboisClosingCtaSection() {
    return (
        <section className="mx-auto max-w-[1280px] bg-[#f7faf7] px-4 py-18 md:px-8">
            <div className="relative overflow-hidden rounded-[2.5rem] bg-[#F1EFE8] p-12 text-center md:p-20">
                <div className="absolute left-0 top-0 h-2 w-full bg-gradient-to-r from-[#096956] via-[#ab6153] to-[#4FAE83]" />

                <div className="relative z-10 mx-auto max-w-5xl">
                    <h2 className="font-cherry-freeland mb-6 text-6xl font-black leading-tight text-slate-800">Siap Ngerasain Kesegaran Mbois?</h2>
                    <p className="mx-auto mb-10 max-w-xl text-lg text-[#3f4945]">
                        Kunjungi outlet terdekat kami hari ini!
                    </p>
                    <div className="flex flex-col justify-center gap-4 sm:flex-row">
                        <Link href="/outlet">
                            <a
                                href="#outlet"
                                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#096956] px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-[#096956]/20 transition-colors hover:bg-[#096956]/90"
                            >
                                Cari Outlet Terdekat
                            </a>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
