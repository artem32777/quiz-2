import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useSounds } from '@/composables/useSounds.ts'

export const useLegendStore = defineStore('legend', () => {
  const { clickSound } = useSounds()

  const isLegendBtnShow = ref(false)
  const isLegendShow = ref(false)

  function toggleLegend() {
    clickSound.play()
    isLegendShow.value = !isLegendShow.value
  }

  return {
    isLegendBtnShow,
    isLegendShow,
    toggleLegend,
  }
})
