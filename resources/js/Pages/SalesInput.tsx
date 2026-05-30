import { useState } from "react";
import { Head } from "@inertiajs/react";
import { IconCalendar, IconCheck, IconEdit, IconHistory, IconPlus, IconReceipt } from "@tabler/icons-react";
import DashboardLayout from "../layouts/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "../components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";

const MENU_ITEMS = [
    { id: "m1", name: "Es Teh Tarik Mbois", price: 7000 },
    { id: "m2", name: "Es Teh Gula Aren", price: 8000 },
    { id: "m3", name: "Es Teh Lemon Sereh", price: 9000 },
    { id: "m4", name: "Es Teh Susu Coklat", price: 10000 },
    { id: "m5", name: "Es Teh Jahe Merah", price: 10000 },
];

const MOCK_HISTORY = [
    {
        date: "2026-05-18",
        status: "submitted",
        totalItems: 425,
        revenue: 3450000,
        items: { m1: 150, m2: 120, m3: 85, m4: 40, m5: 30 }
    },
    {
        date: "2026-05-17",
        status: "submitted",
        totalItems: 380,
        revenue: 3120000,
        items: { m1: 130, m2: 110, m3: 70, m4: 50, m5: 20 }
    },
    {
        date: "2026-05-16",
        status: "submitted",
        totalItems: 510,
        revenue: 4180000,
        items: { m1: 180, m2: 140, m3: 110, m4: 60, m5: 20 }
    },
];

