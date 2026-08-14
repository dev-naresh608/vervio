import React from 'react';
import { Lock, HardDrive, Shield } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-auto border-t border-stone-200 bg-stone-100/60 py-8 text-stone-500 text-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="font-bold text-stone-800 tracking-tight">VERVIO</span>
          <span>—</span>
          <span>Think clearly. Learn deeply. Speak confidently.</span>
        </div>

        <div className="flex items-center gap-6 text-xs text-stone-600">
          <span className="inline-flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-stone-700" />
            No Account Required
          </span>
          <span className="inline-flex items-center gap-1.5">
            <HardDrive className="w-3.5 h-3.5 text-stone-700" />
            Local Device Storage
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-stone-700" />
            No Cloud Server Uploads
          </span>
        </div>
      </div>
    </footer>
  );
};
