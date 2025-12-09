import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useMemo, lazy, Suspense } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Layout } from '@/components/Layout';
import { PageTransition } from '@/components/PageTransition';
import { AgentToastContainer } from '@/components/AgentPanel';
import { AgentStatusBar } from '@/components/AgentPresence';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { OnboardingWrapper } from '@/components/Onboarding';
import { KeyboardShortcutsHelp } from '@/components/KeyboardShortcutsHelp';
import { AchievementNotificationContainer } from '@/components/AchievementNotification';
import { AskAnything } from '@/components/AskAnything';
import { GeniusWhisper } from '@/components/GeniusWhisper';
import { AIAmbience } from '@/components/AIAmbience';
import { initializeAgents } from '@/lib/agents/agentOrchestrator';
import { useAIPreferencesStore } from '@/state/aiPreferencesStore';
import { useAgentAwareness } from '@/hooks/useAgentAwareness';
import { useGlobalShortcuts } from '@/hooks/useKeyboardShortcuts';
import { useAIIntelligenceTracking } from '@/lib/aiIntelligence';
import { UpdatePrompt } from '@/components/UpdatePrompt';
import { OfflineIndicator } from '@/components/OfflineIndicator';
import { useProgressStore } from '@/state/useStore';
import { useAuthStore } from '@/state/useAuthStore';
import { initializeCoach } from '@/state/coachStore';

// ============================================
// LAZY-LOADED PAGES FOR FASTER INITIAL LOAD
// ============================================

// Core pages (loaded immediately)
import { HomePage } from '@/pages/HomePage';
import { NotFoundPage } from '@/pages/NotFoundPage';

// Lazy-loaded pages (loaded on demand)
const DayPage = lazy(() => import('@/pages/DayPage'));
const PlayPage = lazy(() => import('@/pages/PlayPage'));
const PuzzlesPage = lazy(() => import('@/pages/PuzzlesPage'));
const OpeningsPage = lazy(() => import('@/pages/OpeningsPage'));
const GamesPage = lazy(() => import('@/pages/GamesPage'));
const NotesPage = lazy(() => import('@/pages/NotesPage'));
const StudyPage = lazy(() => import('@/pages/StudyPage'));
const MistakesPage = lazy(() => import('@/pages/MistakesPage'));
const SparringPage = lazy(() => import('@/pages/SparringPage'));
const SettingsPage = lazy(() => import('@/pages/SettingsPage'));
const CalmPlayPage = lazy(() => import('@/pages/CalmPlayPage'));
const MindTrainingPage = lazy(() => import('@/pages/MindTrainingPage'));
const JourneyPage = lazy(() => import('@/pages/JourneyPage'));
const LearnPage = lazy(() => import('@/pages/LearnPage'));
const PlayTheGreatsPage = lazy(() => import('@/pages/PlayTheGreatsPage'));
const LegendDetailPage = lazy(() => import('@/pages/LegendDetailPage'));
const CommandCenterPage = lazy(() => import('@/pages/CommandCenterPage'));
const PatternsManualPage = lazy(() => import('@/pages/PatternsManualPage'));
const CoachPage = lazy(() => import('@/pages/CoachPage'));
const CoursesPage = lazy(() => import('@/pages/CoursesPage'));
const CourseDetailPage = lazy(() => import('@/pages/CourseDetailPage'));
const CourseLearningPage = lazy(() => import('@/pages/CourseLearningPage'));
const SocialPage = lazy(() => import('@/pages/SocialPage'));
const StudyPlanPage = lazy(() => import('@/pages/StudyPlanPage'));
const TournamentPrepPage = lazy(() => import('@/pages/TournamentPrepPage'));
const FlashTrainingPage = lazy(() => import('@/pages/FlashTrainingPage'));
const ThinkingSystemPage = lazy(() => import('@/pages/ThinkingSystemPage'));
const DailyChallengesPage = lazy(() => import('@/pages/DailyChallengesPage'));
const SpacedRepetitionPage = lazy(() => import('@/pages/SpacedRepetitionPage'));
const BlindfoldTrainerPage = lazy(() => import('@/pages/BlindfoldTrainerPage'));
const IntuitionTrainerPage = lazy(() => import('@/pages/IntuitionTrainerPage'));
const WeaknessDetectorPage = lazy(() => import('@/pages/WeaknessDetectorPage'));
const PricingPage = lazy(() => import('@/pages/PricingPage'));
const AuthPage = lazy(() => import('@/pages/AuthPage'));
const AICoachDashboard = lazy(() => import('@/pages/AICoachDashboard'));
const BeginnerPage = lazy(() => import('@/pages/BeginnerPage'));
const PlayFriendPage = lazy(() => import('@/pages/PlayFriendPage'));
const LiveGamePage = lazy(() => import('@/pages/LiveGamePage'));
const HowToPage = lazy(() => import('@/pages/HowToPage'));
const PrivacyPage = lazy(() => import('@/pages/PrivacyPage'));
const TermsPage = lazy(() => import('@/pages/TermsPage'));

