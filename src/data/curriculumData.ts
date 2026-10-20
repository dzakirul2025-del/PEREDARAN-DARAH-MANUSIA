import { Badge, GameLevel, MysteryBox } from '../types/game';

export const MADRASAH_INFO = {
  name: 'MIN 1 Paser',
  location: 'Kabupaten Paser, Kalimantan Timur',
  level: 'Madrasah Ibtidaiyah',
  grade: 'Kelas VI (Enam)',
  fase: 'Fase C',
  curriculum: 'Kurikulum Merdeka',
  subject: 'Ilmu Pengetahuan Alam dan Sosial (IPAS)',
  topic: 'Sistem Peredaran Darah Manusia',
  timeAllocation: '3 JP x 30 Menit (90 Menit Total)',
  studentCount: 27,
  learningObjectives: [
    'TP 1: Siswa mampu mengidentifikasi dan mendeskripsikan struktur serta fungsi organ utama peredaran darah manusia (jantung, 4 ruang, katup, pembuluh darah, dan komponen darah).',
    'TP 2: Siswa mampu menganalisis dan memetakan alur sistem peredaran darah besar (sistemik) dan darah kecil (pulmonal) beserta kandungan gas oksigen dan karbon dioksida.',
    'TP 3: Siswa mampu mendiagnosis berbagai penyakit/gangguan sistem peredaran darah manusia (hipertensi, hipotensi, anemia, leukemia, jantung koroner, stroke, varises, hemofilia) berdasarkan gejala klinis.',
    'TP 4: Siswa mampu merumuskan dan berkomitmen menerapkan pola hidup sehat untuk memelihara fungsi optimal sistem peredaran darah dalam keseharian.'
  ]
};

export const GAME_LEVELS: GameLevel[] = [
  {
    id: 1,
    title: 'Level 1: The Unknown Signal',
    subtitle: 'Sinyal Misterius Detak Jantung',
    tagline: 'Anomali darurat terdeteksi pada monitor EKG!',
    learningObjective: 'Mengidentifikasi ritme denyut jantung normal vs anomali serta memahami peran pompa jantung.',
    xpReward: 150,
    icon: 'Activity',
    summary: 'Pasien X kolaps mendadak di lintasan lari. Detak jantung melonjak ke 145 bpm. Pecahkan teka-teki pemantik untuk memulai investigasi!'
  },
  {
    id: 2,
    title: 'Level 2: The First Clue',
    subtitle: 'Anatomi Jantung & Lab Pembuluh Darah',
    tagline: 'Misteri 4 Ruang Jantung & 3 Saluran Kehidupan',
    learningObjective: 'Menganalisis 4 ruang jantung, fungsi katup, dan perbedaan arteri, vena, serta kapiler.',
    xpReward: 200,
    icon: 'Heart',
    summary: 'Rakit dan pasang 4 ruang jantung secara tepat. Bedakan karakteristik pembuluh arteri, vena, dan kapiler!'
  },
  {
    id: 3,
    title: 'Level 3: Brain Breaker',
    subtitle: 'Dua Rute Sirkulasi Kehidupan',
    tagline: 'Teka-teki Rute Sirkulasi Darah Besar & Kecil',
    learningObjective: 'Memetakan urutan aliran darah kecil (pulmonal) dan darah besar (sistemik) beserta saturasi O2 & CO2.',
    xpReward: 250,
    icon: 'GitBranch',
    summary: 'Hubungkan node sirkulasi dari bilik kanan ke paru-paru dan dari bilik kiri ke seluruh tubuh tanpa salah sambung!'
  },
  {
    id: 4,
    title: 'Level 4: Time Attack',
    subtitle: 'Laboratorium Hematologi Cepat',
    tagline: 'Tantangan 60 Detik: Klasifikasi Komponen Darah',
    learningObjective: 'Memilah 4 komponen darah (eritrosit, leukosit, trombosit, plasma darah) berdasarkan fungsi spesifiknya.',
    xpReward: 300,
    icon: 'Timer',
    summary: 'Uji ketangkasan dan pemahaman di bawah mikroskop virtual. Pilah sel darah sebelum waktu habis!'
  },
  {
    id: 5,
    title: 'Level 5: The Hidden Truth',
    subtitle: 'Investigasi Detektif Rekam Medis',
    tagline: 'Pisahkan Fakta dari Jebakan Gejala Palsu!',
    learningObjective: 'Mendiagnosis gangguan peredaran darah (anemia, hipertensi, jantung koroner, leukimia, varises) dari bukti klinis.',
    xpReward: 350,
    icon: 'FileSearch',
    summary: 'Analisis 4 berkas pasien misterius. Singkirkan red herring (pengalih perhatian) dan temukan akar penyakitnya!'
  },
  {
    id: 6,
    title: 'Level 6: Boss Battle',
    subtitle: 'Operasi Penyelamatan Bio-Explorer',
    tagline: 'Misi Kritis Menembus Plak Sumbatan Koroner!',
    learningObjective: 'Menerapkan solusi terintegrasi untuk membersihkan plak arteri dan menstabilkan hemodinamik tubuh.',
    xpReward: 400,
    icon: 'ShieldAlert',
    summary: 'Kendalikan kapsul mikro nanobot. Hancurkan sumbatan kolesterol, atasi penyempitan pembuluh, dan selamatkan Pasien X!'
  },
  {
    id: 7,
    title: 'Level 7: The Ultimate Quest',
    subtitle: 'Formula Rahasia Jantung Sehat & Revelation',
    tagline: 'Buka Brankas Rahasia & Dapatkan Sertifikat Detektif!',
    learningObjective: 'Mengevaluasi pola hidup pencegahan penyakit jantung, menuntaskan asesmen HOTS, dan refleksi diri.',
    xpReward: 500,
    icon: 'Award',
    summary: 'Pecahkan kode brankas 4 pilar gaya hidup sehat, tuntaskan 5 tantangan HOTS pamungkas, dan raih sertifikat resmi MIN 1 Paser!'
  }
];

