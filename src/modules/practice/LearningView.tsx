import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTimer } from '../../hooks/useTimer';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { audioManager } from '../../lib/audio/audioManager';
import { usePracticeContext } from '../../context/PracticeContext';
import { Play, Pause, RotateCcw, Video, Lightbulb, CheckCircle2, HelpCircle, Sparkles, X } from 'lucide-react';

export const LearningView: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  const { selectedTopic, learningDurationMinutes } = usePracticeContext();
  const [showCompletionModal, setShowCompletionModal] = useState(false);

  const durationMinutes = learningDurationMinutes || 10;

  const {
    formattedTime,
    progressPercent,
    isRunning,
    isPaused,
    pause,
    resume,
    reset,
  } = useTimer({
    durationSeconds: durationMinutes * 60,
    autoStart: true,
    onExpire: () => {
      audioManager.play('timerComplete');
      setShowCompletionModal(true);
    },
  });

  const handleStartSpeaking = () => {
    navigate(`/practice/${categoryId}/speaking-prep`);
  };

  const handleCancel = () => {
    navigate(`/practice/${categoryId}`);
  };

  if (!selectedTopic) {
    return (
      <div className="py-12 text-center space-y-4">
        <h3 className="text-lg font-bold text-stone-900">No topic selected for study session.</h3>
        <Button variant="outline" onClick={() => navigate(`/practice/${categoryId || ''}`)}>
          Select Topic
        </Button>
      </div>
    );
  }

  // Note: sticky top-16 depends on Navbar height (h-16 = 64px)
  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12">
      {/* Screen Reader Live Timer Announcements */}
      <div className="sr-only" aria-live="polite" role="status">
        {progressPercent === 100
          ? 'Preparation time finished.'
          : progressPercent === 75
          ? '75% preparation time remaining.'
          : progressPercent === 50
          ? '50% preparation time remaining.'
          : progressPercent === 25
          ? '25% preparation time remaining.'
          : ''}
      </div>

      {/* Sticky Top Timer Bar */}
      <div className="sticky top-16 z-30 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-stone-200 shadow-md flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="relative w-12 h-12 flex items-center justify-center font-mono font-bold text-sm text-orange-600">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-stone-100"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-orange-600 transition-all duration-300"
                strokeDasharray={`${progressPercent}, 100`}
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <span className="absolute text-xs">{formattedTime}</span>
          </div>
          <div>
            <span className="text-[10px] font-bold text-stone-600 uppercase tracking-wider block">
              PREPARATION COUNTDOWN
            </span>
            <span className="text-xs text-stone-500 font-medium">
              {isRunning ? 'Timer Active' : isPaused ? 'Timer Paused' : 'Timer Finished'}
            </span>
          </div>
        </div>

        {/* Timer Control Buttons */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleCancel}
            icon={<X className="w-3.5 h-3.5 text-stone-500" />}
            title="Cancel Practice Session"
            className="border-stone-300 text-stone-700 hover:bg-stone-100"
          >
            Cancel
          </Button>

          {isRunning && (
            <Button variant="ghost" size="sm" onClick={pause} icon={<Pause className="w-4 h-4 text-stone-600" />}>
              Pause
            </Button>
          )}
          {isPaused && (
            <Button variant="outline" size="sm" onClick={resume} icon={<Play className="w-4 h-4 text-emerald-600" />}>
              Resume
            </Button>
          )}
          <Button variant="ghost" size="sm" onClick={() => reset()} icon={<RotateCcw className="w-4 h-4 text-stone-400" />}>
            Reset
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={handleStartSpeaking}
            icon={<Video className="w-4 h-4" />}
          >
            Start Speaking →
          </Button>
        </div>
      </div>

      {/* Main Study Topic Card */}
      <Card className="p-8 border-2 border-stone-200 space-y-6">
        <div className="space-y-2">
          <button
            onClick={handleCancel}
            className="text-xs font-medium text-stone-500 hover:text-stone-900 transition-colors inline-flex items-center gap-1 mb-2"
          >
            ← Back to Practice Setup
          </button>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 text-xs font-semibold text-orange-800">
            <Sparkles className="w-3.5 h-3.5 text-orange-600" />
            <span>INTERVIEW PRACTICE TOPIC</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight leading-snug">
            {selectedTopic.title}
          </h1>
        </div>

        {/* Structured 3-Step Answer Framework */}
        <div className="space-y-4 pt-4 border-t border-stone-100">
          <span className="text-xs font-bold text-stone-700 uppercase tracking-wider block">
            Suggested 3-Step Answer Framework
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-orange-50/50 border border-orange-100 space-y-2">
              <div className="flex items-center gap-1.5 font-bold text-orange-950 text-xs">
                <Lightbulb className="w-4 h-4 text-orange-600" />
                <span>1. Core Definition</span>
              </div>
              <p className="text-xs text-orange-950/80 leading-relaxed">
                Start with a 1-2 sentence high-level definition of what it is and why it exists.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-100 space-y-2">
              <div className="flex items-center gap-1.5 font-bold text-blue-950 text-xs">
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
                <span>2. Internal Mechanics</span>
              </div>
              <p className="text-xs text-blue-950/80 leading-relaxed">
                Explain how it works under the hood, key components, and data flow.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-100 space-y-2">
              <div className="flex items-center gap-1.5 font-bold text-emerald-950 text-xs">
                <HelpCircle className="w-4 h-4 text-emerald-600" />
                <span>3. Real Trade-offs</span>
              </div>
              <p className="text-xs text-emerald-950/80 leading-relaxed">
                Mention production trade-offs, edge cases, or when NOT to use it.
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Completion Modal */}
      <Modal
        isOpen={showCompletionModal}
        onClose={() => setShowCompletionModal(false)}
        title="Preparation Time Finished!"
      >
        <div className="space-y-4 text-center py-2">
          <p className="text-sm text-stone-600">
            Your preparation timer has completed. Are you ready to start explaining <strong>"{selectedTopic.title}"</strong> on camera?
          </p>
          <div className="flex items-center justify-center gap-3 pt-4">
            <Button variant="ghost" onClick={() => setShowCompletionModal(false)}>
              Keep Reviewing
            </Button>
            <Button
              variant="primary"
              onClick={handleStartSpeaking}
              icon={<Video className="w-4 h-4" />}
            >
              Start Speaking Now →
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
