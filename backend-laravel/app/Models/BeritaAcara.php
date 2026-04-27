<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Model BeritaAcara.
 * Menggunakan SoftDeletes agar data tidak hilang jika tidak sengaja terhapus.
 */
class BeritaAcara extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * Atribut yang dapat diisi secara massal.
     * Mengikuti prinsip "Explicit is better than implicit".
     */
    protected $fillable = [
        'nomor_ba',
        'judul_kegiatan',
        'tanggal_kegiatan',
        'waktu_kegiatan',
        'lokasi',
        'pic_nama',
        'status',
        'catatan',
    ];

    /**
     * Casting tipe data agar konsisten saat diakses.
     */
    protected $casts = [
        'tanggal_kegiatan' => 'date',
        'waktu_kegiatan' => 'string', // atau cast ke datetime jika perlu
    ];
}
