export default function invertGrayscaleToHex(grayscaleValue: number): string {
  const invertedValue = 1 - grayscaleValue

  if (invertedValue >= 0.4 && invertedValue <= 0.6) return '#DDDDDD'

  const byteValue = Math.round(invertedValue * 255)

  const hexByte = byteValue.toString(16).padStart(2, '0')

  return `#${hexByte}${hexByte}${hexByte}`
}
