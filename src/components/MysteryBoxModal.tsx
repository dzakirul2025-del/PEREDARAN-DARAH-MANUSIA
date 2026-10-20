import React from 'react';
import { MYSTERY_BOXES } from '../data/curriculumData';
import { X, Sparkles, Lock, CheckCircle, Gift } from 'lucide-react';
import { soundManager } from '../utils/soundEffects';

interface MysteryBoxModalProps {
  isOpen: boolean;
  onClose: () => void;
  openedBoxes: number[];
  completedLevels: number[];
  onClaimBox: (boxId: number, bonusXp: number) => void;
}

export const MysteryBoxModal: React.FC<MysteryBoxModalProps> = ({
  isOpen,
  onClose,
  openedBoxes,
  completedLevels,
  onClaimBox
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight">
                Kotak Misteri Sirkulasi Kehidupan
              </h2>
              <p className="text-xs text-slate-400">
                Fakta rahasia dan bonus XP yang terbuka seiring kemajuan misimu
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

        <div className="space-y-4">
          {MYSTERY_BOXES.map((box) => {
            const isUnlocked = completedLevels.includes(box.unlockLevel);
            const isClaimed = openedBoxes.includes(box.id);

            return (
              <div
                key={box.id}
                className={`p-5 rounded-xl border transition-all ${
                  isClaimed
                    ? 'bg-slate-950/80 border-amber-500/40 text-slate-200'
                    : isUnlocked
                    ? 'bg-gradient-to-r from-slate-900 to-amber-950/30 border-amber-500/60 shadow-lg shadow-amber-950/20'
                    : 'bg-slate-950/40 border-slate-800/60 opacity-60'
                }`}
              >
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                        isClaimed
                          ? 'bg-amber-950/80 text-amber-400 border border-amber-800'
                          : isUnlocked
                          ? 'bg-amber-500 text-slate-950 animate-bounce'
                          : 'bg-slate-800 text-slate-500'
                      }`}
                    >
                      <Gift className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white">
                        {box.title}
                      </h3>
                      <span className="text-xs font-mono text-amber-400">
                        Bonus +{box.bonusXp} XP · Kode: {box.codeWord}
                      </span>
                    </div>
                  </div>

                  {isClaimed ? (
                    <span className="text-xs text-emerald-400 flex items-center gap-1 font-medium">
                      <CheckCircle className="w-4 h-4" /> Terbuka
                    </span>
                  ) : isUnlocked ? (
                    <button
                      onClick={() => {
                        soundManager.playMysteryReveal();
                        onClaimBox(box.id, box.bonusXp);
                      }}
                      className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded-lg transition-colors cursor-pointer shadow-sm"
                    >
                      Buka Rahasia!
                    </button>
                  ) : (
                    <span className="text-xs text-slate-500 flex items-center gap-1">
                      <Lock className="w-3.5 h-3.5" /> Terbuka di Level {box.unlockLevel}
                    </span>
                  )}
                </div>

                {isClaimed ? (
                  <div className="mt-3 space-y-2 pt-3 border-t border-slate-800/80">
                    <p className="text-xs text-amber-200 font-medium leading-relaxed bg-amber-950/30 p-2.5 rounded-lg border border-amber-900/40">
                      💡 &ldquo;{box.secretFact}&rdquo;
                    </p>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      <strong className="text-white">Analisis Sains: </strong>
                      {box.biologicalInsight}
                    </p>
                  </div>
                ) : isUnlocked ? (
                  <p className="text-xs text-amber-300/90 mt-2">
                    Kotak misteri ini sudah siap dibuka! Klik tombol untuk membaca rahasia biologis dan klaim XP.
                  </p>
                ) : (
                  <p className="text-xs text-slate-500 mt-2">
                    Selesaikan misi Level {box.unlockLevel} terlebih dahulu untuk mendekripsi pesan rahasia ini.
                  </p>
                )}
              </div>
            );
          })}
        </div>

        <div className="text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
