export default function splitRGB(rgbArray: number[]): { R: number[]; G: number[]; B: number[] } {
  const R: number[] = []
  const G: number[] = []
  const B: number[] = []

  for (let i = 0; i < rgbArray.length; i += 3) {
    const r = rgbArray[i] / 255
    const g = rgbArray[i + 1] / 255
    const b = rgbArray[i + 2] / 255

    R.push(r)
    G.push(g)
    B.push(b)
  }

  return { R, G, B }
}
