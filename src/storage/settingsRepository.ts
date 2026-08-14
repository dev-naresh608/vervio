import { getDB } from './db';
import type { AppSettings } from '../types';

const SETTINGS_KEY = 'app_settings';

export const DEFAULT_SETTINGS: AppSettings = {
  defaultLearningDuration: 10,
  defaultSpeakingDuration: 1,
  includeDefaultTopics: true,
  includeCustomTopics: true,
  hasCustomDirectory: false,

  soundEffectsEnabled: true,
  soundVolume: 0.5,
  voiceFeedbackEnabled: false,
  speechRate: 1.0,
  selectedVoiceURI: undefined,
};

export async function getSettings(): Promise<AppSettings> {
  try {
    const db = await getDB();
    const settings = await db.get('settings', SETTINGS_KEY);
    return settings ? { ...DEFAULT_SETTINGS, ...settings } : DEFAULT_SETTINGS;
  } catch (err) {
    console.error('Error fetching settings:', err);
    return DEFAULT_SETTINGS;
  }
}

export async function saveSettings(settings: Partial<AppSettings>): Promise<AppSettings> {
  const current = await getSettings();
  const updated: AppSettings = { ...current, ...settings };
  const db = await getDB();
  await db.put('settings', { ...updated, id: SETTINGS_KEY } as AppSettings & { id: string });
  return updated;
}
