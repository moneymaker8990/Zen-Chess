import { ReactNode } from 'react';

type AppLayoutProps = {
  children: ReactNode;
};

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      {/* Ambient glow effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-violet-400/10 rounded-full blur-2xl" />
      </div>
      
      <div className="relative w-full max-w-3xl glass rounded-3xl p-6 md:p-10">
        <header className="mb-8 md:mb-10 text-center">
          <h1 className="text-3xl md:text-4xl font-serif font-medium tracking-wide text-white">
            Daily Vijnana Wisdom
          </h1>
          <p className="text-sm md:text-base text-white/60 mt-2 font-light">
            A quiet daily companion weaving Vijnana Bhairava, Tao, Art of War, and the Upanishads.
          </p>
        </header>
        <main>{children}</main>
      </div>
    </div>
  );
}


