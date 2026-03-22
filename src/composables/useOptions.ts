import { ref } from 'vue'
import { useSounds } from '@/composables/useSounds.ts'

export type Option = {
  id: string
} & Record<string, unknown>

export const useOptions = (options: Option[]) => {
  const activeOption = ref<Option | null>(null)

  const { clickSound, click2Sound } = useSounds()

  const selectOption = (option: Option['id'] | null) => {
    if (activeOption.value?.id === option) {
      activeOption.value = null
      click2Sound.play()
    } else {
      activeOption.value = options.find((opt) => opt.id === option) ?? null
      clickSound.play()
    }
  }

  return {
    activeOption,
    selectOption,
  }
}
