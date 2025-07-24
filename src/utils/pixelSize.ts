export default function getPixelSize(width: number, height: number) {
  let sizeRound = 2
  if (width > 4) {
    sizeRound = 4
  }
  if (width > 6){
    sizeRound = 6
  }
  if (width > 8) {
    sizeRound = 8
  }
  if (width > 12) {
    sizeRound = 12
  }
  if (width > 16) {
    sizeRound = 16
  }
  if (width > 24) {
    sizeRound = 24
  }
  if (width > 28) {
    sizeRound = 28
  }
  if (width > 32) {
    sizeRound = 32
  }
  const pixelSizeMap: { [key: number]: string } = {
    32: 'size-3',
    28: 'size-4',
    24: 'size-5',
    16: 'size-6',
    12: 'size-7',
    8: 'size-9',
    6: 'size-10',
    4: 'size-13',
    2: 'size-15',
  }
  return pixelSizeMap[sizeRound]
}
