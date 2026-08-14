import React, { useState, useMemo } from 'react';
import type { TopicCategory, Topic, DifficultyLevel } from '../../../types';
import { Modal } from '../../../components/ui/Modal';
import { Search, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

interface BrowseTopicsModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: TopicCategory;
  onSelectTopic: (topic: Topic) => void;
  selectedTopicId?: string;
}

export const BrowseTopicsModal: React.FC<BrowseTopicsModalProps> = ({
  isOpen,
  onClose,
  category,
  onSelectTopic,
  selectedTopicId,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | DifficultyLevel>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const easyTopics = category.topics?.easy || [];
  const mediumTopics = category.topics?.medium || [];
  const hardTopics = category.topics?.hard || [];

  const allTopicsWithDifficulty = useMemo(() => {
    const list: { topic: Topic; difficulty: DifficultyLevel }[] = [];
    easyTopics.forEach((t) => list.push({ topic: t, difficulty: 'easy' }));
    mediumTopics.forEach((t) => list.push({ topic: t, difficulty: 'medium' }));
    hardTopics.forEach((t) => list.push({ topic: t, difficulty: 'hard' }));
    return list;
  }, [easyTopics, mediumTopics, hardTopics]);

  const filteredList = useMemo(() => {
    return allTopicsWithDifficulty.filter(({ topic, difficulty }) => {
      const matchesTab = activeTab === 'all' || difficulty === activeTab;
      const matchesSearch = topic.title.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesTab && matchesSearch;
    });
  }, [allTopicsWithDifficulty, activeTab, searchQuery]);

  const getDifficultyBadge = (diff: DifficultyLevel) => {
    switch (diff) {
      case 'easy':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200">
            Easy
          </span>
        );
      case 'medium':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-50 text-amber-700 border border-amber-200">
            Medium
          </span>
        );
      case 'hard':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-rose-50 text-rose-700 border border-rose-200">
            Hard
          </span>
        );
    }
  };

  const handleSelect = (topic: Topic) => {
    onSelectTopic(topic);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Browse ${category.name} Topics`} maxWidth="2xl">
      <div className="space-y-4">
        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
          {/* Difficulty Tabs */}
          <div className="flex items-center gap-1.5 bg-stone-100 p-1 rounded-xl overflow-x-auto">
            <button
              type="button"
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'all'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              All ({allTopicsWithDifficulty.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('easy')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'easy'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-emerald-700 hover:bg-emerald-50'
              }`}
            >
              Easy ({easyTopics.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('medium')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'medium'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'text-amber-700 hover:bg-amber-50'
              }`}
            >
              Medium ({mediumTopics.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('hard')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'hard'
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'text-rose-700 hover:bg-rose-50'
              }`}
            >
              Hard ({hardTopics.length})
            </button>
          </div>

          {/* Search Box */}
          <div className="relative min-w-[180px]">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:ring-2 focus:ring-orange-500/40 focus:outline-none transition-all"
            />
          </div>
        </div>

        {/* Topic Cards List */}
        <div className="max-h-[55vh] overflow-y-auto pr-1 space-y-2.5 border-t border-stone-100 pt-3">
          {filteredList.length === 0 ? (
            <div className="py-12 text-center text-stone-400 space-y-2">
              <Sparkles className="w-8 h-8 mx-auto text-stone-300" />
              <p className="text-xs font-medium">No topics found matching your filter.</p>
            </div>
          ) : (
            filteredList.map(({ topic, difficulty }) => {
              const isSelected = topic.id === selectedTopicId;
              return (
                <div
                  key={topic.id}
                  onClick={() => handleSelect(topic)}
                  className={`group p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'bg-orange-50/80 border-orange-300 ring-1 ring-orange-400/50'
                      : 'bg-white border-stone-200/80 hover:border-orange-300 hover:shadow-xs hover:bg-stone-50/60'
                  }`}
                >
                  <div className="space-y-1 flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      {activeTab === 'all' && getDifficultyBadge(difficulty)}
                      {isSelected && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-orange-600">
                          <CheckCircle2 className="w-3 h-3" /> Active Selection
                        </span>
                      )}
                    </div>
                    <h4 className="text-sm font-medium text-stone-800 group-hover:text-orange-600 transition-colors leading-relaxed">
                      {topic.title}
                    </h4>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelect(topic);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-orange-600 text-white shadow-xs'
                        : 'bg-stone-100 text-stone-700 group-hover:bg-orange-600 group-hover:text-white'
                    }`}
                  >
                    <span>Select</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })
          )}
        </div>
      </div>
    </Modal>
  );
};
