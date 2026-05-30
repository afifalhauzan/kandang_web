import { Head, Link, useForm } from "@inertiajs/react";
import { IconLeaf, IconEye, IconEyeOff } from "@tabler/icons-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { useState } from "react";
import { TEH_MBOIS_IMAGES } from "../../components/landing/constants";

type LoginForm = {
    email: string;
    password: string;
    remember: boolean;
};

export default function LoginPage() {
    const { data, setData, post, processing, errors } = useForm<LoginForm>({
        email: "",
        password: "",
        remember: false,
    });

    const [showPassword, setShowPassword] = useState(false);

    function submit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        post("/login");
    }

    return (
        <>
            <Head title="Login — TehMbois" />

            <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-emerald-100/60 px-4 py-8 sm:px-6 lg:px-8">
                <div className="pointer-events-none absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-emerald-200/30 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-32 -right-32 h-[400px] w-[400px] rounded-full bg-emerald-300/20 blur-3xl" />
                <div className="pointer-events-none absolute left-1/2 top-1/3 h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-emerald-100/40 blur-3xl" />

                <div className="relative z-10 w-full max-w-[1000px] overflow-hidden rounded-3xl border border-white/60 bg-white/70 shadow-2xl shadow-emerald-900/5 backdrop-blur-xl">
                    <div className="flex flex-col lg:flex-row">
                        <div className="relative hidden overflow-hidden lg:block lg:w-[48%]">
                            <img
                                src="/es teh/sidelogin.jpeg"
                                alt="TehMbois Es Teh Collection"
                                className="absolute inset-0 h-full w-full object-cover"
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-[#022c22]/98 via-[#043f31]/88 to-[#065f46]/72" />

                            <div className="absolute inset-0 flex flex-col justify-between p-8">
                                <div className="flex items-center gap-2.5">
                                    <img
                                                                            src={TEH_MBOIS_IMAGES.logo}
                                                                            alt="TehMbois"
                                                                            className="h-8 w-auto object-contain md:h-16"
                                                                        />
                                </div>

                                <div className="space-y-4">
                                    <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-medium text-emerald-200 backdrop-blur-md">
                                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                        Outlet Management System
                                    </div>

                                    <h2 className="text-3xl font-bold leading-tight tracking-tight text-white">
                                        Kelola Bisnismu
                                        <br />
                                        <span className="text-emerald-300">Lebih Cerdas.</span>
                                    </h2>

                                    <p className="text-sm leading-relaxed text-emerald-100/80">
                                        Pantau penjualan, kelola menu, dan dapatkan insight bisnis
                                        real-time untuk outlet TehMbois kamu.
                                    </p>

                                   
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col justify-center px-6 py-8 sm:px-10 sm:py-10 lg:w-[52%] lg:px-12 lg:py-10">
                            <div className="mb-8 lg:hidden">
                                <div className="flex items-center gap-2.5">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                                        <IconLeaf size={18} className="text-primary" />
                                    </div>
                                    <span className="text-lg font-bold tracking-tight">
                                        Teh<span className="text-primary">Mbois</span>
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                                    Selamat Datang!
                                </h1>
                                {/* <p className="text-sm text-muted-foreground">
                                    Masuk ke dashboard
                                </p> */}
                            </div>

                            <form onSubmit={submit} className="mt-7 space-y-4">
                                <div className="space-y-1.5">
                                    <label htmlFor="login-email" className="text-sm font-semibold text-foreground">
                                        Email Address
                                    </label>
                                    <Input
                                        id="login-email"
                                        type="email"
                                        placeholder="nama@tehmbois.com"
                                        value={data.email}
                                        onChange={(event) => setData("email", event.target.value)}
                                        required
                                        className="h-11 rounded-xl border-border/80 bg-muted/40 px-4 text-sm transition-all duration-200 focus:border-primary focus:bg-white focus:shadow-[0_0_0_3px_rgba(16,185,129,0.1)]"
                                    />
                                    {errors.email ? (
                                        <p className="text-sm text-destructive">{errors.email}</p>
                                    ) : null}
                                </div>

                                <div className="space-y-1.5">
                                    <div className="flex items-center justify-between">
                                        <label htmlFor="login-password" className="text-sm font-semibold text-foreground">
                                            Password
                                        </label>
                                        {/* <button
                                            type="button"
                                            className="text-xs font-medium text-primary hover:text-primary/80 transition-colors"
                                        >
                                            Lupa password?
                                        </button> */}
                                    </div>
                                    <div className="relative">
                                        <Input
                                            id="login-password"
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Masukkan password"
                                            value={data.password}
                                            onChange={(event) => setData("password", event.target.value)}
                                            required
                                            className="h-11 rounded-xl border-border/80 bg-muted/40 px-4 pr-11 text-sm transition-all duration-200 focus:border-primary focus:bg-white focus:shadow-[0_0_0_3px_rgba(16,185,129,0.1)]"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                                        >
                                            {showPassword ? <IconEyeOff size={17} /> : <IconEye size={17} />}
                                        </button>
                                    </div>
                                    {errors.password ? (
                                        <p className="text-sm text-destructive">{errors.password}</p>
                                    ) : null}
                                </div>

                                <label
                                    htmlFor="login-remember"
                                    className="flex cursor-pointer items-center gap-2.5 select-none"
                                >
                                    <div className="relative">
                                        <input
                                            id="login-remember"
                                            type="checkbox"
                                            checked={data.remember}
                                            onChange={(event) => setData("remember", event.target.checked)}
                                            className="peer h-[18px] w-[18px] cursor-pointer appearance-none rounded-md border-2 border-border transition-all checked:border-primary checked:bg-primary"
                                        />
                                        <svg
                                            className="pointer-events-none absolute left-[3px] top-[3px] h-3 w-3 text-primary-foreground opacity-0 peer-checked:opacity-100 transition-opacity"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth={3.5}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <polyline points="20 6 9 17 4 12" />
                                        </svg>
                                    </div>
                                    <span className="text-sm text-muted-foreground">Ingat saya</span>
                                </label>

                                <Button
                                    type="submit"
                                    disabled={processing}
                                    className="h-11 w-full rounded-xl text-sm font-semibold tracking-wide shadow-lg shadow-primary/20 transition-all duration-200 hover:shadow-xl hover:shadow-primary/25 hover:-translate-y-0.5 active:translate-y-0"
                                >
                                    {processing ? (
                                        <span className="flex items-center gap-2">
                                            <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                            </svg>
                                            Memproses...
                                        </span>
                                    ) : (
                                        "Masuk ke Dashboard"
                                    )}
                                </Button>
                            </form>

                            <div className="mt-5 rounded-xl border border-primary/15 bg-primary/5 p-3.5">
                                <p className="text-xs font-semibold text-foreground">Info Login</p>
                                <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                                    Gunakan akun owner, kasir, atau pengguna yang terdaftar. Hubungi kontak kami jika lupa akses.
                                </p>
                            </div>

                            <p className="mt-6 text-center text-sm text-muted-foreground">
                                Belum punya akun?{" "}
                                <Link
                                    href="/register"
                                    className="font-semibold text-primary transition-colors hover:text-primary/80"
                                >
                                    Daftar sekarang
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
