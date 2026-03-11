<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import Card from '@/components/Card.vue'
import Button from '@/components/button/Button.vue'
import areaHeart from './img/heart.webp'
import areaCarbon from './img/carbon.webp'
import areaKidneys from './img/kidneys.webp'
import areaWeight from './img/weight.webp'
import { type Slide9Card, slide9Cards } from '@/slides/9-game/cardsData.ts'
import Text from '@/components/text/Text.vue'
import { useProgressStore } from '@/stores/progress.ts'
import { vOnClickOutside } from '@vueuse/components'
import { useOptions } from '@/composables/useOptions.ts'
import { useSlideSteps } from '@/composables/useSlideSteps.ts'
import { shuffleArray } from '@/utils/shuffleArray.ts'

const progress = useProgressStore()
const { sound } = useOptions()

const state = reactive({
  text: false,
  game: false,
  gameEndText: false,
  results: false,
})

const { nextStep } = useSlideSteps(state)

export type AreaId = 'carbon' | 'weight' | 'kidneys' | 'heart'

type Area = {
  id: AreaId
  img: string
  isHovered?: boolean
}

const areas: Area[] = [
  { id: 'carbon', img: areaCarbon },
  { id: 'weight', img: areaWeight },
  { id: 'kidneys', img: areaKidneys },
  { id: 'heart', img: areaHeart },
]

const cards = ref<Slide9Card[]>(shuffleArray(slide9Cards))
const prompt = ref<string | null>(null)

type DragState = {
  activeId: string | null
  offsetX: number
  offsetY: number
  x: number
  y: number
  overArea: AreaId | null
}

const drag = reactive<DragState>({
  activeId: null,
  offsetX: 0,
  offsetY: 0,
  x: 0,
  y: 0,
  overArea: null,
})

function getAreaAtPoint(x: number, y: number): AreaId | null {
  const el = document.elementFromPoint(x, y) as HTMLElement | null
  const areaEl = el?.closest('.area') as HTMLElement | null
  if (!areaEl) return null
  const id = areaEl.dataset.id as AreaId | undefined
  return id ?? null
}

function setCardArea(cardId: string, areaId: AreaId | null) {
  const card = cards.value.find((c) => c.id === cardId)
  if (card) card.placedArea = areaId
}

const onPointerDown = (cardId: string, e: PointerEvent) => {
  if (!state.game) return
  const target = e.currentTarget as HTMLElement
  target.setPointerCapture?.(e.pointerId)
  const rect = target.getBoundingClientRect()
  drag.activeId = cardId
  drag.offsetX = e.clientX - rect.left
  drag.offsetY = e.clientY - rect.top
  drag.x = e.clientX
  drag.y = e.clientY
  drag.overArea = null
  sound.select.play()
}

const onPointerMove = (e: PointerEvent) => {
  if (!drag.activeId) return
  drag.x = e.clientX
  drag.y = e.clientY
  const over = getAreaAtPoint(e.clientX, e.clientY)
  drag.overArea = over
  areas.forEach((a) => {
    a.isHovered = a.id === over
  })
}

const onPointerUp = (e: PointerEvent) => {
  if (!drag.activeId) return
  const over = getAreaAtPoint(e.clientX, e.clientY)
  setCardArea(drag.activeId, over)
  areas.forEach((a) => (a.isHovered = false))
  drag.activeId = null
  drag.overArea = null
  sound.hover.play()
}

async function checkResults() {
  cards.value.forEach((card) => {
    card.error = (card.placedArea ?? null) !== card.area
    card.placedArea = null
  })
  sound.done.play()
  state.game = false
  state.gameEndText = true
  state.results = true
}

const isGameLoss = computed(() => cards.value.find((el) => el.error))

function showPrompt(cardPrompt: string) {
  if (!state.results) return
  prompt.value = cardPrompt
}

onMounted(() => {
  nextStep()
})
</script>

