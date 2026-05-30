import { IconArrowUpRight, IconChartLine, IconClock } from "@tabler/icons-react";

const FORECAST_ITEMS = [
    { label: "Prediksi Besok", value: "Rp 2.350.000", confidence: "92%", trend: "+8%" },
    { label: "Prediksi Minggu Depan", value: "Rp 15.800.000", confidence: "87%", trend: "+5%" },
    { label: "Prediksi Bulan Ini", value: "Rp 58.200.000", confidence: "81%", trend: "+11%" },
];

export default function ForecastCard() {
    return (
        <div className="overflow-hidden rounded-2xl border border-border/60 bg-background">
            <div className="p-5 pb-4">
                <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-50 text-violet-600">
                        <IconChartLine size={16} />
                    </div>
                    <div>
                        <h3 className="text-base font-semibold text-foreground">Forecast Penjualan</h3>
                        <p className="text-xs text-muted-foreground">Estimasi pendapatan berdasarkan model AI</p>
                    </div>
                </div>
            </div>
            <div className="space-y-3 px-5 pb-5">
                {FORECAST_ITEMS.map((item) => (
                    <div key={item.label} className="rounded-xl bg-muted/40 p-4 transition-all duration-200 hover:bg-muted/60">
                        <div className="flex items-center justify-between">
                            <p className="text-xs font-medium text-muted-foreground">{item.label}</p>
                            <div className="flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
                                <IconArrowUpRight size={11} />
                                {item.trend}
                            </div>
                        </div>
                        <p className="mt-1.5 text-xl font-bold tracking-tight text-foreground">{item.value}</p>
                        <div className="mt-2 flex items-center gap-1.5">
                            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                                <div
                                    className="h-full rounded-full bg-primary transition-all duration-500"
                                    style={{ width: item.confidence }}
                                />
                            </div>
                            <span className="text-[10px] font-semibold text-muted-foreground">{item.confidence}</span>
                        </div>
                        <p className="mt-1 text-[10px] text-muted-foreground">Confidence level</p>
                    </div>
                ))}
            </div>
            <div className="border-t border-border/60 px-5 py-3">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <IconClock size={13} />
                    <span>Terakhir diperbarui: 5 menit lalu</span>
                </div>
            </div>
        </div>
    );
}
