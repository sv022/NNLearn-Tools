<script setup
    lang="ts">
    import { cn } from '@/lib/utils';
    import HoverCard from '../ui/hover-card/HoverCard.vue';
    import HoverCardContent from '../ui/hover-card/HoverCardContent.vue';
    import HoverCardTrigger from '../ui/hover-card/HoverCardTrigger.vue';
    import grayscaleToHex from '@/utils/grayscaleToHex';

    const props = defineProps<{
        value: number
        size: string
        highlight: boolean
    }>();

</script>

<template>

    <HoverCard>
        <HoverCardTrigger>
            <div :class="cn('flex items-center justify-center size-5 text-[8px] border text-gray-400', props.size, { 'border-red-500': props.highlight })"
                :style="{ backgroundColor: grayscaleToHex(props.value) }">
                {{ props.value.toFixed(2) }}</div>
        </HoverCardTrigger>
        <HoverCardContent>
            Pixel value: {{ props.value }}
        </HoverCardContent>
    </HoverCard>

</template>