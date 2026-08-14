import React from 'react';
import { Card } from './Card';

interface SettingsSectionProps {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}

export const SettingsSection: React.FC<SettingsSectionProps> = ({ icon, title, children }) => {
  return (
    <Card className="space-y-4 p-6 rounded-2xl border border-stone-200/80 bg-white">
      <div className="flex items-center gap-2 font-bold text-stone-900 text-sm">
        {icon}
        <span>{title}</span>
      </div>
      {children}
    </Card>
  );
};
