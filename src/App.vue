<script setup lang="ts">
import NavBar from './components/NavBar.vue'
import { router } from './routes';
</script>

<template>
  <div class="pb-3" style="background-color: antiquewhite; min-height: 100vh;">
    <header class="sticky-top">
      <NavBar />
    </header>
    <div class="container-fluid">
      <main class="container pt-3">
        <RouterView :key="router.currentRoute.value.fullPath"/>
      </main>
    </div>
    <footer></footer>
  </div>
</template>

<style scoped></style>
