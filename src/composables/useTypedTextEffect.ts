import { onBeforeUnmount, ref, toValue, watch, type MaybeRefOrGetter } from 'vue'

interface UseTypedTextEffectOptions {
  speed?: number
  startDelay?: number
  autoplay?: boolean
}

export const useTypedTextEffect = (
  sourceText: MaybeRefOrGetter<string | HTMLElement | null | undefined>,
  options: UseTypedTextEffectOptions = {},
) => {
  const { speed = 20, startDelay = 0, autoplay = true } = options

  const typedText = ref('')
  const isTyping = ref(false)

  let currentIndex = 0
  let fullText = ''
  let startTimer: ReturnType<typeof setTimeout> | null = null
  let typeTimer: ReturnType<typeof setTimeout> | null = null

  const getSource = () => toValue(sourceText)

  const isElement = (value: unknown): value is HTMLElement => {
    return typeof HTMLElement !== 'undefined' && value instanceof HTMLElement
  }

  const readSourceText = () => {
    const source = getSource()

    if (typeof source === 'string') {
      return source
    }
    if (isElement(source)) {
      return source.textContent ?? ''
    }

    return ''
  }

  const writeTypedText = (value: string) => {
    typedText.value = value

    const source = getSource()
    if (isElement(source)) {
      source.textContent = value
    }
  }

  const clearTimers = () => {
    if (startTimer) {
      clearTimeout(startTimer)
      startTimer = null
    }
    if (typeTimer) {
      clearTimeout(typeTimer)
      typeTimer = null
    }
  }

  const typeNextChar = () => {
    if (!isTyping.value || currentIndex >= fullText.length) {
      isTyping.value = false
      return
    }

    writeTypedText(typedText.value + (fullText[currentIndex] ?? ''))
    currentIndex += 1

    typeTimer = setTimeout(typeNextChar, Math.max(0, speed))
  }

  const reset = () => {
    clearTimers()
    writeTypedText('')
    currentIndex = 0
    fullText = ''
    isTyping.value = false
  }

  const stop = () => {
    clearTimers()
    isTyping.value = false
  }

  const start = () => {
    const nextFullText = readSourceText()
    reset()
    fullText = nextFullText

    if (!fullText.length) {
      return
    }

    isTyping.value = true

    if (speed <= 0) {
      writeTypedText(fullText)
      currentIndex = fullText.length
      isTyping.value = false
      return
    }

    startTimer = setTimeout(typeNextChar, Math.max(0, startDelay))
  }

  const restart = () => {
    start()
  }

  watch(
    () => {
      const source = getSource()
      return typeof source === 'string' ? source : source
    },
    () => {
      if (autoplay) {
        restart()
      }
    },
    { immediate: autoplay },
  )

  onBeforeUnmount(stop)

  return {
    typedText,
    isTyping,
    start,
    stop,
    reset,
    restart,
  }
}
