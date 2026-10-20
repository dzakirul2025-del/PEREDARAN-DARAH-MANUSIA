/**
 * Web Audio API synthesizer for sound effects.
 * 100% offline, zero network latency, zero broken assets.
 */

class SoundManager {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;

  constructor() {
    // Read mute preference from localStorage if available
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('bio_detective_muted');
      this.isMuted = saved === 'true';
    }
  }

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (typeof window !== 'undefined') {
      localStorage.setItem('bio_detective_muted', String(this.isMuted));
    }
    return this.isMuted;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  // Lub-dub heart beat sound
  public playHeartbeat(bpm = 75, abnormal = false) {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      // First beat "Lub" (S1 - AV valves closing) - lower pitch
      const osc1 = this.ctx.createOscillator();
      const gain1 = this.ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(abnormal ? 110 : 85, now);
      osc1.frequency.exponentialRampToValueAtTime(abnormal ? 55 : 45, now + 0.12);
      
      gain1.gain.setValueAtTime(0.35, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
      
      osc1.connect(gain1);
      gain1.connect(this.ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.12);

      // Second beat "Dub" (S2 - Semilunar valves closing) - slightly higher pitch, shorter interval
      const delay = abnormal ? 0.18 : 0.22;
      const osc2 = this.ctx.createOscillator();
      const gain2 = this.ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(abnormal ? 140 : 105, now + delay);
      osc2.frequency.exponentialRampToValueAtTime(abnormal ? 70 : 55, now + delay + 0.1);
      
      gain2.gain.setValueAtTime(0.3, now + delay);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.1);
      
      osc2.connect(gain2);
      gain2.connect(this.ctx.destination);
      osc2.start(now + delay);
      osc2.stop(now + delay + 0.1);
    } catch {
      // AudioContext might be blocked until user gesture, ignore safely
    }
  }

  // Crisp button tap click
  public playClick() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(480, now);
      osc.frequency.exponentialRampToValueAtTime(240, now + 0.04);

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.04);
    } catch {
      // Ignored
    }
  }

  // Success chord fanfare
  public playSuccess() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6

      notes.forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);

        gain.gain.setValueAtTime(0.2, now + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.35);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);
        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.35);
      });
    } catch {
      // Ignored
    }
  }

  // Gentle error buzz
  public playError() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.setValueAtTime(110, now + 0.12);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.25);
    } catch {
      // Ignored
    }
  }

  // Ethereal mystery box unlock / clue reveal
  public playMysteryReveal() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const notes = [440, 554.37, 659.25, 880, 1108.73, 1318.51]; // A major arpeggio

      notes.forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.06);

        gain.gain.setValueAtTime(0.25, now + idx * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + 0.4);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);
        osc.start(now + idx * 0.06);
        osc.stop(now + idx * 0.06 + 0.4);
      });
    } catch {
      // Ignored
    }
  }

  // Level up fanfare
  public playLevelUp() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const chordSequence = [
        [440, 554.37, 659.25],       // A major
        [587.33, 739.99, 880],       // D major
        [659.25, 830.61, 987.77],    // E major
        [880, 1108.73, 1318.51, 1760] // High A major
      ];

      chordSequence.forEach((chord, stepIdx) => {
        const stepTime = now + stepIdx * 0.15;
        chord.forEach(freq => {
          const osc = this.ctx!.createOscillator();
          const gain = this.ctx!.createGain();

          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, stepTime);

          gain.gain.setValueAtTime(0.18, stepTime);
          gain.gain.exponentialRampToValueAtTime(0.001, stepTime + (stepIdx === 3 ? 0.7 : 0.22));

          osc.connect(gain);
          gain.connect(this.ctx!.destination);
          osc.start(stepTime);
          osc.stop(stepTime + (stepIdx === 3 ? 0.7 : 0.22));
        });
      });
    } catch {
      // Ignored
    }
  }

  // Emergency medical monitor pulse
  public playEmergencyBeep() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'square';
      osc.frequency.setValueAtTime(880, now);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.08);
    } catch {
      // Ignored
    }
  }
}

export const soundManager = new SoundManager();
