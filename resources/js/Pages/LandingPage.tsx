import { Head, Link } from "@inertiajs/react";

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-sky-50 text-slate-900">
            <Head title="Ternak MVP" />

            <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6">
                <h1 className="text-2xl font-semibold">Ternak MVP</h1>
                <div className="flex gap-2">
                    <Link href="/login" className="rounded border border-slate-300 px-4 py-2 text-sm">
                        Login
                    </Link>
                    <Link href="/register" className="rounded bg-emerald-600 px-4 py-2 text-sm text-white">
                        Register
                    </Link>
                </div>
            </header>

            <main className="mx-auto grid w-full max-w-6xl gap-6 px-6 pb-14 pt-4 lg:grid-cols-2">
                <section className="rounded-xl border bg-white p-8 shadow-sm">
                    <p className="mb-2 text-sm text-emerald-700">Sprint 1 Scaffolding</p>
                    <h2 className="text-3xl font-bold">Platform Manajemen Peternakan Berbasis Web + AI</h2>
                    <p className="mt-4 text-slate-600">
                        Landing public untuk MVP lomba. Setelah login, user bisa langsung akses dashboard, CRUD kandang, CRUD ternak, monitoring kesehatan, dan fitur AI mock.
                    </p>
                    <div className="mt-6 flex flex-wrap gap-3">
                        <Link href="/dashboard" className="rounded bg-emerald-600 px-4 py-2 text-white">
                            Buka Dashboard
                        </Link>
                        <Link href="/farms" className="rounded border border-slate-300 px-4 py-2">
                            Mulai dari Farm
                        </Link>
                    </div>
                </section>

                <section className="rounded-xl border bg-white p-8 shadow-sm">
                    <h3 className="mb-4 text-xl font-semibold">Modul MVP</h3>
                    <ul className="space-y-2 text-sm text-slate-700">
                        <li>1. Manajemen Farm, Barn, dan Livestock</li>
                        <li>2. Health Record dan Vaccination Schedule</li>
                        <li>3. Disease Detection (upload + hasil AI mock)</li>
                        <li>4. Feed Calculator (hasil formulasi mock)</li>
                        <li>5. Price Radar dan Weather Log</li>
                        <li>6. Assistant chat UI sederhana</li>
                    </ul>
                </section>
            </main>
        </div>
    );
}
