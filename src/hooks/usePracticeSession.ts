import { useState, useCallback } from 'react';
import type { TopicCategory, Topic, PracticeStep, SelectedDifficulties, Recording } from '../types';
import { saveRecordingFile, generateRecordingFileName } from '../storage/filesystem';
import { addRecording } from '../storage/recordingsRepository';

export function usePracticeSession() {
  const [step, setStep] = useState<PracticeStep>('idle');
  const [selectedCategory, setSelectedCategory] = useState<TopicCategory | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [selectedDifficulties, setSelectedDifficulties] = useState<SelectedDifficulties>({
    easy: true,
    medium: true,
    hard: true,
  });
  const [learningDurationMinutes, setLearningDurationMinutes] = useState<number>(10);
  const [speakingDurationMinutes, setSpeakingDurationMinutes] = useState<number>(1);
  const [recentTopicIds, setRecentTopicIds] = useState<string[]>([]);
  const [completedRecording, setCompletedRecording] = useState<Recording | null>(null);
  const [lastSavedBlobUrl, setLastSavedBlobUrl] = useState<string | null>(null);

  const applyPreset = useCallback((preset: 'easy' | 'medium' | 'hard' | 'easy-medium' | 'all') => {
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
      default:
        setSelectedDifficulties({ easy: true, medium: true, hard: true });
        break;
    }
  }, []);

  const startCategoryPractice = useCallback(
    (
      category: TopicCategory,
      getRandomTopicFn: (cat: TopicCategory, diffs: SelectedDifficulties, exclude: string[]) => Topic | null
    ) => {
      setSelectedCategory(category);
      const initialDiffs = { easy: true, medium: true, hard: true };
      setSelectedDifficulties(initialDiffs);
      const initialTopic = getRandomTopicFn(category, initialDiffs, []);
      setSelectedTopic(initialTopic);
      if (initialTopic) {
        setRecentTopicIds([initialTopic.id]);
      }
      setStep('topic-selected');
    },
    []
  );

  const shuffleTopic = useCallback(
    (getRandomTopicFn: (cat: TopicCategory, diffs: SelectedDifficulties, exclude: string[]) => Topic | null) => {
      if (!selectedCategory) return;
      const nextTopic = getRandomTopicFn(selectedCategory, selectedDifficulties, recentTopicIds);
      setSelectedTopic(nextTopic);
      if (nextTopic) {
        setRecentTopicIds(prev => [...prev.slice(-10), nextTopic.id]);
      }
    },
    [selectedCategory, selectedDifficulties, recentTopicIds]
  );

  const startLearning = useCallback(() => {
    setStep('learning');
  }, []);

  const goToSpeakingPrep = useCallback(() => {
    setStep('ready-to-speak');
  }, []);

  const startSpeaking = useCallback(() => {
    setStep('speaking');
  }, []);

  const handleRecordingFinished = useCallback(
    async (blob: Blob, mimeType: string, actualDurationSec: number) => {
      if (!selectedTopic || !selectedCategory) return;

      setStep('processing');
      const fileName = generateRecordingFileName(selectedTopic.title);

      try {
        const saveResult = await saveRecordingFile(blob, fileName);
        const videoBlobUrl = URL.createObjectURL(blob);
        setLastSavedBlobUrl(videoBlobUrl);

        const recEntry = await addRecording({
          topicId: selectedTopic.id,
          topicTitle: selectedTopic.title,
          categoryId: selectedCategory.id,
          categoryName: selectedCategory.name,
          duration: actualDurationSec || speakingDurationMinutes * 60,
          fileName,
          mimeType,
          fileSize: blob.size,
          storageType: saveResult.storageType,
          videoBlobUrl,
          videoBlob: blob,
        });

        setCompletedRecording(recEntry);
        setStep('completed');
      } catch (err) {
        console.error('Error saving recording session:', err);
        setStep('completed');
      }
    },
    [selectedTopic, selectedCategory, speakingDurationMinutes]
  );

  const resetSession = useCallback(() => {
    setStep('idle');
    setSelectedCategory(null);
    setSelectedTopic(null);
    setCompletedRecording(null);
    if (lastSavedBlobUrl) {
      URL.revokeObjectURL(lastSavedBlobUrl);
      setLastSavedBlobUrl(null);
    }
  }, [lastSavedBlobUrl]);

  return {
    step,
    selectedCategory,
    selectedTopic,
    selectedDifficulties,
    setSelectedDifficulties,
    applyPreset,
    learningDurationMinutes,
    setLearningDurationMinutes,
    speakingDurationMinutes,
    setSpeakingDurationMinutes,
    completedRecording,
    lastSavedBlobUrl,
    startCategoryPractice,
    shuffleTopic,
    startLearning,
    goToSpeakingPrep,
    startSpeaking,
    handleRecordingFinished,
    resetSession,
  };
}
