import { Link } from "@inertiajs/react";
import { Button } from "@/components/ui/button";

export default function LandingClosingCtaSection() {
    return (
        <section className="relative overflow-hidden bg-emerald-800 px-6 py-20 text-white">
            <div className="pointer-events-none absolute inset-0 opacity-10">
                <div className="grid h-full grid-cols-6 gap-4 rotate-12 scale-150 md:grid-cols-12">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <div key={index} className={`h-56 rounded-[2rem] bg-white ${index % 2 === 0 ? "mt-0" : "mt-10"}`} />
                    ))}
                </div>
            </div>

            <div className="relative z-10 mx-auto w-full max-w-4xl text-center">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-100">Mulai dari fondasi yang sudah nyata</p>
                <h2 className="mt-4 font-[Manrope] text-4xl font-bold leading-tight md:text-5xl">
                    Mulai digitalisasi operasional peternakan Anda.
                </h2>
                <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-emerald-100/90 md:text-lg">
                    Core product untuk farm, kandang, ternak, kesehatan, dan workflow AI-assisted sudah siap dijadikan bahan diskusi desain, demo lomba, dan sprint teknis berikutnya.
                </p>

                <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                    <Button asChild size="lg" className="bg-white text-emerald-800 hover:bg-emerald-50">
                        <Link href="/register">Daftar Sekarang</Link>
                    </Button>
                    <Button
                        asChild
                        size="lg"
                        variant="outline"
                        className="border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white"
                    >
                        <Link href="/login">Masuk ke Aplikasi</Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
