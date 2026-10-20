import React, { useState, useEffect } from 'react';
import { Timer, ArrowRight, CheckCircle2, RefreshCw, HelpCircle, Zap, ShieldAlert, Award } from 'lucide-react';
import { soundManager } from '../../utils/soundEffects';

interface Level4Props {
  onComplete: (xpEarned: number, stars: number) => void;
  onOpenHint: (t1: string, t2: string) => void;
  timerDurationSeconds: number; // 0 for unlimited, or 30/60/90
}

interface BloodSample {
  id: number;
  statement: string;
  correctComponent: 'Eritrosit' | 'Leukosit' | 'Trombosit' | 'Plasma';
  explanation: string;
}

const BLOOD_SAMPLES: BloodSample[] = [
  {
    id: 1,
    statement: 'Sampel A: Memiliki bentuk cakram bikonkaf tanpa inti sel dan sarat dengan protein hemoglobin pengikat gas O2.',
    correctComponent: 'Eritrosit',
    explanation: 'Eritrosit (sel darah merah) berbentuk bikonkaf untuk memaksimalkan luas permukaan penyerapan oksigen.'
  },
  {
    id: 2,
    statement: 'Sampel B: Menghasilkan antibodi dan langsung menelan bakteri patogen yang masuk ke dalam luka terbuka.',
    correctComponent: 'Leukosit',
    explanation: 'Leukosit (sel darah putih) adalah tentara pertahanan tubuh yang membasmi bibit penyakit.'
  },
  {
    id: 3,
    statement: 'Sampel C: Mengeluarkan enzim trombokinase untuk membentuk jaring-jaring fibrin pembeku darah saat tergores.',
    correctComponent: 'Trombosit',
    explanation: 'Trombosit (keping darah) bertugas menutup luka dan membekukan darah agar tidak terjadi pendarahan berlebih.'
  },
  {
    id: 4,
    statement: 'Sampel D: Cairan kekuningan (55% total darah) yang melarutkan glukosa, protein, vitamin, dan zat sisa urea.',
    correctComponent: 'Plasma',
    explanation: 'Plasma darah adalah medium cair yang mendistribusikan sari-sari makanan dan hormon ke seluruh sel.'
  },
  {
    id: 5,
    statement: 'Sampel E: Jumlahnya meningkat tajam saat tubuh terserang infeksi demam sebagai respon perlawanan imun.',
    correctComponent: 'Leukosit',
    explanation: 'Saat infeksi terjadi, sumsum tulang memproduksi jutaan leukosit ekstra untuk memerangi mikroba penyerang.'
  },
  {
    id: 6,
    statement: 'Sampel F: Memberikan rona warna merah segar pada darah arteri saat mengikat penuh oksigen di paru-paru.',
    correctComponent: 'Eritrosit',
    explanation: 'Hemoglobin dalam eritrosit yang berikatan dengan oksigen (oksihemoglobin) memancarkan warna merah cerah.'
  }
];

