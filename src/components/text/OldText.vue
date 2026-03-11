<script setup lang="ts">
import historyBg from './history-bg.webp'
import missionBg from './mission-bg.webp'
import { computed, nextTick, ref, useTemplateRef, watch } from 'vue'
import { useFadeTextEffect } from '@/composables/useFadeTextEffect.ts'

const {
  show = true,
  type = 'history',
  width = '85',
  height = 'auto',
} = defineProps<{
  show?: boolean
  height?: number | string
  width?: number | string
  top?: number | string
  left?: number | string
  type?: 'history' | 'mission'
  img?: string
}>()

const emit = defineEmits<{
  (event: 'printEnded'): void
}>()

const textSourceRef = useTemplateRef<HTMLElement>('textSourceRef')
const sourceText = ref('')

const wrapperBgImage = computed(() => {
  const image = {
    history: historyBg,
    mission: missionBg,
  }
  return image[type]
})

const { words, visibleCount, start, stop, setSourceText } = useFadeTextEffect(sourceText, {
  autoplay: false,
  onComplete: () => {
    if (show) {
      emit('printEnded')
    }
  },
})

const extractSlotText = (sourceEl: HTMLElement) => {
  const clone = sourceEl.cloneNode(true) as HTMLElement
  clone.querySelectorAll('br').forEach((el) => el.replaceWith('\n'))
  return clone.textContent ?? ''
}

watch(
  () => show,
  async (isVisible) => {
    if (!isVisible) {
      stop()
      return
    }

    await nextTick()
    const sourceEl = textSourceRef.value

    if (!sourceEl) {
      return
    }

    sourceText.value = extractSlotText(sourceEl)
    setSourceText(sourceText.value)
    start()
  },
  { immediate: true },
)
</script>

<template>
  <Transition name="scale">
    <div
      v-if="show"
      :style="{
        height: height + 'vw',
        top: top + '%',
        left: left + '%',
        width: width + 'vw',
      }"
      class="wrapper"
      :class="`wrapper-${type}`"
    >
      <div class="text-inner">
        <div
          ref="textSourceRef"
          class="text-layer text-layer-source"
        >
          <slot />
        </div>

        <div class="text-layer text-layer-typed">
          <span
            v-for="(word, index) in words"
            :key="index"
            class="fade-word"
            :class="{ 'is-visible': index < visibleCount }"
          >
            {{ word }}
          </span>
        </div>
      </div>
      <img
        :src="img || wrapperBgImage"
        class="img"
        alt="Описание"
      />
    </div>
  </Transition>
</template>

<style scoped lang="scss">
.wrapper {
  position: absolute;
  display: flex;
  align-items: center;

  &.wrapper-history {
    padding: 1% 3%;
  }

  &.wrapper-mission {
    padding: 3% 6%;
  }
}

.img {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
}

.text-inner {
  position: relative;
  pointer-events: none;
  width: 100%;
}

.text-layer {
  display: block;
  width: 100%;
  line-height: 1.3;
  z-index: 1;

  .wrapper-history & {
    font-size: 1.3vw;
    color: white;
  }

  .wrapper-mission & {
    text-align: center;
    font-size: 2.5vw;
  }
}

.text-layer-source {
  visibility: hidden;
}

.text-layer-typed {
  position: absolute;
  inset: 0;
  white-space: pre-wrap;
}

.fade-word {
  opacity: 0;
}

.fade-word.is-visible {
  animation: fadeWord 1s ease forwards;
}

@keyframes fadeWord {
  to {
    opacity: 1;
  }
}
</style>
