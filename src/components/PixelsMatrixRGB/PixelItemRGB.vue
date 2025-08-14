<script setup
    lang="ts">
    import { cn } from '@/lib/utils';
    import grayscaleToHexChannel from '@/utils/grayscaleToRGB';


    const props = defineProps<{
        values: number[]
        size: string
        highlight: boolean
        posX: number
        posY: number
    }>();

</script>

<template>
    <div>
        <div :class="cn('flex items-center justify-center size-5 text-[8px] border text-gray-400', props.size, { 'border-red-500': props.highlight })"
            :style="{ backgroundColor: grayscaleToHexChannel(props.values) }">
        </div>
    </div>

</template>