// Loading fallback component
function PageLoader() {
  return (
    <div className="min-h-[50vh] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-2 border-t-transparent border-[var(--accent-primary)] rounded-full animate-spin" />
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Loading...</p>
      </div>
    </div>
  );
}

// Helper to wrap lazy components with Suspense
function LazyPage({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<PageLoader />}>
      <PageTransition>{children}</PageTransition>
    </Suspense>
  );
}

// Wrapper component that adds page transitions to routes
function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        {/* Homepage - not lazy loaded for fastest initial paint */}
        <Route path="/" element={<PageTransition><HomePage /></PageTransition>} />
        
        {/* Core Training Routes */}
        <Route path="/day" element={<LazyPage><DayPage /></LazyPage>} />
        <Route path="/play" element={<LazyPage><PlayPage /></LazyPage>} />
        <Route path="/train" element={<LazyPage><PuzzlesPage /></LazyPage>} />
        <Route path="/patterns" element={<LazyPage><PatternsManualPage /></LazyPage>} />
        <Route path="/openings" element={<LazyPage><OpeningsPage /></LazyPage>} />
        <Route path="/games" element={<LazyPage><GamesPage /></LazyPage>} />
        <Route path="/notes" element={<LazyPage><NotesPage /></LazyPage>} />
        <Route path="/study" element={<LazyPage><StudyPage /></LazyPage>} />
        <Route path="/hub" element={<LazyPage><CommandCenterPage /></LazyPage>} />
        <Route path="/mistakes" element={<LazyPage><MistakesPage /></LazyPage>} />
        <Route path="/sparring" element={<LazyPage><SparringPage /></LazyPage>} />
        <Route path="/settings" element={<LazyPage><SettingsPage /></LazyPage>} />
        <Route path="/calm-play" element={<LazyPage><CalmPlayPage /></LazyPage>} />
        <Route path="/mind" element={<LazyPage><MindTrainingPage /></LazyPage>} />
        <Route path="/journey" element={<LazyPage><JourneyPage /></LazyPage>} />
        <Route path="/beginner" element={<LazyPage><BeginnerPage /></LazyPage>} />
        <Route path="/learn/:lessonId" element={<LazyPage><LearnPage /></LazyPage>} />
        <Route path="/greats" element={<LazyPage><PlayTheGreatsPage /></LazyPage>} />
        <Route path="/greats/:legendId" element={<LazyPage><LegendDetailPage /></LazyPage>} />
        <Route path="/courses" element={<LazyPage><CoursesPage /></LazyPage>} />
        <Route path="/courses/:courseId" element={<LazyPage><CourseDetailPage /></LazyPage>} />
        <Route path="/courses/:courseId/learn" element={<LazyPage><CourseLearningPage /></LazyPage>} />
        <Route path="/courses/:courseId/chapter/:chapterId" element={<LazyPage><CourseLearningPage /></LazyPage>} />
        <Route path="/courses/:courseId/review" element={<LazyPage><CourseLearningPage /></LazyPage>} />
        
        {/* New Feature Routes */}
        <Route path="/social" element={<LazyPage><SocialPage /></LazyPage>} />
        <Route path="/study-plan" element={<LazyPage><StudyPlanPage /></LazyPage>} />
        <Route path="/coach" element={<LazyPage><CoachPage /></LazyPage>} />
        <Route path="/tournament" element={<LazyPage><TournamentPrepPage /></LazyPage>} />
        
        {/* Cutting-Edge Training Features */}
        <Route path="/flash-training" element={<LazyPage><FlashTrainingPage /></LazyPage>} />
        <Route path="/thinking-system" element={<LazyPage><ThinkingSystemPage /></LazyPage>} />
        <Route path="/daily-challenges" element={<LazyPage><DailyChallengesPage /></LazyPage>} />
        <Route path="/spaced-repetition" element={<LazyPage><SpacedRepetitionPage /></LazyPage>} />
        
        {/* Phase 2 Killer Features */}
        <Route path="/blindfold" element={<LazyPage><BlindfoldTrainerPage /></LazyPage>} />
        <Route path="/intuition" element={<LazyPage><IntuitionTrainerPage /></LazyPage>} />
        <Route path="/weakness-detector" element={<LazyPage><WeaknessDetectorPage /></LazyPage>} />
        
        {/* Auth & Monetization */}
        <Route path="/pricing" element={<LazyPage><PricingPage /></LazyPage>} />
        <Route path="/auth" element={<LazyPage><AuthPage /></LazyPage>} />
        
        {/* AI Coach Hub */}
        <Route path="/ai-coach" element={<LazyPage><AICoachDashboard /></LazyPage>} />
        
        {/* Multiplayer - Play with Friends */}
        <Route path="/play/friend" element={<LazyPage><PlayFriendPage /></LazyPage>} />
        <Route path="/play/friend/:inviteCode" element={<LazyPage><PlayFriendPage /></LazyPage>} />
        <Route path="/play/live/:gameId" element={<LazyPage><LiveGamePage /></LazyPage>} />
        
        {/* Help & Documentation */}
        <Route path="/how-to" element={<LazyPage><HowToPage /></LazyPage>} />
        
        {/* Legal Pages */}
        <Route path="/privacy" element={<LazyPage><PrivacyPage /></LazyPage>} />
        <Route path="/terms" element={<LazyPage><TermsPage /></LazyPage>} />
        
        {/* 404 Catch-all - must be last */}
        <Route path="*" element={<PageTransition><NotFoundPage /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
}

