<template>
  <div class="card">
    <h3><router-link :to="props.route">{{title}}</router-link></h3>
    <p>At {{date}}</p>
    <p>{{desc}}</p>
  </div>
</template>

<script setup>
import { computed } from '@vue/runtime-core'
import { format } from 'date-fns'

const props = defineProps(['route'])

const date = computed(() => props.route.meta?.published ? format(props.route.meta?.published, "do MMM yyyy") : "")
const title = computed(() => props.route.meta?.title ?? "")
const desc = computed(() => props.route.meta?.description ?? "")
</script>

<style>

</style>