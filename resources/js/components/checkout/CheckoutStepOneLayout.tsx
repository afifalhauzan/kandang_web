import {
    IconArrowRight,
    IconBuildingBank,
    IconCash,
    IconQrcode,
    IconReceipt,
    IconWallet,
} from "@tabler/icons-react";
import { getLineTotal, type CheckoutCartItem } from "../../lib/order-checkout";

type PaymentMethod = "kasir" | "cashless";
type CashlessType = "qris" | "ewallet" | "bank";

type CheckoutStepOneLayoutProps = {
    cart: CheckoutCartItem[];
    paymentMethod: PaymentMethod;
    cashlessType: CashlessType;
    totalAmount: number;
    onPaymentMethodChange: (method: PaymentMethod) => void;
    onCashlessTypeChange: (type: CashlessType) => void;
    onCheckout: () => void;
};

export function CheckoutStepOneLayout({
    cart,
    paymentMethod,
    cashlessType,
    totalAmount,
    onPaymentMethodChange,
    onCashlessTypeChange,
    onCheckout,
}: CheckoutStepOneLayoutProps) {
    return (
        <div className="flex flex-col lg:flex-row gap-8 w-full max-w-7xl mx-auto fade-in">
            <div className="w-full lg:w-7/12 xl:w-2/3 space-y-6">
                <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100">
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-slate-800 border-b border-slate-100 pb-4">
                        Pilih Metode Pembayaran
                    </h2>

                    <div className="space-y-6">
                        <label
                            className={`flex flex-col md:flex-row items-start md:items-center p-5 md:p-6 border-2 rounded-2xl cursor-pointer transition-all ${paymentMethod === "kasir" ? "border-[#096956] bg-[#096956]/5 shadow-md" : "border-slate-200 hover:border-slate-300"}`}
                        >
                            <div className="flex items-center w-full mb-4 md:mb-0">
                                <input
                                    type="radio"
                                    name="payment"
                                    value="kasir"
                                    checked={paymentMethod === "kasir"}
                                    onChange={() => onPaymentMethodChange("kasir")}
                                    className="hidden"
                                />
                                <div
                                    className={`w-7 h-7 rounded-full border-2 flex items-center justify-center mr-5 shrink-0 ${paymentMethod === "kasir" ? "border-[#096956]" : "border-slate-300"}`}
                                >
                                    {paymentMethod === "kasir" && <div className="w-3.5 h-3.5 rounded-full bg-[#096956]" />}
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="bg-amber-100 p-3 rounded-xl text-amber-600">
                                        <IconCash size={28} />
                                    </div>
                                    <div>
                                        <div className="text-lg font-bold text-slate-800">Bayar di Kasir</div>
                                        <div className="text-sm text-slate-500">Bayar menggunakan uang tunai langsung di outlet</div>
                                    </div>
                                </div>
                            </div>
                        </label>

                        <div
                            className={`border-2 rounded-2xl transition-all overflow-hidden ${paymentMethod === "cashless" ? "border-[#096956] shadow-md" : "border-slate-200 hover:border-slate-300"}`}
                        >
                            <label
                                className={`flex items-center p-5 md:p-6 cursor-pointer w-full ${paymentMethod === "cashless" ? "bg-[#096956]/5 border-b-2 border-slate-100/50" : ""}`}
                            >
                                <input
                                    type="radio"
                                    name="payment"
                                    value="cashless"
                                    checked={paymentMethod === "cashless"}
                                    onChange={() => onPaymentMethodChange("cashless")}
                                    className="hidden"
                                />
                                <div
                                    className={`w-7 h-7 rounded-full border-2 flex items-center justify-center mr-5 shrink-0 ${paymentMethod === "cashless" ? "border-[#096956]" : "border-slate-300"}`}
                                >
                                    {paymentMethod === "cashless" && <div className="w-3.5 h-3.5 rounded-full bg-[#096956]" />}
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="bg-blue-100 p-3 rounded-xl text-blue-600">
                                        <IconQrcode size={28} />
                                    </div>
                                    <div>
                                        <div className="text-lg font-bold text-slate-800">Pembayaran Non-Tunai</div>
                                        <div className="text-sm text-slate-500">Bayar sekarang, dapatkan kode antrean prioritas</div>
                                    </div>
                                </div>
                            </label>

                            {paymentMethod === "cashless" && (
                                <div className="p-6 bg-white grid grid-cols-1 md:grid-cols-3 gap-4 animate-in fade-in slide-in-from-top-4 duration-300">
                                    <label
                                        className={`flex flex-col items-center justify-center p-4 border-2 rounded-xl cursor-pointer transition-all ${cashlessType === "qris" ? "border-[#096956] bg-[#096956]/5" : "border-slate-100 hover:border-slate-200"}`}
                                    >
                                        <input
                                            type="radio"
                                            name="cashlessType"
                                            value="qris"
                                            checked={cashlessType === "qris"}
                                            onChange={() => onCashlessTypeChange("qris")}
                                            className="hidden"
                                        />
                                        <IconQrcode size={32} className={`mb-2 ${cashlessType === "qris" ? "text-[#096956]" : "text-slate-400"}`} />
                                        <span className={`font-semibold ${cashlessType === "qris" ? "text-[#096956]" : "text-slate-600"}`}>QRIS</span>
                                    </label>

                                    <label
                                        className={`flex flex-col items-center justify-center p-4 border-2 rounded-xl cursor-pointer transition-all ${cashlessType === "ewallet" ? "border-[#096956] bg-[#096956]/5" : "border-slate-100 hover:border-slate-200"}`}
                                    >
                                        <input
                                            type="radio"
                                            name="cashlessType"
                                            value="ewallet"
                                            checked={cashlessType === "ewallet"}
                                            onChange={() => onCashlessTypeChange("ewallet")}
                                            className="hidden"
                                        />
                                        <IconWallet size={32} className={`mb-2 ${cashlessType === "ewallet" ? "text-[#096956]" : "text-slate-400"}`} />
                                        <span className={`font-semibold ${cashlessType === "ewallet" ? "text-[#096956]" : "text-slate-600"}`}>E-Wallet</span>
                                    </label>

                                    <label
                                        className={`flex flex-col items-center justify-center p-4 border-2 rounded-xl cursor-pointer transition-all ${cashlessType === "bank" ? "border-[#096956] bg-[#096956]/5" : "border-slate-100 hover:border-slate-200"}`}
                                    >
                                        <input
                                            type="radio"
                                            name="cashlessType"
                                            value="bank"
                                            checked={cashlessType === "bank"}
                                            onChange={() => onCashlessTypeChange("bank")}
                                            className="hidden"
                                        />
                                        <IconBuildingBank size={32} className={`mb-2 ${cashlessType === "bank" ? "text-[#096956]" : "text-slate-400"}`} />
                                        <span className={`font-semibold ${cashlessType === "bank" ? "text-[#096956]" : "text-slate-600"}`}>Transfer Bank</span>
                                    </label>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full lg:w-5/12 xl:w-1/3">
                <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100 sticky top-28">
                    <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-slate-800 border-b border-slate-100 pb-4">
                        <IconReceipt size={24} className="text-[#096956]" />
                        Ringkasan Pesanan
                    </h2>

                    {cart.length > 0 ? (
                        <div className="space-y-5">
                            {cart.map((item, index) => (
                                <div key={index} className="flex gap-4 border-b border-slate-50 pb-5 last:border-0 last:pb-0">
                                    <div className="h-20 w-20 rounded-2xl overflow-hidden bg-slate-100 shrink-0 border border-slate-100">
                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1 flex flex-col justify-center">
                                        <h3 className="font-bold text-slate-800 line-clamp-2">{item.name}</h3>
                                        <p className="text-slate-500 text-sm mt-1">
                                            {item.qty}x @ Rp {item.price.toLocaleString("id-ID")}
                                        </p>
                                        <div className="font-bold text-[#096956] mt-1">
                                            Rp {getLineTotal(item).toLocaleString("id-ID")}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="py-8 text-center text-slate-400">Loading produk...</div>
                    )}

                    <div className="mt-8 pt-6 border-t border-dashed border-slate-200">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-slate-500">Subtotal</span>
                            <span className="font-semibold text-slate-800">Rp {totalAmount.toLocaleString("id-ID")}</span>
                        </div>
                        <div className="flex justify-between items-center mb-6">
                            <span className="text-slate-500">Biaya Layanan</span>
                            <span className="font-semibold text-emerald-600">Gratis</span>
                        </div>
                        <div className="flex justify-between items-end">
                            <span className="font-bold text-slate-800 text-lg">Total Pembayaran</span>
                            <span className="text-3xl font-bold text-[#096956]">Rp {totalAmount.toLocaleString("id-ID")}</span>
                        </div>
                    </div>

                    <button
                        onClick={onCheckout}
                        className="w-full mt-8 bg-[#096956] text-white py-4 px-6 rounded-2xl font-bold text-xl shadow-lg shadow-[#096956]/30 hover:bg-[#075041] transition-all hover:-translate-y-1 hover:shadow-xl flex justify-center items-center gap-3"
                    >
                        Bayar Sekarang <IconArrowRight size={24} />
                    </button>
                </div>
            </div>
        </div>
    );
}
