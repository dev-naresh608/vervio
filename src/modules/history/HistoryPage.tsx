import React, { useState, useEffect, useCallback } from 'react';
import type { Recording } from '../../types';
import { getAllRecordings, deleteRecording, clearAllRecordings } from '../../storage/recordingsRepository';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { Search, Trash2, Video, HardDrive, Download, Calendar, Clock, Film } from 'lucide-react';

export const HistoryPage: React.FC = () => {
  const [recordings, setRecordings] = useState<Recording[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('all');
  const [selectedRecording, setSelectedRecording] = useState<Recording | null>(null);
  const [activePlaybackUrl, setActivePlaybackUrl] = useState<string | null>(null);

  const loadRecordings = useCallback(async () => {
    setIsLoading(true);
    try {
      const list = await getAllRecordings();
      setRecordings(list);
    } catch (err) {
      console.error('Failed to load history:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadRecordings();
  }, [loadRecordings]);

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this recording metadata entry?')) {
      await deleteRecording(id);
      await loadRecordings();
      if (selectedRecording?.id === id) {
        setSelectedRecording(null);
      }
    }
  };

  const handleClearAll = async () => {
    if (confirm('Are you sure you want to clear all history records? Video files remain saved on your disk.')) {
      await clearAllRecordings();
      await loadRecordings();
    }
  };

  // Unique categories in history
  const categoriesInHistory = Array.from(new Set(recordings.map((r) => r.categoryName)));

  // Filtered recordings
  const filtered = recordings.filter((rec) => {
    const matchesSearch = rec.topicTitle.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategoryFilter === 'all' || rec.categoryName === selectedCategoryFilter;
    return matchesSearch && matchesCat;
  });

  const openWatchModal = (rec: Recording) => {
    if (activePlaybackUrl) {
      URL.revokeObjectURL(activePlaybackUrl);
    }
    setSelectedRecording(rec);
    if (rec.videoBlob) {
      const url = URL.createObjectURL(rec.videoBlob);
      setActivePlaybackUrl(url);
    } else if (rec.videoBlobUrl) {
      setActivePlaybackUrl(rec.videoBlobUrl);
    } else {
      setActivePlaybackUrl(null);
    }
  };

  const handleCloseModal = () => {
    if (activePlaybackUrl) {
      URL.revokeObjectURL(activePlaybackUrl);
    }
    setActivePlaybackUrl(null);
    setSelectedRecording(null);
  };

  const handleDownload = (rec: Recording, e: React.MouseEvent) => {
    e.stopPropagation();
    if (rec.videoBlob) {
      const url = URL.createObjectURL(rec.videoBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = rec.fileName || `vervio-recording-${rec.id}.webm`;
      a.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } else if (rec.videoBlobUrl) {
      const a = document.createElement('a');
      a.href = rec.videoBlobUrl;
      a.download = rec.fileName || `vervio-recording-${rec.id}.webm`;
      a.click();
    }
  };

  const formatDuration = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m > 0 ? `${m}m ` : ''}${s}s`;
  };

  const formatDate = (isoStr: string) => {
    const d = new Date(isoStr);
    return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-5">
        <div>
          <h1 className="text-2xl font-bold text-stone-900">Practice History</h1>
          <p className="text-xs text-stone-500 mt-0.5">Review and play back your past speaking video recordings</p>
        </div>

        {recordings.length > 0 && (
          <Button variant="ghost" size="sm" onClick={handleClearAll} icon={<Trash2 className="w-3.5 h-3.5 text-red-500" />}>
            Clear History
          </Button>
        )}
      </div>

      {/* Filter & Search Bar */}
      {recordings.length > 0 && (
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by topic title..."
              className="w-full pl-9 pr-4 py-2 text-sm rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-orange-500/40 bg-white"
            />
          </div>

          {/* Category pill filters */}
          {categoriesInHistory.length > 0 && (
            <div className="flex items-center gap-1.5 flex-wrap">
              <button
                type="button"
                onClick={() => setSelectedCategoryFilter('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  selectedCategoryFilter === 'all'
                    ? 'bg-stone-900 text-white'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                All
              </button>
              {categoriesInHistory.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategoryFilter(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    selectedCategoryFilter === cat
                      ? 'bg-orange-600 text-white'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Recordings List */}
      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-20 bg-stone-200/50 rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <Card className="p-12 text-center space-y-4">
          <Film className="w-10 h-10 text-stone-300 mx-auto" />
          <div>
            <h3 className="font-semibold text-stone-800 text-sm">No practice recordings found</h3>
            <p className="text-xs text-stone-500 mt-1">
              {searchQuery ? 'No recordings match your search filter.' : 'Complete your first practice session to view recordings here.'}
            </p>
          </div>
        </Card>
      ) : (
        <div className="space-y-2.5">
          {filtered.map((rec) => (
            <Card
              key={rec.id}
              hoverable
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 border border-stone-200/80 cursor-pointer group"
              onClick={() => openWatchModal(rec)}
            >
              <div className="space-y-1 flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-semibold text-orange-600 uppercase tracking-wider">
                    {rec.categoryName}
                  </span>
                  <span className="text-stone-300">·</span>
                  <span className="text-[11px] text-stone-500 inline-flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {formatDate(rec.recordedAt)}
                  </span>
                </div>

                <h3 className="font-semibold text-stone-900 text-sm group-hover:text-orange-600 transition-colors leading-snug">
                  {rec.topicTitle}
                </h3>

                <div className="flex items-center gap-3 text-xs text-stone-500 font-mono">
                  <span className="inline-flex items-center gap-1">
                    <Clock className="w-3 h-3 text-stone-400" />
                    {formatDuration(rec.duration)}
                  </span>
                  <span>·</span>
                  <span className="inline-flex items-center gap-1 truncate">
                    <HardDrive className="w-3 h-3 text-emerald-600 shrink-0" />
                    <span className="truncate max-w-[180px]">{rec.fileName}</span>
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => openWatchModal(rec)}
                  icon={<Video className="w-3.5 h-3.5" />}
                >
                  Play
                </Button>

                {(rec.videoBlob || rec.videoBlobUrl) && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => handleDownload(rec, e)}
                    icon={<Download className="w-3.5 h-3.5" />}
                    title="Download video"
                  >
                    Download
                  </Button>
                )}

                <button
                  type="button"
                  onClick={(e) => handleDelete(rec.id, e)}
                  className="p-2 rounded-lg text-stone-400 hover:text-red-600 hover:bg-red-50 transition-colors focus:ring-2 focus:ring-orange-500/40 focus:outline-none"
                  title="Delete history entry"
                  aria-label="Delete history entry"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Video Watch Modal */}
      {selectedRecording && (
        <Modal
          isOpen={!!selectedRecording}
          onClose={handleCloseModal}
          title={selectedRecording.topicTitle}
          maxWidth="2xl"
        >
          <div className="space-y-4">
            <div className="relative aspect-video w-full rounded-xl bg-stone-950 overflow-hidden shadow-lg border border-stone-800">
              {activePlaybackUrl ? (
                <video
                  src={activePlaybackUrl}
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="p-6 text-center text-stone-400 space-y-2 flex flex-col items-center justify-center h-full">
                  <Film className="w-10 h-10 text-stone-500" />
                  <p className="text-xs font-semibold text-stone-300">
                    Video preview not stored for this entry
                  </p>
                  <p className="text-[11px] text-stone-500">
                    File saved on disk as: <span className="font-mono text-stone-300">{selectedRecording.fileName}</span>
                  </p>
                </div>
              )}
            </div>

            <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-200 text-xs text-stone-600 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <span className="font-semibold text-stone-800">{selectedRecording.categoryName}</span>
                <span className="mx-2">·</span>
                <span>{formatDate(selectedRecording.recordedAt)}</span>
                <span className="mx-2">·</span>
                <span className="font-mono font-semibold">{formatDuration(selectedRecording.duration)}</span>
              </div>

              {(selectedRecording.videoBlob || selectedRecording.videoBlobUrl) && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => handleDownload(selectedRecording, e)}
                  icon={<Download className="w-3.5 h-3.5 text-orange-600" />}
                  className="bg-white"
                >
                  Download Video
                </Button>
              )}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