export const Level4BloodHematology: React.FC<Level4Props> = ({
  onComplete,
  onOpenHint,
  timerDurationSeconds
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(timerDurationSeconds || 60);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isStarted, setIsStarted] = useState(false);

  // Timer loop
  useEffect(() => {
    if (!isStarted || isGameOver || timerDurationSeconds === 0) return;

    if (timeLeft <= 0) {
      setIsGameOver(true);
      soundManager.playEmergencyBeep();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setIsGameOver(true);
          soundManager.playEmergencyBeep();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isStarted, isGameOver, timeLeft, timerDurationSeconds]);

  const handleStart = () => {
    soundManager.playClick();
    setIsStarted(true);
    setIsGameOver(false);
    setTimeLeft(timerDurationSeconds || 60);
    setCurrentIdx(0);
    setUserAnswers({});
    setScore(0);
    setStreak(0);
  };

  const handleAnswer = (componentName: 'Eritrosit' | 'Leukosit' | 'Trombosit' | 'Plasma') => {
    const currentSample = BLOOD_SAMPLES[currentIdx];
    const isCorrect = currentSample.correctComponent === componentName;

    setUserAnswers(prev => ({ ...prev, [currentSample.id]: componentName }));

    if (isCorrect) {
      soundManager.playSuccess();
      setScore(prev => prev + 50 + streak * 10);
      setStreak(prev => prev + 1);
    } else {
      soundManager.playError();
      setStreak(0);
    }

    if (currentIdx + 1 < BLOOD_SAMPLES.length) {
      setCurrentIdx(prev => prev + 1);
    } else {
      setIsGameOver(true);
      soundManager.playLevelUp();
    }
  };

  const correctCount = Object.entries(userAnswers).filter(
    ([id, ans]) => BLOOD_SAMPLES.find(s => s.id === Number(id))?.correctComponent === ans
  ).length;

  const isSuccess = correctCount >= 5; // at least 5 out of 6 correct

  const openHint = () => {
    onOpenHint(
      'Ingat 4 tugas pokok: Eritrosit (angkut O2/napas), Leukosit (tentara antibodi/kuman), Trombosit (pembeku luka/darah), Plasma (cairan sari makanan/hormon).',
      'Jika deskripsi menyebut "sel tanpa inti" atau "hemoglobin", itu adalah Eritrosit. Jika menyebut "menelan bakteri", itu Leukosit. Jika "pembekuan luka", itu Trombosit.'
    );
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Narrative Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 md:p-6 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
            <Timer className="w-4 h-4 text-amber-500 animate-pulse" />
            Tantangan Cepat · Laboratorium Hematologi Pasien X
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
          Level 4: Time Attack · Klasifikasi Cepat Komponen Darah
        </h2>
        <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
          Di bawah mikroskop virtual Bio-Explorer, 6 sampel darah mengalir cepat! Analisis ciri khasnya dan kelompokkan ke dalam 4 komponen: <strong>Eritrosit, Leukosit, Trombosit, atau Plasma Darah</strong> sebelum timer habis!
        </p>
      </div>

      {/* Main Arena */}
      {!isStarted ? (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center max-w-xl mx-auto space-y-5">
          <div className="w-14 h-14 rounded-2xl bg-amber-950 border border-amber-800 text-amber-400 mx-auto flex items-center justify-center">
            <Timer className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Siap Menguji Kecepatan & Ketepatan?</h3>
            <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
              Tersedia 6 sampel darah misterius. Klasifikasikan dengan tepat! Pertahankan streak jawaban benar untuk bonus poin combo.
            </p>
            <div className="mt-3 text-xs font-mono text-amber-400">
              Batas Waktu: {timerDurationSeconds === 0 ? 'Tanpa Waktu (Mode Belajar)' : `${timerDurationSeconds || 60} Detik`}
            </div>
          </div>

          <button
            onClick={handleStart}
            className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm rounded-xl transition-all cursor-pointer shadow-lg shadow-amber-950/40"
          >
            Mulai Tantangan Time Attack!
          </button>
        </div>
      ) : isGameOver ? (
        /* Result Screen */
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
          <div className="text-center space-y-2">
            <div className={`w-12 h-12 rounded-xl mx-auto flex items-center justify-center ${
              isSuccess ? 'bg-emerald-950 border border-emerald-800 text-emerald-400' : 'bg-rose-950 border border-rose-800 text-rose-400'
            }`}>
              {isSuccess ? <Award className="w-6 h-6" /> : <ShieldAlert className="w-6 h-6" />}
            </div>
            <h3 className="text-xl font-bold text-white">
              {isSuccess ? 'Luar Biasa! Ahli Hematologi Sejati!' : 'Waktu Habis atau Perlu Penguatan!'}
            </h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              Kamu berhasil mengidentifikasi <strong className="text-white">{correctCount} dari 6 sampel</strong> darah dengan benar. Total skor hematologi: <strong className="text-amber-400">{score} Poin</strong>.
            </p>
          </div>

          {/* Breakdown Review of 6 Samples */}
          <div className="space-y-2.5 max-w-2xl mx-auto">
            {BLOOD_SAMPLES.map((sample) => {
              const userAns = userAnswers[sample.id];
              const isCorrect = userAns === sample.correctComponent;

              return (
                <div
                  key={sample.id}
                  className={`p-3 rounded-xl border text-xs leading-relaxed ${
                    isCorrect
                      ? 'bg-emerald-950/30 border-emerald-800/60 text-slate-300'
                      : 'bg-rose-950/30 border-rose-800/60 text-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between font-semibold mb-1">
                    <span className="text-white">{sample.statement}</span>
                    <span className={isCorrect ? 'text-emerald-400' : 'text-rose-400 font-mono'}>
                      {isCorrect ? '✓ Benar' : `✗ Salah (Jawaban: ${sample.correctComponent})`}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">{sample.explanation}</p>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              onClick={handleStart}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Coba Ulangi
            </button>

            {isSuccess && (
              <button
                onClick={() => {
                  soundManager.playSuccess();
                  onComplete(300, correctCount === 6 ? 3 : 2);
                }}
                className="px-5 py-2 bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-md shadow-rose-950/40"
              >
                <span>Lanjut ke Level 5</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Active Game Screen */
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6 max-w-3xl mx-auto">
          {/* Header Stats Bar */}
          <div className="flex items-center justify-between bg-slate-950 border border-slate-800 p-3 rounded-xl text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="text-slate-400">Sampel:</span>
              <span className="text-white font-bold">{currentIdx + 1} / {BLOOD_SAMPLES.length}</span>
            </div>

            {timerDurationSeconds > 0 && (
              <div className="flex items-center gap-1.5 text-amber-400 font-bold tabular-nums">
                <Timer className="w-4 h-4 animate-spin" />
                <span>{timeLeft}s</span>
              </div>
            )}

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 text-cyan-400 font-bold">
                <Zap className="w-3.5 h-3.5" />
                <span>Streak: {streak}x</span>
              </div>
              <div className="text-amber-400 font-bold">
                Skor: {score}
              </div>
            </div>
          </div>

          {/* Active Sample Flashcard */}
          <div className="p-6 rounded-2xl bg-slate-950 border-2 border-cyan-500/40 shadow-xl space-y-4 text-center">
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest block">
              Pengamatan Mikroskopis #{currentIdx + 1}
            </span>
            <p className="text-sm md:text-base font-semibold text-white leading-relaxed max-w-xl mx-auto">
              &ldquo;{BLOOD_SAMPLES[currentIdx].statement}&rdquo;
            </p>
          </div>

          {/* 4 Classification Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: 'A', name: 'Eritrosit', desc: 'Sel Darah Merah (O2)', color: 'border-rose-500 hover:bg-rose-950/40' },
              { label: 'B', name: 'Leukosit', desc: 'Sel Darah Putih (Imun)', color: 'border-cyan-500 hover:bg-cyan-950/40' },
              { label: 'C', name: 'Trombosit', desc: 'Keping Darah (Luka)', color: 'border-amber-500 hover:bg-amber-950/40' },
              { label: 'D', name: 'Plasma', desc: 'Cairan Pengangkut Sari', color: 'border-emerald-500 hover:bg-emerald-950/40' }
            ].map((btn) => (
              <button
                key={btn.name}
                onClick={() => handleAnswer(btn.name as 'Eritrosit' | 'Leukosit' | 'Trombosit' | 'Plasma')}
                className={`p-4 rounded-xl border bg-slate-950 text-left transition-all cursor-pointer group active:scale-95 ${btn.color}`}
              >
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-mono text-[11px] font-bold text-slate-300">
                    {btn.label}
                  </span>
                  <div className="font-bold text-xs md:text-sm text-white group-hover:text-amber-300">
                    {btn.name}
                  </div>
                </div>
                <div className="text-[10px] text-slate-400 mt-1.5 line-clamp-1">
                  {btn.desc}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
