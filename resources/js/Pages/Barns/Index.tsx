import MvpLayout from "@/Pages/_MvpLayout";
import { router, useForm } from "@inertiajs/react";

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

export default function BarnsIndex({ barns, farms }: BarnsIndexProps) {
    const createForm = useForm({ farm_id: "", name: "", type: "", capacity: "", notes: "" });
    const updateForm = useForm({ id: "", farm_id: "", name: "", type: "", capacity: "", notes: "" });

    return (
        <MvpLayout title="Barns">
            <div className="space-y-4">
                <h2 className="text-2xl font-semibold">Barns</h2>

                <form
                    className="grid gap-2 rounded border bg-white p-4"
                    onSubmit={(event) => {
                        event.preventDefault();
                        createForm
                            .transform((data) => ({ ...data, farm_id: Number(data.farm_id), capacity: data.capacity ? Number(data.capacity) : null }))
                            .post("/barns", { onSuccess: () => createForm.reset() });
                    }}
                >
                    <h3 className="font-medium">Create Barn</h3>
                    <select className="rounded border p-2" value={createForm.data.farm_id} onChange={(event) => createForm.setData("farm_id", event.target.value)}>
                        <option value="">Pilih Farm</option>
                        {farms.map((farm) => (
                            <option key={farm.id} value={farm.id}>
                                {farm.name}
                            </option>
                        ))}
                    </select>
                    <input className="rounded border p-2" placeholder="Name" value={createForm.data.name} onChange={(event) => createForm.setData("name", event.target.value)} />
                    <input className="rounded border p-2" placeholder="Type" value={createForm.data.type} onChange={(event) => createForm.setData("type", event.target.value)} />
                    <input className="rounded border p-2" placeholder="Capacity" value={createForm.data.capacity} onChange={(event) => createForm.setData("capacity", event.target.value)} />
                    <textarea className="rounded border p-2" placeholder="Notes" value={createForm.data.notes} onChange={(event) => createForm.setData("notes", event.target.value)} />
                    <button className="rounded bg-emerald-600 px-4 py-2 text-white">Simpan</button>
                </form>

                <form
                    className="grid gap-2 rounded border bg-white p-4"
                    onSubmit={(event) => {
                        event.preventDefault();
                        if (!updateForm.data.id) return;
                        updateForm
                            .transform((data) => ({ ...data, farm_id: Number(data.farm_id), capacity: data.capacity ? Number(data.capacity) : null }))
                            .put(`/barns/${updateForm.data.id}`);
                    }}
                >
                    <h3 className="font-medium">Update Barn</h3>
                    <input className="rounded border p-2" placeholder="ID" value={updateForm.data.id} onChange={(event) => updateForm.setData("id", event.target.value)} />
                    <select className="rounded border p-2" value={updateForm.data.farm_id} onChange={(event) => updateForm.setData("farm_id", event.target.value)}>
                        <option value="">Pilih Farm</option>
                        {farms.map((farm) => (
                            <option key={farm.id} value={farm.id}>
                                {farm.name}
                            </option>
                        ))}
                    </select>
                    <input className="rounded border p-2" placeholder="Name" value={updateForm.data.name} onChange={(event) => updateForm.setData("name", event.target.value)} />
                    <input className="rounded border p-2" placeholder="Type" value={updateForm.data.type} onChange={(event) => updateForm.setData("type", event.target.value)} />
                    <input className="rounded border p-2" placeholder="Capacity" value={updateForm.data.capacity} onChange={(event) => updateForm.setData("capacity", event.target.value)} />
                    <textarea className="rounded border p-2" placeholder="Notes" value={updateForm.data.notes} onChange={(event) => updateForm.setData("notes", event.target.value)} />
                    <button className="rounded bg-amber-600 px-4 py-2 text-white">Update</button>
                </form>

                <div className="overflow-x-auto rounded border bg-white">
                    <table className="min-w-full text-sm">
                        <thead className="bg-slate-100">
                            <tr>
                                <th className="p-2 text-left">ID</th>
                                <th className="p-2 text-left">Farm</th>
                                <th className="p-2 text-left">Name</th>
                                <th className="p-2 text-left">Type</th>
                                <th className="p-2 text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {barns.map((barn) => (
                                <tr key={barn.id} className="border-t">
                                    <td className="p-2">{barn.id}</td>
                                    <td className="p-2">{barn.farm?.name ?? barn.farm_id}</td>
                                    <td className="p-2">{barn.name}</td>
                                    <td className="p-2">{barn.type ?? "-"}</td>
                                    <td className="p-2">
                                        <button className="rounded bg-red-600 px-3 py-1 text-white" onClick={() => router.delete(`/barns/${barn.id}`)}>
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
