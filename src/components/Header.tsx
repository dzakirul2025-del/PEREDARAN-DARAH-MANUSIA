import React from 'react';
import { Volume2, VolumeX, Shield, User, Sparkles, BookOpen } from 'lucide-react';
import { soundManager } from '../utils/soundEffects';

interface HeaderProps {
  studentName: string;
  xp: number;
  currentLevelId: number;
  isMuted: boolean;
  onToggleMute: () => void;
  onOpenTeacherPanel: () => void;
  onOpenGlossary: () => void;
  onOpenMysteryBoxes: () => void;
  onSelectLevel: (lvl: number) => void;
}

export const Header: React.FC<HeaderProps> = ({
  studentName,
  xp,
  currentLevelId,
  isMuted,
  onToggleMute,
  onOpenTeacherPanel,
  onOpenGlossary,
  onOpenMysteryBoxes,
  onSelectLevel
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Title (One line wordmark) */}
        <div className="flex items-center gap-3 whitespace-nowrap shrink-0">
          <button
            onClick={() => onSelectLevel(1)}
            className="flex items-center gap-2.5 text-left group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 rounded"
          >
            <div className="w-9 h-9 rounded-lg bg-rose-600 flex items-center justify-center text-white shadow-sm shadow-rose-900/40 group-hover:bg-rose-500 transition-colors">
              <svg className="w-5 h-5 animate-pulse" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </div>
            <div>
              <span className="text-base font-bold tracking-tight text-white block">
                Bio-Detektif Sirkulasi
              </span>
              <span className="text-xs text-slate-400 block -mt-0.5">
                MIN 1 Paser · IPAS Kelas VI
              </span>
            </div>
          </button>
        </div>

        {/* Zone 2: Navigation Links (single-line, concise) */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          <button
            onClick={() => onSelectLevel(currentLevelId)}
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer"
          >
            Misi Aktif (Level {currentLevelId})
          </button>
          <button
            onClick={onOpenMysteryBoxes}
            className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer text-amber-300"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            Kotak Misteri
          </button>
          <button
            onClick={onOpenGlossary}
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer"
          >
            <BookOpen className="w-4 h-4 text-cyan-400" />
            Kamus Istilah
          </button>
          <button
            onClick={onOpenTeacherPanel}
            className="hover:text-rose-400 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer text-slate-400"
          >
            <Shield className="w-4 h-4" />
            Portal Guru
          </button>
        </nav>

        {/* Zone 3: Primary Action & User Score */}
        <div className="flex items-center gap-3 shrink-0">
          {/* XP Display */}
          <div className="hidden sm:flex items-center gap-2 text-xs font-mono tabular-nums text-slate-300 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg">
            <span className="text-amber-400 font-bold">★ {xp}</span>
            <span className="text-slate-500">XP</span>
          </div>

          {/* Student Profile Indicator */}
          <div className="flex items-center gap-2 text-xs text-slate-300 bg-slate-900/80 border border-slate-800 px-3 py-1.5 rounded-lg">
            <User className="w-3.5 h-3.5 text-rose-400" />
            <span className="font-medium max-w-[110px] sm:max-w-[140px] truncate">
              {studentName || 'Detektif Siswa'}
            </span>
          </div>

          {/* Audio Mute/Unmute */}
          <button
            onClick={() => {
              onToggleMute();
              soundManager.playClick();
            }}
            title={isMuted ? 'Nyalakan Efek Suara' : 'Bisukan Efek Suara'}
            className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label={isMuted ? 'Nyalakan Suara' : 'Bisukan Suara'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
          </button>
        </div>
      </div>
    </header>
  );
};
