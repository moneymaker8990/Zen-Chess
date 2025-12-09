import { useState, useMemo } from 'react';
import { Chessboard } from 'react-chessboard';
import { useNotesStore, useStudyStore } from '@/state/notesStore';
import { useBoardStyles } from '@/state/boardSettingsStore';
import { PageHeader } from '@/components/Tutorial';
import type { ChessNote, NoteCategory } from '@/lib/notesTypes';

const categoryLabels: Record<NoteCategory, string> = {
  OPENING: '📖 Opening',
  MIDDLEGAME: '⚔️ Middlegame',
  ENDGAME: '🏁 Endgame',
  TACTICS: '⚡ Tactics',
  STRATEGY: '🎯 Strategy',
  PSYCHOLOGY: '🧠 Psychology',
  TIME_MANAGEMENT: '⏱️ Time',
  BLUNDER_ANALYSIS: '❌ Blunder',
  PATTERN: '🔄 Pattern',
  INSIGHT: '💡 Insight',
  GAME_REVIEW: '🔍 Game Review',
  STUDY_SESSION: '📚 Study',
  BOOK_NOTE: '📕 Book',
  LESSON: '🎓 Lesson',
  REFLECTION: '🪷 Reflection',
};

const categoryColors: Record<NoteCategory, string> = {
  OPENING: 'bg-blue-500/20 text-blue-400',
  MIDDLEGAME: 'bg-orange-500/20 text-orange-400',
  ENDGAME: 'bg-purple-500/20 text-purple-400',
  TACTICS: 'bg-yellow-500/20 text-yellow-400',
  STRATEGY: 'bg-green-500/20 text-green-400',
  PSYCHOLOGY: 'bg-pink-500/20 text-pink-400',
  TIME_MANAGEMENT: 'bg-red-500/20 text-red-400',
  BLUNDER_ANALYSIS: 'bg-red-600/20 text-red-500',
  PATTERN: 'bg-cyan-500/20 text-cyan-400',
  INSIGHT: 'bg-amber-500/20 text-amber-400',
  GAME_REVIEW: 'bg-indigo-500/20 text-indigo-400',
  STUDY_SESSION: 'bg-emerald-500/20 text-emerald-400',
  BOOK_NOTE: 'bg-rose-500/20 text-rose-400',
  LESSON: 'bg-violet-500/20 text-violet-400',
  REFLECTION: 'bg-teal-500/20 text-teal-400',
};

