import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://yohei0819.github.io',
  base: '/kuro-coffee',
  integrations: [react()],
});
