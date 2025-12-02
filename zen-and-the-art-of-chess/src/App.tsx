import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Layout } from '@/components/Layout';
import { PageTransition } from '@/components/PageTransition';
import { AgentToastContainer } from '@/components/AgentPanel';
import { initializeAgents } from '@/lib/agents/agentOrchestrator';
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
import { CoachPage } from '@/pages/CoachPage';
import CoursesPage from '@/pages/CoursesPage';
import CourseDetailPage from '@/pages/CourseDetailPage';
import CourseLearningPage from '@/pages/CourseLearningPage';
import { SocialPage } from '@/pages/SocialPage';
import { StudyPlanPage } from '@/pages/StudyPlanPage';
import { TournamentPrepPage } from '@/pages/TournamentPrepPage';
import { FlashTrainingPage } from '@/pages/FlashTrainingPage';
import { ThinkingSystemPage } from '@/pages/ThinkingSystemPage';
import { DailyChallengesPage } from '@/pages/DailyChallengesPage';
import { SpacedRepetitionPage } from '@/pages/SpacedRepetitionPage';
import { BlindfoldTrainerPage } from '@/pages/BlindfoldTrainerPage';
import { IntuitionTrainerPage } from '@/pages/IntuitionTrainerPage';
import { WeaknessDetectorPage } from '@/pages/WeaknessDetectorPage';
import { useProgressStore } from '@/state/useStore';
import { initializeCoach } from '@/state/coachStore';

// Wrapper component that adds page transitions to routes
function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><HomePage /></PageTransition>} />
        <Route path="/day" element={<PageTransition><DayPage /></PageTransition>} />
        <Route path="/play" element={<PageTransition><PlayPage /></PageTransition>} />
        <Route path="/train" element={<PageTransition><PuzzlesPage /></PageTransition>} />
        <Route path="/patterns" element={<PageTransition><PatternsManualPage /></PageTransition>} />
        <Route path="/openings" element={<PageTransition><OpeningsPage /></PageTransition>} />
        <Route path="/games" element={<PageTransition><GamesPage /></PageTransition>} />
        <Route path="/notes" element={<PageTransition><NotesPage /></PageTransition>} />
        <Route path="/study" element={<PageTransition><StudyPage /></PageTransition>} />
        <Route path="/hub" element={<PageTransition><CommandCenterPage /></PageTransition>} />
        <Route path="/mistakes" element={<PageTransition><MistakesPage /></PageTransition>} />
        <Route path="/sparring" element={<PageTransition><SparringPage /></PageTransition>} />
        <Route path="/settings" element={<PageTransition><SettingsPage /></PageTransition>} />
        <Route path="/calm-play" element={<PageTransition><CalmPlayPage /></PageTransition>} />
        <Route path="/mind" element={<PageTransition><MindTrainingPage /></PageTransition>} />
        <Route path="/journey" element={<PageTransition><JourneyPage /></PageTransition>} />
        <Route path="/learn/:lessonId" element={<PageTransition><LearnPage /></PageTransition>} />
        <Route path="/greats" element={<PageTransition><PlayTheGreatsPage /></PageTransition>} />
        <Route path="/greats/:legendId" element={<PageTransition><LegendDetailPage /></PageTransition>} />
        <Route path="/courses" element={<PageTransition><CoursesPage /></PageTransition>} />
        <Route path="/courses/:courseId" element={<PageTransition><CourseDetailPage /></PageTransition>} />
        <Route path="/courses/:courseId/learn" element={<PageTransition><CourseLearningPage /></PageTransition>} />
        <Route path="/courses/:courseId/chapter/:chapterId" element={<PageTransition><CourseLearningPage /></PageTransition>} />
        <Route path="/courses/:courseId/review" element={<PageTransition><CourseLearningPage /></PageTransition>} />
        
        {/* New Feature Routes */}
        <Route path="/social" element={<PageTransition><SocialPage /></PageTransition>} />
        <Route path="/study-plan" element={<PageTransition><StudyPlanPage /></PageTransition>} />
        <Route path="/coach" element={<PageTransition><CoachPage /></PageTransition>} />
        <Route path="/tournament" element={<PageTransition><TournamentPrepPage /></PageTransition>} />
        
        {/* Cutting-Edge Training Features */}
        <Route path="/flash-training" element={<PageTransition><FlashTrainingPage /></PageTransition>} />
        <Route path="/thinking-system" element={<PageTransition><ThinkingSystemPage /></PageTransition>} />
        <Route path="/daily-challenges" element={<PageTransition><DailyChallengesPage /></PageTransition>} />
        <Route path="/spaced-repetition" element={<PageTransition><SpacedRepetitionPage /></PageTransition>} />
        
        {/* NEW: Phase 2 Killer Features */}
        <Route path="/blindfold" element={<PageTransition><BlindfoldTrainerPage /></PageTransition>} />
        <Route path="/intuition" element={<PageTransition><IntuitionTrainerPage /></PageTransition>} />
        <Route path="/weakness-detector" element={<PageTransition><WeaknessDetectorPage /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  const { updateStreak } = useProgressStore();

  // Initialize coach, agents, and update streak on app load
  useEffect(() => {
    updateStreak();
    initializeCoach();
    initializeAgents();
  }, [updateStreak]);

  return (
    <Layout>
      <AnimatedRoutes />
      {/* Floating agent notifications */}
      <AgentToastContainer />
    </Layout>
  );
}

export default App;

