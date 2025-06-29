import type { Image } from '@/types/image'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useVisualsStore = defineStore('visuals', () => {
  const highlightFrame = ref<number[][][]>([])
  const highlightPixel = ref<number[]>([])
  const framePixelValues = ref<number[]>(Array.from({ length: 3 * 3 }, () => 0))

  function getHighlightFrame(w: number, h: number, r: number, inputPixels: Image) {
    const frame: number[][][] = []
    framePixelValues.value = []

    for (let i = w; i <= w + r * 2; i++) {
      const row = []
      for (let j = h; j <= h + r * 2; j++) {
        row.push([i, j])
        framePixelValues.value.push(inputPixels.pixels[(i - 1) * inputPixels.width + (j - 1)])
      }
      frame.push(row)
    }
    highlightFrame.value = frame
    highlightPixel.value = [w, h]
  }

  function checkHighlight(i: number, j: number, kernelSize: number): boolean {
    if (highlightFrame.value.length === 0) return false
    for (let k = 0; k < kernelSize; k++) {
      for (let l = 0; l < kernelSize; l++) {
        if (highlightFrame.value[k][l][0] === i && highlightFrame.value[k][l][1] === j) return true
      }
    }
    return false
  }

  function clearHighlight() {
    highlightFrame.value = []
    highlightPixel.value = []
  }

  return {
    highlightFrame,
    highlightPixel,
    framePixelValues,
    getHighlightFrame,
    clearHighlight,
    checkHighlight,
  }
})
