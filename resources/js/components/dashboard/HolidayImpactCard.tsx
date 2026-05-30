import { IconCalendarEvent, IconFlag, IconMusic } from "@tabler/icons-react";
import { cn } from "../../lib/utils";

type HolidayEvent = {
    name: string;
    date: string;
    type: "holiday" | "event" | "local";
    impact: string;
    impactLevel: "high" | "medium" | "low";
};

const UPCOMING_EVENTS: HolidayEvent[] = [
    {
        name: "Hari Raya Waisak",
        date: "25 Mei 2026",
        type: "holiday",
        impact: "Prediksi penjualan naik 30%",
        impactLevel: "high",
    },
    {
        name: "Car Free Day Surabaya",
        date: "1 Juni 2026",
        type: "local",
        impact: "Outlet area CFD bisa naik 50%",
        impactLevel: "high",
    },
    {
        name: "Festival Kuliner Malang",
        date: "7 Juni 2026",
        type: "event",
        impact: "Potensi exposure brand meningkat",
        impactLevel: "medium",
    },
];

const TYPE_CONFIG = {
    holiday: { icon: <IconFlag size={16} />, bg: "bg-red-50 text-red-600", label: "Hari Libur" },
    event: { icon: <IconMusic size={16} />, bg: "bg-violet-50 text-violet-600", label: "Event" },
    local: { icon: <IconCalendarEvent size={16} />, bg: "bg-blue-50 text-blue-600", label: "Lokal" },
};

const IMPACT_COLORS = {
    high: "text-emerald-600",
    medium: "text-blue-600",
    low: "text-muted-foreground",
};

export default function HolidayImpactCard() {
    return (
        <div className="overflow-hidden rounded-2xl border border-border/60 bg-background">
            <div className="p-5 pb-4">
                <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-50 text-red-600">
                        <IconCalendarEvent size={16} />
                    </div>
                    <div>
                        <h3 className="text-base font-semibold text-foreground">Event & Hari Libur</h3>
                        <p className="text-xs text-muted-foreground">Faktor eksternal yang mempengaruhi penjualan</p>
                    </div>
                </div>
            </div>
            <div className="space-y-3 px-5 pb-5">
                {UPCOMING_EVENTS.map((event) => {
                    const config = TYPE_CONFIG[event.type];
                    return (
                        <div key={event.name} className="rounded-xl border border-border/50 p-3.5 transition-all duration-200 hover:border-border hover:shadow-sm">
                            <div className="flex items-start gap-3">
                                <div className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-lg", config.bg)}>
                                    {config.icon}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                        <p className="text-sm font-semibold text-foreground">{event.name}</p>
                                        <span className={cn("shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold", config.bg)}>
                                            {config.label}
                                        </span>
                                    </div>
                                    <p className="mt-0.5 text-xs text-muted-foreground">{event.date}</p>
                                    <p className={cn("mt-1 text-xs font-medium", IMPACT_COLORS[event.impactLevel])}>
                                        ↗ {event.impact}
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
