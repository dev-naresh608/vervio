import React, { useState } from 'react';
import { Modal } from '../../components/ui/Modal';
import { Button } from '../../components/ui/Button';
import { Download, Upload, CheckCircle2, AlertCircle, FileText } from 'lucide-react';
import { exportUserDataJSON, importUserDataJSON } from '../../storage/topicsRepository';

interface ImportExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImportSuccess: () => void;
}

export const ImportExportModal: React.FC<ImportExportModalProps> = ({
  isOpen,
  onClose,
  onImportSuccess,
}) => {
  const [activeTab, setActiveTab] = useState<'import' | 'export'>('import');
  const [jsonText, setJsonText] = useState('');
  const [importStatus, setImportStatus] = useState<{ success?: boolean; message?: string } | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleExport = async () => {
    try {
      const jsonStr = await exportUserDataJSON();
      const blob = new Blob([jsonStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `vervio-backup-${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Export error:', err);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      setJsonText(content);
    };
    reader.readAsText(file);
  };

  const handleImport = async () => {
    if (!jsonText.trim()) {
      setImportStatus({ success: false, message: 'Please select or paste JSON content.' });
      return;
    }

    setIsProcessing(true);
    setImportStatus(null);

    try {
      const res = await importUserDataJSON(jsonText);
      setImportStatus({
        success: true,
        message: `Successfully imported ${res.importedCategoriesCount} category/categories.`,
      });
      onImportSuccess();
    } catch (err: unknown) {
      const errObj = err as Error;
      setImportStatus({ success: false, message: errObj.message || 'Failed to import JSON file.' });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Import / Export Custom Data">
      <div className="space-y-4">
        <div className="flex gap-2 p-1 bg-stone-100 rounded-xl">
          <button
            type="button"
            onClick={() => { setActiveTab('import'); setImportStatus(null); }}
            className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-colors ${
              activeTab === 'import' ? 'bg-white text-stone-900 shadow-xs font-semibold' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Import JSON
          </button>
          <button
            type="button"
            onClick={() => { setActiveTab('export'); setImportStatus(null); }}
            className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-colors ${
              activeTab === 'export' ? 'bg-white text-stone-900 shadow-xs font-semibold' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Export Backup
          </button>
        </div>

        {activeTab === 'import' ? (
          <div className="space-y-4">
            <p className="text-xs text-stone-600">
              Select a Vervio exported <code className="bg-stone-100 px-1 py-0.5 rounded">.json</code> file or paste topic data JSON directly to merge into your local database.
            </p>

            <div className="border-2 border-dashed border-stone-200 hover:border-orange-400 rounded-2xl p-4 text-center cursor-pointer transition-colors bg-stone-50/50">
              <input
                type="file"
                accept=".json,application/json"
                onChange={handleFileUpload}
                className="hidden"
                id="json-file-input"
              />
              <label htmlFor="json-file-input" className="cursor-pointer flex flex-col items-center gap-1.5">
                <FileText className="w-6 h-6 text-stone-400" />
                <span className="text-xs font-medium text-stone-700">Choose JSON file to upload</span>
              </label>
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-600 mb-1">
                Or Paste JSON Content directly:
              </label>
              <textarea
                value={jsonText}
                onChange={(e) => setJsonText(e.target.value)}
                placeholder='{ "customTopics": [ ... ] }'
                rows={5}
                className="w-full p-2.5 text-xs font-mono rounded-xl border border-stone-300 focus:ring-2 focus:ring-orange-500/40"
              />
            </div>

            {importStatus && (
              <div
                className={`p-3 rounded-xl text-xs flex items-start gap-2 border ${
                  importStatus.success
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                    : 'bg-red-50 text-red-800 border-red-200'
                }`}
              >
                {importStatus.success ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                )}
                <span>{importStatus.message}</span>
              </div>
            )}

            <div className="flex justify-end gap-2 pt-2 border-t border-stone-100">
              <Button variant="ghost" onClick={onClose}>
                Close
              </Button>
              <Button
                variant="primary"
                onClick={handleImport}
                disabled={isProcessing || !jsonText.trim()}
                icon={<Upload className="w-4 h-4" />}
              >
                {isProcessing ? 'Importing...' : 'Import Data'}
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-xs text-stone-600">
              Download a backup of all your custom categories and topics. Practice recording video files remain saved in your designated local directory.
            </p>

            <div className="p-4 rounded-xl bg-orange-50/60 border border-orange-200/70 text-xs text-orange-900 space-y-1">
              <span className="font-semibold block">Privacy Assurance</span>
              <p>Your exported file contains only topic text and category settings. No server connection is used.</p>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-stone-100">
              <Button variant="ghost" onClick={onClose}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handleExport} icon={<Download className="w-4 h-4" />}>
                Download Backup (.json)
              </Button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};
