import { Link } from "@inertiajs/react";
import { Button } from "@/components/ui/button";

const navItems = [
    { label: "Masalah", href: "#masalah" },
    { label: "Solusi", href: "#solusi" },
    { label: "AI Support", href: "#ai-support" },
    { label: "Dashboard", href: "#dashboard-preview" },
];

export default function LandingNavbar() {
    return (
        <header className="fixed inset-x-0 top-0 z-50 border-b border-emerald-900/10 bg-[#faf9f8]/90 backdrop-blur-md">
            <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
                <div>
                    <p className="font-[Manrope] text-lg font-bold text-emerald-800">TernakMVP</p>
                </div>

                <div className="hidden items-center gap-8 md:flex">
                    {navItems.map((item) => (
                        <a
                            key={item.href}
                            href={item.href}
                            className="text-sm font-medium text-slate-600 transition-colors hover:text-emerald-800"
                        >
                            {item.label}
                        </a>
                    ))}
                </div>

                <div className="flex items-center gap-2">
                    <Button asChild variant="outline" className="border-emerald-200 bg-white/80 text-slate-800 hover:bg-emerald-50">
                        <Link href="/login">Login</Link>
                    </Button>
                    <Button asChild className="bg-emerald-700 text-white hover:bg-emerald-800">
                        <Link href="/register">Register</Link>
                    </Button>
                </div>
            </nav>
        </header>
    );
}
