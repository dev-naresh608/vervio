import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Card } from '../../../components/ui/Card';
import type { TopicShuffleSlot } from '../hooks/useTopicShuffle';
import { CheckCircle2, RefreshCw } from 'lucide-react';

interface TopicShuffleReelProps {
  categoryName: string;
  visibleSlots: TopicShuffleSlot[];
  lockedTitle?: string;
  isShuffling: boolean;
  isLocked: boolean;
}

export const TopicShuffleReel: React.FC<TopicShuffleReelProps> = ({
  categoryName,
  visibleSlots,
  lockedTitle,
  isShuffling,
  isLocked,
}) => {
  const shouldReduceMotion = useReducedMotion();

  const getStyleForPosition = (position: number) => {
    switch (position) {
      case 0:
        return {
          y: 0,
          scale: 1,
          opacity: 1,
          filter: 'blur(0px)',
          className: 'font-extrabold text-stone-900 text-2xl sm:text-3xl',
        };
      case -1:
        return {
          y: -44,
          scale: 0.82,
          opacity: isLocked ? 0 : 0.45,
          filter: 'blur(1px)',
          className: 'font-semibold text-stone-400 text-lg sm:text-xl',
        };
      case 1:
        return {
          y: 44,
          scale: 0.82,
          opacity: isLocked ? 0 : 0.45,
          filter: 'blur(1px)',
          className: 'font-semibold text-stone-400 text-lg sm:text-xl',
        };
      case -2:
        return {
          y: -80,
          scale: 0.68,
          opacity: isLocked ? 0 : 0.18,
          filter: 'blur(2px)',
          className: 'font-medium text-stone-300 text-base sm:text-lg',
        };
      case 2:
        return {
          y: 80,
          scale: 0.68,
          opacity: isLocked ? 0 : 0.18,
          filter: 'blur(2px)',
          className: 'font-medium text-stone-300 text-base sm:text-lg',
        };
      default:
        return {
          y: 0,
          scale: 0,
          opacity: 0,
          filter: 'blur(4px)',
          className: '',
        };
    }
  };

  const centerTitle = lockedTitle || visibleSlots.find((s) => s.position === 0)?.title || 'Practice Topic';

  return (
    <Card
      aria-busy={isShuffling}
      className={`p-6 sm:p-8 border shadow-sm text-center space-y-6 relative overflow-hidden transition-all duration-300 rounded-3xl ${
        isLocked
          ? 'border-orange-500 bg-linear-to-b from-white via-orange-50/20 to-white ring-2 ring-orange-500/30 shadow-md'
          : isShuffling
          ? 'border-amber-400 bg-stone-50/90'
          : 'border-stone-200/80 bg-white'
      }`}
    >
      {/* Category & Status Header */}
      <div className="flex items-center justify-center">
        {isLocked ? (
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800 shadow-xs"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>✓ YOUR TOPIC</span>
          </motion.div>
        ) : isShuffling ? (
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-amber-50 border border-amber-200 text-xs font-semibold text-amber-900">
            <RefreshCw className="w-3.5 h-3.5 text-amber-600 animate-spin" />
            <span>SHUFFLING TOPICS...</span>
          </div>
        ) : (
          <span className="text-xs font-bold text-orange-600 tracking-wider uppercase">
            {categoryName} PRACTICE TOPIC
          </span>
        )}
      </div>

      {/* Accessibility live region for screen readers */}
      <div className="sr-only" aria-live="polite">
        {isLocked ? `Your topic selected: ${centerTitle}` : isShuffling ? 'Shuffling interview topics...' : ''}
      </div>

      {/* Vertical 5-Slot Rolling Reel Viewport */}
      <div
        className="h-[180px] sm:h-[220px] relative flex items-center justify-center overflow-hidden px-4 select-none"
        style={{
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)',
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)',
        }}
      >
        {shouldReduceMotion ? (
          /* Reduced motion fallback: Simple crossfade center title */
          <div className="w-full text-center">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight leading-snug">
              {centerTitle}
            </h2>
          </div>
        ) : (
          /* 5 Simultaneous Positioned Slots Reel */
          visibleSlots.map((slot) => {
            const style = getStyleForPosition(slot.position);
            return (
              <motion.div
                key={`${slot.position}-${slot.title}`}
                initial={false}
                animate={{
                  y: style.y,
                  scale: isLocked && slot.position === 0 ? 1.04 : style.scale,
                  opacity: style.opacity,
                  filter: style.filter,
                }}
                transition={{
                  duration: isShuffling ? 0.08 : 0.25,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`absolute w-full text-center px-4 max-w-xl left-0 right-0 mx-auto ${style.className}`}
              >
                <h2 className="tracking-tight leading-snug truncate sm:whitespace-normal line-clamp-2">
                  {slot.title}
                </h2>
              </motion.div>
            );
          })
        )}
      </div>
    </Card>
  );
};
