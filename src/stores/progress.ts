import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import { computed, ref } from 'vue'
import { useOptions } from '@/composables/useOptions.ts'

export type QuizOption = {
  id: string
  nextSlide: number | string
} & {
  [key: string]: string | number
}

export const useProgressStore = defineStore('progress', () => {
  const router = useRouter()
  const { sound } = useOptions()

  const options = ref<QuizOption[]>([])
  const selectedOption = ref<QuizOption['id']>()

  const getSelected = computed(() => options.value.find((opt) => opt.id === selectedOption.value))

  const initializeOptions = (quizOptions: QuizOption[], initialOption?: QuizOption['id']) => {
    options.value = quizOptions
    selectedOption.value = initialOption ?? undefined
  }

  const selectOption = (optionName: string | undefined) => {
    if (selectedOption.value === optionName) {
      selectedOption.value = undefined
    } else {
      selectedOption.value = optionName
    }
  }

  const confirmSelection = async () => {
    if (getSelected.value) {
      changeProgress(getSelected.value.nextSlide)
    }
  }

  const changeProgress = (nextSlide: number | string) => {
    sound.done.play()
    void router.push(`/${nextSlide}`)
  }

  return {
    getSelected,
    initializeOptions,
    selectOption,
    confirmSelection,
    changeProgress,
  }
})