// Agent-aware inner component that tracks navigation
function AppContent() {
  const location = useLocation();
  
  // This hook automatically tracks page navigation and session time
  useAgentAwareness();
  // Enable global keyboard shortcuts
  useGlobalShortcuts();
  
  // 🧠 AI INTELLIGENCE - Silent tracking and adaptation
  const { recordActivity } = useAIIntelligenceTracking();
  
  // AI preferences for genius features
  const { showAskAnything, showWhispers } = useAIPreferencesStore();
  
  // Determine context based on current route
  const aiContext = useMemo(() => {
    const path = location.pathname;
    if (path.includes('train') || path.includes('puzzle')) return 'puzzle';
    if (path.includes('play') || path.includes('sparring') || path.includes('calm-play')) return 'game';
    if (path.includes('opening')) return 'opening';
    if (path.includes('study') || path.includes('course') || path.includes('learn')) return 'study';
    return 'general';
  }, [location.pathname]);
  
  // Track activity changes for AI Intelligence
  useEffect(() => {
    const activityMap: Record<string, 'idle' | 'puzzle' | 'game' | 'study' | 'opening' | 'review'> = {
      puzzle: 'puzzle',
      game: 'game',
      opening: 'opening',
      study: 'study',
      general: 'idle',
    };
    recordActivity(activityMap[aiContext] || 'idle');
  }, [aiContext, recordActivity]);
  
  return (
    <>
      <AnimatedRoutes />
      {/* Floating agent notifications */}
      <AgentToastContainer />
      {/* Subtle agent status bar */}
      <AgentStatusBar />
      {/* Keyboard shortcuts help modal */}
      <KeyboardShortcutsHelp />
      {/* Achievement notifications */}
      <AchievementNotificationContainer />
      
      {/* 🧠 GENIUS AI FEATURES */}
      {/* Floating Ask Anything button - available everywhere */}
      <AskAnything 
        context={aiContext as 'puzzle' | 'game' | 'opening' | 'study' | 'general'} 
        enabled={showAskAnything}
      />
      {/* Contextual AI whispers - non-intrusive tips */}
      <GeniusWhisper 
        activity={aiContext as 'puzzle' | 'game' | 'opening' | 'study' | 'idle'}
        enabled={showWhispers}
      />
      
      {/* 🌟 AI AMBIENCE - Subtle, behind-the-scenes intelligence */}
      <AIAmbience />
    </>
  );
}

function App() {
  const { updateStreak } = useProgressStore();
  const { initialize: initializeAuth } = useAuthStore();

  // Initialize coach, agents, auth and update streak on app load
  useEffect(() => {
    updateStreak();
    initializeCoach();
    initializeAgents();
    initializeAuth();
  }, [updateStreak, initializeAuth]);

  return (
    <ErrorBoundary>
      <OnboardingWrapper>
        <Layout>
          <AppContent />
        </Layout>
      </OnboardingWrapper>
      {/* Update prompt for new app versions */}
      <UpdatePrompt />
      {/* Offline indicator */}
      <OfflineIndicator />
    </ErrorBoundary>
  );
}

export default App;

