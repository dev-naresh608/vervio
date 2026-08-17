import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { TopicCategory, Topic, SelectedDifficulties, Recording } from '../types';
import { getSettings } from '../storage/settingsRepository';

interface PracticeContextType {
  selectedCategory: TopicCategory | null;
  setSelectedCategory: (cat: TopicCategory | null) => void;
  selectedTopic: Topic | null;
  setSelectedTopic: (topic: Topic | null) => void;
  selectedDifficulties: SelectedDifficulties;
  setSelectedDifficulties: (diffs: SelectedDifficulties) => void;
  learningDurationMinutes: number;
  setLearningDurationMinutes: (mins: number) => void;
  speakingDurationMinutes: number;
  setSpeakingDurationMinutes: (mins: number) => void;
  lastSavedBlobUrl: string | undefined;
  setLastSavedBlobUrl: (url: string | undefined) => void;
  completedRecording: Recording | undefined;
  setCompletedRecording: (rec: Recording | undefined) => void;
  activeStream: MediaStream | null;
  setActiveStream: (stream: MediaStream | null) => void;
  applyPreset: (preset: 'easy' | 'medium' | 'hard' | 'easy-medium' | 'all') => void;
  reloadDefaultSettings: () => Promise<void>;
}

const DEFAULT_DIFFICULTIES: SelectedDifficulties = {
  easy: true,
  medium: true,
  hard: true,
};

const PracticeContext = createContext<PracticeContextType | null>(null);

export const PracticeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedCategory, setSelectedCategory] = useState<TopicCategory | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [selectedDifficulties, setSelectedDifficulties] = useState<SelectedDifficulties>(DEFAULT_DIFFICULTIES);
  const [learningDurationMinutes, setLearningDurationMinutes] = useState<number>(10);
  const [speakingDurationMinutes, setSpeakingDurationMinutes] = useState<number>(1);
  const [lastSavedBlobUrl, setLastSavedBlobUrl] = useState<string | undefined>(undefined);
  const [completedRecording, setCompletedRecording] = useState<Recording | undefined>(undefined);
  const [activeStream, setActiveStream] = useState<MediaStream | null>(null);

  const reloadDefaultSettings = useCallback(async () => {
    try {
      const settings = await getSettings();
      if (settings) {
        if (typeof settings.defaultLearningDuration === 'number') {
          setLearningDurationMinutes(settings.defaultLearningDuration);
        }
        if (typeof settings.defaultSpeakingDuration === 'number') {
          setSpeakingDurationMinutes(settings.defaultSpeakingDuration);
        }
      }
    } catch (err) {
      console.error('Error loading settings into context:', err);
    }
  }, []);

  useEffect(() => {
    reloadDefaultSettings();
  }, [reloadDefaultSettings]);

  const applyPreset = (preset: 'easy' | 'medium' | 'hard' | 'easy-medium' | 'all') => {
    switch (preset) {
      case 'easy':
        setSelectedDifficulties({ easy: true, medium: false, hard: false });
        break;
      case 'medium':
        setSelectedDifficulties({ easy: false, medium: true, hard: false });
        break;
      case 'hard':
        setSelectedDifficulties({ easy: false, medium: false, hard: true });
        break;
      case 'easy-medium':
        setSelectedDifficulties({ easy: true, medium: true, hard: false });
        break;
      case 'all':
        setSelectedDifficulties({ easy: true, medium: true, hard: true });
        break;
    }
  };

  return (
    <PracticeContext.Provider
      value={{
        selectedCategory,
        setSelectedCategory,
        selectedTopic,
        setSelectedTopic,
        selectedDifficulties,
        setSelectedDifficulties,
        learningDurationMinutes,
        setLearningDurationMinutes,
        speakingDurationMinutes,
        setSpeakingDurationMinutes,
        lastSavedBlobUrl,
        setLastSavedBlobUrl,
        completedRecording,
        setCompletedRecording,
        activeStream,
        setActiveStream,
        applyPreset,
        reloadDefaultSettings,
      }}
    >
      {children}
    </PracticeContext.Provider>
  );
};

export function usePracticeContext() {
  const ctx = useContext(PracticeContext);
  if (!ctx) {
    throw new Error('usePracticeContext must be used within a PracticeProvider');
  }
  return ctx;
}
