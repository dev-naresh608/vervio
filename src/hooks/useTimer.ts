import { useState, useEffect, useRef, useCallback } from 'react';

interface UseTimerOptions {
  durationSeconds: number;
  onExpire?: () => void;
  autoStart?: boolean;
}

export function useTimer({ durationSeconds, onExpire, autoStart = false }: UseTimerOptions) {
  const [totalSeconds, setTotalSeconds] = useState(durationSeconds);
  const [remainingSeconds, setRemainingSeconds] = useState(durationSeconds);
  const [isRunning, setIsRunning] = useState(autoStart);
  const [isPaused, setIsPaused] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  // Store timestamps for high accuracy
  const endTimeRef = useRef<number | null>(null);
  const pausedRemainingRef = useRef<number>(durationSeconds);
  const onExpireRef = useRef(onExpire);

  useEffect(() => {
    onExpireRef.current = onExpire;
  }, [onExpire]);

  // Update total seconds if prop changes while stopped
  useEffect(() => {
    if (!isRunning && !isPaused) {
      setTotalSeconds(durationSeconds);
      setRemainingSeconds(durationSeconds);
      pausedRemainingRef.current = durationSeconds;
    }
  }, [durationSeconds, isRunning, isPaused]);

  const start = useCallback((newDuration?: number) => {
    const dur = newDuration !== undefined ? newDuration : totalSeconds;
    setTotalSeconds(dur);
    setRemainingSeconds(dur);
    setIsFinished(false);
    setIsPaused(false);
    setIsRunning(true);
    endTimeRef.current = Date.now() + dur * 1000;
  }, [totalSeconds]);

  const pause = useCallback(() => {
    if (!isRunning || isPaused) return;
    setIsRunning(false);
    setIsPaused(true);
    if (endTimeRef.current) {
      const left = Math.max(0, Math.ceil((endTimeRef.current - Date.now()) / 1000));
      pausedRemainingRef.current = left;
      setRemainingSeconds(left);
    }
  }, [isRunning, isPaused]);

  const resume = useCallback(() => {
    if (!isPaused) return;
    setIsPaused(false);
    setIsRunning(true);
    endTimeRef.current = Date.now() + pausedRemainingRef.current * 1000;
  }, [isPaused]);

  const reset = useCallback((newDuration?: number) => {
    const dur = newDuration !== undefined ? newDuration : totalSeconds;
    setIsRunning(false);
    setIsPaused(false);
    setIsFinished(false);
    setTotalSeconds(dur);
    setRemainingSeconds(dur);
    pausedRemainingRef.current = dur;
    endTimeRef.current = null;
  }, [totalSeconds]);

  useEffect(() => {
    if (!isRunning) return;

    if (!endTimeRef.current) {
      endTimeRef.current = Date.now() + remainingSeconds * 1000;
    }

    const interval = setInterval(() => {
      if (!endTimeRef.current) return;
      const now = Date.now();
      const left = Math.max(0, Math.ceil((endTimeRef.current - now) / 1000));

      setRemainingSeconds(left);

      if (left <= 0) {
        clearInterval(interval);
        setIsRunning(false);
        setIsFinished(true);
        endTimeRef.current = null;
        if (onExpireRef.current) {
          onExpireRef.current();
        }
      }
    }, 200);

    return () => clearInterval(interval);
  }, [isRunning, remainingSeconds]);

  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  
  const elapsedSeconds = totalSeconds - remainingSeconds;
  const progressPercent = totalSeconds > 0 ? Math.min(100, Math.max(0, (elapsedSeconds / totalSeconds) * 100)) : 0;

  return {
    remainingSeconds,
    elapsedSeconds,
    totalSeconds,
    formattedTime,
    progressPercent,
    isRunning,
    isPaused,
    isFinished,
    start,
    pause,
    resume,
    reset,
  };
}
