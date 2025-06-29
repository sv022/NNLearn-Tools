import { Kernels } from '@/types/kernels'

const kernelMap = {
  [Kernels.blur3x3]: {
    pixels: [1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9],
    width: 3,
    height: 3,
  },
  [Kernels.gaussianBlur3x3]: {
    pixels: [1 / 16, 2 / 16, 1 / 16, 2 / 16, 4 / 16, 2 / 16, 1 / 16, 2 / 16, 1 / 16],
    width: 3,
    height: 3,
  },
  [Kernels.sharpen]: {
    pixels: [0, -1, 0, -1, 5, -1, 0, -1, 0],
    width: 3,
    height: 3,
  },
  [Kernels.edgeDetection]: {
    pixels: [-1, -1, -1, -1, 8, -1, -1, -1, -1],
    width: 3,
    height: 3,
  },
  [Kernels.sobelHorizontal]: {
    pixels: [-1, -2, -1, 0, 0, 0, 1, 2, 1],
    width: 3,
    height: 3,
  },
  [Kernels.sobelVertical]: {
    pixels: [-1, 0, 1, -2, 0, 2, -1, 0, 1],
    width: 3,
    height: 3,
  },
  [Kernels.emboss]: {
    pixels: [-2, -1, 0, -1, 1, 1, 0, 1, 2],
    width: 3,
    height: 3,
  },
}

export default function getKernel(name: Kernels) {
  return structuredClone(kernelMap[name])
}
