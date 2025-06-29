<script setup
    lang="ts">
    import { cn } from '@/lib/utils';
    import HoverCard from '../ui/hover-card/HoverCard.vue';
    import HoverCardContent from '../ui/hover-card/HoverCardContent.vue';
    import HoverCardTrigger from '../ui/hover-card/HoverCardTrigger.vue';
    import grayscaleToHex from '@/utils/grayscaleToHex';
    import { Slider } from '@/components/ui/slider'
    import { Label } from '@/components/ui/label'
    import { ref } from 'vue';
    import { useconv2dStore } from '@/stores/conv2d';

    const conv2dStore = useconv2dStore()

    const props = defineProps<{
        value: number
        size: string
        highlight: boolean
        posX: number
        posY: number
    }>();

    const pixelValue = ref<number[]>([Math.round(props.value * 100) / 100])


</script>

<template>
    <div>
        <HoverCard>
            <HoverCardTrigger>
                <div :class="cn('flex items-center justify-center size-5 text-[8px] border text-gray-400', props.size, { 'border-red-500': props.highlight })"
                    :style="{ backgroundColor: grayscaleToHex(props.value) }">
                    {{ props.value.toFixed(2) }}
                </div>
            </HoverCardTrigger>
            <HoverCardContent>
                <div class="space-y-2">
                    <Label class="p-2" for="slider">Pixel value: {{ pixelValue }}</Label>
                    <Slider id="slider" v-model="pixelValue" :min="0" :max="1" :step="0.1"
                        @update:model-value="conv2dStore.setImagePixel(props.posX - 1, props.posY - 1, pixelValue[0])" />
                    <Label class="p-2">Position: ({{ props.posX }}, {{ props.posY }})</Label>
                </div>
            </HoverCardContent>
        </HoverCard>
    </div>

</template>