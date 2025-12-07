import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

// Mock the Layout component's dependencies
vi.mock('@/state/useStore', () => ({
  useUIStore: () => ({
    isSidebarOpen: true,
    toggleSidebar: vi.fn(),
  }),
  useProgressStore: () => ({
    progress: {
      streakDays: 5,
      currentDay: 10,
      settings: { theme: 'dark' },
    },
  }),
}));

vi.mock('@/state/useAuthStore', () => ({
  useAuthStore: () => ({
    user: null,
    isPremium: false,
  }),
}));

vi.mock('@/lib/soundSystem', () => ({
  useSoundStore: () => ({
    settings: { enabled: true },
    toggleSound: vi.fn(),
  }),
}));

describe('Layout Component', () => {
  it('should render without crashing', async () => {
    const { Layout } = await import('@/components/Layout');
    
    render(
      <BrowserRouter>
        <Layout>
          <div>Test content</div>
        </Layout>
      </BrowserRouter>
    );
    
    // Layout should render children
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });
});

