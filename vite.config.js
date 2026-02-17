import { fileURLToPath } from 'node:url';

import { vitePluginWebp } from 'vite-plugin-to-webp';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import VitePluginSvgSpritemap from '@spiriit/vite-plugin-svg-spritemap';

import optimizeSvgSources from './plugins/optimizeSvgSources';
import spriteReplacer from './plugins/spriteReplacer';
import getAllHTMLFiles from './utilities/getAllHTMLFiles';

export default {
  base: './',
  resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },

  css: {
    preprocessorOptions: {
      scss: {
        additionalData: "@use '@/styles/helpers' as *;",
      },
    },
    devSourcemap: true,
  },

  build: { emptyOutDir: true },

  plugins: [
    VitePluginSvgSpritemap(['src/assets/icons/**/*.svg'], {
      prefix: '',
      svgo: false,
      styles: false,
      injectSvgOnDev: true,
    }),

    vitePluginWebp({ cwd: ['src/assets/images'] }),
    ViteImageOptimizer({
      include: ['src/assets/images/**/*.webp'],
      webp: {
        effort: 6,
        quality: 80,
        lossless: true,
        alphaQuality: 80,
        nearLossless: true,
      },
    }),

    optimizeSvgSources(),
  ],
};
