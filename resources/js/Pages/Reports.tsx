import { Head } from "@inertiajs/react";
import DashboardLayout from "../layouts/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { 
    Area, 
    AreaChart, 
    Bar, 
    BarChart, 
    CartesianGrid, 
    ResponsiveContainer, 
    Tooltip, 
    XAxis, 
    YAxis, 
    Legend
} from "recharts";
import { ChartContainer, ChartTooltipContent, type ChartConfig } from "../components/ui/chart";
import { IconDownload, IconTargetArrow, IconTrendingUp, IconAlertCircle } from "@tabler/icons-react";

const actualVsPredData = [
    { date: "1 Mei", actual: 3200000, predicted: 3100000 },
    { date: "2 Mei", actual: 3500000, predicted: 3600000 },
    { date: "3 Mei", actual: 4100000, predicted: 3900000 },
    { date: "4 Mei", actual: 2900000, predicted: 3000000 },
    { date: "5 Mei", actual: 3800000, predicted: 3850000 },
    { date: "6 Mei", actual: 4500000, predicted: 4200000 },
    { date: "7 Mei", actual: 4800000, predicted: 4600000 },
];

const menuBreakdownData = [
    { name: "Teh Tarik", sales: 420, fill: "var(--color-teh-tarik)" },
    { name: "Gula Aren", sales: 290, fill: "var(--color-gula-aren)" },
    { name: "Lemon Sereh", sales: 180, fill: "var(--color-lemon-sereh)" },
    { name: "Susu Coklat", sales: 155, fill: "var(--color-susu-coklat)" },
    { name: "Jahe Merah", sales: 110, fill: "var(--color-jahe-merah)" },
];

const actualVsPredConfig = {
    actual: { label: "Aktual (Rp)", color: "oklch(0.627 0.265 142.125)" },
    predicted: { label: "Prediksi (Rp)", color: "oklch(0.704 0.04 256.788)" },
} satisfies ChartConfig;

const menuBreakdownConfig = {
    "teh-tarik": { label: "Es Teh Tarik", color: "oklch(0.627 0.265 142.125)" },
    "gula-aren": { label: "Es Teh Gula Aren", color: "oklch(0.488 0.243 143.513)" },
    "lemon-sereh": { label: "Es Teh Lemon Sereh", color: "oklch(0.768 0.233 130.85)" },
    "susu-coklat": { label: "Es Teh Susu Coklat", color: "oklch(0.546 0.245 262.881)" },
    "jahe-merah": { label: "Es Teh Jahe Merah", color: "oklch(0.645 0.246 16.439)" },
} satisfies ChartConfig;

export default function Reports() {
    return (
        <DashboardLayout 
            title="Laporan Performa AI" 
            description="Evaluasi akurasi prediksi model dan ringkasan penjualan bulanan."
        >
            <Head title="Laporan & Evaluasi" />

            <div className="flex justify-end mb-6">
                <Button className="gap-2 bg-[#096956] hover:bg-[#075344] text-white shadow-md">
                    <IconDownload size={18} />
                    Download Laporan PDF
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <Card className="border-border/60 shadow-sm bg-gradient-to-br from-emerald-50/50 to-white">
                    <CardHeader className="pb-2">
                        <CardDescription className="flex items-center gap-1.5 font-medium">
                            <IconTargetArrow size={16} className="text-emerald-600"/> 
                            Akurasi Model Bulan Ini
                        </CardDescription>
                        <CardTitle className="text-4xl font-black text-foreground">94.2%</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-2">
                            <Badge variant="success" className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 border-emerald-200">
                                Sangat Akurat
                            </Badge>
                            <span className="text-xs text-muted-foreground">+1.2% dari bulan lalu</span>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-border/60 shadow-sm">
                    <CardHeader className="pb-2">
                        <CardDescription className="flex items-center gap-1.5 font-medium">
                            <IconTrendingUp size={16} className="text-blue-600"/> 
                            Total Penjualan Aktual
                        </CardDescription>
                        <CardTitle className="text-3xl font-bold text-foreground">Rp 26.800.000</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground font-medium">Target Prediksi: Rp 25.500.000</span>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-border/60 shadow-sm">
                    <CardHeader className="pb-2">
                        <CardDescription className="flex items-center gap-1.5 font-medium">
                            <IconAlertCircle size={16} className="text-amber-600"/> 
                            Deviasi Rata-rata
                        </CardDescription>
                        <CardTitle className="text-3xl font-bold text-foreground">± 5.8%</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-2">
                            <Badge variant="outline" className="bg-amber-50 text-amber-800 border-amber-200">
                                Margin Aman
                            </Badge>
                            <span className="text-xs text-muted-foreground">Tidak overstock/understock</span>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2 border-border/60 shadow-sm">
                    <CardHeader>
                        <CardTitle>Penjualan Aktual vs Prediksi AI</CardTitle>
                        <CardDescription>Perbandingan data riil dengan hasil proyeksi model AI harian.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={actualVsPredConfig} className="h-80 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={actualVsPredData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="fillActual" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="var(--color-actual)" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="var(--color-actual)" stopOpacity={0} />
                                        </linearGradient>
                                        <linearGradient id="fillPredicted" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="var(--color-predicted)" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="var(--color-predicted)" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={0.5}/>
                                    <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={10} fontSize={12}/>
                                    <YAxis tickLine={false} axisLine={false} tickFormatter={(value) => `Rp${value / 1000000}M`} fontSize={12}/>
                                    <Tooltip content={<ChartTooltipContent indicator="dot" />} />
                                    <Legend verticalAlign="top" height={36}/>
                                    <Area type="monotone" dataKey="actual" name="Aktual" stroke="var(--color-actual)" fillOpacity={1} fill="url(#fillActual)" strokeWidth={3} />
                                    <Area type="monotone" dataKey="predicted" name="Prediksi" stroke="var(--color-predicted)" strokeDasharray="5 5" fillOpacity={1} fill="url(#fillPredicted)" strokeWidth={2} />
                                </AreaChart>
                            </ResponsiveContainer>
                        </ChartContainer>
                    </CardContent>
                </Card>

                <Card className="border-border/60 shadow-sm">
                    <CardHeader>
                        <CardTitle>Breakdown per Menu</CardTitle>
                        <CardDescription>Kontribusi volume penjualan (cup) bulan ini.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={menuBreakdownConfig} className="h-80 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={menuBreakdownData} layout="vertical" margin={{ top: 0, right: 30, left: 10, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="var(--border)" opacity={0.5}/>
                                    <XAxis type="number" hide />
                                    <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} fontSize={12} width={80}/>
                                    <Tooltip cursor={{fill: 'var(--muted)', opacity: 0.4}} content={<ChartTooltipContent />} />
                                    <Bar dataKey="sales" name="Terjual" radius={[0, 4, 4, 0]} barSize={24} />
                                </BarChart>
                            </ResponsiveContainer>
                        </ChartContainer>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
}
