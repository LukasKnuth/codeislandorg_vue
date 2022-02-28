// todo ideally, the generation of this would happen at compile-time
<route lang="yaml">
meta:
  type: standalone
  title: Timeline
  description: A timeline of all content on this page.
</route>

<template>
  <div>
    <label><input type="checkbox" v-model="filters.blogOnly"> Blog Posts only</label>
    <ul>
      <li v-for="route in routes">
        <router-link :to="route">{{route.name}}</router-link>
        <dl>
          <dt>Path</dt>
          <dd><code>{{route.path}}</code></dd>
          <dt>Meta</dt>
          <dd><code>{{JSON.stringify(route.meta)}}</code></dd>
        </dl>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router"
import { computed, reactive } from "vue"

const router = useRouter()

const filters = reactive({
  blogOnly: false
})
const routes = computed(() => {
  return router.getRoutes().filter(route => {
    if (filters.blogOnly) {
      return route?.meta?.type === "blog"
    } else {
      return true
    }    
  })
})
</script>

<style>
</style>
