import React, { useState } from 'react';
import { GitBranch, ArrowRight, CheckCircle2, RotateCcw, HelpCircle, AlertCircle } from 'lucide-react';
import { soundManager } from '../../utils/soundEffects';

interface Level3Props {
  onComplete: (xpEarned: number, stars: number) => void;
  onOpenHint: (t1: string, t2: string) => void;
}

export const Level3CirculationRoutes: React.FC<Level3Props> = ({ onComplete, onOpenHint }) => {
  const [activeTab, setActiveTab] = useState<'kecil' | 'besar'>('kecil');

  // Small circulation (Pulmonal) steps
  const correctSmallSteps = [
    'Bilik Kanan (Jantung)',
    'Arteri Pulmonalis',
    'Paru-paru (Pertukaran Gas)',
    'Vena Pulmonalis',
    'Serambi Kiri (Jantung)'
  ];

  const poolSmallSteps = [
    'Paru-paru (Pertukaran Gas)',
    'Serambi Kiri (Jantung)',
    'Bilik Kanan (Jantung)',
    'Vena Pulmonalis',
    'Arteri Pulmonalis'
  ];

  // Big circulation (Sistemik) steps
  const correctBigSteps = [
    'Bilik Kiri (Jantung)',
    'Aorta (Arteri Terbesar)',
    'Seluruh Tubuh (Jaringan & Organ)',
    'Vena Cava',
    'Serambi Kanan (Jantung)'
  ];

  const poolBigSteps = [
    'Vena Cava',
    'Aorta (Arteri Terbesar)',
    'Bilik Kiri (Jantung)',
    'Serambi Kanan (Jantung)',
    'Seluruh Tubuh (Jaringan & Organ)'
  ];

  const [currentSmallSelection, setCurrentSmallSelection] = useState<string[]>([]);
  const [currentBigSelection, setCurrentBigSelection] = useState<string[]>([]);

  // HOTS question
  const [hotsAnswer, setHotsAnswer] = useState<string | null>(null);

  const handleSelectSmallStep = (step: string) => {
    if (currentSmallSelection.includes(step)) return;
    soundManager.playClick();
    const updated = [...currentSmallSelection, step];
    setCurrentSmallSelection(updated);

    const currentIndex = updated.length - 1;
    if (updated[currentIndex] === correctSmallSteps[currentIndex]) {
      if (updated.length === correctSmallSteps.length) {
        soundManager.playSuccess();
      }
    } else {
      soundManager.playError();
    }
  };

  const handleSelectBigStep = (step: string) => {
    if (currentBigSelection.includes(step)) return;
    soundManager.playClick();
    const updated = [...currentBigSelection, step];
    setCurrentBigSelection(updated);

    const currentIndex = updated.length - 1;
    if (updated[currentIndex] === correctBigSteps[currentIndex]) {
      if (updated.length === correctBigSteps.length) {
        soundManager.playSuccess();
      }
    } else {
      soundManager.playError();
    }
  };

  const isSmallComplete =
    currentSmallSelection.length === correctSmallSteps.length &&
    currentSmallSelection.every((val, idx) => val === correctSmallSteps[idx]);

  const isBigComplete =
    currentBigSelection.length === correctBigSteps.length &&
    currentBigSelection.every((val, idx) => val === correctBigSteps[idx]);

  const isHotsCorrect = hotsAnswer === 'opt2';

  const canFinishLevel = isSmallComplete && isBigComplete && isHotsCorrect;

  const openHint = () => {
    onOpenHint(
      'Peredaran darah kecil menghubungkan JANTUNG dan PARU-PARU. Selalu dimulai dari Bilik (pemompa) dan berakhir di Serambi (penerima).',
      'Peredaran darah besar menghubungkan JANTUNG dan SELURUH TUBUH. Dimulai dari Bilik Kiri yang memompa darah kaya O2 ke Aorta, lalu diedarkan ke seluruh tubuh dan kembali via Vena Cava ke Serambi Kanan.'
    );
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Narrative Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 md:p-6 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs uppercase tracking-wider">
            <GitBranch className="w-4 h-4 text-cyan-500" />
            Tantangan Logika Sirkulasi Ganda · Brain Breaker
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
          Level 3: Brain Breaker · Dua Rute Sirkulasi Kehidupan
        </h2>
        <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
          Manusia memiliki sistem peredaran darah <strong>ganda dan tertutup</strong>. Darah melewati jantung sebanyak dua kali dalam satu perputaran lengkap. Pasien X mengalami gangguan pada salah satu rute ini! Sambungkan urutan stasiun peredaran darah kecil dan darah besar dengan urutan yang tepat!
        </p>
      </div>

      {/* Tabs: Peredaran Darah Kecil vs Peredaran Darah Besar */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => {
            soundManager.playClick();
            setActiveTab('kecil');
          }}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'kecil'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-950/40'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <span>1. Peredaran Darah Kecil (Pulmonal)</span>
          {isSmallComplete && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />}
        </button>
        <button
          onClick={() => {
            soundManager.playClick();
            setActiveTab('besar');
          }}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'besar'
              ? 'bg-rose-600 text-white shadow-md shadow-rose-950/40'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <span>2. Peredaran Darah Besar (Sistemik)</span>
          {isBigComplete && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />}
        </button>
      </div>

      {/* Route Construction Arena */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 md:p-6 space-y-6">
        {activeTab === 'kecil' ? (
          /* TAB 1: PULMONAL */
          <div className="space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                  Rute Peredaran Darah Kecil: Jantung ke Paru-Paru
                </h3>
                <p className="text-xs text-slate-400">
                  Fungsi utama: Mengantar darah kaya CO2 ke alveolus paru-paru untuk melepaskan CO2 dan mengikat O2 segar.
                </p>
              </div>
              <button
                onClick={() => {
                  soundManager.playClick();
                  setCurrentSmallSelection([]);
                }}
                className="px-2.5 py-1 text-xs text-slate-400 hover:text-white bg-slate-950 border border-slate-800 rounded-lg flex items-center gap-1 cursor-pointer transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
                Ulangi Urutan
              </button>
            </div>

            {/* Sequence Drop Slots */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 block">Jalur Rangkaian Terpasang (5 Langkah):</span>
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
                {correctSmallSteps.map((_, idx) => {
                  const placedStep = currentSmallSelection[idx];
                  const isSlotCorrect = placedStep === correctSmallSteps[idx];

                  return (
                    <div
                      key={idx}
                      className={`p-3 rounded-xl border text-center flex flex-col justify-between min-h-[85px] transition-all ${
                        placedStep
                          ? isSlotCorrect
                            ? 'bg-blue-950/80 border-blue-500 text-blue-200'
                            : 'bg-rose-950/80 border-rose-500 text-rose-200'
                          : 'bg-slate-950 border-dashed border-slate-800 text-slate-600'
                      }`}
                    >
                      <span className="text-[10px] font-mono text-slate-400">Langkah {idx + 1}</span>
                      <span className="text-xs font-bold my-auto line-clamp-2">
                        {placedStep || 'Kosong'}
                      </span>
                      {placedStep && (
                        <span className="text-[10px] font-mono">
                          {isSlotCorrect ? '✓ Tepat' : '✗ Salah urutan'}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step Options to Click */}
            {!isSmallComplete && (
              <div className="space-y-2">
                <span className="text-xs font-semibold text-slate-300 block">
                  Klik stasiun rute berikutnya sesuai urutan aliran darah:
                </span>
                <div className="flex flex-wrap gap-2">
                  {poolSmallSteps.map((step) => {
                    const isUsed = currentSmallSelection.includes(step);
                    return (
                      <button
                        key={step}
                        disabled={isUsed}
                        onClick={() => handleSelectSmallStep(step)}
                        className={`px-3.5 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                          isUsed
                            ? 'bg-slate-950 text-slate-600 border border-slate-800 opacity-40 cursor-not-allowed'
                            : 'bg-slate-950 text-slate-200 border border-slate-700 hover:border-blue-400 hover:text-white'
                        }`}
                      >
                        + {step}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {isSmallComplete && (
              <div className="p-4 rounded-xl bg-blue-950/40 border border-blue-800/80 text-blue-300 text-xs flex items-center justify-between">
                <span>Rute Peredaran Darah Kecil berhasil terhubung sempurna! Sekarang buka tab Peredaran Darah Besar.</span>
                <button
                  onClick={() => {
                    soundManager.playClick();
                    setActiveTab('besar');
                  }}
                  className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-bold text-xs cursor-pointer"
                >
                  Buka Darah Besar →
                </button>
              </div>
            )}
          </div>
        ) : (
          /* TAB 2: SISTEMIK */
          <div className="space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                  Rute Peredaran Darah Besar: Jantung ke Seluruh Tubuh
                </h3>
                <p className="text-xs text-slate-400">
                  Fungsi utama: Mengedarkan darah kaya O2 dan sari makanan dari bilik kiri bertekanan tinggi ke seluruh jaringan tubuh.
                </p>
              </div>
              <button
                onClick={() => {
                  soundManager.playClick();
                  setCurrentBigSelection([]);
                }}
                className="px-2.5 py-1 text-xs text-slate-400 hover:text-white bg-slate-950 border border-slate-800 rounded-lg flex items-center gap-1 cursor-pointer transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
                Ulangi Urutan
              </button>
            </div>

            {/* Sequence Drop Slots */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 block">Jalur Rangkaian Terpasang (5 Langkah):</span>
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
                {correctBigSteps.map((_, idx) => {
                  const placedStep = currentBigSelection[idx];
                  const isSlotCorrect = placedStep === correctBigSteps[idx];

                  return (
                    <div
                      key={idx}
                      className={`p-3 rounded-xl border text-center flex flex-col justify-between min-h-[85px] transition-all ${
                        placedStep
                          ? isSlotCorrect
                            ? 'bg-rose-950/80 border-rose-500 text-rose-200'
                            : 'bg-rose-950/80 border-rose-500 text-rose-200'
                          : 'bg-slate-950 border-dashed border-slate-800 text-slate-600'
                      }`}
                    >
                      <span className="text-[10px] font-mono text-slate-400">Langkah {idx + 1}</span>
                      <span className="text-xs font-bold my-auto line-clamp-2">
                        {placedStep || 'Kosong'}
                      </span>
                      {placedStep && (
                        <span className="text-[10px] font-mono">
                          {isSlotCorrect ? '✓ Tepat' : '✗ Salah urutan'}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step Options to Click */}
            {!isBigComplete && (
              <div className="space-y-2">
                <span className="text-xs font-semibold text-slate-300 block">
                  Klik stasiun rute berikutnya sesuai urutan aliran darah:
                </span>
                <div className="flex flex-wrap gap-2">
                  {poolBigSteps.map((step) => {
                    const isUsed = currentBigSelection.includes(step);
                    return (
                      <button
                        key={step}
                        disabled={isUsed}
                        onClick={() => handleSelectBigStep(step)}
                        className={`px-3.5 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                          isUsed
                            ? 'bg-slate-950 text-slate-600 border border-slate-800 opacity-40 cursor-not-allowed'
                            : 'bg-slate-950 text-slate-200 border border-slate-700 hover:border-rose-400 hover:text-white'
                        }`}
                      >
                        + {step}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {isBigComplete && (
              <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-800/80 text-rose-300 text-xs flex items-center justify-between">
                <span>Rute Peredaran Darah Besar berhasil dirangkai sempurna! Kerja luar biasa, detektif!</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* HOTS Reasoning Challenge */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 md:p-6 space-y-4">
        <div className="border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
            <AlertCircle className="w-4 h-4" />
            Tantangan Penalaran Tingkat Tinggi (HOTS)
          </div>
          <h3 className="text-sm md:text-base font-bold text-white mt-1">
            Mengapa Arteri Pulmonalis disebut &ldquo;Arteri&rdquo; meskipun mengangkut darah kotor kaya Karbon Dioksida (CO2)?
          </h3>
        </div>

        <div className="space-y-2">
          {[
            {
              id: 'opt1',
              label: 'A.',
              text: 'Karena arteri pulmonalis memiliki warna merah cerah sama seperti pembuluh darah lainnya.',
              correct: false
            },
            {
              id: 'opt2',
              label: 'B.',
              text: 'Karena definisi arteri secara anatomi adalah pembuluh darah yang mengalir KELUAR MENINGGALKAN JANTUNG, bukan ditentukan oleh warna atau kandungan gasnya semata.',
              correct: true
            },
            {
              id: 'opt3',
              label: 'C.',
              text: 'Karena arteri pulmonalis mengalir sangat lambat tanpa denyutan.',
              correct: false
            },
            {
              id: 'opt4',
              label: 'D.',
              text: 'Karena arteri pulmonalis memiliki banyak katup searah di sepanjang salurannya seperti vena.',
              correct: false
            }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => {
                soundManager.playClick();
                setHotsAnswer(item.id);
                if (item.correct) {
                  soundManager.playSuccess();
                } else {
                  soundManager.playError();
                }
              }}
              className={`w-full text-left p-3.5 rounded-xl border text-xs leading-relaxed transition-all cursor-pointer ${
                hotsAnswer === item.id
                  ? item.correct
                    ? 'bg-emerald-950 border-emerald-500 text-emerald-200'
                    : 'bg-rose-950 border-rose-500 text-rose-200'
                  : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-950/80'
              }`}
            >
              <div className="flex items-start gap-2">
                <span className="font-bold">{item.label}</span>
                <span>{item.text}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Completion Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex items-center justify-between gap-4">
        <div className="text-xs text-slate-400">
          {canFinishLevel ? (
            <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" /> Dua rute sirkulasi terpecahkan & penalaran HOTS valid!
            </span>
          ) : (
            <span>
              Selesaikan kedua rangkaian rute dan jawab soal penalaran HOTS untuk melanjutkan.
            </span>
          )}
        </div>

        <button
          disabled={!canFinishLevel}
          onClick={() => {
            soundManager.playSuccess();
            onComplete(250, 3);
          }}
          className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
            canFinishLevel
              ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-950/40'
              : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
          }`}
        >
          <span>Lanjut ke Level 4</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
