import { useState } from "react";
import { IconPlus, IconMinus, IconShoppingBag, IconArrowRight } from "@tabler/icons-react";
import { router } from "@inertiajs/react";

type MenuItem = {
    name: string;
    description?: string;
    price: string;
    badge?: { label: string; className: string };
    image: string;
};

const menuItems: MenuItem[] = [
    {
        name: "Es Teh Tarik Mbois",
        description: "Perpaduan teh pekat dan susu kental yang ditarik hingga berbuih lembut.",
        price: "Rp 7.000",
        badge: { label: "BEST SELLER", className: "bg-[#8d493c] text-white" },
        image: "/es teh/es tarik.jpeg",
    },
    {
        name: "Es Teh Gula Aren",
        description: "Aroma wangi gula aren asli berpadu sempurna dengan teh Wonosari pilihan.",
        price: "Rp 8.000",
        badge: { label: "POPULAR", className: "bg-[#096956] text-white" },
        image: "/es teh/teh gula aren.jpeg",
    },
    {
        name: "Es Teh Lemon Sereh",
        description: "Sensasi asam segar lemon berpadu hangatnya sereh. Cocok buat siang terik.",
        price: "Rp 9.000",
        badge: { label: "UNIQUE", className: "bg-[#5d5e60] text-white" },
        image: "/es teh/teh lemon.jpeg",
    },
    {
        name: "Es Teh Susu Coklat",
        description: "Buat yang suka manis creamy, campuran teh, susu, dan coklat lezat.",
        price: "Rp 10.000",
        image: "/es teh/teh susu.jpeg",
    },
    {
        name: "Es Teh Jahe Merah",
        description: "Kesegaran teh dingin dengan sensasi hangat jahe merah di tenggorokan.",
        price: "Rp 10.000",
        image: "/es teh/teh jahe.jpeg",
    },
];

const bundleItem = {
    name: "Paket Mbois Bundle 5",
    description: "Beli 5 cup varian apa saja lebih hemat! Cocok buat nongkrong bareng teman.",
    price: "Rp 30.000",
    image: "/es teh/5 Es Teh.jpeg",
    originalPrice: "Rp 45.000"
};


