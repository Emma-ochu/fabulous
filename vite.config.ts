import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { imagetools } from 'vite-imagetools';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    imagetools(),
  ],
});