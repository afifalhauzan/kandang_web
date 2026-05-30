import MvpLayout from "@/Pages/_MvpLayout";
import { router, useForm } from "@inertiajs/react";

type LivestockOption = {
    id: number;
    animal_type: string;
};

type Schedule = {
    id: number;
    livestock_id: number;
    title: string;
    scheduled_date: string;
    status: string;
};

type VaccinationsIndexProps = {
    schedules: Schedule[];
    livestockOptions: LivestockOption[];
};

export default function VaccinationsIndex({ schedules, livestockOptions }: VaccinationsIndexProps) {
    const createForm = useForm({ livestock_id: "", title: "", scheduled_date: "", status: "Pending", notes: "" });
    const updateForm = useForm({ id: "", livestock_id: "", title: "", scheduled_date: "", status: "Pending", notes: "" });

    return (
        <MvpLayout title="Vaccinations">
            <div className="space-y-4">
                <h2 className="text-2xl font-semibold">Vaccination Schedules</h2>

                <form
                    className="grid gap-2 rounded border bg-white p-4"
                    onSubmit={(event) => {
                        event.preventDefault();
                        createForm.transform((data) => ({ ...data, livestock_id: Number(data.livestock_id) })).post("/vaccinations", { onSuccess: () => createForm.reset("title", "scheduled_date", "notes") });
                    }}
                >
                    <h3 className="font-medium">Create Schedule</h3>
                    <select className="rounded border p-2" value={createForm.data.livestock_id} onChange={(event) => createForm.setData("livestock_id", event.target.value)}>
                        <option value="">Pilih Livestock</option>
                        {livestockOptions.map((item) => (
                            <option key={item.id} value={item.id}>
                                {item.animal_type} (#{item.id})
                            </option>
                        ))}
                    </select>
                    <input className="rounded border p-2" placeholder="Title" value={createForm.data.title} onChange={(event) => createForm.setData("title", event.target.value)} />
                    <input className="rounded border p-2" type="date" value={createForm.data.scheduled_date} onChange={(event) => createForm.setData("scheduled_date", event.target.value)} />
                    <input className="rounded border p-2" placeholder="Status" value={createForm.data.status} onChange={(event) => createForm.setData("status", event.target.value)} />
                    <textarea className="rounded border p-2" placeholder="Notes" value={createForm.data.notes} onChange={(event) => createForm.setData("notes", event.target.value)} />
                    <button className="rounded bg-emerald-600 px-4 py-2 text-white">Simpan</button>
                </form>

                <form
                    className="grid gap-2 rounded border bg-white p-4"
                    onSubmit={(event) => {
                        event.preventDefault();
                        if (!updateForm.data.id) return;
                        updateForm.transform((data) => ({ ...data, livestock_id: Number(data.livestock_id) })).put(`/vaccinations/${updateForm.data.id}`);
                    }}
                >
                    <h3 className="font-medium">Update Schedule</h3>
                    <input className="rounded border p-2" placeholder="ID" value={updateForm.data.id} onChange={(event) => updateForm.setData("id", event.target.value)} />
                    <select className="rounded border p-2" value={updateForm.data.livestock_id} onChange={(event) => updateForm.setData("livestock_id", event.target.value)}>
                        <option value="">Pilih Livestock</option>
                        {livestockOptions.map((item) => (
                            <option key={item.id} value={item.id}>
                                {item.animal_type} (#{item.id})
                            </option>
                        ))}
                    </select>
                    <input className="rounded border p-2" placeholder="Title" value={updateForm.data.title} onChange={(event) => updateForm.setData("title", event.target.value)} />
                    <input className="rounded border p-2" type="date" value={updateForm.data.scheduled_date} onChange={(event) => updateForm.setData("scheduled_date", event.target.value)} />
                    <input className="rounded border p-2" placeholder="Status" value={updateForm.data.status} onChange={(event) => updateForm.setData("status", event.target.value)} />
                    <textarea className="rounded border p-2" placeholder="Notes" value={updateForm.data.notes} onChange={(event) => updateForm.setData("notes", event.target.value)} />
                    <button className="rounded bg-amber-600 px-4 py-2 text-white">Update</button>
                </form>

                <div className="overflow-x-auto rounded border bg-white">
                    <table className="min-w-full text-sm">
                        <thead className="bg-slate-100">
                            <tr>
                                <th className="p-2 text-left">ID</th>
                                <th className="p-2 text-left">Date</th>
                                <th className="p-2 text-left">Title</th>
                                <th className="p-2 text-left">Status</th>
                                <th className="p-2 text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {schedules.map((item) => (
                                <tr key={item.id} className="border-t">
                                    <td className="p-2">{item.id}</td>
                                    <td className="p-2">{item.scheduled_date}</td>
                                    <td className="p-2">{item.title}</td>
                                    <td className="p-2">{item.status}</td>
                                    <td className="p-2">
                                        <button className="rounded bg-red-600 px-3 py-1 text-white" onClick={() => router.delete(`/vaccinations/${item.id}`)}>
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
