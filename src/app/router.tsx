import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { HomePage } from '../modules/home/HomePage';
import { RandomTopicScreen } from '../modules/practice/RandomTopicScreen';
import { BrowseTopicsPage } from '../modules/practice/BrowseTopicsPage';
import { LearningView } from '../modules/practice/LearningView';
import { SpeakingPrepView } from '../modules/practice/SpeakingPrepView';
import { RecordingView } from '../modules/practice/RecordingView';
import { ResultView } from '../modules/practice/ResultView';
import { HistoryPage } from '../modules/history/HistoryPage';
import { SettingsPage } from '../modules/settings/SettingsPage';
import { PracticeProvider } from '../context/PracticeContext';

export const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <PracticeProvider>
        <div className="flex flex-col min-h-screen bg-[#faf9f6] text-stone-900 font-sans antialiased selection:bg-orange-100 selection:text-orange-900">
          <Navbar />
          <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/practice/:categoryId" element={<RandomTopicScreen />} />
              <Route path="/practice/:categoryId/topics" element={<BrowseTopicsPage />} />
              <Route path="/practice/:categoryId/browse" element={<BrowseTopicsPage />} />
              <Route path="/practice/:categoryId/learning" element={<LearningView />} />
              <Route path="/practice/:categoryId/speaking-prep" element={<SpeakingPrepView />} />
              <Route path="/practice/:categoryId/speaking" element={<RecordingView />} />
              <Route path="/practice/:categoryId/result" element={<ResultView />} />
              <Route path="/history" element={<HistoryPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="*" element={<HomePage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </PracticeProvider>
    </BrowserRouter>
  );
};
