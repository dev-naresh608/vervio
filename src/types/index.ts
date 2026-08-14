export type DifficultyLevel = 'easy' | 'medium' | 'hard';

export type Topic = {
  id: string;
  title: string;
};

export type TopicBuckets = {
  easy: Topic[];
  medium: Topic[];
  hard: Topic[];
};

export type TopicCategory = {
  id: string;
  name: string;
  topics: TopicBuckets;
  source: 'default' | 'custom';
  createdAt: string;
  updatedAt: string;
  iconName?: string;
  description?: string;
  topicCounts?: {
    easy: number;
    medium: number;
    hard: number;
    total: number;
  };
};

export type SelectedDifficulties = {
  easy: boolean;
  medium: boolean;
  hard: boolean;
};

export type RecordingStorageType = 'filesystem' | 'download';

export type Recording = {
  id: string;
  topicId: string;
  topicTitle: string;
  categoryId: string;
  categoryName: string;
  duration: number; // in seconds
  fileName: string;
  mimeType: string;
  fileSize: number; // in bytes
  recordedAt: string;
  storageType: RecordingStorageType;
  videoBlobUrl?: string;
  videoBlob?: Blob;
};

export type AppSettings = {
  defaultLearningDuration: number; // minutes: 5, 10, 15
  defaultSpeakingDuration: number; // minutes: 1, 2, 3
  includeDefaultTopics: boolean;
  includeCustomTopics: boolean;
  hasCustomDirectory: boolean;
  directoryName?: string;

  // Sound & Voice Feedback Settings
  soundEffectsEnabled: boolean;
  soundVolume: number; // 0.0 to 1.0
  voiceFeedbackEnabled: boolean;
  speechRate: number; // 0.8, 1.0, 1.2
  selectedVoiceURI?: string;
};

export type PracticeStep = 
  | 'idle'
  | 'topic-selected'
  | 'learning'
  | 'ready-to-speak'
  | 'speaking'
  | 'processing'
  | 'completed';
