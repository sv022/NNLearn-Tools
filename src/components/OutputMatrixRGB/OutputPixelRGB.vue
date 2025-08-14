<script setup
    lang="ts">
    import { cn } from '@/lib/utils';
    import grayscaleToHexChannel from '@/utils/grayscaleToRGB';

    const props = defineProps<{
        values: number[]
        size: string
        highlight: boolean
    }>();

</script>

<template>

    <div :class="cn('flex justify-center items-center size-10 border text-[8px] text-gray-400', props.size, { 'border-red-500': props.highlight })"
        :style="{ backgroundColor: grayscaleToHexChannel(props.values) }">
    </div>

</template>
