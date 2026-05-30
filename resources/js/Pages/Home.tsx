import { Head, Link } from "@inertiajs/react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import AppLayout from "../layouts/AppLayout";

export default function Home() {
    return (
        <AppLayout>
            <Head title="Asisten UMKM" />

            <main className="mx-auto flex min-h-screen w-full max-w-5xl items-center px-4 py-10">
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle>Asisten UMKM</CardTitle>
                        <CardDescription>
                            Platform operasional untuk pantau performa bisnis, produk, dan insight harian.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-wrap gap-3">
                        <Button asChild>
                            <Link href="/login">Login</Link>
                        </Button>
                        <Button asChild variant="outline">
                            <Link href="/register">Register</Link>
                        </Button>
                    </CardContent>
                </Card>
            </main>
        </AppLayout>
    );
}