function ProductCard({ item, qty, onAdd, onRemove }: { item: MenuItem, qty: number, onAdd: () => void, onRemove: () => void }) {
    return (
        <article
            className={[
                "group relative flex h-full flex-col overflow-hidden rounded-3xl border border-[#bec9c4]/30 bg-white p-6 shadow-sm transition-all hover:border-[#096956]/50 hover:shadow-md",
            ].join(" ")}
        >
            {item.badge && (
                <div className={`absolute right-4 top-4 z-10 rounded-full px-3 py-1 text-xs font-semibold shadow-sm ${item.badge.className}`}>
                    {item.badge.label}
                </div>
            )}

            <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-2xl bg-[#f1f4f1]">
                <img src={item.image} alt={item.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
            </div>

            <h3 className="mb-2 mt-6 text-2xl font-semibold text-[#181c1b]">{item.name}</h3>
            {item.description ? (
                <p className="mb-6 min-h-[72px] text-[#3f4945]">{item.description}</p>
            ) : (
                <div className="mb-6 min-h-[72px]" />
            )}
            <div className="mt-auto flex items-center justify-between">
                <span className="text-2xl font-bold text-[#096956]">{item.price}</span>
                {qty === 0 ? (
                    <button onClick={onAdd} className="flex h-10 w-10 items-center justify-center rounded-full bg-[#096956]/10 text-[#096956] transition-colors hover:bg-[#096956] hover:text-white">
                        <IconPlus size={18} />
                    </button>
                ) : (
                    <div className="flex items-center bg-[#096956]/10 rounded-full p-1 border border-[#096956]/20">
                        <button onClick={onRemove} className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#096956] shadow-sm hover:bg-[#096956] hover:text-white transition-colors">
                            <IconMinus size={16} />
                        </button>
                        <span className="w-8 text-center font-bold text-[#096956]">{qty}</span>
                        <button onClick={onAdd} className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#096956] shadow-sm hover:bg-[#096956] hover:text-white transition-colors">
                            <IconPlus size={16} />
                        </button>
                    </div>
                )}
            </div>
        </article>
    );
}

export default function TehMboisMenuSection() {
    const [cart, setCart] = useState<Record<string, number>>({});

    const handleAdd = (name: string) => {
        setCart(prev => ({ ...prev, [name]: (prev[name] || 0) + 1 }));
    };

    const handleRemove = (name: string) => {
        setCart(prev => {
            const current = prev[name] || 0;
            if (current <= 1) {
                const newCart = { ...prev };
                delete newCart[name];
                return newCart;
            }
            return { ...prev, [name]: current - 1 };
        });
    };

    const totalItems = Object.values(cart).reduce((a, b) => a + b, 0);
    const totalPrice = Object.entries(cart).reduce((sum, [name, qty]) => {
        const item = menuItems.find(i => i.name === name) || (name === bundleItem.name ? bundleItem : null);
        if (!item) return sum;
        const priceStr = item.price.replace(/\D/g, "");
        return sum + (parseInt(priceStr) * qty);
    }, 0);

    const handleCheckout = () => {
        sessionStorage.setItem("es_teh_cart", JSON.stringify(cart));
        router.visit("/order");
    };

    return (
        <section id="menu" className="bg-white py-20 relative">
            <div className="mx-auto w-full max-w-[1280px] px-4 md:px-8">
                <div className="mb-16 text-center">
                    <h2 className="font-cherry-freeland mb-4 text-5xl font-bold text-slate-800">Menu Mbois Andalan</h2>
                    <p className="mx-auto max-w-2xl text-[#3f4945]">
                        Pilih varian favoritmu, nikmati kesegarannya tanpa bikin dompet nangis.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
                    {menuItems.map((item) => (
                        <ProductCard
                            key={item.name}
                            item={item}
                            qty={cart[item.name] || 0}
                            onAdd={() => handleAdd(item.name)}
                            onRemove={() => handleRemove(item.name)}
                        />
                    ))}

                    <div className="group relative flex h-full flex-col overflow-hidden rounded-3xl bg-gradient-to-br from-[#30826e] to-[#096956] p-6 shadow-lg transition-all hover:shadow-xl hover:-translate-y-1 md:col-span-3 xl:col-span-3">
                        <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
                        <div className="absolute right-4 top-4 z-50 rounded-full bg-[#ab6153] px-3 py-1 text-xs font-semibold text-white shadow-sm">
                            PROMO
                        </div>

                        <div className="relative z-10 flex h-full flex-col gap-6 md:flex-row md:items-stretch">
                            <div className="flex flex-1 flex-col justify-between">
                                <div>
                                    <h3 className="mb-2 text-2xl font-semibold text-white">{bundleItem.name}</h3>
                                    <p className="mb-6 text-white/80">
                                        {bundleItem.description}
                                    </p>
                                </div>

                                <div className="mt-auto flex items-center justify-between">
                                    <div className="flex flex-col">
                                        <span className="text-sm text-white/60 line-through">{bundleItem.originalPrice}</span>
                                        <span className="text-2xl font-bold text-white">{bundleItem.price}</span>
                                    </div>

                                    {(cart[bundleItem.name] || 0) === 0 ? (
                                        <button onClick={() => handleAdd(bundleItem.name)} className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#096956] shadow-md transition-all hover:scale-105 hover:bg-[#ebefeb]">
                                            <IconPlus size={18} />
                                        </button>
                                    ) : (
                                        <div className="flex items-center bg-white/20 rounded-full p-1.5 backdrop-blur-sm border border-white/30">
                                            <button onClick={() => handleRemove(bundleItem.name)} className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#096956] shadow-sm hover:scale-105 transition-transform">
                                                <IconMinus size={18} />
                                            </button>
                                            <span className="w-10 text-center font-extrabold text-white text-lg">{cart[bundleItem.name]}</span>
                                            <button onClick={() => handleAdd(bundleItem.name)} className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#096956] shadow-sm hover:scale-105 transition-transform">
                                                <IconPlus size={18} />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="flex flex-1 items-center justify-center overflow-hidden rounded-2xl bg-white/10">
                                <img src={bundleItem.image} alt={bundleItem.name} className="h-full w-full object-cover opacity-95 transition-transform duration-500 group-hover:scale-105" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {totalItems > 0 && (
                <div className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-in slide-in-from-bottom-10 fade-in duration-300">
                    <div className="mx-auto max-w-[1280px] ">
                        <div className="bg-[#096956] rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.3),0_2px_8px_rgba(0,0,0,0.2)] p-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-4 border border-white/10 backdrop-blur-lg">
                            <div className="flex items-center gap-4 text-white">
                                <div className="bg-white/20 p-3 rounded-xl">
                                    <IconShoppingBag size={28} />
                                </div>
                                <div>
                                    <div className="text-white/80 font-medium">{totalItems} Produk Dipesan</div>
                                    <div className="text-2xl font-black">Rp {totalPrice.toLocaleString("id-ID")}</div>
                                </div>
                            </div>
                            <button
                                onClick={handleCheckout}
                                className="w-full md:w-auto bg-white text-[#096956] font-extrabold text-lg px-8 py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-slate-50 hover:-translate-y-1 transition-all shadow-lg"
                            >
                                Proses Pesanan <IconArrowRight size={22} />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
