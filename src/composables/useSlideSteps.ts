import { sleep } from '@/utils/utils.ts'
import { useOptions } from '@/composables/useOptions.ts'

export const useSlideSteps = (state: Record<string, boolean>) => {
  const { sound } = useOptions()
  const keys = Object.keys(state)
  let currentIndex = -1

  async function nextStep() {
    if (currentIndex >= 0 && currentIndex < keys.length) {
      state[keys[currentIndex] as string] = false
    }

    sound.confirm.play()
    await sleep(1000)
    currentIndex++

    if (currentIndex < keys.length) {
      state[keys[currentIndex] as string] = true
    }
  }

  return {
    nextStep,
  }
}
