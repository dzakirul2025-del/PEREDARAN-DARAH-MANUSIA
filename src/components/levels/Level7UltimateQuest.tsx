import React, { useState } from 'react';
import { Award, CheckCircle2, ShieldCheck, Sparkles, HelpCircle, Heart, HeartPulse, Printer, BookOpen } from 'lucide-react';
import { soundManager } from '../../utils/soundEffects';
import confetti from 'canvas-confetti';

interface Level7Props {
  studentName: string;
  onComplete: (xpEarned: number, stars: number) => void;
  onOpenCertificate: () => void;
  onSaveReflection: (fav: string, chal: string, pledge: string) => void;
  onOpenHint: (t1: string, t2: string) => void;
}

interface HotsQuestion {
  id: number;
  question: string;
  options: { text: string; correct: boolean; feedback: string }[];
}

const HOTS_BANK: HotsQuestion[] = [
  {
    id: 1,
    question: 'Seorang perokok pasif sering mengalami napas terengah-engah dan denyut jantung cepat. Mengapa gas karbon monoksida (CO) dari asap rokok sangat merugikan sel darah merah?',
    options: [
      { text: 'Karena CO mengikat hemoglobin jauh lebih kuat (200x) dibanding oksigen, sehingga sel tubuh kelaparan oksigen.', correct: true, feedback: 'Tepat! Karbon monoksida membentuk karboksihemoglobin yang stabil, menghalangi oksigen terikat oleh darah.' },
      { text: 'Karena CO mengubah warna darah menjadi hijau dan membekukan plasma.', correct: false, feedback: 'Salah, CO tidak mengubah warna darah menjadi hijau.' },
      { text: 'Karena CO mempercepat pembelahan sel darah putih menjadi jutaan sel.', correct: false, feedback: 'Salah, itu bukan dampak langsung dari karbon monoksida pada hemoglobin.' },
      { text: 'Karena CO mempercepat pembekuan darah oleh keping darah trombosit di alveolus.', correct: false, feedback: 'Salah, CO tidak memicu trombosit melainkan merebut tempat oksigen pada hemoglobin.' }
    ]
  },
  {
    id: 2,
    question: 'Mengapa dokter sangat menganjurkan penderita hipertensi (darah tinggi) untuk membatasi konsumsi garam dapur (natrium)?',
    options: [
      { text: 'Karena garam membuat darah terasa asin dan merusak rasa makanan.', correct: false, feedback: 'Bukan sekadar rasa, ini mekanisme fisiologis cairan dalam tubuh.' },
      { text: 'Karena ion natrium menarik dan menahan air di dalam pembuluh darah, meningkatkan volume darah dan tekanan dinding arteri.', correct: true, feedback: 'Sangat tepat! Retensi air oleh natrium membebani dinding arteri dan jantung.' },
      { text: 'Karena garam langsung membakar sel darah merah seketika.', correct: false, feedback: 'Salah, garam tidak membakar sel darah merah.' },
      { text: 'Karena garam menyebabkan pembuluh balik vena kehilangan katup searahnya.', correct: false, feedback: 'Salah, kelemahan katup vena bukan disebabkan oleh konsumsi garam melainkan elastisitas dinding pembuluh.' }
    ]
  },
  {
    id: 3,
    question: 'Jika seseorang rutin melakukan olahraga aerobik (seperti bersepeda atau senam) 3-4 kali seminggu selama 30 menit, adaptasi positif apa yang terjadi pada otot jantungnya?',
    options: [
      { text: 'Ukuran jantung menyusut mengecil sehingga jarang berdenyut.', correct: false, feedback: 'Otot yang dilatih tidak menyusut melainkan menjadi lebih efisien dan kuat.' },
      { text: 'Otot miokardium menjadi lebih kuat dan elastis, sehingga setiap satu kali denyutan memompa lebih banyak volume darah (stroke volume meningkat).', correct: true, feedback: 'Tepat sekali! Jantung atlet terlatih mampu berdenyut lebih hemat dan efisien.' },
      { text: 'Semua pembuluh darah arteri berubah menjadi vena.', correct: false, feedback: 'Salah, fungsi arteri dan vena tidak dapat tertukar secara anatomis.' },
      { text: 'Otot jantung melemah dan berhenti memompa darah ke seluruh tubuh.', correct: false, feedback: 'Salah, latihan teratur justru menguatkan daya tahan dan daya pompa miokardium.' }
    ]
  },
  {
    id: 4,
    question: 'Ibu Sarah mengeluh kakinya pegal dan muncul pembuluh kebiruan berkelok di betis setelah mengajar seharian tanpa istirahat. Langkah preventif sederhana yang paling tepat adalah...',
    options: [
      { text: 'Mengangkat kaki lebih tinggi dari pinggang saat istirahat untuk membantu aliran darah vena kembali ke jantung melawan gravitasi.', correct: true, feedback: 'Tepat! Posisi elevasi kaki memudahkan darah di pembuluh balik (vena) mengalir lancar kembali ke jantung.' },
      { text: 'Mengikat betis sekencang mungkin dengan tali karet.', correct: false, feedback: 'Sangat berbahaya! Mengikat betis justru menghentikan sirkulasi darah.' },
      { text: 'Berdiri mematung lebih lama lagi selama 5 jam.', correct: false, feedback: 'Berdiri lama tanpa bergerak memperparah bendungan darah di vena.' },
      { text: 'Mengompres betis dengan minyak goreng mendidih.', correct: false, feedback: 'Sangat berbahaya dan dapat menimbulkan luka bakar parah pada jaringan kulit.' }
    ]
  },
  {
    id: 5,
    question: 'Dalam menu makan harian siswa MIN 1 Paser, mengapa konsumsi bayam, hati ayam, dan kacang-kacangan sangat efektif mencegah anemia?',
    options: [
      { text: 'Karena bahan makanan tersebut kaya zat besi (Fe) yang merupakan komponen mineral utama pembentuk molekul hemoglobin.', correct: true, feedback: 'Sempurna! Zat besi adalah bahan baku mutlak sintesis rantai heme pada hemoglobin.' },
      { text: 'Karena bayam dapat langsung menggantikan seluruh plasma darah.', correct: false, feedback: 'Salah, sayuran tidak langsung berubah menjadi plasma darah.' },
      { text: 'Karena zat besi membekukan kuman leukosit.', correct: false, feedback: 'Salah, zat besi bertugas membentuk sel darah merah, bukan membekukan leukosit.' },
      { text: 'Karena zat besi melarutkan seluruh sel darah merah menjadi cairan bening.', correct: false, feedback: 'Salah, zat besi justru komponen penyusun penting hemoglobin pembawa warna merah darah.' }
    ]
  }
];

