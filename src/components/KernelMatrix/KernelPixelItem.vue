<script setup
    lang="ts">
    import HoverCard from '../ui/hover-card/HoverCard.vue';
    import HoverCardContent from '../ui/hover-card/HoverCardContent.vue';
    import HoverCardTrigger from '../ui/hover-card/HoverCardTrigger.vue';


    const props = defineProps<{
        value: number
    }>();

</script>

<template>

    <HoverCard>
        <HoverCardTrigger>
            <div class="flex justify-center items-center size-10 border text-gray-500">{{ props.value.toFixed(2) }}
            </div>
        </HoverCardTrigger>
        <HoverCardContent>
            Pixel value: {{ props.value.toFixed(2) }}
        </HoverCardContent>
    </HoverCard>

</template>