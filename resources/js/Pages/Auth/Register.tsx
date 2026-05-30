import { Head, Link, useForm } from "@inertiajs/react";
import { IconLeaf, IconEye, IconEyeOff } from "@tabler/icons-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { useState } from "react";
import { TEH_MBOIS_IMAGES } from "../../components/landing/constants";

type RegisterForm = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
};

export default function RegisterPage() {
    const { data, setData, post, processing, errors } = useForm<RegisterForm>({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    function submit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        post("/register");
    }

    return (
        <>
            <Head title="Daftar — TehMbois" />

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

                                    <h2 className="text-3xl font-bold leading-tight tracking-tight text-white">
                                        Bergabung dengan
                                        <br />
                                        <span className="text-emerald-300">TehMbois.</span>
                                    </h2>

                                    <p className="text-sm leading-relaxed text-emerald-100/80">
                                        Daftarkan akun anda dan akses reward poin kamu!
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
                                    Buat Akun Baru
                                </h1>
                            </div>

                            <form onSubmit={submit} className="mt-7 space-y-4">
                                <div className="space-y-1.5">
                                    <label htmlFor="register-name" className="text-sm font-semibold text-foreground">
                                        Nama Lengkap
                                    </label>
                                    <Input
                                        id="register-name"
                                        type="text"
                                        placeholder="Masukkan nama lengkap"
                                        value={data.name}
                                        onChange={(event) => setData("name", event.target.value)}
                                        required
                                        className="h-11 rounded-xl border-border/80 bg-muted/40 px-4 text-sm transition-all duration-200 focus:border-primary focus:bg-white focus:shadow-[0_0_0_3px_rgba(16,185,129,0.1)]"
                                    />
                                    {errors.name ? (
                                        <p className="text-sm text-destructive">{errors.name}</p>
                                    ) : null}
                                </div>

                                <div className="space-y-1.5">
                                    <label htmlFor="register-email" className="text-sm font-semibold text-foreground">
                                        Email Address
                                    </label>
                                    <Input
                                        id="register-email"
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

                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <div className="space-y-1.5">
                                        <label htmlFor="register-password" className="text-sm font-semibold text-foreground">
                                            Password
                                        </label>
                                        <div className="relative">
                                            <Input
                                                id="register-password"
                                                type={showPassword ? "text" : "password"}
                                                placeholder="Min. 8 karakter"
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

                                    <div className="space-y-1.5">
                                        <label htmlFor="register-password-confirm" className="text-sm font-semibold text-foreground">
                                            Konfirmasi Password
                                        </label>
                                        <div className="relative">
                                            <Input
                                                id="register-password-confirm"
                                                type={showConfirmPassword ? "text" : "password"}
                                                placeholder="Ulangi password"
                                                value={data.password_confirmation}
                                                onChange={(event) => setData("password_confirmation", event.target.value)}
                                                required
                                                className="h-11 rounded-xl border-border/80 bg-muted/40 px-4 pr-11 text-sm transition-all duration-200 focus:border-primary focus:bg-white focus:shadow-[0_0_0_3px_rgba(16,185,129,0.1)]"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                                            >
                                                {showConfirmPassword ? <IconEyeOff size={17} /> : <IconEye size={17} />}
                                            </button>
                                        </div>
                                    </div>
                                </div>

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
                                        "Daftar Sekarang"
                                    )}
                                </Button>
                            </form>

                            <p className="mt-6 text-center text-sm text-muted-foreground">
                                Sudah punya akun?{" "}
                                <Link
                                    href="/login"
                                    className="font-semibold text-primary transition-colors hover:text-primary/80"
                                >
                                    Masuk di sini
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
