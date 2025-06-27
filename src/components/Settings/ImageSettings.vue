<script setup
    lang="ts">
    import { Label } from '@/components/ui/label'
    import {
        NumberField,
        NumberFieldContent,
        NumberFieldDecrement,
        NumberFieldIncrement,
        NumberFieldInput,
    } from '@/components/ui/number-field'
    import PremadeImages from './PremadeImages.vue';
    import { useconv2dStore } from '@/stores/conv2d';

    const conv2dStore = useconv2dStore()

</script>



<template>

    <div class="flex flex-col items-center h-full w-full">
        <div class="w-[440px]">
            <h3 class="text-center text-3xl font-bold pb-3">Input Settings</h3>
            <NumberField class="p-2" id="size" :disabled="conv2dStore.isExampleSelected" :default-value="8" :min="2"
                :max="32" :model-value="conv2dStore.input.height">
                <Label for="size">Image Size</Label>
                <NumberFieldContent>
                    <NumberFieldDecrement @click="conv2dStore.decrementInputSize()" />
                    <NumberFieldInput />
                    <NumberFieldIncrement @click="conv2dStore.incrementInputSize()" />
                </NumberFieldContent>
            </NumberField>
            <NumberField class="p-2" id="padding" :default-value="0" :min="0" :model-value="conv2dStore.padding">
                <Label for="padding">Padding</Label>
                <NumberFieldContent>
                    <NumberFieldDecrement @click="conv2dStore.padding--; conv2dStore.resetKernel()" />
                    <NumberFieldInput />
                    <NumberFieldIncrement @click="conv2dStore.padding++; conv2dStore.resetKernel()" />
                </NumberFieldContent>
            </NumberField>
            <PremadeImages />
        </div>
    </div>

</template>