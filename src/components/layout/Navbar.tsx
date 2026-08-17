import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { History, Settings, Menu, X, ShieldCheck, Sparkles, Home } from 'lucide-react';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-40 bg-[#faf9f6]/95 backdrop-blur-md border-b border-stone-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-orange-600 flex items-center justify-center text-white group-hover:bg-orange-700 transition-colors">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="text-base font-bold tracking-tight text-stone-900">VERVIO</span>
          </Link>

          {/* Privacy Tag - Desktop */}
          <div
            title="All video recordings, audio, and practice data remain 100% on your local device."
            className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200/70 text-xs font-medium text-emerald-800 cursor-help"
          >
            <ShieldCheck className="w-3 h-3 text-emerald-600 shrink-0" />
            <span>100% Local & Private</span>
          </div>

          {/* Nav Links - Desktop */}
          <nav className="hidden md:flex items-center gap-1">
            <Link
              to="/"
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive('/')
                  ? 'text-orange-600 bg-orange-50'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              <Home className="w-3.5 h-3.5" />
              Home
            </Link>
            <Link
              to="/history"
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive('/history')
                  ? 'text-orange-600 bg-orange-50'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              <History className="w-3.5 h-3.5" />
              History
            </Link>
            <Link
              to="/settings"
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive('/settings')
                  ? 'text-orange-600 bg-orange-50'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              <Settings className="w-3.5 h-3.5" />
              Settings
            </Link>
          </nav>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-stone-200 bg-white px-4 pt-3 pb-5 space-y-1">
          <div className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-emerald-50 text-xs font-medium text-emerald-800 mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>Your recordings stay strictly on your device.</span>
          </div>
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              isActive('/') ? 'bg-orange-50 text-orange-600' : 'text-stone-700 hover:bg-stone-50'
            }`}
          >
            <Home className="w-4 h-4" />
            Home
          </Link>
          <Link
            to="/history"
            onClick={() => setMobileMenuOpen(false)}
            className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              isActive('/history') ? 'bg-orange-50 text-orange-600' : 'text-stone-700 hover:bg-stone-50'
            }`}
          >
            <History className="w-4 h-4" />
            History
          </Link>
          <Link
            to="/settings"
            onClick={() => setMobileMenuOpen(false)}
            className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              isActive('/settings') ? 'bg-orange-50 text-orange-600' : 'text-stone-700 hover:bg-stone-50'
            }`}
          >
            <Settings className="w-4 h-4" />
            Settings
          </Link>
        </div>
      )}
    </header>
  );
};