<template>
  <div class="slide">
    <Text
      :show="state.text"
      @click="nextStep"
      height="70"
      class="text"
    >
      Цель игры правильно распределить перетаскиванием карточки с утверждениями из левой колонки по
      4 системам организма в правой колонке. После распределения всех карточек для завершения игры
      необходимо нажать кнопку – «Проверить результат».
    </Text>

    <div class="cards">
      <div
        v-for="card in cards"
        :key="card.id"
        @click="showPrompt(card.prompt)"
        class="card-wrapper"
        :class="{
          placed: !!card.placedArea,
          dragging: drag.activeId === card.id,
          clickable: state.results,
          disabled: (!state.game && !state.results) || state.gameEndText,
        }"
        @pointerdown.stop.prevent="onPointerDown(card.id, $event)"
        @pointermove.stop.prevent="onPointerMove"
        @pointerup.stop.prevent="onPointerUp"
      >
        <Card :error="card.error">
          <span v-html="card.id" />
        </Card>
      </div>
    </div>

    <div class="areas">
      <div
        v-for="area in areas"
        :key="area.id"
        class="area"
        :data-id="area.id"
        :class="{ hovered: area.isHovered }"
      >
        <img
          :src="area.img"
          :alt="area.id"
        />
      </div>
    </div>

    <div
      v-if="drag.activeId"
      class="ghost"
      :style="{
        left: drag.x - drag.offsetX + 'px',
        top: drag.y - drag.offsetY + 'px',
      }"
    >
      <Card>
        <span v-html="drag.activeId" />
      </Card>
    </div>

    <Button
      v-if="state.game"
      class="check-result"
      @click="checkResults"
    >
      Проверить результат
    </Button>

    <Button
      v-if="state.results"
      class="check-result"
      @click="progress.changeProgress(isGameLoss ? 0 : 10, 11)"
    >
      Далее
    </Button>

    <Text
      height="50"
      class="text text-prompt"
      :show="state.gameEndText"
      @click="state.gameEndText = false"
    >
      <div>
        <div v-if="isGameLoss">У Вас есть ошибки!</div>
        <div v-else>Поздравляем! Вы победили.</div>
        Для просмотра подсказок нажмите на карточки
      </div>
    </Text>

    <Transition
      name="scale"
      :duration="{
        enter: 1000,
        leave: 0,
      }"
    >
      <Text
        v-if="prompt"
        v-on-click-outside="() => (prompt = null)"
        @click="prompt = null"
        type="prompt"
        class="prompt"
      >
        <div class="prompt-inner">
          <span v-html="prompt" />
        </div>
      </Text>
    </Transition>
  </div>
</template>

<style scoped lang="scss">
.slide {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  z-index: 250;
  user-select: none;
  touch-action: none;
}

.text {
  position: absolute;
  z-index: 300;
  top: 10%;
}

.text-prompt {
  top: 20%;
}

.cards {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1vw;
  padding: 1vw 0;
  justify-content: center;
  align-items: center;
}

.card-wrapper {
  cursor: grab;
  @media (any-hover: hover) {
    &:hover {
      filter: brightness(1.1);
    }
  }
  &.dragging {
    opacity: 0.2;
  }
  &.placed {
    opacity: 0;
    pointer-events: none;
  }
  &.clickable {
    cursor: pointer;
  }
  &.disabled {
    pointer-events: none;
  }
}

.areas {
  position: absolute;
  top: 0;
  right: 0;
  width: 15%;
  height: 100%;
  padding: 0.5vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  img {
    -webkit-user-drag: none;
  }
}

.area {
  transition: all 0.3s ease;
  width: 75%;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
  &.hovered {
    filter: brightness(1.2);
    transform: scale(1.05);
  }
}

.check-result {
  position: absolute;
  top: 1%;
  left: 0.5%;
  height: 1vw;
  font-size: 1vw;
  border-width: 0.2vw;
  border-radius: 1vw;
  padding: 1.5vw;
  max-width: 10vw;
}

.ghost {
  position: fixed;
  z-index: 1000;
  pointer-events: none;
  transform: translate(0, 0);
  width: 10vw;
}

.prompt {
  position: absolute;
  width: 60%;
  top: 10%;
  max-height: 80%;
  z-index: 300;
}

.prompt-inner {
  font-size: 1.7vw;
}
</style>
