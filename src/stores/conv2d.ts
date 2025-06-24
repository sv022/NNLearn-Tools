import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { Image } from '@/types/image'
import imageformat from '@/utils/imageformat'
import convolve from '@/utils/convolve'
import getRandomKernel from '@/utils/randomKernel'
import getKernel from '@/utils/exampleKernels'
import type { Kernels } from '@/types/kernels'

export const useconv2dStore = defineStore('conv2d', () => {
  const input = ref<Image>({
    pixels: [],
    width: 8,
    height: 8,
  })
  const kernel = ref<Image>(getRandomKernel(3))

  const padding = ref<number>(0)
  const isExampleSelected = ref<boolean>(false)
  const isKernelSelected = ref<boolean>(false)

  function setImage(pixels: number[], widthNew: number, heightNew: number) {
    input.value.pixels = imageformat(pixels, widthNew, heightNew, padding.value)
    input.value.width = widthNew
    input.value.height = heightNew
  }

  function resetInput() {
    input.value.pixels = Array.from({ length: 32 * 32 }, () => Math.random())
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

  const inputResult = computed(() =>
    imageformat(input.value.pixels, input.value.width, input.value.height, padding.value),
  )

  resetInput()

  const output = computed(() => {
    return convolve(input.value, kernel.value, padding.value)
  })

  return {
    kernel,
    input,
    padding,
    inputResult,
    isExampleSelected,
    isKernelSelected,
    output,
    setImage,
    resetInput,
    incrementInputSize,
    decrementInputSize,
    incrementKernelSize,
    decrementKernelSize,
    setKernel,
    resetKernel,
  }
})
