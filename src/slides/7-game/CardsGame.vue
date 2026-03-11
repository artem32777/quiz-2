<script setup lang="ts">
import { ref, watch } from 'vue'
import cardA from './img/A.webp'
import cardB from './img/B.webp'
import cardC from './img/C.webp'
import cardD from './img/D.webp'
import { useOptions } from '@/composables/useOptions.ts'
import { useEventListener } from '@vueuse/core'

const { isGameStarted } = defineProps<{
  isGameStarted: boolean
}>()

const emits = defineEmits<{
  win: [void]
}>()

const { sound } = useOptions()

const initialCardsState = [
  { id: 'A', src: cardA },
  { id: 'B', src: cardB },
  { id: 'C', src: cardC },
  { id: 'D', src: cardD },
]

const winCardsState = ['B', 'A', 'D', 'C']

const cards = ref([...initialCardsState])

const checkIsWinState = () =>
  cards.value.map((c) => c.id).every((id, idx) => id === winCardsState[idx])

watch(
  () => isGameStarted,
  (val) => {
    if (!val) {
      cards.value = [...initialCardsState]
      draggingIndex.value = null
      dragOverIndex.value = null
      ghost.value = null
    }
  },
)

const draggingIndex = ref<number | null>(null)
const dragOverIndex = ref<number | null>(null)
const ghost = ref<{ src: string; x: number; y: number } | null>(null)

function getPoint(e: MouseEvent | TouchEvent) {
  const touch = 'touches' in e ? e.touches[0] || e.changedTouches[0] : null
  return touch
    ? { x: touch.clientX, y: touch.clientY }
    : { x: (e as MouseEvent).clientX, y: (e as MouseEvent).clientY }
}

function startDrag(index: number, e: MouseEvent | TouchEvent) {
  const card = cards.value[index]
  if (!card) return
  sound.confirm.play()
  draggingIndex.value = index
  dragOverIndex.value = index
  const point = getPoint(e)
  ghost.value = { src: card.src, x: point.x, y: point.y }
}

function onPointerMove(e: MouseEvent | TouchEvent) {
  if (draggingIndex.value === null || !ghost.value) return
  const point = getPoint(e)
  ghost.value.x = point.x
  ghost.value.y = point.y

  const slotEl = document.elementFromPoint(point.x, point.y)?.closest('.slot') as HTMLElement | null
  const index = slotEl ? Array.from(slotEl.parentElement?.children || []).indexOf(slotEl) : -1
  if (index >= 0) dragOverIndex.value = index
}

function endDrag() {
  const i = draggingIndex.value
  const j = dragOverIndex.value
  if (i !== null && j !== null && i !== j && cards.value[i] && cards.value[j]) {
    ;[cards.value[i], cards.value[j]] = [cards.value[j]!, cards.value[i]!]
  }
  sound.select.play()
  draggingIndex.value = null
  dragOverIndex.value = null
  ghost.value = null

  if (checkIsWinState()) {
    emits('win')
  }
}

function handleMove(e: MouseEvent | TouchEvent) {
  if (draggingIndex.value === null) return
  if ('touches' in e) e.preventDefault()
  onPointerMove(e)
}

function handleEnd() {
  if (draggingIndex.value !== null) endDrag()
}

useEventListener(document, 'touchmove', handleMove, { passive: false })
useEventListener(document, 'touchend', handleEnd)
useEventListener(document, 'mousemove', handleMove)
useEventListener(document, 'mouseup', handleEnd)
</script>

<template>
  <div
    class="cards-wrapper"
    :class="{ started: isGameStarted }"
  >
    <div class="row">
      <div
        v-for="(card, index) in cards"
        :key="card.id"
        class="slot"
        :class="{ over: dragOverIndex === index }"
        @touchstart.passive.stop="startDrag(index, $event)"
        @mousedown.stop.prevent="startDrag(index, $event)"
      >
        <img
          class="card"
          :src="card.src"
          :alt="card.id"
          :class="{ invisible: draggingIndex === index }"
          draggable="false"
        />
      </div>
    </div>

    <img
      v-if="ghost"
      class="ghost"
      :src="ghost.src"
      alt="drag-ghost"
      :style="{ left: ghost.x + 'px', top: ghost.y + 'px' }"
      draggable="false"
    />
  </div>
</template>

<style scoped lang="scss">
.cards-wrapper {
  position: absolute;
  top: 25%;
  height: calc(100% - 25%);
  user-select: none;
  touch-action: none;
  pointer-events: none;
  &.started {
    pointer-events: auto;
  }
}

.row {
  display: flex;
  justify-content: center;
  gap: 1vw;
  opacity: 0;
  transition: opacity 1s ease 0s;
  .started & {
    opacity: 1;
  }
}

.slot {
  width: 18%;
  cursor: grab;
  transition:
    transform 120ms ease,
    box-shadow 120ms ease;
  &:nth-child(2) {
    transform: translate(0, 10%);
  }
  &:nth-child(3) {
    transform: translate(0, -10%);
  }
  &:nth-child(4) {
    transform: translate(-15%, 10%);
  }
}

.slot.over {
  transform: scale(1.06);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
}

.card {
  pointer-events: none;
}

.invisible {
  opacity: 0;
}

.ghost {
  position: fixed;
  width: 15%;
  transform: translate(-50%, -50%);
  pointer-events: none;
  z-index: 1000;
  filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 0.5));
}
</style>
