import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { audioManager } from '../../lib/audio/audioManager';
import { usePracticeContext } from '../../context/PracticeContext';
import { CheckCircle2, RotateCcw, ArrowRight, History, HardDrive, Download } from 'lucide-react';

export const ResultView: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  const { selectedTopic, completedRecording, lastSavedBlobUrl, activeStream, setActiveStream } = usePracticeContext();

  useEffect(() => {
    audioManager.play('saveSuccess');
    // Forcibly stop all camera & microphone hardware tracks when landing on Result view
    if (activeStream) {
      activeStream.getTracks().forEach((track) => track.stop());
      setActiveStream(null);
    }
  }, [activeStream, setActiveStream]);

  const formatDuration = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handlePracticeAgain = () => {
    navigate(`/practice/${categoryId}/speaking-prep`);
  };

  const handleNextTopic = () => {
    navigate(`/practice/${categoryId}`);
  };

  if (!selectedTopic) {
    return (
      <div className="py-12 text-center space-y-4">
        <h3 className="text-lg font-bold text-stone-900">Practice completed.</h3>
        <Button variant="outline" onClick={() => navigate('/')}>
          Return to Home
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12">
      {/* Success Notification Banner */}
      <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-center gap-3">
        <CheckCircle2 className="w-6 h-6 text-emerald-600 flex-shrink-0" />
        <div className="flex-1">
          <span className="font-bold text-sm block">Recording Saved Successfully!</span>
          <span className="text-xs text-emerald-800">
            {completedRecording?.storageType === 'filesystem'
              ? 'Your WebM video was written directly to your connected local storage folder.'
              : 'Your WebM video file was prepared for local download.'}
          </span>
        </div>
      </div>

      {/* Main Video Playback Card */}
      <Card className="p-6 sm:p-8 space-y-6 border border-stone-200/80 shadow-sm">
        <div className="space-y-1">
          <span className="text-xs font-bold text-orange-600 uppercase tracking-wider block">
            PRACTICE REVIEW
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 leading-snug">{selectedTopic.title}</h2>
        </div>

        {/* Video Player */}
        {lastSavedBlobUrl ? (
          <div className="aspect-video bg-black rounded-2xl overflow-hidden shadow-lg border border-stone-800">
            <video
              src={lastSavedBlobUrl}
              controls
              autoPlay
              className="w-full h-full object-contain"
            />
          </div>
        ) : (
          <div className="p-8 text-center text-stone-500 text-xs bg-stone-100 rounded-2xl">
            No video playback URL available.
          </div>
        )}

        {/* File Metadata Summary */}
        {completedRecording && (
          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-600 space-y-2 font-mono">
            <div className="flex justify-between">
              <span>File Name:</span>
              <strong className="text-stone-900">{completedRecording.fileName}</strong>
            </div>
            <div className="flex justify-between">
              <span>Recorded Duration:</span>
              <strong className="text-stone-900">{formatDuration(completedRecording.duration)}</strong>
            </div>
            <div className="flex justify-between">
              <span>Storage Type:</span>
              <strong className="text-stone-900 capitalize flex items-center gap-1">
                <HardDrive className="w-3.5 h-3.5 text-orange-600" />
                {completedRecording.storageType}
              </strong>
            </div>
          </div>
        )}

        {/* Manual Download Button if Blob URL available */}
        {lastSavedBlobUrl && (
          <div className="flex justify-center">
            <a
              href={lastSavedBlobUrl}
              download={completedRecording?.fileName || 'vervio-practice.webm'}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold text-xs transition-colors"
            >
              <Download className="w-4 h-4 text-orange-600" />
              Download Local Video Copy (.webm)
            </a>
          </div>
        )}

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-stone-100">
          <Button
            variant="outline"
            onClick={handlePracticeAgain}
            icon={<RotateCcw className="w-4 h-4 text-orange-600" />}
          >
            Practice Again
          </Button>

          <Button
            variant="primary"
            onClick={handleNextTopic}
            icon={<ArrowRight className="w-4 h-4" />}
          >
            Next Topic →
          </Button>
        </div>
      </Card>

      {/* Link to History */}
      <div className="text-center">
        <Link
          to="/history"
          className="text-xs font-semibold text-stone-500 hover:text-stone-900 inline-flex items-center gap-1.5 underline underline-offset-4"
        >
          <History className="w-4 h-4 text-orange-600" />
          View All Recorded Sessions in History
        </Link>
      </div>
    </div>
  );
};
