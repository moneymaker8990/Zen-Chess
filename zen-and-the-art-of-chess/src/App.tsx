import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { HomePage } from '@/pages/HomePage';
import { DayPage } from '@/pages/DayPage';
import { PlayPage } from '@/pages/PlayPage';
import { PuzzlesPage } from '@/pages/PuzzlesPage';
import { OpeningsPage } from '@/pages/OpeningsPage';
import { GamesPage } from '@/pages/GamesPage';
import { NotesPage } from '@/pages/NotesPage';
import { StudyPage } from '@/pages/StudyPage';
import { MistakesPage } from '@/pages/MistakesPage';
import { SparringPage } from '@/pages/SparringPage';
import { SettingsPage } from '@/pages/SettingsPage';
import { CalmPlayPage } from '@/pages/CalmPlayPage';
import { MindTrainingPage } from '@/pages/MindTrainingPage';
import { JourneyPage } from '@/pages/JourneyPage';
import { LearnPage } from '@/pages/LearnPage';
import { PlayTheGreatsPage } from '@/pages/PlayTheGreatsPage';
import { LegendDetailPage } from '@/pages/LegendDetailPage';
import { CommandCenterPage } from '@/pages/CommandCenterPage';
import { PatternsManualPage } from '@/pages/PatternsManualPage';
import { useProgressStore } from '@/state/useStore';

function App() {
  const { updateStreak } = useProgressStore();

  // Update streak on app load
  useEffect(() => {
    updateStreak();
  }, [updateStreak]);

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/day" element={<DayPage />} />
        <Route path="/play" element={<PlayPage />} />
        <Route path="/train" element={<PuzzlesPage />} />
        <Route path="/patterns" element={<PatternsManualPage />} />
        <Route path="/openings" element={<OpeningsPage />} />
        <Route path="/games" element={<GamesPage />} />
        <Route path="/notes" element={<NotesPage />} />
        <Route path="/study" element={<StudyPage />} />
        <Route path="/hub" element={<CommandCenterPage />} />
        <Route path="/mistakes" element={<MistakesPage />} />
        <Route path="/sparring" element={<SparringPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/calm-play" element={<CalmPlayPage />} />
        <Route path="/mind" element={<MindTrainingPage />} />
        <Route path="/journey" element={<JourneyPage />} />
        <Route path="/learn/:lessonId" element={<LearnPage />} />
        <Route path="/greats" element={<PlayTheGreatsPage />} />
        <Route path="/greats/:legendId" element={<LegendDetailPage />} />
      </Routes>
    </Layout>
  );
}

export default App;

