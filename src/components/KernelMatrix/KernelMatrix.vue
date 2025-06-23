<script setup
    lang="ts">
    import { useconv2dStore } from '@/stores/conv2d';
    import KernelPixelItem from './KernelPixelItem.vue';

    const conv2dstore = useconv2dStore()

</script>

<template>

    <div>
        <div v-for="i in conv2dstore.kernel.height" v-bind:key="i" class="flex">
            <KernelPixelItem v-for="j in conv2dstore.kernel.height"
                v-bind:key="conv2dstore.kernel.pixels[((i - 1) * conv2dstore.kernel.height) + (j - 1)]"
                :value="conv2dstore.kernel.pixels[((i - 1) * conv2dstore.kernel.width) + (j - 1)]" />
        </div>
    </div>

</template>