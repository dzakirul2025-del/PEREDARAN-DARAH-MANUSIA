import React from 'react';
import { GAME_LEVELS, GAME_BADGES, MADRASAH_INFO } from '../data/curriculumData';
import { StudentProfile } from '../types/game';
import { 
  Activity, 
  Heart, 
  GitBranch, 
  Timer, 
  FileSearch, 
  ShieldAlert, 
  Award, 
  Lock, 
  CheckCircle2, 
  Play, 
  Star,
  Award as AwardIcon
} from 'lucide-react';
import { soundManager } from '../utils/soundEffects';

interface MissionBoardProps {
  profile: StudentProfile;
  currentLevelId: number;
  onSelectLevel: (lvl: number) => void;
  onOpenMysteryBox: () => void;
  onOpenCertificate: () => void;
}

const LEVEL_ICONS: Record<string, React.ElementType> = {
  Activity,
  Heart,
  GitBranch,
  Timer,
  FileSearch,
  ShieldAlert,
  Award
};

export const MissionBoard: React.FC<MissionBoardProps> = ({
  profile,
  currentLevelId,
  onSelectLevel,
  onOpenMysteryBox,
  onOpenCertificate
}) => {
  const isLevelCompleted = (id: number) => profile.completedLevels.includes(id);
  const isLevelUnlocked = (id: number) => id === 1 || profile.completedLevels.includes(id - 1);

  const totalPossibleXp = GAME_LEVELS.reduce((acc, lvl) => acc + lvl.xpReward, 0) + 225; // includes mystery boxes
  const progressPercent = Math.min(100, Math.round((profile.xp / totalPossibleXp) * 100));

  return (
    <div className="space-y-8">
      {/* Hero Mission Briefing Card */}
      <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-rose-950/40 p-6 md:p-8">
        <div className="max-w-3xl">
          <div className="text-xs font-semibold text-rose-400 mb-2 tracking-wide uppercase">
            {MADRASAH_INFO.name} · {MADRASAH_INFO.subject} · {MADRASAH_INFO.grade}
          </div>
          <h1 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight leading-tight mb-3">
            Operasi Bio-Detektif: Misteri Sirkulasi Kehidupan
          </h1>
          <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-6">
            Panggilan darurat untuk seluruh detektif sains cilik! Atlet Pasien X kolaps di stadion dengan ritme jantung anomali. 
            Jelajahi 7 level investigasi, bedah rahasia 4 ruang jantung, sambung dua rute sirkulasi, dan taklukkan Boss Battle untuk menyelamatkannya!
          </p>

          {/* Progress Strip */}
          <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-4 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400 font-mono">
              <div>
                <span>Progres Misi: </span>
                <span className="text-white font-bold">{profile.completedLevels.length} dari 7 Selesai</span>
              </div>
              <div className="tabular-nums">
                <span className="text-amber-400 font-bold">{profile.xp} XP</span> / {totalPossibleXp} Max XP ({progressPercent}%)
              </div>
            </div>

            <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-rose-500 via-amber-500 to-emerald-400 h-full rounded-full transition-all duration-700 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-1 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <AwardIcon className="w-4 h-4 text-amber-400" />
                <span>{profile.badges.length} Lencana Diraih</span>
              </div>

              {profile.completedLevels.length === 7 && (
                <button
                  onClick={() => {
                    soundManager.playSuccess();
                    onOpenCertificate();
                  }}
                  className="px-3 py-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold rounded-lg text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <Award className="w-3.5 h-3.5" />
                  Cetak Sertifikat Kelulusan
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Level Selection Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg md:text-xl font-bold text-white tracking-tight">
            Peta Jalur Misi Penyelamatan (7 Level)
          </h2>
          <span className="text-xs text-slate-400">
            Pilih level yang telah terbuka untuk memulai
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {GAME_LEVELS.map((level) => {
            const completed = isLevelCompleted(level.id);
            const unlocked = isLevelUnlocked(level.id);
            const IconComp = LEVEL_ICONS[level.icon] || Activity;
            const stars = profile.levelStars[level.id] || (completed ? 3 : 0);

            return (
              <div
                key={level.id}
                className={`relative rounded-xl border p-5 transition-all duration-200 flex flex-col justify-between ${
                  completed
                    ? 'bg-slate-900/90 border-emerald-500/40 hover:border-emerald-400 shadow-sm'
                    : unlocked
                    ? 'bg-slate-900 border-rose-500/50 hover:border-rose-400 shadow-md shadow-rose-950/20'
                    : 'bg-slate-950/60 border-slate-800/80 opacity-60'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          completed
                            ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                            : unlocked
                            ? 'bg-rose-950 text-rose-400 border border-rose-800 animate-pulse-slow'
                            : 'bg-slate-800 text-slate-500'
                        }`}
                      >
                        <IconComp className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-xs font-mono font-medium text-slate-400 block">
                          Level {level.id}
                        </span>
                        <h3 className="text-sm font-bold text-white line-clamp-1">
                          {level.subtitle}
                        </h3>
                      </div>
                    </div>

                    {completed ? (
                      <span className="text-emerald-400 flex items-center gap-1 text-xs font-medium">
                        <CheckCircle2 className="w-4 h-4" />
                        Tuntas
                      </span>
                    ) : unlocked ? (
                      <span className="text-rose-400 text-xs font-medium flex items-center gap-1">
                        <Play className="w-3.5 h-3.5 fill-current" />
                        Siap
                      </span>
                    ) : (
                      <span className="text-slate-500 flex items-center gap-1 text-xs">
                        <Lock className="w-3.5 h-3.5" />
                        Terkunci
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-300 line-clamp-2 mb-4 leading-relaxed">
                    {level.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1 text-xs font-mono text-amber-400 tabular-nums">
                    <span>+{level.xpReward} XP</span>
                    {completed && (
                      <div className="flex items-center gap-0.5 ml-2 text-amber-400">
                        {Array.from({ length: 3 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${i < stars ? 'fill-amber-400 text-amber-400' : 'text-slate-600'}`}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  <button
                    disabled={!unlocked}
                    onClick={() => {
                      if (unlocked) {
                        soundManager.playClick();
                        onSelectLevel(level.id);
                      }
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      completed
                        ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                        : unlocked
                        ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-sm shadow-rose-900/40'
                        : 'bg-slate-900 text-slate-600 cursor-not-allowed border border-slate-800'
                    }`}
                  >
                    {completed ? 'Main Ulang' : unlocked ? 'Mulai Misi' : 'Terkunci'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Badges Collection & Quick Stats */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">
              Koleksi Lencana Detektif Sirkulasi ({profile.badges.length} / {GAME_BADGES.length})
            </h3>
            <p className="text-xs text-slate-400">
              Penghargaan atas ketelitian dan strategi pemecahan masalahmu
            </p>
          </div>
          <button
            onClick={onOpenMysteryBox}
            className="text-xs text-amber-400 hover:text-amber-300 font-medium cursor-pointer"
          >
            Buka Kotak Misteri ({profile.openedMysteryBoxes.length}/3) →
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {GAME_BADGES.map((badge) => {
            const hasBadge = profile.badges.includes(badge.id);
            return (
              <div
                key={badge.id}
                className={`p-3 rounded-lg border text-left flex items-start gap-3 transition-colors ${
                  hasBadge
                    ? 'bg-slate-900 border-amber-500/40 text-slate-200'
                    : 'bg-slate-950/40 border-slate-800/60 text-slate-500'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-md shrink-0 flex items-center justify-center ${
                    hasBadge ? 'bg-amber-950 text-amber-400 border border-amber-800' : 'bg-slate-800 text-slate-600'
                  }`}
                >
                  <Award className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className={`text-xs font-semibold truncate ${hasBadge ? 'text-white' : 'text-slate-500'}`}>
                    {badge.title}
                  </div>
                  <div className="text-[11px] text-slate-400 line-clamp-2 mt-0.5">
                    {badge.description}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