export const GAME_BADGES: Badge[] = [
  {
    id: 'first_signal',
    title: 'Signal Decoder',
    description: 'Berhasil memecahkan sinyal EKG darurat dan mengaktifkan Bio-Explorer di Level 1.',
    icon: 'Radio',
    requirement: 'Selesaikan Level 1'
  },
  {
    id: 'heart_architect',
    title: 'Heart Architect',
    description: 'Menguasai anatomi 4 ruang jantung dan sifat pembuluh darah di Level 2.',
    icon: 'HeartHandshake',
    requirement: 'Selesaikan Level 2'
  },
  {
    id: 'route_navigator',
    title: 'Circulation Navigator',
    description: 'Menyambung jalur sirkulasi darah besar dan kecil dengan presisi sempurna di Level 3.',
    icon: 'Compass',
    requirement: 'Selesaikan Level 3'
  },
  {
    id: 'blood_specialist',
    title: 'Hematology Master',
    description: 'Menuntaskan pemilahan sel darah di bawah batas waktu Time Attack di Level 4.',
    icon: 'Microscope',
    requirement: 'Selesaikan Level 4'
  },
  {
    id: 'master_detective',
    title: 'Medical Sleuth',
    description: 'Mendiagnosis 4 rekam medis rumit tanpa terpengaruh bukti pengalih di Level 5.',
    icon: 'FileCheck',
    requirement: 'Selesaikan Level 5'
  },
  {
    id: 'life_savior',
    title: 'Life Savior Hero',
    description: 'Berhasil menuntaskan Boss Battle dan membersihkan sumbatan arteri di Level 6.',
    icon: 'ShieldCheck',
    requirement: 'Selesaikan Level 6'
  },
  {
    id: 'paser_champion',
    title: 'Paser Bio-Master',
    description: 'Menyelesaikan seluruh 7 Level, asesmen HOTS, dan ikrar hidup sehat MIN 1 Paser.',
    icon: 'Crown',
    requirement: 'Tuntaskan Level 7 & Ujian HOTS'
  }
];

