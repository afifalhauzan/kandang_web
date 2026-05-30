import MvpLayout from "@/Pages/_MvpLayout";
import { router, useForm } from "@inertiajs/react";

type Formula = {
    id: number;
    name: string;
    target_protein: string | null;
    total_cost: string | null;
};

type FeedCalculatorIndexProps = {
    formulas: Formula[];
};

export default function FeedCalculatorIndex({ formulas }: FeedCalculatorIndexProps) {
    const createForm = useForm({ name: "", target_protein: "16", total_cost: "", result_json_text: '{"jagung":40,"dedak":35,"bungkil_kedelai":25}' });
    const updateForm = useForm({ id: "", name: "", target_protein: "", total_cost: "", result_json_text: "{}" });

    const parseResult = (text: string): unknown[] => {
        try {
            const parsed = JSON.parse(text) as unknown;
            if (Array.isArray(parsed)) return parsed;
            return [parsed];
        } catch {
            return [{ raw: text }];
        }
    };

    return (
        <MvpLayout title="Feed Calculator">
            <div className="space-y-4">
                <h2 className="text-2xl font-semibold">Feed Calculator (Mock)</h2>

                <form
                    className="grid gap-2 rounded border bg-white p-4"
                    onSubmit={(event) => {
                        event.preventDefault();
                        createForm
                            .transform((data) => ({
                                name: data.name,
                                target_protein: data.target_protein ? Number(data.target_protein) : null,
                                total_cost: data.total_cost ? Number(data.total_cost) : null,
                                result_json: parseResult(data.result_json_text),
                            }))
                            .post("/feed-formulas", { onSuccess: () => createForm.reset("name", "total_cost") });
                    }}
                >
                    <h3 className="font-medium">Create Formula</h3>
                    <input className="rounded border p-2" placeholder="Nama Formula" value={createForm.data.name} onChange={(event) => createForm.setData("name", event.target.value)} />
                    <input className="rounded border p-2" placeholder="Target Protein" value={createForm.data.target_protein} onChange={(event) => createForm.setData("target_protein", event.target.value)} />
                    <input className="rounded border p-2" placeholder="Total Cost" value={createForm.data.total_cost} onChange={(event) => createForm.setData("total_cost", event.target.value)} />
                    <textarea className="rounded border p-2" placeholder="Result JSON" value={createForm.data.result_json_text} onChange={(event) => createForm.setData("result_json_text", event.target.value)} />
                    <button className="rounded bg-emerald-600 px-4 py-2 text-white">Simpan</button>
                </form>

                <form
                    className="grid gap-2 rounded border bg-white p-4"
                    onSubmit={(event) => {
                        event.preventDefault();
                        if (!updateForm.data.id) return;
                        updateForm
                            .transform((data) => ({
                                name: data.name,
                                target_protein: data.target_protein ? Number(data.target_protein) : null,
                                total_cost: data.total_cost ? Number(data.total_cost) : null,
                                result_json: parseResult(data.result_json_text),
                            }))
                            .put(`/feed-formulas/${updateForm.data.id}`);
                    }}
                >
                    <h3 className="font-medium">Update Formula</h3>
                    <input className="rounded border p-2" placeholder="ID" value={updateForm.data.id} onChange={(event) => updateForm.setData("id", event.target.value)} />
                    <input className="rounded border p-2" placeholder="Nama Formula" value={updateForm.data.name} onChange={(event) => updateForm.setData("name", event.target.value)} />
                    <input className="rounded border p-2" placeholder="Target Protein" value={updateForm.data.target_protein} onChange={(event) => updateForm.setData("target_protein", event.target.value)} />
                    <input className="rounded border p-2" placeholder="Total Cost" value={updateForm.data.total_cost} onChange={(event) => updateForm.setData("total_cost", event.target.value)} />
                    <textarea className="rounded border p-2" placeholder="Result JSON" value={updateForm.data.result_json_text} onChange={(event) => updateForm.setData("result_json_text", event.target.value)} />
                    <button className="rounded bg-amber-600 px-4 py-2 text-white">Update</button>
                </form>

                <div className="overflow-x-auto rounded border bg-white">
                    <table className="min-w-full text-sm">
                        <thead className="bg-slate-100">
                            <tr>
                                <th className="p-2 text-left">ID</th>
                                <th className="p-2 text-left">Name</th>
                                <th className="p-2 text-left">Target Protein</th>
                                <th className="p-2 text-left">Total Cost</th>
                                <th className="p-2 text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {formulas.map((item) => (
                                <tr key={item.id} className="border-t">
                                    <td className="p-2">{item.id}</td>
                                    <td className="p-2">{item.name}</td>
                                    <td className="p-2">{item.target_protein ?? "-"}</td>
                                    <td className="p-2">{item.total_cost ?? "-"}</td>
                                    <td className="p-2">
                                        <button className="rounded bg-red-600 px-3 py-1 text-white" onClick={() => router.delete(`/feed-formulas/${item.id}`)}>
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
