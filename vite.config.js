import {defineConfig} from 'vite';

export default defineConfig({
  base: '/benjennings/',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
});

