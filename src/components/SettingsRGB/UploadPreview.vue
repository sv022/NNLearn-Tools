<script setup lang="ts">
import type { ImageRGB } from '@/types/imageRGB'
import grayscaleToHexChannel from '@/utils/grayscaleToRGB'

const props = defineProps<{
  image: ImageRGB
}>()

function getPixels(index: number) {
  return [props.image.R[index], props.image.G[index], props.image.B[index]]
}
</script>

<template>
  <div>
    <div v-for="i in props.image.height" v-bind:key="i" class="flex">
      <div
        v-for="j in props.image.height"
        v-bind:key="i * props.image.height + j"
        class="flex justify-center items-center size-3 text-[8px] text-gray-400"
        :style="{
          backgroundColor: grayscaleToHexChannel(getPixels((i - 1) * props.image.height + (j - 1))),
        }"
      >
        <!-- {{ props.image.pixels[(i - 1) * props.image.height + (j - 1)] }} -->
      </div>
    </div>
  </div>
</template>
