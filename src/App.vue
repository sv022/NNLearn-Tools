<script setup
  lang="ts">
  import { RouterView } from 'vue-router'
  import NavBar from './components/NavBar.vue';
  import HeaderLogo from './components/HeaderLogo.vue';
</script>

<template>
  <div class="h-dvh px-10">
    <header class="flex h-1/12 md:space-x-5">
      <HeaderLogo />
      <NavBar />
    </header>
    <RouterView class="h-11/12" />
  </div>
</template>

<style scoped></style>
