export default function imageformat(
  pixels: number[],
  width: number,
  height: number,
  padding: number,
): number[] {
  const newWidth = width + 2 * padding
  const newHeight = height + 2 * padding

  // Создаем новый массив, заполненный нулями (черный цвет)
  const newImage = new Array(newWidth * newHeight).fill(0)

  // Копируем исходное изображение в центр нового изображения
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      // Позиция в исходном изображении
      const originalPos = y * width + x

      // Позиция в новом изображении (со смещением на padding)
      const newPos = (y + padding) * newWidth + (x + padding)

      // Копируем пиксель
      newImage[newPos] = pixels[originalPos]
    }
  }

  return newImage
}
