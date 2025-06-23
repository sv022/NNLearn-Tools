import { ref } from 'vue'
import { defineStore } from 'pinia'
import { type Image } from '@/types/image'
import imageformat from '@/utils/imageformat'

export const useImageStore = defineStore('image', () => {
  const image = ref<Image>({
    pixels: [],
    width: 8,
    height: 8,
  })

  const padding = ref<number>(0)

  const setImage = (pixels: number[], widthNew: number, heightNew: number, paddingNew: number) => {
    image.value.pixels = imageformat(pixels, widthNew, heightNew, paddingNew)
    image.value.width = widthNew
    image.value.height = heightNew
  }

  const setSize = (widthNew: number, heightNew: number) => {
    image.value.width = widthNew
    image.value.height = heightNew
    image.value.pixels = imageformat(
      image.value.pixels,
      image.value.width,
      image.value.height,
      padding.value,
    )
  }

  image.value.pixels = Array.from({ length: 32 * 32 }, () => Math.random())

  return { image, padding, setImage, setSize }
})
