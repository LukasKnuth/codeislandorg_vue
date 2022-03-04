<route lang="yaml">
meta:
  type: standalone
  title: Timeline
  description: A timeline of all content on this page.
</route>

<template>
  <div>
    <label><input type="checkbox" v-model="filters.blogOnly"> Blog Posts only</label>

    <div class="card" v-for="e in entries">
      <div v-if="e.type === 'career'">
        <h3>{{e.entry.position}} at {{e.entry.company}}</h3>
        <p>From {{e.entry.start}} to {{e.entry.end || "now"}}</p>
        <p>{{e.entry.description}}</p>
      </div>
      <div v-else-if="e.type === 'route'">
        <h3><router-link :to="e.entry">{{e.entry.meta.title}}</router-link></h3>
        <p>{{e.entry.meta.description}}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router"
import { computed, reactive } from "vue"
import career from "@/career.yaml"

const router = useRouter()
const routes = router.getRoutes().map(route => {
  return {type: "route", entry: route}
})
const jobs = career.map(e => {
  return {type: "career", entry: e}
})
const everything = routes.concat(jobs) // todo sort this...

const filters = reactive({
  blogOnly: false
})
const entries = computed(() => {
  return everything.filter(({type, entry}) => {
    if (filters.blogOnly) {
      return type === "route" && entry.meta?.type === "blog"
    } else {
      return true
    }    
  })
})
</script>

<style>
.card {
  border: 1px solid #ccc;
  border-radius: 20px;
}
</style>
