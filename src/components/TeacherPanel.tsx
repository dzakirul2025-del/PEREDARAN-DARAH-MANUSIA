import React, { useState } from 'react';
import { INITIAL_STUDENTS } from '../data/classStudents';
import { MADRASAH_INFO } from '../data/curriculumData';
import { 
  Shield, 
  X, 
  Unlock, 
  RotateCcw, 
  Clock, 
  Users, 
  CheckCircle2, 
  AlertTriangle, 
  FileSpreadsheet,
  GraduationCap,
  Eye,
  EyeOff
} from 'lucide-react';
import { soundManager } from '../utils/soundEffects';

interface TeacherPanelProps {
  isOpen: boolean;
  onClose: () => void;
  timeAttackDuration: number;
  onUpdateTimeAttack: (seconds: number) => void;
  onUnlockAllLevels: () => void;
  onResetStudentProgress: () => void;
  completedLevelsCount: number;
}

export const TeacherPanel: React.FC<TeacherPanelProps> = ({
  isOpen,
  onClose,
  timeAttackDuration,
  onUpdateTimeAttack,
  onUnlockAllLevels,
  onResetStudentProgress,
  completedLevelsCount
}) => {
  const [passcode, setPasscode] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [activeTab, setActiveTab] = useState<'control' | 'students' | 'modul' | 'rubric'>('control');
  const [authError, setAuthError] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  if (!isOpen) return null;

  const handleVerifyPasscode = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode.trim() === 'Diandra_2011') {
      setIsUnlocked(true);
      setAuthError(false);
      soundManager.playSuccess();
    } else {
      setAuthError(true);
      soundManager.playError();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-4xl w-full p-6 shadow-2xl space-y-6 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-rose-950 text-rose-400 border border-rose-800 flex items-center justify-center">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-tight">
                Portal Guru & Analisis Pembelajaran · {MADRASAH_INFO.name}
              </h2>
              <p className="text-xs text-slate-400">
                Kontrol Kelas IPAS Fase C · {MADRASAH_INFO.grade} ({MADRASAH_INFO.studentCount} Siswa)
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

        {/* Auth Barrier */}
        {!isUnlocked ? (
          <form onSubmit={handleVerifyPasscode} className="py-8 max-w-md mx-auto w-full space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-slate-800 border border-slate-700 mx-auto flex items-center justify-center text-rose-400">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Verifikasi Akses Guru</h3>
              <p className="text-xs text-slate-400 mt-1">
                Akses terbatas. Masukkan kata sandi otorisasi guru untuk membuka instrumen dan rekap kelas.
              </p>
            </div>

            <div className="space-y-2">
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Masukkan kata sandi guru..."
                  value={passcode}
                  onChange={(e) => {
                    setPasscode(e.target.value);
                    setAuthError(false);
                  }}
                  autoFocus
                  className="w-full text-center tracking-wider text-sm bg-slate-950 border border-slate-700 rounded-xl px-10 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-rose-500 font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                  title={showPassword ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {authError && (
                <div className="text-xs text-rose-400 flex items-center justify-center gap-1 font-medium">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  Kata sandi tidak valid! Akses hanya untuk guru MIN 1 Paser.
                </div>
              )}
            </div>

            <div className="pt-2 flex justify-center">
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-2.5 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer shadow-md shadow-rose-950/40"
              >
                Verifikasi & Buka Portal Guru
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-5 overflow-y-auto pr-1 flex-1">
            {/* Navigation Tabs */}
            <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
              <button
                onClick={() => setActiveTab('control')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  activeTab === 'control'
                    ? 'bg-rose-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                Kontrol Permainan & Diferensiasi
              </button>
              <button
                onClick={() => setActiveTab('students')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'students'
                    ? 'bg-rose-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                Data 27 Siswa MIN 1 Paser
              </button>
              <button
                onClick={() => setActiveTab('modul')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  activeTab === 'modul'
                    ? 'bg-rose-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                Modul Ajar 3x30 Menit
              </button>
              <button
                onClick={() => setActiveTab('rubric')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  activeTab === 'rubric'
                    ? 'bg-rose-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                Rubrik Formatif & HOTS
              </button>
            </div>

            {/* Tab 1: Controls */}
            {activeTab === 'control' && (
              <div className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Unlock Levels Action */}
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                    <div className="flex items-center gap-2 text-white font-bold text-sm">
                      <Unlock className="w-4 h-4 text-emerald-400" />
                      Akses Seluruh Level Seketika
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Gunakan fitur ini saat bapak/ibu guru ingin mempresentasikan materi level tertentu di proyektor kelas tanpa harus menyelesaikan level awal secara manual.
                    </p>
                    <button
                      onClick={() => {
                        onUnlockAllLevels();
                        soundManager.playSuccess();
                      }}
                      className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Unlock className="w-3.5 h-3.5" />
                      Buka Semua 7 Level Sekarang
                    </button>
                  </div>

                  {/* Reset Progress Action */}
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                    <div className="flex items-center gap-2 text-white font-bold text-sm">
                      <RotateCcw className="w-4 h-4 text-rose-400" />
                      Reset Progres Siswa Ini
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Mereset XP, lencana, dan riwayat jawaban agar siswa dapat memulai petualangan sains dari Level 1 dengan data bersih.
                    </p>
                    <button
                      onClick={() => {
                        if (window.confirm('Yakin ingin mereset progres siswa ini ke Level 1?')) {
                          onResetStudentProgress();
                          soundManager.playClick();
                        }
                      }}
                      className="w-full py-2 bg-slate-800 hover:bg-rose-950 hover:text-rose-300 text-slate-300 font-semibold text-xs rounded-lg border border-slate-700 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      Reset Progres ke Awal
                    </button>
                  </div>
                </div>

                {/* Time Attack Timer Duration Setting */}
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-white font-bold text-sm">
                      <Clock className="w-4 h-4 text-amber-400" />
                      Pengaturan Batas Waktu Level 4 (Time Attack)
                    </div>
                    <span className="text-xs font-mono text-amber-400">
                      Aktif: {timeAttackDuration === 0 ? 'Tanpa Batas Waktu' : `${timeAttackDuration} Detik`}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Diferensiasi waktu untuk mengakomodasi kecepatan belajar siswa. Waktu bertujuan meningkatkan konsentrasi, bukan mempermalukan siswa.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {[30, 45, 60, 90, 0].map((sec) => (
                      <button
                        key={sec}
                        onClick={() => {
                          onUpdateTimeAttack(sec);
                          soundManager.playClick();
                        }}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                          timeAttackDuration === sec
                            ? 'bg-amber-500 text-slate-950 font-bold'
                            : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                        }`}
                      >
                        {sec === 0 ? 'Bebas Waktu (Santai)' : `${sec} Detik`}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Diagnostic Misconception Alerts */}
                <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-900/40 space-y-2">
                  <div className="flex items-center gap-2 text-rose-300 font-bold text-xs">
                    <AlertTriangle className="w-4 h-4 text-rose-400" />
                    Peringatan Miskonsepsi Umum Siswa Kelas VI (Catatan Guru):
                  </div>
                  <ul className="text-xs text-slate-300 space-y-1.5 list-disc pl-5 leading-relaxed">
                    <li>
                      <strong>Miskonsepsi Arteri:</strong> Siswa sering menghafal &ldquo;semua arteri mengangkut oksigen&rdquo;. Guru perlu menegaskan bahwa <em>arteri pulmonalis</em> adalah pengecualian karena membawa darah kotor kaya $CO_2$ dari bilik kanan ke paru-paru.
                    </li>
                    <li>
                      <strong>Ketebalan Bilik Kiri:</strong> Siswa sering lupa mengapa bilik kiri lebih tebal dari bilik kanan. Alasan fisik: bilik kiri memompa darah melawan gravitasi ke seluruh tubuh (tekanan tinggi), sedangkan bilik kanan hanya ke paru-paru (jarak dekat).
                    </li>
                    <li>
                      <strong>Fungsi Trombosit:</strong> Jangan tertukar antara trombosit (pembeku luka) dan leukosit (membunuh kuman patogen).
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {/* Tab 2: Students Data Table */}
            {activeTab === 'students' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-white">Rekapitulasi 27 Siswa Kelas VI MIN 1 Paser</h3>
                    <p className="text-xs text-slate-400">Pantau capaian individual, skor XP, serta kebutuhan tindak lanjut</p>
                  </div>
                  <div className="text-xs font-mono text-slate-400">
                    Siswa Aktif Saat Ini: <span className="text-emerald-400 font-bold">{completedLevelsCount}/7 Level Selesai</span>
                  </div>
                </div>

                <div className="overflow-x-auto rounded-xl border border-slate-800">
                  <table className="w-full text-left text-xs text-slate-300">
                    <thead className="bg-slate-950 text-slate-400 font-semibold border-b border-slate-800">
                      <tr>
                        <th className="py-2.5 px-3">No</th>
                        <th className="py-2.5 px-3">Nama Siswa</th>
                        <th className="py-2.5 px-3">NISN</th>
                        <th className="py-2.5 px-3">Level Tuntas</th>
                        <th className="py-2.5 px-3 text-right">Skor XP</th>
                        <th className="py-2.5 px-3">Status</th>
                        <th className="py-2.5 px-3">Catatan Observasi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800 bg-slate-900/60 font-mono">
                      {INITIAL_STUDENTS.map((st) => (
                        <tr key={st.id} className="hover:bg-slate-800/40 transition-colors">
                          <td className="py-2 px-3 text-slate-400">{st.noAbsen}</td>
                          <td className="py-2 px-3 font-sans font-medium text-white">{st.nama}</td>
                          <td className="py-2 px-3 text-slate-400">{st.nisn}</td>
                          <td className="py-2 px-3 text-slate-200">{st.completedLevelsCount} / 7</td>
                          <td className="py-2 px-3 text-right text-amber-400 font-bold tabular-nums">{st.xp}</td>
                          <td className="py-2 px-3 font-sans">
                            {st.status === 'Misi Selesai' ? (
                              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                                <CheckCircle2 className="w-3.5 h-3.5" /> Selesai
                              </span>
                            ) : st.needRemediation ? (
                              <span className="text-amber-400 font-semibold flex items-center gap-1">
                                <AlertTriangle className="w-3.5 h-3.5" /> Remedial
                              </span>
                            ) : (
                              <span className="text-cyan-400">Sedang Belajar</span>
                            )}
                          </td>
                          <td className="py-2 px-3 font-sans text-slate-300 text-[11px] max-w-xs truncate">
                            {st.notes}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Tab 3: Modul Ajar IPAS */}
            {activeTab === 'modul' && (
              <div className="space-y-4 text-xs text-slate-300 leading-relaxed">
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <h4 className="font-bold text-white text-sm">Rencana Pelaksanaan Pembelajaran (RPP / Modul Ajar)</h4>
                  <div className="text-slate-400">
                    Madrasah: MIN 1 Paser · Mapel: IPAS · Fase C / Kelas VI · Alokasi: 3 x 30 Menit (90 Menit)
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                    <span className="text-rose-400 font-bold block">Pertemuan 1 (30 Menit)</span>
                    <strong className="text-white block">Eksplorasi Anatomi & Sinyal Misteri</strong>
                    <p className="text-slate-400">
                      Siswa memainkan Level 1 (Unknown Signal) dan Level 2 (Anatomi Jantung & Pembuluh). Mengamati detak denyut nadi sendiri dan menyusun 4 ruang jantung.
                    </p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                    <span className="text-amber-400 font-bold block">Pertemuan 2 (30 Menit)</span>
                    <strong className="text-white block">Rute Sirkulasi & Sel Darah</strong>
                    <p className="text-slate-400">
                      Siswa memainkan Level 3 (Brain Breaker Rute Sirkulasi) dan Level 4 (Time Attack Hematologi). Membedakan sirkulasi darah besar vs kecil dan 4 sel darah.
                    </p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                    <span className="text-emerald-400 font-bold block">Pertemuan 3 (30 Menit)</span>
                    <strong className="text-white block">Investigasi Penyakit & Boss Battle</strong>
                    <p className="text-slate-400">
                      Siswa memainkan Level 5 (Detektif Rekam Medis), Level 6 (Boss Battle Penyelamatan), dan Level 7 (Formula Rahasia Jantung Sehat + Sertifikat).
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 4: Rubrik Formatif */}
            {activeTab === 'rubric' && (
              <div className="space-y-4 text-xs">
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <h4 className="font-bold text-white text-sm">Rubrik Penilaian Asesmen Formatif & HOTS</h4>
                  <p className="text-slate-400">
                    Kriteria penilaian autentik mencakup pemahaman konsep, penalaran sebab-akibat, dan komitmen kesehatan.
                  </p>
                </div>

                <div className="overflow-x-auto rounded-xl border border-slate-800">
                  <table className="w-full text-left text-xs text-slate-300">
                    <thead className="bg-slate-950 text-slate-400 font-semibold border-b border-slate-800">
                      <tr>
                        <th className="py-2 px-3">Aspek Penilaian</th>
                        <th className="py-2 px-3">Perlu Bimbingan (1)</th>
                        <th className="py-2 px-3">Cukup (2)</th>
                        <th className="py-2 px-3">Baik (3)</th>
                        <th className="py-2 px-3">Sangat Mahir (4)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800 bg-slate-900/50">
                      <tr>
                        <td className="py-2 px-3 font-semibold text-white">Anatomi Jantung & Pembuluh</td>
                        <td className="py-2 px-3 text-slate-400">&lt; 2 ruang teridentifikasi benar</td>
                        <td className="py-2 px-3 text-slate-300">Mampu sebut 4 ruang namun tertukar sifat arteri/vena</td>
                        <td className="py-2 px-3 text-slate-200">Mampu pasang 4 ruang dan katup dengan benar</td>
                        <td className="py-2 px-3 text-emerald-400">Mampu jelaskan alasan fungsional ketebalan dinding bilik</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-semibold text-white">Alur Sirkulasi Darah Ganda</td>
                        <td className="py-2 px-3 text-slate-400">Alur terbalik antara paru-paru dan tubuh</td>
                        <td className="py-2 px-3 text-slate-300">Paham rute tetapi tertukar kandungan $O_2$ vs $CO_2$</td>
                        <td className="py-2 px-3 text-slate-200">Menyambung rute besar dan kecil dengan tepat</td>
                        <td className="py-2 px-3 text-emerald-400">Menganalisis dampak jika terjadi kebocoran katup jantung</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-semibold text-white">Penalaran Kasus Penyakit (HOTS)</td>
                        <td className="py-2 px-3 text-slate-400">Hanya menebak nama penyakit tanpa bukti</td>
                        <td className="py-2 px-3 text-slate-300">Mendiagnosis 2 dari 4 penyakit dengan tepat</td>
                        <td className="py-2 px-3 text-slate-200">Mendiagnosis seluruh penyakit dan membuang red herring</td>
                        <td className="py-2 px-3 text-emerald-400">Mampu merumuskan tindakan preventif berbasis sains</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        <div className="pt-2 border-t border-slate-800 flex justify-between items-center shrink-0">
          <span className="text-[11px] text-slate-500">
            MIN 1 Paser · Sistem Evaluasi Asesmen IPAS Kurikulum Merdeka
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
          >
            Tutup Portal Guru
          </button>
        </div>
      </div>
    </div>
  );
};
