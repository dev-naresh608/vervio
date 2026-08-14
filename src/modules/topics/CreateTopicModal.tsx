import React, { useState } from 'react';
import { Modal } from '../../components/ui/Modal';
import { Button } from '../../components/ui/Button';
import type { TopicCategory, DifficultyLevel } from '../../types';
import { PlusCircle } from 'lucide-react';

interface CreateTopicModalProps {
  isOpen: boolean;
  onClose: () => void;
  categories: TopicCategory[];
  onSubmit: (categoryId: string, difficulty: DifficultyLevel, title: string) => Promise<void>;
  defaultCategoryId?: string;
}

export const CreateTopicModal: React.FC<CreateTopicModalProps> = ({
  isOpen,
  onClose,
  categories,
  onSubmit,
  defaultCategoryId,
}) => {
  const [categoryId, setCategoryId] = useState(defaultCategoryId || categories[0]?.id || 'javascript');
  const [title, setTitle] = useState('');
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('medium');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Topic title is required.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      await onSubmit(categoryId, difficulty, title.trim());
      setTitle('');
      onClose();
    } catch (err) {
      console.error('Error adding topic:', err);
      setError('Failed to save topic.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Topic to Category">
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 text-xs bg-red-50 text-red-700 border border-red-200 rounded-xl">
            {error}
          </div>
        )}

        <div>
          <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
            Category *
          </label>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-orange-500/40 text-sm text-stone-900 bg-white"
          >
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
            Difficulty Level *
          </label>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value as DifficultyLevel)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-orange-500/40 text-sm text-stone-900 bg-white capitalize"
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
            Topic Title *
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. How does Redis Pub/Sub work under the hood?"
            className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-orange-500/40 text-sm text-stone-900"
            required
            autoFocus
          />
        </div>

        <div className="flex items-center justify-end gap-2 pt-4 border-t border-stone-100">
          <Button type="button" variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" icon={<PlusCircle className="w-4 h-4" />} disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : 'Add Topic'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
