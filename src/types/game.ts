export interface StudentProfile {
  name: string;
  studentId: string;
  madrasah: string;
  className: string;
  xp: number;
  completedLevels: number[];
  levelScores: Record<number, number>;
  levelStars: Record<number, number>;
  hintsUsed: number;
  badges: string[];
  openedMysteryBoxes: number[];
  reflection: {
    favoriteTopic: string;
    biggestChallenge: string;
    healthPledge: string;
    submittedAt?: string;
  };
  startedAt: string;
  lastActive: string;
}

export interface GameLevel {
  id: number;
  title: string;
  subtitle: string;
  tagline: string;
  learningObjective: string;
  xpReward: number;
  icon: string;
  summary: string;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  requirement: string;
}

export interface MysteryBox {
  id: number;
  unlockLevel: number;
  title: string;
  secretFact: string;
  biologicalInsight: string;
  bonusXp: number;
  codeWord: string;
}

export interface TeacherSettings {
  timeAttackDuration: number; // in seconds (30, 60, 90, 0 for unlimited)
  autoUnlockAll: boolean;
  passcode: string;
}

export interface ClassStudentData {
  id: number;
  noAbsen: number;
  nama: string;
  nisn: string;
  completedLevelsCount: number;
  xp: number;
  status: 'Belum Mulai' | 'Sedang Belajar' | 'Misi Selesai';
  needRemediation: boolean;
  notes: string;
}
