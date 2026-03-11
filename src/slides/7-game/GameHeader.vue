<script setup lang="ts">
import Button from '@/components/button/Button.vue'
import { onUnmounted, ref, watch } from 'vue'
import PromptWarning from '@/slides/7-game/PromptWarning.vue'

const { isGameStarted } = defineProps<{
  isGameStarted: boolean
}>()

const emit = defineEmits<{
  loss: [void]
}>()

const TIMER_SECONDS = 60
const PROMPT_SECONDS = 10

const timer = ref(TIMER_SECONDS)
let timerInterval: number | null = null

const isPromptBtnVisible = ref(true)
const isWarningOpen = ref(false)
const isPromptOpen = ref(false)

const startTimer = () => {
  timer.value = TIMER_SECONDS
  if (timerInterval) {
    clearInterval(timerInterval)
  }

  timerInterval = setInterval(() => {
    timer.value--
  }, 1000)
}

const stopTimer = () => {
  if (timerInterval) {
    clearInterval(timerInterval)
    timerInterval = null
  }
}

const openPrompt = () => {
  isWarningOpen.value = false
  isPromptOpen.value = true
  timer.value = Math.max(0, timer.value - PROMPT_SECONDS)
}

watch(
  () => isGameStarted,
  (val) => {
    if (val) {
      isPromptBtnVisible.value = true
      startTimer()
    } else {
      stopTimer()
    }
  },
)

watch(timer, (seconds) => {
  if (seconds <= PROMPT_SECONDS) {
    isWarningOpen.value = false
    isPromptOpen.value = false
    isPromptBtnVisible.value = false
  }

  if (seconds <= 0) {
    emit('loss')
  }
})

onUnmounted(() => {
  stopTimer()
})
</script>

<template>
  <div class="header-container">
    <div class="header">
      <Button class="btn timer">Таймер: {{ timer }}</Button>
      <img
        src="./img/header.webp"
        class="header-img"
        alt="Информация"
      />
      <Button
        v-if="isPromptBtnVisible"
        @click="isWarningOpen = !isWarningOpen"
        class="btn"
      >
        Подсказка
      </Button>
    </div>

    <PromptWarning
      :show="isWarningOpen"
      @accept="openPrompt"
      @decline="isWarningOpen = false"
    />

    <Transition name="scale">
      <div
        v-show="isPromptOpen"
        class="prompt"
      >
        <img
          src="./img/prompt.webp"
          alt="Подсказка"
        />
        <Button
          @click="isPromptOpen = false"
          class="prompt-close-btn"
        >
          Закрыть
        </Button>
      </div>
    </Transition>
  </div>
</template>

<style scoped lang="scss">
.header-container {
  width: 100%;
  height: 100%;
}

.header {
  position: absolute;
  inset: 1% 1%;
  height: 20%;
  display: flex;
  justify-content: space-between;
  z-index: 1;

  .btn {
    top: 15%;
    height: 40%;
    width: 13%;
    font-size: 1.3vw;
    border-width: 0.3vw;
    border-radius: 1.5vw;
    padding: 2vw;
  }
}

.header-img {
  position: absolute;
  width: 100%;
  height: 100%;
}
.timer {
  pointer-events: none;
}

.prompt {
  position: absolute;
  inset: 1% 1%;
  display: flex;
  align-items: center;
  flex-direction: column;
  z-index: 3;

  img {
    width: 100%;
    height: 100%;
  }
}

.prompt-close-btn {
  position: absolute;
  bottom: 1%;
}
</style>
