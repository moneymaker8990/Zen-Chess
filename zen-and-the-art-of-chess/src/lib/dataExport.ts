// ============================================
// DATA EXPORT / IMPORT SYSTEM
// Backup and restore user progress
// ============================================

// ============================================
// EXPORT FUNCTIONS
// ============================================

interface ExportData {
  version: string;
  exportDate: string;
  data: Record<string, unknown>;
}

const CURRENT_VERSION = '1.0.0';

// Keys to export (all zen-chess related localStorage keys)
const EXPORT_KEYS = [
  'zen-chess-progress',
  'zen-chess-coach',
  'zen-chess-notes',
  'zen-chess-study',
  'zen-chess-mistakes',
  'zen-chess-sparring',
  'zen-chess-board-settings',
  'zen-chess-tutorials',
  'zen-chess-onboarding',
  'zen-chess-sounds',
  'zen-chess-shortcuts',
  'zenChessPuzzleStats',
  'zenChessGameHistory',
  'zenChessCourseProgress',
  'zenChessCoachMemory',
  'zenChessTiltGuardianMemory',
  'zenChessInsightMemory',
  'zenChessMotivatorMemory',
  'zenChessFocusMemory',
  'zenChessOpeningSageMemory',
  'zenChessLegendMemory',
  'zenChessSessionMemory',
];

/**
 * Export all user data as JSON
 */
export function exportUserData(): ExportData {
  const data: Record<string, unknown> = {};
  
  EXPORT_KEYS.forEach(key => {
    const value = localStorage.getItem(key);
    if (value) {
      try {
        data[key] = JSON.parse(value);
      } catch {
        data[key] = value;
      }
    }
  });
  
  return {
    version: CURRENT_VERSION,
    exportDate: new Date().toISOString(),
    data,
  };
}

/**
 * Download user data as JSON file
 */
export function downloadUserData() {
  const exportData = exportUserData();
  const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = `zen-chess-backup-${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// ============================================
// IMPORT FUNCTIONS
// ============================================

interface ImportResult {
  success: boolean;
  message: string;
  keysImported: number;
}

/**
 * Import user data from JSON
 */
export function importUserData(jsonData: string): ImportResult {
  try {
    const parsed = JSON.parse(jsonData) as ExportData;
    
    // Validate structure
    if (!parsed.version || !parsed.data) {
      return {
        success: false,
        message: 'Invalid backup file format',
        keysImported: 0,
      };
    }
    
    // Check version compatibility
    if (!isVersionCompatible(parsed.version)) {
      return {
        success: false,
        message: `Backup version ${parsed.version} is not compatible with current version ${CURRENT_VERSION}`,
        keysImported: 0,
      };
    }
    
    let keysImported = 0;
    
    // Import each key
    Object.entries(parsed.data).forEach(([key, value]) => {
      if (EXPORT_KEYS.includes(key)) {
        try {
          const stringValue = typeof value === 'string' ? value : JSON.stringify(value);
          localStorage.setItem(key, stringValue);
          keysImported++;
        } catch (e) {
          console.warn(`Failed to import key ${key}:`, e);
        }
      }
    });
    
    return {
      success: true,
      message: `Successfully imported ${keysImported} data items`,
      keysImported,
    };
  } catch (e) {
    return {
      success: false,
      message: 'Failed to parse backup file',
      keysImported: 0,
    };
  }
}

/**
 * Import from file input
 */
export function importFromFile(file: File): Promise<ImportResult> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const content = e.target?.result as string;
      const result = importUserData(content);
      resolve(result);
    };
    
    reader.onerror = () => {
      resolve({
        success: false,
        message: 'Failed to read file',
        keysImported: 0,
      });
    };
    
    reader.readAsText(file);
  });
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

function isVersionCompatible(version: string): boolean {
  // For now, accept all 1.x.x versions
  return version.startsWith('1.');
}

/**
 * Get storage usage statistics
 */
export function getStorageStats(): {
  totalSize: number;
  usedSize: number;
  itemCount: number;
  items: { key: string; size: number }[];
} {
  let totalSize = 0;
  const items: { key: string; size: number }[] = [];
  
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key) {
      const value = localStorage.getItem(key) || '';
      const size = new Blob([value]).size;
      totalSize += size;
      items.push({ key, size });
    }
  }
  
  items.sort((a, b) => b.size - a.size);
  
  return {
    totalSize,
    usedSize: totalSize,
    itemCount: localStorage.length,
    items,
  };
}

/**
 * Format bytes to human readable
 */
export function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * Clear all Zen Chess data
 */
export function clearAllData() {
  EXPORT_KEYS.forEach(key => {
    localStorage.removeItem(key);
  });
}

/**
 * Reset to defaults (keeps some data)
 */
export function resetToDefaults() {
  // Keep onboarding status and settings
  const keysToKeep = [
    'zen-chess-onboarding',
    'zen-chess-board-settings',
    'zen-chess-sounds',
  ];
  
  EXPORT_KEYS.forEach(key => {
    if (!keysToKeep.includes(key)) {
      localStorage.removeItem(key);
    }
  });
}


