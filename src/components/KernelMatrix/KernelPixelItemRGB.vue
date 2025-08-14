<script setup
  lang="ts">
  import HoverCard from '../ui/hover-card/HoverCard.vue';
  import HoverCardContent from '../ui/hover-card/HoverCardContent.vue';
  import HoverCardTrigger from '../ui/hover-card/HoverCardTrigger.vue';
  import { computed, ref } from 'vue';
  import Label from '../ui/label/Label.vue';
  import Slider from '../ui/slider/Slider.vue';
  import { cn } from '@/lib/utils';
  import { useconvRGBStore } from '@/stores/convRGB';

  const convRGBStore = useconvRGBStore()

  const props = defineProps<{
    value: number
    posX: number
    posY: number
    size: string
  }>();

  const val = ref<number[]>([Math.round(props.value * 100) / 100])

  const pixelValue = computed({
    get() {
      return [Math.round(props.value * 100) / 100]
    },
    set(newValue) {
      val.value = newValue
    }
  })

  const pixelFontSize = computed<string>(() => {
    if (props.size == 'size-7') return 'text-[12px]'
    return 'text-md'
  })

  const kernelValueTextStyle = computed<string>(() => {
    if (props.value > 0) return 'text-emerald-700'
    else if (props.value < 0) return 'text-rose-700'
    return 'text-neutral-700'
  })

  // TODO : display pixel color
  const bgColor = computed<string>(() => {
    return "#FFFFFF"
  })

  const setKernelPixel = () => {
    convRGBStore.setKernelPixel(props.posX - 1, props.posY - 1, val.value[0])
  }

</script>

<template>
  <HoverCard>
    <div class="flex flex-col items-center">
      <HoverCardTrigger>
        <div :class="cn('flex justify-center items-center border text-gray-500', props.size, pixelFontSize)"
          :style="{ backgroundColor: bgColor, color: '#FFFFFF' }">
        </div>
      </HoverCardTrigger>
      <div class="flex items-center justify-center h-10 w-10 text-nowrap text-md">
        <mark>x <wbr></mark><mark :class="kernelValueTextStyle">{{ props.value.toFixed(2) }}</mark>
      </div>
    </div>
    <HoverCardContent>
      <div class="space-y-2">
        <Label class="p-2" for="slider">Kernel value: {{ pixelValue }}</Label>
        <Slider id="slider" v-model="pixelValue" :min="-1" :max="1" :step="0.01" @update:model-value="setKernelPixel" />
        <Label class="p-2">Position: ({{ props.posX }}, {{ props.posY }})</Label>
      </div>
    </HoverCardContent>
  </HoverCard>
</template>

<style scoped>
mark {
  background-color: transparent;
}
</style>
