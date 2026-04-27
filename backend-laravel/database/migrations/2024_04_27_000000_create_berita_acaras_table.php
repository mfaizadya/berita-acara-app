<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Migration untuk tabel berita_acaras.
 * Mengikuti best practice database design: indexing pada kolom yang sering dicari.
 */
return new class extends Migration
{
    public function up(): void
    {
        Schema::create('berita_acaras', function (Blueprint $table) {
            $table->id();
            $table->string('nomor_ba')->unique()->index(); // Nomor unik Berita Acara
            $table->string('judul_kegiatan');
            $table->date('tanggal_kegiatan')->index();
            $table->time('waktu_kegiatan');
            $table->string('lokasi');
            $table->string('pic_nama'); // Penanggung Jawab
            $table->enum('status', ['draft', 'review', 'selesai'])->default('draft');
            $table->text('catatan')->nullable();
            $table->timestamps();
            $table->softDeletes(); // Best practice: jangan hapus permanen data audit
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('berita_acaras');
    }
};
