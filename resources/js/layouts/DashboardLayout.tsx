import { Link, usePage } from "@inertiajs/react";
import {
    IconBell,
    IconChartBar,
    IconLayoutDashboard,
    IconMenu2,
    IconPackage,
    IconReceipt,
    IconCalendarEvent,
    IconFileAnalytics,
    IconBuildingStore,
    IconSparkles,
    IconAlertTriangle,
    IconTrendingUp,
    IconCloud,
    IconCheck,
} from "@tabler/icons-react";
import { useState, type ReactNode } from "react";
import AuthButton from "../components/AuthButton";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "../components/ui/sheet";
import { Badge } from "../components/ui/badge";
import type { InertiaPageProps } from "../types/page-props";
import { cn } from "../lib/utils";
import AppLayout from "./AppLayout";

type DashboardLayoutProps = {
    title: string;
    description: string;
    children: ReactNode;
    greenBackground?: boolean;
};

type NavItem = {
    label: string;
    href: string;
    icon: ReactNode;
};

const navItems: NavItem[] = [
    { label: "Dashboard", href: "/dashboard", icon: <IconLayoutDashboard size={18} /> },
    { label: "Bisnis & Kedai", href: "/dashboard/manajemen-bisnis", icon: <IconBuildingStore size={18} /> },
    { label: "Manajemen Menu", href: "/dashboard/manajemen-menu", icon: <IconPackage size={18} /> },
    { label: "Penjualan", href: "/dashboard/penjualan", icon: <IconReceipt size={18} /> },
    { label: "Prediksi AI", href: "/dashboard/prediksi", icon: <IconChartBar size={18} /> },
    { label: "Faktor Eksternal", href: "/dashboard/faktor-eksternal", icon: <IconCalendarEvent size={18} /> },
    { label: "Laporan", href: "/dashboard/laporan", icon: <IconFileAnalytics size={18} /> },
];

type NotificationItem = {
    id: string;
    title: string;
    description: string;
    time: string;
    type: "ai" | "warning" | "success" | "weather";
    read: boolean;
};

const MOCK_NOTIFICATIONS: NotificationItem[] = [
    {
        id: "n1",
        title: "Prediksi AI Diperbarui",
        description: "Model telah menghitung ulang prediksi minggu depan. Es Teh Tarik diprediksi naik 18% karena cuaca panas.",
        time: "5 menit lalu",
        type: "ai",
        read: false,
    },
    {
        id: "n2",
        title: "Stok Gula Aren Menipis",
        description: "Estimasi habis dalam 2 hari berdasarkan rata-rata penggunaan harian. Segera restock.",
        time: "32 menit lalu",
        type: "warning",
        read: false,
    },
    {
        id: "n3",
        title: "Penjualan Melebihi Target",
        description: "Penjualan hari ini sudah mencapai 112% dari target prediksi AI. Pertahankan momentum!",
        time: "1 jam lalu",
        type: "success",
        read: false,
    },
    {
        id: "n4",
        title: "Peringatan Cuaca Besok",
        description: "Prakiraan hujan deras di wilayah Malang. Pertimbangkan mengurangi produksi minuman dingin.",
        time: "2 jam lalu",
        type: "weather",
        read: true,
    },
    {
        id: "n5",
        title: "Rekomendasi Produksi Tersedia",
        description: "Rekomendasi produksi untuk hari Sabtu & Minggu sudah siap. Cek halaman Prediksi AI.",
        time: "3 jam lalu",
        type: "ai",
        read: true,
    },
    {
        id: "n6",
        title: "Laporan Mingguan Siap",
        description: "Laporan performa 12-18 Mei 2026 sudah bisa diunduh. Akurasi model: 94.2%.",
        time: "5 jam lalu",
        type: "success",
        read: true,
    },
];

const NOTIFICATION_STYLES = {
    ai: { icon: <IconSparkles size={16} />, bg: "bg-violet-50", text: "text-violet-600", border: "border-violet-100" },
    warning: { icon: <IconAlertTriangle size={16} />, bg: "bg-amber-50", text: "text-amber-600", border: "border-amber-100" },
    success: { icon: <IconTrendingUp size={16} />, bg: "bg-emerald-50", text: "text-emerald-600", border: "border-emerald-100" },
    weather: { icon: <IconCloud size={16} />, bg: "bg-blue-50", text: "text-blue-600", border: "border-blue-100" },
};

