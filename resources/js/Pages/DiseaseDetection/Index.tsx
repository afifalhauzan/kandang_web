import MvpLayout from "@/Pages/_MvpLayout";
import { router, useForm } from "@inertiajs/react";

type Detection = {
    id: number;
    image_path: string;
    prediction: string | null;
    confidence: string | null;
    recommendation: string | null;
};

type DiseaseDetectionIndexProps = {
    detections: Detection[];
};

export default function DiseaseDetectionIndex({ detections }: DiseaseDetectionIndexProps) {
    const createForm = useForm({
        image_path: "",
        prediction: "Mastitis",
        confidence: "82.5",
        recommendation: "Pisahkan ternak dan cek dokter hewan.",
    });
    const updateForm = useForm({ id: "", image_path: "", prediction: "", confidence: "", recommendation: "" });

    return (
        <MvpLayout title="Disease Detection">
            <div className="space-y-4">
                <h2 className="text-2xl font-semibold">Disease Detection (Mock AI)</h2>

                <form
                    className="grid gap-2 rounded border bg-white p-4"
                    onSubmit={(event) => {
                        event.preventDefault();
                        createForm.transform((data) => ({ ...data, confidence: data.confidence ? Number(data.confidence) : null })).post("/disease-detections", { onSuccess: () => createForm.reset("image_path") });
                    }}
                >
                    <h3 className="font-medium">Upload Gambar (Mock)</h3>
                    <input className="rounded border p-2" placeholder="image_path, contoh uploads/sapi-1.jpg" value={createForm.data.image_path} onChange={(event) => createForm.setData("image_path", event.target.value)} />
                    <input className="rounded border p-2" placeholder="prediction" value={createForm.data.prediction} onChange={(event) => createForm.setData("prediction", event.target.value)} />
                    <input className="rounded border p-2" placeholder="confidence" value={createForm.data.confidence} onChange={(event) => createForm.setData("confidence", event.target.value)} />
                    <textarea className="rounded border p-2" placeholder="recommendation" value={createForm.data.recommendation} onChange={(event) => createForm.setData("recommendation", event.target.value)} />
                    <button className="rounded bg-emerald-600 px-4 py-2 text-white">Simpan Hasil</button>
                </form>

                <form
                    className="grid gap-2 rounded border bg-white p-4"
                    onSubmit={(event) => {
                        event.preventDefault();
                        if (!updateForm.data.id) return;
                        updateForm.transform((data) => ({ ...data, confidence: data.confidence ? Number(data.confidence) : null })).put(`/disease-detections/${updateForm.data.id}`);
                    }}
                >
                    <h3 className="font-medium">Update Detection</h3>
                    <input className="rounded border p-2" placeholder="ID" value={updateForm.data.id} onChange={(event) => updateForm.setData("id", event.target.value)} />
                    <input className="rounded border p-2" placeholder="image_path" value={updateForm.data.image_path} onChange={(event) => updateForm.setData("image_path", event.target.value)} />
                    <input className="rounded border p-2" placeholder="prediction" value={updateForm.data.prediction} onChange={(event) => updateForm.setData("prediction", event.target.value)} />
                    <input className="rounded border p-2" placeholder="confidence" value={updateForm.data.confidence} onChange={(event) => updateForm.setData("confidence", event.target.value)} />
                    <textarea className="rounded border p-2" placeholder="recommendation" value={updateForm.data.recommendation} onChange={(event) => updateForm.setData("recommendation", event.target.value)} />
                    <button className="rounded bg-amber-600 px-4 py-2 text-white">Update</button>
                </form>

                <div className="overflow-x-auto rounded border bg-white">
                    <table className="min-w-full text-sm">
                        <thead className="bg-slate-100">
                            <tr>
                                <th className="p-2 text-left">ID</th>
                                <th className="p-2 text-left">Image</th>
                                <th className="p-2 text-left">Prediction</th>
                                <th className="p-2 text-left">Confidence</th>
                                <th className="p-2 text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {detections.map((item) => (
                                <tr key={item.id} className="border-t">
                                    <td className="p-2">{item.id}</td>
                                    <td className="p-2">{item.image_path}</td>
                                    <td className="p-2">{item.prediction ?? "-"}</td>
                                    <td className="p-2">{item.confidence ?? "-"}</td>
                                    <td className="p-2">
                                        <button className="rounded bg-red-600 px-3 py-1 text-white" onClick={() => router.delete(`/disease-detections/${item.id}`)}>
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