export const MYSTERY_BOXES: MysteryBox[] = [
  {
    id: 1,
    unlockLevel: 2,
    title: 'Kotak Misteri 1: Rahasia Panjang Pembuluh Darah',
    secretFact: 'Jika seluruh pembuluh darah (arteri, vena, kapiler) dalam satu tubuh manusia disambungkan dari ujung ke ujung, panjangnya mencapai sekitar 100.000 KILOMETER!',
    biologicalInsight: 'Panjang ini setara dengan mengelilingi planet bumi sebanyak 2,5 kali. Kapiler adalah yang terbanyak dan paling tipis!',
    bonusXp: 50,
    codeWord: 'KAPILER-100K'
  },
  {
    id: 2,
    unlockLevel: 4,
    title: 'Kotak Misteri 2: Sang Donatur Tanpa Inti Sel',
    secretFact: 'Sel darah merah (eritrosit) manusia dewasa melepaskan inti selnya sendiri (nukleus) sebelum diedarkan ke seluruh tubuh!',
    biologicalInsight: 'Tanpa inti sel, eritrosit memiliki ruang ekstra untuk menampung lebih dari 250 juta molekul hemoglobin sehingga dapat mengangkut oksigen secara maksimal.',
    bonusXp: 75,
    codeWord: 'HEMOGLOBIN-MAX'
  },
  {
    id: 3,
    unlockLevel: 6,
    title: 'Kotak Misteri 3: Otot yang Tak Pernah Tidur',
    secretFact: 'Jantung manusia berdenyut rata-rata 100.000 kali dalam sehari, dan memompa sekitar 7.500 liter darah setiap hari tanpa henti seumur hidup!',
    biologicalInsight: 'Otot jantung (miokardium) memiliki mitokondria 10 kali lebih padat dibanding otot lurik biasa, menjadikannya mesin paling tahan lelah di alam semesta.',
    bonusXp: 100,
    codeWord: 'MIOKARDIUM-ABADI'
  }
];

export const GLOSSARY_ITEMS = [
  {
    term: 'Jantung',
    meaning: 'Organ berotot seukuran kepalan tangan yang berfungsi sebagai pompa utama sirkulasi darah manusia.'
  },
  {
    term: 'Serambi (Atrium)',
    meaning: 'Dua ruang atas jantung. Serambi kanan menerima darah kaya CO2 dari tubuh, serambi kiri menerima darah kaya O2 dari paru-paru.'
  },
  {
    term: 'Bilik (Ventrikel)',
    meaning: 'Dua ruang bawah jantung dengan dinding lebih tebal. Bilik kanan memompa ke paru-paru, bilik kiri memompa ke seluruh tubuh.'
  },
  {
    term: 'Arteri (Pembuluh Nadi)',
    meaning: 'Pembuluh darah berotot tebal elastis yang mengalirkan darah keluar dari jantung. Mengalirkan darah kaya O2 (kecuali arteri pulmonalis).'
  },
  {
    term: 'Vena (Pembuluh Balik)',
    meaning: 'Pembuluh berdinding lebih tipis yang membawa darah kembali ke jantung. Memiliki katup searah untuk mencegah darah balik arah.'
  },
  {
    term: 'Kapiler',
    meaning: 'Pembuluh mikroskopis setebal satu sel, tempat terjadinya pertukaran gas oksigen, nutrisi, dan limbah karbon dioksida dengan sel tubuh.'
  },
  {
    term: 'Peredaran Darah Kecil',
    meaning: 'Rute: Jantung (Bilik Kanan) -> Arteri Pulmonalis -> Paru-paru -> Vena Pulmonalis -> Jantung (Serambi Kiri).'
  },
  {
    term: 'Peredaran Darah Besar',
    meaning: 'Rute: Jantung (Bilik Kiri) -> Aorta -> Seluruh Tubuh -> Vena Cava -> Jantung (Serambi Kanan).'
  },
  {
    term: 'Hipertensi',
    meaning: 'Tekanan darah tinggi di mana pembacaan tensi melebihi 140/90 mmHg, membebani kerja jantung dan pembuluh darah.'
  },
  {
    term: 'Aterosklerosis',
    meaning: 'Penyempitan dan pengerasan pembuluh darah akibat penumpukan plak lemak (kolesterol jahat), memicu penyakit jantung koroner.'
  }
];
