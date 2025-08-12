<script setup
    lang="ts">
    import ImageSettings from './SettingsRGB/ImageSettings.vue';
    import KernelSettings from './SettingsRGB/KernelSettings.vue';

</script>

<template>
    <div class="space-y-10 md:flex md:space-x-10">
        <div class="flex flex-1/2 items-center justify-center">
            <ImageSettings />
        </div>
        <div class="flex flex-1/2 items-center justify-center">
            <KernelSettings />
        </div>
    </div>
</template>
