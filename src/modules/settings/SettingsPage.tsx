import React, { useState, useEffect } from 'react';
import { useSettings } from '../../hooks/useSettings';
import { useFileSystem } from '../../hooks/useFileSystem';
import { useTopics } from '../../hooks/useTopics';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { SettingsSection } from '../../components/ui/SettingsSection';
import { CreateCategoryModal } from '../home/CreateCategoryModal';
import { ImportExportModal } from '../topics/ImportExportModal';
import { getDB } from '../../storage/db';
import { audioManager } from '../../lib/audio/audioManager';

import {
  Clock,
  HardDrive,
  ShieldCheck,
  FolderOpen,
  RotateCcw,
  Sparkles,
  Volume2,
  Mic,
  Play,
  FolderPlus,
  FileJson,
} from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { settings, updateSettings } = useSettings();
  const fileSystem = useFileSystem();
  const { createCategory, refreshTopics } = useTopics();

  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isImportExportOpen, setIsImportExportOpen] = useState(false);
  const [testResult, setTestResult] = useState<string | null>(null);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    const loadVoices = () => {
      const voices = audioManager.getVoices();
      setAvailableVoices(voices);
    };

    loadVoices();
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  const handleTestStorage = async () => {
    setTestResult(null);
    if (!fileSystem.isSupported) {
      setTestResult('File System Access API is not supported in this browser. Browser download fallback is active.');
      return;
    }

    try {
      await fileSystem.refreshStatus();
      if (fileSystem.folderName) {
        setTestResult(`Folder "${fileSystem.folderName}" is connected and ready for direct recording saves.`);
      } else {
        setTestResult('No custom folder selected. Click "Select Storage Folder" to pick a local directory.');
      }
    } catch (err: unknown) {
      const errObj = err as Error;
      setTestResult(`Storage test failed: ${errObj.message}`);
    }
  };

  const handleResetAppData = async () => {
    if (confirm('Are you sure you want to reset all local Vervio data? This will clear custom categories and settings.')) {
      const db = await getDB();
      await db.clear('categories');
      await db.clear('recordings');
      await db.clear('settings');
      await db.clear('handles');
      window.location.reload();
    }
  };

  if (!settings) {
    return <div className="py-12 text-center text-stone-500 text-sm">Loading settings...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div className="border-b border-stone-200 pb-4">
        <h1 className="text-2xl font-extrabold text-stone-900">Application Settings</h1>
        <p className="text-xs text-stone-500">Configure practice preferences, sound effects, voice feedback, and local directory storage</p>
      </div>

      {/* 1. Practice Defaults Section */}
      <SettingsSection icon={<Clock className="w-4 h-4 text-orange-600" />} title="Practice Defaults">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-1">
          <div>
            <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-2">
              Default Preparation Duration
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[5, 10, 15].map((mins) => (
                <button
                  key={mins}
                  type="button"
                  onClick={() => updateSettings({ defaultLearningDuration: mins })}
                  className={`py-2 text-xs font-semibold rounded-xl border transition-colors focus:ring-2 focus:ring-orange-500/40 focus:outline-none ${
                    settings.defaultLearningDuration === mins
                      ? 'bg-orange-600 text-white border-orange-600'
                      : 'bg-white text-stone-700 border-stone-200 hover:border-orange-400'
                  }`}
                >
                  {mins} min
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-2">
              Default Speaking Duration
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3].map((mins) => (
                <button
                  key={mins}
                  type="button"
                  onClick={() => updateSettings({ defaultSpeakingDuration: mins })}
                  className={`py-2 text-xs font-semibold rounded-xl border transition-colors focus:ring-2 focus:ring-orange-500/40 focus:outline-none ${
                    settings.defaultSpeakingDuration === mins
                      ? 'bg-orange-600 text-white border-orange-600'
                      : 'bg-white text-stone-700 border-stone-200 hover:border-orange-400'
                  }`}
                >
                  {mins} min
                </button>
              ))}
            </div>
          </div>
        </div>
      </SettingsSection>

      {/* 2. Sound Effects & Voice Feedback Section */}
      <SettingsSection icon={<Volume2 className="w-4 h-4 text-orange-600" />} title="Sound Effects & Voice Feedback">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-1">
          {/* Sound Controls */}
          <div className="space-y-4 p-4 rounded-xl bg-stone-50 border border-stone-200/80">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-semibold text-stone-900 text-xs block">UI Sound Effects</span>
                <span className="text-[11px] text-stone-500">Short subtle chimes for shuffle & completion</span>
              </div>
              <button
                type="button"
                onClick={() => updateSettings({ soundEffectsEnabled: !settings.soundEffectsEnabled })}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all focus:ring-2 focus:ring-orange-500/40 focus:outline-none ${
                  settings.soundEffectsEnabled
                    ? 'bg-orange-600 text-white shadow-xs'
                    : 'bg-stone-200 text-stone-600'
                }`}
              >
                {settings.soundEffectsEnabled ? 'ON' : 'OFF'}
              </button>
            </div>

            {settings.soundEffectsEnabled && (
              <div className="space-y-3 pt-2 border-t border-stone-200/60">
                <div>
                  <div className="flex items-center justify-between text-xs text-stone-600 mb-1 font-medium">
                    <span>Volume</span>
                    <span className="font-mono text-stone-900">{Math.round((settings.soundVolume || 0.5) * 100)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={settings.soundVolume || 0.5}
                    onChange={(e) => updateSettings({ soundVolume: parseFloat(e.target.value) })}
                    className="w-full accent-orange-600 cursor-pointer"
                    aria-label="Sound Volume"
                  />
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => audioManager.play('topicSelected')}
                  icon={<Play className="w-3.5 h-3.5 text-orange-600" />}
                  className="text-xs w-full bg-white"
                >
                  Test Sound Effect 🔊
                </Button>
              </div>
            )}
          </div>

          {/* Voice Controls */}
          <div className="space-y-4 p-4 rounded-xl bg-stone-50 border border-stone-200/80">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-semibold text-stone-900 text-xs block">Voice Feedback (Text-to-Speech)</span>
                <span className="text-[11px] text-stone-500">Announce topic title upon selection</span>
              </div>
              <button
                type="button"
                onClick={() => updateSettings({ voiceFeedbackEnabled: !settings.voiceFeedbackEnabled })}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all focus:ring-2 focus:ring-orange-500/40 focus:outline-none ${
                  settings.voiceFeedbackEnabled
                    ? 'bg-orange-600 text-white shadow-xs'
                    : 'bg-stone-200 text-stone-600'
                }`}
              >
                {settings.voiceFeedbackEnabled ? 'ON' : 'OFF'}
              </button>
            </div>

            {settings.voiceFeedbackEnabled && (
              <div className="space-y-3 pt-2 border-t border-stone-200/60">
                <div>
                  <label className="block text-xs font-medium text-stone-600 mb-1">Speech Rate</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[0.8, 1.0, 1.2].map((rate) => (
                      <button
                        key={rate}
                        type="button"
                        onClick={() => updateSettings({ speechRate: rate })}
                        className={`py-1 text-xs font-semibold rounded-lg border transition-colors focus:ring-2 focus:ring-orange-500/40 focus:outline-none ${
                          (settings.speechRate || 1.0) === rate
                            ? 'bg-orange-600 text-white border-orange-600'
                            : 'bg-white text-stone-700 border-stone-200 hover:border-orange-400'
                        }`}
                      >
                        {rate}x
                      </button>
                    ))}
                  </div>
                </div>

                {availableVoices.length > 0 && (
                  <div>
                    <label className="block text-xs font-medium text-stone-600 mb-1">System Voice</label>
                    <select
                      value={settings.selectedVoiceURI || ''}
                      onChange={(e) => updateSettings({ selectedVoiceURI: e.target.value || undefined })}
                      className="w-full p-2 rounded-xl border border-stone-300 text-xs bg-white text-stone-800 focus:ring-2 focus:ring-orange-500/40 focus:outline-none"
                    >
                      <option value="">System Default Voice</option>
                      {availableVoices.map((v) => (
                        <option key={v.voiceURI} value={v.voiceURI}>
                          {v.name} ({v.lang})
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => audioManager.speakTopic('Explain the JavaScript Event Loop')}
                  icon={<Mic className="w-3.5 h-3.5 text-orange-600" />}
                  className="text-xs w-full bg-white"
                >
                  Test Voice Announcement 🗣️
                </Button>
              </div>
            )}
          </div>
        </div>
      </SettingsSection>

      {/* 3. Recording Storage Section */}
      <SettingsSection icon={<HardDrive className="w-4 h-4 text-orange-600" />} title="Recording Storage Directory">
        {fileSystem.isSupported ? (
          <div className="space-y-3">
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs text-stone-500 block">Selected Storage Folder:</span>
                <span className="font-mono font-bold text-stone-900 text-sm">
                  {fileSystem.folderName || 'No local directory connected'}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={fileSystem.selectFolder}
                  icon={<FolderOpen className="w-4 h-4" />}
                >
                  {fileSystem.folderName ? 'Change Folder' : 'Select Folder'}
                </Button>
                {fileSystem.folderName && (
                  <Button variant="ghost" size="sm" onClick={fileSystem.resetFolder}>
                    Reset
                  </Button>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <Button variant="outline" size="sm" onClick={handleTestStorage}>
                Test Storage Connection
              </Button>
            </div>

            {testResult && (
              <div className="p-3 text-xs rounded-xl bg-orange-50 text-orange-950 border border-orange-200">
                {testResult}
              </div>
            )}
          </div>
        ) : (
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1">
            <span className="font-semibold block">Browser Fallback Mode Active</span>
            <p>
              Your browser does not support the File System Access API. Recordings will be provided via instant local file download links.
            </p>
          </div>
        )}
      </SettingsSection>

      {/* 4. Category & Data Management Section */}
      <SettingsSection icon={<Sparkles className="w-4 h-4 text-orange-600" />} title="Category & Data Management">
        <div className="flex flex-wrap items-center gap-3">
          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsCategoryModalOpen(true)}
            icon={<FolderPlus className="w-4 h-4" />}
          >
            + Create Category (JSON Upload)
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsImportExportOpen(true)}
            icon={<FileJson className="w-4 h-4 text-orange-600" />}
          >
            Import / Export JSON Data
          </Button>

          <Button
            variant="danger"
            size="sm"
            onClick={handleResetAppData}
            icon={<RotateCcw className="w-3.5 h-3.5" />}
          >
            Clear Local Application Data
          </Button>
        </div>
      </SettingsSection>

      {/* 5. Privacy Pledge Card */}
      <Card className="bg-emerald-50/70 border border-emerald-200 p-6 rounded-2xl space-y-3">
        <div className="flex items-center gap-2 font-bold text-emerald-900 text-sm">
          <ShieldCheck className="w-5 h-5 text-emerald-600" />
          <span>Vervio Privacy Guarantee</span>
        </div>
        <div className="text-xs text-emerald-950 space-y-2 leading-relaxed">
          <p>
            Vervio does NOT upload your recordings, camera feeds, or audio data to any remote server or cloud database.
          </p>
          <ul className="list-disc list-inside space-y-1 text-emerald-900">
            <li>No login or authentication required</li>
            <li>No third-party analytics or tracking scripts</li>
            <li>All custom categories, audio settings, and history stored in local browser IndexedDB</li>
            <li>Video recordings stored directly in your designated local directory</li>
          </ul>
        </div>
      </Card>

      <CreateCategoryModal
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
        onSubmit={async (name, buckets, iconName, description) => {
          await createCategory(name, buckets, iconName, description);
          await refreshTopics();
        }}
      />

      <ImportExportModal
        isOpen={isImportExportOpen}
        onClose={() => setIsImportExportOpen(false)}
        onImportSuccess={refreshTopics}
      />
    </div>
  );
};
