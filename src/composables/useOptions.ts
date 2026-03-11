import { ref } from 'vue'

export type Option = {
  id: string
} & Record<string, unknown>

export const useOptions = (initialOptions: Option[]) => {
  const options = ref<Option[]>(initialOptions)
  const activeOption = ref<Option | null>(null)

  const selectOption = (option: Option['id'] | null) => {
    if (activeOption.value?.id === option) {
      activeOption.value = null
    } else {
      activeOption.value = options.value.find((opt) => opt.id === option) ?? null
    }
  }

  return {
    options,
    activeOption,
    selectOption,
  }
}
