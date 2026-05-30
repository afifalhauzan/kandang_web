import MvpLayout from "@/Pages/_MvpLayout";
import { router, useForm } from "@inertiajs/react";

type LivestockOption = {
    id: number;
    animal_type: string;
};

type HealthRecord = {
    id: number;
    livestock_id: number;
    record_date: string;
    condition: string;
    livestock?: LivestockOption;
};

type HealthIndexProps = {
    records: HealthRecord[];
    livestockOptions: LivestockOption[];
};

export default function HealthIndex({ records, livestockOptions }: HealthIndexProps) {
    const createForm = useForm({ livestock_id: "", record_date: "", condition: "", treatment: "", notes: "" });
    const updateForm = useForm({ id: "", livestock_id: "", record_date: "", condition: "", treatment: "", notes: "" });

    return (
        <MvpLayout title="Health Records">
            <div className="space-y-4">
                <h2 className="text-2xl font-semibold">Health Records</h2>

                <form
                    className="grid gap-2 rounded border bg-white p-4"
                    onSubmit={(event) => {
                        event.preventDefault();
                        createForm.transform((data) => ({ ...data, livestock_id: Number(data.livestock_id) })).post("/health-records", { onSuccess: () => createForm.reset() });
                    }}
                >
                    <h3 className="font-medium">Create Record</h3>
                    <select className="rounded border p-2" value={createForm.data.livestock_id} onChange={(event) => createForm.setData("livestock_id", event.target.value)}>
                        <option value="">Pilih Livestock</option>
                        {livestockOptions.map((item) => (
                            <option key={item.id} value={item.id}>
                                {item.animal_type} (#{item.id})
                            </option>
                        ))}
                    </select>
                    <input className="rounded border p-2" type="date" value={createForm.data.record_date} onChange={(event) => createForm.setData("record_date", event.target.value)} />
                    <input className="rounded border p-2" placeholder="Condition" value={createForm.data.condition} onChange={(event) => createForm.setData("condition", event.target.value)} />
                    <input className="rounded border p-2" placeholder="Treatment" value={createForm.data.treatment} onChange={(event) => createForm.setData("treatment", event.target.value)} />
                    <textarea className="rounded border p-2" placeholder="Notes" value={createForm.data.notes} onChange={(event) => createForm.setData("notes", event.target.value)} />
                    <button className="rounded bg-emerald-600 px-4 py-2 text-white">Simpan</button>
                </form>

                <form
                    className="grid gap-2 rounded border bg-white p-4"
                    onSubmit={(event) => {
                        event.preventDefault();
                        if (!updateForm.data.id) return;
                        updateForm.transform((data) => ({ ...data, livestock_id: Number(data.livestock_id) })).put(`/health-records/${updateForm.data.id}`);
                    }}
                >
                    <h3 className="font-medium">Update Record</h3>
                    <input className="rounded border p-2" placeholder="ID" value={updateForm.data.id} onChange={(event) => updateForm.setData("id", event.target.value)} />
                    <select className="rounded border p-2" value={updateForm.data.livestock_id} onChange={(event) => updateForm.setData("livestock_id", event.target.value)}>
                        <option value="">Pilih Livestock</option>
                        {livestockOptions.map((item) => (
                            <option key={item.id} value={item.id}>
                                {item.animal_type} (#{item.id})
                            </option>
                        ))}
                    </select>
                    <input className="rounded border p-2" type="date" value={updateForm.data.record_date} onChange={(event) => updateForm.setData("record_date", event.target.value)} />
                    <input className="rounded border p-2" placeholder="Condition" value={updateForm.data.condition} onChange={(event) => updateForm.setData("condition", event.target.value)} />
                    <input className="rounded border p-2" placeholder="Treatment" value={updateForm.data.treatment} onChange={(event) => updateForm.setData("treatment", event.target.value)} />
                    <textarea className="rounded border p-2" placeholder="Notes" value={updateForm.data.notes} onChange={(event) => updateForm.setData("notes", event.target.value)} />
                    <button className="rounded bg-amber-600 px-4 py-2 text-white">Update</button>
                </form>

                <div className="overflow-x-auto rounded border bg-white">
                    <table className="min-w-full text-sm">
                        <thead className="bg-slate-100">
                            <tr>
                                <th className="p-2 text-left">ID</th>
                                <th className="p-2 text-left">Date</th>
                                <th className="p-2 text-left">Condition</th>
                                <th className="p-2 text-left">Livestock</th>
                                <th className="p-2 text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {records.map((record) => (
                                <tr key={record.id} className="border-t">
                                    <td className="p-2">{record.id}</td>
                                    <td className="p-2">{record.record_date}</td>
                                    <td className="p-2">{record.condition}</td>
                                    <td className="p-2">{record.livestock?.animal_type ?? record.livestock_id}</td>
                                    <td className="p-2">
                                        <button className="rounded bg-red-600 px-3 py-1 text-white" onClick={() => router.delete(`/health-records/${record.id}`)}>
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
