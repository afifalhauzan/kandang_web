import { footerColumns } from "@/components/landing/content";
import { IconAt, IconMapPin, IconTrophy } from "@tabler/icons-react";

export default function LandingFooter() {
    return (
        <footer className="border-t border-slate-200 bg-[#ecece7] px-6 py-16">
            <div className="mx-auto w-full max-w-6xl">
                <div className="grid gap-10 md:grid-cols-[1.2fr_repeat(3,1fr)]">
                    <div>
                        <p className="font-[Manrope] text-2xl font-bold text-emerald-800">TernakMVP</p>
                        <p className="mt-4 max-w-sm text-sm leading-6 text-slate-600">
                            Website pengenalan untuk platform manajemen peternakan yang membantu peternak dan pengelola kandang bekerja lebih rapi, lebih cepat, dan lebih siap bertumbuh ke fitur AI.
                        </p>
                    </div>

                    {footerColumns.map((column) => (
                        <div key={column.title}>
                            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{column.title}</h3>
                            <ul className="mt-4 space-y-3 text-sm text-slate-600">
                                {column.links.map((link) => (
                                    <li key={link}>{link}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="mt-10 flex flex-col gap-4 border-t border-slate-200 pt-6 md:flex-row md:items-center md:justify-between">
                    <p className="text-sm text-slate-500">© 2026 TernakMVP</p>
                    <div className="flex items-center gap-4 text-slate-500">
                        <span className="inline-flex items-center gap-2 text-sm"><IconAt size={16} /> hello@ternakmvp.local</span>
                        <span className="inline-flex items-center gap-2 text-sm"><IconMapPin size={16} /> Jakarta</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
