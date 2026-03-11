<script setup lang="ts">
import { type QuizOption, useProgressStore } from '@/stores/progress.ts'
import { onMounted, reactive } from 'vue'
import Button from '@/components/button/Button.vue'
import Text from '@/components/text/Text.vue'
import { useSlideSteps } from '@/composables/useSlideSteps.ts'

const progress = useProgressStore()

const state = reactive({
  legend: false,
  text: false,
  btn: false,
})

const { nextStep } = useSlideSteps(state)

const options: QuizOption[] = [
  {
    id: 'ЗАМЕНИТЬ ПСМ НА СИТАГЛИПТИН',
    score: 10,
    nextSlide: 7,
  },
  {
    id: 'УБРАТЬ ПСМ',
    score: 0,
    nextSlide: 8,
  },
]

onMounted(() => {
  progress.initializeOptions(options)
  nextStep()
})
</script>

<template>
  <Text
    :show="state.legend"
    @click="nextStep"
    type="legend"
    height="60"
  >
    <div>
      единичные светящиеся
      <div class="small">β</div>
      - клетки = истощение клеток от избыточной стимуляции ПСМ; <br />
      тощая команда = последствия гипогликемии, уровень глюкозы плазмы 2.9 ммоль/л; <br />
      купирование гипогликемии.
    </div>
  </Text>
  <Text
    :show="state.text"
    @click="nextStep"
    height="70"
  >
    <div>
      Терапия препаратами сульфонилмочевины часто приводит к кризису: возникновение
      гипогликемических состояний, включая тяжёлые – уровень глюкозы плазмы менее 3,0 ммоль/л.
      Срочно меняем курс, чтобы спасти
      <div class="small">β</div>
      - клетки!
    </div>
  </Text>
  <div
    class="buttons"
    v-show="state.btn"
  >
    <Button
      v-for="option in options"
      :key="option.id"
      :show="state.btn"
      @click="progress.selectOption(option.id)"
      :class="{ selected: progress.getSelected?.id === option.id }"
    >
      {{ option.id }}
    </Button>
  </div>

  <Button
    @click="progress.confirmSelection"
    class="slide-confirm-btn"
    :show="!!progress.getSelected"
  >
    ВЫБРАТЬ
  </Button>
</template>

<style scoped lang="scss">
.buttons {
  position: absolute;
  width: 80%;
  height: 30%;
  top: 41%;
  display: flex;
  justify-content: space-between;
  button {
    font-size: 2vw;
    width: 25vw;
    height: 8vw;
    border-radius: 2vw;
  }
}

.slide-confirm-btn {
  transform: scale(0.7);
}
</style>
