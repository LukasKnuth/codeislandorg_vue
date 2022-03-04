<route lang="yaml">
meta:
  type: standalone
  title: Timeline
  description: A timeline of all content on this page.
</route>

<template>
  <div>
    <label><input type="checkbox" v-model="filters.blogOnly"> Blog Posts only</label>

    <div v-for="e in entries">
      <BlogCard :key="e.id" :route="e.entry" v-if="e.type === 'route'"></BlogCard>
      <CareerCard :key="e.id" :entry="e.entry" v-else-if="e.type === 'career'"></CareerCard>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router"
import { computed, reactive } from "vue"
import { parseISO } from "date-fns"

import career from "@/career.yaml"

const router = useRouter()
const routes = router.getRoutes()
  .filter(({meta}) => ['blog'].includes(meta.type))
  .map(r => {
    const published = parseISO(r.meta.published)
    const meta = {...r.meta, published}
    const route = {...r, meta}
    return {type: "route", sortTime: published, id: route.path, entry: route}
  })
const jobs = career.map(e => {
  const start = e.start ? parseISO(e.start) : undefined
  const end = e.end ? parseISO(e.end) : undefined
  return {type: "career", sortTime: start, id: e.start, entry: {...e, start, end}}
})
const everything = routes.concat(jobs).sort((a, b) => {
  return (b.sortTime ?? 0) - (a.sortTime ?? 0)
})

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
  border-radius: 5px;
  padding: 6px 10px;
  margin-top: 10px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  transition: all 0.3s cubic-bezier(.25,.8,.25,1);
}
</style>
