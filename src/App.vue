<script setup
  lang="ts">
  import { RouterView } from 'vue-router'
</script>

<template>
  <div class="h-dvh px-10">
    <header class="flex h-1/12 md:p-2">
      <div class="flex items-center md:p-4">
        <h1 class="text-2xl font-bold text-nowrap">
          NNLearn Tools
        </h1>
      </div>
      <ul class="flex items-center w-96 justify-around min-w-[200px]">
        <li>
          <RouterLink to="/">Home</RouterLink>
        </li>
        <li>
          Tools
        </li>
        <li>
          <RouterLink to="/about">About</RouterLink>
        </li>
      </ul>
    </header>
    <RouterView class="h-11/12" />
  </div>
</template>

<style scoped></style>
