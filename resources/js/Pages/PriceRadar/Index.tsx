import MvpLayout from "@/Pages/_MvpLayout";

type PriceRecord = {
    id: number;
    commodity_name: string;
    category: string;
    price: string;
    record_date: string;
    source: string | null;
};

type PriceRadarProps = {
    prices: PriceRecord[];
};

export default function PriceRadarIndex({ prices }: PriceRadarProps) {
    return (
        <MvpLayout title="Price Radar">
            <div className="space-y-4">
                <h2 className="text-2xl font-semibold">Price Radar</h2>
                <p className="text-sm text-slate-600">Scaffold awal untuk monitoring harga ternak dan pakan.</p>
                <div className="overflow-x-auto rounded border bg-white">
                    <table className="min-w-full text-sm">
                        <thead className="bg-slate-100">
                            <tr>
                                <th className="p-2 text-left">Date</th>
                                <th className="p-2 text-left">Commodity</th>
                                <th className="p-2 text-left">Category</th>
                                <th className="p-2 text-left">Price</th>
                                <th className="p-2 text-left">Source</th>
                            </tr>
                        </thead>
                        <tbody>
                            {prices.map((item) => (
                                <tr key={item.id} className="border-t">
                                    <td className="p-2">{item.record_date}</td>
                                    <td className="p-2">{item.commodity_name}</td>
                                    <td className="p-2">{item.category}</td>
                                    <td className="p-2">{item.price}</td>
                                    <td className="p-2">{item.source ?? "-"}</td>
                                </tr>
                            ))}
                            {prices.length === 0 && (
                                <tr>
                                    <td className="p-2 text-slate-500" colSpan={5}>
                                        Belum ada data harga.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </MvpLayout>
    );
}
