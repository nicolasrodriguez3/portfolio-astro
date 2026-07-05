import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.nicorodriguez.com.ar',
  output: 'static',
  integrations: [
    tailwind(),
    react(),
    sitemap({
      changefreq: 'monthly',
      priority: 1.0,
      lastmod: new Date(),
      filter: (page) => page !== 'https://www.nicorodriguez.com.ar/404/',
    }),
  ],
});
