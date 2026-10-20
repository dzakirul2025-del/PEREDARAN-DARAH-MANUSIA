import React, { useState, useEffect } from 'react';
import { StudentProfile } from './types/game';
import { MADRASAH_INFO, GAME_BADGES, GAME_LEVELS } from './data/curriculumData';
import { INITIAL_STUDENTS } from './data/classStudents';
import { soundManager } from './utils/soundEffects';

import { Header } from './components/Header';
import { MissionBoard } from './components/MissionBoard';
import { MysteryBoxModal } from './components/MysteryBoxModal';
import { HintModal } from './components/HintModal';
import { GlossaryModal } from './components/GlossaryModal';
import { TeacherPanel } from './components/TeacherPanel';
import { CertificateView } from './components/CertificateView';
import { StudentSelectModal } from './components/StudentSelectModal';

import { Level1UnknownSignal } from './components/levels/Level1UnknownSignal';
import { Level2HeartAnatomy } from './components/levels/Level2HeartAnatomy';
import { Level3CirculationRoutes } from './components/levels/Level3CirculationRoutes';
import { Level4BloodHematology } from './components/levels/Level4BloodHematology';
import { Level5MedicalDetective } from './components/levels/Level5MedicalDetective';
import { Level6BossRescue } from './components/levels/Level6BossRescue';
import { Level7UltimateQuest } from './components/levels/Level7UltimateQuest';

import { ArrowLeft, UserCircle2, ChevronRight, Sparkles, BookOpen, Shield } from 'lucide-react';

const STORAGE_KEY = 'bio_detective_paser_profile';

const DEFAULT_PROFILE: StudentProfile = {
  name: 'AHMAD ALFINAJA',
  studentId: '0128392001',
  madrasah: MADRASAH_INFO.name,
  className: 'Kelas VI',
  xp: 0,
  completedLevels: [],
  levelScores: {},
  levelStars: {},
  hintsUsed: 0,
  badges: [],
  openedMysteryBoxes: [],
  reflection: {
    favoriteTopic: '',
    biggestChallenge: '',
    healthPledge: ''
  },
  startedAt: new Date().toISOString(),
  lastActive: new Date().toISOString()
};

