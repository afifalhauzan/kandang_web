import { useState } from "react";
import { Head } from "@inertiajs/react";
import { IconEdit, IconFileExport, IconPlus, IconPower, IconUpload } from "@tabler/icons-react";
import DashboardLayout from "../layouts/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../components/ui/dialog";

const INITIAL_MENUS = [
    { id: "m1", name: "Es Teh Tarik Mbois", category: "Minuman", cogs: 3500, price: 7000, unit: "Cup", active: true },
    { id: "m2", name: "Es Teh Gula Aren", category: "Minuman", cogs: 4000, price: 8000, unit: "Cup", active: true },
    { id: "m3", name: "Es Teh Lemon Sereh", category: "Minuman", cogs: 4500, price: 9000, unit: "Cup", active: true },
    { id: "m4", name: "Es Teh Susu Coklat", category: "Minuman", cogs: 5500, price: 10000, unit: "Cup", active: true },
    { id: "m5", name: "Es Teh Jahe Merah", category: "Minuman", cogs: 4800, price: 10000, unit: "Cup", active: false },
];

export default function MenuManagement() {
    const [menus, setMenus] = useState(INITIAL_MENUS);
    const [search, setSearch] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("all");
    
    // States for Modals
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isImportModalOpen, setIsImportModalOpen] = useState(false);
    
    const [editingMenu, setEditingMenu] = useState<any>(null);

    const filteredMenus = menus.filter((m) => {
        const matchSearch = m.name.toLowerCase().includes(search.toLowerCase());
        const matchCategory = categoryFilter === "all" || m.category === categoryFilter;
        return matchSearch && matchCategory;
    });

    const toggleStatus = (id: string) => {
        setMenus(menus.map(m => m.id === id ? { ...m, active: !m.active } : m));
    };

    const handleEditClick = (menu: any) => {
        setEditingMenu(menu);
        setIsEditModalOpen(true);
    };

    const formatRp = (num: number) => `Rp ${num.toLocaleString("id-ID")}`;

    return (
        <DashboardLayout 
            title="Manajemen Menu" 
            description="Atur daftar menu, harga pokok, harga jual, dan status ketersediaan produk."
        >
            <Head title="Manajemen Menu" />

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div className="flex items-center gap-3 w-full sm:w-auto">
                    <Select defaultValue="TehMbois Pusat">
                        <SelectTrigger className="w-[200px] bg-white">
                            <SelectValue placeholder="Pilih Bisnis" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="TehMbois Pusat">TehMbois Pusat</SelectItem>
                            <SelectItem value="TehMbois Cabang Suhat">TehMbois Cabang Suhat</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                
                <div className="flex items-center gap-3 w-full sm:w-auto">
                    <Dialog open={isImportModalOpen} onOpenChange={setIsImportModalOpen}>
                        <DialogTrigger asChild>
                            <Button variant="outline" className="gap-2 bg-white w-full sm:w-auto">
                                <IconUpload size={16} /> Import Excel/CSV
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Import Data Menu</DialogTitle>
                                <DialogDescription>Unggah file Excel (.xlsx) atau CSV untuk menambahkan menu secara massal.</DialogDescription>
                            </DialogHeader>
                            <div className="flex flex-col items-center justify-center border-2 border-dashed border-border/60 rounded-xl p-10 bg-muted/10 my-4">
                                <div className="h-12 w-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4">
                                    <IconFileExport size={24} />
                                </div>
                                <p className="text-sm font-medium text-foreground mb-1">Pilih file atau tarik ke sini</p>
                                <p className="text-xs text-muted-foreground mb-4">Maksimal ukuran file 5MB</p>
                                <Button variant="secondary" size="sm">Pilih File</Button>
                            </div>
                            <DialogFooter>
                                <Button variant="outline" onClick={() => setIsImportModalOpen(false)}>Batal</Button>
                                <Button onClick={() => setIsImportModalOpen(false)}>Mulai Import</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>

                    <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
                        <DialogTrigger asChild>
                            <Button className="gap-2 bg-[#096956] hover:bg-[#075344] text-white w-full sm:w-auto shadow-md">
                                <IconPlus size={16} /> Tambah Menu
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Tambah Menu Baru</DialogTitle>
                                <DialogDescription>Lengkapi detail produk untuk ditambahkan ke katalog bisnis.</DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <label className="text-right text-sm font-medium">Nama Menu</label>
                                    <Input className="col-span-3" placeholder="Cth: Es Teh Leci" />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <label className="text-right text-sm font-medium">Kategori</label>
                                    <Select defaultValue="Minuman">
                                        <SelectTrigger className="col-span-3">
                                            <SelectValue placeholder="Pilih Kategori" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Minuman">Minuman</SelectItem>
                                            <SelectItem value="Makanan">Makanan</SelectItem>
                                            <SelectItem value="Snack">Snack</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <label className="text-right text-sm font-medium">HPP (COGS)</label>
                                    <Input className="col-span-3" type="number" placeholder="Rp 0" />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <label className="text-right text-sm font-medium">Harga Jual</label>
                                    <Input className="col-span-3" type="number" placeholder="Rp 0" />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <label className="text-right text-sm font-medium">Satuan</label>
                                    <Input className="col-span-3" placeholder="Cth: Cup, Porsi, Pcs" defaultValue="Cup" />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>Batal</Button>
                                <Button onClick={() => setIsAddModalOpen(false)}>Simpan Menu</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            <Card className="border-border/60 shadow-sm">
                <CardHeader className="border-b bg-muted/20 pb-4 pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <CardTitle className="text-lg">Daftar Menu Aktif</CardTitle>
                        <CardDescription>Total {filteredMenus.length} menu terdaftar di sistem.</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                        <Input 
                            placeholder="Cari nama menu..." 
                            className="w-[200px] bg-white" 
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                            <SelectTrigger className="w-[130px] bg-white">
                                <SelectValue placeholder="Kategori" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Semua</SelectItem>
                                <SelectItem value="Minuman">Minuman</SelectItem>
                                <SelectItem value="Makanan">Makanan</SelectItem>
                                <SelectItem value="Snack">Snack</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader className="bg-muted/30">
                            <TableRow>
                                <TableHead className="pl-6 w-[250px]">Nama Menu</TableHead>
                                <TableHead>Kategori</TableHead>
                                <TableHead className="text-right">HPP (COGS)</TableHead>
                                <TableHead className="text-right">Harga Jual</TableHead>
                                <TableHead>Satuan</TableHead>
                                <TableHead className="text-center">Status</TableHead>
                                <TableHead className="text-right pr-6">Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredMenus.map((menu) => (
                                <TableRow key={menu.id} className="hover:bg-muted/10 group">
                                    <TableCell className="pl-6 font-semibold text-foreground/90">{menu.name}</TableCell>
                                    <TableCell>
                                        <Badge variant="secondary" className="font-normal">{menu.category}</Badge>
                                    </TableCell>
                                    <TableCell className="text-right text-muted-foreground">{formatRp(menu.cogs)}</TableCell>
                                    <TableCell className="text-right font-medium text-foreground">{formatRp(menu.price)}</TableCell>
                                    <TableCell className="text-muted-foreground">{menu.unit}</TableCell>
                                    <TableCell className="text-center">
                                        <Badge 
                                            variant={menu.active ? "success" : "outline"} 
                                            className={!menu.active ? "text-muted-foreground" : ""}
                                        >
                                            {menu.active ? "Aktif" : "Nonaktif"}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right pr-6">
                                        <div className="flex items-center justify-end gap-2">
                                            <Button size="sm" variant="outline" className="h-8 w-8 p-0" onClick={() => handleEditClick(menu)}>
                                                <IconEdit size={14} />
                                            </Button>
                                            <Button 
                                                size="sm" 
                                                variant="outline" 
                                                className={`h-8 w-8 p-0 ${menu.active ? 'text-rose-600 hover:text-rose-700 hover:bg-rose-50' : 'text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50'}`}
                                                onClick={() => toggleStatus(menu.id)}
                                            >
                                                <IconPower size={14} />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {filteredMenus.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={7} className="text-center py-10 text-muted-foreground">
                                        Tidak ada menu yang sesuai dengan pencarian Anda.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* Edit Modal (controlled by state instead of DialogTrigger to pass data) */}
            <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Menu</DialogTitle>
                        <DialogDescription>Perbarui informasi harga dan detail menu.</DialogDescription>
                    </DialogHeader>
                    {editingMenu && (
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <label className="text-right text-sm font-medium">Nama Menu</label>
                                <Input className="col-span-3" defaultValue={editingMenu.name} />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <label className="text-right text-sm font-medium">Kategori</label>
                                <Select defaultValue={editingMenu.category}>
                                    <SelectTrigger className="col-span-3">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Minuman">Minuman</SelectItem>
                                        <SelectItem value="Makanan">Makanan</SelectItem>
                                        <SelectItem value="Snack">Snack</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <label className="text-right text-sm font-medium">HPP (COGS)</label>
                                <Input className="col-span-3" type="number" defaultValue={editingMenu.cogs} />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <label className="text-right text-sm font-medium">Harga Jual</label>
                                <Input className="col-span-3" type="number" defaultValue={editingMenu.price} />
                            </div>
                        </div>
                    )}
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>Batal</Button>
                        <Button onClick={() => setIsEditModalOpen(false)}>Simpan Perubahan</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </DashboardLayout>
    );
}
