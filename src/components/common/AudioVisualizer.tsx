import React from 'react';
import { Mic } from 'lucide-react';

export interface AudioVisualizerProps {
  level: number; // 0 to 100
  label?: string;
}

export const AudioVisualizer: React.FC<AudioVisualizerProps> = ({ level, label = 'Microphone Level' }) => {
  return (
    <div className="flex items-center gap-3 bg-stone-100/80 px-3.5 py-2 rounded-xl border border-stone-200/70">
      <Mic className={`w-4 h-4 shrink-0 transition-colors ${level > 10 ? 'text-orange-600' : 'text-stone-400'}`} />
      <div className="flex-1">
        <div className="flex items-center justify-between text-xs text-stone-600 mb-1">
          <span>{label}</span>
          <span className="font-mono text-[10px] text-stone-500">{level}%</span>
        </div>
        <div className="w-full bg-stone-200 h-2 rounded-full overflow-hidden">
          <div
            className="bg-orange-500 h-full rounded-full transition-all duration-75"
            style={{ width: `${Math.min(100, Math.max(0, level))}%` }}
          />
        </div>
      </div>
    </div>
  );
};
