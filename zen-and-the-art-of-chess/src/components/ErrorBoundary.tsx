// ============================================
// ERROR BOUNDARY
// Graceful error handling with recovery options
// ============================================

import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ errorInfo });
    
    // Log error to console (in production, send to error tracking service)
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    // Store error for potential bug reporting
    try {
      const errorLog = JSON.parse(localStorage.getItem('zenChessErrorLog') || '[]');
      errorLog.push({
        timestamp: Date.now(),
        error: error.toString(),
        stack: error.stack,
        componentStack: errorInfo.componentStack,
        url: window.location.href,
      });
      // Keep only last 10 errors
      localStorage.setItem('zenChessErrorLog', JSON.stringify(errorLog.slice(-10)));
    } catch {
      // Ignore storage errors
    }
  }

  handleReload = () => {
    window.location.reload();
  };

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  handleClearData = () => {
    if (window.confirm('This will reset all your progress and settings. Are you sure?')) {
      // Clear all localStorage
      const keysToKeep: string[] = []; // Add any keys you want to preserve
      Object.keys(localStorage).forEach(key => {
        if (!keysToKeep.includes(key)) {
          localStorage.removeItem(key);
        }
      });
      window.location.href = '/';
    }
  };

  handleGoHome = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center p-4"
          style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)' }}
        >
          <div className="max-w-lg w-full text-center space-y-6">
            {/* Error Icon */}
            <div 
              className="w-20 h-20 mx-auto rounded-full flex items-center justify-center text-4xl"
              style={{ background: 'rgba(239, 68, 68, 0.2)' }}
            >
              💔
            </div>

            {/* Error Message */}
            <div>
              <h1 className="text-2xl font-display font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                Something went wrong
              </h1>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                An unexpected error occurred. Don't worry, your progress is safe.
              </p>
            </div>

            {/* Error Details (collapsed by default) */}
            <details className="text-left">
              <summary 
                className="cursor-pointer text-sm py-2"
                style={{ color: 'var(--text-muted)' }}
              >
                Technical details
              </summary>
              <pre 
                className="mt-2 p-4 rounded-lg text-xs overflow-auto max-h-40"
                style={{ 
                  background: 'var(--bg-secondary)',
                  color: 'var(--text-tertiary)',
                }}
              >
                {this.state.error?.toString()}
                {'\n\n'}
                {this.state.error?.stack}
              </pre>
            </details>

            {/* Recovery Actions */}
            <div className="flex flex-col gap-3">
              <button
                onClick={this.handleGoHome}
                className="w-full py-3 rounded-xl font-medium text-white transition-all hover:scale-[1.02]"
                style={{ background: 'linear-gradient(135deg, #a855f7, #3b82f6)' }}
              >
                Go to Home
              </button>
              
              <div className="flex gap-3">
                <button
                  onClick={this.handleReload}
                  className="flex-1 py-3 rounded-xl font-medium transition-all hover:bg-white/10"
                  style={{ 
                    background: 'var(--bg-secondary)',
                    color: 'var(--text-secondary)',
                  }}
                >
                  Reload Page
                </button>
                <button
                  onClick={this.handleReset}
                  className="flex-1 py-3 rounded-xl font-medium transition-all hover:bg-white/10"
                  style={{ 
                    background: 'var(--bg-secondary)',
                    color: 'var(--text-secondary)',
                  }}
                >
                  Try Again
                </button>
              </div>

              <button
                onClick={this.handleClearData}
                className="text-xs py-2 transition-colors hover:text-red-400"
                style={{ color: 'var(--text-muted)' }}
              >
                Reset all data (last resort)
              </button>
            </div>

            {/* Support Link */}
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
              If this keeps happening, try clearing your browser cache or{' '}
              <a 
                href="mailto:support@zenchess.app"
                className="underline hover:text-white"
              >
                contact support
              </a>
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// ============================================
// MINI ERROR BOUNDARY
// For smaller components
// ============================================

interface MiniBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  name?: string;
}

interface MiniBoundaryState {
  hasError: boolean;
}

export class MiniErrorBoundary extends Component<MiniBoundaryProps, MiniBoundaryState> {
  constructor(props: MiniBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): MiniBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(`Error in ${this.props.name || 'component'}:`, error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div 
          className="p-4 rounded-lg text-center"
          style={{ background: 'rgba(239, 68, 68, 0.1)' }}
        >
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            Failed to load {this.props.name || 'this section'}
          </p>
          <button
            onClick={() => this.setState({ hasError: false })}
            className="text-xs mt-2 underline"
            style={{ color: 'var(--accent-primary)' }}
          >
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}







