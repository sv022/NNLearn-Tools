<script setup
    lang="ts">
    import ImageSettings from './Settings/ImageSettings.vue';
    import KernelSettings from './Settings/KernelSettings.vue';

</script>

<template>
    <div class="flex">
        <div class="flex flex-1/2 items-center justify-center">
            <ImageSettings />
        </div>
        <div class="flex flex-1/2 items-center justify-center">
            <KernelSettings />
        </div>
    </div>
</template>