<script setup
    lang="ts">
    import OutputPixel from './OutputPixelRGB.vue';
    import { useVisualsStore } from '@/stores/visuals';
    import { computed } from 'vue';
    import getPixelSize from '@/utils/pixelSize';
    import { useconvRGBStore } from '@/stores/convRGB';

    const convRGBStore = useconvRGBStore()
    const visualsStore = useVisualsStore()

    function getHighlightFrame(w: number, h: number) {
        visualsStore.channel = 'R'
        visualsStore.getHighlightFrame(w, h, convRGBStore.kernel.width, convRGBStore.inputResultR, convRGBStore.padding, convRGBStore.stride)
    }

    const width = computed(() => {
        return convRGBStore.inputResultR.width
    })
    const height = computed(() => {
        return convRGBStore.inputResultR.height
    })

    const pixelSize = computed(() => {
        return getPixelSize(width.value * 3, height.value * 3)
    })

    const checkHighlightPixel = (i: number, j: number) => {
        return visualsStore.highlightPixel[0] === i && visualsStore.highlightPixel[1] === j
    }

</script>

<template>
    <div>
        <div>
            <div v-for="i in convRGBStore.outputR.height" v-bind:key="i" class="flex">
                <OutputPixel v-for="j in convRGBStore.outputR.height" v-bind:key="i * convRGBStore.outputR.height + j" channel="R"
                    :value="convRGBStore.outputR.pixels[((i - 1) * convRGBStore.outputR.width) + (j - 1)]" :size="pixelSize"
                    :highlight="checkHighlightPixel(i, j)" @click="getHighlightFrame(i, j)" />
            </div>
        </div>
    </div>
</template>
