<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="preload" href="/fonts/cherry-freeland.woff2" as="font" type="font/woff2" crossorigin>
    @viteReactRefresh  {{-- THIS MUST COME BEFORE @VITE --}}
    @vite('resources/js/app.tsx')
    @inertiaHead
</head>
<body class="antialiased">
    @inertia
</body>
</html>
