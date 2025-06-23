<script setup
    lang="ts">

    import { Label } from '@/components/ui/label'
    import { useconv2dStore } from '@/stores/conv2d';
    import { useVisualsStore } from '@/stores/visuals';
    import exampleImages from '@/utils/exampleImages';
    const conv2dstore = useconv2dStore()
    const visualsStore = useVisualsStore()

</script>
<template>

    <div class="p-2">
        <Label>Example images</Label>
        <div class="flex p-2">
            <img width="80" src="@/assets/image_none.png" alt="0"
                @click="conv2dstore.resetInput(); visualsStore.highlightFrame = []">
            <img width="80" src="@/assets/image_0.png" alt="0"
                @click="conv2dstore.setImage(exampleImages(1), 28, 28); conv2dstore.isExampleSelected = true">
            <img width="80" src="@/assets/image_0.png" alt="0"
                @click="conv2dstore.setImage(exampleImages(2), 28, 28); conv2dstore.isExampleSelected = true">
        </div>
    </div>

</template>