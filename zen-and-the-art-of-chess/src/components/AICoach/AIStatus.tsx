// ============================================
// AI STATUS COMPONENT
// Shows Claude connection status & diagnostics
// ============================================

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { testClaudeConnection } from '@/lib/claudeAdvanced';

interface AIStatusProps {
  showDetails?: boolean;
  onStatusChange?: (connected: boolean) => void;
}

export function AIStatus({ showDetails = false, onStatusChange }: AIStatusProps) {
  const [status, setStatus] = useState<{
    connected: boolean;
    latency: number;
    model: string;
    error?: string;
    lastChecked: Date | null;
    checking: boolean;
  }>({
    connected: false,
    latency: 0,
    model: '',
    lastChecked: null,
    checking: true,
  });

  const checkConnection = async () => {
    setStatus(prev => ({ ...prev, checking: true }));
    
    try {
      const result = await testClaudeConnection();
      setStatus({
        connected: result.connected,
        latency: result.latency,
        model: result.model,
        error: result.error,
        lastChecked: new Date(),
        checking: false,
      });
      onStatusChange?.(result.connected);
    } catch (error) {
      setStatus({
        connected: false,
        latency: 0,
        model: '',
        error: 'Connection test failed',
        lastChecked: new Date(),
        checking: false,
      });
      onStatusChange?.(false);
    }
  };

  useEffect(() => {
    checkConnection();
    // Re-check every 5 minutes
    const interval = setInterval(checkConnection, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (!showDetails) {
    // Minimal status indicator
    return (
      <motion.div
        className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium"
        style={{
          background: status.checking 
            ? 'rgba(251, 191, 36, 0.2)' 
            : status.connected 
              ? 'rgba(34, 197, 94, 0.2)' 
              : 'rgba(239, 68, 68, 0.2)',
          color: status.checking 
            ? '#fbbf24' 
            : status.connected 
              ? '#22c55e' 
              : '#ef4444',
        }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <motion.div
          className="w-2 h-2 rounded-full"
          style={{
            backgroundColor: status.checking 
              ? '#fbbf24' 
              : status.connected 
                ? '#22c55e' 
                : '#ef4444',
          }}
          animate={status.checking ? { 
            scale: [1, 1.2, 1],
            opacity: [1, 0.5, 1],
          } : {}}
          transition={{ duration: 1, repeat: Infinity }}
        />
        {status.checking ? 'Connecting...' : status.connected ? 'AI Ready' : 'AI Offline'}
      </motion.div>
    );
  }

  // Detailed status panel
  return (
    <motion.div
      className="p-6 rounded-2xl"
      style={{
        background: 'var(--bg-secondary)',
        border: '1px solid var(--border-subtle)',
      }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
          🤖 AI Coach Status
        </h3>
        <button
          onClick={checkConnection}
          disabled={status.checking}
          className="px-3 py-1 text-sm rounded-lg transition-all hover:bg-white/10 disabled:opacity-50"
          style={{ color: 'var(--text-secondary)' }}
        >
          {status.checking ? 'Testing...' : 'Refresh'}
        </button>
      </div>

      <div className="space-y-4">
        {/* Connection Status */}
        <div className="flex items-center gap-3">
          <div
            className="w-4 h-4 rounded-full"
            style={{
              backgroundColor: status.checking 
                ? '#fbbf24' 
                : status.connected 
                  ? '#22c55e' 
                  : '#ef4444',
              boxShadow: `0 0 10px ${status.checking ? '#fbbf24' : status.connected ? '#22c55e' : '#ef4444'}`,
            }}
          />
          <div>
            <p className="font-medium" style={{ color: 'var(--text-primary)' }}>
              {status.checking ? 'Testing Connection...' : status.connected ? 'Connected to Claude AI' : 'Connection Failed'}
            </p>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
              {status.error || (status.connected ? 'All systems operational' : 'Check your API key')}
            </p>
          </div>
        </div>

        {/* Details */}
        {status.connected && (
          <>
            <div className="grid grid-cols-2 gap-4 pt-4 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
              <div>
                <p className="text-xs uppercase tracking-wider mb-1" style={{ color: 'var(--text-muted)' }}>
                  Model
                </p>
                <p className="font-mono text-sm" style={{ color: 'var(--text-secondary)' }}>
                  {status.model}
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider mb-1" style={{ color: 'var(--text-muted)' }}>
                  Latency
                </p>
                <p className="font-mono text-sm" style={{ color: 'var(--text-secondary)' }}>
                  {status.latency}ms
                </p>
              </div>
            </div>

            {/* Capabilities */}
            <div className="pt-4 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
              <p className="text-xs uppercase tracking-wider mb-3" style={{ color: 'var(--text-muted)' }}>
                Active Capabilities
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  '💬 Chat',
                  '🎤 Voice',
                  '📊 Analysis',
                  '📚 Study Plans',
                  '🎯 Commentary',
                  '🧠 Psychology',
                  '🔍 Review',
                ].map((cap) => (
                  <span
                    key={cap}
                    className="px-2 py-1 text-xs rounded-full"
                    style={{
                      background: 'rgba(34, 197, 94, 0.2)',
                      color: '#22c55e',
                    }}
                  >
                    {cap}
                  </span>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Error troubleshooting */}
        {!status.connected && !status.checking && (
          <div 
            className="p-4 rounded-xl mt-4"
            style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)' }}
          >
            <p className="font-medium text-red-400 mb-2">Troubleshooting:</p>
            <ul className="text-sm text-red-300 space-y-1">
              <li>• Check that VITE_ANTHROPIC_API_KEY is set in .env</li>
              <li>• Verify your API key is valid and has credits</li>
              <li>• Ensure you're not being rate limited</li>
              <li>• Try refreshing the page</li>
            </ul>
          </div>
        )}

        {/* Last checked */}
        {status.lastChecked && (
          <p className="text-xs text-center pt-2" style={{ color: 'var(--text-muted)' }}>
            Last checked: {status.lastChecked.toLocaleTimeString()}
          </p>
        )}
      </div>
    </motion.div>
  );
}

export default AIStatus;





