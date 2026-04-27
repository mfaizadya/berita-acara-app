<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * BeritaAcaraResource untuk memformat output API.
 * Menghindari kebocoran data database ke client.
 */
class BeritaAcaraResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'nomor' => $this->nomor_ba,
            'kegiatan' => $this->judul_kegiatan,
            'tanggal' => $this->tanggal_kegiatan->format('Y-m-d'),
            'waktu' => $this->waktu_kegiatan,
            'lokasi' => $this->lokasi,
            'pic' => $this->pic_nama,
            'status' => $this->status,
            'label_status' => ucfirst($this->status), // Penambahan field untuk kemudahan UI
            'catatan' => $this->catatan ?? '-',
            'created_at' => $this->created_at->toISOString(),
        ];
    }
}
