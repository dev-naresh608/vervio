import React, { useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { AudioVisualizer } from '../../components/common/AudioVisualizer';
import { audioManager } from '../../lib/audio/audioManager';
import { useRecorder } from '../../hooks/useRecorder';
import { usePracticeContext } from '../../context/PracticeContext';
import { Camera, Video, ShieldAlert, CheckCircle2, RefreshCw, X } from 'lucide-react';

export const SpeakingPrepView: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  const { selectedTopic, speakingDurationMinutes } = usePracticeContext();
  const videoRef = useRef<HTMLVideoElement>(null);

  const recorder = useRecorder();
  const { stream, permissionState, errorMessage, requestMedia, stopStream } = recorder;

  useEffect(() => {
    requestMedia();
  }, [requestMedia]);

  // Fix: Assign srcObject ONLY if it is not already assigned to stream to prevent video blinking
  useEffect(() => {
    if (videoRef.current && stream) {
      if (videoRef.current.srcObject !== stream) {
        videoRef.current.srcObject = stream;
        videoRef.current.play().catch(() => {});
      }
    }
  }, [stream]);

  const handleStartRecording = () => {
    audioManager.play('recordStart');
    navigate(`/practice/${categoryId}/speaking`);
  };

  const handleCancel = () => {
    stopStream();
    navigate(`/practice/${categoryId}`);
  };

  if (!selectedTopic) {
    return (
      <div className="py-12 text-center space-y-4">
        <h3 className="text-lg font-bold text-stone-900">No topic selected for speaking practice.</h3>
        <Button variant="outline" onClick={() => navigate(`/practice/${categoryId || ''}`)}>
          Select Topic
        </Button>
      </div>
    );
  }

  const isStreamReady = stream && stream.active && stream.getVideoTracks().some((t) => t.readyState === 'live');

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-12">
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={handleCancel}
          className="text-xs font-medium text-stone-600 hover:text-stone-900 transition-colors inline-flex items-center gap-1.5 focus:ring-2 focus:ring-orange-500/40 focus:outline-none rounded-lg px-2.5 py-1.5 bg-stone-100 hover:bg-stone-200 cursor-pointer"
        >
          <X className="w-3.5 h-3.5 text-stone-600" />
          Cancel Practice
        </button>

        <span className="text-xs font-mono font-bold text-orange-600 bg-orange-50 px-3 py-1 rounded-full border border-orange-200/80">
          Speaking Duration: {speakingDurationMinutes} Min
        </span>
      </div>

      <Card className="p-6 sm:p-8 space-y-6 border border-stone-200/80 bg-white rounded-3xl shadow-sm">
        <div className="space-y-1">
          <h2 className="text-xl font-bold text-stone-900">Camera & Microphone Diagnostic Check</h2>
          <p className="text-xs text-stone-500">
            Verify your video feed and audio levels before starting your recorded explanation.
          </p>
        </div>

        {/* Video Preview Container */}
        <div className="relative aspect-video bg-stone-950 rounded-2xl overflow-hidden shadow-inner flex items-center justify-center border border-stone-800">
          {permissionState === 'granted' && isStreamReady ? (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover transform -scale-x-100"
            />
          ) : permissionState === 'denied' ? (
            <div className="p-6 text-center space-y-3 text-rose-400">
              <ShieldAlert className="w-10 h-10 mx-auto" />
              <h3 className="text-sm font-bold text-white">Camera or Microphone Access Blocked</h3>
              <p className="text-xs text-stone-400 max-w-sm mx-auto">
                {errorMessage || 'Please enable camera and microphone permissions in your browser address bar.'}
              </p>
              <Button variant="outline" size="sm" onClick={requestMedia} icon={<RefreshCw className="w-3.5 h-3.5" />}>
                Retry Permission Request
              </Button>
            </div>
          ) : (
            <div className="p-6 text-center space-y-3 text-stone-400">
              <Camera className="w-10 h-10 mx-auto animate-pulse text-orange-500" />
              <p className="text-xs font-medium">Requesting camera and microphone access...</p>
            </div>
          )}
        </div>

        {/* Audio Meter Bar */}
        {permissionState === 'granted' && isStreamReady && (
          <div className="space-y-2 p-4 rounded-xl bg-stone-50 border border-stone-200/80">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-stone-700 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Live Audio Input Meter
              </span>
              <span className="text-[10px] text-stone-500">Speak into your mic to test level</span>
            </div>
            <AudioVisualizer level={recorder.audioLevel} />
          </div>
        )}

        {/* Topic Title Summary */}
        <div className="p-4 rounded-xl bg-stone-100/70 border border-stone-200/80 space-y-1">
          <span className="text-[10px] font-bold text-orange-600 uppercase tracking-wider block">
            SELECTED TOPIC
          </span>
          <span className="text-sm font-bold text-stone-900">{selectedTopic.title}</span>
        </div>

        {/* CTA Buttons Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Button
            variant="outline"
            size="lg"
            className="w-full text-sm py-3.5 bg-white border-stone-300 text-stone-800 hover:bg-stone-50"
            onClick={handleCancel}
            icon={<X className="w-5 h-5 text-stone-600" />}
          >
            Cancel
          </Button>

          <Button
            variant="primary"
            size="lg"
            className="sm:col-span-2 w-full text-base py-3.5 shadow-md"
            disabled={permissionState !== 'granted' || !isStreamReady}
            onClick={handleStartRecording}
            icon={<Video className="w-5 h-5" />}
          >
            {permissionState === 'granted' && isStreamReady ? 'Start Recording Now ●' : 'Connecting Camera...'}
          </Button>
        </div>
      </Card>
    </div>
  );
};
