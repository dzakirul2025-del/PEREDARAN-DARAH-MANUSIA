import React, { useState } from 'react';
import { FileSearch, ArrowRight, CheckCircle2, AlertTriangle, HelpCircle, ShieldAlert, Sparkles } from 'lucide-react';
import { soundManager } from '../../utils/soundEffects';

interface Level5Props {
  onComplete: (xpEarned: number, stars: number) => void;
  onOpenHint: (t1: string, t2: string) => void;
}

interface CaseFile {
  id: number;
  codeName: string;
  patientBio: string;
  symptoms: string[];
  redHerrings: string[];
  correctDisease: string;
  diseaseOptions: string[];
  scientificReason: string;
}

const CASE_FILES: CaseFile[] = [
  {
    id: 1,
    codeName: 'BERKAS A: Kasus &ldquo;Muka Pucat & Cepat Lelah&rdquo;',
    patientBio: 'Siswa kelas 6 (11 tahun), sering mengantuk di kelas meskipun tidur cukup.',
    symptoms: [
      'Kadar Hemoglobin darah sangat rendah (8,5 g/dL, normal 12-16 g/dL)',
      'Kelopak mata bawah tampak pucat keputihan',
      'Sering pusing berkunang-kunang saat berdiri mendadak'
    ],
    redHerrings: [
      'Suka bermain game petualangan di ponsel selama 15 menit',
      'Kemarin tersandung batu di halaman sekolah'
    ],
    correctDisease: 'Anemia',
    diseaseOptions: ['Anemia', 'Hipertensi', 'Varises', 'Hemofilia'],
    scientificReason: 'Penurunan drastis hemoglobin menyebabkan kapasitas pengangkutan oksigen ke otak anjlok, menimbulkan rasa lesu dan pucat.'
  },
  {
    id: 2,
    codeName: 'BERKAS B: Kasus &ldquo;Nyeri Dada Kiri Menjalar Pasien X&rdquo;',
    patientBio: 'Atlet Pasien X, suka konsumsi gorengan tinggi lemak jenuh sebelum bertanding.',
    symptoms: [
      'Penyempitan lumen pembuluh arteri koroner akibat endapan plak kolesterol (aterosklerosis)',
      'Nyeri dada tajam sebelah kiri menjalar ke bahu kiri saat aktivitas fisik',
      'Otot jantung kekurangan pasokan darah dan oksigen (iskemia)'
    ],
    redHerrings: [
      'Baru saja membeli sepatu lari warna merah',
      'Minum air es setelah sarapan pagi'
    ],
    correctDisease: 'Penyakit Jantung Koroner',
    diseaseOptions: ['Penyakit Jantung Koroner', 'Hipotensi', 'Leukemia', 'Varises'],
    scientificReason: 'Arteri koroner yang memasok oksigen ke otot jantung tersumbat timbunan plak lemak kolesterol jahat (aterosklerosis).'
  },
  {
    id: 3,
    codeName: 'BERKAS C: Kasus &ldquo;Tensi Melambung Tinggi&rdquo;',
    patientBio: 'Pria dewasa (42 tahun), sering makan makanan asin berpengawet dan jarang olahraga.',
    symptoms: [
      'Pengukuran tensimeter digital menunjukkan 165/100 mmHg secara konsisten',
      'Tengkuk leher belakang terasa kaku dan berat',
      'Pembuluh darah arteri berada dalam tegangan tinggi berlebih'
    ],
    redHerrings: [
      'Telinganya sering mendengarkan lagu daerah Paser',
      'Kucing peliharaannya baru melahirkan'
    ],
    correctDisease: 'Hipertensi',
    diseaseOptions: ['Hipertensi (Darah Tinggi)', 'Hipotensi (Darah Rendah)', 'Anemia', 'Varises'],
    scientificReason: 'Tekanan darah di atas 140/90 mmHg disebut Hipertensi, memaksa jantung bekerja ekstra keras dan berisiko merusak pembuluh darah halus.'
  },
  {
    id: 4,
    codeName: 'BERKAS D: Kasus &ldquo;Urat Betis Menonjol Berkelok&rdquo;',
    patientBio: 'Guru madrasah (48 tahun) yang sering berdiri berjam-jam saat mengajar.',
    symptoms: [
      'Pembuluh balik (vena) di betis kaki membesar, berkelok, dan berwarna kebiruan',
      'Katup pembuluh vena di tungkai melemah sehingga darah mengendap di bawah gravitasi',
      'Kaki terasa pegal dan berat setelah seharian berdiri'
    ],
    redHerrings: [
      'Memakai kaos kaki warna hitam',
      'Gemar minum teh manis hangat'
    ],
    correctDisease: 'Varises',
    diseaseOptions: ['Varises', 'Leukemia', 'Stroke', 'Anemia'],
    scientificReason: 'Varises terjadi akibat kerusakan katup satu arah pada pembuluh vena kaki, menyebabkan aliran darah terhambat dan menumpuk di pembuluh balik.'
  }
];

