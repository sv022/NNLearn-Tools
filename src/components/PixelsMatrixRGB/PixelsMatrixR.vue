<script setup
    lang="ts">
  import PixelItem from './PixelItemRGB.vue';
  import { computed } from 'vue';
  import { useVisualsStore } from '@/stores/visuals';
  import { useconvRGBStore } from '@/stores/convRGB';

  const convRGBStore = useconvRGBStore()
  const visualsStore = useVisualsStore()


  const width = computed(() => {
      return convRGBStore.inputResultR.width
  })
  const height = computed(() => {
      return convRGBStore.inputResultR.height
  })

  const pixelSize = computed(() => {
      return 'size-4'
  })

    function getHighlightFrame(wIn: number, hIn: number) {
        const r = Math.floor(convRGBStore.kernel.width / 2)

        let w = wIn;
        let h = hIn;

        w = Math.round(w / convRGBStore.stride)
        h = Math.round(h / convRGBStore.stride)

        if (w <= r) {
          if (r === 1) w = r
          else w = Math.round((r - 0.1) / 2);
        } else if (w >= width.value - r) {
          w = width.value - (r * 2)
        } else {
          w--
        }

        if (h <= r) {
          if (r === 1) h = r
          else h = Math.round((r - 0.1) / 2)
        } else if (h >= height.value - r) {
            h = height.value - (r * 2)
        } else {
            h--
        }

        // w = Math.min(w, width.value - r - (conv2dStore.stride - 1) * 4)
        // h = Math.min(h, height.value - r - (conv2dStore.stride - 1) * 4)
        visualsStore.channel = 'R'
        visualsStore.getHighlightFrame(w, h, convRGBStore.kernel.width, convRGBStore.inputResultR, convRGBStore.padding, convRGBStore.stride)
    }
</script>

<template>

    <div>
        <div v-for="i in height" v-bind:key="-i" class="flex">
            <PixelItem v-for="j in width" v-bind:key="i * height + j"
                :value="convRGBStore.inputResultR.pixels[((i - 1) * width) + (j - 1)]" channel='R' :size="pixelSize"
                :highlight="visualsStore.checkHighlight(i, j, convRGBStore.kernel.height)"
                @click.stop="getHighlightFrame(i, j)" :pos-x="i" :pos-y="j" />
            <!-- <PixelItem v-for="j in props.item.width + props.padding * 2" v-bind:key="j * i" :value="Math.random()" /> -->
        </div>
    </div>

</template>
