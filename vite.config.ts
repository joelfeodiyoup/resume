import { defineConfig } from 'vite'
import { devtools } from '@tanstack/devtools-vite'

import { tanstackStart } from '@tanstack/react-start/plugin/vite'

import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { plugin as markdownPlugin, Mode } from 'vite-plugin-markdown'
import { imagetools } from 'vite-imagetools'

const config = defineConfig({
  base: '/resume/',
  resolve: { tsconfigPaths: true },
  plugins: [
    devtools(),
    tailwindcss(),
    imagetools(),
    tanstackStart({
      prerender: {
        enabled: true,
        crawlLinks: true,
      }
    }),
    viteReact(),
    markdownPlugin({ mode: [Mode.HTML] }),
  ],
})

export default config
