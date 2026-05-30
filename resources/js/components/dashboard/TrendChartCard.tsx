import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ChartContainer, ChartTooltipContent, type ChartConfig } from "../ui/chart";

const chartData = [
    { day: "Sen", omzet: 2.1, prediksi: 2.0 },
    { day: "Sel", omzet: 2.4, prediksi: 2.3 },
    { day: "Rab", omzet: 2.2, prediksi: 2.5 },
    { day: "Kam", omzet: 2.7, prediksi: 2.6 },
    { day: "Jum", omzet: 2.9, prediksi: 2.8 },
    { day: "Sab", omzet: 3.1, prediksi: 3.0 },
    { day: "Min", omzet: 2.8, prediksi: 3.2 },
];

const chartConfig: ChartConfig = {
    omzet: {
        label: "Aktual (jt)",
        color: "oklch(0.508 0.118 165.612)",
    },
    prediksi: {
        label: "Prediksi (jt)",
        color: "oklch(0.648 0.2 131.684)",
    },
};

export default function TrendChartCard() {
    return (
        <div className="overflow-hidden rounded-2xl border border-border/60 bg-background">
            <div className="flex items-start justify-between p-5 pb-0">
                <div>
                    <h3 className="text-base font-semibold text-foreground">Tren Penjualan 7 Hari</h3>
                    <p className="mt-0.5 text-sm text-muted-foreground">Perbandingan aktual vs prediksi AI</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5">
                        <span className="h-2.5 w-2.5 rounded-full bg-primary" />
                        <span className="text-xs text-muted-foreground">Aktual</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <span className="h-2.5 w-2.5 rounded-full bg-chart-3" />
                        <span className="text-xs text-muted-foreground">Prediksi</span>
                    </div>
                </div>
            </div>
            <div className="p-5 pt-4">
                <ChartContainer config={chartConfig} className="h-72 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={chartData} margin={{ left: 0, right: 8, top: 10, bottom: 0 }}>
                            <defs>
                                <linearGradient id="gradientOmzet" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="var(--color-omzet)" stopOpacity={0.3} />
                                    <stop offset="100%" stopColor="var(--color-omzet)" stopOpacity={0.02} />
                                </linearGradient>
                                <linearGradient id="gradientPrediksi" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="var(--color-prediksi)" stopOpacity={0.15} />
                                    <stop offset="100%" stopColor="var(--color-prediksi)" stopOpacity={0.02} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
                            <XAxis
                                dataKey="day"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={12}
                                className="text-xs"
                            />
                            <YAxis
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                className="text-xs"
                                tickFormatter={(value) => `${value}jt`}
                            />
                            <Tooltip content={<ChartTooltipContent />} />
                            <Area
                                type="monotone"
                                dataKey="prediksi"
                                stroke="var(--color-prediksi)"
                                strokeWidth={2}
                                strokeDasharray="5 5"
                                fill="url(#gradientPrediksi)"
                            />
                            <Area
                                type="monotone"
                                dataKey="omzet"
                                stroke="var(--color-omzet)"
                                strokeWidth={2.5}
                                fill="url(#gradientOmzet)"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </ChartContainer>
            </div>
        </div>
    );
}
