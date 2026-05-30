import { IconBulb, IconRobotFace, IconSparkles, IconAlertTriangle } from "@tabler/icons-react";
import { cn } from "../../lib/utils";

type Recommendation = {
    title: string;
    description: string;
    type: "action" | "warning" | "opportunity";
    priority: "high" | "medium" | "low";
};

const RECOMMENDATIONS: Recommendation[] = [
    {
        title: "Tambah stok Es Teh Lemon",
        description: "Cuaca panas 3 hari ke depan + weekend. Prediksi permintaan naik 25%. Siapkan bahan baku ekstra.",
        type: "action",
        priority: "high",
    },
    {
        title: "Promo Es Teh Jahe di hari hujan",
        description: "Penjualan Es Teh Jahe naik 40% saat hujan. Pertimbangkan diskon bundling untuk Rabu depan.",
        type: "opportunity",
        priority: "medium",
    },
    {
        title: "Stok gula aren menipis",
        description: "Estimasi habis dalam 2 hari berdasarkan rata-rata penggunaan. Segera restock.",
        type: "warning",
        priority: "high",
    },
];

const TYPE_STYLES = {
    action: {
        icon: <IconSparkles size={16} />,
        iconBg: "bg-emerald-50 text-emerald-600",
        border: "border-emerald-100",
    },
    opportunity: {
        icon: <IconBulb size={16} />,
        iconBg: "bg-blue-50 text-blue-600",
        border: "border-blue-100",
    },
    warning: {
        icon: <IconAlertTriangle size={16} />,
        iconBg: "bg-amber-50 text-amber-600",
        border: "border-amber-100",
    },
};

const PRIORITY_STYLES = {
    high: "bg-red-50 text-red-700",
    medium: "bg-amber-50 text-amber-700",
    low: "bg-muted text-muted-foreground",
};

export default function AIRecommendationCard() {
    return (
        <div className="overflow-hidden rounded-2xl border border-border/60 bg-background">
            <div className="p-5 pb-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                            <IconRobotFace size={16} />
                        </div>
                        <div>
                            <h3 className="text-base font-semibold text-foreground">Rekomendasi AI</h3>
                            <p className="text-xs text-muted-foreground">Saran tindakan berdasarkan analisis data</p>
                        </div>
                    </div>
                    <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-semibold text-primary">
                        3 saran baru
                    </span>
                </div>
            </div>
            <div className="space-y-3 px-5 pb-5">
                {RECOMMENDATIONS.map((rec) => {
                    const style = TYPE_STYLES[rec.type];
                    return (
                        <div
                            key={rec.title}
                            className={cn(
                                "rounded-xl border p-4 transition-all duration-200 hover:shadow-sm",
                                style.border
                            )}
                        >
                            <div className="flex items-start gap-3">
                                <div className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-lg", style.iconBg)}>
                                    {style.icon}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                        <p className="text-sm font-semibold text-foreground">{rec.title}</p>
                                        <span className={cn("shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold", PRIORITY_STYLES[rec.priority])}>
                                            {rec.priority === "high" ? "Urgent" : rec.priority === "medium" ? "Medium" : "Low"}
                                        </span>
                                    </div>
                                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{rec.description}</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
