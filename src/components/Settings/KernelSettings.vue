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
    import { useconv2dStore } from '@/stores/conv2d';
    import { useVisualsStore } from '@/stores/visuals';

    const conv2dStore = useconv2dStore()

    const visualsStore = useVisualsStore()

</script>

<template>

    <div class="flex flex-col items-center h-full w-full">
        <div class="w-[400px]">
            <h3 class="text-3xl font-bold pb-3">Kernel Settings</h3>
            <NumberField class="p-2" id="size" :disabled="conv2dStore.isExampleSelected" :default-value="3" :min="1"
                :step="2" :max="5" :model-value="conv2dStore.kernel.height">
                <Label for="size">Kernel Size</Label>
                <NumberFieldContent>
                    <NumberFieldDecrement
                        @click="conv2dStore.decrementKernelSize(); visualsStore.highlightFrame = []" />
                    <NumberFieldInput />
                    <NumberFieldIncrement
                        @click="conv2dStore.incrementKernelSize(); visualsStore.highlightFrame = []" />
                </NumberFieldContent>
            </NumberField>
        </div>
    </div>

</template>