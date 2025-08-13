<script setup
    lang="ts">
    import { useconvRGBStore } from '@/stores/convRGB';
    import { useVisualsStore } from '@/stores/visuals';
    import { exampleImagesRGB } from '@/utils/exampleImagesRGB';
    import Label from '../ui/label/Label.vue';

    const convRGBStore = useconvRGBStore()
    const visualsStore = useVisualsStore()


    function setImage(index: number): void {
        visualsStore.clearHighlight()
        convRGBStore.resetInput()
        convRGBStore.resetKernel()
        convRGBStore.setImage(exampleImagesRGB[index])
        convRGBStore.isExampleSelected = true
    }

</script>
<template>

    <div class="p-2">
        <Label>Example images</Label>
        <div class="flex p-2 flex-wrap space-x-2">
            <img class="size-[80px]" width="80" src="@/assets/imageRGB_0.jpg" alt="0" @click="setImage(0)">
            <img class="size-[80px]" width="80" src="@/assets/imageRGB_1.jpg" alt="0" @click="setImage(1)">
            <img class="size-[80px]" width="80" src="@/assets/imageRGB_2.jpg" alt="0" @click="setImage(2)">
        </div>
    </div>

</template>
