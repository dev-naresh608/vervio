import React from 'react';
import type { TopicCategory, Topic, SelectedDifficulties } from '../../../types';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { BookOpen, Mic, AlertCircle, ArrowRight, ListFilter, Sparkles, Shuffle } from 'lucide-react';

interface PracticeSetupCardProps {
  category: TopicCategory;
  selectedDifficulties: SelectedDifficulties;
  onDifficultyToggle: (diff: 'easy' | 'medium' | 'hard') => void;
  onApplyPreset: (preset: 'easy' | 'medium' | 'hard' | 'easy-medium' | 'all') => void;
  poolCount: number;
  learningDurationMinutes: number;
  onLearningDurationChange: (dur: number) => void;
  speakingDurationMinutes: number;
  onSpeakingDurationChange: (dur: number) => void;
  onStartSession: () => void;
  onBrowseTopics?: () => void;
  selectedTopic?: Topic | null;
  onStartSpeaking?: () => void;
  onStartLearning?: () => void;
}

const DIFFICULTY_ACTIVE: Record<'easy' | 'medium' | 'hard', string> = {
  easy: 'bg-emerald-600 text-white border-emerald-600 shadow-xs',
  medium: 'bg-amber-500 text-white border-amber-500 shadow-xs',
  hard: 'bg-rose-600 text-white border-rose-600 shadow-xs',
};

