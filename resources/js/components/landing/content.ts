export const landingImages = {
    heroFarm: "/images/landing/hero-farm-aerial.jpg",
    healthCheck: "/images/landing/health-check-cow.jpg",
    tabletDashboard: "/images/landing/tablet-price-weather.jpg",
    managerPortrait: "/images/landing/farm-manager-portrait.jpg",
} as const;

export const proofPoints = [
    "Farm, barn, dan livestock management",
    "AI-assisted workflow",
];

export const problemCards = [
    {
        title: "Catatan tersebar",
        description: "Data farm, kandang, dan populasi sering tercecer di catatan manual sehingga susah ditelusuri saat dibutuhkan.",
    },
    {
        title: "Jadwal terlewat",
        description: "Tanpa daftar vaksinasi dan perawatan yang rapi, tindak lanjut kesehatan ternak mudah terlewat.",
    },
    {
        title: "Riwayat sulit dicari",
        description: "Melacak kondisi, treatment, dan status ternak per kandang memakan waktu kalau tidak terdokumentasi digital.",
    },
    {
        title: "Keputusan minim konteks",
        description: "Harga pasar dan cuaca sering memengaruhi keputusan harian, tetapi datanya jarang terkumpul dalam satu tempat.",
    },
] as const;

export const solutionPillars = [
    {
        title: "Kelola operasional",
        description: "Susun farm, kandang, dan populasi ternak dalam struktur yang mudah dipahami tim lapangan.",
        image: landingImages.heroFarm,
        points: ["Farm dan barn management", "Inventaris livestock", "Status ternak aktif, sold, dead"],
    },
    {
        title: "Pantau kesehatan",
        description: "Rekam kondisi, treatment, dan jadwal vaksinasi supaya tindak lanjut harian lebih disiplin.",
        image: landingImages.healthCheck,
        points: ["Health record per livestock", "Vaccination schedule", "Disease detection history"],
    },
    {
        title: "Bantu keputusan",
        description: "Kumpulkan konteks pasar dan cuaca, lalu siapkan jalur AI untuk rekomendasi awal yang lebih cepat.",
        image: landingImages.tabletDashboard,
        points: ["Feed formula history", "Price radar dan weather log", "Assistant dan AI mock workflow"],
    },
] as const;

export const aiAssistCards = [
    {
        badge: "Prototype Phase",
        title: "Disease Detection",
        description: "Riwayat upload, prediction, confidence, dan recommendation sudah ada untuk demo alur deteksi berbasis gambar.",
    },
    {
        badge: "AI-assisted Engine",
        title: "Feed Recommendation",
        description: "Feed formula sudah bisa disimpan sebagai hasil formulasi MVP dan siap dikembangkan ke logika optimasi nutrisi yang lebih nyata.",
    },
] as const;

export const dashboardStats = [
    { label: "Farm aktif", value: "3", tone: "text-emerald-700" },
    { label: "Kandang aktif", value: "24", tone: "text-amber-700" },
    { label: "Populasi ternak", value: "1.248", tone: "text-slate-900" },
    { label: "Vaksin mendatang", value: "12", tone: "text-rose-700" },
] as const;

export const livestockPreviewRows = [
    { code: "SP-0122", species: "Sapi Limousin", status: "Sehat", tone: "healthy" },
    { code: "SP-0123", species: "Sapi Madura", status: "Karantina", tone: "watch" },
    { code: "KM-0442", species: "Kambing PE", status: "Sehat", tone: "healthy" },
] as const;

export const priceRadarItems = [
    { name: "Sapi Potong", price: "Rp 120.000/kg" },
    { name: "Kambing", price: "Rp 2.450.000/ekor" },
    { name: "Pakan Konsentrat", price: "Rp 8.500/kg" },
] as const;

export const benefitCards = [
    {
        title: "Data lebih rapi",
        description: "Farm, barn, dan livestock tersusun dalam struktur digital yang siap dipakai frontend dan backend.",
    },
    {
        title: "Monitoring mudah",
        description: "Dashboard dan halaman operasional memudahkan tim melihat prioritas harian tanpa pindah catatan.",
    },
    {
        title: "Jadwal lebih tepat",
        description: "Health record dan vaccination schedule membantu tim menjaga perawatan tetap konsisten.",
    },
    {
        title: "Riwayat lebih aman",
        description: "Data kesehatan, formula, dan deteksi tersimpan sebagai histori yang mudah dibaca ulang.",
    },
    {
        title: "Siap tumbuh",
        description: "Fondasi MVP sudah ada, jadi diskusi AI, integrasi cuaca, dan market data bisa lanjut dari base yang nyata.",
    },
] as const;

export const footerColumns = [
    {
        title: "Platform",
        links: ["Farm Management", "Barn Management", "Livestock Records"],
    },
    {
        title: "MVP Features",
        links: ["Health Tracking", "Vaccination Schedule", "AI-assisted Workflow"],
    }
] as const;
