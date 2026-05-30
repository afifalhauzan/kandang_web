import MvpLayout from "@/Pages/_MvpLayout";
import { router, useForm } from "@inertiajs/react";

type BarnOption = {
    id: number;
    name: string;
};

type LivestockItem = {
    id: number;
    barn_id: number;
    animal_type: string;
    quantity: number;
    status: string;
    barn?: BarnOption;
};

type LivestockIndexProps = {
    livestock: LivestockItem[];
    barns: BarnOption[];
};

export default function LivestockIndex({ livestock, barns }: LivestockIndexProps) {
    const createForm = useForm({
        barn_id: "",
        animal_type: "",
        breed: "",
        gender: "",
        birth_date: "",
        quantity: "1",
        status: "Active",
        notes: "",
    });
    const updateForm = useForm({
        id: "",
        barn_id: "",
        animal_type: "",
        breed: "",
        gender: "",
        birth_date: "",
        quantity: "1",
        status: "Active",
        notes: "",
    });

    return (
        <MvpLayout title="Livestock">
            <div className="space-y-4">
                <h2 className="text-2xl font-semibold">Livestock</h2>

                <form
                    className="grid gap-2 rounded border bg-white p-4"
                    onSubmit={(event) => {
                        event.preventDefault();
                        createForm
                            .transform((data) => ({ ...data, barn_id: Number(data.barn_id), quantity: Number(data.quantity) }))
                            .post("/livestock", { onSuccess: () => createForm.reset("animal_type", "breed", "gender", "birth_date", "notes") });
                    }}
                >
                    <h3 className="font-medium">Create Livestock</h3>
                    <select className="rounded border p-2" value={createForm.data.barn_id} onChange={(event) => createForm.setData("barn_id", event.target.value)}>
                        <option value="">Pilih Barn</option>
                        {barns.map((barn) => (
                            <option key={barn.id} value={barn.id}>
                                {barn.name}
                            </option>
                        ))}
                    </select>
                    <input className="rounded border p-2" placeholder="Animal Type" value={createForm.data.animal_type} onChange={(event) => createForm.setData("animal_type", event.target.value)} />
                    <input className="rounded border p-2" placeholder="Breed" value={createForm.data.breed} onChange={(event) => createForm.setData("breed", event.target.value)} />
                    <input className="rounded border p-2" placeholder="Gender" value={createForm.data.gender} onChange={(event) => createForm.setData("gender", event.target.value)} />
                    <input className="rounded border p-2" type="date" value={createForm.data.birth_date} onChange={(event) => createForm.setData("birth_date", event.target.value)} />
                    <input className="rounded border p-2" placeholder="Quantity" value={createForm.data.quantity} onChange={(event) => createForm.setData("quantity", event.target.value)} />
                    <input className="rounded border p-2" placeholder="Status" value={createForm.data.status} onChange={(event) => createForm.setData("status", event.target.value)} />
                    <textarea className="rounded border p-2" placeholder="Notes" value={createForm.data.notes} onChange={(event) => createForm.setData("notes", event.target.value)} />
                    <button className="rounded bg-emerald-600 px-4 py-2 text-white">Simpan</button>
                </form>

                <form
                    className="grid gap-2 rounded border bg-white p-4"
                    onSubmit={(event) => {
                        event.preventDefault();
                        if (!updateForm.data.id) return;
                        updateForm.transform((data) => ({ ...data, barn_id: Number(data.barn_id), quantity: Number(data.quantity) })).put(`/livestock/${updateForm.data.id}`);
                    }}
                >
                    <h3 className="font-medium">Update Livestock</h3>
                    <input className="rounded border p-2" placeholder="ID" value={updateForm.data.id} onChange={(event) => updateForm.setData("id", event.target.value)} />
                    <select className="rounded border p-2" value={updateForm.data.barn_id} onChange={(event) => updateForm.setData("barn_id", event.target.value)}>
                        <option value="">Pilih Barn</option>
                        {barns.map((barn) => (
                            <option key={barn.id} value={barn.id}>
                                {barn.name}
                            </option>
                        ))}
                    </select>
                    <input className="rounded border p-2" placeholder="Animal Type" value={updateForm.data.animal_type} onChange={(event) => updateForm.setData("animal_type", event.target.value)} />
                    <input className="rounded border p-2" placeholder="Breed" value={updateForm.data.breed} onChange={(event) => updateForm.setData("breed", event.target.value)} />
                    <input className="rounded border p-2" placeholder="Gender" value={updateForm.data.gender} onChange={(event) => updateForm.setData("gender", event.target.value)} />
                    <input className="rounded border p-2" type="date" value={updateForm.data.birth_date} onChange={(event) => updateForm.setData("birth_date", event.target.value)} />
                    <input className="rounded border p-2" placeholder="Quantity" value={updateForm.data.quantity} onChange={(event) => updateForm.setData("quantity", event.target.value)} />
                    <input className="rounded border p-2" placeholder="Status" value={updateForm.data.status} onChange={(event) => updateForm.setData("status", event.target.value)} />
                    <textarea className="rounded border p-2" placeholder="Notes" value={updateForm.data.notes} onChange={(event) => updateForm.setData("notes", event.target.value)} />
                    <button className="rounded bg-amber-600 px-4 py-2 text-white">Update</button>
                </form>

                <div className="overflow-x-auto rounded border bg-white">
                    <table className="min-w-full text-sm">
                        <thead className="bg-slate-100">
                            <tr>
                                <th className="p-2 text-left">ID</th>
                                <th className="p-2 text-left">Barn</th>
                                <th className="p-2 text-left">Animal</th>
                                <th className="p-2 text-left">Qty</th>
                                <th className="p-2 text-left">Status</th>
                                <th className="p-2 text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {livestock.map((item) => (
                                <tr key={item.id} className="border-t">
                                    <td className="p-2">{item.id}</td>
                                    <td className="p-2">{item.barn?.name ?? item.barn_id}</td>
                                    <td className="p-2">{item.animal_type}</td>
                                    <td className="p-2">{item.quantity}</td>
                                    <td className="p-2">{item.status}</td>
                                    <td className="p-2">
                                        <button className="rounded bg-red-600 px-3 py-1 text-white" onClick={() => router.delete(`/livestock/${item.id}`)}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </MvpLayout>
    );
}
