import MvpLayout from "@/Pages/_MvpLayout";

type WeatherLog = {
    id: number;
    location: string;
    temperature: string | null;
    humidity: string | null;
    condition: string;
    recorded_at: string;
};

type WeatherProps = {
    weatherLogs: WeatherLog[];
};

export default function WeatherIndex({ weatherLogs }: WeatherProps) {
    return (
        <MvpLayout title="Weather">
            <div className="space-y-4">
                <h2 className="text-2xl font-semibold">Weather Monitoring</h2>
                <p className="text-sm text-slate-600">Scaffold awal untuk cuaca dan kondisi kandang.</p>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {weatherLogs.map((item) => (
                        <div key={item.id} className="rounded border bg-white p-4 text-sm">
                            <div className="font-medium">{item.location}</div>
                            <div>{item.recorded_at}</div>
                            <div>Temperature: {item.temperature ?? "-"} C</div>
                            <div>Humidity: {item.humidity ?? "-"} %</div>
                            <div>Condition: {item.condition}</div>
                        </div>
                    ))}
                    {weatherLogs.length === 0 && <div className="text-slate-500">Belum ada data cuaca.</div>}
                </div>
            </div>
        </MvpLayout>
    );
}
