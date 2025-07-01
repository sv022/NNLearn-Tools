import type { Image } from '@/types/image'

export default function imageformat(
  pixels: number[],
  width: number,
  height: number,
  padding: number,
): Image {
  const newWidth = width + 2 * padding
  const newHeight = height + 2 * padding

  const newImage = {
    pixels: new Array(newWidth * newHeight).fill(0),
    width: newWidth,
    height: newHeight,
  }

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const originalPos = y * width + x

      const newPos = (y + padding) * newWidth + (x + padding)

      newImage.pixels[newPos] = pixels[originalPos]
    }
  }

  return newImage
}
