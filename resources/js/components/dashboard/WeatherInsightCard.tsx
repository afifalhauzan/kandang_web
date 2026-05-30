import { IconCloud, IconDroplet, IconSun, IconTemperature, IconWind } from "@tabler/icons-react";

const WEATHER_FORECAST = [
    { day: "Hari Ini", icon: <IconSun size={20} />, temp: "34°C", condition: "Cerah", impact: "Penjualan es teh diprediksi naik 15%", impactType: "positive" as const },
    { day: "Besok", icon: <IconCloud size={20} />, temp: "30°C", condition: "Berawan", impact: "Penjualan normal, tidak ada dampak signifikan", impactType: "neutral" as const },
    { day: "Lusa", icon: <IconDroplet size={20} />, temp: "27°C", condition: "Hujan", impact: "Potensi penurunan 10% pada jam siang", impactType: "negative" as const },
];

export default function WeatherInsightCard() {
    return (
        <div className="overflow-hidden rounded-2xl border border-border/60 bg-background">
            <div className="p-5 pb-4">
                <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-50 text-sky-600">
                        <IconTemperature size={16} />
                    </div>
                    <div>
                        <h3 className="text-base font-semibold text-foreground">Cuaca & Dampak</h3>
                        <p className="text-xs text-muted-foreground">Prediksi dampak cuaca pada penjualan</p>
                    </div>
                </div>
            </div>
            <div className="space-y-0 px-5 pb-5">
                {WEATHER_FORECAST.map((item) => (
                    <div key={item.day} className="flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-muted/40">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-muted text-muted-foreground">
                            {item.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                                <p className="text-sm font-semibold text-foreground">{item.day}</p>
                                <span className="text-xs text-muted-foreground">{item.temp} · {item.condition}</span>
                            </div>
                            <p className={`mt-0.5 text-xs ${
                                item.impactType === "positive"
                                    ? "text-emerald-600"
                                    : item.impactType === "negative"
                                        ? "text-amber-600"
                                        : "text-muted-foreground"
                            }`}>
                                {item.impact}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="border-t border-border/60 px-5 py-3">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <IconWind size={13} />
                    <span>Data cuaca dari OpenWeatherMap API</span>
                </div>
            </div>
        </div>
    );
}
