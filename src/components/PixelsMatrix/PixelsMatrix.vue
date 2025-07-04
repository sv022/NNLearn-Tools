<script setup
    lang="ts">
    import { useconv2dStore } from '@/stores/conv2d';
    import PixelItem from './PixelItem.vue';
    import { computed } from 'vue';
    import { useVisualsStore } from '@/stores/visuals';
    import getPixelSize from '@/utils/pixelSize';

    const conv2dStore = useconv2dStore()
    const visualsStore = useVisualsStore()


    const width = computed(() => {
        return conv2dStore.inputResult.width
    })
    const height = computed(() => {
        return conv2dStore.inputResult.height
    })

    const pixelSize = computed(() => {
        return getPixelSize(width.value, height.value)
    })

    function getHighlightFrame(wIn: number, hIn: number) {
        const r = Math.floor(conv2dStore.kernel.width / 2)

        let w = wIn;
        let h = hIn;

        if (w <= r) {
            w = Math.round(r / 2);
        } else if (w >= width.value - r) {
            w = width.value - (r * 2)
        } else {
            w--
        }

        if (h <= r) {
            h = Math.round(r / 2);
        } else if (h >= height.value - r) {
            h = height.value - (r * 2)
        } else {
            h--
        }

        visualsStore.getHighlightFrame(w, h, r, conv2dStore.inputResult)
    }
</script>

<template>

    <div>
        <div v-for="i in height" v-bind:key="-i" class="flex">
            <PixelItem v-for="j in width" v-bind:key="i * height + j"
                :value="conv2dStore.inputResult.pixels[((i - 1) * width) + (j - 1)]" :size="pixelSize"
                :highlight="visualsStore.checkHighlight(i, j, conv2dStore.kernel.height)"
                @click.stop="getHighlightFrame(i, j)" :pos-x="i" :pos-y="j" />
            <!-- <PixelItem v-for="j in props.item.width + props.padding * 2" v-bind:key="j * i" :value="Math.random()" /> -->
        </div>
    </div>

</template>