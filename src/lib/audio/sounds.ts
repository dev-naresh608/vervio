export type SoundName =
  | 'shuffle'
  | 'topicSelected'
  | 'recordStart'
  | 'recordStop'
  | 'saveSuccess'
  | 'timerComplete'
  | 'error';

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

export function playSynthesizedSound(name: SoundName, volume = 0.5): void {
  if (volume <= 0) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(Math.min(1, Math.max(0, volume)), now);
    masterGain.connect(ctx.destination);

    switch (name) {
      case 'shuffle': {
        // Short tick/whoosh
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(600, now);
        osc.frequency.exponentialRampToValueAtTime(200, now + 0.05);
        gain.gain.setValueAtTime(0.3 * volume, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
        osc.connect(gain);
        gain.connect(masterGain);
        osc.start(now);
        osc.stop(now + 0.05);
        break;
      }

      case 'topicSelected': {
        // Soft dual tone C5 (523Hz) -> E5 (659Hz)
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain = ctx.createGain();
        osc1.type = 'sine';
        osc2.type = 'sine';
        osc1.frequency.setValueAtTime(523.25, now);
        osc2.frequency.setValueAtTime(659.25, now + 0.06);

        gain.gain.setValueAtTime(0.2 * volume, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(masterGain);

        osc1.start(now);
        osc1.stop(now + 0.09);
        osc2.start(now + 0.06);
        osc2.stop(now + 0.18);
        break;
      }

      case 'recordStart': {
        // High crisp chime 880Hz
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, now);
        gain.gain.setValueAtTime(0.25 * volume, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
        osc.connect(gain);
        gain.connect(masterGain);
        osc.start(now);
        osc.stop(now + 0.12);
        break;
      }

      case 'recordStop': {
        // Soft low stop tick 300Hz
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(320, now);
        osc.frequency.exponentialRampToValueAtTime(180, now + 0.08);
        gain.gain.setValueAtTime(0.25 * volume, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
        osc.connect(gain);
        gain.connect(masterGain);
        osc.start(now);
        osc.stop(now + 0.08);
        break;
      }

      case 'saveSuccess': {
        // Soft triple ascending chime C5 (523Hz) -> E5 (659Hz) -> G5 (784Hz)
        const notes = [523.25, 659.25, 783.99];
        notes.forEach((freq, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          const startTime = now + i * 0.07;
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, startTime);
          gain.gain.setValueAtTime(0.18 * volume, startTime);
          gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.12);
          osc.connect(gain);
          gain.connect(masterGain);
          osc.start(startTime);
          osc.stop(startTime + 0.12);
        });
        break;
      }

      case 'timerComplete': {
        // Dual completion chime 440Hz -> 880Hz
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain = ctx.createGain();
        osc1.type = 'sine';
        osc2.type = 'sine';
        osc1.frequency.setValueAtTime(440, now);
        osc2.frequency.setValueAtTime(880, now + 0.1);
        gain.gain.setValueAtTime(0.2 * volume, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(masterGain);
        osc1.start(now);
        osc1.stop(now + 0.12);
        osc2.start(now + 0.1);
        osc2.stop(now + 0.25);
        break;
      }

      case 'error': {
        // Low single error tone 220Hz
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(220, now);
        gain.gain.setValueAtTime(0.2 * volume, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
        osc.connect(gain);
        gain.connect(masterGain);
        osc.start(now);
        osc.stop(now + 0.15);
        break;
      }
    }
  } catch (err) {
    console.warn('Web Audio playback error:', err);
  }
}
