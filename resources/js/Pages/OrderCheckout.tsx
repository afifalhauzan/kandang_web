import { useState, useEffect } from "react";
import { Head } from "@inertiajs/react";
import { IconArrowLeft, IconShoppingCartOff } from "@tabler/icons-react";
import { CheckoutStepOneLayout } from "../components/checkout/CheckoutStepOneLayout";
import { CheckoutStepLoadingLayout } from "../components/checkout/CheckoutStepLoadingLayout";
import { CheckoutStepSuccessLayout } from "../components/checkout/CheckoutStepSuccessLayout";
import { getCartTotal, type CheckoutCartItem } from "../lib/order-checkout";

export default function OrderCheckout() {
    const [cart, setCart] = useState<CheckoutCartItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const catalog = [
            { name: "Es Teh Tarik Mbois", price: 7000, image: "/es teh/es tarik.jpeg" },
            { name: "Es Teh Gula Aren", price: 8000, image: "/es teh/teh gula aren.jpeg" },
            { name: "Es Teh Lemon Sereh", price: 9000, image: "/es teh/teh lemon.jpeg" },
            { name: "Es Teh Susu Coklat", price: 10000, image: "/es teh/teh susu.jpeg" },
            { name: "Es Teh Jahe Merah", price: 10000, image: "/es teh/teh jahe.jpeg" },
            { name: "Paket Mbois Bundle 5", price: 30000, image: "/es teh/5 Es Teh.jpeg" }
        ];

        const savedCart = sessionStorage.getItem("es_teh_cart");
        if (savedCart) {
            try {
                const parsed = JSON.parse(savedCart);
                const loadedCart = [];
                for (const [name, qty] of Object.entries(parsed)) {
                    if (typeof qty === 'number' && qty > 0) {
                        const foundItem = catalog.find(i => i.name === name);
                        if (foundItem) {
                            loadedCart.push({ ...foundItem, qty });
                        }
                    }
                }
                setCart(loadedCart);
            } catch (e) { }
        }
        setIsLoading(false);
    }, []);

    const [paymentMethod, setPaymentMethod] = useState<"kasir" | "cashless">("kasir");
    const [cashlessType, setCashlessType] = useState<"qris" | "ewallet" | "bank">("qris");
    const [step, setStep] = useState(1);
    const [uniqueCode, setUniqueCode] = useState("");
    const [receiptNumber, setReceiptNumber] = useState("");
    const [paymentTime, setPaymentTime] = useState("");
    const [copied, setCopied] = useState(false);

    const totalAmount = getCartTotal(cart);

    const getPaymentMethodLabel = () => {
        if (paymentMethod === "kasir") return "Bayar di Kasir";
        if (cashlessType === "qris") return "QRIS";
        if (cashlessType === "ewallet") return "E-Wallet";
        return "Transfer Bank";
    };

    const generateReceiptMeta = () => {
        const now = new Date();
        setPaymentTime(
            now.toLocaleString("id-ID", {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
            }),
        );
        setReceiptNumber(`TMB${now.getTime().toString().slice(-8)}`);
    };

    const handleCheckout = () => {
        if (paymentMethod === "cashless") {
            setStep(2);
            setTimeout(() => {
                setUniqueCode("MBOIS-" + Math.random().toString(36).substr(2, 6).toUpperCase());
                generateReceiptMeta();
                setStep(3);
                sessionStorage.removeItem("es_teh_cart");
            }, 3000);
        } else {
            generateReceiptMeta();
            setStep(3);
            sessionStorage.removeItem("es_teh_cart");
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(uniqueCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (!isLoading && cart.length === 0 && step === 1) {
        return (
            <div className="min-h-screen w-full bg-[#f1f4f1] font-sans text-slate-800 flex items-center justify-center p-4">
                <Head title="Keranjang Kosong - Es Teh Mbois" />
                <div className="bg-white rounded-3xl p-10 text-center shadow-lg border border-slate-100 max-w-md w-full">
                    <div className="w-24 h-24 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-6">
                        <IconShoppingCartOff size={40} />
                    </div>
                    <h2 className="text-2xl font-bold mb-2 text-slate-800">Keranjang Kosong</h2>
                    <p className="text-slate-500 mb-8">Anda belum memilih minuman apapun. Yuk lihat menu mbois kami!</p>
                    <a href="/" className="bg-[#096956] text-white py-3 px-8 rounded-xl font-bold hover:bg-[#075041] transition-all inline-block">
                        Lihat Menu
                    </a>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen w-full bg-[#f1f4f1] font-sans text-slate-800">
            <Head title="Checkout Pesanan - Es Teh Mbois" />

            <nav className="bg-white shadow-sm p-4 sticky top-0 z-20 w-full">
                <div className="w-full px-4 md:px-8 mx-auto flex items-center">
                    <a href="/" className="p-2 hover:bg-slate-100 rounded-full transition-colors mr-4">
                        <IconArrowLeft size={24} className="text-[#096956]" />
                    </a>
                    <h1 className="text-xl font-bold text-slate-800">Selesaikan Pesanan</h1>
                </div>
            </nav>

            <main className="w-full px-4 md:px-8 py-8 md:py-12 pb-24">
                {step === 1 && (
                    <CheckoutStepOneLayout
                        cart={cart}
                        paymentMethod={paymentMethod}
                        cashlessType={cashlessType}
                        totalAmount={totalAmount}
                        onPaymentMethodChange={setPaymentMethod}
                        onCashlessTypeChange={setCashlessType}
                        onCheckout={handleCheckout}
                    />
                )}

                {step === 2 && <CheckoutStepLoadingLayout />}

                {step === 3 && (
                    <CheckoutStepSuccessLayout
                        paymentMethod={paymentMethod}
                        totalAmount={totalAmount}
                        receiptNumber={receiptNumber}
                        paymentTime={paymentTime}
                        paymentMethodLabel={getPaymentMethodLabel()}
                        uniqueCode={uniqueCode}
                        copied={copied}
                        cart={cart}
                        onCopyCode={copyToClipboard}
                    />
                )}
            </main>
        </div>
    );
}
