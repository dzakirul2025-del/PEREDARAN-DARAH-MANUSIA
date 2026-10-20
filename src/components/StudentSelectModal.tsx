import React, { useState } from 'react';
import { INITIAL_STUDENTS } from '../data/classStudents';
import { MADRASAH_INFO } from '../data/curriculumData';
import { Search, X, User, Check } from 'lucide-react';

interface StudentSelectModalProps {
  currentStudentName: string;
  onClose: () => void;
  onSelectStudent: (name: string, nisn: string) => void;
}

export const StudentSelectModal: React.FC<StudentSelectModalProps> = ({
  currentStudentName,
  onClose,
  onSelectStudent
}) => {
  const [search, setSearch] = useState('');

  const filtered = INITIAL_STUDENTS.filter(st =>
    st.nama.toLowerCase().includes(search.toLowerCase()) ||
    String(st.noAbsen) === search.trim() ||
    st.nisn.includes(search.trim())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 max-h-[85vh] flex flex-col">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-cyan-950 text-cyan-400 border border-cyan-800 flex items-center justify-center">
              <User className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">
                Daftar 27 Siswa · {MADRASAH_INFO.name}
              </h3>
              <p className="text-xs text-slate-400">
                Kelas VI (Fase C) · Pilih namamu untuk memulai misi
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
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari nama atau nomor absen..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
        </div>

        {/* Student list */}
        <div className="overflow-y-auto space-y-1.5 flex-1 pr-1">
          {filtered.length === 0 ? (
            <div className="text-center py-6 text-xs text-slate-500">
              Tidak ditemukan nama &ldquo;{search}&rdquo;
            </div>
          ) : (
            filtered.map((st) => {
              const isSelected = currentStudentName.toLowerCase() === st.nama.toLowerCase();

              return (
                <button
                  key={st.id}
                  onClick={() => onSelectStudent(st.nama, st.nisn)}
                  className={`w-full p-2.5 rounded-xl text-left text-xs transition-colors cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'bg-rose-950 border border-rose-500 text-white font-bold ring-1 ring-rose-500/30'
                      : 'bg-slate-950 border border-slate-800/80 text-slate-300 hover:bg-slate-800/80 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono text-slate-500 w-6 text-right">{st.noAbsen}.</span>
                    <span className="tracking-tight">{st.nama}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-slate-500">NISN: {st.nisn}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-rose-400" />}
                  </div>
                </button>
              );
            })
          )}
        </div>

        <div className="pt-2 border-t border-slate-800 flex justify-between items-center">
          <span className="text-[11px] text-slate-500">
            Total {INITIAL_STUDENTS.length} Siswa Terdaftar
          </span>
          <button
            onClick={onClose}
            className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
