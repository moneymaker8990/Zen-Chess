// ============================================
// NOTES STORE (barrel re-exports)
// Individual stores split into separate files for maintainability.
// Import directly from individual files for new code.
// ============================================

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ChessNote, NoteCategory } from '@/lib/notesTypes';

// ============================================
// NOTES STORE
// ============================================

interface NotesState {
  notes: ChessNote[];
  
  addNote: (note: Omit<ChessNote, 'id' | 'createdAt' | 'updatedAt'>) => string;
  updateNote: (id: string, updates: Partial<ChessNote>) => void;
  deleteNote: (id: string) => void;
  
  searchNotes: (query: string) => ChessNote[];
  getNotesByCategory: (category: NoteCategory) => ChessNote[];
  getNotesByTag: (tag: string) => ChessNote[];
  getNotesNeedingReview: () => ChessNote[];
  
  linkNotes: (noteId1: string, noteId2: string) => void;
}

export const useNotesStore = create<NotesState>()(
  persist(
    (set, get) => ({
      notes: [],
      
      addNote: (noteData) => {
        const id = `note_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const now = Date.now();
        const note: ChessNote = {
          ...noteData,
          id,
          createdAt: now,
          updatedAt: now,
        };
        set((state) => ({ notes: [note, ...state.notes] }));
        return id;
      },
      
      updateNote: (id, updates) => {
        set((state) => ({
          notes: state.notes.map((note) =>
            note.id === id
              ? { ...note, ...updates, updatedAt: Date.now() }
              : note
          ),
        }));
      },
      
      deleteNote: (id) => {
        set((state) => ({
          notes: state.notes.filter((note) => note.id !== id),
        }));
      },
      
      searchNotes: (query) => {
        const q = query.toLowerCase();
        return get().notes.filter(
          (note) =>
            note.title.toLowerCase().includes(q) ||
            note.content.toLowerCase().includes(q) ||
            note.tags.some((tag) => tag.toLowerCase().includes(q))
        );
      },
      
      getNotesByCategory: (category) => {
        return get().notes.filter((note) => note.category === category);
      },
      
      getNotesByTag: (tag) => {
        const t = tag.toLowerCase();
        return get().notes.filter((note) =>
          note.tags.some((noteTag) => noteTag.toLowerCase() === t)
        );
      },
      
      getNotesNeedingReview: () => {
        return get().notes.filter((note) => note.needsReview);
      },
      
      linkNotes: (noteId1, noteId2) => {
        set((state) => ({
          notes: state.notes.map((note) => {
            if (note.id === noteId1) {
              return {
                ...note,
                linkedNoteIds: [...(note.linkedNoteIds || []), noteId2],
                updatedAt: Date.now(),
              };
            }
            if (note.id === noteId2) {
              return {
                ...note,
                linkedNoteIds: [...(note.linkedNoteIds || []), noteId1],
                updatedAt: Date.now(),
              };
            }
            return note;
          }),
        }));
      },
    }),
    { name: 'zen-chess-notes' }
  )
);

// Re-export split stores for backwards compatibility
export { useWeaknessStore } from './weaknessStore';
export { useMentalGameStore } from './mentalGameStore';
export { useStudyStore } from './studyStore';
export { useGameReviewStore, useLegendGameReviewStore } from './gameReviewStore';
export type { LegendGameReview } from './gameReviewStore';
export { usePuzzleBookmarksStore } from './puzzleBookmarksStore';
export type { BookmarkedPuzzle } from './puzzleBookmarksStore';
