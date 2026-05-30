import { Head } from "@inertiajs/react";
import DashboardLayout from "../layouts/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { IconCloudRain, IconSun, IconCloud, IconCalendarEvent, IconMapPin, IconTemperature } from "@tabler/icons-react";

const WEATHER_FORECAST = [
    { date: "15 Mei", day: "Senin", temp: "32°", icon: <IconSun size={24} className="text-amber-500" />, condition: "Cerah", impact: "Tinggi", rain: "0%" },
    { date: "16 Mei", day: "Selasa", temp: "33°", icon: <IconSun size={24} className="text-amber-500" />, condition: "Cerah", impact: "Tinggi", rain: "5%" },
    { date: "17 Mei", day: "Rabu", temp: "30°", icon: <IconCloud size={24} className="text-slate-400" />, condition: "Berawan", impact: "Sedang", rain: "20%" },
    { date: "18 Mei", day: "Kamis", temp: "28°", icon: <IconCloudRain size={24} className="text-blue-500" />, condition: "Hujan Ringan", impact: "Rendah", rain: "60%" },
    { date: "19 Mei", day: "Jumat", temp: "27°", icon: <IconCloudRain size={24} className="text-blue-500" />, condition: "Hujan Sedang", impact: "Rendah", rain: "80%" },
    { date: "20 Mei", day: "Sabtu", temp: "31°", icon: <IconSun size={24} className="text-amber-500" />, condition: "Cerah Berawan", impact: "Tinggi", rain: "10%" },
    { date: "21 Mei", day: "Minggu", temp: "32°", icon: <IconSun size={24} className="text-amber-500" />, condition: "Cerah", impact: "Sangat Tinggi", rain: "0%" },
    { date: "22 Mei", day: "Senin", temp: "31°", icon: <IconCloud size={24} className="text-slate-400" />, condition: "Berawan", impact: "Sedang", rain: "15%" },
    { date: "23 Mei", day: "Selasa", temp: "29°", icon: <IconCloudRain size={24} className="text-blue-500" />, condition: "Hujan Siang", impact: "Menurun", rain: "50%" },
    { date: "24 Mei", day: "Rabu", temp: "33°", icon: <IconSun size={24} className="text-amber-500" />, condition: "Sangat Cerah", impact: "Sangat Tinggi", rain: "0%" },
    { date: "25 Mei", day: "Kamis", temp: "31°", icon: <IconCloud size={24} className="text-slate-400" />, condition: "Cerah Berawan", impact: "Tinggi", rain: "10%" },
    { date: "26 Mei", day: "Jumat", temp: "28°", icon: <IconCloudRain size={24} className="text-blue-500" />, condition: "Hujan Petir", impact: "Sangat Rendah", rain: "90%" },
    { date: "27 Mei", day: "Sabtu", temp: "29°", icon: <IconCloud size={24} className="text-slate-400" />, condition: "Mendung", impact: "Sedang", rain: "30%" },
    { date: "28 Mei", day: "Minggu", temp: "31°", icon: <IconSun size={24} className="text-amber-500" />, condition: "Cerah", impact: "Tinggi", rain: "5%" },
];

const HOLIDAYS = [
    { date: "23 Mei 2026", name: "Hari Raya Waisak", type: "Libur Nasional", impact: "+45% Penjualan" },
    { date: "1 Juni 2026", name: "Hari Lahir Pancasila", type: "Libur Nasional", impact: "+20% Penjualan" },
    { date: "17 Juni 2026", name: "Idul Adha", type: "Libur Nasional", impact: "+50% Penjualan" },
];

const LOCAL_EVENTS = [
    { date: "19 - 21 Mei 2026", name: "Festival Kuliner Malang", location: "Alun-Alun Malang", distance: "1.2 km", impact: "Potensi peningkatan traffic walk-in" },
    { date: "28 Mei 2026", name: "Car Free Day Special", location: "Jl. Ijen", distance: "3 km", impact: "Peluang pop-up booth" },
];

