export default function grayscaleToHexChannel(values: number[]): string {
  let byteValueR = Math.round(values[0] * 255)
  let byteValueG = Math.round(values[1] * 255)
  let byteValueB = Math.round(values[2] * 255)

  if (byteValueR < 0) byteValueR = 0
  if (byteValueG < 0) byteValueG = 0
  if (byteValueB < 0) byteValueB = 0

  if (byteValueR > 255) byteValueR = 255
  if (byteValueG > 255) byteValueG = 255
  if (byteValueB > 255) byteValueB = 255

  const hexByteR = byteValueR.toString(16).padStart(2, '0')
  const hexByteG = byteValueG.toString(16).padStart(2, '0')
  const hexByteB = byteValueB.toString(16).padStart(2, '0')

  return `#${hexByteR}${hexByteG}${hexByteB}`
}
