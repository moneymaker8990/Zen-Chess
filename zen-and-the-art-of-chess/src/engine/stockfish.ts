import type { EngineEvaluation } from '@/lib/types';

// ============================================
// STOCKFISH ENGINE WRAPPER
// Using local stockfish.js as Web Worker
// ============================================

type EvaluationCallback = (evaluation: EngineEvaluation) => void;
type BestMoveCallback = (move: string) => void;

class StockfishEngine {
  private worker: Worker | null = null;
  private isReady = false;
  private initPromise: Promise<boolean> | null = null;
  private currentEvalCallback: EvaluationCallback | null = null;
  private currentBestMoveCallback: BestMoveCallback | null = null;
  private messageQueue: string[] = [];
  private settings = {
    depth: 12,
    skill: 20,
  };

  async init(): Promise<boolean> {
    if (this.initPromise) return this.initPromise;
    if (this.isReady && this.worker) return true;
    this.initPromise = this.doInit();
    return this.initPromise;
  }

  private async doInit(): Promise<boolean> {
    console.log('🔄 Initializing Stockfish engine...');

    try {
      // Load stockfish.js from public folder as a Web Worker
      this.worker = new Worker('/stockfish.js');

      return new Promise((resolve) => {
        if (!this.worker) {
          console.error('❌ Failed to create worker');
          resolve(false);
          return;
        }

        this.worker.onmessage = (e) => {
          const msg = String(e.data);
          this.handleMessage(msg);
        };

        this.worker.onerror = (e) => {
          console.error('❌ Worker error:', e.message);
          resolve(false);
        };

        // Send UCI init command
        this.send('uci');

        // Wait for ready with timeout
        let attempts = 0;
        const check = setInterval(() => {
          attempts++;
          if (this.isReady) {
            clearInterval(check);
            this.applySettings();
            console.log('✅ Stockfish engine ready!');
            resolve(true);
          } else if (attempts > 100) {
            clearInterval(check);
            console.error('❌ Engine timeout');
            console.log('Messages received:', this.messageQueue.slice(-10));
            resolve(false);
          }
        }, 100);
      });
    } catch (err) {
      console.error('❌ Init error:', err);
      return false;
    }
  }

  private handleMessage(msg: string) {
    if (!msg) return;
    
    this.messageQueue.push(msg);
    if (this.messageQueue.length > 100) this.messageQueue.shift();

    if (msg === 'uciok') {
      this.send('isready');
    }

    if (msg === 'readyok') {
      this.isReady = true;
    }

    if (msg.startsWith('info') && msg.includes('score') && msg.includes(' pv ')) {
      const eval_ = this.parseInfo(msg);
      if (eval_ && this.currentEvalCallback) {
        this.currentEvalCallback(eval_);
      }
    }

    if (msg.startsWith('bestmove')) {
      const match = msg.match(/bestmove\s+(\S+)/);
      if (match && match[1] !== '(none)' && this.currentBestMoveCallback) {
        this.currentBestMoveCallback(match[1]);
      }
      this.currentBestMoveCallback = null;
    }
  }

  private parseInfo(info: string): EngineEvaluation | null {
    try {
      const depthMatch = info.match(/depth\s+(\d+)/);
      const scoreMatch = info.match(/score\s+(cp|mate)\s+(-?\d+)/);
      const pvMatch = info.match(/\spv\s+(.+)/);

      if (!depthMatch || !scoreMatch) return null;

      const depth = parseInt(depthMatch[1]);
      let score = 0;
      let mate: number | undefined;

      if (scoreMatch[1] === 'cp') {
        score = parseInt(scoreMatch[2]);
      } else {
        mate = parseInt(scoreMatch[2]);
        score = mate > 0 ? 10000 - mate * 10 : -10000 - mate * 10;
      }

      const pv = pvMatch ? pvMatch[1].trim().split(/\s+/) : [];
      return { depth, score, mate, bestMove: pv[0] || '', pv };
    } catch {
      return null;
    }
  }

  private send(cmd: string) {
    this.worker?.postMessage(cmd);
  }

  private applySettings() {
    this.send(`setoption name Skill Level value ${this.settings.skill}`);
    this.send('isready');
  }

  setStrength(skill: number) {
    this.settings.skill = Math.max(0, Math.min(20, skill));
    if (this.isReady) {
      this.send(`setoption name Skill Level value ${this.settings.skill}`);
    }
  }

  setDepth(depth: number) {
    this.settings.depth = Math.max(1, Math.min(20, depth));
  }

  analyzePosition(fen: string, callback: EvaluationCallback, depth?: number) {
    if (!this.isReady) return;
    this.currentEvalCallback = callback;
    this.send('stop');
    this.send('ucinewgame');
    this.send(`position fen ${fen}`);
    this.send(`go depth ${depth || this.settings.depth}`);
  }

  getBestMove(fen: string): Promise<string> {
    return new Promise((resolve, reject) => {
      if (!this.isReady) {
        reject(new Error('Not ready'));
        return;
      }
      this.currentBestMoveCallback = resolve;
      this.send('stop');
      this.send('ucinewgame');
      this.send(`position fen ${fen}`);
      this.send(`go depth ${this.settings.depth}`);

      setTimeout(() => {
        if (this.currentBestMoveCallback) {
          this.send('stop');
          this.currentBestMoveCallback = null;
          reject(new Error('Timeout'));
        }
      }, 30000);
    });
  }

  playMove(fen: string, callback: BestMoveCallback) {
    if (!this.isReady) return;
    this.currentBestMoveCallback = callback;
    this.send('stop');
    this.send('ucinewgame');
    this.send(`position fen ${fen}`);
    const depth = Math.max(3, Math.floor(this.settings.skill / 2) + 4);
    this.send(`go depth ${depth}`);
  }

  stop() {
    this.send('stop');
    this.currentEvalCallback = null;
    this.currentBestMoveCallback = null;
  }

  reset() {
    this.send('stop');
    this.send('ucinewgame');
  }

  destroy() {
    this.stop();
    this.worker?.terminate();
    this.worker = null;
    this.isReady = false;
    this.initPromise = null;
  }

  get ready() {
    return this.isReady;
  }

  getRecentMessages() {
    return [...this.messageQueue];
  }
}

export const stockfish = new StockfishEngine();
export const useStockfish = () => stockfish;
