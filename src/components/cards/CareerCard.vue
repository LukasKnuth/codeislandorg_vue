<template>
  <div class="card">
    <h3>{{props.entry.position}} at <span class="company">{{props.entry.company}}</span></h3>
    <p>From {{start}} to {{end}}</p>
    <p>{{props.entry.description}}</p>
  </div>
</template>

<script setup>
import { computed } from '@vue/runtime-core'
import { format } from 'date-fns'

const props = defineProps(['entry'])

const start = computed(() => props.entry.start ? format(props.entry.start, "MMMM yyyy") : "")
const end = computed(() => props.entry.end ? format(props.entry.end, "MMMM yyyy") : "now")
</script>

<style>
span.company {
  font-weight: bold;
}
</style>