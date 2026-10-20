import React, { useState } from 'react';
import { GLOSSARY_ITEMS } from '../data/curriculumData';
import { BookOpen, X, Search } from 'lucide-react';

interface GlossaryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GlossaryModal: React.FC<GlossaryModalProps> = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const filtered = GLOSSARY_ITEMS.filter(
    item =>
      item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.meaning.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-5 max-h-[85vh] flex flex-col">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-cyan-950 text-cyan-400 border border-cyan-800 flex items-center justify-center">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">
                Kamus Istilah Sirkulasi Darah
              </h3>
              <p className="text-xs text-slate-400">
                Glosarium konsep IPAS Fase C Kelas VI MIN 1 Paser
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative shrink-0">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari istilah biologis (misal: Arteri, Katup, Bilik, Hipertensi)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
        </div>

        {/* Glossary Items List */}
        <div className="space-y-3 overflow-y-auto pr-1 flex-1">
          {filtered.length === 0 ? (
            <div className="text-center py-8 text-xs text-slate-500">
              Tidak ada istilah yang cocok dengan &ldquo;{searchTerm}&rdquo;
            </div>
          ) : (
            filtered.map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 hover:border-cyan-900/50 transition-colors"
              >
                <div className="text-xs font-bold text-cyan-400 mb-1">
                  {item.term}
                </div>
                <div className="text-xs text-slate-300 leading-relaxed">
                  {item.meaning}
                </div>
              </div>
            ))
          )}
        </div>

        <div className="pt-2 border-t border-slate-800 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
          >
            Tutup Glosarium
          </button>
        </div>
      </div>
    </div>
  );
};
