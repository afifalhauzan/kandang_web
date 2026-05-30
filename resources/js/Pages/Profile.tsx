import { Head, usePage } from "@inertiajs/react";
import StatGrid from "../components/dashboard/StatGrid";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import DashboardLayout from "../layouts/DashboardLayout";
import type { InertiaPageProps } from "../types/page-props";

export default function Profile() {
    const { auth } = usePage<InertiaPageProps>().props;
    const roleLabel = String(auth?.user?.role ?? "unknown").toUpperCase();
    const userName = auth?.user?.name ?? "-";
    const userEmail = auth?.user?.email ?? "-";

    const stats = [
        { label: "Role", value: roleLabel, delta: "Role aktif saat ini", variant: "secondary" as const },
        { label: "Outlet Aktif", value: "2", delta: "Terkoneksi", variant: "default" as const },
        { label: "Notifikasi Dibaca", value: "87%", delta: "Minggu ini", variant: "success" as const },
        { label: "Status Akun", value: "Verified", delta: "Terakhir update: hari ini", variant: "outline" as const },
    ];

    return (
        <DashboardLayout title="Profile" description="Ringkasan akun pemilik dan preferensi kerja.">
            <Head title="Profile" />

            <div className="space-y-6">
                <StatGrid items={stats} />

                <Card>
                    <CardHeader>
                        <CardTitle>Akun Utama</CardTitle>
                        <CardDescription>Identitas pengguna yang digunakan untuk operasional harian.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between rounded-lg border p-4">
                            <div>
                                <p className="text-sm font-medium">{userName}</p>
                                <p className="text-xs text-muted-foreground">{userEmail}</p>
                            </div>
                            <Badge variant="success">Aktif</Badge>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <Button>Edit Profil</Button>
                            <Button variant="outline">Kelola Keamanan</Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
}
