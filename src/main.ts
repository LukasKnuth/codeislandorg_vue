import { ViteSSG } from 'vite-ssg'
import { createPinia } from 'pinia'

import routes from '~pages'
import App from './App.vue'

import { isNavigationFailure } from 'vue-router'
import { ref } from 'vue'

export const createApp = ViteSSG(App, {routes: routes}, ({app, router, head}) => {
  app.use(createPinia())
  // See https://github.com/antfu/vite-ssg/blob/main/examples/multiple-pages-with-store/src/main.ts

  router.afterEach((to, from, failure) => {
    if (!isNavigationFailure(failure)) {
      head?.addHeadObjs(ref({
        title: String(to?.meta?.title ?? "Code Island"),
        meta: [{name: 'description', content: String(to?.meta?.description ?? "")}]
      }))
      if (typeof window !== "undefined") {
        // Only updateDOM on Browsers (e.g. when not rendering for SSG)
        head?.updateDOM()
      }
    }
  })
})
