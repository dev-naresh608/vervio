import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTopics } from '../../hooks/useTopics';
import { usePracticeContext } from '../../context/PracticeContext';

import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';

import {
  Code2,
  Atom,
  Server,
  Database,
  FileCode2,
  Globe,
  Webhook,
  ShieldCheck,
  Network,
  Brackets,
  Bug,
  GitBranch,
  FolderGit2,
  Users,
  CloudCog,
  Layers,
  Cpu,
  Sparkles,
  Settings,
  Search,
  ArrowRight,
  X,
  ChevronRight,
} from 'lucide-react';

// Exact icon + color mapping matching defaultTopics iconName values
const ICON_CONFIG: Record<string, { icon: React.ReactNode; bg: string; text: string }> = {
  Code2:       { icon: <Code2 className="w-5 h-5" />,       bg: 'bg-orange-50',  text: 'text-orange-600' },
  Atom:        { icon: <Atom className="w-5 h-5" />,        bg: 'bg-sky-50',     text: 'text-sky-600' },
  Server:      { icon: <Server className="w-5 h-5" />,      bg: 'bg-emerald-50', text: 'text-emerald-600' },
  Database:    { icon: <Database className="w-5 h-5" />,    bg: 'bg-cyan-50',    text: 'text-cyan-600' },
  FileCode2:   { icon: <FileCode2 className="w-5 h-5" />,   bg: 'bg-blue-50',    text: 'text-blue-600' },
  Globe:       { icon: <Globe className="w-5 h-5" />,       bg: 'bg-indigo-50',  text: 'text-indigo-600' },
  Webhook:     { icon: <Webhook className="w-5 h-5" />,     bg: 'bg-violet-50',  text: 'text-violet-600' },
  ShieldCheck: { icon: <ShieldCheck className="w-5 h-5" />, bg: 'bg-green-50',   text: 'text-green-600' },
  Network:     { icon: <Network className="w-5 h-5" />,     bg: 'bg-purple-50',  text: 'text-purple-600' },
  Brackets:    { icon: <Brackets className="w-5 h-5" />,    bg: 'bg-amber-50',   text: 'text-amber-600' },
  Bug:         { icon: <Bug className="w-5 h-5" />,         bg: 'bg-red-50',     text: 'text-red-600' },
  GitBranch:   { icon: <GitBranch className="w-5 h-5" />,   bg: 'bg-rose-50',    text: 'text-rose-600' },
  FolderGit2:  { icon: <FolderGit2 className="w-5 h-5" />,  bg: 'bg-fuchsia-50', text: 'text-fuchsia-600' },
  Users:       { icon: <Users className="w-5 h-5" />,       bg: 'bg-pink-50',    text: 'text-pink-600' },
  CloudCog:    { icon: <CloudCog className="w-5 h-5" />,    bg: 'bg-teal-50',    text: 'text-teal-600' },
  Layers:      { icon: <Layers className="w-5 h-5" />,      bg: 'bg-purple-50',  text: 'text-purple-600' },
  Cpu:         { icon: <Cpu className="w-5 h-5" />,         bg: 'bg-amber-50',   text: 'text-amber-600' },
};

const DEFAULT_ICON = { icon: <Sparkles className="w-5 h-5" />, bg: 'bg-orange-50', text: 'text-orange-600' };

