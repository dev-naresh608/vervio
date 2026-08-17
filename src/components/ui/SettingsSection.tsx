import React from 'react';
import { Card } from './Card';

interface SettingsSectionProps {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}

export const SettingsSection: React.FC<SettingsSectionProps> = ({ icon, title, children }) => {
  return (
    <Card className="space-y-5 p-6 rounded-2xl border border-stone-200/80 bg-white">
      <div className="flex items-center gap-2.5 pb-4 border-b border-stone-100">
        <div className="text-stone-600">{icon}</div>
        <span className="font-semibold text-stone-900 text-sm">{title}</span>
      </div>
      <div className="space-y-4">{children}</div>
    </Card>
  );
};
