export default function grayscaleToHexChannel(value: number, channel: 'R' | 'G' | 'B'): string {
  const byteValue = Math.round(value * 255)

  const hexByte = byteValue.toString(16).padStart(2, '0')

  switch (channel) {
    case 'R':
      return `#${hexByte}0000`
    case 'G':
      return `#00${hexByte}00`
    case 'B':
      return `#0000${hexByte}`
    default:
      throw new Error('Invalid channel. Use "R", "G" or "B"')
  }
}