export const Level7UltimateQuest: React.FC<Level7Props> = ({
  studentName,
  onComplete,
  onOpenCertificate,
  onSaveReflection,
  onOpenHint
}) => {
  const [activeStep, setActiveStep] = useState<'safe' | 'quiz' | 'reflection' | 'celebration'>('safe');
  const [safePillars, setSafePillars] = useState<Record<string, boolean>>({
    nutrisi: false,
    olahraga: false,
    istirahat: false,
    hindari_rokok: false
  });

  // Quiz state
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // Reflection state
  const [favTopic, setFavTopic] = useState('Anatomi 4 Ruang Jantung & Katup');
  const [chalTopic, setChalTopic] = useState('Membedakan Arteri Pulmonalis vs Vena Pulmonalis');
  const [healthPledge, setHealthPledge] = useState(
    'Saya berjanji akan rutin minum air putih, rajin berolahraga pagi, mengurangi gorengan berminyak, dan menjaga jantung pemberian Allah SWT agar tetap sehat kuat!'
  );

  const toggleSafePillar = (pillarKey: string) => {
    soundManager.playClick();
    setSafePillars(prev => {
      const next = { ...prev, [pillarKey]: !prev[pillarKey] };
      const allActive = Object.values(next).every(Boolean);
      if (allActive) {
        soundManager.playMysteryReveal();
      }
      return next;
    });
  };

  const isSafeUnlocked = Object.values(safePillars).every(Boolean);

  const handleSelectQuizAnswer = (qId: number, optIdx: number) => {
    if (quizSubmitted) return;
    soundManager.playClick();
    setQuizAnswers(prev => ({ ...prev, [qId]: optIdx }));
  };

  const handleCheckQuiz = () => {
    setQuizSubmitted(true);
    const correctCount = HOTS_BANK.filter(
      q => quizAnswers[q.id] !== undefined && q.options[quizAnswers[q.id]].correct
    ).length;

    if (correctCount >= 4) {
      soundManager.playSuccess();
    } else {
      soundManager.playError();
    }
  };

  const correctQuizCount = HOTS_BANK.filter(
    q => quizAnswers[q.id] !== undefined && q.options[quizAnswers[q.id]].correct
  ).length;

  const handleFinishReflection = () => {
    soundManager.playLevelUp();
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.5 }
    });
    onSaveReflection(favTopic, chalTopic, healthPledge);
    onComplete(500, 3);
    setActiveStep('celebration');
  };

  const openHint = () => {
    onOpenHint(
      'Formula 4 Pilar Jantung Sehat: Gizi seimbang rendah lemak jenuh & garam, olahraga aerobik teratur, tidur cukup 7-8 jam, dan jauhi rokok & polusi.',
      'Karbon monoksida (CO) rokok mengikat hemoglobin 200x lebih kuat dari oksigen. Garam mengikat air dan menaikkan tensi. Zat besi makanan membentuk hemoglobin pencegah anemia.'
    );
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-amber-950/40 to-slate-900 border border-amber-800/80 rounded-2xl p-5 md:p-6 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
            <Award className="w-4 h-4 text-amber-500 animate-pulse" />
            Babak Final · The Revelation & Asesmen HOTS
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
          Level 7: The Ultimate Quest · Formula Rahasia Jantung Sehat
        </h2>
        <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
          Selamat detektif! Pasien X telah sadar berkat aksimu di Boss Battle. Sekarang, pecahkan kode brankas 4 pilar hidup sehat, tuntaskan ujian penalaran HOTS pamungkas, dan isi ikrar detektif cilik kesehatan untuk meraih sertifikat kelulusan resmi dari MIN 1 Paser!
        </p>
      </div>

      {/* Step Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => setActiveStep('safe')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
            activeStep === 'safe'
              ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-950/40'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <span>1. Buka Brankas 4 Pilar</span>
          {isSafeUnlocked && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
        </button>

        <button
          onClick={() => setActiveStep('quiz')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
            activeStep === 'quiz'
              ? 'bg-rose-600 text-white shadow-md shadow-rose-950/40'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <span>2. Ujian Penalaran HOTS (5 Soal)</span>
          {quizSubmitted && correctQuizCount >= 4 && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />}
        </button>

        <button
          onClick={() => setActiveStep('reflection')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
            activeStep === 'reflection'
              ? 'bg-cyan-600 text-white shadow-md shadow-cyan-950/40'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <span>3. Ruang Refleksi & Ikrar</span>
        </button>
      </div>

      {/* STEP 1: BRANKAS 4 PILAR */}
      {activeStep === 'safe' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
          <div className="border-b border-slate-800 pb-3">
            <h3 className="text-base font-bold text-white tracking-tight">
              Aktivasi 4 Pilar Gaya Hidup Sehat Sirkulasi
            </h3>
            <p className="text-xs text-slate-400">
              Klik keempat tombol pilar ilmiah untuk membuka kunci brankas kesehatan jantung Pasien X.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                key: 'nutrisi',
                title: 'Pilar 1: Gizi Rendah Lemak Jenuh & Garam',
                desc: 'Batasi gorengan kolesterol tinggi dan makanan asin pemicu hipertensi. Perbanyak sayur, buah antioksidan, dan air putih.'
              },
              {
                key: 'olahraga',
                title: 'Pilar 2: Olahraga Aerobik Rutin (30 Menit)',
                desc: 'Jogging, jalan cepat, bersepeda, atau berenang teratur 3-5 kali seminggu untuk memperkuat otot miokardium.'
              },
              {
                key: 'istirahat',
                title: 'Pilar 3: Istirahat Berkualitas (7-8 Jam)',
                desc: 'Tidur cukup di malam hari untuk memberi kesempatan otot jantung memperlambat ritme denyut dan memulihkan sel-sel tubuh.'
              },
              {
                key: 'hindari_rokok',
                title: 'Pilar 4: Tolak Asap Rokok & Nikotin',
                desc: 'Zat nikotin menyempitkan pembuluh darah dan karbon monoksida (CO) merampas kapasitas oksigen dalam hemoglobin.'
              }
            ].map((p) => {
              const active = safePillars[p.key];

              return (
                <button
                  key={p.key}
                  onClick={() => toggleSafePillar(p.key)}
                  className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                    active
                      ? 'bg-emerald-950/80 border-emerald-500 shadow-md text-emerald-100 ring-2 ring-emerald-500/30'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-xs text-white">{p.title}</span>
                    <span className={`text-xs font-mono font-bold ${active ? 'text-emerald-400' : 'text-slate-600'}`}>
                      {active ? '✓ AKTIF' : '○ KLIK AKTIFKAN'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {p.desc}
                  </p>
                </button>
              );
            })}
          </div>

          {isSafeUnlocked ? (
            <div className="p-4 rounded-xl bg-gradient-to-r from-amber-950/60 to-slate-950 border border-amber-600/80 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-amber-400 shrink-0" />
                <span className="text-xs text-amber-200 font-semibold">
                  Brankas 4 Pilar Terbuka! Sekarang lanjutkan ke Ujian Penalaran HOTS Pamungkas.
                </span>
              </div>
              <button
                onClick={() => {
                  soundManager.playClick();
                  setActiveStep('quiz');
                }}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-lg transition-colors cursor-pointer shrink-0"
              >
                Mulai Ujian HOTS →
              </button>
            </div>
          ) : (
            <p className="text-xs text-center text-slate-500">
              *Aktifkan keempat pilar di atas untuk membuka brankas rahasia.
            </p>
          )}
        </div>
      )}

      {/* STEP 2: HOTS ASSESSMENT */}
      {activeStep === 'quiz' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
          <div className="border-b border-slate-800 pb-3 flex flex-wrap items-center justify-between gap-2">
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">
                Ujian Formatif Tingkat Tinggi (HOTS IPAS Fase C)
              </h3>
              <p className="text-xs text-slate-400">
                Uji kemampuan penalaran, literasi sains, dan analisis sebab-akibatmu
              </p>
            </div>
            {quizSubmitted && (
              <span className={`text-xs font-mono font-bold px-3 py-1 rounded-lg ${
                correctQuizCount >= 4 ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-rose-950 text-rose-400 border border-rose-800'
              }`}>
                Skor HOTS: {correctQuizCount} / 5 Benar
              </span>
            )}
          </div>

          <div className="space-y-6">
            {HOTS_BANK.map((q, idx) => {
              const selectedOpt = quizAnswers[q.id];

              return (
                <div key={q.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                  <div className="text-xs md:text-sm font-semibold text-slate-200 leading-relaxed">
                    <span className="text-rose-400 font-mono mr-2">Soal #{idx + 1}:</span>
                    {q.question}
                  </div>

                  <div className="space-y-2">
                    {q.options.map((opt, optIdx) => {
                      const isChosen = selectedOpt === optIdx;

                      return (
                        <button
                          key={optIdx}
                          disabled={quizSubmitted}
                          onClick={() => handleSelectQuizAnswer(q.id, optIdx)}
                          className={`w-full text-left p-3 rounded-lg text-xs transition-all cursor-pointer flex items-start gap-2.5 ${
                            isChosen
                              ? quizSubmitted
                                ? opt.correct
                                  ? 'bg-emerald-950 border border-emerald-500 text-emerald-200'
                                  : 'bg-rose-950 border border-rose-500 text-rose-200'
                                : 'bg-rose-950/70 border border-rose-500 text-rose-200'
                              : 'bg-slate-900 border border-slate-800/80 text-slate-300 hover:bg-slate-800'
                          }`}
                        >
                          <span className="font-mono text-slate-400">{String.fromCharCode(65 + optIdx)}.</span>
                          <span className="leading-relaxed">{opt.text}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Feedback on submit */}
                  {quizSubmitted && selectedOpt !== undefined && (
                    <div className={`p-2.5 rounded-lg text-xs leading-relaxed ${
                      q.options[selectedOpt].correct
                        ? 'bg-emerald-950/40 text-emerald-300 border border-emerald-900/60'
                        : 'bg-rose-950/40 text-rose-300 border border-rose-900/60'
                    }`}>
                      <strong>{q.options[selectedOpt].correct ? 'Ulasan Tepat: ' : 'Penjelasan: '}</strong>
                      {q.options[selectedOpt].feedback}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            {!quizSubmitted ? (
              <button
                disabled={Object.keys(quizAnswers).length < 5}
                onClick={handleCheckQuiz}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  Object.keys(quizAnswers).length === 5
                    ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-md'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                }`}
              >
                Kirim & Periksa Jawaban HOTS
              </button>
            ) : (
              <div className="flex items-center gap-3 w-full justify-between">
                <span className="text-xs text-slate-400">
                  {correctQuizCount >= 4 ? 'Kompetensi HOTS tercapai dengan gemilang!' : 'Bagus sekali! Evaluasi ulasan dan lanjutkan ke Refleksi.'}
                </span>
                <button
                  onClick={() => {
                    soundManager.playClick();
                    setActiveStep('reflection');
                  }}
                  className="px-5 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold rounded-xl transition-all cursor-pointer shadow-md"
                >
                  Masuk ke Ruang Refleksi →
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* STEP 3: REFLECTION ROOM & PLEDGE */}
      {activeStep === 'reflection' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
          <div className="border-b border-slate-800 pb-3">
            <h3 className="text-base font-bold text-white tracking-tight">
              Ruang Refleksi & Ikrar Detektif Sehat MIN 1 Paser
            </h3>
            <p className="text-xs text-slate-400">
              Metakognisi: Evaluasi apa yang telah kamu pelajari dan komitmen hidup sehatmu
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                1. Materi/Konsep apa yang paling menarik dan membuka wawasanmu?
              </label>
              <input
                type="text"
                value={favTopic}
                onChange={(e) => setFavTopic(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                2. Bagian mana yang paling menantang dan bagaimana strategimu memecahkannya?
              </label>
              <input
                type="text"
                value={chalTopic}
                onChange={(e) => setChalTopic(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                3. Ikrar Tindakan Nyata: Apa kebiasaan hidup sehat yang akan kamu terapkan mulai hari ini?
              </label>
              <textarea
                rows={3}
                value={healthPledge}
                onChange={(e) => setHealthPledge(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500 leading-relaxed"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 flex justify-end">
            <button
              onClick={handleFinishReflection}
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition-all cursor-pointer shadow-lg shadow-emerald-950/40 flex items-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              Simpan Ikrar & Tuntaskan Seluruh Misi!
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: CELEBRATION & CERTIFICATE LAUNCH */}
      {activeStep === 'celebration' && (
        <div className="bg-slate-900 border border-emerald-500/40 rounded-2xl p-8 text-center max-w-xl mx-auto space-y-5 animate-in zoom-in-95 duration-300">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-400 mx-auto flex items-center justify-center">
            <Award className="w-8 h-8" />
          </div>

          <div>
            <h3 className="text-2xl font-black text-white tracking-tight">
              SELAMAT, {studentName.toUpperCase() || 'DETEKTIF SAINS'}!
            </h3>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              Kamu telah resmi menuntaskan seluruh 7 Level Misi Pembelajaran Mendalam IPAS Sistem Peredaran Darah Manusia di MIN 1 Paser. Gelar <strong>Bio-Detektif Sirkulasi Kehidupan</strong> kini menjadi milikmu!
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={onOpenCertificate}
              className="w-full sm:w-auto px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs rounded-xl transition-all cursor-pointer shadow-lg shadow-amber-950/40 flex items-center justify-center gap-2"
            >
              <Printer className="w-4 h-4" />
              Buka & Cetak Sertifikat Resmi
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
