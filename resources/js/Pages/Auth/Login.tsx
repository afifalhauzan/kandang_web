import { Head, Link, useForm } from "@inertiajs/react";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { useState } from "react";

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
            <Head title="Login - Ternak MVP" />

            <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-emerald-100/60 px-4 py-8 sm:px-6 lg:px-8">
                <div className="pointer-events-none absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-emerald-200/30 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-32 -right-32 h-[400px] w-[400px] rounded-full bg-emerald-300/20 blur-3xl" />
                <div className="pointer-events-none absolute left-1/2 top-1/3 h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-emerald-100/40 blur-3xl" />

                <div className="relative z-10 w-full max-w-[1000px] overflow-hidden rounded-3xl border border-white/60 bg-white/70 shadow-2xl shadow-emerald-900/5 backdrop-blur-xl">
                    <div className="flex flex-col lg:flex-row">
                        <div className="relative hidden overflow-hidden lg:block lg:w-[48%]">
                            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 via-emerald-600 to-sky-600" />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#022c22]/98 via-[#043f31]/88 to-[#065f46]/72" />

                            <div className="absolute inset-0 flex flex-col justify-between p-8">
                                <div className="text-sm font-semibold text-emerald-100">Ternak MVP</div>

                                <div className="space-y-4">
                                    <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-medium text-emerald-200 backdrop-blur-md">
                                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                        Farm Management System
                                    </div>

                                    <h2 className="text-3xl font-bold leading-tight tracking-tight text-white">
                                        Kelola Peternakan
                                        <br />
                                        <span className="text-emerald-300">Lebih Cerdas.</span>
                                    </h2>

                                    <p className="text-sm leading-relaxed text-emerald-100/80">
                                        Pantau kandang, ternak, kesehatan, dan data operasional dalam satu dashboard.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col justify-center px-6 py-8 sm:px-10 sm:py-10 lg:w-[52%] lg:px-12 lg:py-10">
                            <div className="mb-8 lg:hidden">
                                <p className="text-lg font-bold tracking-tight">Ternak MVP</p>
                            </div>

                            <div className="space-y-1.5">
                                <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">Selamat Datang!</h1>
                            </div>

                            <form onSubmit={submit} className="mt-7 space-y-4">
                                <div className="space-y-1.5">
                                    <label htmlFor="login-email" className="text-sm font-semibold text-foreground">
                                        Email Address
                                    </label>
                                    <Input
                                        id="login-email"
                                        type="email"
                                        placeholder="nama@email.com"
                                        value={data.email}
                                        onChange={(event) => setData("email", event.target.value)}
                                        required
                                        className="h-11 rounded-xl border-border/80 bg-muted/40 px-4 text-sm transition-all duration-200 focus:border-primary focus:bg-white focus:shadow-[0_0_0_3px_rgba(16,185,129,0.1)]"
                                    />
                                    {errors.email ? <p className="text-sm text-destructive">{errors.email}</p> : null}
                                </div>

                                <div className="space-y-1.5">
                                    <label htmlFor="login-password" className="text-sm font-semibold text-foreground">
                                        Password
                                    </label>
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
                                    {errors.password ? <p className="text-sm text-destructive">{errors.password}</p> : null}
                                </div>

                                <label htmlFor="login-remember" className="flex cursor-pointer items-center gap-2.5 select-none">
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
                                    {processing ? "Memproses..." : "Masuk ke Dashboard"}
                                </Button>
                            </form>

                            <p className="mt-6 text-center text-sm text-muted-foreground">
                                Belum punya akun?{" "}
                                <Link href="/register" className="font-semibold text-primary transition-colors hover:text-primary/80">
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
