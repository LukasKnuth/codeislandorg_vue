<route lang="yaml">
meta:
  type: app
  title: Counter
  description: Count your stuff!
</route>

<template>
  <span>
    <button @click="state.increment">++</button>
    <button @click="state.decrement">--</button>
    Counter: {{state.counter}}<span></span>
  </span>
</template>

<script>
import { useCounterStore } from '@/stores/counter'
import { useRoute } from 'vue-router'
 
export default {
  setup() {
    const counter = useCounterStore()
    const route = useRoute()

    if ("counter" in route.query) {
      const initialValue = route.query["counter"]
      counter.$patch({counter: initialValue})
    }

    return {state: counter}
  }
}
</script>

<style>

</style>