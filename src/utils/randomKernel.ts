import type { Image } from '@/types/image'

export default function getRandomKernel(size: number): Image {
  const totalPixels = size * size
  const pixels = new Array(totalPixels)
  let sum = 0

  // Генерируем случайные значения
  for (let i = 0; i < totalPixels; i++) {
    pixels[i] = Math.random()
    sum += pixels[i]
  }

  for (let i = 0; i < totalPixels; i++) {
    pixels[i] /= sum
  }

  return {
    pixels,
    width: size,
    height: size,
  }
}
