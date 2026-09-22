import path from 'node:path';
import { fileURLToPath } from 'node:url';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(dirname, 'src') },
      {
        find: '@douyinfe/semi-ui/dist/css/semi.min.css',
        replacement: path.resolve(dirname, 'node_modules/@douyinfe/semi-ui/dist/css/semi.min.css'),
      },
      {
        find: '@semi-bot/semi-theme-figma/semi.min.css',
        replacement: path.resolve(dirname, 'node_modules/@semi-bot/semi-theme-figma/semi.min.css'),
      },
    ],
  },
  server: {
    host: '127.0.0.1',
    port: 5174,
    open: false,
  },
});
