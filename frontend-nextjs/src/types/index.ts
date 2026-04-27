/**
 * Definisi Interface untuk Data Berita Acara.
 * Mengikuti best practice TypeScript: Type Safety di seluruh aplikasi.
 */
export interface BeritaAcara {
  id: number;
  nomor: string;
  kegiatan: string;
  tanggal: string;
  waktu: string;
  lokasi: string;
  pic: string;
  status: 'draft' | 'review' | 'selesai';
  label_status: string;
  catatan: string;
}

export interface ApiResponse<T> {
  data: T;
  meta?: any;
}
