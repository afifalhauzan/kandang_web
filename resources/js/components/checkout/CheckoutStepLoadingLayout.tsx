export function CheckoutStepLoadingLayout() {
    return (
        <div className="w-full flex items-center justify-center min-h-[60vh]">
            <div className="bg-white rounded-3xl p-12 text-center shadow-2xl border border-slate-100 max-w-lg w-full mx-auto fade-in">
                <div className="w-28 h-28 border-4 border-slate-100 border-t-[#096956] rounded-full animate-spin mx-auto mb-8 shadow-inner"></div>
                <h2 className="text-3xl font-extrabold mb-4 text-slate-800">Memproses Pembayaran</h2>
                <p className="text-slate-500 text-lg">Menyambungkan ke sistem pembayaran... Mohon jangan tutup halaman ini.</p>
            </div>
        </div>
    );
}
