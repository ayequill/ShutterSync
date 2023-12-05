import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
          chakra: ['@chakra-ui/react', '@chakra-ui/icons'],
          reactIcons: ['react-icons'],
          emotion: ['@emotion/react', '@emotion/styled'],
          framer: ['framer-motion'],
          axios: ['axios'],

        }
      }
    }
  }
});
