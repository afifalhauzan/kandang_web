import { Head, Link } from "@inertiajs/react";
import AppLayout from "../layouts/AppLayout";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";

export default function LandingPage() {
    return (
        <AppLayout className="bg-gradient-to-b from-sky-50 via-white to-emerald-50">
            <Head title="Ternak | Laravel Inertia Scaffold" />
            <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 py-16">
                <div className="mb-12 flex items-center justify-between">
                    <h1 className="font-fredoka text-3xl text-slate-900">Ternak Starter</h1>
                    <Badge variant="outline">Laravel 13 + Inertia + React</Badge>
                </div>

                <section className="grid gap-6 md:grid-cols-3">
                    <Card className="md:col-span-2">
                        <CardHeader>
                            <CardTitle className="font-fredoka text-4xl text-slate-900">
                                Framework-only scaffold, ready for feature build
                            </CardTitle>
                            <CardDescription className="text-base">
                                This starter already includes Tailwind, shadcn UI, Recharts, and standard models for
                                business, products, and orders.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-wrap gap-3">
                            <Button asChild size="lg">
                                <Link href="/dashboard">Open Mock Dashboard</Link>
                            </Button>
                            <Button asChild variant="outline" size="lg">
                                <a href="/api/health">Check API Health</a>
                            </Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Included Stack</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2 text-sm text-slate-600">
                            <p>Laravel + Inertia + React</p>
                            <p>Tailwind CSS + shadcn</p>
                            <p>Recharts for charts</p>
                            <p>Sanctum + JWT packages</p>
                        </CardContent>
                    </Card>
                </section>
            </div>
        </AppLayout>
    );
}
