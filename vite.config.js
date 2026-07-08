import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  
  build: {
    minify: 'terser',
    sourcemap: false,
    target: 'es2015',
    chunkSizeWarningLimit: 500,
    
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'animation': ['framer-motion'],
        },
      },
    },
  },
  
  server: {
    optimizeDeps: {
      include: ['react', 'react-dom', 'react-router-dom'],
    },
  },
  
  esbuild: {
    drop: process.env.NODE_ENV === 'production' ? ['console', 'debugger'] : [],
  },
});