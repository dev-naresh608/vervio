import React from 'react';
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
  Layers,
  Database,
  Cpu,
  Users,
  FolderGit2,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Settings,
} from 'lucide-react';

const ICON_MAP: Record<string, React.ReactNode> = {
  Code2: <Code2 className="w-6 h-6 text-orange-600" />,
  Atom: <Atom className="w-6 h-6 text-blue-600" />,
  Server: <Server className="w-6 h-6 text-emerald-600" />,
  Layers: <Layers className="w-6 h-6 text-purple-600" />,
  Database: <Database className="w-6 h-6 text-cyan-600" />,
  Cpu: <Cpu className="w-6 h-6 text-amber-600" />,
  Users: <Users className="w-6 h-6 text-rose-600" />,
  FolderGit2: <FolderGit2 className="w-6 h-6 text-indigo-600" />,
};

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { categories, isLoading } = useTopics();
  const { setSelectedCategory, setSelectedTopic } = usePracticeContext();

  const handleSelectCategory = (cat: typeof categories[0]) => {
    setSelectedTopic(null);
    setSelectedCategory(cat);
    navigate(`/practice/${cat.id}`);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-10 pb-12">
      {/* Hero Header Section */}
      <section className="text-center max-w-2xl mx-auto space-y-4 pt-4 sm:pt-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50 border border-orange-200/80 text-xs font-semibold text-orange-800 shadow-xs">
          <ShieldCheck className="w-4 h-4 text-orange-600" />
          <span>🔒 Privacy-First Interview Practice</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight leading-tight">
          Practice speaking like you're already in the interview.
        </h1>

        <p className="text-sm sm:text-base text-stone-600 font-medium leading-relaxed">
          Choose a category below to start your technical speaking session.
        </p>
      </section>

      {/* Category Grid Section */}
      <section className="space-y-4">
        <div className="text-center border-b border-stone-200/80 pb-3">
          <h2 className="text-lg font-bold text-stone-900">Choose a Category</h2>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="h-36 bg-stone-200/60 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : categories.length === 0 ? (
          <Card className="p-8 text-center space-y-4 max-w-md mx-auto rounded-2xl border border-stone-200/80 bg-white">
            <Sparkles className="w-8 h-8 text-orange-600 mx-auto" />
            <div>
              <h3 className="font-bold text-stone-900 text-base">No categories available</h3>
              <p className="text-xs text-stone-500 mt-1">
                Go to Settings to create a custom category or import topics.
              </p>
            </div>
            <Button variant="primary" size="sm" onClick={() => navigate('/settings')} icon={<Settings className="w-4 h-4" />}>
              Open Settings
            </Button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <Card
                key={cat.id}
                hoverable
                role="button"
                tabIndex={0}
                className="flex flex-col justify-between p-5 border border-stone-200/80 group cursor-pointer space-y-4 rounded-2xl bg-white focus:ring-2 focus:ring-orange-500/40 focus:outline-none min-h-[168px]"
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
                    <div className="w-10 h-10 rounded-xl bg-stone-100 flex items-center justify-center group-hover:scale-105 transition-transform">
                      {ICON_MAP[cat.iconName || 'FolderGit2'] || <Sparkles className="w-6 h-6 text-orange-600" />}
                    </div>
                    {cat.source === 'custom' && (
                      <Badge variant="custom">Custom</Badge>
                    )}
                  </div>

                  <div>
                    <h3 className="font-bold text-stone-900 group-hover:text-orange-600 transition-colors text-base">
                      {cat.name}
                    </h3>
                    {cat.description && (
                      <p className="text-xs text-stone-500 line-clamp-2 mt-1 leading-relaxed">
                        {cat.description}
                      </p>
                    )}
                  </div>
                </div>

                <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-orange-600 group-hover:translate-x-0.5 transition-transform">
                  <span>Practice</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
