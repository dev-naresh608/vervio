import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { History, Settings, Menu, X, ShieldCheck, Sparkles } from 'lucide-react';
import { Button } from '../ui/Button';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-40 bg-stone-50/90 backdrop-blur-md border-b border-stone-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-orange-600 flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-stone-900">VERVIO</span>
              <span className="hidden sm:inline-block ml-2 text-xs font-medium text-stone-500 border-l border-stone-300 pl-2">
                Practice. Explain. Improve.
              </span>
            </div>
          </Link>

          {/* Privacy Tag - Desktop */}
          <div
            title="All video recordings, audio, and practice data remain 100% on your local device."
            className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/70 text-xs font-medium text-emerald-800 cursor-help"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>100% Local & Private</span>
          </div>

          {/* Nav Links - Desktop */}
          <nav className="hidden md:flex items-center gap-2">
            <Link to="/">
              <Button
                variant={isActive('/') ? 'primary' : 'ghost'}
                size="sm"
              >
                Home
              </Button>
            </Link>
            <Link to="/history">
              <Button
                variant={isActive('/history') ? 'primary' : 'ghost'}
                size="sm"
                icon={<History className="w-4 h-4" />}
              >
                History
              </Button>
            </Link>
            <Link to="/settings">
              <Button
                variant={isActive('/settings') ? 'primary' : 'ghost'}
                size="sm"
                icon={<Settings className="w-4 h-4" />}
              >
                Settings
              </Button>
            </Link>
          </nav>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-stone-600 hover:text-stone-900 hover:bg-stone-200/60 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-stone-200 bg-white px-4 pt-2 pb-4 space-y-2 shadow-lg">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-xs font-medium text-emerald-800 mb-3">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>🔒 Your recordings stay strictly on your device.</span>
          </div>
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className={`block px-3 py-2 rounded-xl text-base font-medium ${
              isActive('/') ? 'bg-orange-50 text-orange-600' : 'text-stone-700 hover:bg-stone-100'
            }`}
          >
            Home
          </Link>
          <Link
            to="/history"
            onClick={() => setMobileMenuOpen(false)}
            className={`block px-3 py-2 rounded-xl text-base font-medium ${
              isActive('/history') ? 'bg-orange-50 text-orange-600' : 'text-stone-700 hover:bg-stone-100'
            }`}
          >
            History
          </Link>
          <Link
            to="/settings"
            onClick={() => setMobileMenuOpen(false)}
            className={`block px-3 py-2 rounded-xl text-base font-medium ${
              isActive('/settings') ? 'bg-orange-50 text-orange-600' : 'text-stone-700 hover:bg-stone-100'
            }`}
          >
            Settings
          </Link>
        </div>
      )}
    </header>
  );
};
