## (judul)
---

## Tech Stack

### Backend
- **PHP 8.3+**
- **Laravel 13** — Framework utama
- **Inertia.js** — Bridge antara Laravel dan React (SPA tanpa API terpisah)
- **Laravel Sanctum** — API authentication
- **JWT Auth** — Token-based authentication untuk API
- **Maatwebsite Excel** — Import/export data Excel & CSV
- **L5-Swagger** — Dokumentasi API otomatis

### Frontend
- **React 19** — UI library
- **TypeScript 6** — Type safety
- **Vite 8** — Build tool & dev server
- **TailwindCSS 4** — Utility-first CSS framework
- **Recharts** — Charting library untuk grafik dan visualisasi data
- **Radix UI + Shadcn UI** — Komponen UI accessible dan modern
- **Tabler Icons** — Icon library
- **Motion (Framer Motion)** — Animasi dan transisi halus
- **Lenis** — Smooth scrolling

### Database
- **MySQL** — Database utama

---

## Instalasi & Setup

### Prasyarat

Pastikan perangkat Anda sudah terinstal:

- [PHP 8.3+](https://www.php.net/)
- [Composer](https://getcomposer.org/)
- [Node.js 20+](https://nodejs.org/) & npm
- [MySQL 8+](https://www.mysql.com/)
- [Git](https://git-scm.com/)

### Langkah Instalasi

**1. Clone Repository**

```bash
git clone https://github.com/mohamadarif03/kandang_web.git
cd kandang_web
```

**2. Install Dependensi PHP**

```bash
composer install
```

**3. Install Dependensi Node.js**

```bash
npm install
```

**4. Konfigurasi Environment**

```bash
cp .env.example .env
```

Kemudian buka file `.env` dan sesuaikan konfigurasi berikut:

```env
DB_DATABASE=predikai
DB_USERNAME=root
DB_PASSWORD=password_anda

GEMINI_API_KEY=api_key_gemini_anda
```

**5. Generate Application Key**

```bash
php artisan key:generate
```

**6. Generate JWT Secret**

```bash
php artisan jwt:secret
```

**7. Jalankan Migrasi Database**

Pastikan database MySQL `predikai` sudah dibuat terlebih dahulu, lalu jalankan:

```bash
php artisan migrate
```

**8. (Opsional) Jalankan Seeder**

```bash
php artisan db:seed
```

**9. Jalankan Aplikasi**

Buka **dua terminal** secara bersamaan:

```bash
# Terminal 1 — Laravel Backend
php artisan serve
```

```bash
# Terminal 2 — Vite Dev Server (Frontend)
npm run dev
```

Atau gunakan perintah shortcut:

```bash
composer dev
```

Aplikasi akan berjalan di **http://localhost:8000**.

---


## 🔗 API Endpoints

Dokumentasi API tersedia melalui Swagger UI setelah menjalankan aplikasi:

```
http://localhost:8000/api/documentation
```

### Ringkasan Endpoint

---

## 👤 Role Pengguna

---

## 🎨 Design System

---

## 📄 Lisensi

Project ini dikembangkan untuk keperluan akademis dan pembelajaran.

---
