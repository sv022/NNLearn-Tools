<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <main>
    <div class="flex flex-col items-center justify-center p-2 md:p-0 space-y-10">
      <h1>
        <span class="text-4xl font-bold text-nowrap"> Available tools </span>
      </h1>
      <RouterLink to="/conv2d">
        <div class="border p-2 border-gray-500 rounded-md">
          <img src="../assets/homepage_demo2.png" alt="demo" width="800" />
          <h2 class="text-2xl font-bold text-center">Convolution Grayscale Visualizer</h2>
        </div>
      </RouterLink>
      <RouterLink to="/convrgb">
        <div class="border p-2 border-gray-500 rounded-md">
          <img src="../assets/homepage_demo3.png" alt="demo" width="800" />
          <h2 class="text-2xl font-bold text-center">Convolution RGB Visualizer</h2>
        </div>
      </RouterLink>
    </div>
  </main>
</template>
