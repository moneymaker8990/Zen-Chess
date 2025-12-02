// ============================================
// AI COACH DASHBOARD
// The ultimate AI-powered chess coaching hub
// ============================================

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChatInterface, VoiceChat, AIStatus } from '@/components/AICoach';
import { AVAILABLE_AGENTS, type AgentId } from '@/hooks/useAICoach';
import { 
  analyzePosition, 
  generateWeeklyStudyPlan, 
  getDailyMessage,
  testClaudeConnection,
  type DailyMessage,
  type WeeklyStudyPlan,
} from '@/lib/claudeAdvanced';

type Tab = 'chat' | 'voice' | 'analyze' | 'study' | 'agents';

export function AICoachDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('chat');
  const [selectedAgent, setSelectedAgent] = useState<AgentId>('coach');
  const [dailyMessage, setDailyMessage] = useState<DailyMessage | null>(null);
  const [studyPlan, setStudyPlan] = useState<WeeklyStudyPlan | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [positionFEN, setPositionFEN] = useState('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');
  const [positionAnalysis, setPositionAnalysis] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Load daily message on mount
  useEffect(() => {
    const loadDailyMessage = async () => {
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const message = await getDailyMessage(
        'Champion',
        days[new Date().getDay()],
        {
          lastPlayedDaysAgo: 0,
          currentStreak: 7,
          recentPerformance: 'improving',
        }
      );
      setDailyMessage(message);
    };
    loadDailyMessage();
  }, []);

  // Generate study plan
  const generateStudyPlan = async () => {
    setIsGenerating(true);
    try {
      const plan = await generateWeeklyStudyPlan({
        rating: 1400,
        weaknesses: ['endgames', 'time management'],
        strengths: ['tactics', 'opening knowledge'],
        timePerDay: 30,
        goals: ['reach 1500 rating', 'improve endgame technique'],
        recentPerformance: 'improving',
      });
      setStudyPlan(plan);
    } catch (error) {
      console.error('Failed to generate study plan:', error);
    }
    setIsGenerating(false);
  };

  // Analyze position
  const handleAnalyzePosition = async () => {
    setIsAnalyzing(true);
    try {
      const analysis = await analyzePosition(positionFEN, 'white');
      setPositionAnalysis(analysis);
    } catch (error) {
      console.error('Failed to analyze position:', error);
    }
    setIsAnalyzing(false);
  };

  const tabs = [
    { id: 'chat' as Tab, label: '💬 Chat', description: 'Text conversation' },
    { id: 'voice' as Tab, label: '🎤 Voice', description: 'Hands-free coaching' },
    { id: 'analyze' as Tab, label: '🔍 Analyze', description: 'Position analysis' },
    { id: 'study' as Tab, label: '📚 Study Plan', description: 'AI-generated plans' },
    { id: 'agents' as Tab, label: '🤖 Agents', description: 'Meet your coaches' },
  ];

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              🧠 AI Coach Hub
            </h1>
            <p className="text-gray-400">
              Cutting-edge AI coaching powered by Claude
            </p>
          </div>
          <AIStatus showDetails={false} />
        </div>

        {/* Daily Message */}
        {dailyMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-6 rounded-2xl"
            style={{
              background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(168, 85, 247, 0.2))',
              border: '1px solid rgba(168, 85, 247, 0.3)',
            }}
          >
            <p className="text-lg text-white mb-2">{dailyMessage.greeting}</p>
            <p className="text-gray-300 italic mb-4">"{dailyMessage.wisdom}"</p>
            <div className="flex flex-wrap gap-4 text-sm">
              <span className="px-3 py-1 bg-purple-500/20 rounded-full text-purple-300">
                🎯 Today: {dailyMessage.focusArea}
              </span>
              <span className="px-3 py-1 bg-green-500/20 rounded-full text-green-300">
                ⚡ Challenge: {dailyMessage.challenge}
              </span>
            </div>
          </motion.div>
        )}

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 rounded-xl whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              <span className="text-lg mr-2">{tab.label.split(' ')[0]}</span>
              <span className="hidden md:inline">{tab.label.split(' ').slice(1).join(' ')}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            {/* Chat Tab */}
            {activeTab === 'chat' && (
              <div className="grid md:grid-cols-4 gap-4">
                {/* Agent Selector Sidebar */}
                <div className="md:col-span-1 space-y-2">
                  <p className="text-xs uppercase tracking-wider text-gray-500 mb-3">Select Coach</p>
                  {AVAILABLE_AGENTS.slice(0, 6).map((agent) => (
                    <button
                      key={agent.id}
                      onClick={() => setSelectedAgent(agent.id)}
                      className={`w-full p-3 rounded-xl text-left transition-all ${
                        selectedAgent === agent.id
                          ? 'bg-purple-600/30 border-purple-500'
                          : 'bg-gray-800/50 hover:bg-gray-700/50 border-transparent'
                      } border`}
                    >
                      <p className="font-medium text-white">{agent.name}</p>
                      <p className="text-xs text-gray-400">{agent.role}</p>
                    </button>
                  ))}
                </div>
                
                {/* Chat Interface */}
                <div className="md:col-span-3 h-[600px]">
                  <ChatInterface 
                    initialAgent={selectedAgent}
                    showAgentSelector={false}
                  />
                </div>
              </div>
            )}

            {/* Voice Tab */}
            {activeTab === 'voice' && (
              <div 
                className="rounded-2xl overflow-hidden"
                style={{ background: 'var(--bg-secondary)' }}
              >
                <VoiceChat initialAgent={selectedAgent} />
              </div>
            )}

            {/* Analyze Tab */}
            {activeTab === 'analyze' && (
              <div className="space-y-6">
                <div 
                  className="p-6 rounded-2xl"
                  style={{ background: 'var(--bg-secondary)' }}
                >
                  <h3 className="text-xl font-bold text-white mb-4">🔍 Position Analysis</h3>
                  <div className="flex gap-4 mb-4">
                    <input
                      type="text"
                      value={positionFEN}
                      onChange={(e) => setPositionFEN(e.target.value)}
                      placeholder="Enter FEN position..."
                      className="flex-1 bg-gray-800 text-white rounded-xl px-4 py-3 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <button
                      onClick={handleAnalyzePosition}
                      disabled={isAnalyzing}
                      className="px-6 py-3 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700 disabled:opacity-50 transition-all"
                    >
                      {isAnalyzing ? 'Analyzing...' : 'Analyze'}
                    </button>
                  </div>

                  {positionAnalysis && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-4 mt-6"
                    >
                      <div className="p-4 bg-gray-800/50 rounded-xl">
                        <p className="text-sm text-gray-400 mb-1">Evaluation</p>
                        <p className="text-lg text-white">{positionAnalysis.evaluation}</p>
                      </div>
                      
                      {positionAnalysis.bestMoves?.length > 0 && (
                        <div className="p-4 bg-gray-800/50 rounded-xl">
                          <p className="text-sm text-gray-400 mb-2">Best Moves</p>
                          <ul className="space-y-1">
                            {positionAnalysis.bestMoves.map((move: string, i: number) => (
                              <li key={i} className="text-gray-200">• {move}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {positionAnalysis.strategicIdeas?.length > 0 && (
                        <div className="p-4 bg-gray-800/50 rounded-xl">
                          <p className="text-sm text-gray-400 mb-2">Strategic Ideas</p>
                          <ul className="space-y-1">
                            {positionAnalysis.strategicIdeas.map((idea: string, i: number) => (
                              <li key={i} className="text-gray-200">• {idea}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </motion.div>
                  )}
                </div>
              </div>
            )}

            {/* Study Plan Tab */}
            {activeTab === 'study' && (
              <div className="space-y-6">
                <div 
                  className="p-6 rounded-2xl"
                  style={{ background: 'var(--bg-secondary)' }}
                >
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-white">📚 AI Study Plan</h3>
                    <button
                      onClick={generateStudyPlan}
                      disabled={isGenerating}
                      className="px-6 py-2 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 disabled:opacity-50 transition-all"
                    >
                      {isGenerating ? 'Generating...' : 'Generate New Plan'}
                    </button>
                  </div>

                  {studyPlan ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="space-y-6"
                    >
                      <div className="p-4 bg-purple-900/30 rounded-xl border border-purple-700/30">
                        <p className="text-purple-300 text-sm uppercase tracking-wider">This Week's Theme</p>
                        <p className="text-2xl font-bold text-white mt-1">{studyPlan.theme}</p>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="p-4 bg-gray-800/50 rounded-xl">
                          <p className="text-sm text-gray-400 mb-2">Goals</p>
                          <ul className="space-y-1">
                            {studyPlan.goals.map((goal, i) => (
                              <li key={i} className="text-gray-200 flex items-center gap-2">
                                <span className="text-green-500">✓</span> {goal}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="p-4 bg-gray-800/50 rounded-xl">
                          <p className="text-sm text-gray-400 mb-2">Weekly Challenge</p>
                          <p className="text-gray-200">{studyPlan.weeklyChallenge}</p>
                        </div>
                      </div>

                      {studyPlan.days?.length > 0 && (
                        <div className="space-y-3">
                          <p className="text-sm text-gray-400">Daily Schedule</p>
                          {studyPlan.days.map((day, i) => (
                            <div key={i} className="p-4 bg-gray-800/50 rounded-xl">
                              <p className="font-medium text-white">{day.day}</p>
                              <p className="text-sm text-purple-300">{day.focus}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-6xl mb-4">📋</p>
                      <p className="text-gray-400">
                        Click "Generate New Plan" to create your personalized weekly study plan
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Agents Tab */}
            {activeTab === 'agents' && (
              <div className="grid md:grid-cols-3 gap-4">
                {AVAILABLE_AGENTS.map((agent, i) => (
                  <motion.div
                    key={agent.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="p-6 rounded-2xl hover:scale-105 transition-transform cursor-pointer"
                    style={{ background: 'var(--bg-secondary)' }}
                    onClick={() => {
                      setSelectedAgent(agent.id);
                      setActiveTab('chat');
                    }}
                  >
                    <div className="text-4xl mb-3">
                      {['🧘', '🛡️', '📐', '🔮', '🧭', '📜', '🪷', '💎', '⚡', '⚓', '🎵', '🏛️'][i] || '🤖'}
                    </div>
                    <h3 className="text-lg font-bold text-white mb-1">{agent.name}</h3>
                    <p className="text-sm text-purple-400 mb-2">{agent.role}</p>
                    <p className="text-sm text-gray-400 mb-3">
                      {agent.expertise.slice(0, 3).join(' • ')}
                    </p>
                    <p className="text-xs text-gray-500 italic">
                      "{agent.openingLine}"
                    </p>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* AI Status Details */}
        <div className="mt-8">
          <AIStatus showDetails={true} />
        </div>
      </div>
    </div>
  );
}

export default AICoachDashboard;

