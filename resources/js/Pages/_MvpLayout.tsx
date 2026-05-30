import { Head, Link } from "@inertiajs/react";
import type { ReactNode } from "react";

type MvpLayoutProps = {
    title: string;
    children: ReactNode;
};

const navItems = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Farms", href: "/farms" },
    { label: "Barns", href: "/barns" },
    { label: "Livestock", href: "/livestock" },
    { label: "Health", href: "/health-records" },
    { label: "Vaccinations", href: "/vaccinations" },
    { label: "Disease AI", href: "/disease-detections" },
    { label: "Feed Calculator", href: "/feed-formulas" },
    { label: "Price Radar", href: "/price-radar" },
    { label: "Weather", href: "/weather" },
    { label: "Assistant", href: "/assistant" },
];

export default function MvpLayout({ title, children }: MvpLayoutProps) {
    const pathname = typeof window !== "undefined" ? window.location.pathname : "";

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900">
            <Head title={title} />
            <header className="border-b bg-white">
                <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-2 px-4 py-3">
                    <h1 className="mr-4 text-lg font-semibold">Ternak MVP</h1>
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`rounded px-3 py-1 text-sm ${isActive ? "bg-emerald-600 text-white" : "bg-slate-100 text-slate-700"}`}
                            >
                                {item.label}
                            </Link>
                        );
                    })}
                    <div className="ml-auto">
                        <Link href="/logout" method="post" as="button" className="rounded bg-red-600 px-3 py-1 text-sm text-white">
                            Logout
                        </Link>
                    </div>
                </div>
            </header>
            <main className="mx-auto max-w-7xl p-4">{children}</main>
        </div>
    );
}
