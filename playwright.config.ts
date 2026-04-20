import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  retries: 1,
  webServer: {
    command: 'npm run preview',
    port: 4321,
    reuseExistingServer: true,
  },
  use: {
    baseURL: 'http://localhost:4321/kuro-coffee/',
    locale: 'ja-JP',
  },
  projects: [
    { name: 'chromium', use: { browserName: 'chromium' } },
  ],
});
