import React from 'react';
import type { TopicCategory, SelectedDifficulties } from '../../../types';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { BookOpen, Mic, AlertCircle, ArrowRight, ListFilter } from 'lucide-react';

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
}

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
}) => {
  return (
    <Card className="p-6 sm:p-8 space-y-6 border border-stone-200/80 bg-white rounded-3xl shadow-sm">
      <div className="space-y-1">
        <h2 className="text-2xl font-extrabold text-stone-900">{category.name} Practice Setup</h2>
        <p className="text-xs text-stone-500">Configure your difficulty and duration before shuffling a topic.</p>
      </div>

      {/* Compact Difficulty Pills */}
      <div className="space-y-2">
        <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider">
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
                className={`px-4 py-2 rounded-full text-xs font-bold capitalize transition-all border focus:ring-2 focus:ring-orange-500/40 focus:outline-none ${
                  isSelected
                    ? 'bg-orange-600 text-white border-orange-600 shadow-xs'
                    : 'bg-white text-stone-700 border-stone-200 hover:border-orange-400'
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
            className="px-3 py-1.5 rounded-full text-xs font-medium bg-stone-100 text-stone-700 hover:bg-stone-200 transition-colors focus:ring-2 focus:ring-orange-500/40 focus:outline-none"
          >
            Easy + Medium
          </button>

          <button
            type="button"
            onClick={() => onApplyPreset('all')}
            className="px-3 py-1.5 rounded-full text-xs font-medium bg-stone-100 text-stone-700 hover:bg-stone-200 transition-colors focus:ring-2 focus:ring-orange-500/40 focus:outline-none"
          >
            All
          </button>
        </div>
      </div>

      {/* Time Configuration Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
        {/* Learning Duration */}
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-stone-800 font-bold text-xs">
            <BookOpen className="w-3.5 h-3.5 text-orange-600" />
            <span>Preparation Time</span>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {[0, 5, 10, 15].map((mins) => (
              <button
                key={mins}
                type="button"
                onClick={() => onLearningDurationChange(mins)}
                className={`py-2 text-xs font-semibold rounded-xl border transition-all focus:ring-2 focus:ring-orange-500/40 focus:outline-none ${
                  learningDurationMinutes === mins
                    ? 'bg-orange-600 text-white border-orange-600 shadow-xs'
                    : 'bg-white text-stone-700 border-stone-200 hover:border-orange-400'
                }`}
              >
                {mins === 0 ? 'Skip' : `${mins} min`}
              </button>
            ))}
          </div>
        </div>

        {/* Speaking Duration */}
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-stone-800 font-bold text-xs">
            <Mic className="w-3.5 h-3.5 text-orange-600" />
            <span>Speaking Time</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[1, 2, 3].map((mins) => (
              <button
                key={mins}
                type="button"
                onClick={() => onSpeakingDurationChange(mins)}
                className={`py-2 text-xs font-semibold rounded-xl border transition-all focus:ring-2 focus:ring-orange-500/40 focus:outline-none ${
                  speakingDurationMinutes === mins
                    ? 'bg-orange-600 text-white border-orange-600 shadow-xs'
                    : 'bg-white text-stone-700 border-stone-200 hover:border-orange-400'
                }`}
              >
                {mins} min
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
                className="w-full text-sm py-3.5 bg-white border-stone-300 text-stone-800 hover:bg-stone-50"
                onClick={onBrowseTopics}
                icon={<ListFilter className="w-5 h-5 text-orange-600" />}
              >
                Browse Topics
              </Button>
            )}
            <Button
              variant="primary"
              size="lg"
              className={`w-full text-base py-3.5 shadow-md ${!onBrowseTopics ? 'sm:col-span-2' : ''}`}
              onClick={onStartSession}
              icon={<ArrowRight className="w-5 h-5" />}
            >
              Start Shuffle
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};
