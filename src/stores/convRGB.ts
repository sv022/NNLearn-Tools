import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import imageformat from '@/utils/imageformat'
import convolve from '@/utils/convolve'
import getRandomKernel from '@/utils/randomKernel'
import getKernel from '@/utils/exampleKernels'
import type { Kernels } from '@/types/kernels'
import type { ImageRGB } from '@/types/imageRGB'
import type { Image } from '@/types/image'

export const useconvRGBStore = defineStore('convrgb', () => {
  const input = ref<ImageRGB>({
    R: [],
    G: [],
    B: [],
    width: 8,
    height: 8,
  })
  const kernel = ref<Image>(getRandomKernel(3))

  const padding = ref<number>(0)
  const stride = ref<number>(1)
  const isExampleSelected = ref<boolean>(false)
  const isKernelSelected = ref<boolean>(false)

  function setImage(pixels: number[], widthNew: number, heightNew: number) {}

  function resetInput() {
    input.value.R = Array.from({ length: 32 * 32 }, () => Math.random())
    input.value.G = Array.from({ length: 32 * 32 }, () => Math.random())
    input.value.B = Array.from({ length: 32 * 32 }, () => Math.random())
    input.value.width = 8
    input.value.height = 8
    isExampleSelected.value = false
    padding.value = 0
  }

  const incrementInputSize = () => {
    input.value.height++
    input.value.width++
  }
  const decrementInputSize = () => {
    input.value.height--
    input.value.width--
  }
  const incrementPadding = () => {
    padding.value++
  }
  const decrementPadding = () => {
    padding.value--
  }
  const incrementKernelSize = () => {
    kernel.value.height += 2
    kernel.value.width += 2
    kernel.value = getRandomKernel(kernel.value.height)
  }
  const decrementKernelSize = () => {
    kernel.value.height -= 2
    kernel.value.width -= 2
    kernel.value = getRandomKernel(kernel.value.height)
  }

  const setKernel = (kernelType: Kernels) => {
    isKernelSelected.value = true
    kernel.value = getKernel(kernelType)
  }

  const resetKernel = () => {
    kernel.value = getRandomKernel(3)
    isKernelSelected.value = false
  }

  function setImagePixelRGB(i: number, j: number, channel: 'R' | 'G' | 'B', value: number) {
    input.value[channel][i * input.value.width + j] = value
  }

  const inputResultR = computed<Image>(() =>
    imageformat(input.value.R, input.value.width, input.value.height, padding.value),
  )
  const inputResultG = computed<Image>(() =>
    imageformat(input.value.G, input.value.width, input.value.height, padding.value),
  )
  const inputResultB = computed<Image>(() =>
    imageformat(input.value.B, input.value.width, input.value.height, padding.value),
  )

  resetInput()

  const outputR = computed(() => {
    return convolve(
      {
        pixels: input.value.R,
        width: input.value.width,
        height: input.value.height,
      },
      kernel.value,
      padding.value,
      stride.value,
    )
  })
  const outputG = computed(() => {
    return convolve(
      {
        pixels: input.value.G,
        width: input.value.width,
        height: input.value.height,
      },
      kernel.value,
      padding.value,
      stride.value,
    )
  })
  const outputB = computed(() => {
    return convolve(
      {
        pixels: input.value.B,
        width: input.value.width,
        height: input.value.height,
      },
      kernel.value,
      padding.value,
      stride.value,
    )
  })

  return {
    kernel,
    input,
    padding,
    stride,
    inputResultR,
    inputResultG,
    inputResultB,
    isExampleSelected,
    isKernelSelected,
    outputR,
    outputG,
    outputB,
    setImage,
    resetInput,
    incrementInputSize,
    decrementInputSize,
    incrementKernelSize,
    decrementKernelSize,
    incrementPadding,
    decrementPadding,
    setKernel,
    resetKernel,
    setImagePixelRGB,
  }
})
