import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTimer } from '../../hooks/useTimer';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { AudioVisualizer } from '../../components/common/AudioVisualizer';
import { audioManager } from '../../lib/audio/audioManager';
import { useRecorder } from '../../hooks/useRecorder';
import { usePracticeContext } from '../../context/PracticeContext';
import { addRecording } from '../../storage/recordingsRepository';
import { saveRecordingFile, generateRecordingFileName } from '../../storage/filesystem';
import { Square, HardDrive, Loader2, Video, Mic } from 'lucide-react';

export const RecordingView: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  const {
    selectedCategory,
    selectedTopic,
    speakingDurationMinutes,
    setLastSavedBlobUrl,
    setCompletedRecording,
  } = usePracticeContext();

  const [isSaving, setIsSaving] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hasStartedRef = useRef(false);
  const totalSec = (speakingDurationMinutes || 1) * 60;

  const handleFinishRecording = async (blob: Blob, mimeType: string, durationSec: number) => {
    audioManager.play('recordStop');
    setIsSaving(true);

    if (!selectedTopic || !selectedCategory) return;

    try {
      const fileName = generateRecordingFileName(selectedTopic.title);
      const { storageType } = await saveRecordingFile(blob, fileName);
      const blobUrl = URL.createObjectURL(blob);

      const recording = await addRecording({
        topicId: selectedTopic.id,
        topicTitle: selectedTopic.title,
        categoryId: selectedCategory.id,
        categoryName: selectedCategory.name,
        duration: durationSec,
        fileName,
        mimeType,
        fileSize: blob.size,
        storageType,
        videoBlob: blob,
      });

      setCompletedRecording(recording);
      setLastSavedBlobUrl(blobUrl);
      navigate(`/practice/${categoryId}/result`);
    } catch (err) {
      console.error('Error saving recording:', err);
      navigate(`/practice/${categoryId}/result`);
    }
  };

  const recorder = useRecorder({
    onRecordingStop: handleFinishRecording,
  });

  const { stream, requestMedia, startRecording, stopRecording, audioLevel } = recorder;

  useEffect(() => {
    requestMedia();
  }, [requestMedia]);

  useEffect(() => {
    if (stream && recorder.isRecording === false && !isSaving && !hasStartedRef.current) {
      hasStartedRef.current = true;
      startRecording();
    }
  }, [stream, recorder.isRecording, startRecording, isSaving]);

  // Fix: Assign srcObject ONLY if it is not already assigned to stream to prevent video blinking
  useEffect(() => {
    if (videoRef.current && stream && !isSaving) {
      if (videoRef.current.srcObject !== stream) {
        videoRef.current.srcObject = stream;
        videoRef.current.play().catch(() => {});
      }
    }
  }, [stream, isSaving]);

  const handleStop = () => {
    if (!isSaving) {
      stopRecording();
    }
  };

  const { remainingSeconds, formattedTime } = useTimer({
    durationSeconds: totalSec,
    autoStart: true,
    onExpire: () => {
      handleStop();
    },
  });

  // SVG Circle Ring Math
  const radius = 105;
  const circumference = 2 * Math.PI * radius;
  const progressRatio = totalSec > 0 ? remainingSeconds / totalSec : 0;
  const strokeDashoffset = circumference * (1 - progressRatio);

  if (!selectedTopic) {
    return (
      <div className="py-12 text-center space-y-4">
        <h3 className="text-lg font-bold text-stone-900">No topic selected for recording.</h3>
        <Button variant="outline" onClick={() => navigate(`/practice/${categoryId || ''}`)}>
          Select Topic
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Screen Reader Live Region */}
      <div className="sr-only" aria-live="polite" role="status">
        {isSaving ? 'Saving recording locally...' : `Recording in progress. ${formattedTime} remaining.`}
      </div>

      {/* Top Controls Header */}
      <div className="flex items-center justify-between p-4 rounded-2xl bg-white border border-stone-200/80 shadow-xs">
        <div className="flex items-center gap-2.5">
          <span className="w-3 h-3 rounded-full bg-rose-500 animate-ping inline-block" />
          <span className="text-xs font-extrabold text-rose-600 uppercase tracking-wider">
            {isSaving ? 'SAVING RECORDING...' : 'LIVE SPEAKING PRACTICE'}
          </span>
        </div>

        <Button
          variant="danger"
          size="sm"
          disabled={isSaving}
          onClick={handleStop}
          icon={isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Square className="w-4 h-4 fill-current" />}
        >
          {isSaving ? 'Saving...' : 'Stop & Save Recording'}
        </Button>
      </div>

      {/* Main Grid: Center Ring Countdown & Side Camera Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left/Center Column (2 cols): BIG Circular Countdown Ring & Topic Card */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-8 border border-stone-200/80 bg-white rounded-3xl shadow-sm text-center flex flex-col items-center justify-center space-y-6">
            {isSaving ? (
              <div className="py-12 space-y-4 text-orange-600">
                <HardDrive className="w-16 h-16 mx-auto animate-bounce" />
                <h3 className="text-xl font-bold text-stone-900">Saving Video Locally...</h3>
                <p className="text-xs text-stone-500 max-w-sm mx-auto">
                  Writing WebM video file directly to your local device storage.
                </p>
              </div>
            ) : (
              <>
                {/* Topic Header Pill */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-xs font-bold text-orange-700">
                  <Mic className="w-3.5 h-3.5" />
                  <span>EXPLAIN THIS TOPIC</span>
                </div>

                {/* Topic Title */}
                <h1 className="text-xl sm:text-2xl font-black text-stone-900 max-w-lg leading-snug">
                  {selectedTopic.title}
                </h1>

                {/* BIG Prominent Circular Countdown Ring Timer */}
                <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center my-2">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 240 240">
                    {/* Track Circle */}
                    <circle
                      cx="120"
                      cy="120"
                      r={radius}
                      className="text-stone-100"
                      strokeWidth="14"
                      stroke="currentColor"
                      fill="transparent"
                    />
                    {/* Animated Progress Circle */}
                    <circle
                      cx="120"
                      cy="120"
                      r={radius}
                      className="text-orange-600 transition-all duration-300 ease-linear"
                      strokeWidth="14"
                      strokeDasharray={circumference}
                      strokeDashoffset={strokeDashoffset}
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="transparent"
                    />
                  </svg>

                  {/* Inside Circle Content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center space-y-1">
                    <span className="text-4xl sm:text-5xl font-black font-mono tracking-tight text-stone-900 tabular-nums">
                      {formattedTime}
                    </span>
                    <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">
                      Remaining
                    </span>
                  </div>
                </div>
              </>
            )}

            {/* Action Stop Button */}
            {!isSaving && (
              <Button
                variant="danger"
                size="lg"
                className="w-full max-w-xs text-base py-3.5 shadow-md"
                onClick={handleStop}
                icon={<Square className="w-4 h-4 fill-current" />}
              >
                Stop & Finish Recording
              </Button>
            )}
          </Card>
        </div>

        {/* Right Column (1 col): Compact Camera Preview & Microphone Bar */}
        <div className="space-y-4">
          <Card className="p-3 border border-stone-200/80 bg-stone-950 rounded-2xl overflow-hidden shadow-sm space-y-3">
            <div className="flex items-center justify-between px-1 text-xs text-stone-400">
              <span className="font-bold inline-flex items-center gap-1.5 text-stone-300">
                <Video className="w-3.5 h-3.5 text-orange-500" />
                Camera Preview
              </span>
              <span className="text-[10px] font-mono text-emerald-400 font-semibold">
                ● Live Feed
              </span>
            </div>

            {/* Compact Video Viewport */}
            <div className="relative aspect-video rounded-xl bg-black overflow-hidden flex items-center justify-center border border-stone-800">
              {stream ? (
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover transform -scale-x-100"
                />
              ) : (
                <div className="text-stone-500 text-xs font-medium">Connecting camera...</div>
              )}
            </div>

            {/* Real-time Microphone Input Meter Bar */}
            <div className="space-y-1.5 p-2.5 rounded-xl bg-stone-900 border border-stone-800 text-stone-300">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-semibold flex items-center gap-1 text-stone-200">
                  <Mic className="w-3 h-3 text-orange-400" />
                  Mic Level
                </span>
                <span className="font-mono text-[10px] text-stone-400">{audioLevel}%</span>
              </div>
              <AudioVisualizer level={audioLevel} />
            </div>
          </Card>

          {/* Quick Helpful Reminder Card */}
          <Card className="p-4 border border-stone-200/80 bg-stone-50 rounded-2xl text-xs space-y-1.5 text-stone-600">
            <span className="font-bold text-stone-900 block">💡 Speaking Tips:</span>
            <ul className="list-disc list-inside space-y-1 text-stone-500">
              <li>Speak clearly and maintain a steady pace</li>
              <li>State definition, mechanics & trade-offs</li>
              <li>Focus on clear technical explanation</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
};
