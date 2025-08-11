<script setup
  lang="ts">

  import KernelMatrix from './KernelMatrix/KernelMatrix.vue';
import OutputMatrixB from './OutputMatrixRGB/OutputMatrixB.vue';
import OutputMatrixG from './OutputMatrixRGB/OutputMatrixG.vue';
import OutputMatrixR from './OutputMatrixRGB/OutputMatrixR.vue';
import PixelsMatrixB from './PixelsMatrixRGB/PixelsMatrixB.vue';
import PixelsMatrixG from './PixelsMatrixRGB/PixelsMatrixG.vue';
import PixelsMatrixR from './PixelsMatrixRGB/PixelsMatrixR.vue';
</script>

<template>
  <div class="w-full space-y-10 md:flex md:h-[700px]">
    <div class="flex flex-col space-y-4 flex-1/3 items-center justify-center">
      <PixelsMatrixR />
      <PixelsMatrixG />
      <PixelsMatrixB />
    </div>
    <div class="flex flex-1/3 min-w-[200px] items-center justify-center">
      <KernelMatrix />
    </div>
    <div class="flex flex-col space-y-2 flex-1/3 items-center justify-center">
      <OutputMatrixR />
      <OutputMatrixG />
      <OutputMatrixB />
    </div>
  </div>
</template>
