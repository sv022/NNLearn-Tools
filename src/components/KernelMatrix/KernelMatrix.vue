<script setup
    lang="ts">
    import { useconv2dStore } from '@/stores/conv2d';
    import KernelPixelItem from './KernelPixelItem.vue';
    import { useVisualsStore } from '@/stores/visuals';
    import { computed } from 'vue';
    import grayscaleToHex from '@/utils/grayscaleToHex';
    import invertGrayscaleToHex from '@/utils/invertGrayscale';
    import { storeToRefs } from 'pinia';
    import getPixelSize from '@/utils/pixelSize';

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

    const outputPixelBGColor = computed<string>(() => {
        if (outputPixelValue.value === "-") {
            return "#FFFFFF"
        }
        return grayscaleToHex(Number(outputPixelValue.value))
    })
    const outputPixelTextColor = computed<string>(() => {
        if (outputPixelValue.value === "-") {
            return "#000000"
        }
        return invertGrayscaleToHex(Number(outputPixelValue.value))
    })

    const { kernel } = storeToRefs(conv2dstore)
    const { framePixelValues } = storeToRefs(visualsStore)

    const kernelPixelSize = computed(() => {
        return getPixelSize(kernel.value.height, kernel.value.width)
    })

</script>

<template>
    <div class="space-y-5">
        <div>
            <div v-for="i in conv2dstore.kernel.height" v-bind:key="i" class="flex space-x-10">
                <KernelPixelItem v-for="j in conv2dstore.kernel.height"
                    v-bind:key="conv2dstore.kernel.height * (i - 1) + j"
                    :value="kernel.pixels[((i - 1) * kernel.width) + (j - 1)]"
                    :pixel-value="framePixelValues[((i - 1) * conv2dstore.kernel.width) + (j - 1)]" :pos-x="i"
                    :pos-y="j" :size="kernelPixelSize" />
            </div>
        </div>
        <div class="flex flex-col items-center justify-center text-center">
            <div class="font-bold text-2xl">
                =
            </div>
            <div class="flex size-15 items-center justify-center"
                :style="{ backgroundColor: outputPixelBGColor, color: outputPixelTextColor }">
                {{ outputPixelValue }}
            </div>

        </div>
    </div>


</template>