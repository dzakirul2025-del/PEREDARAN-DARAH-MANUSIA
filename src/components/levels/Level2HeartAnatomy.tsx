import React, { useState } from 'react';
import { Heart, ArrowRight, CheckCircle2, RefreshCw, HelpCircle, Sparkles } from 'lucide-react';
import { soundManager } from '../../utils/soundEffects';

interface Level2Props {
  onComplete: (xpEarned: number, stars: number) => void;
  onOpenHint: (t1: string, t2: string) => void;
}

interface ChamberSlot {
  id: string;
  name: string;
  latinName: string;
  role: string;
  bloodType: 'rich_o2' | 'rich_co2';
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

const CHAMBERS: ChamberSlot[] = [
  {
    id: 'atrium_kanan',
    name: 'Serambi Kanan',
    latinName: 'Atrium Dextra',
    role: 'Menerima darah kotor kaya CO2 dari seluruh tubuh melalui Vena Cava.',
    bloodType: 'rich_co2',
    position: 'top-left' // in anatomical view, patient's right is on the observer's left
  },
  {
    id: 'atrium_kiri',
    name: 'Serambi Kiri',
    latinName: 'Atrium Sinistra',
    role: 'Menerima darah bersih kaya O2 yang baru datang dari paru-paru melalui Vena Pulmonalis.',
    bloodType: 'rich_o2',
    position: 'top-right'
  },
  {
    id: 'ventrikel_kanan',
    name: 'Bilik Kanan',
    latinName: 'Ventrikel Dextra',
    role: 'Memompa darah kaya CO2 menuju ke paru-paru untuk melepaskan CO2 dan menyerap O2.',
    bloodType: 'rich_co2',
    position: 'bottom-left'
  },
  {
    id: 'ventrikel_kiri',
    name: 'Bilik Kiri',
    latinName: 'Ventrikel Sinistra',
    role: 'Memompa darah bersih kaya O2 ke seluruh tubuh via Aorta. Dinding ototnya paling tebal!',
    bloodType: 'rich_o2',
    position: 'bottom-right'
  }
];

export const Level2HeartAnatomy: React.FC<Level2Props> = ({ onComplete, onOpenHint }) => {
  const [selectedChamber, setSelectedChamber] = useState<string | null>(null);
  const [placedChambers, setPlacedChambers] = useState<Record<string, string>>({});
  const [vesselAnswers, setVesselAnswers] = useState<Record<string, string>>({});
  const [showVesselResult, setShowVesselResult] = useState(false);

  // Vessel comparison quiz
  const vesselQuestions = [
    {
      id: 'v1',
      question: 'Pembuluh yang mengalirkan darah keluar meninggalkan jantung bertekanan tinggi adalah...',
      correct: 'Arteri (Nadi)',
      options: ['Arteri (Nadi)', 'Vena (Balik)', 'Kapiler', 'Katup Jantung']
    },
    {
      id: 'v2',
      question: 'Pembuluh mikroskopis berdinding setebal satu lapis sel tempat pertukaran O2 dan sari makanan adalah...',
      correct: 'Kapiler',
      options: ['Arteri (Nadi)', 'Vena (Balik)', 'Kapiler', 'Katup Jantung']
    },
    {
      id: 'v3',
      question: 'Pembuluh yang membawa darah kembali ke jantung dan memiliki banyak katup searah di sepanjang salurannya adalah...',
      correct: 'Vena (Balik)',
      options: ['Arteri (Nadi)', 'Vena (Balik)', 'Kapiler', 'Katup Jantung']
    }
  ];

  const handlePlaceChamber = (slotPosition: string) => {
    if (!selectedChamber) return;

    soundManager.playClick();
    setPlacedChambers(prev => ({
      ...prev,
      [slotPosition]: selectedChamber
    }));
    setSelectedChamber(null);

    // Check if correct
    const expected = CHAMBERS.find(c => c.position === slotPosition);
    if (expected && expected.id === selectedChamber) {
      soundManager.playSuccess();
    } else {
      soundManager.playError();
    }
  };

  const handleResetChambers = () => {
    soundManager.playClick();
    setPlacedChambers({});
    setSelectedChamber(null);
  };

  const isChambersComplete =
    placedChambers['top-left'] === 'atrium_kanan' &&
    placedChambers['top-right'] === 'atrium_kiri' &&
    placedChambers['bottom-left'] === 'ventrikel_kanan' &&
    placedChambers['bottom-right'] === 'ventrikel_kiri';

  const isVesselQuizComplete =
    vesselAnswers['v1'] === 'Arteri (Nadi)' &&
    vesselAnswers['v2'] === 'Kapiler' &&
    vesselAnswers['v3'] === 'Vena (Balik)';

  const canFinishLevel = isChambersComplete && isVesselQuizComplete;

  const openHint = () => {
    onOpenHint(
      'Ingat pandangan anatomi medis: Sisi kanan tubuh pasien tampak di sebelah kiri mata kita (Serambi Kanan & Bilik Kanan). Bagian atas adalah Serambi (Atrium), bagian bawah adalah Bilik (Ventrikel).',
      'Bilik Kiri memiliki dinding paling tebal karena memompa darah ke seluruh tubuh. Darah kaya O2 berada di sisi kiri jantung (warna merah), darah kaya CO2 di sisi kanan jantung (warna biru).'
    );
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Narrative Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 md:p-6 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-rose-400 font-bold text-xs uppercase tracking-wider">
            <Heart className="w-4 h-4 text-rose-500 fill-current" />
            Misi Penjelajahan Anatomi · Laboratorium Bio-MIN 1 Paser
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
          Level 2: The First Clue · Anatomi Jantung & Lab Pembuluh Darah
        </h2>
        <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
          Kapsul nano Bio-Explorer telah memasuki rongga dada Pasien X! Di hadapanmu terdapat diagram pompa jantung 4 ruang yang saling terhubung dengan katup. Susun ke-4 ruang jantung pada posisinya yang presisi dan identifikasi 3 jenis pipa pembuluh darah utama.
        </p>
      </div>

      {/* Stage 1: Interactive Heart Chamber Placement */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Interactive Heart SVG Diagram */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <span>Diagram Anatomi 4 Ruang Jantung</span>
                {isChambersComplete && (
                  <span className="text-xs text-emerald-400 font-normal flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Tepat 100%
                  </span>
                )}
              </h3>
              <p className="text-xs text-slate-400">
                Catatan: Posisi anatomi kiri-kanan berkebalikan dengan posisi tanganmu (seperti cermin).
              </p>
            </div>
            <button
              onClick={handleResetChambers}
              className="px-2.5 py-1 text-xs text-slate-400 hover:text-white bg-slate-950 border border-slate-800 rounded-lg flex items-center gap-1 cursor-pointer transition-colors"
            >
              <RefreshCw className="w-3 h-3" />
              Reset Posisi
            </button>
          </div>

          {/* Interactive Heart Visual with 4 Chambers Drop Slots */}
          <div className="relative bg-slate-950 rounded-xl border border-slate-800 p-6 flex items-center justify-center min-h-[340px]">
            {/* SVG Heart Silhouette Background */}
            <svg className="w-64 h-64 opacity-25 text-rose-600 animate-pulse-slow absolute" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>

            {/* 4 Chamber Slots Grid */}
            <div className="relative z-10 grid grid-cols-2 gap-4 w-full max-w-md">
              {/* Top-Left Slot: Serambi Kanan (Atrium Dextra) */}
              <div
                onClick={() => handlePlaceChamber('top-left')}
                className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex flex-col justify-between min-h-[120px] ${
                  placedChambers['top-left'] === 'atrium_kanan'
                    ? 'bg-blue-950/80 border-blue-500 text-blue-200'
                    : placedChambers['top-left']
                    ? 'bg-rose-950/60 border-rose-500 text-rose-200'
                    : 'bg-slate-900/80 border-dashed border-slate-700 hover:border-cyan-400'
                }`}
              >
                <div className="text-[11px] font-mono text-slate-400 flex justify-between">
                  <span>ATAS KANAN PASIEN</span>
                  <span className="text-blue-400 font-bold">Kaya CO2</span>
                </div>
                <div className="my-auto text-center">
                  {placedChambers['top-left'] ? (
                    <div className="font-bold text-xs md:text-sm text-white">
                      {CHAMBERS.find(c => c.id === placedChambers['top-left'])?.name}
                      <span className="block text-[10px] text-slate-400 font-normal">
                        ({CHAMBERS.find(c => c.id === placedChambers['top-left'])?.latinName})
                      </span>
                    </div>
                  ) : (
                    <span className="text-xs text-slate-500 font-medium">
                      {selectedChamber ? 'Klik untuk pasang di sini' : 'Slot Ruang 1 (Atas Kanan Pasien)'}
                    </span>
                  )}
                </div>
              </div>

              {/* Top-Right Slot: Serambi Kiri (Atrium Sinistra) */}
              <div
                onClick={() => handlePlaceChamber('top-right')}
                className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex flex-col justify-between min-h-[120px] ${
                  placedChambers['top-right'] === 'atrium_kiri'
                    ? 'bg-rose-950/80 border-rose-500 text-rose-200'
                    : placedChambers['top-right']
                    ? 'bg-rose-950/60 border-rose-500 text-rose-200'
                    : 'bg-slate-900/80 border-dashed border-slate-700 hover:border-cyan-400'
                }`}
              >
                <div className="text-[11px] font-mono text-slate-400 flex justify-between">
                  <span>ATAS KIRI PASIEN</span>
                  <span className="text-rose-400 font-bold">Kaya O2</span>
                </div>
                <div className="my-auto text-center">
                  {placedChambers['top-right'] ? (
                    <div className="font-bold text-xs md:text-sm text-white">
                      {CHAMBERS.find(c => c.id === placedChambers['top-right'])?.name}
                      <span className="block text-[10px] text-slate-400 font-normal">
                        ({CHAMBERS.find(c => c.id === placedChambers['top-right'])?.latinName})
                      </span>
                    </div>
                  ) : (
                    <span className="text-xs text-slate-500 font-medium">
                      {selectedChamber ? 'Klik untuk pasang di sini' : 'Slot Ruang 2 (Atas Kiri Pasien)'}
                    </span>
                  )}
                </div>
              </div>

              {/* Bottom-Left Slot: Bilik Kanan (Ventrikel Dextra) */}
              <div
                onClick={() => handlePlaceChamber('bottom-left')}
                className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex flex-col justify-between min-h-[120px] ${
                  placedChambers['bottom-left'] === 'ventrikel_kanan'
                    ? 'bg-blue-950/80 border-blue-500 text-blue-200'
                    : placedChambers['bottom-left']
                    ? 'bg-rose-950/60 border-rose-500 text-rose-200'
                    : 'bg-slate-900/80 border-dashed border-slate-700 hover:border-cyan-400'
                }`}
              >
                <div className="text-[11px] font-mono text-slate-400 flex justify-between">
                  <span>BAWAH KANAN PASIEN</span>
                  <span className="text-blue-400 font-bold">Pompa ke Paru-paru</span>
                </div>
                <div className="my-auto text-center">
                  {placedChambers['bottom-left'] ? (
                    <div className="font-bold text-xs md:text-sm text-white">
                      {CHAMBERS.find(c => c.id === placedChambers['bottom-left'])?.name}
                      <span className="block text-[10px] text-slate-400 font-normal">
                        ({CHAMBERS.find(c => c.id === placedChambers['bottom-left'])?.latinName})
                      </span>
                    </div>
                  ) : (
                    <span className="text-xs text-slate-500 font-medium">
                      {selectedChamber ? 'Klik untuk pasang di sini' : 'Slot Ruang 3 (Bawah Kanan Pasien)'}
                    </span>
                  )}
                </div>
              </div>

              {/* Bottom-Right Slot: Bilik Kiri (Ventrikel Sinistra) */}
              <div
                onClick={() => handlePlaceChamber('bottom-right')}
                className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex flex-col justify-between min-h-[120px] ${
                  placedChambers['bottom-right'] === 'ventrikel_kiri'
                    ? 'bg-rose-950/80 border-rose-500 text-rose-200'
                    : placedChambers['bottom-right']
                    ? 'bg-rose-950/60 border-rose-500 text-rose-200'
                    : 'bg-slate-900/80 border-dashed border-slate-700 hover:border-cyan-400'
                }`}
              >
                <div className="text-[11px] font-mono text-slate-400 flex justify-between">
                  <span>BAWAH KIRI PASIEN</span>
                  <span className="text-rose-400 font-bold">Otot Paling Tebal</span>
                </div>
                <div className="my-auto text-center">
                  {placedChambers['bottom-right'] ? (
                    <div className="font-bold text-xs md:text-sm text-white">
                      {CHAMBERS.find(c => c.id === placedChambers['bottom-right'])?.name}
                      <span className="block text-[10px] text-slate-400 font-normal">
                        ({CHAMBERS.find(c => c.id === placedChambers['bottom-right'])?.latinName})
                      </span>
                    </div>
                  ) : (
                    <span className="text-xs text-slate-500 font-medium">
                      {selectedChamber ? 'Klik untuk pasang di sini' : 'Slot Ruang 4 (Bawah Kiri Pasien)'}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Chamber Cards to Pick */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between space-y-4">
          <div>
            <h3 className="text-sm font-bold text-white mb-1">
              Pilih Ruang Jantung & Pasang ke Diagram
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Klik salah satu kartu di bawah, lalu klik kotak target pada diagram jantung di samping kiri.
            </p>

            <div className="space-y-2.5">
              {CHAMBERS.map((ch) => {
                const isSelected = selectedChamber === ch.id;
                const isAlreadyPlaced = Object.values(placedChambers).includes(ch.id);

                return (
                  <button
                    key={ch.id}
                    disabled={isAlreadyPlaced}
                    onClick={() => {
                      soundManager.playClick();
                      setSelectedChamber(ch.id);
                    }}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-cyan-950 border-cyan-400 shadow-md ring-2 ring-cyan-500/40 text-white'
                        : isAlreadyPlaced
                        ? 'bg-slate-950/60 border-slate-800 text-slate-500 cursor-not-allowed opacity-50'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-600 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-xs">{ch.name}</span>
                      <span className="text-[10px] font-mono text-slate-400 italic">
                        {ch.latinName}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      {ch.role}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Biological Key Fact */}
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-400 leading-relaxed">
            <strong className="text-cyan-400 block mb-0.5">Fungsi Katup Jantung (Valvula):</strong>
            Berada di antara serambi dan bilik serta pangkal pembuluh nadi untuk memastikan darah hanya mengalir <strong>satu arah</strong> dan tidak berbalik kembali!
          </div>
        </div>
      </div>

      {/* Stage 2: Blood Vessels Comparison (Arteri vs Vena vs Kapiler) */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 md:p-6 space-y-4">
        <div className="border-b border-slate-800 pb-3">
          <h3 className="text-base font-bold text-white tracking-tight">
            Laboratorium Pembuluh Darah (Arteri vs Vena vs Kapiler)
          </h3>
          <p className="text-xs text-slate-400">
            Jawab 3 pertanyaan analitis di bawah ini untuk membuktikan pemahamanmu mengenai ketiga jenis saluran sirkulasi.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {vesselQuestions.map((q) => {
            const currentAnswer = vesselAnswers[q.id];
            const isCorrect = currentAnswer === q.correct;

            return (
              <div key={q.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 flex flex-col justify-between">
                <div className="text-xs font-semibold text-slate-200 leading-relaxed">
                  {q.question}
                </div>

                <div className="space-y-2 pt-2">
                  {q.options.map((opt, optIdx) => (
                    <button
                      key={opt}
                      onClick={() => {
                        soundManager.playClick();
                        setVesselAnswers(prev => ({ ...prev, [q.id]: opt }));
                        if (opt === q.correct) {
                          soundManager.playSuccess();
                        } else {
                          soundManager.playError();
                        }
                      }}
                      className={`w-full py-2 px-3 rounded-lg text-xs font-medium text-left transition-colors cursor-pointer flex items-center justify-between ${
                        currentAnswer === opt
                          ? opt === q.correct
                            ? 'bg-emerald-950 border border-emerald-500 text-emerald-200'
                            : 'bg-rose-950 border border-rose-500 text-rose-200'
                          : 'bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <strong className="font-mono text-slate-400">{String.fromCharCode(65 + optIdx)}.</strong>
                        <span>{opt}</span>
                      </span>
                      {currentAnswer === opt && (
                        <span>{opt === q.correct ? '✓' : '✗'}</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Level Completion Navigation */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex items-center justify-between gap-4">
        <div className="text-xs text-slate-400">
          {canFinishLevel ? (
            <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" /> Anatomi Jantung & Pembuluh Darah tuntas! Kotak Misteri 1 terbuka.
            </span>
          ) : (
            <span>
              Lengkapi penempatan 4 ruang jantung dan jawab 3 soal pembuluh darah untuk lanjut.
            </span>
          )}
        </div>

        <button
          disabled={!canFinishLevel}
          onClick={() => {
            soundManager.playSuccess();
            onComplete(200, 3);
          }}
          className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
            canFinishLevel
              ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-950/40'
              : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
          }`}
        >
          <span>Lanjut ke Level 3</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
