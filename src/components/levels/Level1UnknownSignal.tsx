import React, { useState, useEffect } from 'react';
import { Activity, AlertTriangle, ArrowRight, CheckCircle2, XCircle, HeartHandshake, Volume2, HelpCircle } from 'lucide-react';
import { soundManager } from '../../utils/soundEffects';

interface Level1Props {
  onComplete: (xpEarned: number, stars: number) => void;
  onOpenHint: (t1: string, t2: string) => void;
}

export const Level1UnknownSignal: React.FC<Level1Props> = ({ onComplete, onOpenHint }) => {
  const [pulseMode, setPulseMode] = useState<'normal' | 'abnormal'>('abnormal');
  const [answeredQuestions, setAnsweredQuestions] = useState<Record<number, number>>({});
  const [showExplanation, setShowExplanation] = useState<Record<number, boolean>>({});
  const [allCorrect, setAllCorrect] = useState(false);

  const questions = [
    {
      id: 1,
      prompt: 'Mengapa denyut jantung Pasien X melonjak hingga 145 denyut per menit (bpm) saat kolaps di Stadion Tana Paser, dan apa kondisi normalnya saat istirahat?',
      options: [
        { text: 'Denyut 145 bpm adalah normal bagi semua manusia saat tidur malam.', correct: false, reason: 'Salah! Saat tidur denyut justru menurun (sekitar 50-60 bpm).' },
        { text: 'Normal istirahat adalah 60-100 bpm; 145 bpm menunjukkan takikardia darurat di mana jantung bekerja terlalu keras karena kekurangan suplai oksigen.', correct: true, reason: 'Tepat sekali! Denyut istirahat normal berkisar 60-100 bpm. Lonjakan ekstrem menandakan stres hemodinamik atau hipoksia.' },
        { text: 'Denyut normal adalah 200 bpm, jadi 145 bpm berarti jantung hampir berhenti.', correct: false, reason: 'Salah! Denyut 200 bpm saat istirahat sangat berbahaya dan bukan nilai normal.' },
        { text: 'Denyut jantung manusia tidak memiliki rentang normal karena selalu berubah acak tanpa pola.', correct: false, reason: 'Salah! Frekuensi denyut jantung sehat memiliki standar fisiologis baku (60-100 bpm saat istirahat).' }
      ]
    },
    {
      id: 2,
      prompt: 'Organ utama yang bertindak sebagai motor pompa ganda tak henti dalam mengalirkan darah ke seluruh tubuh adalah...',
      options: [
        { text: 'Paru-paru, karena paru-paru menghasilkan angin bertekanan tinggi.', correct: false, reason: 'Paru-paru adalah organ pertukaran gas pernapasan, bukan pompa berotot sirkulasi.' },
        { text: 'Jantung (Cor), organ berotot tebal istimewa yang berdenyut memompa darah ke seluruh jaringan tubuh.', correct: true, reason: 'Tepat! Otot jantung (miokardium) berkontraksi secara ritmis dan otonom memompa ribuan liter darah setiap hari.' },
        { text: 'Lambung, karena mengolah makanan menjadi energi mekanik sirkulasi.', correct: false, reason: 'Lambung adalah organ pencernaan untuk mencerna makanan secara kimiawi & mekanik.' },
        { text: 'Ginjal, karena menyaring cairan darah menjadi air seni (urin).', correct: false, reason: 'Ginjal adalah organ ekskresi/penyaring limbah darah, bukan organ pemompa aliran sirkulasi.' }
      ]
    },
    {
      id: 3,
      prompt: 'Gas vital apakah yang diikat oleh darah dari alveolus paru-paru untuk diedarkan ke otak dan otot Pasien X?',
      options: [
        { text: 'Gas Karbon Dioksida (CO2) yang merupakan zat sisa pembakaran sel.', correct: false, reason: 'CO2 adalah gas sisa beracun yang justru harus dibuang keluar melalui napas.' },
        { text: 'Gas Oksigen (O2) yang diperlukan sel untuk menghasilkan energi melalui proses respirasi seluler.', correct: true, reason: 'Sangat tepat! Oksigen diikat oleh hemoglobin dalam sel darah merah untuk disalurkan ke seluruh tubuh.' },
        { text: 'Gas Nitrogen murni tanpa campuran oksigen.', correct: false, reason: 'Meskipun atmosfer kaya nitrogen, sel tubuh manusia membutuhkan oksigen untuk respirasi sel.' },
        { text: 'Gas Karbon Monoksida (CO) hasil pembakaran yang berbahaya.', correct: false, reason: 'CO adalah gas racun yang mematikan jika terikat dalam darah, bukan gas vital penunjang hidup.' }
      ]
    }
  ];

  const handleSelectAnswer = (qId: number, optIdx: number) => {
    soundManager.playClick();
    setAnsweredQuestions(prev => ({ ...prev, [qId]: optIdx }));
    setShowExplanation(prev => ({ ...prev, [qId]: true }));

    const isCurrentCorrect = questions.find(q => q.id === qId)?.options[optIdx].correct;
    if (isCurrentCorrect) {
      soundManager.playSuccess();
    } else {
      soundManager.playError();
    }
  };

  useEffect(() => {
    // Check if all 3 questions answered correctly
    const q1Correct = answeredQuestions[1] !== undefined && questions[0].options[answeredQuestions[1]].correct;
    const q2Correct = answeredQuestions[2] !== undefined && questions[1].options[answeredQuestions[2]].correct;
    const q3Correct = answeredQuestions[3] !== undefined && questions[2].options[answeredQuestions[3]].correct;

    if (q1Correct && q2Correct && q3Correct) {
      setAllCorrect(true);
    } else {
      setAllCorrect(false);
    }
  }, [answeredQuestions]);

  const handleSoundTest = () => {
    soundManager.playHeartbeat(pulseMode === 'abnormal' ? 145 : 75, pulseMode === 'abnormal');
  };

  const openHint = () => {
    onOpenHint(
      'Perhatikan denyut nadi normal manusia: saat istirahat berkisar antara 60 hingga 100 kali per menit. Organ pompa sirkulasi berukuran sekepalan tangan di dada sebelah kiri.',
      'Jantung adalah organ pompa utama yang mengedarkan darah kaya Oksigen (O2) dari paru-paru ke seluruh tubuh dan membawa Karbon Dioksida (CO2) kembali untuk dibuang.'
    );
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Narrative Alert Banner */}
      <div className="bg-rose-950/40 border border-rose-800/80 rounded-2xl p-5 md:p-6 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-rose-400 font-bold text-xs uppercase tracking-wider">
            <AlertTriangle className="w-4 h-4 text-rose-500 animate-pulse" />
            Panggilan Darurat Medis · Lab Riset MIN 1 Paser
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
          Level 1: Sinyal Misterius Detak Jantung Pasien X
        </h2>
        <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
          Peringatan! Atlet remaja Pasien X mendadak pingsan di lintasan maraton Tanah Grogot. Sensor elektrokardiogram (EKG) mendeteksi gelombang denyut yang melonjak kacau! Sebelum meluncurkan kapsul nano <strong>Bio-Explorer</strong>, kamu wajib menganalisis sinyal ini dan menjawab hipotesis pemantik medis berikut!
        </p>
      </div>

      {/* Two-Zone Layout: Interactive Stage (EKG Monitor) + Concept Diagnostic */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Zone: Interactive EKG Monitor */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono font-bold text-cyan-400 flex items-center gap-1.5">
                <Activity className="w-4 h-4" /> MONITOR EKG BIO-TELEMETRI
              </span>
              <button
                onClick={handleSoundTest}
                className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-mono flex items-center gap-1 cursor-pointer transition-colors"
                title="Dengarkan Suara Lub-Dub"
              >
                <Volume2 className="w-3.5 h-3.5 text-rose-400" />
                Bunyi Jantung
              </button>
            </div>

            {/* EKG Screen Canvas Simulator */}
            <div className="bg-slate-950 border border-cyan-950 rounded-xl p-4 relative overflow-hidden h-48 flex flex-col justify-between shadow-inner">
              {/* Background Grid */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#022c22_1px,transparent_1px),linear-gradient(to_bottom,#022c22_1px,transparent_1px)] bg-[size:16px_16px] opacity-40" />

              {/* Top Stats */}
              <div className="relative z-10 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">PASIEN X (Usia 12 Th)</span>
                <span className={`font-bold tabular-nums ${pulseMode === 'abnormal' ? 'text-rose-500 animate-pulse' : 'text-emerald-400'}`}>
                  {pulseMode === 'abnormal' ? '145 BPM [TAKIKARDIA]' : '75 BPM [NORMAL]'}
                </span>
              </div>

              {/* Animated Waveform SVG */}
              <div className="relative z-10 w-full flex items-center justify-center">
                <svg className="w-full h-24 overflow-visible" viewBox="0 0 400 100">
                  <path
                    d={
                      pulseMode === 'abnormal'
                        ? 'M 0 50 L 30 50 L 40 45 L 45 55 L 55 10 L 65 90 L 75 45 L 85 50 L 110 50 L 120 45 L 125 55 L 135 10 L 145 90 L 155 45 L 165 50 L 190 50 L 200 45 L 205 55 L 215 10 L 225 90 L 235 45 L 245 50 L 270 50 L 280 45 L 285 55 L 295 10 L 305 90 L 315 45 L 325 50 L 350 50 L 360 45 L 365 55 L 375 10 L 385 90 L 395 45 L 400 50'
                        : 'M 0 50 L 60 50 L 75 45 L 85 55 L 100 20 L 115 80 L 130 45 L 145 50 L 200 50 L 215 45 L 225 55 L 240 20 L 255 80 L 270 45 L 285 50 L 340 50 L 355 45 L 365 55 L 380 20 L 395 80 L 400 50'
                    }
                    fill="none"
                    stroke={pulseMode === 'abnormal' ? '#f43f5e' : '#10b981'}
                    strokeWidth="2.5"
                    className="transition-all duration-300"
                  />
                </svg>
              </div>

              {/* Bottom Telemetry */}
              <div className="relative z-10 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>SATURASI O2: {pulseMode === 'abnormal' ? '88% [KRITIS]' : '99% [OPTIMAL]'}</span>
                <span>TEKANAN: {pulseMode === 'abnormal' ? '155/95 mmHg' : '110/70 mmHg'}</span>
              </div>
            </div>
          </div>

          {/* Interactive Mode Toggle */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-slate-400 block">
              Bandingkan Pola Gelombang Jantung:
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  soundManager.playClick();
                  setPulseMode('abnormal');
                }}
                className={`py-2 px-3 rounded-lg text-xs font-medium transition-colors cursor-pointer text-center ${
                  pulseMode === 'abnormal'
                    ? 'bg-rose-950 text-rose-300 border border-rose-700 font-bold'
                    : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
                }`}
              >
                Kondisi Pasien X (145 BPM)
              </button>
              <button
                onClick={() => {
                  soundManager.playClick();
                  setPulseMode('normal');
                }}
                className={`py-2 px-3 rounded-lg text-xs font-medium transition-colors cursor-pointer text-center ${
                  pulseMode === 'normal'
                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-700 font-bold'
                    : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
                }`}
              >
                Kondisi Normal (75 BPM)
              </button>
            </div>
          </div>
        </div>

        {/* Right Zone: Diagnostic Questions (HOTs/Pemantik) */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-5 md:p-6 space-y-5">
          <div className="border-b border-slate-800 pb-3">
            <h3 className="text-base font-bold text-white tracking-tight">
              Tantangan Investigasi Pemantik (Jawab Semua dengan Tepat)
            </h3>
            <p className="text-xs text-slate-400">
              Pilih jawaban ilmiah terbaik untuk mengaktifkan kapsul Bio-Explorer ke tubuh Pasien X.
            </p>
          </div>

          <div className="space-y-5">
            {questions.map((q) => {
              const selectedIdx = answeredQuestions[q.id];
              const isSelected = selectedIdx !== undefined;
              const isAnswerCorrect = isSelected && q.options[selectedIdx].correct;

              return (
                <div key={q.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                  <div className="text-xs md:text-sm font-semibold text-slate-200">
                    <span className="text-rose-400 font-mono mr-2">0{q.id}.</span>
                    {q.prompt}
                  </div>

                  <div className="space-y-2">
                    {q.options.map((opt, optIdx) => {
                      const isOptionSelected = selectedIdx === optIdx;

                      return (
                        <button
                          key={optIdx}
                          onClick={() => handleSelectAnswer(q.id, optIdx)}
                          className={`w-full text-left p-3 rounded-lg text-xs transition-all cursor-pointer flex items-start gap-2.5 ${
                            isOptionSelected
                              ? opt.correct
                                ? 'bg-emerald-950/70 border border-emerald-600 text-emerald-200'
                                : 'bg-rose-950/70 border border-rose-600 text-rose-200'
                              : 'bg-slate-900 border border-slate-800/80 text-slate-300 hover:bg-slate-800 hover:border-slate-700'
                          }`}
                        >
                          <div className="mt-0.5 shrink-0">
                            {isOptionSelected ? (
                              opt.correct ? (
                                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                              ) : (
                                <XCircle className="w-4 h-4 text-rose-400" />
                              )
                            ) : (
                              <div className="w-4 h-4 rounded-full border border-slate-600 flex items-center justify-center text-[10px] text-slate-400 font-mono">
                                {String.fromCharCode(65 + optIdx)}
                              </div>
                            )}
                          </div>
                          <span className="leading-relaxed">{opt.text}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Immediate Feedback Box */}
                  {isSelected && (
                    <div
                      className={`p-3 rounded-lg text-xs leading-relaxed ${
                        isAnswerCorrect
                          ? 'bg-emerald-950/40 border border-emerald-800/60 text-emerald-300'
                          : 'bg-rose-950/40 border border-rose-800/60 text-rose-300'
                      }`}
                    >
                      <strong>{isAnswerCorrect ? 'Ulasan Tepat: ' : 'Penjelasan Korektif: '}</strong>
                      {q.options[selectedIdx].reason}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Complete & Unlock Level 2 Action */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-4">
            <div className="text-xs text-slate-400">
              {allCorrect ? (
                <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> Seluruh analisis akurat! Kapsul Bio-Explorer siap meluncur.
                </span>
              ) : (
                <span>Jawab ketiga pertanyaan dengan benar untuk melanjutkan.</span>
              )}
            </div>

            <button
              disabled={!allCorrect}
              onClick={() => {
                soundManager.playSuccess();
                onComplete(150, 3);
              }}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                allCorrect
                  ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-950/40'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
              }`}
            >
              <span>Lanjut ke Level 2</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
