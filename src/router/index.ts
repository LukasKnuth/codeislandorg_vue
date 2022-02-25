import { createRouter, createWebHistory } from 'vue-router'
import routes from 'voie-pages'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
})

export default router
