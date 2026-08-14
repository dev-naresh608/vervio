import React, { useState } from 'react';
import { Modal } from '../../components/ui/Modal';
import { Button } from '../../components/ui/Button';
import { validateCategoryJSON, generateTemplateJSON, type ValidationResult } from '../../utils/topicValidator';
import type { TopicBuckets } from '../../types';
import { Upload, Download, CheckCircle2, AlertCircle, FileText, FolderPlus } from 'lucide-react';

interface CreateCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (name: string, buckets: TopicBuckets, iconName: string, description: string) => Promise<void>;
}

export const CreateCategoryModal: React.FC<CreateCategoryModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [categoryName, setCategoryName] = useState('');
  const [description, setDescription] = useState('');
  const [iconName, setIconName] = useState('FolderGit2');
  const [jsonText, setJsonText] = useState('');
  const [selectedFileName, setSelectedFileName] = useState('');
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);
  const [step, setStep] = useState<'upload' | 'preview'>('upload');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [nameError, setNameError] = useState('');

  const handleDownloadTemplate = () => {
    const jsonStr = generateTemplateJSON();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'vervio-topics-template.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.json')) {
      setValidationResult({
        isValid: false,
        errors: ['Please select a valid .json file.'],
      });
      return;
    }

    setSelectedFileName(file.name);
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      setJsonText(content);
      const res = validateCategoryJSON(content);
      setValidationResult(res);
    };
    reader.readAsText(file);
  };

  const handleVerifyAndProceed = () => {
    setNameError('');
    if (!categoryName.trim()) {
      setNameError('Category Name is required.');
      return;
    }

    const res = validateCategoryJSON(jsonText);
    setValidationResult(res);

    if (res.isValid && res.validatedBuckets) {
      setStep('preview');
    }
  };

  const handleFinalImport = async () => {
    if (!validationResult || !validationResult.validatedBuckets) return;

    setIsSubmitting(true);
    try {
      await onSubmit(categoryName.trim(), validationResult.validatedBuckets, iconName, description.trim());
      handleReset();
      onClose();
    } catch (err) {
      console.error('Failed to import category:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setCategoryName('');
    setDescription('');
    setIconName('FolderGit2');
    setJsonText('');
    setSelectedFileName('');
    setValidationResult(null);
    setStep('upload');
    setNameError('');
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        handleReset();
        onClose();
      }}
      title={step === 'preview' ? 'Import Category Preview' : 'Create Custom Category'}
      maxWidth="lg"
    >
      {step === 'upload' ? (
        <div className="space-y-5">
          {/* Helper template banner */}
          <div className="p-3.5 rounded-xl bg-orange-50/70 border border-orange-200/80 flex items-center justify-between gap-3 text-xs text-orange-950">
            <div>
              <span className="font-bold block">Topics JSON Format</span>
              <span>Upload a JSON file containing easy, medium, and hard topic arrays.</span>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleDownloadTemplate}
              icon={<Download className="w-3.5 h-3.5 text-orange-600" />}
              className="bg-white border-orange-300 text-orange-900 shrink-0"
            >
              Download Template (.json)
            </Button>
          </div>

          {/* Category Name Input */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
              Category Name *
            </label>
            <input
              type="text"
              value={categoryName}
              onChange={(e) => {
                setCategoryName(e.target.value);
                if (nameError) setNameError('');
              }}
              placeholder="e.g. JavaScript Advanced, System Architecture, My Weak Topics"
              className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-orange-500/40 text-sm text-stone-900"
              autoFocus
            />
            {nameError && <p className="text-xs text-red-600 mt-1">{nameError}</p>}
          </div>

          {/* Short Description */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
              Short Description (Optional)
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief summary of questions in this category..."
              className="w-full px-3.5 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-orange-500/40 text-xs text-stone-900"
            />
          </div>

          {/* JSON File Selector */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
              Topics JSON File *
            </label>
            <div className="border-2 border-dashed border-stone-300 hover:border-orange-500 rounded-2xl p-4 text-center cursor-pointer transition-colors bg-stone-50/50">
              <input
                type="file"
                accept=".json,application/json"
                onChange={handleFileUpload}
                className="hidden"
                id="create-category-json-input"
              />
              <label htmlFor="create-category-json-input" className="cursor-pointer flex flex-col items-center gap-1.5">
                <FileText className="w-8 h-8 text-stone-400" />
                <span className="text-xs font-semibold text-stone-800">
                  {selectedFileName ? selectedFileName : '[ Choose JSON File ]'}
                </span>
                <span className="text-[11px] text-stone-500">Must contain easy, medium, and hard arrays</span>
              </label>
            </div>
          </div>

          {/* Validation Errors Box */}
          {validationResult && !validationResult.isValid && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-800 space-y-1.5">
              <div className="flex items-center gap-1.5 font-bold text-red-900">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                <span>Validation Errors</span>
              </div>
              <ul className="list-disc list-inside space-y-1 text-red-800 max-h-32 overflow-y-auto">
                {validationResult.errors.map((err, idx) => (
                  <li key={idx}>{err}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-2 pt-4 border-t border-stone-100">
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleVerifyAndProceed}
              disabled={!categoryName.trim() || !jsonText.trim()}
              icon={<Upload className="w-4 h-4" />}
            >
              Verify & Import
            </Button>
          </div>
        </div>
      ) : (
        /* Preview Step */
        <div className="space-y-6">
          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-3">
            <div className="flex items-center justify-between border-b border-stone-200 pb-2">
              <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">CATEGORY NAME</span>
              <span className="text-xs font-mono font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-md">
                CUSTOM
              </span>
            </div>
            <h3 className="text-xl font-extrabold text-stone-900">{categoryName}</h3>
            {description && <p className="text-xs text-stone-600">{description}</p>}
          </div>

          {/* Topic Count Breakdown */}
          {validationResult?.counts && (
            <div className="grid grid-cols-4 gap-3 text-center">
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200">
                <span className="text-[10px] font-bold text-emerald-700 uppercase block">Easy</span>
                <span className="text-lg font-black text-emerald-900">{validationResult.counts.easy}</span>
              </div>
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200">
                <span className="text-[10px] font-bold text-amber-700 uppercase block">Medium</span>
                <span className="text-lg font-black text-amber-900">{validationResult.counts.medium}</span>
              </div>
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200">
                <span className="text-[10px] font-bold text-rose-700 uppercase block">Hard</span>
                <span className="text-lg font-black text-rose-900">{validationResult.counts.hard}</span>
              </div>
              <div className="p-3 rounded-xl bg-orange-50 border border-orange-200">
                <span className="text-[10px] font-bold text-orange-700 uppercase block">Total</span>
                <span className="text-lg font-black text-orange-900">{validationResult.counts.total}</span>
              </div>
            </div>
          )}

          {/* Checklist Checks */}
          <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200 text-xs text-emerald-900 space-y-2">
            <div className="flex items-center gap-2 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>✓ JSON structure valid (easy, medium, hard buckets)</span>
            </div>
            <div className="flex items-center gap-2 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>✓ All topic titles are valid non-empty strings</span>
            </div>
            <div className="flex items-center gap-2 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>✓ No duplicate titles detected</span>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-4 border-t border-stone-100">
            <Button variant="ghost" onClick={() => setStep('upload')}>
              ← Back to Edit
            </Button>
            <Button
              variant="primary"
              onClick={handleFinalImport}
              disabled={isSubmitting}
              icon={<FolderPlus className="w-4 h-4" />}
            >
              {isSubmitting ? 'Importing...' : 'Import Category'}
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
};
