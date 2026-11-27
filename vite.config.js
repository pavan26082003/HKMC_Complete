import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteCompression from 'vite-plugin-compression'
import fs from 'fs'
import path from 'path'

const imageExtensions = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif'])
const shadnagarFolders = ['slider', 'project-plan', 'location-advantage', 'rate-card', 'brochure']

function readShadnagarFolders() {
  const base = path.resolve('public/shadnagar-premium-avenue')
  const folders = {}
  for (const folder of shadnagarFolders) {
    const dir = path.join(base, folder)
    const names = fs.existsSync(dir)
      ? fs.readdirSync(dir).filter((name) => imageExtensions.has(path.extname(name).toLowerCase()))
      : []
    names.sort((a, b) => {
      const numberA = Number((a.match(/(\d+)/) || [])[1] ?? Number.MAX_SAFE_INTEGER)
      const numberB = Number((b.match(/(\d+)/) || [])[1] ?? Number.MAX_SAFE_INTEGER)
      return numberA - numberB || a.localeCompare(b)
    })
    folders[folder] = names.map((name) => `/shadnagar-premium-avenue/${folder}/${encodeURIComponent(name)}`)
  }
  return folders
}

function shadnagarAssetsPlugin() {
  const virtualId = 'virtual:shadnagar-assets'
  const resolvedId = '\0' + virtualId
  return {
    name: 'shadnagar-assets',
    resolveId(id) {
      if (id === virtualId) return resolvedId
    },
    load(id) {
      if (id !== resolvedId) return
      return `export const shadnagarFolders = ${JSON.stringify(readShadnagarFolders())}`
    },
    configureServer(server) {
      const dir = path.resolve('public/shadnagar-premium-avenue')
      server.watcher.add(dir)
      const reload = (file) => {
        if (!file.includes(`${path.sep}shadnagar-premium-avenue${path.sep}`)) return
        const mod = server.moduleGraph.getModuleById(resolvedId)
        if (mod) server.moduleGraph.invalidateModule(mod)
        server.ws.send({ type: 'full-reload' })
      }
      server.watcher.on('add', reload)
      server.watcher.on('unlink', reload)
    },
  }
}

export default defineConfig({
  plugins: [
    shadnagarAssetsPlugin(),
    react({
      // Enable Fast Refresh
      fastRefresh: true,
      // Optimize JSX runtime
      jsxRuntime: 'automatic'
    }),
    // Gzip compression with maximum level
    viteCompression({
      algorithm: 'gzip',
      ext: '.gz',
      threshold: 10240,
      deleteOriginFile: false,
      compressionOptions: { level: 9 } // Maximum compression
    }),
    // Brotli compression with maximum level
    viteCompression({
      algorithm: 'brotliCompress',
      ext: '.br',
      threshold: 10240,
      deleteOriginFile: false,
      compressionOptions: { 
        level: 11 // Maximum Brotli compression
      }
    })
  ],
  server: {
    host: true,
    allowedHosts: [
      "borrower-bluish-spearhead.ngrok-free.dev"
    ]
  },
  build: {
    // Enable minification
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.trace'],
        passes: 2, // Multiple passes for better compression
        unsafe_arrows: true,
        unsafe_methods: true,
        unsafe_proto: true
      },
      mangle: {
        safari10: true
      },
      format: {
        comments: false // Remove all comments
      }
    },
    // Code splitting optimization
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate vendor chunks for better caching
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'animation-vendor': ['framer-motion'],
          'icons-vendor': ['react-icons', 'lucide-react']
        },
        // Optimize chunk file names
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]'
      }
    },
    // Chunk size warnings
    chunkSizeWarningLimit: 1000,
    // Enable CSS code splitting
    cssCodeSplit: true,
    // Source maps disabled for smaller builds
    sourcemap: false,
    // Target modern browsers for smaller bundle
    target: 'es2015',
    // Optimize asset inlining
    assetsInlineLimit: 4096,
    // Report compressed size
    reportCompressedSize: true
  },
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'framer-motion'],
    exclude: [],
    esbuildOptions: {
      target: 'es2015',
      supported: {
        'top-level-await': true
      }
    }
  },
  // Enable esbuild optimizations
  esbuild: {
    logOverride: { 'this-is-undefined-in-esm': 'silent' },
    legalComments: 'none',
    treeShaking: true
  }
})