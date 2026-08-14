export function isSpeechSynthesisSupported(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
}

export function getAvailableVoices(): SpeechSynthesisVoice[] {
  if (!isSpeechSynthesisSupported()) return [];
  return window.speechSynthesis.getVoices();
}

export interface SpeakOptions {
  rate?: number; // 0.8, 1.0, 1.2
  voiceURI?: string;
  volume?: number;
}

export function speakTopicTitle(title: string, options: SpeakOptions = {}): void {
  if (!isSpeechSynthesisSupported()) return;

  try {
    // Cancel any active speech
    window.speechSynthesis.cancel();

    const text = `Your topic is: ${title}`;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = options.rate || 1.0;
    utterance.volume = options.volume !== undefined ? options.volume : 1.0;

    if (options.voiceURI) {
      const voices = getAvailableVoices();
      const selected = voices.find(v => v.voiceURI === options.voiceURI);
      if (selected) {
        utterance.voice = selected;
      }
    }

    window.speechSynthesis.speak(utterance);
  } catch (err) {
    console.warn('SpeechSynthesis error:', err);
  }
}

export function cancelSpeech(): void {
  if (isSpeechSynthesisSupported()) {
    try {
      window.speechSynthesis.cancel();
    } catch {
      // ignore
    }
  }
}
