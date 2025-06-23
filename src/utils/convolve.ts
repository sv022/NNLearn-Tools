import type { Image } from '@/types/image'

export default function convolve(image: Image, kernel: Image, padding: number = 0): Image {
  // Проверка на нечетные размеры ядра (обычно ядро имеет нечетные размеры)
  if (kernel.width % 2 !== 1 || kernel.height % 2 !== 1) {
    throw new Error('Kernel dimensions should be odd numbers')
  }

  const halfKernelWidth = Math.floor(kernel.width / 2)
  const halfKernelHeight = Math.floor(kernel.height / 2)

  // Применяем padding к изображению
  const paddedWidth = image.width + 2 * padding
  const paddedHeight = image.height + 2 * padding
  const paddedImage = new Array(paddedWidth * paddedHeight).fill(0)

  // Копируем исходное изображение с учетом padding
  for (let y = 0; y < image.height; y++) {
    for (let x = 0; x < image.width; x++) {
      const newX = x + padding
      const newY = y + padding
      paddedImage[newY * paddedWidth + newX] = image.pixels[y * image.width + x]
    }
  }

  // Создаем результирующее изображение
  const resultWidth = image.width + 2 * padding - kernel.width + 1
  const resultHeight = image.height + 2 * padding - kernel.height + 1

  // Если размеры получились некорректными, возвращаем пустое изображение
  if (resultWidth <= 0 || resultHeight <= 0) {
    return {
      pixels: [],
      width: 0,
      height: 0,
    }
  }

  const resultPixels = new Array(resultWidth * resultHeight).fill(0)

  // Применяем свертку
  for (let y = 0; y < resultHeight; y++) {
    for (let x = 0; x < resultWidth; x++) {
      let sum = 0

      // Проходим по каждому элементу ядра
      for (let ky = 0; ky < kernel.height; ky++) {
        for (let kx = 0; kx < kernel.width; kx++) {
          const imageX = x + kx
          const imageY = y + ky
          const imageValue = paddedImage[imageY * paddedWidth + imageX]
          const kernelValue = kernel.pixels[ky * kernel.width + kx]

          sum += imageValue * kernelValue
        }
      }

      resultPixels[y * resultWidth + x] = sum
    }
  }

  return {
    pixels: resultPixels,
    width: resultWidth,
    height: resultHeight,
  }
}
