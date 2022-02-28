import { fileURLToPath, URL } from 'url'

import vue from '@vitejs/plugin-vue'
import pages from 'vite-plugin-pages'
import markdown from 'vite-plugin-md'
import components from 'unplugin-vue-components/vite'

// https://vitejs.dev/config/
export default {
  plugins: [
    vue({include: [/\.vue$/, /\.md$/]}),
    pages({extensions: ['vue', 'md']}),
    markdown({headEnabled: false}),
    components({include: [/\.vue$/, /\.vue\?vue/, /\.md$/]})
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  ssgOptions: {
    // Creates `page/index.htm` instead of `page.htm` which will work correctly when opening http://host.de/page
    // If using `page.htm`, the router won't understand which route it's expected to serve.
    dirStyle: 'nested',
    formatting: 'minify'
  }
}
