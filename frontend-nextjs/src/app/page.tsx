'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { Search, PlusCircle, Printer, Calendar, MapPin, User, FileText, X } from 'lucide-react';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { BeritaAcara } from '@/types';
import { generateBeritaAcaraPDF } from '@/lib/pdf';

export default function BeritaAcaraPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState<BeritaAcara[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    nomor_ba: '',
    judul_kegiatan: '',
    tanggal_kegiatan: '',
    waktu_kegiatan: '',
    lokasi: '',
    pic_nama: ''
  });

  // Fetch Data dari API Laravel
  const fetchData = async (search = '') => {
    setIsLoading(true);
    try {
      const url = new URL('http://localhost:8000/api/berita-acara');
      if (search) url.searchParams.append('search', search);
      
      const res = await fetch(url.toString());
      const json = await res.json();
      setData(json.data);
    } catch (error) {
      console.error("Gagal mengambil data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchData(searchTerm);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Handle Form Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch('http://localhost:8000/api/berita-acara', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      if (res.ok) {
        setIsModalOpen(false);
        setFormData({ nomor_ba: '', judul_kegiatan: '', tanggal_kegiatan: '', waktu_kegiatan: '', lokasi: '', pic_nama: '' });
        fetchData(); // Refresh data
        alert('Berita Acara berhasil ditambahkan!');
      } else {
        const errorData = await res.json();
        alert('Gagal menyimpan: ' + (errorData.message || 'Cek kembali isian form'));
      }
    } catch (error) {
      console.error(error);
      alert('Terjadi kesalahan jaringan.');
    } finally {
      setIsSubmitting(false);
    }
  };

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
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors flex items-center gap-2"
          >
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
            placeholder="Cari berita acara dari Database..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Content Container */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden min-h-[400px] relative">
          
          {isLoading && (
            <div className="absolute inset-0 bg-white/50 backdrop-blur-sm z-10 flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            </div>
          )}

          {data.length === 0 && !isLoading ? (
            <div className="p-12 text-center text-slate-400">
              Tidak ada data ditemukan.
            </div>
          ) : (
            <>
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
                    {data.map(item => (
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
                          <button onClick={() => generateBeritaAcaraPDF(item)} className="p-2 text-slate-400 hover:text-indigo-600 transition-colors" title="Cetak PDF">
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
                {data.map(item => (
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
                    <button onClick={() => generateBeritaAcaraPDF(item)} className="w-full flex items-center justify-center gap-2 py-3 bg-indigo-50 text-indigo-600 rounded-2xl text-sm font-bold active:scale-[0.98] transition-transform">
                      <Printer size={18} /> Cetak Berita Acara
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </main>

      {/* MODAL TAMBAH DATA */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-xl">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="font-bold text-slate-800">Buat Berita Acara Baru</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 p-1">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Nomor Surat</label>
                  <input required type="text" className="w-full border border-slate-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500" placeholder="BA-2024-..." 
                    value={formData.nomor_ba} onChange={e => setFormData({...formData, nomor_ba: e.target.value})} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Nama PIC</label>
                  <input required type="text" className="w-full border border-slate-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Nama Penanggung Jawab"
                    value={formData.pic_nama} onChange={e => setFormData({...formData, pic_nama: e.target.value})} />
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Judul Kegiatan</label>
                <input required type="text" className="w-full border border-slate-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Contoh: Rapat Koordinasi Tahunan"
                  value={formData.judul_kegiatan} onChange={e => setFormData({...formData, judul_kegiatan: e.target.value})} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Tanggal</label>
                  <input required type="date" className="w-full border border-slate-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
                    value={formData.tanggal_kegiatan} onChange={e => setFormData({...formData, tanggal_kegiatan: e.target.value})} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Waktu</label>
                  <input required type="time" className="w-full border border-slate-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
                    value={formData.waktu_kegiatan} onChange={e => setFormData({...formData, waktu_kegiatan: e.target.value})} />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Lokasi</label>
                <input required type="text" className="w-full border border-slate-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Contoh: Ruang Rapat Lt. 2"
                  value={formData.lokasi} onChange={e => setFormData({...formData, lokasi: e.target.value})} />
              </div>

              <div className="pt-4 flex gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-2.5 rounded-xl font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors">
                  Batal
                </button>
                <button type="submit" disabled={isSubmitting} className="flex-1 py-2.5 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors disabled:opacity-50 flex justify-center items-center">
                  {isSubmitting ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : 'Simpan Data'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
