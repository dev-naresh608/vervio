import { useState, useEffect, useCallback } from 'react';
import type { AppSettings } from '../types';
import { getSettings, saveSettings as persistSettings } from '../storage/settingsRepository';
import { audioManager } from '../lib/audio/audioManager';
import { usePracticeContext } from '../context/PracticeContext';

export function useSettings() {
  const [settings, setSettings] = useState<AppSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { reloadDefaultSettings } = usePracticeContext();

  const loadSettings = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getSettings();
      setSettings(data);
      audioManager.configure(data);
    } catch (err) {
      console.error('Error loading settings:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadSettings();
  }, [loadSettings]);

  const updateSettings = useCallback(async (newPartial: Partial<AppSettings>) => {
    const updated = await persistSettings(newPartial);
    setSettings(updated);
    audioManager.configure(updated);
    if (reloadDefaultSettings) {
      await reloadDefaultSettings();
    }
  }, [reloadDefaultSettings]);

  return {
    settings,
    isLoading,
    updateSettings,
    refreshSettings: loadSettings,
  };
}
