import { IconCash, IconCheck, IconCopy, IconGift, IconStar, IconUserPlus } from "@tabler/icons-react";
import { Button } from "../ui/button";
import { getLineTotal, type CheckoutCartItem } from "../../lib/order-checkout";

type PaymentMethod = "kasir" | "cashless";

type CheckoutStepSuccessLayoutProps = {
    paymentMethod: PaymentMethod;
    totalAmount: number;
    receiptNumber: string;
    paymentTime: string;
    paymentMethodLabel: string;
    uniqueCode: string;
    copied: boolean;
    cart: CheckoutCartItem[];
    onCopyCode: () => void;
};

function MembershipPromoCard({ totalAmount }: { totalAmount: number }) {
    const estimatedPoints = Math.floor(totalAmount / 1000);

    return (
        <div className="mt-6 rounded-2xl border-2 border-dashed border-[#096956]/30 bg-gradient-to-br from-emerald-50 via-white to-amber-50 p-5 md:p-6 relative overflow-hidden">
            <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-[#096956]/5 blur-xl" />
            <div className="absolute -left-4 -bottom-4 h-20 w-20 rounded-full bg-amber-400/10 blur-xl" />

            <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#096956] to-[#0b7d66] text-white shadow-md shadow-emerald-200">
                        <IconGift size={22} />
                    </div>
                    <div>
                        <h3 className="text-base font-bold text-slate-800">Dapatkan Poin dari Transaksi Ini!</h3>
                        <p className="text-xs text-slate-500">Daftar sebagai member dan kumpulkan poin setiap belanja</p>
                    </div>
                </div>

                <div className="rounded-xl bg-white border border-emerald-100 p-4 mb-4 shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Estimasi Poin dari Pesanan Ini</span>
                        <div className="flex items-center gap-1 bg-amber-100 text-amber-700 rounded-full px-2.5 py-0.5">
                            <IconStar size={12} />
                            <span className="text-sm font-black">{estimatedPoints}</span>
                            <span className="text-xs font-semibold">poin</span>
                        </div>
                    </div>
                    <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                        <div className="h-full rounded-full bg-gradient-to-r from-[#096956] to-emerald-400 transition-all duration-1000" style={{ width: `${Math.min((estimatedPoints / 100) * 100, 100)}%` }} />
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1.5">Setiap pembelian Rp 1.000 = 1 poin</p>
                </div>

                <div className="space-y-2.5 mb-5">
                    <div className="flex items-start gap-2.5">
                        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-[#096956] mt-0.5">
                            <IconCheck size={13} stroke={3} />
                        </div>
                        <p className="text-sm text-slate-600">Kumpulkan poin setiap transaksi dan <span className="font-bold text-slate-800">tukarkan dengan menu gratis</span></p>
                    </div>
                    <div className="flex items-start gap-2.5">
                        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-[#096956] mt-0.5">
                            <IconCheck size={13} stroke={3} />
                        </div>
                        <p className="text-sm text-slate-600">Dapatkan <span className="font-bold text-slate-800">promo eksklusif</span> dan akses early menu baru</p>
                    </div>
                    <div className="flex items-start gap-2.5">
                        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-[#096956] mt-0.5">
                            <IconCheck size={13} stroke={3} />
                        </div>
                        <p className="text-sm text-slate-600"><span className="font-bold text-slate-800">100 poin = 1 cup gratis</span> Es Teh varian apapun</p>
                    </div>
                </div>

                <a
                    href="/register"
                    className="flex w-full items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-[#096956] to-[#0b7d66] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-200/50 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-emerald-200/60 active:scale-[0.98]"
                >
                    <IconUserPlus size={18} />
                    Daftar Jadi Member Sekarang
                </a>
                <p className="text-center text-[11px] text-slate-400 mt-2">Gratis, tanpa biaya pendaftaran apapun</p>
            </div>
        </div>
    );
}

export function CheckoutStepSuccessLayout({
    paymentMethod,
    totalAmount,
    receiptNumber,
    paymentTime,
    paymentMethodLabel,
    uniqueCode,
    copied,
    cart,
    onCopyCode,
}: CheckoutStepSuccessLayoutProps) {
    return (
        <div className="w-full flex items-center justify-center min-h-[60vh] bg-[#f1f4f1]/30 py-6 pt-0">
            {paymentMethod === "cashless" ? (
                <div className="w-full max-w-md mx-auto px-4 fade-in">
                    <div className="relative rounded-[2rem] bg-white p-6 pt-10 text-center text-slate-800 border border-slate-100 pb-8">
                        <div className="absolute left-1/2 top-0 h-17 w-17 -translate-x-1/2 -translate-y-1/2 rounded-b-full bg-[#f1f4f1] border-b border-x border-slate-100" />
                        <div className="absolute left-1/2 top-0 z-10 flex h-13 w-13 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#096956] text-white shadow-lg shadow-[#096956]/30">
                            <IconCheck size={20} stroke={3} />
                        </div>

                        <h2 className="text-2xl font-bold mt-2 text-slate-900 tracking-tight">Pembayaran Berhasil!</h2>
                        <p className="mt-1.5 text-xs text-slate-500 max-w-[280px] mx-auto">
                            Pembayaran pesanan TehMbois berhasil diproses.
                        </p>

                        <div className="my-5 border-t-2 border-dashed border-slate-100" />

                        <div className="bg-slate-50/70 rounded-2xl p-4 mb-6">
                            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Pembayaran</p>
                            <p className="mt-1 text-3xl font-black text-[#096956]">IDR {totalAmount.toLocaleString("id-ID")}</p>
                        </div>

                        <div className="space-y-3 text-left px-1">
                            <div className="flex justify-between items-center py-1 border-b border-slate-50">
                                <span className="text-xs font-medium text-slate-400">Nomor Referensi</span>
                                <span className="text-sm font-bold text-slate-700 font-mono">{receiptNumber}</span>
                            </div>
                            <div className="flex justify-between items-center py-1 border-b border-slate-50">
                                <span className="text-xs font-medium text-slate-400">Waktu Pembayaran</span>
                                <span className="text-sm font-semibold text-slate-700">{paymentTime}</span>
                            </div>
                            <div className="flex justify-between items-center py-1 border-b border-slate-50">
                                <span className="text-xs font-medium text-slate-400">Metode Pembayaran</span>
                                <span className="text-sm font-semibold text-slate-700">{paymentMethodLabel}</span>
                            </div>
                            <div className="flex justify-between items-center pt-1">
                                <span className="text-xs font-medium text-slate-400">Kode Antrean</span>
                                <span className="text-sm font-black text-[#096956] font-mono text-base">{uniqueCode}</span>
                            </div>
                        </div>

                        <div className="mt-2 text-right px-1">
                            <Button
                                onClick={onCopyCode}
                                className={[
                                    "mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold transition-all active:scale-[0.98]",
                                    copied
                                        ? "border-green-700 bg-green-700 text-white"
                                        : " border-2 border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-300",
                                ].join(" ")}
                            >
                                <IconCopy size={18} className={copied ? "text-white" : "text-slate-500"} />
                                {copied ? "Kode tersalin!" : "Salin Kode Antrean"}
                            </Button>
                        </div>

                        <div className="pointer-events-none absolute -bottom-1.5 left-0 right-0 flex items-center justify-between px-2.5">
                            {Array.from({ length: 14 }).map((_, i) => (
                                <span key={i} className="h-4 w-4 rounded-full bg-[#f1f4f1] border-t border-slate-100/30" />
                            ))}
                        </div>
                    </div>

                    <MembershipPromoCard totalAmount={totalAmount} />

                    <div className="mt-6 text-center">
                        <a href="/" className="inline-flex items-center gap-2 text-[#096956] font-extrabold text-sm hover:text-[#0c5345] transition-all group">
                            <span className="trasition-transform group-hover:-translate-x-1">&larr;</span>
                            Kembali ke Halaman Utama
                        </a>
                    </div>
                </div>
            ) : (
                <div className="w-full max-w-2xl mx-auto px-4 fade-in">
                    <div className="rounded-3xl bg-white border border-slate-100 p-6 md:p-8 shadow-sm">
                        <div className="mb-6 flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-amber-700">
                                <IconCash size={24} />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-slate-900">Pesanan Diterima</h2>
                                <p className="text-sm text-slate-500">Silakan lanjutkan pembayaran di kasir.</p>
                            </div>
                        </div>

                        <div className="rounded-2xl bg-amber-50 border border-amber-200 p-4 mb-6 text-sm text-amber-900">
                            <p className="font-semibold mb-2">Instruksi Pembayaran Kasir</p>
                            <ol className="list-decimal pl-5 space-y-1">
                                <li>Tunjukkan halaman ini ke kasir TehMbois.</li>
                                <li>Konfirmasi nama pesanan dan jumlah item.</li>
                                <li>
                                    Bayar total tagihan sebesar <span className="font-bold">Rp {totalAmount.toLocaleString("id-ID")}</span>.
                                </li>
                            </ol>
                            <p className="mt-3 text-xs text-amber-700">Waktu checkout: {paymentTime}</p>
                        </div>

                        <div className="border-t border-slate-100 pt-5">
                            <h3 className="text-lg font-bold text-slate-800 mb-4">Rekap Pesanan</h3>
                            <div className="space-y-3">
                                {cart.map((item) => (
                                    <div key={item.name} className="flex items-start justify-between gap-4">
                                        <div>
                                            <p className="font-semibold text-slate-800">{item.name}</p>
                                            <p className="text-sm text-slate-500">
                                                {item.qty}x @ Rp {item.price.toLocaleString("id-ID")}
                                            </p>
                                        </div>
                                        <p className="font-bold text-[#096956]">Rp {getLineTotal(item).toLocaleString("id-ID")}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-5 border-t border-dashed border-slate-200 pt-4 flex items-end justify-between">
                                <span className="text-base font-bold text-slate-700">Total Bayar</span>
                                <span className="text-2xl font-black text-[#096956]">Rp {totalAmount.toLocaleString("id-ID")}</span>
                            </div>
                        </div>
                    </div>

                    <MembershipPromoCard totalAmount={totalAmount} />

                    <div className="mt-6 text-center">
                        <a href="/" className="inline-flex items-center gap-2 text-[#096956] font-extrabold text-sm hover:text-[#0c5345] transition-all group">
                            <span className="trasition-transform group-hover:-translate-x-1">&larr;</span>
                            Kembali ke Halaman Utama
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
}
