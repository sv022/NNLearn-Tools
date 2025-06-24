import { Kernels } from '@/types/kernels'

export const kernelNameMap = {
  [Kernels.blur3x3]: 'Blur 3x3',
  [Kernels.gaussianBlur3x3]: 'Gaussian Blur 3x3',
  [Kernels.sharpen]: 'Sharpen',
  [Kernels.edgeDetection]: 'Edge Detection',
  [Kernels.sobelHorizontal]: 'Sobel Horizontal',
  [Kernels.sobelVertical]: 'Sobel Vertical',
  [Kernels.emboss]: 'Emboss',
}
