import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useVisualsStore = defineStore('visuals', () => {
  const highlightFrame = ref<number[][][]>([])
  function checkHighlight(i: number, j: number, kernelSize: number): boolean {
    if (!highlightFrame.value) return false
    for (let k = 0; k < highlightFrame.value.length; k++) {
      for (let l = 0; l < kernelSize; l++) {
        if (highlightFrame.value[k][l][0] === i && highlightFrame.value[k][l][1] === j) return true
      }
    }
    return false
  }
  return { highlightFrame, checkHighlight }
})
