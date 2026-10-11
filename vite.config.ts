/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import path from 'node:path';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
  test: {
    environment: 'jsdom',
    coverage: {
      provider: 'v8',
      reporter: ['text'],
      include: ['src/**/*.ts'],
      exclude: [
        'src/types/**',
        'src/pages/index.ts',
        'src/constants/index.ts',
        'src/services/api/index.ts',
        'src/main.ts',
        'src/services/firebaseauth.ts',
        'src/services/api/base-url.ts',
        'src/features/auth/icons.ts',
      ],
      thresholds: {
        statements: 80,
      },
    },
  },
});
