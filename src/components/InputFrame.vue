<script setup
  lang="ts">

  import PixelsMatrix from './PixelsMatrix/PixelsMatrix.vue';
  import KernelMatrix from './KernelMatrix/KernelMatrix.vue';
  import OutputMatrix from './OutputMatrix/OutputMatrix.vue';
</script>

<template>
  <div class="flex w-full md:h-[700px]">
    <div class="flex flex-1/3 items-center justify-center">
      <PixelsMatrix />
    </div>
    <div class="flex flex-1/3 items-center justify-center">
      <KernelMatrix />
    </div>
    <div class="flex flex-1/3 items-center justify-center">
      <OutputMatrix />
    </div>
  </div>
</template>
