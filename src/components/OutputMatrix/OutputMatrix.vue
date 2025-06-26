<script setup
    lang="ts">
    import { useconv2dStore } from '@/stores/conv2d';
    import OutputPixel from './OutputPixel.vue';
    import { useVisualsStore } from '@/stores/visuals';
    import { computed } from 'vue';
    import getPixelSize from '@/utils/pixelSize';

    const conv2dstore = useconv2dStore()
    const visualsStore = useVisualsStore()

    function getHighlightFrame(w: number, h: number) {
        const r = Math.floor(conv2dstore.kernel.width / 2)

        const frame: number[][][] = []

        for (let i = w; i <= w + (r * 2); i++) {
            const row = []
            for (let j = h; j <= h + (r * 2); j++) {
                row.push([i, j])
            }
            frame.push(row)
        }
        visualsStore.highlightFrame = frame
        visualsStore.highlightPixel = [w, h]
    }

    const width = computed(() => {
        return conv2dstore.input.width + conv2dstore.padding * 2
    })
    const height = computed(() => {
        return conv2dstore.input.height + conv2dstore.padding * 2
    })

    const pixelSize = computed(() => {
        return getPixelSize(width.value, height.value)
    })

    const checkHighlightPixel = (i: number, j: number) => {
        return visualsStore.highlightPixel[0] === i && visualsStore.highlightPixel[1] === j
    }

</script>

<template>
    <div>
        <div>
            <div v-for="i in conv2dstore.output.height" v-bind:key="i" class="flex">
                <OutputPixel v-for="j in conv2dstore.output.height" v-bind:key="i * conv2dstore.output.height + j"
                    :value="conv2dstore.output.pixels[((i - 1) * conv2dstore.output.width) + (j - 1)]" :size="pixelSize"
                    :highlight="checkHighlightPixel(i, j)" @click="getHighlightFrame(i, j)" />
            </div>
        </div>
    </div>
</template>