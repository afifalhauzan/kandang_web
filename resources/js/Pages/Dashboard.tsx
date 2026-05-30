import { Head, Link } from "@inertiajs/react";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import AppLayout from "../layouts/AppLayout";

const trendData = [
    { day: "Mon", sales: 420000 },
    { day: "Tue", sales: 510000 },
    { day: "Wed", sales: 470000 },
    { day: "Thu", sales: 620000 },
    { day: "Fri", sales: 700000 },
    { day: "Sat", sales: 760000 },
    { day: "Sun", sales: 680000 },
];

export default function Dashboard() {
    return (
        <AppLayout className="bg-slate-50">
            <Head title="Ternak Dashboard" />
            <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-10">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="font-fredoka text-3xl text-slate-900">Mock Dashboard</h1>
                        <p className="text-sm text-slate-600">Starter metrics with static data.</p>
                    </div>
                    <Button asChild variant="outline">
                        <Link href="/">Back to Landing</Link>
                    </Button>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                    <Card>
                        <CardHeader className="pb-2">
                            <CardDescription>Revenue (weekly)</CardDescription>
                            <CardTitle>Rp 4.16M</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Badge>+12.4%</Badge>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardDescription>Orders</CardDescription>
                            <CardTitle>128</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Badge variant="secondary">Stable</Badge>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardDescription>Active Products</CardDescription>
                            <CardTitle>42</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Badge variant="outline">Catalog Ready</Badge>
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Sales Trend</CardTitle>
                        <CardDescription>Recharts demo component included in scaffold</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-72 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={trendData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="day" />
                                    <YAxis />
                                    <Tooltip formatter={(value: number) => [`Rp ${value.toLocaleString("id-ID")}`, "Sales"]} />
                                    <Line type="monotone" dataKey="sales" stroke="#2563eb" strokeWidth={3} dot={{ r: 4 }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>
            </main>
        </AppLayout>
    );
}
