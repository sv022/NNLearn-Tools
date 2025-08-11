import { Kernels } from '@/types/kernels'

export const kernelNameMap = {
  [Kernels.blur3x3]: 'Blur 3x3',
  [Kernels.blur5x5]: 'Blur 5x5',
  [Kernels.gaussianBlur3x3]: 'Gaussian Blur 3x3',
  [Kernels.gaussianBlur5x5]: 'Gaussian Blur 5x5',
  [Kernels.sharpen]: 'Sharpen',
  [Kernels.edgeDetection]: 'Edge Detection',
  [Kernels.sobelHorizontal]: 'Sobel Horizontal',
  [Kernels.sobelVertical]: 'Sobel Vertical',
  [Kernels.emboss]: 'Emboss',
}
