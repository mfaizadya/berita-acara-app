'use client';

import React, { useState, useMemo } from 'react';
import { Search, PlusCircle, Printer, Calendar, MapPin, User, FileText } from 'lucide-react';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { BeritaAcara } from '@/types';
// Import PDF Generator (asumsi file utilitas sudah dipisah)
// import { generateBeritaAcaraPDF } from '@/lib/pdf';

/**
 * BeritaAcaraPage - Halaman Utama.
 * Menggunakan prinsip Decomposition: Memecah tampilan besar menjadi sub-komponen lokal.
 */
export default function BeritaAcaraPage() {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock Data (Nantinya diambil dari Laravel API)
  const [data] = useState<BeritaAcara[]>([
    { id: 1, nomor: "BA-2024-001", tanggal: "2024-04-20", waktu: "09:00", kegiatan: "Serah Terima Inventaris", lokasi: "Ruang Rapat Utama", pic: "Budi Santoso", status: "selesai", label_status: "Selesai", catatan: "" },
    { id: 2, nomor: "BA-2024-002", tanggal: "2024-04-21", waktu: "13:30", kegiatan: "Maintenance Server", lokasi: "Data Center", pic: "Siti Aminah", status: "review", label_status: "Review", catatan: "" },
  ]);

  // Logic Pencarian (Memoized untuk performa)
  const filteredData = useMemo(() => {
    return data.filter(item => 
      item.kegiatan.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.nomor.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [data, searchTerm]);

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Navbar / Header */}
      <nav className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-slate-200 z-10">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-1.5 rounded-lg text-white">
              <FileText size={20} />
            </div>
            <span className="font-bold text-lg text-slate-800">BeritaAcara.</span>
          </div>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors flex items-center gap-2">
            <PlusCircle size={18} /> <span className="hidden sm:inline">Tambah Data</span>
          </button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Search Bar */}
        <div className="mb-6 relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Cari berita acara..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Content Container */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          
          {/* DESKTOP TABLE VIEW */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50/50 border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Kegiatan</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Lokasi & PIC</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Status</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredData.map(item => (
                  <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-semibold text-slate-800">{item.kegiatan}</p>
                      <p className="text-xs text-slate-400">{item.nomor} • {item.tanggal}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-slate-600 flex items-center gap-1"><MapPin size={14} /> {item.lokasi}</p>
                      <p className="text-xs text-slate-400 flex items-center gap-1"><User size={14} /> {item.pic}</p>
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={item.status} />
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-2 text-slate-400 hover:text-indigo-600 transition-colors">
                        <Printer size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* MOBILE CARD VIEW */}
          <div className="md:hidden divide-y divide-slate-100">
            {filteredData.map(item => (
              <div key={item.id} className="p-5 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-[10px] font-bold text-indigo-500 uppercase tracking-wider">{item.nomor}</p>
                    <h3 className="font-bold text-slate-800 text-lg leading-tight mt-0.5">{item.kegiatan}</h3>
                  </div>
                  <StatusBadge status={item.status} />
                </div>
                <div className="grid grid-cols-2 gap-3 text-slate-500">
                  <div className="flex items-center gap-2 text-xs">
                    <Calendar size={14} /> {item.tanggal}
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <MapPin size={14} /> {item.lokasi}
                  </div>
                </div>
                <button className="w-full flex items-center justify-center gap-2 py-3 bg-indigo-50 text-indigo-600 rounded-2xl text-sm font-bold active:scale-[0.98] transition-transform">
                  <Printer size={18} /> Cetak Berita Acara
                </button>
              </div>
            ))}
          </div>

        </div>
      </main>
    </div>
  );
}