export function MasterNotebook() {
  const { notes, addNote, updateNote, deleteNote, searchNotes } = useNotesStore();
  const { recordNoteCreated } = useStudyStore();
  const boardStyles = useBoardStyles();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<NoteCategory | 'ALL'>('ALL');
  const [sortBy, setSortBy] = useState<'recent' | 'importance' | 'review'>('recent');
  const [selectedNote, setSelectedNote] = useState<ChessNote | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [editingNote, setEditingNote] = useState<ChessNote | null>(null);

  // Filter and sort notes
  const filteredNotes = useMemo(() => {
    let result = searchQuery ? searchNotes(searchQuery) : notes;
    
    if (filterCategory !== 'ALL') {
      result = result.filter((n) => n.category === filterCategory);
    }
    
    switch (sortBy) {
      case 'recent':
        result = [...result].sort((a, b) => b.updatedAt - a.updatedAt);
        break;
      case 'importance':
        result = [...result].sort((a, b) => b.importance - a.importance);
        break;
      case 'review':
        result = [...result].filter((n) => n.needsReview);
        break;
    }
    
    return result;
  }, [notes, searchQuery, filterCategory, sortBy, searchNotes]);

  // Stats
  const stats = useMemo(() => ({
    total: notes.length,
    needsReview: notes.filter((n) => n.needsReview).length,
    thisWeek: notes.filter((n) => n.createdAt > Date.now() - 7 * 24 * 60 * 60 * 1000).length,
  }), [notes]);

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <PageHeader
        tutorialId="notes"
        title="Master Notebook"
        subtitle={`Your personal chess bible • ${stats.total} notes`}
      >
        <button
          onClick={() => setIsCreating(true)}
          className="zen-button-primary"
        >
          + New Note
        </button>
      </PageHeader>

      {/* Stats bar */}
      <div className="flex gap-4 text-sm">
        <div className="glass-card-subtle px-4 py-2">
          <span className="text-zen-500">Total:</span>
          <span className="text-zen-200 ml-2 font-mono">{stats.total}</span>
        </div>
        <div className="glass-card-subtle px-4 py-2">
          <span className="text-zen-500">This Week:</span>
          <span className="text-emerald-400 ml-2 font-mono">{stats.thisWeek}</span>
        </div>
        <div className="glass-card-subtle px-4 py-2">
          <span className="text-zen-500">Needs Review:</span>
          <span className="text-gold-400 ml-2 font-mono">{stats.needsReview}</span>
        </div>
      </div>

      {/* Search and filters */}
      <div className="flex flex-wrap gap-4">
        <input
          type="text"
          placeholder="Search notes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 min-w-[200px] px-4 py-2 rounded-lg bg-zen-900/50 border border-zen-700/30 text-zen-200 placeholder-zen-600 focus:outline-none focus:border-gold-500/50"
        />
        
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value as NoteCategory | 'ALL')}
          className="px-3 py-2 rounded-lg bg-zen-900/50 border border-zen-700/30 text-zen-300"
        >
          <option value="ALL">All Categories</option>
          {Object.entries(categoryLabels).map(([key, label]) => (
            <option key={key} value={key}>{label}</option>
          ))}
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as 'recent' | 'importance' | 'review')}
          className="px-3 py-2 rounded-lg bg-zen-900/50 border border-zen-700/30 text-zen-300"
        >
          <option value="recent">Most Recent</option>
          <option value="importance">By Importance</option>
          <option value="review">Needs Review</option>
        </select>
      </div>

      {/* Main content area */}
      <div className="grid lg:grid-cols-[1fr_400px] gap-6">
        {/* Notes list */}
        <div className="space-y-3">
          {filteredNotes.length === 0 ? (
            <div className="glass-card p-8 text-center">
              <p className="text-zen-500 mb-4">No notes yet. Start building your chess knowledge!</p>
              <button
                onClick={() => setIsCreating(true)}
                className="zen-button"
              >
                Create Your First Note
              </button>
            </div>
          ) : (
            filteredNotes.map((note) => (
              <div
                key={note.id}
                onClick={() => setSelectedNote(note)}
                className={`glass-card p-4 cursor-pointer transition-all hover:border-zen-600/50 ${
                  selectedNote?.id === note.id ? 'border-gold-500/50' : ''
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-2 py-0.5 rounded ${categoryColors[note.category]}`}>
                      {categoryLabels[note.category]}
                    </span>
                    <span className="text-gold-400/60 text-xs">
                      {'★'.repeat(note.importance)}
                    </span>
                  </div>
                  <span className="text-zen-600 text-xs">{formatDate(note.updatedAt)}</span>
                </div>
                
                <h3 className="text-zen-200 font-medium mb-1">{note.title}</h3>
                <p className="text-zen-500 text-sm line-clamp-2">{note.content}</p>
                
                {note.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {note.tags.slice(0, 4).map((tag, i) => (
                      <span key={i} className="text-xs px-2 py-0.5 rounded-full bg-zen-800/50 text-zen-500">
                        {tag}
                      </span>
                    ))}
                    {note.tags.length > 4 && (
                      <span className="text-xs text-zen-600">+{note.tags.length - 4}</span>
                    )}
                  </div>
                )}
                
                {note.needsReview && (
                  <div className="mt-2 text-xs text-gold-400">📌 Needs review</div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Note detail / editor */}
        <div className="space-y-4">
          {selectedNote && !editingNote && (
            <NoteDetail
              note={selectedNote}
              onEdit={() => setEditingNote(selectedNote)}
              onDelete={() => {
                deleteNote(selectedNote.id);
                setSelectedNote(null);
              }}
              onMarkReviewed={() => {
                updateNote(selectedNote.id, {
                  needsReview: false,
                  lastReviewedAt: Date.now(),
                  reviewCount: (selectedNote.reviewCount || 0) + 1,
                });
              }}
            />
          )}
          
          {(isCreating || editingNote) && (
            <NoteEditor
              note={editingNote}
              onSave={(noteData) => {
                if (editingNote) {
                  updateNote(editingNote.id, noteData);
                } else {
                  addNote(noteData as any);
                  recordNoteCreated(); // Auto-track
                }
                setIsCreating(false);
                setEditingNote(null);
              }}
              onCancel={() => {
                setIsCreating(false);
                setEditingNote(null);
              }}
            />
          )}
          
          {!selectedNote && !isCreating && !editingNote && (
            <div className="glass-card p-8 text-center">
              <p className="text-zen-500">Select a note to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Note Detail Component
function NoteDetail({
  note,
  onEdit,
  onDelete,
  onMarkReviewed,
}: {
  note: ChessNote;
  onEdit: () => void;
  onDelete: () => void;
  onMarkReviewed: () => void;
}) {
  const boardStyles = useBoardStyles();
  return (
    <div className="glass-card p-5 space-y-4">
      <div className="flex items-start justify-between">
        <span className={`text-xs px-2 py-0.5 rounded ${categoryColors[note.category]}`}>
          {categoryLabels[note.category]}
        </span>
        <div className="flex gap-2">
          <button onClick={onEdit} className="text-zen-500 hover:text-zen-300 text-sm">
            Edit
          </button>
          <button onClick={onDelete} className="text-red-500 hover:text-red-400 text-sm">
            Delete
          </button>
        </div>
      </div>
      
      <h2 className="text-xl font-serif text-zen-100">{note.title}</h2>
      
      <div className="text-gold-400/60 text-sm">
        {'★'.repeat(note.importance)}{'☆'.repeat(5 - note.importance)} Importance
      </div>
      
      <div className="prose prose-invert prose-sm max-w-none">
        <p className="text-zen-300 whitespace-pre-wrap">{note.content}</p>
      </div>
      
      {/* Position diagrams */}
      {note.positions && note.positions.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-sm text-zen-500 uppercase tracking-wider">Positions</h4>
          {note.positions.map((pos, i) => (
            <div key={i} className="bg-zen-900/50 p-3">
              <div style={{ width: 280, maxWidth: '100%' }}>
                <Chessboard
                  position={pos.fen}
                  arePiecesDraggable={false}
                  boardWidth={280}
                  customDarkSquareStyle={boardStyles.customDarkSquareStyle}
                  customLightSquareStyle={boardStyles.customLightSquareStyle}
                />
              </div>
              {pos.caption && (
                <p className="text-zen-500 text-xs mt-2 italic">{pos.caption}</p>
              )}
            </div>
          ))}
        </div>
      )}
      
      {/* Tags */}
      {note.tags.length > 0 && (
        <div>
          <h4 className="text-sm text-zen-500 uppercase tracking-wider mb-2">Tags</h4>
          <div className="flex flex-wrap gap-2">
            {note.tags.map((tag, i) => (
              <span key={i} className="text-xs px-2 py-1 rounded-full bg-zen-800/50 text-zen-400">
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
      
      {/* Tactical themes */}
      {note.tacticalThemes && note.tacticalThemes.length > 0 && (
        <div>
          <h4 className="text-sm text-zen-500 uppercase tracking-wider mb-2">Tactical Themes</h4>
          <div className="flex flex-wrap gap-2">
            {note.tacticalThemes.map((theme, i) => (
              <span key={i} className="text-xs px-2 py-1 rounded-full bg-yellow-500/20 text-yellow-400">
                {theme.replace('_', ' ')}
              </span>
            ))}
          </div>
        </div>
      )}
      
      {/* Blunder types */}
      {note.blunderTypes && note.blunderTypes.length > 0 && (
        <div>
          <h4 className="text-sm text-zen-500 uppercase tracking-wider mb-2">Blunder Types</h4>
          <div className="flex flex-wrap gap-2">
            {note.blunderTypes.map((type, i) => (
              <span key={i} className="text-xs px-2 py-1 rounded-full bg-red-500/20 text-red-400">
                {type.replace('_', ' ')}
              </span>
            ))}
          </div>
        </div>
      )}
      
      {/* Metadata */}
      <div className="pt-4 border-t border-zen-700/30 text-xs text-zen-600">
        <p>Created: {new Date(note.createdAt).toLocaleString()}</p>
        <p>Last updated: {new Date(note.updatedAt).toLocaleString()}</p>
        {note.reviewCount && <p>Reviewed {note.reviewCount} times</p>}
      </div>
      
      {/* Actions */}
      {note.needsReview && (
        <button onClick={onMarkReviewed} className="zen-button w-full">
          ✓ Mark as Reviewed
        </button>
      )}
    </div>
  );
}

// Note Editor Component
function NoteEditor({
  note,
  onSave,
  onCancel,
}: {
  note: ChessNote | null;
  onSave: (data: Partial<ChessNote>) => void;
  onCancel: () => void;
}) {
  const [title, setTitle] = useState(note?.title || '');
  const [content, setContent] = useState(note?.content || '');
  const [category, setCategory] = useState<NoteCategory>(note?.category || 'INSIGHT');
  const [importance, setImportance] = useState(note?.importance || 3);
  const [tags, setTags] = useState(note?.tags.join(', ') || '');
  const [needsReview, setNeedsReview] = useState(note?.needsReview || false);
  const [fen, setFen] = useState(note?.positions?.[0]?.fen || '');

  const handleSave = () => {
    const tagArray = tags.split(',').map((t) => t.trim()).filter(Boolean);
    const positions = fen ? [{ fen, caption: '' }] : undefined;
    
    onSave({
      title,
      content,
      category,
      importance: importance as 1 | 2 | 3 | 4 | 5,
      tags: tagArray,
      needsReview,
      positions,
    });
  };

  return (
    <div className="glass-card p-5 space-y-4">
      <h3 className="text-lg font-serif text-zen-200">
        {note ? 'Edit Note' : 'New Note'}
      </h3>
      
      <div>
        <label className="text-sm text-zen-500 block mb-1">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Note title..."
          className="w-full px-3 py-2 rounded-lg bg-zen-900/50 border border-zen-700/30 text-zen-200"
        />
      </div>
      
      <div>
        <label className="text-sm text-zen-500 block mb-1">Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as NoteCategory)}
          className="w-full px-3 py-2 rounded-lg bg-zen-900/50 border border-zen-700/30 text-zen-300"
        >
          {Object.entries(categoryLabels).map(([key, label]) => (
            <option key={key} value={key}>{label}</option>
          ))}
        </select>
      </div>
      
      <div>
        <label className="text-sm text-zen-500 block mb-1">Content</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your notes..."
          rows={6}
          className="w-full px-3 py-2 rounded-lg bg-zen-900/50 border border-zen-700/30 text-zen-200 resize-none"
        />
      </div>
      
      <div>
        <label className="text-sm text-zen-500 block mb-1">Importance</label>
        <div className="flex gap-2">
          {([1, 2, 3, 4, 5] as const).map((level) => (
            <button
              key={level}
              onClick={() => setImportance(level)}
              className={`px-3 py-1 rounded ${
                importance >= level
                  ? 'bg-gold-500/30 text-gold-400'
                  : 'bg-zen-800/50 text-zen-600'
              }`}
            >
              ★
            </button>
          ))}
        </div>
      </div>
      
      <div>
        <label className="text-sm text-zen-500 block mb-1">Tags (comma separated)</label>
        <input
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="e.g., sicilian, tactics, improvement"
          className="w-full px-3 py-2 rounded-lg bg-zen-900/50 border border-zen-700/30 text-zen-200"
        />
      </div>
      
      <div>
        <label className="text-sm text-zen-500 block mb-1">Position FEN (optional)</label>
        <input
          type="text"
          value={fen}
          onChange={(e) => setFen(e.target.value)}
          placeholder="Paste FEN string..."
          className="w-full px-3 py-2 rounded-lg bg-zen-900/50 border border-zen-700/30 text-zen-200 font-mono text-sm"
        />
        {fen && (
          <div className="mt-2" style={{ width: 200, maxWidth: '100%' }}>
            <Chessboard
              position={fen}
              arePiecesDraggable={false}
              boardWidth={200}
              customDarkSquareStyle={{ backgroundColor: '#4a6670' }}
              customLightSquareStyle={{ backgroundColor: '#8ba4a8' }}
            />
          </div>
        )}
      </div>
      
      <label className="flex items-center gap-2 text-sm text-zen-400">
        <input
          type="checkbox"
          checked={needsReview}
          onChange={(e) => setNeedsReview(e.target.checked)}
          className="rounded"
        />
        Flag for review later
      </label>
      
      <div className="flex gap-3 pt-2">
        <button onClick={handleSave} className="zen-button-primary flex-1">
          Save Note
        </button>
        <button onClick={onCancel} className="zen-button-ghost flex-1">
          Cancel
        </button>
      </div>
    </div>
  );
}

export default MasterNotebook;