const CATEGORIES_PER_PAGE = 8;

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { categories, isLoading } = useTopics();
  const { setSelectedCategory, setSelectedTopic } = usePracticeContext();

  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const handleSelectCategory = (cat: typeof categories[0]) => {
    setSelectedTopic(null);
    setSelectedCategory(cat);
    navigate(`/practice/${cat.id}`);
  };

  // Filter by search
  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) return categories;
    const q = searchQuery.toLowerCase();
    return categories.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        (c.description || '').toLowerCase().includes(q)
    );
  }, [categories, searchQuery]);

  // Reset to page 1 when search changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  // Pagination
  const totalPages = Math.ceil(filteredCategories.length / CATEGORIES_PER_PAGE);
  const paginatedCategories = filteredCategories.slice(
    (currentPage - 1) * CATEGORIES_PER_PAGE,
    currentPage * CATEGORIES_PER_PAGE
  );

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      {/* Hero Header */}
      <section className="text-center max-w-xl mx-auto space-y-4 pt-6 sm:pt-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-xs font-medium text-emerald-800">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Privacy-First · 100% Local · No Cloud</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight leading-tight">
          Practice speaking like you're<br className="hidden sm:block" /> already in the interview.
        </h1>

        <p className="text-sm text-stone-500 leading-relaxed">
          Choose a category, get a random topic, and record your explanation — completely offline.
        </p>
      </section>

      {/* Search + Category count */}
      <section className="space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
              {filteredCategories.length} {filteredCategories.length === 1 ? 'Category' : 'Categories'}
              {searchQuery && ` · searching "${searchQuery}"`}
            </span>
          </div>

          {/* Search bar */}
          <div className="relative w-full sm:w-72">
            <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search categories..."
              className="w-full pl-9 pr-9 py-2 text-sm rounded-xl border border-stone-200 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/40 transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 transition-colors"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Category Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="h-40 bg-stone-200/50 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : filteredCategories.length === 0 ? (
          <Card className="p-10 text-center space-y-4 max-w-sm mx-auto">
            {searchQuery ? (
              <>
                <Search className="w-8 h-8 text-stone-300 mx-auto" />
                <div>
                  <h3 className="font-semibold text-stone-800 text-sm">No categories found</h3>
                  <p className="text-xs text-stone-500 mt-1">
                    No results for "<span className="font-medium">{searchQuery}</span>". Try a different keyword.
                  </p>
                </div>
                <Button variant="outline" size="sm" onClick={() => setSearchQuery('')}>
                  Clear Search
                </Button>
              </>
            ) : (
              <>
                <Sparkles className="w-8 h-8 text-orange-600 mx-auto" />
                <div>
                  <h3 className="font-semibold text-stone-900 text-sm">No categories available</h3>
                  <p className="text-xs text-stone-500 mt-1">
                    Go to Settings to create a custom category or import topics.
                  </p>
                </div>
                <Button variant="primary" size="sm" onClick={() => navigate('/settings')} icon={<Settings className="w-4 h-4" />}>
                  Open Settings
                </Button>
              </>
            )}
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {paginatedCategories.map((cat) => {
              const cfg = ICON_CONFIG[cat.iconName || 'FolderGit2'] || DEFAULT_ICON;
              return (
                <Card
                  key={cat.id}
                  hoverable
                  role="button"
                  tabIndex={0}
                  className="flex flex-col justify-between p-5 group cursor-pointer space-y-4 min-h-[164px] focus:ring-2 focus:ring-orange-500/40 focus:outline-none"
                  onClick={() => handleSelectCategory(cat)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleSelectCategory(cat);
                    }
                  }}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className={`w-9 h-9 rounded-xl ${cfg.bg} ${cfg.text} flex items-center justify-center`}>
                        {cfg.icon}
                      </div>
                      {cat.source === 'custom' && (
                        <Badge variant="custom">Custom</Badge>
                      )}
                    </div>

                    <div>
                      <h3 className="font-semibold text-stone-900 group-hover:text-orange-600 transition-colors text-sm leading-snug">
                        {cat.name}
                      </h3>
                      {cat.description && (
                        <p className="text-xs text-stone-500 line-clamp-2 mt-1 leading-relaxed">
                          {cat.description}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs font-medium text-stone-400 group-hover:text-orange-600 transition-colors">
                    <span>Practice</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </Card>
              );
            })}
          </div>
        )}

        {/* Pagination Controls */}
        {!isLoading && totalPages > 1 && (
          <div className="flex items-center justify-between pt-2">
            <span className="text-xs text-stone-500">
              Page <span className="font-semibold text-stone-700">{currentPage}</span> of <span className="font-semibold text-stone-700">{totalPages}</span>
            </span>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1.5 rounded-lg text-xs font-medium border border-stone-200 bg-white text-stone-700 hover:bg-stone-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                ← Previous
              </button>

              {/* Page number pills */}
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    type="button"
                    onClick={() => setCurrentPage(page)}
                    className={`w-7 h-7 rounded-lg text-xs font-semibold transition-colors ${
                      page === currentPage
                        ? 'bg-orange-600 text-white'
                        : 'text-stone-600 hover:bg-stone-100'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1.5 rounded-lg text-xs font-medium border border-stone-200 bg-white text-stone-700 hover:bg-stone-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                Next →
              </button>
            </div>
          </div>
        )}

        {/* Bottom CTA when all categories shown */}
        {!isLoading && filteredCategories.length > 0 && !searchQuery && (
          <div className="flex items-center justify-center pt-2">
            <button
              type="button"
              onClick={() => navigate('/settings')}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-stone-500 hover:text-orange-600 transition-colors"
            >
              <Settings className="w-3.5 h-3.5" />
              Add a custom category
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        )}
      </section>
    </div>
  );
};
