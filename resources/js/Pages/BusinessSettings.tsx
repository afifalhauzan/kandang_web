import { Head } from "@inertiajs/react";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import DashboardLayout from "../layouts/DashboardLayout";

export default function BusinessSettings() {
    return (
        <DashboardLayout title="Pengaturan Bisnis" description="Konfigurasi dasar untuk operasional dan automasi insight.">
            <Head title="Pengaturan Bisnis" />

            <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Profil Outlet</CardTitle>
                        <CardDescription>Data inti bisnis yang dipakai model analitik.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <Input defaultValue="Kedai Es Teh Manis" />
                        <Input defaultValue="Malang" />
                        <Select defaultValue="fnb">
                            <SelectTrigger>
                                <SelectValue placeholder="Kategori" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="fnb">F&B</SelectItem>
                                <SelectItem value="retail">Retail</SelectItem>
                                <SelectItem value="service">Service</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button className="w-full">Simpan Perubahan</Button>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Notifikasi</CardTitle>
                        <CardDescription>Atur ritme rekomendasi harian dan alert penting.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div className="flex items-center justify-between rounded-lg border p-3">
                            <div>
                                <p className="text-sm font-medium">Rekomendasi Pagi</p>
                                <p className="text-xs text-muted-foreground">Dikirim setiap 06:00 WIB</p>
                            </div>
                            <Badge variant="success">Aktif</Badge>
                        </div>
                        <div className="flex items-center justify-between rounded-lg border p-3">
                            <div>
                                <p className="text-sm font-medium">Alert Penjualan Turun</p>
                                <p className="text-xs text-muted-foreground">Threshold 15%</p>
                            </div>
                            <Badge variant="secondary">Aktif</Badge>
                        </div>
                        <Button variant="outline" className="w-full">
                            Ubah Aturan Alert
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
}
