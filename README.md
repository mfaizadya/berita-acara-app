# Berita Acara Digital - Framework Template

Aplikasi manajemen Berita Acara berbasis web yang dirancang khusus untuk kemudahan penggunaan di perangkat mobile dan desktop. Proyek ini menerapkan standar Best Practice Software Engineering untuk memastikan kode yang bersih, mudah dipelihara, dan dapat dikembangkan lebih lanjut.

## 🚀 Fitur Utama
- **Responsive Hybrid UI**: Tampilan cerdas yang menyesuaikan diri (Tabel di Desktop, Kartu di Mobile).
- **Automated PDF Generator**: Cetak laporan Berita Acara resmi langsung dari browser.
- **Search & Filter**: Pencarian data cepat dan efisien.
- **API-Ready Architecture**: Struktur backend Laravel yang siap dihubungkan ke frontend Next.js.

## 🛠️ Tech Stack & Architecture
Proyek ini menggunakan arsitektur **Decoupled Full-Stack**:
- **Backend**: Laravel 11 (API Only)
  - Menggunakan *Service Layer Pattern* untuk logika bisnis.
  - Menggunakan *API Resources* untuk format data yang konsisten.
- **Frontend**: Next.js 14 (React)
  - Menggunakan *TypeScript* untuk keamanan tipe data.
  - Menggunakan *Tailwind CSS* untuk styling premium dan responsif.
  - Menggunakan *Lucide React* untuk set ikon modern.

## 📚 Best Practices Applied
- **Clean Code**: Penamaan variabel yang deskriptif dan fungsi yang fokus pada satu tugas (Single Responsibility).
- **Don't Repeat Yourself (DRY)**: Penggunaan komponen UI reusable untuk meminimalisir duplikasi kode (< 2%).
- **Documentation**: Komentar lengkap pada setiap file penting sebagai panduan pengembangan.
- **Layered Architecture**: Pemisahan yang jelas antara Database (Model), Logic (Service), dan Interface (Controller).

## 📂 Struktur Proyek
```text
├── backend-laravel/    # Source code mesin API (Laravel)
├── frontend-nextjs/    # Source code antarmuka (Next.js)
├── live-test.html      # Demo interaktif satu file (untuk preview cepat)
└── README.md           # Dokumentasi ini
```

## ⚙️ Cara Instalasi (Untuk Tim IT)

### Backend (Laravel)
1. Masuk ke folder `backend-laravel`.
2. Jalankan `composer install`.
3. Copy `.env.example` ke `.env` dan atur koneksi database.
4. Jalankan `php artisan migrate`.
5. Jalankan `php artisan serve`.

### Frontend (Next.js)
1. Masuk ke folder `frontend-nextjs`.
2. Jalankan `npm install`.
3. Atur URL API di file konfigurasi.
4. Jalankan `npm run dev`.

---
Dikembangkan dengan ❤️ untuk kemudahan administrasi kantor.
