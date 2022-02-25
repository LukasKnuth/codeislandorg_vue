import { ViteSSG } from 'vite-ssg'
import { createPinia } from 'pinia'

import routes from 'voie-pages'
import App from './App.vue'

export const createApp = ViteSSG(App, {routes: routes}, ({app}) => {
  app.use(createPinia())
  // See https://github.com/antfu/vite-ssg/blob/main/examples/multiple-pages-with-store/src/main.ts
})
