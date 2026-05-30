import MvpLayout from "@/Pages/_MvpLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { router, useForm } from "@inertiajs/react";
import { useState } from "react";

type FarmOption = {
    id: number;
    name: string;
};

type Barn = {
    id: number;
    farm_id: number;
    name: string;
    type: string | null;
    capacity: number | null;
    farm?: FarmOption;
};

type BarnsIndexProps = {
    barns: Barn[];
    farms: FarmOption[];
};

const typeOptions = ["Sapi", "Kambing", "Ayam", "Domba"];

export default function BarnsIndex({ barns, farms }: BarnsIndexProps) {
    const createForm = useForm({ farm_id: "", name: "", type: "", capacity: "", notes: "" });
    const updateForm = useForm({ id: "", farm_id: "", name: "", type: "", capacity: "", notes: "" });
    const [openCreate, setOpenCreate] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);

    const openEditDialog = (barn: Barn) => {
        updateForm.setData({
            id: String(barn.id),
            farm_id: String(barn.farm_id),
            name: barn.name,
            type: barn.type ?? "",
            capacity: barn.capacity ? String(barn.capacity) : "",
            notes: "",
        });
        setOpenEdit(true);
    };

    return (
        <MvpLayout title="Barns">
            <div className="space-y-4">
                <Card>
                    <CardHeader className="flex-row items-center justify-between space-y-0">
                        <div>
                            <CardTitle>Barns</CardTitle>
                            <p className="text-sm text-muted-foreground">Shadcn select + dialog untuk data kandang.</p>
                        </div>
                        <Dialog open={openCreate} onOpenChange={setOpenCreate}>
                            <DialogTrigger asChild>
                                <Button>Tambah Barn</Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Create Barn</DialogTitle>
                                    <DialogDescription>Masukkan data kandang baru.</DialogDescription>
                                </DialogHeader>
                                <form
                                    className="space-y-3"
                                    onSubmit={(event) => {
                                        event.preventDefault();
                                        createForm
                                            .transform((data) => ({
                                                ...data,
                                                farm_id: Number(data.farm_id),
                                                capacity: data.capacity ? Number(data.capacity) : null,
                                            }))
                                            .post("/barns", {
                                                onSuccess: () => {
                                                    createForm.reset();
                                                    setOpenCreate(false);
                                                },
                                            });
                                    }}
                                >
                                    <Select value={createForm.data.farm_id} onValueChange={(value) => createForm.setData("farm_id", value)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Pilih farm" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {farms.map((farm) => (
                                                <SelectItem key={farm.id} value={String(farm.id)}>
                                                    {farm.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>

                                    <Input
                                        placeholder="Nama kandang"
                                        value={createForm.data.name}
                                        onChange={(event) => createForm.setData("name", event.target.value)}
                                    />

                                    <Select value={createForm.data.type} onValueChange={(value) => createForm.setData("type", value)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Pilih tipe ternak" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {typeOptions.map((type) => (
                                                <SelectItem key={type} value={type}>
                                                    {type}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>

                                    <Input
                                        placeholder="Capacity"
                                        value={createForm.data.capacity}
                                        onChange={(event) => createForm.setData("capacity", event.target.value)}
                                    />

                                    <DialogFooter>
                                        <Button type="button" variant="outline" onClick={() => setOpenCreate(false)}>
                                            Cancel
                                        </Button>
                                        <Button type="submit" disabled={createForm.processing}>
                                            Save
                                        </Button>
                                    </DialogFooter>
                                </form>
                            </DialogContent>
                        </Dialog>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>ID</TableHead>
                                    <TableHead>Farm</TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead>Capacity</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {barns.map((barn) => (
                                    <TableRow key={barn.id}>
                                        <TableCell>{barn.id}</TableCell>
                                        <TableCell>{barn.farm?.name ?? barn.farm_id}</TableCell>
                                        <TableCell>{barn.name}</TableCell>
                                        <TableCell>{barn.type ?? "-"}</TableCell>
                                        <TableCell>{barn.capacity ?? "-"}</TableCell>
                                        <TableCell>
                                            <Badge variant="success">Active</Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <Button size="sm" variant="outline" onClick={() => openEditDialog(barn)}>
                                                    Edit
                                                </Button>
                                                <Button size="sm" variant="secondary" onClick={() => router.delete(`/barns/${barn.id}`)}>
                                                    Delete
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {barns.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={7} className="text-muted-foreground">
                                            Belum ada barn.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                <Dialog open={openEdit} onOpenChange={setOpenEdit}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Update Barn</DialogTitle>
                            <DialogDescription>Edit data kandang terpilih.</DialogDescription>
                        </DialogHeader>
                        <form
                            className="space-y-3"
                            onSubmit={(event) => {
                                event.preventDefault();
                                if (!updateForm.data.id) return;
                                updateForm
                                    .transform((data) => ({
                                        ...data,
                                        farm_id: Number(data.farm_id),
                                        capacity: data.capacity ? Number(data.capacity) : null,
                                    }))
                                    .put(`/barns/${updateForm.data.id}`, {
                                        onSuccess: () => setOpenEdit(false),
                                    });
                            }}
                        >
                            <Select value={updateForm.data.farm_id} onValueChange={(value) => updateForm.setData("farm_id", value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Pilih farm" />
                                </SelectTrigger>
                                <SelectContent>
                                    {farms.map((farm) => (
                                        <SelectItem key={farm.id} value={String(farm.id)}>
                                            {farm.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <Input
                                placeholder="Nama kandang"
                                value={updateForm.data.name}
                                onChange={(event) => updateForm.setData("name", event.target.value)}
                            />

                            <Select value={updateForm.data.type} onValueChange={(value) => updateForm.setData("type", value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Pilih tipe ternak" />
                                </SelectTrigger>
                                <SelectContent>
                                    {typeOptions.map((type) => (
                                        <SelectItem key={type} value={type}>
                                            {type}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <Input
                                placeholder="Capacity"
                                value={updateForm.data.capacity}
                                onChange={(event) => updateForm.setData("capacity", event.target.value)}
                            />

                            <DialogFooter>
                                <Button type="button" variant="outline" onClick={() => setOpenEdit(false)}>
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={updateForm.processing}>
                                    Update
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
        </MvpLayout>
    );
}