export default function ExternalFactors() {
    return (
        <DashboardLayout 
            title="Faktor Eksternal" 
            description="Detail kondisi cuaca, hari libur, dan acara lokal yang memengaruhi operasional harian."
        >
            <Head title="Faktor Eksternal" />

            <div className="space-y-8">
                {/* Section Cuaca */}
                <section>
                    <div className="mb-4">
                        <h2 className="text-xl font-bold tracking-tight text-foreground">Prakiraan Cuaca 14 Hari</h2>
                        <p className="text-sm text-muted-foreground">Kondisi cuaca memengaruhi secara langsung volume penjualan produk minuman dingin.</p>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
                        {WEATHER_FORECAST.map((w, idx) => (
                            <Card key={idx} className="border-border/60 shadow-sm transition-all hover:-translate-y-1 hover:border-primary/30">
                                <CardContent className="p-4 flex flex-col items-center text-center">
                                    <div className="text-sm font-semibold text-foreground/80">{w.day}</div>
                                    <div className="text-xs text-muted-foreground mb-3">{w.date}</div>
                                    
                                    <div className="mb-2 p-2 rounded-full bg-slate-50 border border-slate-100">
                                        {w.icon}
                                    </div>
                                    
                                    <div className="text-xl font-bold text-foreground tracking-tighter mb-1">{w.temp}</div>
                                    <div className="text-[10px] uppercase font-semibold text-muted-foreground tracking-wider line-clamp-1 mb-3 h-3">
                                        {w.condition}
                                    </div>

                                    <div className="w-full flex justify-between items-center text-[11px] font-medium mt-auto pt-3 border-t border-border/50">
                                        <span className="text-blue-600 font-semibold">{w.rain}</span>
                                        <span className={w.impact.includes("Tinggi") ? "text-emerald-600 font-bold" : w.impact.includes("Rendah") ? "text-rose-500 font-bold" : "text-amber-600 font-bold"}>
                                            {w.impact}
                                        </span>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </section>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Section Libur */}
                    <section>
                        <div className="mb-4">
                            <h2 className="text-xl font-bold tracking-tight text-foreground">Kalender Libur Nasional</h2>
                            <p className="text-sm text-muted-foreground">Persiapkan stok ekstra untuk lonjakan pesanan di hari libur.</p>
                        </div>
                        <Card className="border-border/60 shadow-sm">
                            <CardContent className="p-0">
                                <div className="divide-y divide-border/60">
                                    {HOLIDAYS.map((h, i) => (
                                        <div key={i} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-muted/30 transition-colors">
                                            <div className="flex items-start gap-4">
                                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600 border border-red-100">
                                                    <IconCalendarEvent size={20} />
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold text-foreground">{h.name}</h3>
                                                    <p className="text-sm text-muted-foreground">{h.date}</p>
                                                </div>
                                            </div>
                                            <div className="flex flex-col sm:items-end gap-2">
                                                <Badge variant="outline" className="w-fit border-red-200 bg-red-50 text-red-700">
                                                    {h.type}
                                                </Badge>
                                                <span className="text-sm font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                                                    {h.impact}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </section>

                    {/* Section Event Lokal */}
                    <section>
                        <div className="mb-4">
                            <h2 className="text-xl font-bold tracking-tight text-foreground">Event Lokal & Sekitar</h2>
                            <p className="text-sm text-muted-foreground">Potensi peningkatan keramaian dari acara di sekitar outlet.</p>
                        </div>
                        <Card className="border-border/60 shadow-sm">
                            <CardContent className="p-0">
                                <div className="divide-y divide-border/60">
                                    {LOCAL_EVENTS.map((e, i) => (
                                        <div key={i} className="p-5 flex flex-col gap-3 hover:bg-muted/30 transition-colors">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h3 className="font-semibold text-foreground text-lg">{e.name}</h3>
                                                    <p className="text-sm font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md inline-block mt-1">{e.date}</p>
                                                </div>
                                                <Badge variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-100">
                                                    Event Lokal
                                                </Badge>
                                            </div>
                                            
                                            <div className="flex flex-wrap gap-x-6 gap-y-2 mt-2">
                                                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                                                    <IconMapPin size={16} className="text-slate-400" />
                                                    <span>{e.location}</span>
                                                    <span className="font-semibold text-foreground/70">({e.distance})</span>
                                                </div>
                                            </div>
                                            
                                            <div className="mt-2 bg-muted/40 rounded-lg p-3 border border-border/50 border-l-2 border-l-blue-500">
                                                <p className="text-sm text-foreground/80 font-medium">
                                                    {e.impact}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </section>
                </div>
            </div>
        </DashboardLayout>
    );
}
