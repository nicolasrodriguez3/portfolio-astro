import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import node from '@astrojs/node';
import keystatic from '@keystatic/astro';

import react from '@astrojs/react';
import markdoc from '@astrojs/markdoc';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  adapter: node({ mode: 'standalone' }),
  integrations: [tailwind(), keystatic(), react(), markdoc()],
});