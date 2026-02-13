import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import path from 'path'

export default defineConfig(({ mode }) => {
  const isDev = mode === 'development'
  // Load ALL env vars (including non-VITE_ ones) for use in server config
  const env = loadEnv(mode, process.cwd(), '')
  
  return {
  plugins: [
    react(),
    VitePWA({
      // Disable service worker in development to avoid caching issues
      devOptions: {
        enabled: false, // Disable PWA in dev mode
        type: 'module',
      },
      registerType: isDev ? 'autoUpdate' : 'prompt', // Auto-update in dev, prompt in prod
      includeAssets: [
        'favicon.svg', 
        'favicon-32x32.png',
        'favicon-16x16.png',
        'apple-touch-icon.png',
        'stockfish.js', 
        'stockfish.wasm'
      ],
      manifest: {
        name: 'Zen Chess',
        short_name: 'Zen Chess',
        description: 'Master chess through mindfulness. A 365-day journey combining spiritual training, chess mastery, and psychological insight.',
        theme_color: '#161512',
        background_color: '#161512',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/',
        start_url: '/',
        id: 'zen-chess-app',
        categories: ['games', 'education', 'lifestyle'],
        lang: 'en',
        dir: 'ltr',
        icons: [
          {
            src: 'pwa-64x64.png',
            sizes: '64x64',
            type: 'image/png'
          },
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512-maskable.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          },
          {
            src: 'pwa-192x192-maskable.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'maskable'
          }
        ],
        // screenshots: Add screenshot-wide.png (1280x720) and screenshot-narrow.png (390x844)
        // to public/ to enable PWA rich install UI
      },
      workbox: {
        globPatterns: ['**/*.{css,html,ico,png,svg,wasm}'],
        globIgnores: ['**/data/**', '**/assets/index-*.js'],
        maximumFileSizeToCacheInBytes: 100 * 1024 * 1024, // 100 MB
        // Clean up old caches on activation
        cleanupOutdatedCaches: true,
        // Skip waiting for old service worker to finish
        skipWaiting: true,
        // Take control of all clients immediately
        clientsClaim: true,
        // Force update service worker version
        cacheId: 'zen-chess-v2.0.0',
        runtimeCaching: [
          // Network-first for navigation requests (HTML) - shorter cache in dev
          {
            urlPattern: ({ request }) => request.mode === 'navigate',
            handler: 'NetworkFirst',
            options: {
              cacheName: 'pages-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: isDev ? 0 : 60 * 60 // No cache in dev, 1 hour in prod
              },
              networkTimeoutSeconds: 3
            }
          },
          // Network-first for JS bundles - always get fresh code, no cache in dev
          {
            urlPattern: /\/assets\/.*\.js$/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'js-cache',
              expiration: {
                maxEntries: 20,
                maxAgeSeconds: isDev ? 0 : 60 * 60 * 24 // No cache in dev, 1 day in prod
              },
              networkTimeoutSeconds: 3
            }
          },
          // Cache-first for fonts (they rarely change)
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'gstatic-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          // Stale-while-revalidate for images and other assets
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp|ico)$/i,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'image-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 30 // 30 days
              }
            }
          }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: '0.0.0.0', // Listen on all network interfaces
    port: 5173,
    strictPort: false, // Try next available port if 5173 is busy
    proxy: {
      // Proxy Anthropic API calls through the dev server so the
      // API key stays server-side (mirrors the Vercel Edge Function in prod)
      '/api/anthropic': {
        target: 'https://api.anthropic.com',
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/api\/anthropic/, ''),
        configure: (proxy) => {
          proxy.on('proxyReq', (proxyReq) => {
            const key = env.ANTHROPIC_API_KEY || env.VITE_ANTHROPIC_API_KEY || '';
            if (key) {
              proxyReq.setHeader('x-api-key', key);
            }
          });
        },
      },
    },
  },
  optimizeDeps: {
    exclude: ['stockfish.wasm']
  },
  assetsInclude: ['**/*.wasm'],
  esbuild: {
    // Remove console/debugger in production builds
    drop: isDev ? [] : ['console', 'debugger'],
  },
  build: {
    // Optimize chunk splitting for faster loading
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Core vendor chunks
          if (id.includes('node_modules/react-dom')) return 'vendor-react';
          if (id.includes('node_modules/react/') || id.includes('node_modules/react-router')) return 'vendor-react';
          if (id.includes('node_modules/chess.js') || id.includes('node_modules/react-chessboard')) return 'vendor-chess';
          if (id.includes('node_modules/framer-motion')) return 'vendor-animation';
          // AI libs in separate chunk
          if (id.includes('/lib/claude') || id.includes('/lib/chessGenius')) return 'chunk-ai';
          // Data chunks - keep large data files in their own chunks
          if (id.includes('/data/puzzles/')) return 'data-puzzles';
          if (id.includes('/data/openings/')) return 'data-openings';
          if (id.includes('/data/instructiveGames/')) return 'data-games';
          if (id.includes('/data/positional/')) return 'data-patterns';
          if (id.includes('/data/courses/')) return 'data-courses';
          if (id.includes('/data/curriculum/')) return 'data-curriculum';
          if (id.includes('/data/endgames/')) return 'data-endgames';
        },
      },
    },
    // Enable CSS code splitting
    cssCodeSplit: true,
    // Reduce chunk size warnings threshold
    chunkSizeWarningLimit: 1000,
    // Minify for smaller bundles (esbuild is built into Vite)
    minify: 'esbuild',
  },
  }
})
