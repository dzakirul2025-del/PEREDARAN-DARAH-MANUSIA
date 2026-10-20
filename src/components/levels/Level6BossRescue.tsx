import React, { useState } from 'react';
import { ShieldAlert, ArrowRight, CheckCircle2, AlertTriangle, HelpCircle, Activity, Heart, Sparkles, RefreshCw } from 'lucide-react';
import { soundManager } from '../../utils/soundEffects';

interface Level6Props {
  onComplete: (xpEarned: number, stars: number) => void;
  onOpenHint: (t1: string, t2: string) => void;
}

export const Level6BossRescue: React.FC<Level6Props> = ({ onComplete, onOpenHint }) => {
  const [phase, setPhase] = useState<1 | 2 | 3>(1);
  const [plaqueBlockagePercent, setPlaqueBlockagePercent] = useState(85);
  const [heartRate, setHeartRate] = useState(145);
  const [oxygenSaturation, setOxygenSaturation] = useState(82);

  // Phase 1 choice
  const [phase1Choice, setPhase1Choice] = useState<string | null>(null);
  // Phase 2 choice
  const [phase2Choice, setPhase2Choice] = useState<string | null>(null);
  // Phase 3 choice
  const [phase3Choice, setPhase3Choice] = useState<string | null>(null);

  const [feedbackMsg, setFeedbackMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handlePhase1Decision = (choiceId: string) => {
    soundManager.playClick();
    setPhase1Choice(choiceId);

    if (choiceId === 'arteri_koroner') {
      soundManager.playSuccess();
      setFeedbackMsg({
        type: 'success',
        text: 'Tepat sekali! Arteri Koroner adalah pembuluh nadi khusus yang memberi makan otot jantung (miokardium). Sumbatan di sini memicu serangan jantung mendadak!'
      });
      setPlaqueBlockagePercent(55);
      setHeartRate(120);
      setOxygenSaturation(89);
      setTimeout(() => {
        setPhase(2);
        setFeedbackMsg(null);
      }, 1500);
    } else {
      soundManager.playError();
      setFeedbackMsg({
        type: 'error',
        text: 'Keliru! Pembuluh tersebut bukan lokasi utama penyebab nyeri dada iskemik Pasien X. Teliti kembali pembuluh yang memasok darah ke otot jantung!'
      });
    }
  };

  const handlePhase2Decision = (choiceId: string) => {
    soundManager.playClick();
    setPhase2Choice(choiceId);

    if (choiceId === 'kateter_balon') {
      soundManager.playSuccess();
      setFeedbackMsg({
        type: 'success',
        text: 'Prosedur Berhasil! Mikro-balon angioplasti mengembang lembut, menekan plak kolesterol ke dinding arteri dan memasang cincin stent pengaman!'
      });
      setPlaqueBlockagePercent(15);
      setHeartRate(95);
      setOxygenSaturation(95);
      setTimeout(() => {
        setPhase(3);
        setFeedbackMsg(null);
      }, 1500);
    } else {
      soundManager.playError();
      setFeedbackMsg({
        type: 'error',
        text: 'Tindakan berbahaya! Metode tersebut berisiko merobek endotel dinding pembuluh darah atau memicu bekuan darah fatal!'
      });
    }
  };

  const handlePhase3Decision = (choiceId: string) => {
    soundManager.playClick();
    setPhase3Choice(choiceId);

    if (choiceId === 'oksigen_istirahat') {
      soundManager.playLevelUp();
      setFeedbackMsg({
        type: 'success',
        text: 'Pasien X Selamat! Aliran darah lancar 100%, denyut jantung kembali normal di 75 bpm, dan saturasi oksigen mencapai 99% sempurna!'
      });
      setPlaqueBlockagePercent(0);
      setHeartRate(75);
      setOxygenSaturation(99);
    } else {
      soundManager.playError();
      setFeedbackMsg({
        type: 'error',
        text: 'Keliru! Pasien yang baru pulih dari iskemik jantung tidak boleh langsung dipaksa beraktivitas berat atau diberi zat perangsang denyut!'
      });
    }
  };

  const isBossDefeated = phase1Choice === 'arteri_koroner' && phase2Choice === 'kateter_balon' && phase3Choice === 'oksigen_istirahat';

  const handleResetBoss = () => {
    soundManager.playClick();
    setPhase(1);
    setPlaqueBlockagePercent(85);
    setHeartRate(145);
    setOxygenSaturation(82);
    setPhase1Choice(null);
    setPhase2Choice(null);
    setPhase3Choice(null);
    setFeedbackMsg(null);
  };

  const openHint = () => {
    onOpenHint(
      'Fase 1: Otot jantung dipasok langsung oleh Arteri Koroner. Fase 2: Untuk membuka sumbatan plak lemak, digunakan mikro-kateter balon (angioplasti & stent).',
      'Fase 3: Pasca plak terbuka, tubuh memerlukan terapi oksigenasi murni dan hidrasi seimbang untuk menstabilkan irama jantung kembali ke 60-100 bpm.'
    );
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Narrative Alert */}
      <div className="bg-gradient-to-r from-slate-900 via-rose-950/60 to-slate-900 border border-rose-800 rounded-2xl p-5 md:p-6 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-rose-400 font-bold text-xs uppercase tracking-wider">
            <ShieldAlert className="w-4 h-4 text-rose-500 animate-bounce" />
            Boss Battle · Operasi Penyelamatan Bio-Explorer
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
          Level 6: Boss Battle · Menembus Plak Sumbatan Koroner
        </h2>
        <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
          Kondisi Pasien X kritis! Kapsul nano Bio-Explorer berada tepat di depan dinding pembuluh darah arteri koroner yang tersumbat 85% oleh endapan plak lemak kolesterol jahat (aterosklerosis). Ambil 3 keputusan taktis medis berurutan untuk menyelamatkan nyawa pasien!
        </p>
      </div>

      {/* Two-Zone Layout: Left Vascular Cross-Section Simulator + Right Tactical Protocol */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left: Vascular Vessel Simulator */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono font-bold text-rose-400 flex items-center gap-1.5">
                <Activity className="w-4 h-4" /> PENAMPANG ARTERI KORONER
              </span>
              <span className="text-xs font-mono text-slate-400">
                Lumen Tersumbat: <strong className={plaqueBlockagePercent > 20 ? 'text-rose-400' : 'text-emerald-400'}>{plaqueBlockagePercent}%</strong>
              </span>
            </div>

            {/* Interactive Artery Cross-Section SVG */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 relative overflow-hidden flex flex-col items-center justify-center min-h-[260px]">
              {/* Artery Outer Wall */}
              <div className="relative w-48 h-48 rounded-full border-8 border-rose-900/80 bg-rose-950/40 flex items-center justify-center shadow-inner">
                {/* Yellow Plaque Layer shrinking as user progresses */}
                <div
                  className="rounded-full bg-amber-500/90 border-4 border-amber-600 transition-all duration-700 ease-out flex items-center justify-center"
                  style={{
                    width: `${Math.max(30, plaqueBlockagePercent * 1.6)}%`,
                    height: `${Math.max(30, plaqueBlockagePercent * 1.6)}%`
                  }}
                >
                  {/* Free Lumen (Center Hole) */}
                  <div
                    className="rounded-full bg-red-600 transition-all duration-700 ease-out flex items-center justify-center shadow-md"
                    style={{
                      width: `${Math.max(20, (100 - plaqueBlockagePercent) * 0.8)}%`,
                      height: `${Math.max(20, (100 - plaqueBlockagePercent) * 0.8)}%`
                    }}
                  >
                    {/* Tiny blood cells flowing */}
                    <div className="w-2.5 h-2.5 rounded-full bg-red-300 animate-ping opacity-80" />
                  </div>
                </div>

                {/* Floating Bio-Explorer probe */}
                <div className="absolute top-2 right-2 text-[10px] font-mono text-cyan-400 bg-slate-950/80 px-2 py-0.5 rounded border border-cyan-800">
                  Bio-Probe 01
                </div>
              </div>

              {/* Status Indicator */}
              <div className="mt-4 text-center">
                <div className="text-xs font-bold text-white">
                  {plaqueBlockagePercent === 0
                    ? 'LUMEN PEMBULUH BERSIH & NORMAL'
                    : plaqueBlockagePercent <= 20
                    ? 'STENT TERPASANG · ALIRAN PULIH'
                    : 'SUMBATAN ATEROSKLEROSIS TINGGI'}
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  Arteri Koroner Percabangan Miokardium
                </div>
              </div>
            </div>
          </div>

          {/* Vitals Telemetry Box */}
          <div className="grid grid-cols-2 gap-2 text-xs font-mono bg-slate-950 p-3 rounded-xl border border-slate-800">
            <div>
              <span className="text-slate-400 block text-[10px]">DETAK JANTUNG:</span>
              <span className={`text-sm font-bold ${heartRate > 100 ? 'text-rose-400 animate-pulse' : 'text-emerald-400'}`}>
                {heartRate} BPM
              </span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px]">SATURASI OKSIGEN:</span>
              <span className={`text-sm font-bold ${oxygenSaturation < 95 ? 'text-amber-400' : 'text-emerald-400'}`}>
                {oxygenSaturation}% SpO2
              </span>
            </div>
          </div>
        </div>

        {/* Right: 3-Phase Tactical Decision Arena */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-5 md:p-6 space-y-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <div>
                <h3 className="text-base font-bold text-white tracking-tight">
                  Protokol Penyelamatan 3 Fase (Fase {phase} dari 3)
                </h3>
                <p className="text-xs text-slate-400">
                  Pilihlah tindakan medis berbasis biologi yang akurat dan aman
                </p>
              </div>
              <button
                onClick={handleResetBoss}
                className="px-2.5 py-1 text-xs text-slate-400 hover:text-white bg-slate-950 border border-slate-800 rounded-lg flex items-center gap-1 cursor-pointer transition-colors"
              >
                <RefreshCw className="w-3 h-3" />
                Ulangi Operasi
              </button>
            </div>

            {/* PHASE 1 */}
            {phase === 1 && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="p-3.5 bg-slate-950 rounded-xl border border-rose-900/60">
                  <span className="text-xs font-mono text-rose-400 uppercase tracking-wider block mb-1">
                    Fase 1: Identifikasi Pembuluh Kritis
                  </span>
                  <p className="text-xs md:text-sm text-slate-200 leading-relaxed">
                    Sensor mendeteksi iskemia (kekurangan darah) pada dinding otot jantung kiri. Pembuluh nadi manakah yang bertanggung jawab menyuplai darah langsung ke otot jantung ini?
                  </p>
                </div>

                <div className="space-y-2">
                  {[
                    { id: 'vena_pulmonalis', label: 'A. Vena Pulmonalis (Membawa darah dari paru-paru ke serambi kiri)' },
                    { id: 'arteri_koroner', label: 'B. Arteri Koroner (Percabangan aorta khusus yang memasok oksigen & nutrisi ke otot jantung)' },
                    { id: 'arteri_ginjal', label: 'C. Arteri Renalis (Pembuluh darah yang menyaring darah ke ginjal)' },
                    { id: 'vena_kaki', label: 'D. Vena Safena (Pembuluh darah balik superfisial pada tungkai bawah kaki)' }
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => handlePhase1Decision(opt.id)}
                      className="w-full text-left p-3.5 rounded-xl border bg-slate-950 border-slate-800 hover:border-rose-500 hover:bg-slate-950/80 text-xs text-slate-200 transition-all cursor-pointer font-medium"
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* PHASE 2 */}
            {phase === 2 && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="p-3.5 bg-slate-950 rounded-xl border border-amber-900/60">
                  <span className="text-xs font-mono text-amber-400 uppercase tracking-wider block mb-1">
                    Fase 2: Tindakan Pembebasan Sumbatan Plak Kolesterol
                  </span>
                  <p className="text-xs md:text-sm text-slate-200 leading-relaxed">
                    Plak kolesterol setebal 85% menempel kuat di lumen arteri koroner. Alat mikro Bio-Explorer manakah yang paling aman digunakan tanpa merusak dinding arteri?
                  </p>
                </div>

                <div className="space-y-2">
                  {[
                    { id: 'kateter_balon', label: 'A. Memasukkan mikro-kateter balon (angioplasti) untuk mendilatasi pembuluh dan memasang ring stent pengaman' },
                    { id: 'bor_kecepatan_tinggi', label: 'B. Menggunakan bor mikro kecepatan tinggi tanpa pelindung dinding' },
                    { id: 'asam_pekat', label: 'C. Menyuntikkan cairan asam korosif untuk melarutkan seluruh sel di dalam pembuluh' },
                    { id: 'sinar_rontgen_kuat', label: 'D. Menembakkan sinar Rontgen dosis tinggi untuk membakar lemak dari luar tubuh' }
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => handlePhase2Decision(opt.id)}
                      className="w-full text-left p-3.5 rounded-xl border bg-slate-950 border-slate-800 hover:border-amber-500 hover:bg-slate-950/80 text-xs text-slate-200 transition-all cursor-pointer font-medium"
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* PHASE 3 */}
            {phase === 3 && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="p-3.5 bg-slate-950 rounded-xl border border-emerald-900/60">
                  <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider block mb-1">
                    Fase 3: Stabilisasi Pasca-Operasi & Hemodinamik
                  </span>
                  <p className="text-xs md:text-sm text-slate-200 leading-relaxed">
                    Plak telah terurai dan ring stent terpasang! Sekarang, bagaimana langkah penanganan medis terbaik untuk menormalkan ritme denyut jantung Pasien X?
                  </p>
                </div>

                <div className="space-y-2">
                  {[
                    { id: 'lari_maraton_lagi', label: 'A. Menyuruh Pasien X langsung berdiri dan melanjutkan lari maraton sejauh 10 km' },
                    { id: 'oksigen_istirahat', label: 'B. Pemberian suplemen oksigen murni, hidrasi elektrolit, dan istirahat tirah baring tenang untuk memulihkan miokardium' },
                    { id: 'minuman_energi', label: 'C. Memberikan 5 botol minuman berenergi tinggi kafein dan makanan berminyak' },
                    { id: 'makan_garam_tinggi', label: 'D. Mengonsumsi makanan tinggi natrium dan garam untuk memacu lonjakan tekanan darah' }
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => handlePhase3Decision(opt.id)}
                      className="w-full text-left p-3.5 rounded-xl border bg-slate-950 border-slate-800 hover:border-emerald-500 hover:bg-slate-950/80 text-xs text-slate-200 transition-all cursor-pointer font-medium"
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Feedback message banner */}
            {feedbackMsg && (
              <div
                className={`p-3.5 rounded-xl text-xs leading-relaxed mt-4 ${
                  feedbackMsg.type === 'success'
                    ? 'bg-emerald-950/50 border border-emerald-800 text-emerald-200'
                    : 'bg-rose-950/50 border border-rose-800 text-rose-300'
                }`}
              >
                {feedbackMsg.text}
              </div>
            )}
          </div>

          {/* Completion Bar */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-4">
            <div className="text-xs text-slate-400">
              {isBossDefeated ? (
                <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> Pasien X terselamatkan sepenuhnya! Kotak Misteri 3 & Level 7 terbuka!
                </span>
              ) : (
                <span>Tuntaskan ketiga fase keputusan medis untuk memenangkan Boss Battle.</span>
              )}
            </div>

            <button
              disabled={!isBossDefeated}
              onClick={() => {
                soundManager.playSuccess();
                onComplete(400, 3);
              }}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                isBossDefeated
                  ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-950/40'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
              }`}
            >
              <span>Lanjut ke Level 7: The Revelation</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
