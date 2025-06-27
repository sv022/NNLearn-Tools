<script setup
    lang="ts">
    import { useconv2dStore } from '@/stores/conv2d';
    import KernelPixelItem from './KernelPixelItem.vue';
    import { useVisualsStore } from '@/stores/visuals';
    import { computed } from 'vue';
    import grayscaleToHex from '@/utils/grayscaleToHex';
    import invertGrayscaleToHex from '@/utils/invertGrayscale';

    const conv2dstore = useconv2dStore()

    const visualsStore = useVisualsStore()

    const outputPixelValue = computed<string>(() => {
        if (visualsStore.highlightPixel.length === 0) {
            return "-"
        }
        if (conv2dstore.output.pixels.length === 0) {
            return "-"
        }
        const w = visualsStore.highlightPixel[0]
        const h = visualsStore.highlightPixel[1]
        return conv2dstore.output.pixels[((w - 1) * conv2dstore.output.width) + (h - 1)].toFixed(2)
    })

</script>

<template>
    <div class="space-y-5">
        <div>
            <div v-for="i in conv2dstore.kernel.height" v-bind:key="i" class="flex">
                <KernelPixelItem v-for="j in conv2dstore.kernel.height"
                    v-bind:key="conv2dstore.kernel.height * (i - 1) + j"
                    :value="conv2dstore.kernel.pixels[((i - 1) * conv2dstore.kernel.width) + (j - 1)]" />
            </div>
        </div>
        <div class="flex flex-col items-center justify-center text-center">
            <div class="font-bold text-2xl">
                =
            </div>
            <div class="flex size-15 items-center justify-center"
                :style="{ backgroundColor: grayscaleToHex(Number(outputPixelValue)), color: invertGrayscaleToHex(Number(outputPixelValue)) }">
                {{ outputPixelValue }}
            </div>

        </div>
    </div>


</template>