export const PracticeSetupCard: React.FC<PracticeSetupCardProps> = ({
  category,
  selectedDifficulties,
  onDifficultyToggle,
  onApplyPreset,
  poolCount,
  learningDurationMinutes,
  onLearningDurationChange,
  speakingDurationMinutes,
  onSpeakingDurationChange,
  onStartSession,
  onBrowseTopics,
  selectedTopic,
  onStartSpeaking,
  onStartLearning,
}) => {
  return (
    <Card className="p-6 sm:p-8 space-y-6 border border-stone-200/80 bg-white rounded-3xl shadow-sm">
      <div className="space-y-1">
        <h2 className="text-xl font-bold text-stone-900">{category.name} Practice</h2>
        <p className="text-xs text-stone-500">Configure your difficulty and duration before starting.</p>
      </div>

      {/* Selected Topic Highlight Box */}
      {selectedTopic && (
        <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-orange-600 flex items-center gap-1.5">
              <Sparkles className="w-3 h-3" />
              Active Topic
            </span>
            {onBrowseTopics && (
              <button
                type="button"
                onClick={onBrowseTopics}
                className="text-xs font-medium text-stone-500 hover:text-stone-900 transition-colors cursor-pointer"
              >
                Change →
              </button>
            )}
          </div>

          <h3 className="text-base sm:text-lg font-bold text-stone-900 leading-snug">
            {selectedTopic.title}
          </h3>

          {/* Action CTAs for Selected Topic */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
            {onStartSpeaking && (
              <Button
                variant="primary"
                size="lg"
                className="w-full text-sm py-3 shadow-sm"
                onClick={onStartSpeaking}
                icon={<Mic className="w-4 h-4" />}
              >
                Start Speaking ({speakingDurationMinutes} min)
              </Button>
            )}

            {onStartLearning && (
              <Button
                variant="outline"
                size="lg"
                className="w-full text-sm py-3 bg-white border-stone-200 text-stone-700 hover:bg-stone-50"
                onClick={onStartLearning}
                icon={<BookOpen className="w-4 h-4 text-orange-600" />}
              >
                Study & Learn ({learningDurationMinutes === 0 ? 'Skip' : `${learningDurationMinutes} min`})
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Compact Difficulty Pills */}
      <div className="space-y-2">
        <label className="block text-xs font-semibold text-stone-600 uppercase tracking-wider">
          Difficulty
        </label>

        <div className="flex flex-wrap items-center gap-2">
          {(['easy', 'medium', 'hard'] as const).map((diff) => {
            const isSelected = selectedDifficulties[diff];
            return (
              <button
                key={diff}
                type="button"
                onClick={() => onDifficultyToggle(diff)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold capitalize transition-all border focus:ring-2 focus:ring-orange-500/40 focus:outline-none cursor-pointer ${
                  isSelected
                    ? DIFFICULTY_ACTIVE[diff]
                    : 'bg-white text-stone-600 border-stone-200 hover:border-stone-400'
                }`}
              >
                {diff}
              </button>
            );
          })}

          <div className="h-4 w-px bg-stone-200 mx-1" />

          <button
            type="button"
            onClick={() => onApplyPreset('easy-medium')}
            className="px-3 py-1.5 rounded-full text-xs font-medium bg-stone-100 text-stone-600 hover:bg-stone-200 transition-colors focus:ring-2 focus:ring-orange-500/40 focus:outline-none cursor-pointer"
          >
            Easy + Medium
          </button>

          <button
            type="button"
            onClick={() => onApplyPreset('all')}
            className="px-3 py-1.5 rounded-full text-xs font-medium bg-stone-100 text-stone-600 hover:bg-stone-200 transition-colors focus:ring-2 focus:ring-orange-500/40 focus:outline-none cursor-pointer"
          >
            All
          </button>
        </div>
      </div>

      {/* Time Configuration Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Learning Duration */}
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-stone-700 font-semibold text-xs">
            <BookOpen className="w-3.5 h-3.5 text-orange-600" />
            <span>Preparation Time</span>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {[0, 5, 10, 15].map((mins) => (
              <button
                key={mins}
                type="button"
                onClick={() => onLearningDurationChange(mins)}
                className={`py-2 text-xs font-semibold rounded-xl border transition-all focus:ring-2 focus:ring-orange-500/40 focus:outline-none cursor-pointer ${
                  learningDurationMinutes === mins
                    ? 'bg-orange-600 text-white border-orange-600 shadow-xs'
                    : 'bg-white text-stone-600 border-stone-200 hover:border-stone-400'
                }`}
              >
                {mins === 0 ? 'Skip' : `${mins}m`}
              </button>
            ))}
          </div>
        </div>

        {/* Speaking Duration */}
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-stone-700 font-semibold text-xs">
            <Mic className="w-3.5 h-3.5 text-orange-600" />
            <span>Speaking Time</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[1, 2, 3].map((mins) => (
              <button
                key={mins}
                type="button"
                onClick={() => onSpeakingDurationChange(mins)}
                className={`py-2 text-xs font-semibold rounded-xl border transition-all focus:ring-2 focus:ring-orange-500/40 focus:outline-none cursor-pointer ${
                  speakingDurationMinutes === mins
                    ? 'bg-orange-600 text-white border-orange-600 shadow-xs'
                    : 'bg-white text-stone-600 border-stone-200 hover:border-stone-400'
                }`}
              >
                {mins}m
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Start Practice CTA */}
      <div className="pt-4 border-t border-stone-100">
        {poolCount === 0 ? (
          <div className="p-3 text-xs rounded-xl bg-amber-50 text-amber-900 border border-amber-200 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>No topics exist for your active difficulty selection. Select another difficulty above.</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {onBrowseTopics && (
              <Button
                variant="outline"
                size="lg"
                className="w-full text-sm py-3 bg-white border-stone-200 text-stone-700 hover:bg-stone-50"
                onClick={onBrowseTopics}
                icon={<ListFilter className="w-4 h-4 text-orange-600" />}
              >
                Browse Topics
              </Button>
            )}
            <Button
              variant={selectedTopic ? 'outline' : 'primary'}
              size="lg"
              className={`w-full text-sm py-3 ${!onBrowseTopics ? 'sm:col-span-2' : ''} ${
                selectedTopic ? 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50' : 'shadow-sm'
              }`}
              onClick={onStartSession}
              icon={selectedTopic ? <Shuffle className="w-4 h-4 text-orange-600" /> : <ArrowRight className="w-4 h-4" />}
            >
              {selectedTopic ? 'Shuffle Different Topic' : 'Start Shuffle'}
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};
