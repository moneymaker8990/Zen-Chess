import { ReactNode, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useProgressStore } from '@/state/useStore';

interface LayoutProps {
  children: ReactNode;
}

// SVG Icons as components for cleaner look
const Icons = {
  home: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
    </svg>
  ),
  lotus: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c-1.5 3-4.5 5-7.5 5 0 4.5 3 9 7.5 12 4.5-3 7.5-7.5 7.5-12-3 0-6-2-7.5-5z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v8M9 11l3 3 3-3" />
    </svg>
  ),
  mind: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
    </svg>
  ),
  calm: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
    </svg>
  ),
  alert: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
    </svg>
  ),
  map: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
    </svg>
  ),
  target: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 12h.01" />
    </svg>
  ),
  play: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
    </svg>
  ),
  crown: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l3 3 6-6 6 6 3-3v10a1 1 0 01-1 1H4a1 1 0 01-1-1V8z" />
    </svg>
  ),
  building: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
    </svg>
  ),
  lightning: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
    </svg>
  ),
  book: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
    </svg>
  ),
  chess: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2m0 0l3 3-3 2-3-2 3-3zm-5 7v8h10v-8m-10 0h10m-10 0l-2 8h14l-2-8" />
    </svg>
  ),
  settings: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  menu: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
  ),
  close: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
  fire: (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12.832 3.445c.281-.32.723-.38 1.075-.144.352.235.483.68.32 1.082-.522 1.285-.522 2.617 0 3.902.523 1.285 1.438 2.362 2.61 3.07.352.212.5.65.36 1.064-.14.413-.532.67-.95.623-1.34-.15-2.654.25-3.678 1.12-1.023.87-1.667 2.113-1.8 3.48-.04.413-.352.742-.76.8-.407.058-.8-.172-.954-.56-.494-1.242-.494-2.604 0-3.846.493-1.242 1.38-2.29 2.53-2.988.346-.21.49-.64.35-1.05-.14-.41-.527-.665-.94-.62-1.32.143-2.616-.254-3.627-1.11-1.01-.858-1.65-2.086-1.786-3.436-.04-.413.173-.8.52-.94.346-.14.747-.02.973.293.726.996 1.773 1.708 2.97 2.02 1.195.31 2.46.2 3.58-.314.337-.155.73-.07.97.207z"/>
    </svg>
  ),
};

// Navigation items grouped by section
const navSections = [
  {
    title: null, // Primary - no title
    items: [
      { path: '/', label: 'Home', icon: Icons.home },
      { path: '/journey', label: 'Journey', icon: Icons.map },
      { path: '/day', label: 'Daily Practice', icon: Icons.lotus },
    ],
  },
  {
    title: 'Play & Train',
    items: [
      { path: '/play', label: 'Play', icon: Icons.play },
      { path: '/train', label: 'Tactics', icon: Icons.lightning },
      { path: '/openings', label: 'Openings', icon: Icons.book },
      { path: '/patterns', label: 'Patterns', icon: Icons.building },
    ],
  },
  {
    title: 'Mental Game',
    items: [
      { path: '/mind', label: 'Mind Training', icon: Icons.mind },
      { path: '/calm-play', label: 'Calm Play', icon: Icons.calm },
      { path: '/mistakes', label: 'Mistakes', icon: Icons.alert },
    ],
  },
  {
    title: 'Masters',
    items: [
      { path: '/greats', label: 'Legends', icon: Icons.crown },
      { path: '/games', label: 'Games', icon: Icons.chess },
    ],
  },
];

// Flatten for mobile quick nav
const navItems = navSections.flatMap(s => s.items);

