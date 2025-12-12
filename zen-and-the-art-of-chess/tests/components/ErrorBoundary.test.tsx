import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ErrorBoundary, MiniErrorBoundary } from '@/components/ErrorBoundary';

// Component that throws an error
const ThrowError = ({ shouldThrow = true }: { shouldThrow?: boolean }) => {
  if (shouldThrow) {
    throw new Error('Test error');
  }
  return <div>No error</div>;
};

describe('ErrorBoundary', () => {
  // Suppress console.error for cleaner test output
  const originalError = console.error;
  beforeEach(() => {
    console.error = vi.fn();
  });
  afterEach(() => {
    console.error = originalError;
  });

  it('should render children when no error', () => {
    render(
      <ErrorBoundary>
        <div>Test content</div>
      </ErrorBoundary>
    );
    
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('should render error UI when error occurs', () => {
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );
    
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });

  it('should show Go to Home button on error', () => {
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );
    
    expect(screen.getByText('Go to Home')).toBeInTheDocument();
  });

  it('should show Reload Page button on error', () => {
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );
    
    expect(screen.getByText('Reload Page')).toBeInTheDocument();
  });

  it('should show Try Again button on error', () => {
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );
    
    expect(screen.getByText('Try Again')).toBeInTheDocument();
  });

  it('should show technical details section', () => {
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );
    
    expect(screen.getByText('Technical details')).toBeInTheDocument();
  });

  it('should render custom fallback when provided', () => {
    render(
      <ErrorBoundary fallback={<div>Custom fallback</div>}>
        <ThrowError />
      </ErrorBoundary>
    );
    
    expect(screen.getByText('Custom fallback')).toBeInTheDocument();
  });
});

describe('MiniErrorBoundary', () => {
  const originalError = console.error;
  beforeEach(() => {
    console.error = vi.fn();
  });
  afterEach(() => {
    console.error = originalError;
  });

  it('should render children when no error', () => {
    render(
      <MiniErrorBoundary>
        <div>Mini content</div>
      </MiniErrorBoundary>
    );
    
    expect(screen.getByText('Mini content')).toBeInTheDocument();
  });

  it('should render error UI when error occurs', () => {
    render(
      <MiniErrorBoundary name="TestSection">
        <ThrowError />
      </MiniErrorBoundary>
    );
    
    expect(screen.getByText('Failed to load TestSection')).toBeInTheDocument();
  });

  it('should show Try again button', () => {
    render(
      <MiniErrorBoundary>
        <ThrowError />
      </MiniErrorBoundary>
    );
    
    expect(screen.getByText('Try again')).toBeInTheDocument();
  });

  it('should render custom fallback when provided', () => {
    render(
      <MiniErrorBoundary fallback={<div>Mini fallback</div>}>
        <ThrowError />
      </MiniErrorBoundary>
    );
    
    expect(screen.getByText('Mini fallback')).toBeInTheDocument();
  });
});





