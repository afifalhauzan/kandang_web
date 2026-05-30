import {
    IconArrowDownRight,
    IconArrowUpRight,
    IconCash,
    IconChartBar,
    IconShoppingCart,
    IconTargetArrow,
} from "@tabler/icons-react";
import { cn } from "../../lib/utils";
import type { ReactNode } from "react";

type StatItem = {
    label: string;
    value: string;
    delta: string;
    trend: "up" | "down";
    icon: ReactNode;
    iconColor: string;
    iconBgColor: string;
};

const STAT_DATA: StatItem[] = [
    {
        label: "Total Penjualan",
        value: "Rp 14.250.000",
        delta: "+12.4%",
        trend: "up",
        icon: <IconCash size={20} />,
        iconColor: "text-emerald-600",
        iconBgColor: "bg-emerald-50",
    },
    {
        label: "Pesanan Minggu Ini",
        value: "1.284",
        delta: "+5.1%",
        trend: "up",
        icon: <IconShoppingCart size={20} />,
        iconColor: "text-blue-600",
        iconBgColor: "bg-blue-50",
    },
    {
        label: "Akurasi Prediksi",
        value: "91.2%",
        delta: "+3.2%",
        trend: "up",
        icon: <IconTargetArrow size={20} />,
        iconColor: "text-violet-600",
        iconBgColor: "bg-violet-50",
    },
    {
        label: "Potensi Waste",
        value: "6.4%",
        delta: "-1.1%",
        trend: "down",
        icon: <IconChartBar size={20} />,
        iconColor: "text-amber-600",
        iconBgColor: "bg-amber-50",
    },
];

export default function StatGrid() {
    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {STAT_DATA.map((item) => (
                <div
                    key={item.label}
                    className="group relative overflow-hidden rounded-2xl border border-border/60 bg-background p-5 transition-all duration-300 hover:border-border hover:shadow-lg hover:shadow-black/[0.03]"
                >
                    <div className="flex items-start justify-between">
                        <div className="space-y-3">
                            <p className="text-sm font-medium text-muted-foreground">{item.label}</p>
                            <p className="text-2xl font-bold tracking-tight text-foreground">{item.value}</p>
                        </div>
                        <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-xl", item.iconBgColor, item.iconColor)}>
                            {item.icon}
                        </div>
                    </div>
                    <div className="mt-3 flex items-center gap-1.5">
                        <div
                            className={cn(
                                "flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-semibold",
                                item.trend === "up"
                                    ? "bg-emerald-50 text-emerald-700"
                                    : "bg-amber-50 text-amber-700"
                            )}
                        >
                            {item.trend === "up" ? <IconArrowUpRight size={13} /> : <IconArrowDownRight size={13} />}
                            {item.delta}
                        </div>
                        <span className="text-xs text-muted-foreground">vs minggu lalu</span>
                    </div>
                </div>
            ))}
        </div>
    );
}
