// Ambient audio manager using Web Audio API + HTML5 Audio fallback

class SoundController {
  private audioCtx: AudioContext | null = null;
  private isMuted: boolean = true;
  private audioEl: HTMLAudioElement | null = null;
  private droneGain: GainNode | null = null;
  private droneOscillators: OscillatorNode[] = [];
  private isSynthesizing: boolean = false;

  private initContext() {
    if (typeof window === "undefined") return;
    if (!this.audioCtx) {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtxClass) {
        this.audioCtx = new AudioCtxClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === "suspended") {
      this.audioCtx.resume();
    }
  }

  public setMuted(muted: boolean, soundSrc: string = "/audio/ambient.mp3") {
    this.isMuted = muted;
    if (typeof window === "undefined") return;

    if (muted) {
      this.stopDrone();
      if (this.audioEl) {
        this.audioEl.pause();
      }
    } else {
      this.initContext();
      this.playAmbient(soundSrc);
    }
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  private playAmbient(src: string) {
    if (typeof window === "undefined") return;

    if (!this.audioEl) {
      this.audioEl = new Audio(src);
      this.audioEl.loop = true;
      this.audioEl.volume = 0.25;

      this.audioEl.addEventListener("error", () => {
        // Fallback to synthesized ambient pad if mp3 is absent
        if (!this.isMuted && !this.isSynthesizing) {
          this.startSynthesizedPad();
        }
      });
    }

    const playPromise = this.audioEl.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Autoplay policy or 404 - start gentle Web Audio pad
        if (!this.isMuted) {
          this.startSynthesizedPad();
        }
      });
    }
  }

  /**
   * Generates a warm, cinematic, peaceful ambient drone
   * Chord: Warm F/Ab/C/Eb harmonic pad with slow subtle filter modulation
   */
  private startSynthesizedPad() {
    if (!this.audioCtx || this.isSynthesizing) return;
    try {
      this.isSynthesizing = true;
      const ctx = this.audioCtx;

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
      masterGain.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 3);

      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(320, ctx.currentTime);

      // Warm chord frequencies (Hz): F2 (87.31), C3 (130.81), Ab3 (207.65), Eb4 (311.13)
      const freqs = [87.31, 130.81, 207.65, 311.13];
      this.droneOscillators = [];

      freqs.forEach((f, i) => {
        const osc = ctx.createOscillator();
        osc.type = "sine";
        // subtle detune for warm chorus feel
        osc.frequency.setValueAtTime(f + (i % 2 === 0 ? 0.3 : -0.3), ctx.currentTime);

        const subGain = ctx.createGain();
        subGain.gain.setValueAtTime(0.25, ctx.currentTime);

        osc.connect(subGain);
        subGain.connect(filter);
        osc.start();
        this.droneOscillators.push(osc);
      });

      filter.connect(masterGain);
      masterGain.connect(ctx.destination);
      this.droneGain = masterGain;
    } catch {
      // Audio not permitted or supported
    }
  }

  private stopDrone() {
    if (this.droneGain && this.audioCtx) {
      try {
        this.droneGain.gain.setValueAtTime(this.droneGain.gain.value, this.audioCtx.currentTime);
        this.droneGain.gain.exponentialRampToValueAtTime(0.0001, this.audioCtx.currentTime + 1.2);
        setTimeout(() => {
          this.droneOscillators.forEach((osc) => {
            try {
              osc.stop();
              osc.disconnect();
            } catch {}
          });
          this.droneOscillators = [];
          this.isSynthesizing = false;
        }, 1300);
      } catch {
        this.isSynthesizing = false;
      }
    }
  }

  /**
   * Subtle glass bell/star chime when clicking an interactive item
   */
  public playChime(freq = 587.33) {
    if (this.isMuted) return;
    this.initContext();
    if (!this.audioCtx) return;

    try {
      const ctx = this.audioCtx;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.5);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 1.5);
    } catch {}
  }
}

export const soundManager = new SoundController();