export const Level5MedicalDetective: React.FC<Level5Props> = ({ onComplete, onOpenHint }) => {
  const [selectedCaseIdx, setSelectedCaseIdx] = useState(0);
  const [diagnoses, setDiagnoses] = useState<Record<number, string>>({});
  const [examinedRedHerrings, setExaminedRedHerrings] = useState<Record<number, boolean>>({});

  const currentCase = CASE_FILES[selectedCaseIdx];

  const handleDiagnose = (caseId: number, disease: string) => {
    soundManager.playClick();
    setDiagnoses(prev => ({ ...prev, [caseId]: disease }));

    const targetCase = CASE_FILES.find(c => c.id === caseId);
    if (targetCase && (disease === targetCase.correctDisease || disease.startsWith(targetCase.correctDisease))) {
      soundManager.playSuccess();
    } else {
      soundManager.playError();
    }
  };

  const isCaseDiagnosedCorrectly = (caseId: number) => {
    const userChoice = diagnoses[caseId];
    const targetCase = CASE_FILES.find(c => c.id === caseId);
    return targetCase && userChoice && (userChoice === targetCase.correctDisease || userChoice.startsWith(targetCase.correctDisease));
  };

  const allCasesCorrect = CASE_FILES.every(c => isCaseDiagnosedCorrectly(c.id));

  const openHint = () => {
    onOpenHint(
      'Perhatikan gejala medis inti (kadar hemoglobin, pembacaan tensi, plak lemak di arteri, katup vena di kaki). Abaikan informasi sepele seperti sepatu merah atau main game.',
      'Anemia ditandai Hb rendah & muka pucat. Jantung Koroner ditandai nyeri dada akibat plak kolesterol arteri koroner. Hipertensi ditandai tensi >140/90. Varises ditandai pembuluh vena di kaki menonjol.'
    );
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 md:p-6 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-rose-400 font-bold text-xs uppercase tracking-wider">
            <FileSearch className="w-4 h-4 text-rose-500" />
            Investigasi Kasus Medis · The Hidden Truth
          </div>
          <button
            onClick={openHint}
            className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            Butuh Petunjuk?
          </button>
        </div>

        <h2 className="text-xl md:text-2xl font-extrabold text-white tracking-tight">
          Level 5: The Hidden Truth · Investigasi Detektif Rekam Medis
        </h2>
        <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
          Sebagai detektif medis, tugasmu adalah memilah bukti asli dan menyingkirkan <em>red herring</em> (petunjuk palsu/pengalih perhatian). Teliti 4 rekam medis di bawah ini untuk menentukan diagnosis ilmiah yang tepat!
        </p>
      </div>

      {/* Case Navigation Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {CASE_FILES.map((c, idx) => {
          const isSolved = isCaseDiagnosedCorrectly(c.id);
          const isSelected = selectedCaseIdx === idx;

          return (
            <button
              key={c.id}
              onClick={() => {
                soundManager.playClick();
                setSelectedCaseIdx(idx);
              }}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                isSelected
                  ? 'bg-rose-950 border-rose-500 shadow-md text-white'
                  : isSolved
                  ? 'bg-slate-900 border-emerald-500/50 text-slate-200'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <div className="flex items-center justify-between text-xs font-mono mb-1">
                <span>Berkas {String.fromCharCode(65 + idx)}</span>
                {isSolved ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <span className="text-slate-600">Investigasi</span>
                )}
              </div>
              <div className="text-xs font-bold truncate">
                {c.correctDisease}
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Case Dossier */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 md:p-6 space-y-6">
        <div className="border-b border-slate-800 pb-3 flex flex-wrap items-center justify-between gap-2">
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">
              {currentCase.codeName}
            </h3>
            <p className="text-xs text-slate-400">
              Profil Pasien: {currentCase.patientBio}
            </p>
          </div>
          <span className="text-xs font-mono text-cyan-400 bg-cyan-950/60 px-2.5 py-1 rounded border border-cyan-800">
            DOKUMEN RAHASIA MIN 1 PASER
          </span>
        </div>

        {/* Symptoms vs Red Herrings Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Authentic Clinical Symptoms */}
          <div className="p-4 rounded-xl bg-slate-950 border border-emerald-900/40 space-y-3">
            <div className="text-xs font-bold text-emerald-400 flex items-center gap-1.5 uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4" />
              Bukti Medis Autentik (Gejala Kunci)
            </div>
            <ul className="space-y-2 text-xs text-slate-300">
              {currentCase.symptoms.map((sym, idx) => (
                <li key={idx} className="flex items-start gap-2 bg-slate-900/60 p-2 rounded-lg border border-slate-800">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span>{sym}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Red Herrings / Distractions */}
          <div className="p-4 rounded-xl bg-slate-950 border border-amber-900/40 space-y-3">
            <div className="text-xs font-bold text-amber-400 flex items-center gap-1.5 uppercase tracking-wider">
              <AlertTriangle className="w-4 h-4" />
              Bukti Pengalih (Abaikan Fakta Ini!)
            </div>
            <ul className="space-y-2 text-xs text-slate-400">
              {currentCase.redHerrings.map((rh, idx) => (
                <li key={idx} className="flex items-start gap-2 bg-slate-900/40 p-2 rounded-lg border border-slate-800/60 line-through decoration-rose-500/60">
                  <span className="text-amber-500 font-bold">✕</span>
                  <span>{rh}</span>
                </li>
              ))}
            </ul>
            <div className="text-[11px] text-slate-500 italic">
              *Detektif cilik tidak boleh terkecoh oleh fakta sehari-hari yang tidak ada hubungannya dengan organ peredaran darah!
            </div>
          </div>
        </div>

        {/* Diagnostic Decision Arena */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
          <div className="text-xs font-bold text-white">
            Kesimpulan Diagnosis Medis untuk {currentCase.codeName}:
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {currentCase.diseaseOptions.map((disease, optIdx) => {
              const isSelected = diagnoses[currentCase.id] === disease;
              const isCorrectOption = disease === currentCase.correctDisease || disease.startsWith(currentCase.correctDisease);

              return (
                <button
                  key={disease}
                  onClick={() => handleDiagnose(currentCase.id, disease)}
                  className={`p-3 rounded-xl border text-xs font-semibold text-center transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    isSelected
                      ? isCorrectOption
                        ? 'bg-emerald-950 border-emerald-500 text-emerald-200'
                        : 'bg-rose-950 border-rose-500 text-rose-200'
                      : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <span className="font-mono text-slate-400 font-bold">{String.fromCharCode(65 + optIdx)}.</span>
                  <span>{disease}</span>
                </button>
              );
            })}
          </div>

          {/* Feedback Explanation */}
          {diagnoses[currentCase.id] && (
            <div className={`p-3 rounded-lg text-xs leading-relaxed ${
              isCaseDiagnosedCorrectly(currentCase.id)
                ? 'bg-emerald-950/40 border border-emerald-800/80 text-emerald-200'
                : 'bg-rose-950/40 border border-rose-800/80 text-rose-300'
            }`}>
              <strong>{isCaseDiagnosedCorrectly(currentCase.id) ? 'Diagnosis Akurat! ' : 'Diagnosis Keliru! '}</strong>
              {currentCase.scientificReason}
            </div>
          )}
        </div>
      </div>

      {/* Completion Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex items-center justify-between gap-4">
        <div className="text-xs text-slate-400">
          {allCasesCorrect ? (
            <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" /> Seluruh 4 rekam medis terpecahkan! Pasien X memerlukan operasi darurat Boss Battle!
            </span>
          ) : (
            <span>
              Selesaikan diagnosis pada ke-4 berkas (A, B, C, D) untuk melanjutkan ke Boss Battle.
            </span>
          )}
        </div>

        <button
          disabled={!allCasesCorrect}
          onClick={() => {
            soundManager.playSuccess();
            onComplete(350, 3);
          }}
          className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
            allCasesCorrect
              ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-950/40'
              : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
          }`}
        >
          <span>Masuk ke Boss Battle (Level 6)</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
