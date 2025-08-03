export default function rgbToGrayscale(rgbArray: number[]): number[] {
  const grayscaleArray: number[] = []

  for (let i = 0; i < rgbArray.length; i += 3) {
    const r = rgbArray[i]
    const g = rgbArray[i + 1]
    const b = rgbArray[i + 2]

    const grayValue = Math.round(0.21 * r + 0.72 * g + 0.07 * b)

    grayscaleArray.push(Math.min(255, Math.max(0, grayValue)) / 255)
  }

  return grayscaleArray
}
