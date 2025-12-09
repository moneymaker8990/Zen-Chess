// ============================================
// VIDEO LESSON COMPONENT
// Embeds video content with chess integration
// ============================================

import { useState, useRef, useCallback } from 'react';
import { VIDEO_PROVIDERS } from '@/lib/constants';

// ============================================
// TYPES
// ============================================

export interface VideoLessonContent {
  id: string;
  provider: 'youtube' | 'vimeo';
  videoId: string;
  title: string;
  description?: string;
  duration: string;
  thumbnail?: string;
  timestamps?: {
    time: number; // seconds
    label: string;
    fen?: string; // Optional position at this timestamp
  }[];
  relatedContent?: {
    type: 'puzzle' | 'lesson' | 'pattern';
    id: string;
    title: string;
  }[];
}

interface VideoLessonProps {
  content: VideoLessonContent;
  onComplete?: () => void;
  onTimestamp?: (timestamp: { time: number; label: string; fen?: string }) => void;
  autoplay?: boolean;
}

// ============================================
// COMPONENT
// ============================================

export function VideoLesson({ content, onComplete, onTimestamp, autoplay = false }: VideoLessonProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [progress, setProgress] = useState(0);
  const [showTimestamps, setShowTimestamps] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Get embed URL based on provider
  const getEmbedUrl = useCallback(() => {
    const provider = VIDEO_PROVIDERS[content.provider];
    let url = provider.embedUrl(content.videoId);
    
    // Add autoplay and other params
    const params = new URLSearchParams({
      autoplay: autoplay ? '1' : '0',
      rel: '0',
      modestbranding: '1',
    });
    
    return `${url}?${params.toString()}`;
  }, [content.provider, content.videoId, autoplay]);

  // Handle timestamp click
  const handleTimestampClick = (timestamp: { time: number; label: string; fen?: string }) => {
    onTimestamp?.(timestamp);
    // Note: Would need YouTube/Vimeo API to seek to timestamp
  };

  // Format time (seconds to MM:SS)
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-4">
      {/* Video Container */}
      <div className="video-container shadow-2xl shadow-black/40">
        <iframe
          ref={iframeRef}
          src={getEmbedUrl()}
          title={content.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

      {/* Video Info */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-display font-medium" style={{ color: 'var(--text-primary)' }}>
            {content.title}
          </h2>
          {content.description && (
            <p className="text-sm mt-1" style={{ color: 'var(--text-tertiary)' }}>
              {content.description}
            </p>
          )}
        </div>
        <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-muted)' }}>
          <span>⏱️ {content.duration}</span>
        </div>
      </div>

      {/* Timestamps */}
      {content.timestamps && content.timestamps.length > 0 && (
        <div className="card p-4">
          <button
            onClick={() => setShowTimestamps(!showTimestamps)}
            className="flex items-center justify-between w-full"
          >
            <h3 className="text-sm uppercase tracking-wider font-medium" style={{ color: 'var(--text-muted)' }}>
              Chapters ({content.timestamps.length})
            </h3>
            <svg 
              className={`w-5 h-5 transition-transform ${showTimestamps ? 'rotate-180' : ''}`}
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
              style={{ color: 'var(--text-muted)' }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          {showTimestamps && (
            <div className="mt-3 space-y-1">
              {content.timestamps.map((timestamp, index) => (
                <button
                  key={index}
                  onClick={() => handleTimestampClick(timestamp)}
                  className="w-full flex items-center gap-3 p-2 rounded-lg text-left transition-all hover:bg-[var(--bg-tertiary)]"
                >
                  <span 
                    className="text-sm font-mono px-2 py-0.5 rounded"
                    style={{ background: 'var(--bg-tertiary)', color: 'var(--accent-primary)' }}
                  >
                    {formatTime(timestamp.time)}
                  </span>
                  <span className="flex-1" style={{ color: 'var(--text-secondary)' }}>
                    {timestamp.label}
                  </span>
                  {timestamp.fen && (
                    <span className="text-xs px-2 py-0.5 rounded" style={{ background: 'rgba(168, 85, 247, 0.15)', color: 'var(--accent-primary)' }}>
                      ♞ Position
                    </span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Related Content */}
      {content.relatedContent && content.relatedContent.length > 0 && (
        <div className="card p-4">
          <h3 className="text-sm uppercase tracking-wider font-medium mb-3" style={{ color: 'var(--text-muted)' }}>
            Related Content
          </h3>
          <div className="flex flex-wrap gap-2">
            {content.relatedContent.map((item, index) => (
              <a
                key={index}
                href={`/${item.type === 'puzzle' ? 'train' : item.type === 'lesson' ? 'learn' : 'patterns'}/${item.id}`}
                className="flex items-center gap-2 px-3 py-2 rounded-lg transition-all hover:bg-[var(--bg-tertiary)]"
                style={{ background: 'var(--bg-tertiary)' }}
              >
                <span>
                  {item.type === 'puzzle' && '🧩'}
                  {item.type === 'lesson' && '📚'}
                  {item.type === 'pattern' && '🎯'}
                </span>
                <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  {item.title}
                </span>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Mark Complete Button */}
      {onComplete && (
        <button
          onClick={onComplete}
          className="zen-button w-full"
        >
          ✓ Mark as Complete
        </button>
      )}
    </div>
  );
}

// ============================================
// VIDEO THUMBNAIL CARD (for lists)
// ============================================

interface VideoThumbnailProps {
  content: VideoLessonContent;
  onClick?: () => void;
  completed?: boolean;
}

export function VideoThumbnailCard({ content, onClick, completed = false }: VideoThumbnailProps) {
  const thumbnailUrl = content.thumbnail || 
    (content.provider === 'youtube' 
      ? VIDEO_PROVIDERS.youtube.thumbnailUrl(content.videoId)
      : '');

  return (
    <button
      onClick={onClick}
      className={`card overflow-hidden text-left transition-all hover:scale-[1.02] ${completed ? 'opacity-75' : ''}`}
    >
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden">
        {thumbnailUrl ? (
          <img 
            src={thumbnailUrl}
            alt={content.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div 
            className="w-full h-full flex items-center justify-center text-4xl"
            style={{ background: 'var(--bg-tertiary)' }}
          >
            🎬
          </div>
        )}
        
        {/* Duration badge */}
        <div 
          className="absolute bottom-2 right-2 px-2 py-1 rounded text-xs font-medium"
          style={{ background: 'rgba(0,0,0,0.8)', color: 'white' }}
        >
          {content.duration}
        </div>
        
        {/* Play icon overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 hover:opacity-100 transition-opacity">
          <div 
            className="w-16 h-16 rounded-full flex items-center justify-center"
            style={{ background: 'var(--accent-primary)' }}
          >
            <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>
        </div>

        {/* Completed checkmark */}
        {completed && (
          <div 
            className="absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center"
            style={{ background: '#4ade80' }}
          >
            <span className="text-white text-sm">✓</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-medium line-clamp-2" style={{ color: 'var(--text-primary)' }}>
          {content.title}
        </h3>
        {content.description && (
          <p className="text-sm mt-1 line-clamp-2" style={{ color: 'var(--text-tertiary)' }}>
            {content.description}
          </p>
        )}
        {content.timestamps && content.timestamps.length > 0 && (
          <div className="mt-2 text-xs" style={{ color: 'var(--text-muted)' }}>
            {content.timestamps.length} chapters
          </div>
        )}
      </div>
    </button>
  );
}

export default VideoLesson;









