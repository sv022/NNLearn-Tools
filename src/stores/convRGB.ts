import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import imageformat from '@/utils/imageformat'
import convolve from '@/utils/convolve'
import getRandomKernel from '@/utils/randomKernel'
import getKernel from '@/utils/exampleKernels'
import type { Kernels } from '@/types/kernels'
import type { ImageRGB } from '@/types/imageRGB'
import type { Image } from '@/types/image'
import { exampleImagesRGB } from '@/utils/exampleImagesRGB'

export const useconvRGBStore = defineStore('convrgb', () => {
  const input = ref<ImageRGB>(exampleImagesRGB[0])
  const kernel = ref<Image>(getRandomKernel(3))

  const padding = ref<number>(0)
  const stride = ref<number>(1)
  const isExampleSelected = ref<boolean>(false)
  const isKernelSelected = ref<boolean>(false)

  function setImage(image: ImageRGB) {
    input.value.R = image.R
    input.value.G = image.G
    input.value.B = image.B
    input.value.width = image.width
    input.value.height = image.height
  }

  function resetInput() {
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

  function setKernelPixel(i: number, j: number, value: number) {
    kernel.value.pixels[i * kernel.value.width + j] = value
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
  const inputResult = computed<ImageRGB>(() => ({
    R: inputResultR.value.pixels,
    G: inputResultG.value.pixels,
    B: inputResultB.value.pixels,
    width: inputResultR.value.width,
    height: inputResultR.value.height,
  }))

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
    inputResult,
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
    setKernelPixel,
    resetKernel,
    setImagePixelRGB,
  }
})
