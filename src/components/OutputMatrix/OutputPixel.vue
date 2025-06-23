<script setup
    lang="ts">
    import { cn } from '@/lib/utils';
    import grayscaleToHex from '@/utils/grayscaleToHex';

    const props = defineProps<{
        value: number
        size: string
    }>();



</script>

<template>

    <div :class="cn('flex justify-center items-center size-10 border text-[8px] text-gray-400', props.size)"
        :style="{ backgroundColor: grayscaleToHex(props.value) }">{{ props.value.toFixed(2) }}</div>

</template>