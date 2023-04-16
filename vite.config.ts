import { defineConfig } from 'vitest/config';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'UseWithLoading',
    },
  },
  test: {
    environment: 'happy-dom',
  },
});
