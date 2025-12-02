// ============================================
// ANALYSIS STORAGE
// Save and manage computer analysis lines
// ============================================

// ============================================
// TYPES
// ============================================

export interface AnalysisLine {
  id: string;
  moves: string; // Space-separated moves like "e4 e5 Nf3 Nc6"
  evaluation: number; // Centipawns
  depth: number;
  isMate?: boolean;
  mateIn?: number;
}

export interface MoveAnnotation {
  move: string;
  san: string;
  comment?: string;
  evaluation?: number;
  classification?: 'best' | 'excellent' | 'good' | 'inaccuracy' | 'mistake' | 'blunder';
  alternatives?: AnalysisLine[];
}

export interface SavedAnalysis {
  id: string;
  name: string;
  description?: string;
  fen: string; // Starting position
  pgn: string; // Full game PGN
  annotations: Record<number, MoveAnnotation>; // Keyed by ply number
  engineLines: AnalysisLine[];
  createdAt: number;
  updatedAt: number;
  tags: string[];
  source?: 'game' | 'puzzle' | 'study' | 'import';
  result?: '1-0' | '0-1' | '1/2-1/2' | '*';
}

export interface AnalysisFolder {
  id: string;
  name: string;
  color: string;
  analyses: string[]; // Analysis IDs
  createdAt: number;
}

// ============================================
// STORAGE KEYS
// ============================================

const ANALYSES_KEY = 'zen-chess-analyses';
const FOLDERS_KEY = 'zen-chess-analysis-folders';

// ============================================
// STORAGE FUNCTIONS
// ============================================

