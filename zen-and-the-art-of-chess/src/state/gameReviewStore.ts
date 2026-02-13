import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { GameReview } from '@/lib/notesTypes';

// ============================================
// GAME REVIEW STORE
// ============================================

interface GameReviewState {
  reviews: GameReview[];
  
  addReview: (review: GameReview) => void;
  getReview: (gameId: string) => GameReview | undefined;
  addAnnotation: (gameId: string, annotation: GameReview['userAnnotations'][number]) => void;
  getRecentReviews: (count: number) => GameReview[];
}

export const useGameReviewStore = create<GameReviewState>()(
  persist(
    (set, get) => ({
      reviews: [],
      
      addReview: (review) => {
        set((state) => ({
          reviews: [review, ...state.reviews.filter((r) => r.gameId !== review.gameId)],
        }));
      },
      
      getReview: (gameId) => {
        return get().reviews.find((r) => r.gameId === gameId);
      },
      
      addAnnotation: (gameId, annotation) => {
        set((state) => ({
          reviews: state.reviews.map((r) =>
            r.gameId === gameId
              ? { ...r, userAnnotations: [...r.userAnnotations, annotation] }
              : r
          ),
        }));
      },
      
      getRecentReviews: (count) => {
        return get().reviews.slice(0, count);
      },
    }),
    { name: 'zen-chess-reviews' }
  )
);

// ============================================
// LEGEND GAME REVIEW TRACKING
// ============================================

export interface LegendGameReview {
  legendId: string;
  gameId: string;
  reviewedAt: number;
  score: number;
  movesGuessed: number;
  totalMoves: number;
  weaknessTags: string[];
}

interface LegendGameReviewState {
  reviewedGames: LegendGameReview[];
  
  markGameReviewed: (review: Omit<LegendGameReview, 'reviewedAt'>) => void;
  isGameReviewed: (legendId: string, gameId: string) => boolean;
  getGameReview: (legendId: string, gameId: string) => LegendGameReview | undefined;
  getReviewedGamesForLegend: (legendId: string) => LegendGameReview[];
  getLegendStats: (legendId: string) => {
    totalReviewed: number;
    averageScore: number;
    bestScore: number;
    commonWeaknesses: string[];
  };
  clearAllReviews: () => void;
}

export const useLegendGameReviewStore = create<LegendGameReviewState>()(
  persist(
    (set, get) => ({
      reviewedGames: [],
      
      markGameReviewed: (review) => {
        const existing = get().reviewedGames.find(
          r => r.legendId === review.legendId && r.gameId === review.gameId
        );
        
        if (existing) {
          set((state) => ({
            reviewedGames: state.reviewedGames.map(r =>
              r.legendId === review.legendId && r.gameId === review.gameId
                ? { ...review, reviewedAt: Date.now() }
                : r
            ),
          }));
        } else {
          set((state) => ({
            reviewedGames: [
              { ...review, reviewedAt: Date.now() },
              ...state.reviewedGames,
            ],
          }));
        }
      },
      
      isGameReviewed: (legendId, gameId) => {
        return get().reviewedGames.some(
          r => r.legendId === legendId && r.gameId === gameId
        );
      },
      
      getGameReview: (legendId, gameId) => {
        return get().reviewedGames.find(
          r => r.legendId === legendId && r.gameId === gameId
        );
      },
      
      getReviewedGamesForLegend: (legendId) => {
        return get().reviewedGames.filter(r => r.legendId === legendId);
      },
      
      getLegendStats: (legendId) => {
        const reviews = get().reviewedGames.filter(r => r.legendId === legendId);
        
        if (reviews.length === 0) {
          return {
            totalReviewed: 0,
            averageScore: 0,
            bestScore: 0,
            commonWeaknesses: [],
          };
        }
        
        const scores = reviews.map(r => r.score);
        const allTags = reviews.flatMap(r => r.weaknessTags);
        const tagCounts: Record<string, number> = {};
        allTags.forEach(tag => {
          tagCounts[tag] = (tagCounts[tag] || 0) + 1;
        });
        
        const sortedTags = Object.entries(tagCounts)
          .sort(([, a], [, b]) => b - a)
          .slice(0, 5)
          .map(([tag]) => tag);
        
        return {
          totalReviewed: reviews.length,
          averageScore: Math.round(scores.reduce((a, b) => a + b, 0) / scores.length),
          bestScore: Math.max(...scores),
          commonWeaknesses: sortedTags,
        };
      },
      
      clearAllReviews: () => {
        set({ reviewedGames: [] });
      },
    }),
    { name: 'zen-chess-legend-reviews' }
  )
);