export function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const { progress } = useProgressStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isFullscreen = location.pathname.includes('/calm-play');

  if (isFullscreen) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex flex-col w-64 fixed inset-y-0 left-0 z-40" 
        style={{ background: 'var(--bg-secondary)', borderRight: '1px solid var(--border-subtle)' }}>
        {/* Logo */}
        <div className="h-16 flex items-center px-6" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
          <NavLink to="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center text-lg"
              style={{ background: 'linear-gradient(135deg, #a855f7 0%, #7c3aed 100%)' }}>
              ♔
            </div>
            <span className="font-display text-lg font-medium" style={{ color: 'var(--text-primary)' }}>
              Zen Chess
            </span>
          </NavLink>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 overflow-y-auto">
          {navSections.map((section, sectionIndex) => (
            <div key={sectionIndex} className={section.title ? 'mt-6 first:mt-0' : ''}>
              {section.title && (
                <div className="px-3 mb-2">
                  <span className="text-[10px] uppercase tracking-widest font-medium" 
                    style={{ color: 'var(--text-muted)' }}>
                    {section.title}
                  </span>
                </div>
              )}
              <div className="space-y-1">
                {section.items.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) => `
                      nav-item
                      ${isActive ? 'active' : ''}
                    `}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </nav>

        {/* Bottom section */}
        <div className="p-4 space-y-3" style={{ borderTop: '1px solid var(--border-subtle)' }}>
          {/* Streak display */}
          <div className="card p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(251, 191, 36, 0.15)' }}>
                <span className="text-amber-400">{Icons.fire}</span>
              </div>
              <div>
                <div className="text-2xl font-display font-semibold" style={{ color: 'var(--accent-gold)' }}>
                  {progress.streakDays}
                </div>
                <div className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Day Streak</div>
              </div>
            </div>
          </div>

          {/* Settings link */}
          <NavLink
            to="/settings"
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            {Icons.settings}
            <span>Settings</span>
          </NavLink>
        </div>
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile sidebar */}
      <aside className={`
        lg:hidden fixed inset-y-0 left-0 z-50 w-72 transform transition-transform duration-300
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `} style={{ background: 'var(--bg-secondary)' }}>
        {/* Mobile header */}
        <div className="h-16 flex items-center justify-between px-4" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
          <NavLink to="/" className="flex items-center gap-3" onClick={() => setSidebarOpen(false)}>
            <div className="w-9 h-9 rounded-lg flex items-center justify-center text-lg"
              style={{ background: 'linear-gradient(135deg, #a855f7 0%, #7c3aed 100%)' }}>
              ♔
            </div>
            <span className="font-display text-lg font-medium" style={{ color: 'var(--text-primary)' }}>
              Zen Chess
            </span>
          </NavLink>
          <button 
            onClick={() => setSidebarOpen(false)}
            className="p-2 rounded-lg hover:bg-[var(--bg-tertiary)] transition-colors"
            style={{ color: 'var(--text-secondary)' }}
          >
            {Icons.close}
          </button>
        </div>

        {/* Mobile navigation */}
        <nav className="px-3 py-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            >
              {item.icon}
              <span>{item.label}</span>
            </NavLink>
          ))}
          <div className="divider" />
          <NavLink
            to="/settings"
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            {Icons.settings}
            <span>Settings</span>
          </NavLink>
        </nav>
      </aside>

      {/* Main content area */}
      <div className="flex-1 lg:ml-64">
        {/* Top bar - Mobile */}
        <header className="lg:hidden sticky top-0 z-30 h-16 flex items-center justify-between px-4"
          style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-subtle)' }}>
          <button 
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg hover:bg-[var(--bg-tertiary)] transition-colors"
            style={{ color: 'var(--text-secondary)' }}
          >
            {Icons.menu}
          </button>
          
          <NavLink to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm"
              style={{ background: 'linear-gradient(135deg, #a855f7 0%, #7c3aed 100%)' }}>
              ♔
            </div>
            <span className="font-display font-medium" style={{ color: 'var(--text-primary)' }}>
              Zen Chess
            </span>
          </NavLink>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 px-2 py-1 rounded-full"
              style={{ background: 'rgba(251, 191, 36, 0.15)' }}>
              <span className="text-amber-400 text-sm">{Icons.fire}</span>
              <span className="text-sm font-medium" style={{ color: 'var(--accent-gold)' }}>
                {progress.streakDays}
              </span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 lg:p-8">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Layout;
