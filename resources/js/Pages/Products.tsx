import { Head } from "@inertiajs/react";
import ProductTableCard from "../components/dashboard/ProductTableCard";
import StatGrid from "../components/dashboard/StatGrid";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import DashboardLayout from "../layouts/DashboardLayout";

const productStats = [
    { label: "Total Produk Aktif", value: "48", delta: "+3 bulan ini", variant: "secondary" as const },
    { label: "SKU Prioritas", value: "12", delta: "Fokus minggu ini", variant: "default" as const },
    { label: "Stok Menipis", value: "5", delta: "Perlu restok", variant: "warning" as const },
    { label: "Margin Rata-rata", value: "31%", delta: "+1.8%", variant: "success" as const },
];

export default function Products() {
    return (
        <DashboardLayout title="Produk" description="Pantau performa produk dan prioritas inventori.">
            <Head title="Produk" />

            <div className="space-y-6">
                <StatGrid items={productStats} />

                <Card>
                    <CardHeader>
                        <CardTitle>Filter Produk</CardTitle>
                        <CardDescription>Kontrol sederhana untuk eksplorasi data produk.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 gap-3 md:grid-cols-4">
                        <Input placeholder="Cari nama produk..." />
                        <Select defaultValue="all">
                            <SelectTrigger>
                                <SelectValue placeholder="Kategori" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Semua Kategori</SelectItem>
                                <SelectItem value="drink">Minuman</SelectItem>
                                <SelectItem value="food">Makanan</SelectItem>
                                <SelectItem value="snack">Snack</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select defaultValue="week">
                            <SelectTrigger>
                                <SelectValue placeholder="Periode" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="day">Harian</SelectItem>
                                <SelectItem value="week">Mingguan</SelectItem>
                                <SelectItem value="month">Bulanan</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button>Perbarui Data</Button>
                    </CardContent>
                </Card>

                <ProductTableCard />

                <Card>
                    <CardHeader>
                        <CardTitle>Catatan Operasional</CardTitle>
                        <CardDescription>Prioritas aksi cepat untuk tim lapangan.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div className="flex items-center justify-between rounded-lg border p-3">
                            <p className="text-sm">Evaluasi ulang harga Kopi Susu untuk margin lebih stabil.</p>
                            <Badge variant="outline">Tindak Lanjut</Badge>
                        </div>
                        <div className="flex items-center justify-between rounded-lg border p-3">
                            <p className="text-sm">Siapkan promo bundling untuk produk snack yang stagnan.</p>
                            <Badge variant="secondary">Eksperimen</Badge>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
}
