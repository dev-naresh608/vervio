import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { Topic, DifficultyLevel } from '../../types';
import { useTopics } from '../../hooks/useTopics';
import { usePracticeContext } from '../../context/PracticeContext';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Search, Sparkles, CheckCircle2, ArrowRight, ArrowLeft, Mic } from 'lucide-react';

export const BrowseTopicsPage: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  const { categories } = useTopics();
  const {
    selectedCategory,
    setSelectedCategory,
    selectedTopic,
    setSelectedTopic,
  } = usePracticeContext();

  const [activeTab, setActiveTab] = useState<'all' | DifficultyLevel>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const activeCategory = selectedCategory || categories.find((c) => c.id === categoryId);

  // Sync category state if needed
  React.useEffect(() => {
    if (categoryId && (!selectedCategory || selectedCategory.id !== categoryId)) {
      const match = categories.find((c) => c.id === categoryId);
      if (match) {
        setSelectedCategory(match);
      }
    }
  }, [categoryId, categories, selectedCategory, setSelectedCategory]);

  const easyTopics = activeCategory?.topics?.easy || [];
  const mediumTopics = activeCategory?.topics?.medium || [];
  const hardTopics = activeCategory?.topics?.hard || [];

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

  if (!activeCategory) {
    return (
      <div className="py-16 text-center space-y-4">
        <h3 className="text-lg font-bold text-stone-900">Category Not Found</h3>
        <Button variant="outline" onClick={() => navigate('/')}>
          Return to Home
        </Button>
      </div>
    );
  }

  const handleSelectTopic = (topic: Topic) => {
    setSelectedTopic(topic);
    navigate(`/practice/${activeCategory.id}`);
  };

  const handleStartSpeakingDirectly = (topic: Topic, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedTopic(topic);
    navigate(`/practice/${activeCategory.id}/speaking-prep`);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Header Bar */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => navigate(`/practice/${activeCategory.id}`)}
          className="text-xs font-medium text-stone-600 hover:text-stone-900 transition-colors inline-flex items-center gap-1.5 focus:ring-2 focus:ring-orange-500/40 focus:outline-none rounded-lg px-2.5 py-1.5 bg-stone-100 hover:bg-stone-200"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Setup
        </button>

        <span className="text-xs font-bold text-stone-700 bg-orange-100/70 text-orange-900 px-3.5 py-1 rounded-full border border-orange-200/80">
          {activeCategory.name} Category
        </span>
      </div>

      {/* Title & Subtitle */}
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
          Browse {activeCategory.name} Topics
        </h1>
        <p className="text-xs sm:text-sm text-stone-500">
          Search and explore all available topics. Select any topic to start practicing.
        </p>
      </div>

      {/* Filter Tabs & Search Bar */}
      <Card className="p-4 space-y-4 border border-stone-200/80 bg-white rounded-2xl shadow-xs">
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
          {/* Difficulty Tabs */}
          <div className="flex items-center gap-1.5 bg-stone-100 p-1 rounded-xl overflow-x-auto">
            <button
              type="button"
              onClick={() => setActiveTab('all')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
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
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
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
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
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
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                activeTab === 'hard'
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'text-rose-700 hover:bg-rose-50'
              }`}
            >
              Hard ({hardTopics.length})
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative min-w-[220px]">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3.5 py-2 text-xs rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:ring-2 focus:ring-orange-500/40 focus:outline-none transition-all"
            />
          </div>
        </div>
      </Card>

      {/* Topics List */}
      <div className="space-y-3">
        {filteredList.length === 0 ? (
          <Card className="p-12 text-center text-stone-400 space-y-2 border border-stone-200/80 bg-white rounded-2xl">
            <Sparkles className="w-8 h-8 mx-auto text-stone-300" />
            <p className="text-sm font-semibold text-stone-600">No topics found</p>
            <p className="text-xs text-stone-400">Try adjusting your search query or selecting a different tab.</p>
          </Card>
        ) : (
          filteredList.map(({ topic, difficulty }) => {
            const isSelected = topic.id === selectedTopic?.id;
            return (
              <div
                key={topic.id}
                onClick={() => handleSelectTopic(topic)}
                className={`group p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  isSelected
                    ? 'bg-orange-50/70 border-orange-300 ring-1 ring-orange-300/60 shadow-xs'
                    : 'bg-white border-stone-200/80 hover:border-stone-300 hover:shadow-xs hover:bg-stone-50/40'
                }`}
              >
                <div className="space-y-1.5 flex-1 min-w-0">
                  {/* ONLY show difficulty badge when 'All' tab is selected to avoid clutter when specific difficulty filter is active */}
                  <div className="flex items-center gap-2">
                    {activeTab === 'all' && (
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          difficulty === 'easy'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : difficulty === 'medium'
                            ? 'bg-amber-50 text-amber-700 border border-amber-200'
                            : 'bg-rose-50 text-rose-700 border border-rose-200'
                        }`}
                      >
                        {difficulty}
                      </span>
                    )}

                    {isSelected && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-orange-600 bg-orange-100 px-2 py-0.5 rounded-md">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Selected
                      </span>
                    )}
                  </div>

                  <h3 className="text-sm sm:text-base font-semibold text-stone-800 group-hover:text-orange-600 transition-colors leading-relaxed">
                    {topic.title}
                  </h3>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs py-2 px-3 border-stone-300 text-stone-700 hover:bg-orange-50 hover:border-orange-300 hover:text-orange-600"
                    onClick={(e) => handleStartSpeakingDirectly(topic, e)}
                    icon={<Mic className="w-3.5 h-3.5 text-orange-600" />}
                  >
                    Start Practice
                  </Button>

                  <Button
                    variant={isSelected ? 'primary' : 'outline'}
                    size="sm"
                    className="text-xs py-2 px-3"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectTopic(topic);
                    }}
                    icon={<ArrowRight className="w-3.5 h-3.5" />}
                  >
                    {isSelected ? 'Selected' : 'Select Topic'}
                  </Button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