export function loadAllAnalyses(): SavedAnalysis[] {
  try {
    const stored = localStorage.getItem(ANALYSES_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function saveAllAnalyses(analyses: SavedAnalysis[]) {
  localStorage.setItem(ANALYSES_KEY, JSON.stringify(analyses));
}

export function loadAnalysis(id: string): SavedAnalysis | null {
  const analyses = loadAllAnalyses();
  return analyses.find(a => a.id === id) || null;
}

export function saveAnalysis(analysis: SavedAnalysis) {
  const analyses = loadAllAnalyses();
  const existingIndex = analyses.findIndex(a => a.id === analysis.id);
  
  if (existingIndex >= 0) {
    analyses[existingIndex] = { ...analysis, updatedAt: Date.now() };
  } else {
    analyses.push(analysis);
  }
  
  saveAllAnalyses(analyses);
}

export function deleteAnalysis(id: string) {
  const analyses = loadAllAnalyses();
  const filtered = analyses.filter(a => a.id !== id);
  saveAllAnalyses(filtered);
  
  // Also remove from any folders
  const folders = loadAllFolders();
  folders.forEach(folder => {
    folder.analyses = folder.analyses.filter(aId => aId !== id);
  });
  saveAllFolders(folders);
}

export function createAnalysis(
  name: string,
  fen: string,
  pgn: string,
  source: SavedAnalysis['source'] = 'study'
): SavedAnalysis {
  const now = Date.now();
  return {
    id: `analysis-${now}-${Math.random().toString(36).substr(2, 9)}`,
    name,
    fen,
    pgn,
    annotations: {},
    engineLines: [],
    createdAt: now,
    updatedAt: now,
    tags: [],
    source,
  };
}

// ============================================
// FOLDER FUNCTIONS
// ============================================

export function loadAllFolders(): AnalysisFolder[] {
  try {
    const stored = localStorage.getItem(FOLDERS_KEY);
    return stored ? JSON.parse(stored) : getDefaultFolders();
  } catch {
    return getDefaultFolders();
  }
}

export function saveAllFolders(folders: AnalysisFolder[]) {
  localStorage.setItem(FOLDERS_KEY, JSON.stringify(folders));
}

function getDefaultFolders(): AnalysisFolder[] {
  const now = Date.now();
  return [
    { id: 'my-games', name: 'My Games', color: '#a855f7', analyses: [], createdAt: now },
    { id: 'studies', name: 'Studies', color: '#4ade80', analyses: [], createdAt: now },
    { id: 'favorites', name: 'Favorites', color: '#fbbf24', analyses: [], createdAt: now },
  ];
}

export function createFolder(name: string, color: string = '#a855f7'): AnalysisFolder {
  const folder: AnalysisFolder = {
    id: `folder-${Date.now()}`,
    name,
    color,
    analyses: [],
    createdAt: Date.now(),
  };
  
  const folders = loadAllFolders();
  folders.push(folder);
  saveAllFolders(folders);
  
  return folder;
}

export function addToFolder(folderId: string, analysisId: string) {
  const folders = loadAllFolders();
  const folder = folders.find(f => f.id === folderId);
  
  if (folder && !folder.analyses.includes(analysisId)) {
    folder.analyses.push(analysisId);
    saveAllFolders(folders);
  }
}

export function removeFromFolder(folderId: string, analysisId: string) {
  const folders = loadAllFolders();
  const folder = folders.find(f => f.id === folderId);
  
  if (folder) {
    folder.analyses = folder.analyses.filter(id => id !== analysisId);
    saveAllFolders(folders);
  }
}

// ============================================
// ANNOTATION HELPERS
// ============================================

export function addAnnotation(
  analysis: SavedAnalysis,
  plyNumber: number,
  annotation: Partial<MoveAnnotation>
): SavedAnalysis {
  return {
    ...analysis,
    annotations: {
      ...analysis.annotations,
      [plyNumber]: {
        ...analysis.annotations[plyNumber],
        ...annotation,
      } as MoveAnnotation,
    },
    updatedAt: Date.now(),
  };
}

export function classifyMove(evalDiff: number): MoveAnnotation['classification'] {
  if (evalDiff >= 0) return 'best';
  if (evalDiff > -10) return 'excellent';
  if (evalDiff > -30) return 'good';
  if (evalDiff > -50) return 'inaccuracy';
  if (evalDiff > -100) return 'mistake';
  return 'blunder';
}

export function getClassificationColor(classification: MoveAnnotation['classification']): string {
  switch (classification) {
    case 'best': return '#4ade80';
    case 'excellent': return '#a3e635';
    case 'good': return '#fbbf24';
    case 'inaccuracy': return '#f97316';
    case 'mistake': return '#f97316';
    case 'blunder': return '#ef4444';
    default: return '#8b8987';
  }
}

export function getClassificationIcon(classification: MoveAnnotation['classification']): string {
  switch (classification) {
    case 'best': return '!!';
    case 'excellent': return '!';
    case 'good': return '';
    case 'inaccuracy': return '?!';
    case 'mistake': return '?';
    case 'blunder': return '??';
    default: return '';
  }
}

// ============================================
// EXPORT/IMPORT
// ============================================

export function exportAnalysisAsPGN(analysis: SavedAnalysis): string {
  // Basic PGN with comments
  let pgn = analysis.pgn;
  
  // Add header tags
  const headers = [
    `[Event "${analysis.name}"]`,
    `[Site "Zen Chess"]`,
    `[Date "${new Date(analysis.createdAt).toISOString().split('T')[0].replace(/-/g, '.')}"]`,
    analysis.result ? `[Result "${analysis.result}"]` : '[Result "*"]',
  ].join('\n');
  
  return `${headers}\n\n${pgn}`;
}

export function exportAnalysisAsJSON(analysis: SavedAnalysis): string {
  return JSON.stringify(analysis, null, 2);
}

export function importAnalysisFromPGN(pgn: string, name?: string): SavedAnalysis {
  // Extract FEN if present, otherwise use starting position
  const fenMatch = pgn.match(/\[FEN "([^"]+)"\]/);
  const fen = fenMatch ? fenMatch[1] : 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
  
  // Extract result
  const resultMatch = pgn.match(/\[Result "([^"]+)"\]/);
  const result = resultMatch ? resultMatch[1] as SavedAnalysis['result'] : undefined;
  
  // Extract event name for default name
  const eventMatch = pgn.match(/\[Event "([^"]+)"\]/);
  const defaultName = eventMatch ? eventMatch[1] : 'Imported Game';
  
  return createAnalysis(name || defaultName, fen, pgn, 'import');
}

// ============================================
// SEARCH & FILTER
// ============================================

export function searchAnalyses(
  analyses: SavedAnalysis[],
  query: string
): SavedAnalysis[] {
  const lowerQuery = query.toLowerCase();
  return analyses.filter(a =>
    a.name.toLowerCase().includes(lowerQuery) ||
    a.description?.toLowerCase().includes(lowerQuery) ||
    a.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
}

export function filterByTag(
  analyses: SavedAnalysis[],
  tag: string
): SavedAnalysis[] {
  return analyses.filter(a => a.tags.includes(tag));
}

export function filterBySource(
  analyses: SavedAnalysis[],
  source: SavedAnalysis['source']
): SavedAnalysis[] {
  return analyses.filter(a => a.source === source);
}

export function sortAnalyses(
  analyses: SavedAnalysis[],
  sortBy: 'date' | 'name' | 'updated'
): SavedAnalysis[] {
  return [...analyses].sort((a, b) => {
    switch (sortBy) {
      case 'date':
        return b.createdAt - a.createdAt;
      case 'updated':
        return b.updatedAt - a.updatedAt;
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });
}



