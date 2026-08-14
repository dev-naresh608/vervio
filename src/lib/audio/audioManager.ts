import { playSynthesizedSound, type SoundName } from './sounds';
import { speakTopicTitle, getAvailableVoices, cancelSpeech } from './voice';
import type { AppSettings } from '../../types';

class AudioManager {
  private soundEffectsEnabled = true;
  private soundVolume = 0.5;
  private voiceFeedbackEnabled = false;
  private speechRate = 1.0;
  private selectedVoiceURI?: string;

  public configure(settings: Partial<AppSettings>): void {
    if (settings.soundEffectsEnabled !== undefined) {
      this.soundEffectsEnabled = settings.soundEffectsEnabled;
    }
    if (settings.soundVolume !== undefined) {
      this.soundVolume = settings.soundVolume;
    }
    if (settings.voiceFeedbackEnabled !== undefined) {
      this.voiceFeedbackEnabled = settings.voiceFeedbackEnabled;
    }
    if (settings.speechRate !== undefined) {
      this.speechRate = settings.speechRate;
    }
    if (settings.selectedVoiceURI !== undefined) {
      this.selectedVoiceURI = settings.selectedVoiceURI;
    }
  }

  public play(name: SoundName): void {
    if (!this.soundEffectsEnabled || this.soundVolume <= 0) return;
    playSynthesizedSound(name, this.soundVolume);
  }

  public speakTopic(topicTitle: string): void {
    if (!this.voiceFeedbackEnabled) return;
    // Small delay so voice begins after topic transition chime
    setTimeout(() => {
      speakTopicTitle(topicTitle, {
        rate: this.speechRate,
        voiceURI: this.selectedVoiceURI,
        volume: this.soundVolume,
      });
    }, 150);
  }

  public stopSpeech(): void {
    cancelSpeech();
  }

  public getVoices(): SpeechSynthesisVoice[] {
    return getAvailableVoices();
  }
}

export const audioManager = new AudioManager();
