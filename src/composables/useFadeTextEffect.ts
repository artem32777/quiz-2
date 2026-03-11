import { computed, onBeforeUnmount, ref, toValue, watch, type MaybeRefOrGetter } from 'vue'

interface UseFadeTextEffectOptions {
  interval?: number
  startDelay?: number
  autoplay?: boolean
  onComplete?: () => void
}

export const useFadeTextEffect = (
  sourceText: MaybeRefOrGetter<string>,
  options: UseFadeTextEffectOptions = {},
) => {
  const { interval = 120, startDelay = 0, autoplay = true, onComplete } = options

  const words = ref<string[]>([])
  const visibleCount = ref(0)
  const visibleText = ref('')
  const isRunning = ref(false)

  let startTimer: ReturnType<typeof setTimeout> | null = null
  let stepTimer: ReturnType<typeof setTimeout> | null = null

  const visibleWords = computed(() => words.value.slice(0, visibleCount.value))

  const splitToWords = (text: string) => {
    const chunks = text.match(/\S+\s*/g)
    if (chunks?.length) {
      return chunks
    }
    return text ? [text] : []
  }

  const clearTimers = () => {
    if (startTimer) {
      clearTimeout(startTimer)
      startTimer = null
    }
    if (stepTimer) {
      clearTimeout(stepTimer)
      stepTimer = null
    }
  }

  const setSourceText = (text: string) => {
    words.value = splitToWords(text)
    visibleCount.value = 0
    visibleText.value = ''
  }

  const syncVisibleText = () => {
    visibleText.value = visibleWords.value.join('')
  }

  const finish = () => {
    clearTimers()
    isRunning.value = false
    onComplete?.()
  }

  const step = () => {
    if (!isRunning.value) {
      return
    }

    if (visibleCount.value >= words.value.length) {
      finish()
      return
    }

    visibleCount.value += 1
    syncVisibleText()

    if (visibleCount.value >= words.value.length) {
      finish()
      return
    }

    stepTimer = setTimeout(step, Math.max(0, interval))
  }

  const reset = () => {
    clearTimers()
    visibleCount.value = 0
    visibleText.value = ''
    isRunning.value = false
  }

  const stop = () => {
    clearTimers()
    isRunning.value = false
  }

  const start = () => {
    const text = toValue(sourceText) ?? ''
    clearTimers()
    setSourceText(text)

    if (!words.value.length) {
      finish()
      return
    }

    isRunning.value = true

    if (interval <= 0) {
      visibleCount.value = words.value.length
      syncVisibleText()
      finish()
      return
    }

    startTimer = setTimeout(step, Math.max(0, startDelay))
  }

  const restart = () => {
    start()
  }

  watch(
    () => toValue(sourceText),
    () => {
      setSourceText(toValue(sourceText) ?? '')
      if (autoplay) {
        restart()
      }
    },
    { immediate: autoplay },
  )

  onBeforeUnmount(stop)

  return {
    words,
    visibleCount,
    visibleText,
    visibleWords,
    isRunning,
    setSourceText,
    start,
    stop,
    reset,
    restart,
  }
}
