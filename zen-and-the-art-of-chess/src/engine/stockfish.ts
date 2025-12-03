import type { EngineEvaluation } from '@/lib/types';

// ============================================
// STOCKFISH ENGINE WRAPPER
// Using local stockfish.js as Web Worker
// Thread-safe with request queuing
// ============================================

type EvaluationCallback = (evaluation: EngineEvaluation) => void;
type BestMoveCallback = (move: string) => void;

interface PendingRequest {
  id: string;
  type: 'analyze' | 'bestmove' | 'play';
  fen: string;
  depth?: number;
  resolve?: (value: string) => void;
  reject?: (error: Error) => void;
  evalCallback?: EvaluationCallback;
  moveCallback?: BestMoveCallback;
}

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
  
  // Request queue for thread-safe operation
  private requestQueue: PendingRequest[] = [];
  private currentRequest: PendingRequest | null = null;
  private requestIdCounter = 0;
  
  // Health monitoring
  private lastMessageTime = 0;
  private healthCheckInterval: ReturnType<typeof setInterval> | null = null;

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
          this.lastMessageTime = Date.now();
          this.handleMessage(msg);
        };

        this.worker.onerror = (e) => {
          console.error('❌ Worker error:', e.message);
          this.handleWorkerError();
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
            this.startHealthCheck();
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
  
  private startHealthCheck() {
    // Check engine health every 30 seconds
    this.healthCheckInterval = setInterval(() => {
      // Only check if we're not processing a request and engine should be idle
      if (!this.currentRequest && this.isReady) {
        const timeSinceLastMessage = Date.now() - this.lastMessageTime;
        // If no message for 60 seconds while supposedly ready, engine might be stuck
        if (timeSinceLastMessage > 60000 && this.lastMessageTime > 0) {
          console.warn('⚠️ Engine appears unresponsive, sending ping...');
          this.send('isready');
        }
      }
    }, 30000);
  }
  
  private handleWorkerError() {
    // Cancel all pending requests with error
    while (this.requestQueue.length > 0) {
      const req = this.requestQueue.shift();
      if (req?.reject) {
        req.reject(new Error('Engine worker crashed'));
      }
    }
    
    if (this.currentRequest?.reject) {
      this.currentRequest.reject(new Error('Engine worker crashed'));
    }
    
    this.currentRequest = null;
    this.isReady = false;
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
      const move = match && match[1] !== '(none)' ? match[1] : null;
      
      // Handle current request
      if (this.currentRequest) {
        if (move) {
          // Resolve promise if applicable
          if (this.currentRequest.resolve) {
            this.currentRequest.resolve(move);
          }
          // Call callback if applicable
          if (this.currentRequest.moveCallback) {
            this.currentRequest.moveCallback(move);
          }
        } else if (this.currentRequest.reject) {
          this.currentRequest.reject(new Error('No valid move found'));
        }
        
        this.currentRequest = null;
        this.currentEvalCallback = null;
        this.currentBestMoveCallback = null;
        
        // Process next request in queue
        this.processNextRequest();
      } else {
        // Legacy callback support for backward compatibility
        if (move && this.currentBestMoveCallback) {
          this.currentBestMoveCallback(move);
        }
        this.currentBestMoveCallback = null;
      }
    }
  }
  
  private processNextRequest() {
    if (this.currentRequest || this.requestQueue.length === 0) return;
    
    const request = this.requestQueue.shift();
    if (!request) return;
    
    this.currentRequest = request;
    
    // Set up callbacks based on request type
    if (request.evalCallback) {
      this.currentEvalCallback = request.evalCallback;
    }
    if (request.moveCallback) {
      this.currentBestMoveCallback = request.moveCallback;
    }
    
    // Send commands to engine
    this.send('stop');
    this.send('ucinewgame');
    this.send(`position fen ${request.fen}`);
    
    const depth = request.depth || this.settings.depth;
    this.send(`go depth ${depth}`);
  }
  
  private generateRequestId(): string {
    return `req_${++this.requestIdCounter}_${Date.now()}`;
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
    if (!this.isReady) {
      console.warn('Engine not ready for analysis');
      return;
    }
    
    const request: PendingRequest = {
      id: this.generateRequestId(),
      type: 'analyze',
      fen,
      depth: depth || this.settings.depth,
      evalCallback: callback,
    };
    
    // Analysis requests go directly (they provide ongoing feedback)
    // but we still need to manage state properly
    this.requestQueue.push(request);
    
    // If no current request, start processing
    if (!this.currentRequest) {
      this.processNextRequest();
    }
  }

  getBestMove(fen: string, timeoutMs: number = 15000): Promise<string> {
    return new Promise((resolve, reject) => {
      if (!this.isReady) {
        reject(new Error('Engine not ready'));
        return;
      }
      
      const request: PendingRequest = {
        id: this.generateRequestId(),
        type: 'bestmove',
        fen,
        depth: this.settings.depth,
        resolve,
        reject,
      };
      
      this.requestQueue.push(request);
      
      // Set up timeout
      const timeoutId = setTimeout(() => {
        // Remove this request from queue if still pending
        const queueIndex = this.requestQueue.findIndex(r => r.id === request.id);
        if (queueIndex >= 0) {
          this.requestQueue.splice(queueIndex, 1);
          reject(new Error('Request timeout - still in queue'));
        } else if (this.currentRequest?.id === request.id) {
          // Currently processing - force stop and move to next
          this.send('stop');
          this.currentRequest = null;
          this.processNextRequest();
          reject(new Error('Request timeout - processing'));
        }
      }, timeoutMs);
      
      // Clear timeout on resolve/reject
      const originalResolve = request.resolve;
      const originalReject = request.reject;
      request.resolve = (value: string) => {
        clearTimeout(timeoutId);
        originalResolve?.(value);
      };
      request.reject = (error: Error) => {
        clearTimeout(timeoutId);
        originalReject?.(error);
      };
      
      // If no current request, start processing
      if (!this.currentRequest) {
        this.processNextRequest();
      }
    });
  }

  playMove(fen: string, callback: BestMoveCallback) {
    if (!this.isReady) {
      console.warn('Engine not ready for playMove');
      return;
    }
    
    // Calculate depth based on skill level
    const depth = Math.max(3, Math.floor(this.settings.skill / 2) + 4);
    
    const request: PendingRequest = {
      id: this.generateRequestId(),
      type: 'play',
      fen,
      depth,
      moveCallback: callback,
    };
    
    this.requestQueue.push(request);
    
    // If no current request, start processing
    if (!this.currentRequest) {
      this.processNextRequest();
    }
  }
  
  // Get a move with promise API (simpler alternative to callback)
  async getMoveAsync(fen: string): Promise<string> {
    return this.getBestMove(fen);
  }

  stop() {
    this.send('stop');
    this.currentEvalCallback = null;
    this.currentBestMoveCallback = null;
    
    // Cancel current request but don't reject - it will naturally fail
    this.currentRequest = null;
  }

  reset() {
    this.send('stop');
    this.send('ucinewgame');
    
    // Clear the request queue
    this.requestQueue = [];
    this.currentRequest = null;
    this.currentEvalCallback = null;
    this.currentBestMoveCallback = null;
  }

  destroy() {
    this.stop();
    
    // Stop health check
    if (this.healthCheckInterval) {
      clearInterval(this.healthCheckInterval);
      this.healthCheckInterval = null;
    }
    
    // Reject all pending requests
    while (this.requestQueue.length > 0) {
      const req = this.requestQueue.shift();
      if (req?.reject) {
        req.reject(new Error('Engine destroyed'));
      }
    }
    
    this.worker?.terminate();
    this.worker = null;
    this.isReady = false;
    this.initPromise = null;
  }

  get ready() {
    return this.isReady;
  }
  
  get queueLength() {
    return this.requestQueue.length;
  }
  
  get isProcessing() {
    return this.currentRequest !== null;
  }

  getRecentMessages() {
    return [...this.messageQueue];
  }
}

export const stockfish = new StockfishEngine();
export const useStockfish = () => stockfish;
