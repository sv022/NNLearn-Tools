export default function imageformat(
  pixels: number[],
  width: number,
  height: number,
  padding: number,
): number[] {
  const newWidth = width + 2 * padding
  const newHeight = height + 2 * padding

  const newImage = new Array(newWidth * newHeight).fill(0)
  
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const originalPos = y * width + x

      const newPos = (y + padding) * newWidth + (x + padding)

      newImage[newPos] = pixels[originalPos]
    }
  }

  return newImage
}
