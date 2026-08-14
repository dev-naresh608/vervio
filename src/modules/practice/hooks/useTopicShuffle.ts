import { useState, useRef, useEffect, useCallback } from 'react';
import type { Topic } from '../../../types';
import { audioManager } from '../../../lib/audio/audioManager';

export interface TopicShuffleSlot {
  title: string;
  position: -2 | -1 | 0 | 1 | 2;
}

interface UseTopicShuffleOptions {
  onFinalTopicSelected?: (topic: Topic) => void;
}

export function useTopicShuffle({ onFinalTopicSelected }: UseTopicShuffleOptions = {}) {
  const [isShuffling, setIsShuffling] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [visibleSlots, setVisibleSlots] = useState<TopicShuffleSlot[]>([]);
  const [lockedTopic, setLockedTopic] = useState<Topic | null>(null);

  const timeoutIdsRef = useRef<number[]>([]);
  const onFinalSelectedRef = useRef(onFinalTopicSelected);

  useEffect(() => {
    onFinalSelectedRef.current = onFinalTopicSelected;
  }, [onFinalTopicSelected]);

  const clearAllTimeouts = useCallback(() => {
    timeoutIdsRef.current.forEach((id) => clearTimeout(id));
    timeoutIdsRef.current = [];
  }, []);

  useEffect(() => {
    return () => {
      clearAllTimeouts();
    };
  }, [clearAllTimeouts]);

  const startShuffle = useCallback((pool: Topic[], currentTopicId?: string) => {
    if (pool.length === 0 || isShuffling) return;

    clearAllTimeouts();
    setIsShuffling(true);
    setIsLocked(false);

    // Initial shuffle tick sound
    audioManager.play('shuffle');

    // 1. Pick final topic from pool (avoiding current topic if possible)
    let candidates = pool.filter((t) => t.id !== currentTopicId);
    if (candidates.length === 0) candidates = pool;
    const finalTopic = candidates[Math.floor(Math.random() * candidates.length)];
    setLockedTopic(finalTopic);

    // 2. Build sequence of candidate topics ending with final topic
    const sequenceLength = 13;
    const sequenceTitles: string[] = [];

    for (let i = 0; i < sequenceLength - 1; i++) {
      const randomItem = pool[Math.floor(Math.random() * pool.length)];
      sequenceTitles.push(randomItem.title);
    }
    sequenceTitles.push(finalTopic.title);

    // Function to generate 5 visible slots centered around current index
    const getSlotsForIndex = (idx: number): TopicShuffleSlot[] => {
      const getTitleAtRelative = (offset: number) => {
        const targetIdx = idx + offset;
        if (targetIdx < 0) {
          const posMod = ((targetIdx % pool.length) + pool.length) % pool.length;
          return pool[posMod]?.title || 'Practice Topic';
        }
        if (targetIdx >= sequenceTitles.length) {
          const wrapIdx = targetIdx % pool.length;
          return pool[wrapIdx]?.title || 'Practice Topic';
        }
        return sequenceTitles[targetIdx];
      };

      return [
        { title: getTitleAtRelative(-2), position: -2 },
        { title: getTitleAtRelative(-1), position: -1 },
        { title: getTitleAtRelative(0), position: 0 },
        { title: getTitleAtRelative(1), position: 1 },
        { title: getTitleAtRelative(2), position: 2 },
      ];
    };

    // Set initial 5 slots
    setVisibleSlots(getSlotsForIndex(0));

    // 3. Eased timing schedule (Fast 55ms -> Medium 110ms -> Slow 220ms -> Lock 350ms)
    let cumulativeDelay = 0;

    sequenceTitles.forEach((_, index) => {
      let stepDelay = 55; // Fast
      if (index >= 5 && index < 9) {
        stepDelay = 110; // Medium
      } else if (index >= 9 && index < sequenceLength - 1) {
        stepDelay = 220; // Slow down
      } else if (index === sequenceLength - 1) {
        stepDelay = 350; // Final lock delay
      }

      cumulativeDelay += stepDelay;

      const timerId = window.setTimeout(() => {
        setVisibleSlots(getSlotsForIndex(index));

        // Rhythmic tick audio on alternate steps
        if (index < sequenceLength - 1 && index % 2 === 0) {
          audioManager.play('shuffle');
        }

        // Final Lock Step
        if (index === sequenceLength - 1) {
          setIsLocked(true);

          // Final selection chime ("toink")
          audioManager.play('topicSelected');

          if (onFinalSelectedRef.current) {
            onFinalSelectedRef.current(finalTopic);
          }

          const unlockTimer = window.setTimeout(() => {
            setIsShuffling(false);
          }, 300);
          timeoutIdsRef.current.push(unlockTimer);
        }
      }, cumulativeDelay);

      timeoutIdsRef.current.push(timerId);
    });
  }, [isShuffling, clearAllTimeouts]);

  return {
    isShuffling,
    isLocked,
    visibleSlots,
    lockedTopic,
    startShuffle,
  };
}
