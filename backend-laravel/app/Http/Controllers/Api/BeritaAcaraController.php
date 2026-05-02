<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\BeritaAcaraResource;
use App\Services\BeritaAcaraService;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

/**
 * Controller BeritaAcara.
 * Menangani routing dan koordinasi antara Service dan Resource.
 */
class BeritaAcaraController extends Controller
{
    public function __construct(
        protected BeritaAcaraService $service
    ) {}

    /**
     * Menampilkan daftar berita acara.
     */
    public function index(Request $request): AnonymousResourceCollection
    {
        $data = $this->service->getAllBeritaAcara($request->query('search'));
        
        return BeritaAcaraResource::collection($data);
    }

    /**
     * Menyimpan data baru (contoh endpoint).
     */
    public function store(Request $request)
    {
        // Best practice: gunakan FormRequest untuk validasi
        $validated = $request->validate([
            'nomor_ba' => 'required|unique:berita_acaras',
            'judul_kegiatan' => 'required|string|max:255',
            'tanggal_kegiatan' => 'required|date',
            'waktu_kegiatan' => 'required',
            'lokasi' => 'required|string',
            'pic_nama' => 'required|string',
        ]);

        $beritaAcara = $this->service->create($validated);

        return new BeritaAcaraResource($beritaAcara);
    }
}
