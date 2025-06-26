import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useVisualsStore = defineStore('visuals', () => {
  const highlightFrame = ref<number[][][]>([])
  const highlightPixel = ref<number[]>([])
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
  return { highlightFrame, highlightPixel, clearHighlight, checkHighlight }
})
