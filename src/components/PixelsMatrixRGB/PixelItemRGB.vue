<script setup
    lang="ts">
    import { cn } from '@/lib/utils';
    import HoverCard from '../ui/hover-card/HoverCard.vue';
    import HoverCardContent from '../ui/hover-card/HoverCardContent.vue';
    import HoverCardTrigger from '../ui/hover-card/HoverCardTrigger.vue';
    import { Slider } from '@/components/ui/slider'
    import { Label } from '@/components/ui/label'
    import { computed, ref } from 'vue';
    import grayscaleToHexChannel from '@/utils/grayscaleToRGB';
    import { useconvRGBStore } from '@/stores/convRGB';

    const convRGBStore = useconvRGBStore()


    const props = defineProps<{
        value: number
        channel: 'R' | 'G' | 'B'
        size: string
        highlight: boolean
        posX: number
        posY: number
    }>();

    const pixelValue = ref<number[]>([Math.round(props.value * 100) / 100])

    const width = computed(() => {
        return convRGBStore.input.width + convRGBStore.padding * 2
    })
    const height = computed(() => {
        return convRGBStore.input.height + convRGBStore.padding * 2
    })

    const updatePixel = (posX: number, posY: number, value: number) => {
        convRGBStore.setImagePixelRGB(posX - 1 - convRGBStore.padding, posY - 1 - convRGBStore.padding, props.channel, value)
        const r = Math.floor(convRGBStore.kernel.width / 2)

        let w = posX;
        let h = posY;

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
        // visualsStore.getHighlightFrame(w, h, r, conv2dStore.input)
    }


</script>

<template>
    <div>
        <HoverCard :open-delay="1500" :close-delay="1000">
            <HoverCardTrigger>
                <div :class="cn('flex items-center justify-center size-5 text-[8px] border text-gray-400', props.size, { 'border-red-500': props.highlight })"
                    :style="{ backgroundColor: grayscaleToHexChannel(props.value, props.channel) }">

                </div>
            </HoverCardTrigger>
            <HoverCardContent>
                <div class="space-y-2">
                    <Label class="p-2" for="slider">Pixel value: {{ pixelValue }}</Label>
                    <Slider id="slider" v-model="pixelValue" :min="0" :max="1" :step="0.1"
                        @update:model-value="updatePixel(props.posX, props.posY, pixelValue[0])" />
                    <Label class="p-2">Position: ({{ props.posX }}, {{ props.posY }})</Label>
                </div>
            </HoverCardContent>
        </HoverCard>
    </div>

</template>
