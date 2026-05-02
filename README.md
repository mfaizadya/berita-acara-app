# Berita Acara Digital - Framework Template

Aplikasi manajemen Berita Acara berbasis web yang dirancang khusus untuk kemudahan penggunaan di perangkat mobile dan desktop. Proyek ini menerapkan standar Best Practice Software Engineering untuk memastikan kode yang bersih, mudah dipelihara, dan dapat dikembangkan lebih lanjut.

## Fitur Utama
- **Responsive Hybrid UI**: Tampilan cerdas yang menyesuaikan diri (Tabel di Desktop, Kartu di Mobile).
- **Automated PDF Generator**: Cetak laporan Berita Acara resmi langsung dari browser.
- **Search & Filter**: Pencarian data cepat dan efisien.
- **API-Ready Architecture**: Struktur backend Laravel yang siap dihubungkan ke frontend Next.js.

## Tech Stack & Architecture
Proyek ini menggunakan arsitektur **Decoupled Full-Stack**:
- **Backend**: Laravel 11 (API Only)
  - Menggunakan *Service Layer Pattern* untuk logika bisnis.
  - Menggunakan *API Resources* untuk format data yang konsisten.
- **Frontend**: Next.js 14 (React)
  - Menggunakan *TypeScript* untuk keamanan tipe data.
  - Menggunakan *Tailwind CSS* untuk styling premium dan responsif.
  - Menggunakan *Lucide React* untuk set ikon modern.

## Struktur Proyek
```text
├── backend-laravel/    # Source code mesin API (Laravel)
├── frontend-nextjs/    # Source code antarmuka (Next.js)
├── live-test.html      # Demo interaktif satu file (untuk preview cepat)
└── README.md           # Dokumentasi ini
```

## Cara Instalasi

### Backend (Laravel)
1. Masuk ke folder `backend-laravel` (`cd backend-laravel`).
2. Jalankan instalasi dependensi PHP: `composer install`.
3. Duplikat file konfigurasi lingkungan: `cp .env.example .env`.
4. Jika diperlukan, atur koneksi database (DB_*) di file `.env`. (Secara default menggunakan SQLite bawaan).
5. Generate kunci keamanan aplikasi: `php artisan key:generate`.
6. Buat struktur tabel ke database: `php artisan migrate`.
7. Jalankan mesin/server backend: `php artisan serve`.

### Frontend (Next.js)
1. Buka terminal baru dan masuk ke folder `frontend-nextjs` (`cd frontend-nextjs`).
2. Jalankan instalasi library UI: `npm install`.
3. (Opsional) File `.env` sudah memuat `NEXT_PUBLIC_API_URL=http://localhost:8000/api`. Ubah jika port backend Anda berbeda.
4. Jalankan antarmuka: `npm run dev`.
5. Buka `http://localhost:3000` di browser.

