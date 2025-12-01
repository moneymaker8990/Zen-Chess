import { useNavigate } from 'react-router-dom';
import { useProgressStore } from '@/state/useStore';
import { DailyLesson } from '@/components/DailyLesson';
import { getDayByNumber, allDays } from '@/data/days';

export function DayPage() {
  const navigate = useNavigate();
  const { progress, setCurrentDay } = useProgressStore();
  
  const currentDayData = getDayByNumber(progress.currentDay);

  const handlePreviousDay = () => {
    if (progress.currentDay > 1) {
      setCurrentDay(progress.currentDay - 1);
    }
  };

  const handleNextDay = () => {
    if (progress.currentDay < 365) {
      setCurrentDay(progress.currentDay + 1);
    }
  };

  const handleComplete = () => {
    if (progress.currentDay < 365) {
      setCurrentDay(progress.currentDay + 1);
    }
  };

  if (!currentDayData) {
    return (
      <div className="glass-card p-8 text-center">
        <p className="text-zen-400">Day not found</p>
        <button
          onClick={() => setCurrentDay(1)}
          className="zen-button mt-4"
        >
          Start from Day 1
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Day navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={handlePreviousDay}
          disabled={progress.currentDay <= 1}
          className="zen-button-ghost disabled:opacity-30 disabled:cursor-not-allowed"
        >
          ← Previous Day
        </button>

        {/* Day selector */}
        <div className="flex items-center gap-3">
          <label className="text-zen-500 text-sm">Jump to:</label>
          <select
            value={progress.currentDay}
            onChange={(e) => setCurrentDay(parseInt(e.target.value))}
            className="bg-zen-800 text-zen-200 px-3 py-2 rounded-lg border border-zen-700/50 text-sm"
          >
            {allDays.map((day) => (
              <option key={day.dayNumber} value={day.dayNumber}>
                Day {day.dayNumber}: {day.title}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleNextDay}
          disabled={progress.currentDay >= 365}
          className="zen-button-ghost disabled:opacity-30 disabled:cursor-not-allowed"
        >
          Next Day →
        </button>
      </div>

      {/* Main lesson content */}
      <DailyLesson 
        day={currentDayData} 
        onComplete={handleComplete}
      />

      {/* Bottom navigation */}
      <div className="flex justify-center gap-4 pt-8">
        <button
          onClick={() => navigate('/play')}
          className="zen-button"
        >
          Practice Play
        </button>
        <button
          onClick={() => navigate('/train')}
          className="zen-button"
        >
          Pattern Training
        </button>
      </div>
    </div>
  );
}

export default DayPage;



