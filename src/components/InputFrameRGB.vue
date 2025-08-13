<script setup
  lang="ts">

  import { useVisualsStore } from '@/stores/visuals';
  import KernelMatrix from './KernelMatrix/KernelMatrixRGB.vue';
  import OutputMatrixB from './OutputMatrixRGB/OutputMatrixB.vue';
  import OutputMatrixG from './OutputMatrixRGB/OutputMatrixG.vue';
  import OutputMatrixR from './OutputMatrixRGB/OutputMatrixR.vue';
  import PixelsMatrixB from './PixelsMatrixRGB/PixelsMatrixB.vue';
  import PixelsMatrixG from './PixelsMatrixRGB/PixelsMatrixG.vue';
  import PixelsMatrixR from './PixelsMatrixRGB/PixelsMatrixR.vue';
  import Button from './ui/button/Button.vue';

  const visualsStore = useVisualsStore()

  function toggleChannel() {
    if (visualsStore.channel === 'R') {
      visualsStore.channel = 'G'
    } else if (visualsStore.channel === 'G') {
      visualsStore.channel = 'B'
    } else {
      visualsStore.channel = 'R'
    }
  }
</script>

<template>
  <div class="w-full space-y-10 md:flex md:h-[700px]">
    <div class="flex flex-col space-y-4 flex-1/3 items-center justify-center">
      <PixelsMatrixR v-if="visualsStore.channel === 'R'" />
      <PixelsMatrixG v-if="visualsStore.channel === 'G'" />
      <PixelsMatrixB v-if="visualsStore.channel === 'B'" />
      <Button variant="outline" @click="toggleChannel">{{ visualsStore.channel }}</Button>
    </div>
    <div class="flex flex-1/3 min-w-[200px] items-center justify-center">
      <KernelMatrix />
    </div>
    <div class="flex flex-col space-y-2 flex-1/3 items-center justify-center">
      <OutputMatrixR v-if="visualsStore.channel === 'R'" />
      <OutputMatrixG v-if="visualsStore.channel === 'G'" />
      <OutputMatrixB v-if="visualsStore.channel === 'B'" />
    </div>
  </div>
</template>
