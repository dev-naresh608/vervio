import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { useTopicShuffle } from './hooks/useTopicShuffle';
import { TopicShuffleReel } from './components/TopicShuffleReel';
import { PracticeSetupCard } from './components/PracticeSetupCard';
import { useTopics } from '../../hooks/useTopics';
import { usePracticeContext } from '../../context/PracticeContext';
import { Shuffle, Clock, Mic, ListFilter } from 'lucide-react';

export const RandomTopicScreen: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  const { categories, getTopicPool } = useTopics();
  const {
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
    applyPreset,
  } = usePracticeContext();

  const [hasStartedPractice, setHasStartedPractice] = useState(false);

  // Sync category from URL param if needed
  useEffect(() => {
    if (categoryId && (!selectedCategory || selectedCategory.id !== categoryId)) {
      const match = categories.find((c) => c.id === categoryId);
      if (match) {
        setSelectedCategory(match);
      }
    }
  }, [categoryId, categories, selectedCategory, setSelectedCategory]);

  const activeCategory = selectedCategory || categories.find((c) => c.id === categoryId);
  const activePool = activeCategory ? getTopicPool(activeCategory, selectedDifficulties) : [];
  const poolCount = activePool.length;

  const { isShuffling, isLocked, visibleSlots, lockedTopic, startShuffle } = useTopicShuffle({
    onFinalTopicSelected: (finalTopic) => {
      setSelectedTopic(finalTopic);
    },
  });

  const handleStartSession = () => {
    setHasStartedPractice(true);
    if (poolCount > 0) {
      startShuffle(activePool, selectedTopic?.id);
    }
  };

  const handleShuffleClick = () => {
    if (poolCount > 0 && !isShuffling) {
      startShuffle(activePool, selectedTopic?.id);
    }
  };

  const handleDifficultyToggle = (diff: 'easy' | 'medium' | 'hard') => {
    const isCurrentlySelected = selectedDifficulties[diff];
    const activeCount = Object.values(selectedDifficulties).filter(Boolean).length;

    // Minimum-one-selected constraint
    if (isCurrentlySelected && activeCount === 1) {
      return;
    }

    setSelectedDifficulties({
      ...selectedDifficulties,
      [diff]: !selectedDifficulties[diff],
    });
  };

  const handleStartSpeaking = () => {
    if (activeCategory && selectedTopic) {
      navigate(`/practice/${activeCategory.id}/speaking-prep`);
    }
  };

  const handleStartLearning = () => {
    if (activeCategory && selectedTopic) {
      if (learningDurationMinutes === 0) {
        navigate(`/practice/${activeCategory.id}/speaking-prep`);
      } else {
        navigate(`/practice/${activeCategory.id}/learning`);
      }
    }
  };

  if (!activeCategory) {
    return (
      <div className="py-12 text-center space-y-4">
        <h3 className="text-lg font-bold text-stone-900">Category Not Found</h3>
        <Button variant="outline" onClick={() => navigate('/')}>
          Return to Home
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-8">
      {/* Category Header */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => navigate('/')}
          disabled={isShuffling}
          className="text-xs font-medium text-stone-500 hover:text-stone-900 transition-colors inline-flex items-center gap-1 disabled:opacity-50 focus:ring-2 focus:ring-orange-500/40 focus:outline-none rounded-lg px-2 py-1 cursor-pointer"
        >
          ← Change Category
        </button>

        <span className="text-xs font-bold text-stone-700 bg-stone-100 px-3 py-1 rounded-full border border-stone-200/80">
          {activeCategory.name}
        </span>
      </div>

      {/* Screen 1: Practice Setup Screen */}
      {!hasStartedPractice ? (
        <PracticeSetupCard
          category={activeCategory}
          selectedDifficulties={selectedDifficulties}
          onDifficultyToggle={handleDifficultyToggle}
          onApplyPreset={applyPreset}
          poolCount={poolCount}
          learningDurationMinutes={learningDurationMinutes}
          onLearningDurationChange={setLearningDurationMinutes}
          speakingDurationMinutes={speakingDurationMinutes}
          onSpeakingDurationChange={setSpeakingDurationMinutes}
          onStartSession={handleStartSession}
          onBrowseTopics={() => navigate(`/practice/${activeCategory.id}/topics`)}
          selectedTopic={selectedTopic}
          onStartSpeaking={handleStartSpeaking}
          onStartLearning={handleStartLearning}
        />
      ) : (
        /* Screen 2: Animated Vertical Rolling Reel & Topic Selection View */
        <div className="space-y-6">
          <TopicShuffleReel
            categoryName={activeCategory.name}
            visibleSlots={visibleSlots}
            lockedTitle={lockedTopic?.title || selectedTopic?.title}
            isShuffling={isShuffling}
            isLocked={isLocked || (!isShuffling && !!selectedTopic)}
          />

          <div className="flex items-center justify-center gap-3">
            <Button
              variant="outline"
              onClick={handleShuffleClick}
              disabled={isShuffling || poolCount === 0}
              icon={<Shuffle className={`w-4 h-4 text-orange-600 ${isShuffling ? 'animate-spin' : ''}`} />}
              className="rounded-full px-6 py-2.5 hover:bg-orange-50 hover:border-orange-300 font-semibold text-xs"
            >
              {isShuffling ? 'Shuffling Topics...' : 'Shuffle Again'}
            </Button>

            <Button
              variant="outline"
              onClick={() => navigate(`/practice/${activeCategory.id}/topics`)}
              disabled={isShuffling}
              icon={<ListFilter className="w-4 h-4 text-stone-600" />}
              className="rounded-full px-5 py-2.5 hover:bg-stone-100 font-semibold text-xs bg-white border-stone-300"
            >
              Browse Topics
            </Button>
          </div>

          {/* Action CTAs: Direct Speaking vs Preparation */}
          <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Button
              variant="primary"
              size="lg"
              className="w-full text-sm sm:text-base py-3.5 shadow-md hover:shadow-lg"
              disabled={poolCount === 0 || !selectedTopic || isShuffling}
              onClick={() => {
                if (activeCategory && selectedTopic) {
                  navigate(`/practice/${activeCategory.id}/speaking-prep`);
                }
              }}
              icon={<Mic className="w-5 h-5" />}
            >
              Start Speaking ({speakingDurationMinutes} min) →
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="w-full text-sm sm:text-base py-3.5 bg-white border-stone-300 text-stone-800 hover:bg-stone-50"
              disabled={poolCount === 0 || !selectedTopic || isShuffling}
              onClick={handleStartLearning}
              icon={<Clock className="w-5 h-5 text-orange-600" />}
            >
              Study & Learn ({learningDurationMinutes || 5} min)
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
