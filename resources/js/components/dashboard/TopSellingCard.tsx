import { IconCrown, IconTrendingUp, IconMinus } from "@tabler/icons-react";
import { cn } from "../../lib/utils";

const TOP_PRODUCTS = [
    { rank: 1, name: "Es Teh Lemon", category: "Signature", sold: 420, revenue: "Rp 4.200.000", trend: "up" as const, badge: "Best Seller" },
    { rank: 2, name: "Es Teh Gula Aren", category: "Signature", sold: 380, revenue: "Rp 3.800.000", trend: "up" as const, badge: null },
    { rank: 3, name: "Es Teh Susu", category: "Premium", sold: 290, revenue: "Rp 3.190.000", trend: "stable" as const, badge: null },
    { rank: 4, name: "Es Tarik", category: "Premium", sold: 245, revenue: "Rp 2.940.000", trend: "up" as const, badge: null },
    { rank: 5, name: "Es Teh Jahe", category: "Herbal", sold: 180, revenue: "Rp 1.800.000", trend: "stable" as const, badge: null },
];

function RankBadge({ rank }: { rank: number }) {
    if (rank === 1) {
        return (
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                <IconCrown size={16} />
            </div>
        );
    }
    return (
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted text-sm font-bold text-muted-foreground">
            {rank}
        </div>
    );
}

export default function TopSellingCard() {
    return (
        <div className="overflow-hidden rounded-2xl border border-border/60 bg-background">
            <div className="flex items-center justify-between p-5 pb-4">
                <div>
                    <h3 className="text-base font-semibold text-foreground">Top Selling Menu</h3>
                    <p className="mt-0.5 text-sm text-muted-foreground">Performa penjualan minggu ini</p>
                </div>
            </div>
            <div className="px-5 pb-5">
                <div className="space-y-3">
                    {TOP_PRODUCTS.map((product) => (
                        <div
                            key={product.name}
                            className="flex items-center gap-3 rounded-xl border border-transparent p-3 transition-all duration-200 hover:border-border/60 hover:bg-muted/40"
                        >
                            <RankBadge rank={product.rank} />
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                    <p className="text-sm font-semibold text-foreground truncate">{product.name}</p>
                                    {product.badge ? (
                                        <span className="shrink-0 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
                                            {product.badge}
                                        </span>
                                    ) : null}
                                </div>
                                <p className="text-xs text-muted-foreground">{product.category} · {product.sold} terjual</p>
                            </div>
                            <div className="flex items-center gap-2 text-right">
                                <div>
                                    <p className="text-sm font-semibold text-foreground">{product.revenue}</p>
                                </div>
                                <div className={cn(
                                    "flex h-6 w-6 items-center justify-center rounded-full",
                                    product.trend === "up" ? "bg-emerald-50 text-emerald-600" : "bg-muted text-muted-foreground"
                                )}>
                                    {product.trend === "up" ? <IconTrendingUp size={12} /> : <IconMinus size={12} />}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