export default function SalesInput() {
    const todayStr = new Date().toISOString().split('T')[0];
    const [selectedDate, setSelectedDate] = useState(todayStr);
    const [history, setHistory] = useState(MOCK_HISTORY);
    const [activeTab, setActiveTab] = useState("input");
    
    const currentHistoryRecord = history.find(h => h.date === selectedDate);
    
    const [formData, setFormData] = useState<Record<string, string>>(() => {
        if (currentHistoryRecord) {
            const map: Record<string, string> = {};
            Object.entries(currentHistoryRecord.items).forEach(([k, v]) => {
                map[k] = v.toString();
            });
            return map;
        }
        return {};
    });

    const [isEditing, setIsEditing] = useState(!currentHistoryRecord);

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newDate = e.target.value;
        setSelectedDate(newDate);
        
        const record = history.find(h => h.date === newDate);
        if (record) {
            const map: Record<string, string> = {};
            Object.entries(record.items).forEach(([k, v]) => {
                map[k] = v.toString();
            });
            setFormData(map);
            setIsEditing(false);
        } else {
            setFormData({});
            setIsEditing(true);
        }
    };

    const handleInputChange = (id: string, value: string) => {
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSave = () => {
        const parsedItems: Record<string, number> = {};
        let totalItems = 0;
        let revenue = 0;

        MENU_ITEMS.forEach(menu => {
            const val = parseInt(formData[menu.id] || "0");
            parsedItems[menu.id] = isNaN(val) ? 0 : val;
            totalItems += parsedItems[menu.id];
            revenue += (parsedItems[menu.id] * menu.price);
        });

        const newRecord = {
            date: selectedDate,
            status: "submitted",
            totalItems,
            revenue,
            items: parsedItems
        };

        setHistory(prev => {
            const filtered = prev.filter(h => h.date !== selectedDate);
            return [newRecord, ...filtered].sort((a, b) => b.date.localeCompare(a.date));
        });

        setIsEditing(false);
    };

    const handleEditExisting = (date: string) => {
        setSelectedDate(date);
        setActiveTab("input");
        
        const record = history.find(h => h.date === date);
        if (record) {
            const map: Record<string, string> = {};
            Object.entries(record.items).forEach(([k, v]) => {
                map[k] = v.toString();
            });
            setFormData(map);
            setIsEditing(true);
        }
    };

    const currentRevenue = MENU_ITEMS.reduce((sum, menu) => {
        const val = parseInt(formData[menu.id] || "0");
        return sum + ((isNaN(val) ? 0 : val) * menu.price);
    }, 0);

    const currentTotalItems = MENU_ITEMS.reduce((sum, menu) => {
        const val = parseInt(formData[menu.id] || "0");
        return sum + (isNaN(val) ? 0 : val);
    }, 0);

    return (
        <DashboardLayout 
            title="Input Penjualan" 
            description="Catat transaksi harian atau perbarui data historis untuk akurasi prediksi AI."
        >
            <Head title="Input Penjualan" />

            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                <TabsList className="grid w-full grid-cols-2 max-w-[400px]">
                    <TabsTrigger value="input" className="gap-2"><IconPlus size={16}/> Form Input</TabsTrigger>
                    <TabsTrigger value="history" className="gap-2"><IconHistory size={16}/> Riwayat Penjualan</TabsTrigger>
                </TabsList>

                <TabsContent value="input" className="space-y-6">
                    <Card className="border-border/60 shadow-sm">
                        <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b bg-muted/20 pb-4 pt-4">
                            <div className="space-y-1">
                                <CardTitle className="flex items-center gap-2">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                                        <IconReceipt size={18} />
                                    </div>
                                    Formulir Harian
                                </CardTitle>
                                <CardDescription>Masukkan jumlah cup terjual untuk setiap menu.</CardDescription>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="flex items-center gap-2 bg-background border rounded-lg px-3 py-1.5 shadow-sm">
                                    <IconCalendar size={18} className="text-muted-foreground" />
                                    <input 
                                        type="date" 
                                        value={selectedDate} 
                                        onChange={handleDateChange}
                                        className="bg-transparent border-none outline-none text-sm font-medium text-foreground w-[120px]"
                                    />
                                </div>
                                {!isEditing && (
                                    <Button variant="outline" onClick={() => setIsEditing(true)} className="gap-2">
                                        <IconEdit size={16} /> Koreksi Data
                                    </Button>
                                )}
                            </div>
                        </CardHeader>
                        <CardContent className="p-0">
                            <Table>
                                <TableHeader className="bg-muted/30">
                                    <TableRow>
                                        <TableHead className="pl-6 w-[40%]">Menu</TableHead>
                                        <TableHead>Harga Satuan</TableHead>
                                        <TableHead className="text-right">Cup Terjual</TableHead>
                                        <TableHead className="text-right pr-6 w-[25%]">Subtotal</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {MENU_ITEMS.map((menu) => {
                                        const qty = parseInt(formData[menu.id] || "0");
                                        const validQty = isNaN(qty) ? 0 : qty;
                                        const subtotal = validQty * menu.price;

                                        return (
                                            <TableRow key={menu.id} className="hover:bg-muted/10">
                                                <TableCell className="pl-6 font-medium">{menu.name}</TableCell>
                                                <TableCell className="text-muted-foreground text-sm">
                                                    Rp {menu.price.toLocaleString("id-ID")}
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    {isEditing ? (
                                                        <div className="flex justify-end">
                                                            <Input 
                                                                type="number"
                                                                min="0"
                                                                value={formData[menu.id] || ""}
                                                                onChange={(e) => handleInputChange(menu.id, e.target.value)}
                                                                className="w-24 text-right font-mono"
                                                                placeholder="0"
                                                            />
                                                        </div>
                                                    ) : (
                                                        <span className="font-mono text-base font-semibold">{validQty}</span>
                                                    )}
                                                </TableCell>
                                                <TableCell className="text-right pr-6 font-medium text-emerald-700">
                                                    Rp {subtotal.toLocaleString("id-ID")}
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </CardContent>
                        <CardFooter className="bg-muted/10 border-t flex flex-col sm:flex-row justify-between items-center p-6 gap-4">
                            <div className="flex items-center gap-6 w-full sm:w-auto">
                                <div>
                                    <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-1">Total Cup</p>
                                    <p className="text-2xl font-bold font-mono">{currentTotalItems}</p>
                                </div>
                                <div className="h-10 w-px bg-border"></div>
                                <div>
                                    <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-1">Estimasi Pendapatan</p>
                                    <p className="text-2xl font-bold text-emerald-600">Rp {currentRevenue.toLocaleString("id-ID")}</p>
                                </div>
                            </div>
                            
                            {isEditing ? (
                                <Button size="lg" className="w-full sm:w-auto gap-2" onClick={handleSave}>
                                    <IconCheck size={18} /> Simpan Data Penjualan
                                </Button>
                            ) : (
                                <Badge variant="success" className="px-4 py-2 text-sm shadow-sm gap-1.5 h-11 flex items-center justify-center">
                                    <IconCheck size={16} /> Data Tersimpan
                                </Badge>
                            )}
                        </CardFooter>
                    </Card>
                </TabsContent>

                <TabsContent value="history" className="space-y-6">
                    <Card className="border-border/60 shadow-sm">
                        <CardHeader>
                            <CardTitle>Riwayat Penjualan</CardTitle>
                            <CardDescription>Daftar rekaman penjualan harian yang telah diinput.</CardDescription>
                        </CardHeader>
                        <CardContent className="p-0">
                            <Table>
                                <TableHeader className="bg-muted/30">
                                    <TableRow>
                                        <TableHead className="pl-6">Tanggal</TableHead>
                                        <TableHead>Total Cup</TableHead>
                                        <TableHead>Total Pendapatan</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right pr-6">Aksi</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {history.map((record) => (
                                        <TableRow key={record.date} className="hover:bg-muted/10">
                                            <TableCell className="pl-6 font-semibold">{record.date}</TableCell>
                                            <TableCell className="font-mono">{record.totalItems} cup</TableCell>
                                            <TableCell className="font-medium text-emerald-700">Rp {record.revenue.toLocaleString("id-ID")}</TableCell>
                                            <TableCell>
                                                <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                                                    Terekam
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-right pr-6">
                                                <Button size="sm" variant="secondary" className="gap-2" onClick={() => handleEditExisting(record.date)}>
                                                    <IconEdit size={14} /> Koreksi
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                    {history.length === 0 && (
                                        <TableRow>
                                            <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                                                Belum ada data riwayat penjualan.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </DashboardLayout>
    );
}
