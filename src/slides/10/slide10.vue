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
    id: '1',
    score: 5,
    nextSlide: 9,
  },
  {
    id: '2',
    score: 10,
    nextSlide: 9,
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
    height="30"
  >
    туман = урогенитальные инфекции; <br />
    стрелки = варианты управления терапией
  </Text>

  <Text
    :show="state.text"
    @click="nextStep"
    height="40"
  >
    При добавлении иНГЛТ-2 появляется риск урогенитальных инфекций. Изменить или сохранить курс?
  </Text>

  <div
    v-if="state.btn"
    class="buttons"
  >
    <button
      v-for="option in options"
      :key="option.id"
      @click="progress.selectOption(option.id)"
      :class="{ selected: progress.getSelected?.id === option.id }"
    />
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
  button {
    position: absolute;
    bottom: 15%;
    width: 19%;
    z-index: 2;
    height: 45%;
    &.selected {
      &::before {
        backdrop-filter: hue-rotate(10deg) brightness(1.5);
      }
    }

    &::before {
      content: '';
      width: 79%;
      height: 32%;
      bottom: 4%;
      position: absolute;
      transition: backdrop-filter 0.3s ease 0s;
      border-radius: 20px;
    }

    &:nth-child(1) {
      left: 16%;
      &::before {
        left: 9%;
      }
    }
    &:nth-child(2) {
      right: 19%;
      &::before {
        width: 83%;
        left: 7%;
      }
    }

    @media (any-hover: hover) {
      &:hover {
        &::before {
          backdrop-filter: hue-rotate(10deg) brightness(1.5);
        }
      }
    }
  }
}

.slide-confirm-btn {
  position: absolute;
  padding: 2vw;
  border-radius: 1vw;
  border-width: 0.4vw;
  font-size: 2vw;
  bottom: 16%;
  right: 45%;
}
</style>
