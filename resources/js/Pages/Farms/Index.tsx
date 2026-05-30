import MvpLayout from "@/Pages/_MvpLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { router, useForm } from "@inertiajs/react";
import { useState } from "react";

type Farm = {
    id: number;
    name: string;
    location: string | null;
    description: string | null;
};

type FarmsIndexProps = {
    farms: Farm[];
};

export default function FarmsIndex({ farms }: FarmsIndexProps) {
    const createForm = useForm({ name: "", location: "", description: "" });
    const updateForm = useForm({ id: "", name: "", location: "", description: "" });
    const [openCreate, setOpenCreate] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);

    const openEditDialog = (farm: Farm) => {
        updateForm.setData({
            id: String(farm.id),
            name: farm.name,
            location: farm.location ?? "",
            description: farm.description ?? "",
        });
        setOpenEdit(true);
    };

    return (
        <MvpLayout title="Farms">
            <div className="space-y-4">
                <Card>
                    <CardHeader className="flex-row items-center justify-between space-y-0">
                        <div>
                            <CardTitle>Farms</CardTitle>
                            <p className="text-sm text-muted-foreground">CRUD farm dengan shadcn dialog + table.</p>
                        </div>
                        <Dialog open={openCreate} onOpenChange={setOpenCreate}>
                            <DialogTrigger asChild>
                                <Button>Tambah Farm</Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Create Farm</DialogTitle>
                                    <DialogDescription>Masukkan informasi farm baru.</DialogDescription>
                                </DialogHeader>
                                <form
                                    className="space-y-3"
                                    onSubmit={(event) => {
                                        event.preventDefault();
                                        createForm.post("/farms", {
                                            onSuccess: () => {
                                                createForm.reset();
                                                setOpenCreate(false);
                                            },
                                        });
                                    }}
                                >
                                    <Input
                                        placeholder="Name"
                                        value={createForm.data.name}
                                        onChange={(event) => createForm.setData("name", event.target.value)}
                                    />
                                    <Input
                                        placeholder="Location"
                                        value={createForm.data.location}
                                        onChange={(event) => createForm.setData("location", event.target.value)}
                                    />
                                    <textarea
                                        className="min-h-20 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm"
                                        placeholder="Description"
                                        value={createForm.data.description}
                                        onChange={(event) => createForm.setData("description", event.target.value)}
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
                                    <TableHead>Name</TableHead>
                                    <TableHead>Location</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {farms.map((farm) => (
                                    <TableRow key={farm.id}>
                                        <TableCell>{farm.id}</TableCell>
                                        <TableCell>{farm.name}</TableCell>
                                        <TableCell>{farm.location ?? "-"}</TableCell>
                                        <TableCell>
                                            <Badge variant="success">Active</Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <Button size="sm" variant="outline" onClick={() => openEditDialog(farm)}>
                                                    Edit
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="secondary"
                                                    onClick={() => router.delete(`/farms/${farm.id}`)}
                                                >
                                                    Delete
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {farms.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={5} className="text-muted-foreground">
                                            Belum ada farm.
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
                            <DialogTitle>Update Farm</DialogTitle>
                            <DialogDescription>Edit data farm terpilih.</DialogDescription>
                        </DialogHeader>
                        <form
                            className="space-y-3"
                            onSubmit={(event) => {
                                event.preventDefault();
                                if (!updateForm.data.id) return;
                                updateForm.put(`/farms/${updateForm.data.id}`, {
                                    onSuccess: () => setOpenEdit(false),
                                });
                            }}
                        >
                            <Input
                                placeholder="Name"
                                value={updateForm.data.name}
                                onChange={(event) => updateForm.setData("name", event.target.value)}
                            />
                            <Input
                                placeholder="Location"
                                value={updateForm.data.location}
                                onChange={(event) => updateForm.setData("location", event.target.value)}
                            />
                            <textarea
                                className="min-h-20 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm"
                                placeholder="Description"
                                value={updateForm.data.description}
                                onChange={(event) => updateForm.setData("description", event.target.value)}
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
