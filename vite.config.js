import {defineConfig} from 'vite';
import {resolve, dirname} from 'node:path';
import {fileURLToPath} from 'node:url';

const rootDir = dirname(fileURLToPath(new URL(import.meta.url)));

export default defineConfig({
  base: '/benjennings/',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(rootDir, 'index.html'),
        fundamentals: resolve(rootDir, 'fundamentals/index.html'),
        designs: resolve(rootDir, 'designs/index.html'),
        experiments: resolve(rootDir, 'experiments/index.html'),
        resources: resolve(rootDir, 'resources/index.html'),
      },
    },
  },
});
