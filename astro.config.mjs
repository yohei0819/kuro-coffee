import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://yohei0819.github.io',
  base: '/kuro-coffee',
  integrations: [react(), sitemap()],
});
