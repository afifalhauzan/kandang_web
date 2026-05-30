import MvpLayout from "@/Pages/_MvpLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState } from "react";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

type Vaccination = {
    id: number;
    title: string;
    scheduled_date: string;
    status: string;
    livestock?: {
        animal_type: string;
    };
};

type Detection = {
    id: number;
    prediction: string | null;
    confidence: string | null;
    created_at: string;
};

type DashboardProps = {
    stats: {
        barn_count: number;
        livestock_count: number;
    };
    upcomingVaccinations: Vaccination[];
    latestDetections: Detection[];
};

const chartConfig: ChartConfig = {
    value: {
        label: "Jumlah",
        color: "#16a34a",
    },
};

export default function Dashboard({ stats, upcomingVaccinations, latestDetections }: DashboardProps) {
    const [quickTitle, setQuickTitle] = useState("");
    const [quickType, setQuickType] = useState("Reminder");
    const chartData = [
        { name: "Kandang", value: stats.barn_count },
        { name: "Ternak", value: stats.livestock_count },
        { name: "Vaksin", value: upcomingVaccinations.length },
        { name: "Deteksi", value: latestDetections.length },
    ];

    return (
        <MvpLayout title="Dashboard">
            <div className="space-y-5">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-semibold">Dashboard MVP</h2>
                        <p className="text-sm text-muted-foreground">Shadcn UI showcase untuk sprint awal.</p>
                    </div>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button size="sm">Quick Modal</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Quick Entry (Mock)</DialogTitle>
                                <DialogDescription>Contoh modal dengan input + select.</DialogDescription>
                            </DialogHeader>
                            <div className="space-y-3">
                                <Input
                                    placeholder="Judul catatan"
                                    value={quickTitle}
                                    onChange={(event) => setQuickTitle(event.target.value)}
                                />
                                <Select value={quickType} onValueChange={setQuickType}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih tipe" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Reminder">Reminder</SelectItem>
                                        <SelectItem value="Observation">Observation</SelectItem>
                                        <SelectItem value="Action">Action</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <DialogFooter>
                                <Button variant="outline" type="button">
                                    Cancel
                                </Button>
                                <Button type="button">Save (Mock)</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="pb-2">
                            <CardDescription>Jumlah Kandang</CardDescription>
                            <CardTitle>{stats.barn_count}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Badge variant="success">Active</Badge>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardDescription>Jumlah Ternak</CardDescription>
                            <CardTitle>{stats.livestock_count}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Badge variant="secondary">Population</Badge>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardDescription>Vaksin Mendatang</CardDescription>
                            <CardTitle>{upcomingVaccinations.length}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Badge variant="warning">Pending</Badge>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardDescription>Deteksi Terbaru</CardDescription>
                            <CardTitle>{latestDetections.length}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Badge variant="outline">AI Mock</Badge>
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Overview Chart</CardTitle>
                        <CardDescription>Contoh chart component + recharts</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={chartConfig} className="h-64 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={chartData}>
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip content={<ChartTooltipContent />} />
                                    <Line type="monotone" dataKey="value" stroke="var(--color-value)" strokeWidth={3} />
                                </LineChart>
                            </ResponsiveContainer>
                        </ChartContainer>
                    </CardContent>
                </Card>

                <div className="grid gap-4 lg:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Jadwal Vaksin Mendatang</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Tanggal</TableHead>
                                        <TableHead>Judul</TableHead>
                                        <TableHead>Ternak</TableHead>
                                        <TableHead>Status</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {upcomingVaccinations.map((item) => (
                                        <TableRow key={item.id}>
                                            <TableCell>{item.scheduled_date}</TableCell>
                                            <TableCell>{item.title}</TableCell>
                                            <TableCell>{item.livestock?.animal_type ?? "-"}</TableCell>
                                            <TableCell>
                                                <Badge variant={item.status === "Completed" ? "success" : "warning"}>{item.status}</Badge>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                    {upcomingVaccinations.length === 0 && (
                                        <TableRow>
                                            <TableCell colSpan={4} className="text-muted-foreground">
                                                Belum ada data.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Deteksi Penyakit Terbaru</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Waktu</TableHead>
                                        <TableHead>Prediction</TableHead>
                                        <TableHead>Confidence</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {latestDetections.map((item) => (
                                        <TableRow key={item.id}>
                                            <TableCell>{item.created_at}</TableCell>
                                            <TableCell>{item.prediction ?? "Unknown"}</TableCell>
                                            <TableCell>{item.confidence ?? "-"}</TableCell>
                                        </TableRow>
                                    ))}
                                    {latestDetections.length === 0 && (
                                        <TableRow>
                                            <TableCell colSpan={3} className="text-muted-foreground">
                                                Belum ada data.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </MvpLayout>
    );
}
