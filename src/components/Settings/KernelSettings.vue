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
    import {
        Select,
        SelectContent,
        SelectGroup,
        SelectItem,
        SelectLabel,
        SelectTrigger,
        SelectValue,
    } from '@/components/ui/select'
    import { useconv2dStore } from '@/stores/conv2d';
    import { useVisualsStore } from '@/stores/visuals';
    import { Kernels } from '@/types/kernels';
    import { kernelNameMap } from '@/utils/kernelNames';
    import { ref } from 'vue';

    const conv2dStore = useconv2dStore()

    const visualsStore = useVisualsStore()

    const selectedKernel = ref<Kernels | 'random'>('random')

    function setKernel() {
        visualsStore.clearHighlight()
        if (selectedKernel.value === 'random') {
            conv2dStore.resetKernel()
            return
        }
        conv2dStore.setKernel(selectedKernel.value)
    }

</script>

<template>

    <div class="flex flex-col items-center h-full w-full">
        <div class="w-[440px]">
            <h3 class="text-3xl font-bold pb-3 text-center">Kernel Settings</h3>
            <NumberField class="p-2" id="size" :disabled="conv2dStore.isKernelSelected" :default-value="3" :min="1"
                :step="2" :max="7" :model-value="conv2dStore.kernel.height">
                <Label for="size">Kernel Size</Label>
                <NumberFieldContent>
                    <NumberFieldDecrement @click="conv2dStore.decrementKernelSize(); visualsStore.clearHighlight()" />
                    <NumberFieldInput />
                    <NumberFieldIncrement @click="conv2dStore.incrementKernelSize(); visualsStore.clearHighlight()" />
                </NumberFieldContent>
            </NumberField>
            <NumberField class="p-2" id="size" :default-value="1" :min="1"
                :step="1" :max="3" :model-value="conv2dStore.stride">
                <Label for="size">Stride</Label>
                <NumberFieldContent>
                    <NumberFieldDecrement @click="conv2dStore.stride--; visualsStore.clearHighlight()" />
                    <NumberFieldInput />
                    <NumberFieldIncrement @click="conv2dStore.stride++; visualsStore.clearHighlight()" />
                </NumberFieldContent>
            </NumberField>
            <div class="p-2">
              <Select id="kernelSelect" v-model="selectedKernel" @update:model-value="setKernel">
                  <Label for="kernelSelect" class="pb-2">Kernel type</Label>
                    <SelectTrigger class="w-[180px]">
                        <SelectValue placeholder="Select a kernel" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel class="font-semibold">Kernels</SelectLabel>
                            <SelectItem value='random'>
                                Random
                            </SelectItem>
                            <SelectItem v-for="kernel in Object.values(Kernels)" :key="kernel.toString()"
                                :value="kernel.valueOf()" :class="kernel">
                                {{ kernelNameMap[kernel] }}
                            </SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>

            </div>
        </div>
    </div>

</template>
