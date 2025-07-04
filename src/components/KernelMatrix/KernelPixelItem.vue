<script setup
    lang="ts">
    import grayscaleToHex from '@/utils/grayscaleToHex';
    import HoverCard from '../ui/hover-card/HoverCard.vue';
    import HoverCardContent from '../ui/hover-card/HoverCardContent.vue';
    import HoverCardTrigger from '../ui/hover-card/HoverCardTrigger.vue';
    import invertGrayscaleToHex from '@/utils/invertGrayscale';
    import { computed, ref } from 'vue';
    import { useconv2dStore } from '@/stores/conv2d';
    import Label from '../ui/label/Label.vue';
    import Slider from '../ui/slider/Slider.vue';
    import { cn } from '@/lib/utils';

    const conv2dStore = useconv2dStore()

    const props = defineProps<{
        value: number
        pixelValue: number
        posX: number
        posY: number
        size: string
    }>();

    const val = ref<number[]>([Math.round(props.value * 100) / 100])
    const pixelVal = computed<number>(() => props.pixelValue || 0)

    const pixelValue = computed({
        get() {
            return [Math.round(props.value * 100) / 100]
        },
        set(newValue) {
            val.value = newValue
        }
    })


</script>

<template>
    <HoverCard>
        <HoverCardTrigger>
            <div :class="cn('flex justify-center items-center size-15 border text-gray-500', props.size)"
                :style="{ backgroundColor: grayscaleToHex(pixelVal), color: invertGrayscaleToHex(pixelVal) }">
                {{ pixelVal.toFixed(2) }}
            </div>
            <div class="flex items-center justify-center text-lg h-10">
                x {{ props.value.toFixed(2) }}
            </div>
        </HoverCardTrigger>
        <HoverCardContent>
            <div class="space-y-2">
                <Label class="p-2" for="slider">Kernel value: {{ pixelValue }}</Label>
                <Slider id="slider" v-model="pixelValue" :min="-1" :max="1" :step="0.1"
                    @update:model-value="conv2dStore.setKernelPixel(props.posX - 1, props.posY - 1, val[0])" />
                <Label class="p-2">Position: ({{ props.posX }}, {{ props.posY }})</Label>
            </div>
        </HoverCardContent>
    </HoverCard>
</template>