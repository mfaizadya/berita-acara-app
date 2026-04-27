<?php

namespace App\Services;

use App\Models\BeritaAcara;
use Illuminate\Support\Collection;

/**
 * BeritaAcaraService - Tempat logika bisnis aplikasi.
 * Sesuai prinsip SOLID: Controller hanya menangani request/response.
 */
class BeritaAcaraService
{
    /**
     * Mendapatkan daftar berita acara dengan filter sederhana.
     */
    public function getAllBeritaAcara(?string $search = null): Collection
    {
        $query = BeritaAcara::query();

        if ($search) {
            $query->where('judul_kegiatan', 'like', "%{$search}%")
                  ->orWhere('nomor_ba', 'like', "%{$search}%");
        }

        return $query->latest()->get();
    }

    /**
     * Membuat berita acara baru.
     */
    public function create(array $data): BeritaAcara
    {
        // Logika bisnis tambahan (misal: generate nomor otomatis) bisa ditaruh di sini
        return BeritaAcara::create($data);
    }
}
