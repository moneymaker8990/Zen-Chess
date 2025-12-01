import { AppLayout } from './components/Layout/AppLayout';
import { DayView } from './components/DayView/DayView';
import { useDailyEntry } from './hooks/useDailyEntry';

function App() {
  const { entry, loading, goToNext, goToPrev, goToToday } = useDailyEntry();

  return (
    <AppLayout>
      {loading || !entry ? (
        <div className="py-16 text-center">
          <div className="inline-block w-8 h-8 border-2 border-white/30 border-t-white/80 rounded-full animate-spin mb-4" />
          <p className="text-white/60 text-sm">Loading today's entry...</p>
        </div>
      ) : (
        <DayView
          entry={entry}
          onPrev={goToPrev}
          onNext={goToNext}
          onToday={goToToday}
        />
      )}
    </AppLayout>
  );
}

export default App;


