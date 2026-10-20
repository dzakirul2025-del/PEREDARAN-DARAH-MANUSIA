import React, { useState } from 'react';
import { HelpCircle, X, Lightbulb, Compass, AlertCircle } from 'lucide-react';
import { soundManager } from '../utils/soundEffects';

interface HintModalProps {
  isOpen: boolean;
  onClose: () => void;
  levelId: number;
  tier1Hint: string;
  tier2Hint: string;
  onUseHint: () => void;
}

export const HintModal: React.FC<HintModalProps> = ({
  isOpen,
  onClose,
  levelId,
  tier1Hint,
  tier2Hint,
  onUseHint
}) => {
  const [unlockedTier2, setUnlockedTier2] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-5">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-cyan-950 text-cyan-400 border border-cyan-800 flex items-center justify-center">
              <HelpCircle className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">
                Pusat Bantuan Bio-Detektif (Level {levelId})
              </h3>
              <p className="text-xs text-slate-400">
                Gunakan petunjuk bertahap untuk memandu logika berpikirmu
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

        {/* Tier 1 Hint: Clue / Direction */}
        <div className="p-4 rounded-xl bg-slate-950 border border-cyan-900/40 space-y-2">
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider">
            <Compass className="w-4 h-4" />
            Tingkat 1: Petunjuk Arah Logika
          </div>
          <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
            {tier1Hint}
          </p>
        </div>

        {/* Tier 2 Hint: Scientific Scaffolding */}
        {unlockedTier2 ? (
          <div className="p-4 rounded-xl bg-slate-950 border border-amber-900/50 space-y-2 animate-in fade-in duration-200">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
              <Lightbulb className="w-4 h-4" />
              Tingkat 2: Petunjuk Konsep Mendalam
            </div>
            <p className="text-xs md:text-sm text-amber-200/90 leading-relaxed">
              {tier2Hint}
            </p>
          </div>
        ) : (
          <div className="p-4 rounded-xl bg-slate-950/40 border border-slate-800 flex items-center justify-between gap-4">
            <div className="text-xs text-slate-400 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-slate-500 shrink-0" />
              <span>Masih buntu? Buka petunjuk konsep lanjutan.</span>
            </div>
            <button
              onClick={() => {
                soundManager.playClick();
                setUnlockedTier2(true);
                onUseHint();
              }}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-lg transition-colors shrink-0 cursor-pointer"
            >
              Buka Tingkat 2
            </button>
          </div>
        )}

        <div className="flex justify-between items-center pt-2">
          <span className="text-[11px] text-slate-500">
            *Detektif mandiri mencoba berpikir sendiri sebelum membuka petunjuk
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
          >
            Lanjutkan Misi
          </button>
        </div>
      </div>
    </div>
  );
};