function NotificationPanel() {
    const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);

    const unreadCount = notifications.filter(n => !n.read).length;

    const handleMarkAllRead = () => {
        setNotifications(notifications.map(n => ({ ...n, read: true })));
    };

    const handleMarkRead = (id: string) => {
        setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
    };

    return (
        <Sheet>
            <SheetTrigger asChild>
                <button className="relative text-white/60 transition-colors hover:text-white">
                    <IconBell size={18} />
                    {unreadCount > 0 && (
                        <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-400 text-[9px] font-bold text-emerald-950 border border-emerald-900">
                            {unreadCount}
                        </span>
                    )}
                </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:w-[420px] p-0 flex flex-col">
                <SheetHeader className="border-b px-5 py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <SheetTitle className="text-lg">Notifikasi</SheetTitle>
                            <SheetDescription>{unreadCount} belum dibaca</SheetDescription>
                        </div>
                        {unreadCount > 0 && (
                            <button
                                onClick={handleMarkAllRead}
                                className="flex items-center gap-1.5 rounded-lg bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary transition-colors hover:bg-primary/20"
                            >
                                <IconCheck size={14} />
                                Tandai Semua Dibaca
                            </button>
                        )}
                    </div>
                </SheetHeader>

                <div className="flex-1 overflow-y-auto">
                    <div className="divide-y divide-border/60">
                        {notifications.map((notif) => {
                            const style = NOTIFICATION_STYLES[notif.type];
                            return (
                                <button
                                    key={notif.id}
                                    onClick={() => handleMarkRead(notif.id)}
                                    className={cn(
                                        "w-full text-left px-5 py-4 transition-colors hover:bg-muted/30",
                                        !notif.read && "bg-primary/[0.03]"
                                    )}
                                >
                                    <div className="flex items-start gap-3">
                                        <div className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border", style.bg, style.text, style.border)}>
                                            {style.icon}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-0.5">
                                                <p className={cn("text-sm font-semibold text-foreground truncate", !notif.read && "text-foreground")}>
                                                    {notif.title}
                                                </p>
                                                {!notif.read && (
                                                    <span className="h-2 w-2 shrink-0 rounded-full bg-primary" />
                                                )}
                                            </div>
                                            <p className="text-xs leading-relaxed text-muted-foreground line-clamp-2">
                                                {notif.description}
                                            </p>
                                            <p className="mt-1.5 text-[11px] font-medium text-muted-foreground/70">
                                                {notif.time}
                                            </p>
                                        </div>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div className="border-t px-5 py-3">
                    <p className="text-center text-xs text-muted-foreground">Menampilkan 6 notifikasi terbaru</p>
                </div>
            </SheetContent>
        </Sheet>
    );
}

function DesktopNavLinks({ items, currentPath }: { items: NavItem[]; currentPath: string }) {
    return (
        <nav className="flex items-center gap-1">
            {items.map((item) => {
                const active = currentPath === item.href;
                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                            "relative px-4 py-2 text-sm font-medium tracking-wide transition-all duration-300",
                            active
                                ? "text-white"
                                : "text-white/70 hover:text-white"
                        )}
                    >
                        {item.label}
                        {active && (
                            <span className="absolute bottom-0 left-1/2 h-0.5 w-5 -translate-x-1/2 rounded-full bg-white" />
                        )}
                    </Link>
                );
            })}
        </nav>
    );
}

function MobileNavLinks({
    items,
    currentPath,
    onSelect,
}: {
    items: NavItem[];
    currentPath: string;
    onSelect?: () => void;
}) {
    return (
        <nav className="flex flex-col gap-1">
            {items.map((item) => {
                const active = currentPath === item.href;
                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        onClick={onSelect}
                        className={cn(
                            "inline-flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200",
                            active
                                ? "bg-primary/10 text-primary"
                                : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        )}
                    >
                        <span className="shrink-0">{item.icon}</span>
                        <span>{item.label}</span>
                    </Link>
                );
            })}
        </nav>
    );
}

export default function DashboardLayout({ title, description, greenBackground, children }: DashboardLayoutProps) {
    const { url } = usePage<InertiaPageProps>();
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <AppLayout>
            <div className={cn(
                "flex min-h-screen flex-col",
                greenBackground ? "bg-gradient-to-br from-emerald-50/50 via-background to-emerald-50/30" : "bg-muted/20"
            )}>
                <header className="sticky top-0 z-30">
                    <div className="relative overflow-hidden">
                        <img
                            src="/es teh/navowner.jpeg"
                            alt=""
                            className="absolute inset-0 h-full w-full object-cover object-center"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/85 via-emerald-900/75 to-emerald-950/85" />
                        <div className="absolute inset-0 bg-black/20" />

                        <div className="relative flex items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
                            <div className="flex items-center gap-6">
                                <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                                    <SheetTrigger asChild>
                                        <button className="text-white/80 transition-colors hover:text-white md:hidden" aria-label="Open menu">
                                            <IconMenu2 size={22} />
                                        </button>
                                    </SheetTrigger>
                                    <SheetContent side="left" className="w-72 p-0">
                                        <SheetHeader className="border-b px-5 py-4">
                                            <SheetTitle className="flex items-center gap-2.5">
                                                <img src="/logo.svg" alt="TehMbois" className="h-7 w-auto" />
                                                <span className="text-base font-bold">TehMbois</span>
                                            </SheetTitle>
                                            <SheetDescription>Outlet Management System</SheetDescription>
                                        </SheetHeader>
                                        <div className="p-3">
                                            <MobileNavLinks items={navItems} currentPath={url} onSelect={() => setMobileOpen(false)} />
                                        </div>
                                    </SheetContent>
                                </Sheet>

                                <Link href="/dashboard" className="flex items-center gap-2.5">
                                    <img src="/logo.svg" alt="TehMbois" className="h-8 w-auto brightness-0 invert" />
                                </Link>
                            </div>

                            <div className="hidden md:block">
                                <DesktopNavLinks items={navItems} currentPath={url} />
                            </div>

                            <div className="flex items-center gap-3">
                                <NotificationPanel />
                                <AuthButton />
                            </div>
                        </div>
                    </div>
                </header>

                <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-7xl">
                        <div className="mb-8">
                            <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">{title}</h1>
                            <p className="mt-1 text-sm text-muted-foreground">{description}</p>
                        </div>
                        {children}
                    </div>
                </main>
            </div>
        </AppLayout>
    );
}
