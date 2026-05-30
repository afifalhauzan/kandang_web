import { useState } from "react";
import { Head } from "@inertiajs/react";
import { IconBuildingStore, IconEdit, IconMapPin, IconPlus, IconCheck } from "@tabler/icons-react";
import DashboardLayout from "../layouts/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../components/ui/dialog";

const INITIAL_BUSINESSES = [
    { id: "b1", name: "TehMbois Pusat", address: "Jl. Veteran No. 12", city: "Malang", status: "active" },
    { id: "b2", name: "TehMbois Cabang Suhat", address: "Jl. Soekarno Hatta No. 45", city: "Malang", status: "active" },
    { id: "b3", name: "TehMbois Batu", address: "Jl. Diponegoro No. 8", city: "Batu", status: "inactive" },
];

export default function BusinessManagement() {
    const [businesses, setBusinesses] = useState(INITIAL_BUSINESSES);
    const [activeBusinessId, setActiveBusinessId] = useState("b1");
    
    // States for Modals
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    
    const [editingBusiness, setEditingBusiness] = useState<any>(null);

    const handleEditClick = (biz: any) => {
        setEditingBusiness(biz);
        setIsEditModalOpen(true);
    };

    const handleSwitchBusiness = (id: string) => {
        setActiveBusinessId(id);
    };

    return (
        <DashboardLayout 
            title="Manajemen Bisnis & Kedai" 
            description="Kelola informasi outlet Anda, tambah kedai baru, dan beralih antar cabang."
        >
            <Head title="Manajemen Bisnis" />

            <div className="flex justify-end items-center mb-6">
                <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
                    <DialogTrigger asChild>
                        <Button className="gap-2 bg-[#096956] hover:bg-[#075344] text-white shadow-md">
                            <IconPlus size={16} /> Tambah Kedai Baru
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Tambah Kedai Baru</DialogTitle>
                            <DialogDescription>Masukkan informasi outlet baru Anda ke dalam sistem.</DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <label className="text-right text-sm font-medium">Nama Kedai</label>
                                <Input className="col-span-3" placeholder="Cth: TehMbois Dinoyo" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <label className="text-right text-sm font-medium">Kota</label>
                                <Input className="col-span-3" placeholder="Cth: Malang" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <label className="text-right text-sm font-medium">Alamat Lengkap</label>
                                <Input className="col-span-3" placeholder="Cth: Jl. MT Haryono No. 100" />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>Batal</Button>
                            <Button onClick={() => setIsAddModalOpen(false)}>Simpan Kedai</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {businesses.map((biz) => {
                    const isActive = biz.id === activeBusinessId;

                    return (
                        <Card 
                            key={biz.id} 
                            className={`border-border/60 shadow-sm transition-all duration-300 hover:shadow-md ${isActive ? 'ring-2 ring-primary/50' : ''}`}
                        >
                            <CardHeader className="pb-3 border-b border-border/40 bg-muted/10">
                                <div className="flex justify-between items-start">
                                    <div className="flex items-center gap-3">
                                        <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${isActive ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>
                                            <IconBuildingStore size={20} />
                                        </div>
                                        <div>
                                            <CardTitle className="text-lg">{biz.name}</CardTitle>
                                            <CardDescription className="flex items-center gap-1 mt-0.5">
                                                <IconMapPin size={12} /> {biz.city}
                                            </CardDescription>
                                        </div>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="pt-4 pb-2">
                                <div className="text-sm text-muted-foreground mb-4 line-clamp-2 min-h-[40px]">
                                    {biz.address}
                                </div>
                                <div className="flex items-center justify-between">
                                    <Badge 
                                        variant={biz.status === "active" ? "success" : "outline"}
                                        className={biz.status !== "active" ? "text-muted-foreground" : ""}
                                    >
                                        {biz.status === "active" ? "Operasional" : "Tutup Sementara"}
                                    </Badge>
                                    
                                    {isActive && (
                                        <Badge variant="default" className="bg-primary/10 text-primary hover:bg-primary/10 border-primary/20 gap-1 pr-2">
                                            <IconCheck size={12} /> Terpilih
                                        </Badge>
                                    )}
                                </div>
                            </CardContent>
                            <CardFooter className="pt-2 pb-4 gap-2 flex items-center">
                                <Button 
                                    variant={isActive ? "secondary" : "default"} 
                                    className={`flex-1 ${!isActive ? 'bg-[#096956] hover:bg-[#075344] text-white' : ''}`}
                                    onClick={() => handleSwitchBusiness(biz.id)}
                                    disabled={isActive}
                                >
                                    {isActive ? "Sedang Aktif" : "Switch ke Kedai Ini"}
                                </Button>
                                <Button variant="outline" size="icon" className="shrink-0" onClick={() => handleEditClick(biz)}>
                                    <IconEdit size={16} />
                                </Button>
                            </CardFooter>
                        </Card>
                    );
                })}
            </div>

            {/* Edit Modal */}
            <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Informasi Kedai</DialogTitle>
                        <DialogDescription>Perbarui alamat atau nama outlet Anda.</DialogDescription>
                    </DialogHeader>
                    {editingBusiness && (
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <label className="text-right text-sm font-medium">Nama Kedai</label>
                                <Input className="col-span-3" defaultValue={editingBusiness.name} />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <label className="text-right text-sm font-medium">Kota</label>
                                <Input className="col-span-3" defaultValue={editingBusiness.city} />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <label className="text-right text-sm font-medium">Alamat Lengkap</label>
                                <Input className="col-span-3" defaultValue={editingBusiness.address} />
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
