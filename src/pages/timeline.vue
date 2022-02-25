// todo ideally, the generation of this would happen at compile-time

<template>
  <div>
    <ul>
      <li v-for="route in router.getRoutes()">
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

const router = useRouter()
</script>

<style>
</style>
