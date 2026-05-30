import { Head } from "@inertiajs/react";
import DashboardLayout from "../layouts/DashboardLayout";
import ForecastCard from "../components/dashboard/ForecastCard";
import WeatherInsightCard from "../components/dashboard/WeatherInsightCard";
import HolidayImpactCard from "../components/dashboard/HolidayImpactCard";
import TrendChartCard from "../components/dashboard/TrendChartCard";
import ProductionRecommendationCard from "../components/dashboard/ProductionRecommendationCard";

export default function PrediksiRekomendasi() {
    return (
        <DashboardLayout 
            title="Prediksi & Rekomendasi" 
            description="Insight berbasis AI untuk optimasi penjualan dan produksi harian."
        >
            <Head title="Prediksi & Rekomendasi AI" />

            <div className="space-y-8">
                {/* Section 1: Faktor Eksternal */}
                <section>
                    <div className="mb-4">
                        <h2 className="text-xl font-bold tracking-tight text-foreground">Faktor Eksternal Aktif</h2>
                        <p className="text-sm text-muted-foreground">Kondisi lingkungan yang mempengaruhi performa bisnis saat ini.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <WeatherInsightCard />
                        <HolidayImpactCard />
                    </div>
                </section>

                {/* Section 2: Prediksi Penjualan */}
                <section>
                    <div className="mb-4">
                        <h2 className="text-xl font-bold tracking-tight text-foreground">Prediksi Penjualan</h2>
                        <p className="text-sm text-muted-foreground">Proyeksi pendapatan untuk periode berjalan berdasarkan data historis dan tren.</p>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-1">
                            <ForecastCard />
                        </div>
                        <div className="lg:col-span-2">
                            <TrendChartCard />
                        </div>
                    </div>
                </section>

                {/* Section 3: Rekomendasi Produksi */}
                <section>
                    <div className="mb-4">
                        <h2 className="text-xl font-bold tracking-tight text-foreground">Rekomendasi Produksi</h2>
                        <p className="text-sm text-muted-foreground">Target jumlah cup harian per menu untuk menghindari overstock atau understock.</p>
                    </div>
                    <ProductionRecommendationCard />
                </section>
            </div>
        </DashboardLayout>
    );
}
