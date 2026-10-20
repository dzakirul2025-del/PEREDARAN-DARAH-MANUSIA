import React, { useEffect } from 'react';
import { StudentProfile } from '../types/game';
import { MADRASAH_INFO } from '../data/curriculumData';
import { Award, Printer, X, CheckCircle, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundManager } from '../utils/soundEffects';

interface CertificateViewProps {
  isOpen: boolean;
  onClose: () => void;
  profile: StudentProfile;
}

export const CertificateView: React.FC<CertificateViewProps> = ({
  isOpen,
  onClose,
  profile
}) => {
  useEffect(() => {
    if (isOpen) {
      soundManager.playLevelUp();
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const currentDate = new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="max-w-3xl w-full my-auto space-y-4">
        {/* Top Control Bar (Hidden on print) */}
        <div className="no-print flex items-center justify-between bg-slate-900 border border-slate-800 p-3.5 rounded-xl">
          <div className="flex items-center gap-2 text-xs text-slate-300">
            <Award className="w-4 h-4 text-amber-400" />
            <span className="font-semibold text-white">Sertifikat Kelulusan Detektif Sains Siap Dicetak</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <Printer className="w-3.5 h-3.5" />
              Cetak / Simpan PDF
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Certificate Frame */}
        <div
          id="certificate-print-area"
          className="bg-white text-slate-900 p-8 sm:p-12 rounded-2xl border-8 border-double border-amber-600 shadow-2xl relative overflow-hidden"
        >
          {/* Subtle Watermark BG */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none flex items-center justify-center">
            <svg className="w-96 h-96 text-rose-900" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </div>

          <div className="relative z-10 text-center space-y-4">
            {/* Header / Madrasah Identity */}
            <div className="border-b-2 border-slate-900 pb-3">
              <div className="text-xs font-bold uppercase tracking-widest text-slate-600">
                KEMENTERIAN AGAMA REPUBLIK INDONESIA
              </div>
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight uppercase">
                {MADRASAH_INFO.name}
              </h2>
              <div className="text-xs text-slate-600">
                {MADRASAH_INFO.location} · Terakreditasi · Kurikulum Merdeka
              </div>
            </div>

            {/* Certificate Title */}
            <div className="py-2">
              <div className="inline-block px-4 py-1 bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-widest rounded-full mb-1">
                Piagam Penghargaan Pembelajaran Mendalam
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-rose-700 tracking-tight">
                BIO-DETEKTIF SIRKULASI KEHIDUPAN
              </h1>
              <p className="text-xs text-slate-600 italic">
                Nomor: MIN.01.PASER/IPAS-C/2026/088
              </p>
            </div>

            <div className="text-xs text-slate-700">Diberikan dengan penuh bangga kepada:</div>

            {/* Student Name */}
            <div className="py-1">
              <div className="text-xl sm:text-2xl font-black text-slate-900 underline decoration-amber-500 underline-offset-8">
                {profile.name || 'Detektif Siswa Teladan'}
              </div>
              <div className="text-xs font-mono text-slate-600 mt-2">
                NISN: {profile.studentId || '0128392001'} · Kelas VI (Fase C) MIN 1 Paser
              </div>
            </div>

            {/* Statement of Mastery */}
            <p className="text-xs sm:text-sm text-slate-700 max-w-xl mx-auto leading-relaxed">
              Telah menunjukkan ketangkasan berpikir tingkat tinggi (HOTS), ketelitian sains, dan kegigihan luar biasa dalam menuntaskan seluruh <strong>7 Level Misi Eksplorasi Sistem Peredaran Darah Manusia</strong>, membedah 4 ruang jantung, memetakan rute sirkulasi ganda, serta menyelamatkan pasien dari sumbatan plak koroner.
            </p>

            {/* Competency Mastery List */}
            <div className="grid grid-cols-2 gap-2 text-left text-[11px] bg-slate-50 border border-slate-200 p-3 rounded-xl max-w-lg mx-auto">
              <div className="flex items-center gap-1.5 text-slate-700">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Anatomi 4 Ruang Jantung & Pembuluh</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-700">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Rute Sirkulasi Darah Besar & Kecil</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-700">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Diferensiasi 4 Komponen Sel Darah</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-700">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Penanganan Plak & Gaya Hidup Sehat</span>
              </div>
            </div>

            {/* Achievement Badges & XP */}
            <div className="flex items-center justify-center gap-6 pt-2 text-xs font-mono">
              <div>
                <span className="text-slate-500">Total Pengalaman: </span>
                <span className="font-bold text-amber-600">{profile.xp} XP</span>
              </div>
              <div>
                <span className="text-slate-500">Lencana Diraih: </span>
                <span className="font-bold text-slate-800">{profile.badges.length} Badge</span>
              </div>
            </div>

            {/* Signature Block */}
            <div className="pt-6 grid grid-cols-2 gap-8 text-xs text-slate-700">
              <div className="text-left pl-6">
                <div className="text-slate-500">Mengetahui,</div>
                <div className="font-bold text-slate-900 mt-1">Guru Pengampu IPAS Fase C</div>
                <div className="h-12 flex items-end">
                  <div className="w-32 border-b border-slate-800" />
                </div>
                <div className="font-semibold text-slate-800 mt-1">Ustadz/Ustadzah MIN 1 Paser</div>
                <div className="text-[10px] text-slate-500">NIP. 198507152010011002</div>
              </div>

              <div className="text-right pr-6">
                <div className="text-slate-500">Tanah Grogot, {currentDate}</div>
                <div className="font-bold text-slate-900 mt-1">Kepala Madrasah MIN 1 Paser</div>
                <div className="h-12 flex items-end justify-end">
                  <div className="w-32 border-b border-slate-800" />
                </div>
                <div className="font-semibold text-slate-800 mt-1">Drs. H. Ahmad Fauzi, M.Pd.</div>
                <div className="text-[10px] text-slate-500">NIP. 197403201999031001</div>
              </div>
            </div>

            {/* Seal / Emblem */}
            <div className="flex items-center justify-center gap-1.5 text-[10px] text-amber-700 font-semibold pt-2">
              <ShieldCheck className="w-4 h-4 text-amber-600" />
              <span>Dokumen Resmi Pembelajaran Interaktif Kurikulum Merdeka · MIN 1 Paser</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
