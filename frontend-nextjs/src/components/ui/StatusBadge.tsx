import React from 'react';

interface BadgeProps {
  status: 'draft' | 'review' | 'selesai';
}

/**
 * StatusBadge - Komponen kecil yang reusable untuk konsistensi warna status.
 * Menghindari hard-coding warna di banyak tempat.
 */
export const StatusBadge: React.FC<BadgeProps> = ({ status }) => {
  const styles = {
    selesai: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    review: 'bg-amber-50 text-amber-600 border-amber-100',
    draft: 'bg-slate-50 text-slate-600 border-slate-100',
  };

  return (
    <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border ${styles[status]}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};
