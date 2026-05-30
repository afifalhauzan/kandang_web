import MvpLayout from "@/Pages/_MvpLayout";

type Vaccination = {
    id: number;
    title: string;
    scheduled_date: string;
    status: string;
    livestock?: {
        animal_type: string;
    };
};

type Detection = {
    id: number;
    prediction: string | null;
    confidence: string | null;
    created_at: string;
};

type DashboardProps = {
    stats: {
        barn_count: number;
        livestock_count: number;
    };
    upcomingVaccinations: Vaccination[];
    latestDetections: Detection[];
};

export default function Dashboard({ stats, upcomingVaccinations, latestDetections }: DashboardProps) {
    return (
        <MvpLayout title="Dashboard">
            <div className="space-y-4">
                <h2 className="text-2xl font-semibold">Dashboard MVP</h2>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="rounded border bg-white p-4">
                        Jumlah Kandang: <strong>{stats.barn_count}</strong>
                    </div>
                    <div className="rounded border bg-white p-4">
                        Jumlah Ternak: <strong>{stats.livestock_count}</strong>
                    </div>
                    <div className="rounded border bg-white p-4">
                        Vaksin Mendatang: <strong>{upcomingVaccinations.length}</strong>
                    </div>
                    <div className="rounded border bg-white p-4">
                        Deteksi Terbaru: <strong>{latestDetections.length}</strong>
                    </div>
                </div>

                <div className="grid gap-4 lg:grid-cols-2">
                    <section className="rounded border bg-white p-4">
                        <h3 className="mb-3 text-lg font-medium">Jadwal Vaksin Mendatang</h3>
                        <ul className="space-y-2 text-sm">
                            {upcomingVaccinations.map((item) => (
                                <li key={item.id} className="rounded bg-slate-50 p-2">
                                    {item.scheduled_date} - {item.title} ({item.livestock?.animal_type ?? "N/A"}) [{item.status}]
                                </li>
                            ))}
                            {upcomingVaccinations.length === 0 && <li className="text-slate-500">Belum ada data.</li>}
                        </ul>
                    </section>

                    <section className="rounded border bg-white p-4">
                        <h3 className="mb-3 text-lg font-medium">Deteksi Penyakit Terbaru</h3>
                        <ul className="space-y-2 text-sm">
                            {latestDetections.map((item) => (
                                <li key={item.id} className="rounded bg-slate-50 p-2">
                                    {item.created_at} - {item.prediction ?? "Unknown"} (conf: {item.confidence ?? "-"})
                                </li>
                            ))}
                            {latestDetections.length === 0 && <li className="text-slate-500">Belum ada data.</li>}
                        </ul>
                    </section>
                </div>
            </div>
        </MvpLayout>
    );
}
