<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Es Teh Showcase</title>
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=inter:400,500,600,700,800" rel="stylesheet" />
    @if (file_exists(public_path('build/manifest.json')) || file_exists(public_path('hot')))
        @vite(['resources/css/app.css', 'resources/js/app.js'])
    @endif
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        body { font-family: 'Inter', sans-serif; }
    </style>
</head>
<body class="bg-slate-900 text-white antialiased selection:bg-amber-500 selection:text-white">
    <div class="min-h-screen">
        <nav class="p-6 flex justify-between items-center max-w-7xl mx-auto">
            <div class="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
                EsTeh Nusantara
            </div>
            @if (Route::has('login'))
                <div class="space-x-4">
                    @auth
                        <a href="{{ url('/dashboard') }}" class="hover:text-amber-400 transition-colors">Dashboard</a>
                    @else
                        <a href="{{ route('login') }}" class="hover:text-amber-400 transition-colors">Log in</a>
                        @if (Route::has('register'))
                            <a href="{{ route('register') }}" class="bg-gradient-to-r from-amber-500 to-orange-500 px-4 py-2 rounded-lg hover:opacity-90 transition-opacity font-medium">Register</a>
                        @endif
                    @endauth
                </div>
            @endif
        </nav>

        <main class="max-w-7xl mx-auto px-6 py-16">
            <div class="text-center mb-16">
                <h1 class="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">
                    Segarkan Harimu <br>
                    <span class="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">Dengan Es Teh Pilihan</span>
                </h1>
                <p class="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto">
                    Nikmati kesegaran es teh premium dengan berbagai varian rasa yang dibuat dari daun teh pilihan terbaik.
                </p>
            </div>

            <section id="showcase" class="py-12">
                <h2 class="text-3xl font-bold mb-10 text-center border-b border-slate-800 pb-4 inline-block mx-auto flex justify-center">
                    Showcase Menu Kami
                </h2>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
                    <div class="group relative rounded-2xl overflow-hidden bg-slate-800 border border-slate-700 hover:border-amber-500 transition-all duration-300 hover:shadow-[0_0_30px_rgba(245,158,11,0.3)] hover:-translate-y-2">
                        <div class="aspect-w-4 aspect-h-3 w-full overflow-hidden bg-slate-900">
                            <img src="{{ asset('es teh/es tarik.jpeg') }}" alt="Es Tarik" class="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-500 ease-in-out">
                        </div>
                        <div class="p-6">
                            <h3 class="text-xl font-semibold mb-2 group-hover:text-amber-400 transition-colors">Es Tarik</h3>
                            <p class="text-slate-400 text-sm">Paduan sempurna teh dan susu yang ditarik untuk menghasilkan tekstur yang lembut dan kaya rasa.</p>
                        </div>
                    </div>

                    <div class="group relative rounded-2xl overflow-hidden bg-slate-800 border border-slate-700 hover:border-amber-500 transition-all duration-300 hover:shadow-[0_0_30px_rgba(245,158,11,0.3)] hover:-translate-y-2">
                        <div class="aspect-w-4 aspect-h-3 w-full overflow-hidden bg-slate-900">
                            <img src="{{ asset('es teh/teh gula aren.jpeg') }}" alt="Teh Gula Aren" class="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-500 ease-in-out">
                        </div>
                        <div class="p-6">
                            <h3 class="text-xl font-semibold mb-2 group-hover:text-amber-400 transition-colors">Teh Gula Aren</h3>
                            <p class="text-slate-400 text-sm">Kesegaran teh autentik berpadu dengan manisnya gula aren alami yang khas dan legit.</p>
                        </div>
                    </div>

                    <div class="group relative rounded-2xl overflow-hidden bg-slate-800 border border-slate-700 hover:border-amber-500 transition-all duration-300 hover:shadow-[0_0_30px_rgba(245,158,11,0.3)] hover:-translate-y-2">
                        <div class="aspect-w-4 aspect-h-3 w-full overflow-hidden bg-slate-900">
                            <img src="{{ asset('es teh/teh jahe.jpeg') }}" alt="Teh Jahe" class="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-500 ease-in-out">
                        </div>
                        <div class="p-6">
                            <h3 class="text-xl font-semibold mb-2 group-hover:text-amber-400 transition-colors">Teh Jahe</h3>
                            <p class="text-slate-400 text-sm">Kehangatan jahe asli berpadu dengan es teh yang memberikan sensasi unik di tenggorokan.</p>
                        </div>
                    </div>

                    <div class="group relative rounded-2xl overflow-hidden bg-slate-800 border border-slate-700 hover:border-amber-500 transition-all duration-300 hover:shadow-[0_0_30px_rgba(245,158,11,0.3)] hover:-translate-y-2">
                        <div class="aspect-w-4 aspect-h-3 w-full overflow-hidden bg-slate-900">
                            <img src="{{ asset('es teh/teh lemon.jpeg') }}" alt="Teh Lemon" class="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-500 ease-in-out">
                        </div>
                        <div class="p-6">
                            <h3 class="text-xl font-semibold mb-2 group-hover:text-amber-400 transition-colors">Teh Lemon</h3>
                            <p class="text-slate-400 text-sm">Perasan lemon segar asli dipadukan dengan teh murni untuk kesegaran maksimal di hari yang panas.</p>
                        </div>
                    </div>

                    <div class="group relative rounded-2xl overflow-hidden bg-slate-800 border border-slate-700 hover:border-amber-500 transition-all duration-300 hover:shadow-[0_0_30px_rgba(245,158,11,0.3)] hover:-translate-y-2">
                        <div class="aspect-w-4 aspect-h-3 w-full overflow-hidden bg-slate-900">
                            <img src="{{ asset('es teh/teh susu.jpeg') }}" alt="Teh Susu" class="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-500 ease-in-out">
                        </div>
                        <div class="p-6">
                            <h3 class="text-xl font-semibold mb-2 group-hover:text-amber-400 transition-colors">Teh Susu</h3>
                            <p class="text-slate-400 text-sm">Kombinasi klasik teh premium dan susu segar yang menciptakan harmoni rasa manis dan creamy.</p>
                        </div>
                    </div>

                    <div class="group relative rounded-2xl overflow-hidden bg-slate-800 border border-slate-700 hover:border-amber-500 transition-all duration-300 hover:shadow-[0_0_30px_rgba(245,158,11,0.3)] hover:-translate-y-2">
                        <div class="aspect-w-4 aspect-h-3 w-full overflow-hidden bg-slate-900">
                            <img src="{{ asset('es teh/5 Es Teh.jpeg') }}" alt="5 Es Teh Spesial" class="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-500 ease-in-out">
                        </div>
                        <div class="p-6">
                            <h3 class="text-xl font-semibold mb-2 group-hover:text-amber-400 transition-colors">5 Es Teh Spesial</h3>
                            <p class="text-slate-400 text-sm">Paket lengkap 5 varian es teh spesial kami yang menyegarkan untuk dinikmati bersama teman atau keluarga.</p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
        
        <footer class="border-t border-slate-800 py-8 mt-12 text-center text-slate-500">
            <p>&copy; {{ date('Y') }} EsTeh Nusantara. All rights reserved.</p>
        </footer>
    </div>
</body>
</html>
