import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { BeritaAcara } from '@/types';

export function generateBeritaAcaraPDF(item: BeritaAcara) {
  const doc = new jsPDF();

  // Branding
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor(79, 70, 229);
  doc.text("BERITA ACARA DIGITAL", 105, 25, { align: "center" });
  
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text("Sistem Manajemen Laporan Kantor Otomatis", 105, 32, { align: "center" });
  
  doc.setDrawColor(230, 230, 230);
  doc.line(20, 40, 190, 40);

  // Content
  doc.setFontSize(12);
  doc.setTextColor(40, 40, 40);
  doc.text(`ID Laporan: ${item.nomor}`, 20, 55);
  doc.text(`Tanggal Kegiatan: ${item.tanggal}`, 20, 62);
  
  const tableData = [
    ['Nama Kegiatan', item.kegiatan],
    ['Lokasi Pelaksanaan', item.lokasi],
    ['Waktu Pelaksanaan', item.waktu + " WIB"],
    ['Penanggung Jawab', item.pic],
    ['Status Akhir', item.label_status]
  ];

  autoTable(doc, {
    startY: 75,
    head: [['DETAIL KEGIATAN', 'KETERANGAN']],
    body: tableData,
    theme: 'grid',
    headStyles: { fillColor: [79, 70, 229], fontStyle: 'bold' },
    styles: { cellPadding: 5, fontSize: 11 }
  });

  doc.save(`BA_${item.nomor}.pdf`);
}