export default function App() {
  const [profile, setProfile] = useState<StudentProfile>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          // If the profile had the old mock name, migrate it to the new roster
          if (parsed.name === 'Ahmad Faiz Rabbani' || !INITIAL_STUDENTS.some(s => s.nama.toLowerCase() === (parsed.name || '').toLowerCase())) {
            parsed.name = 'AHMAD ALFINAJA';
            parsed.studentId = '0128392001';
          }
          return parsed;
        } catch {
          // Ignore parse errors
        }
      }
    }
    return DEFAULT_PROFILE;
  });

  const [currentLevelId, setCurrentLevelId] = useState<number | null>(null); // null means Mission Board
  const [isMuted, setIsMuted] = useState(soundManager.getIsMuted());

  // Modals
  const [isTeacherPanelOpen, setIsTeacherPanelOpen] = useState(false);
  const [isGlossaryOpen, setIsGlossaryOpen] = useState(false);
  const [isMysteryBoxOpen, setIsMysteryBoxOpen] = useState(false);
  const [isCertificateOpen, setIsCertificateOpen] = useState(false);
  const [isStudentSelectOpen, setIsStudentSelectOpen] = useState(false);

  // Scaffolding Hint State
  const [hintState, setHintState] = useState<{
    isOpen: boolean;
    tier1: string;
    tier2: string;
    levelId: number;
  }>({
    isOpen: false,
    tier1: '',
    tier2: '',
    levelId: 1
  });

  // Teacher settings
  const [timeAttackDuration, setTimeAttackDuration] = useState(60);

  // Save profile to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    }
  }, [profile]);

  const handleToggleMute = () => {
    const muted = soundManager.toggleMute();
    setIsMuted(muted);
  };

  const handleOpenHint = (tier1: string, tier2: string) => {
    setHintState({
      isOpen: true,
      tier1,
      tier2,
      levelId: currentLevelId || 1
    });
  };

  const handleUseHint = () => {
    setProfile(prev => ({
      ...prev,
      hintsUsed: prev.hintsUsed + 1
    }));
  };

  const handleCompleteLevel = (levelId: number, xpEarned: number, stars: number) => {
    setProfile(prev => {
      const alreadyCompleted = prev.completedLevels.includes(levelId);
      const updatedCompleted = alreadyCompleted
        ? prev.completedLevels
        : [...prev.completedLevels, levelId];

      const newXp = prev.xp + (alreadyCompleted ? Math.round(xpEarned * 0.2) : xpEarned);

      // Award specific badges based on level
      const updatedBadges = [...prev.badges];
      if (levelId === 1 && !updatedBadges.includes('first_signal')) updatedBadges.push('first_signal');
      if (levelId === 2 && !updatedBadges.includes('heart_architect')) updatedBadges.push('heart_architect');
      if (levelId === 3 && !updatedBadges.includes('route_navigator')) updatedBadges.push('route_navigator');
      if (levelId === 4 && !updatedBadges.includes('blood_specialist')) updatedBadges.push('blood_specialist');
      if (levelId === 5 && !updatedBadges.includes('master_detective')) updatedBadges.push('master_detective');
      if (levelId === 6 && !updatedBadges.includes('life_savior')) updatedBadges.push('life_savior');
      if (levelId === 7 && !updatedBadges.includes('paser_champion')) updatedBadges.push('paser_champion');

      return {
        ...prev,
        xp: newXp,
        completedLevels: updatedCompleted,
        levelScores: { ...prev.levelScores, [levelId]: xpEarned },
        levelStars: { ...prev.levelStars, [levelId]: Math.max(prev.levelStars[levelId] || 0, stars) },
        badges: updatedBadges,
        lastActive: new Date().toISOString()
      };
    });

    // Auto advance or show celebration
    if (levelId < 7) {
      setCurrentLevelId(levelId + 1);
    } else {
      setIsCertificateOpen(true);
    }
  };

  const handleClaimMysteryBox = (boxId: number, bonusXp: number) => {
    setProfile(prev => {
      if (prev.openedMysteryBoxes.includes(boxId)) return prev;
      return {
        ...prev,
        xp: prev.xp + bonusXp,
        openedMysteryBoxes: [...prev.openedMysteryBoxes, boxId]
      };
    });
  };

  const handleSaveReflection = (fav: string, chal: string, pledge: string) => {
    setProfile(prev => ({
      ...prev,
      reflection: {
        favoriteTopic: fav,
        biggestChallenge: chal,
        healthPledge: pledge,
        submittedAt: new Date().toISOString()
      }
    }));
  };

  const handleUnlockAll = () => {
    setProfile(prev => ({
      ...prev,
      completedLevels: [1, 2, 3, 4, 5, 6, 7],
      xp: Math.max(prev.xp, 2250),
      badges: GAME_BADGES.map(b => b.id)
    }));
  };

  const handleResetProgress = () => {
    const fresh: StudentProfile = {
      ...DEFAULT_PROFILE,
      name: profile.name,
      studentId: profile.studentId,
      startedAt: new Date().toISOString()
    };
    setProfile(fresh);
    setCurrentLevelId(null);
  };

  const handleSelectStudentProfile = (studentName: string, nisn: string) => {
    setProfile(prev => ({
      ...prev,
      name: studentName,
      studentId: nisn
    }));
    setIsStudentSelectOpen(false);
    soundManager.playClick();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-rose-500 selection:text-white">
      {/* Top Bar Header */}
      <Header
        studentName={profile.name}
        xp={profile.xp}
        currentLevelId={currentLevelId || 1}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        onOpenTeacherPanel={() => {
          soundManager.playClick();
          setIsTeacherPanelOpen(true);
        }}
        onOpenGlossary={() => {
          soundManager.playClick();
          setIsGlossaryOpen(true);
        }}
        onOpenMysteryBoxes={() => {
          soundManager.playClick();
          setIsMysteryBoxOpen(true);
        }}
        onSelectLevel={(lvl) => {
          soundManager.playClick();
          setCurrentLevelId(lvl);
        }}
      />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1">
        {/* Sub-header Controls when inside a specific Level */}
        {currentLevelId !== null ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <button
                onClick={() => {
                  soundManager.playClick();
                  setCurrentLevelId(null);
                }}
                className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:bg-slate-800 text-xs text-slate-300 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Peta Misi (Mission Board)</span>
              </button>

              <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                <span>Level {currentLevelId} dari 7</span>
                <span aria-hidden="true">·</span>
                <span className="text-amber-400 font-bold">{profile.xp} XP</span>
              </div>
            </div>

            {/* Render Specific Level Component */}
            {currentLevelId === 1 && (
              <Level1UnknownSignal
                onComplete={(xp, stars) => handleCompleteLevel(1, xp, stars)}
                onOpenHint={handleOpenHint}
              />
            )}
            {currentLevelId === 2 && (
              <Level2HeartAnatomy
                onComplete={(xp, stars) => handleCompleteLevel(2, xp, stars)}
                onOpenHint={handleOpenHint}
              />
            )}
            {currentLevelId === 3 && (
              <Level3CirculationRoutes
                onComplete={(xp, stars) => handleCompleteLevel(3, xp, stars)}
                onOpenHint={handleOpenHint}
              />
            )}
            {currentLevelId === 4 && (
              <Level4BloodHematology
                onComplete={(xp, stars) => handleCompleteLevel(4, xp, stars)}
                onOpenHint={handleOpenHint}
                timerDurationSeconds={timeAttackDuration}
              />
            )}
            {currentLevelId === 5 && (
              <Level5MedicalDetective
                onComplete={(xp, stars) => handleCompleteLevel(5, xp, stars)}
                onOpenHint={handleOpenHint}
              />
            )}
            {currentLevelId === 6 && (
              <Level6BossRescue
                onComplete={(xp, stars) => handleCompleteLevel(6, xp, stars)}
                onOpenHint={handleOpenHint}
              />
            )}
            {currentLevelId === 7 && (
              <Level7UltimateQuest
                studentName={profile.name}
                onComplete={(xp, stars) => handleCompleteLevel(7, xp, stars)}
                onOpenCertificate={() => setIsCertificateOpen(true)}
                onSaveReflection={handleSaveReflection}
                onOpenHint={handleOpenHint}
              />
            )}
          </div>
        ) : (
          /* Mission Board View */
          <div className="space-y-6">
            {/* Student profile switcher banner */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <UserCircle2 className="w-4 h-4 text-cyan-400" />
                <span>Detektif Aktif: <strong className="text-white">{profile.name}</strong> ({profile.className} {MADRASAH_INFO.name})</span>
              </div>
              <button
                onClick={() => setIsStudentSelectOpen(true)}
                className="text-cyan-400 hover:text-cyan-300 text-xs font-semibold cursor-pointer flex items-center gap-1"
              >
                Pilih Nama Siswa dari Daftar 27 Siswa →
              </button>
            </div>

            <MissionBoard
              profile={profile}
              currentLevelId={profile.completedLevels.length + 1}
              onSelectLevel={(lvl) => setCurrentLevelId(lvl)}
              onOpenMysteryBox={() => setIsMysteryBoxOpen(true)}
              onOpenCertificate={() => setIsCertificateOpen(true)}
            />
          </div>
        )}
      </main>

      {/* Student Profile Switcher Modal */}
      {isStudentSelectOpen && (
        <StudentSelectModal
          currentStudentName={profile.name}
          onClose={() => setIsStudentSelectOpen(false)}
          onSelectStudent={handleSelectStudentProfile}
        />
      )}

      {/* Interactive Modals */}
      <MysteryBoxModal
        isOpen={isMysteryBoxOpen}
        onClose={() => setIsMysteryBoxOpen(false)}
        openedBoxes={profile.openedMysteryBoxes}
        completedLevels={profile.completedLevels}
        onClaimBox={handleClaimMysteryBox}
      />

      <HintModal
        isOpen={hintState.isOpen}
        onClose={() => setHintState(prev => ({ ...prev, isOpen: false }))}
        levelId={hintState.levelId}
        tier1Hint={hintState.tier1}
        tier2Hint={hintState.tier2}
        onUseHint={handleUseHint}
      />

      <GlossaryModal
        isOpen={isGlossaryOpen}
        onClose={() => setIsGlossaryOpen(false)}
      />

      <TeacherPanel
        isOpen={isTeacherPanelOpen}
        onClose={() => setIsTeacherPanelOpen(false)}
        timeAttackDuration={timeAttackDuration}
        onUpdateTimeAttack={(sec) => setTimeAttackDuration(sec)}
        onUnlockAllLevels={handleUnlockAll}
        onResetStudentProgress={handleResetProgress}
        completedLevelsCount={profile.completedLevels.length}
      />

      <CertificateView
        isOpen={isCertificateOpen}
        onClose={() => setIsCertificateOpen(false)}
        profile={profile}
      />

      {/* Quiet Footer (Anti-slop compliant) */}
      <footer className="no-print border-t border-slate-800/80 bg-slate-950/80 py-6 mt-12 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-slate-400">
            © {new Date().getFullYear()} {MADRASAH_INFO.name} · IPAS Fase C Kurikulum Merdeka
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Kabupaten Paser</span>
            <span aria-hidden="true">·</span>
            <span>27 Siswa Aktif</span>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => {
                soundManager.playClick();
                setIsTeacherPanelOpen(true);
              }}
              className="text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              Mode Guru
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
