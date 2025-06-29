export default function grayscaleToHex(grayscaleValue: number) {
  // Ensure the grayscale value is within the valid range (0-255)

  if (grayscaleValue < 0) {
    return '#000000'
  }
  if (grayscaleValue > 1) {
    return '#FFFFFF'
  }

  let hex = Math.round(grayscaleValue * 255).toString(16)

  if (hex.length === 1) {
    hex = '0' + hex
  }

  return `#${hex}${hex}${hex}`
}
