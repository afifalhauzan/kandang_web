import MvpLayout from "@/Pages/_MvpLayout";
import { router, useForm } from "@inertiajs/react";

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

    return (
        <MvpLayout title="Farms">
            <div className="space-y-4">
                <h2 className="text-2xl font-semibold">Farms</h2>

                <form
                    className="grid gap-2 rounded border bg-white p-4"
                    onSubmit={(event) => {
                        event.preventDefault();
                        createForm.post("/farms", { onSuccess: () => createForm.reset() });
                    }}
                >
                    <h3 className="font-medium">Create Farm</h3>
                    <input className="rounded border p-2" placeholder="Name" value={createForm.data.name} onChange={(event) => createForm.setData("name", event.target.value)} />
                    <input className="rounded border p-2" placeholder="Location" value={createForm.data.location} onChange={(event) => createForm.setData("location", event.target.value)} />
                    <textarea className="rounded border p-2" placeholder="Description" value={createForm.data.description} onChange={(event) => createForm.setData("description", event.target.value)} />
                    <button className="rounded bg-emerald-600 px-4 py-2 text-white" type="submit">
                        Simpan
                    </button>
                </form>

                <form
                    className="grid gap-2 rounded border bg-white p-4"
                    onSubmit={(event) => {
                        event.preventDefault();
                        if (!updateForm.data.id) return;
                        updateForm.put(`/farms/${updateForm.data.id}`);
                    }}
                >
                    <h3 className="font-medium">Update Farm</h3>
                    <input className="rounded border p-2" placeholder="ID" value={updateForm.data.id} onChange={(event) => updateForm.setData("id", event.target.value)} />
                    <input className="rounded border p-2" placeholder="Name" value={updateForm.data.name} onChange={(event) => updateForm.setData("name", event.target.value)} />
                    <input className="rounded border p-2" placeholder="Location" value={updateForm.data.location} onChange={(event) => updateForm.setData("location", event.target.value)} />
                    <textarea className="rounded border p-2" placeholder="Description" value={updateForm.data.description} onChange={(event) => updateForm.setData("description", event.target.value)} />
                    <button className="rounded bg-amber-600 px-4 py-2 text-white" type="submit">
                        Update
                    </button>
                </form>

                <div className="overflow-x-auto rounded border bg-white">
                    <table className="min-w-full text-sm">
                        <thead className="bg-slate-100">
                            <tr>
                                <th className="p-2 text-left">ID</th>
                                <th className="p-2 text-left">Name</th>
                                <th className="p-2 text-left">Location</th>
                                <th className="p-2 text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {farms.map((farm) => (
                                <tr key={farm.id} className="border-t">
                                    <td className="p-2">{farm.id}</td>
                                    <td className="p-2">{farm.name}</td>
                                    <td className="p-2">{farm.location ?? "-"}</td>
                                    <td className="p-2">
                                        <button className="rounded bg-red-600 px-3 py-1 text-white" onClick={() => router.delete(`/farms/${farm.id}`)}>
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
