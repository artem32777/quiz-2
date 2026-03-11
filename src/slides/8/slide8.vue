<script setup lang="ts">
import { type QuizOption, useProgressStore } from '@/stores/progress.ts'
import { onMounted, reactive } from 'vue'
import Button from '@/components/button/Button.vue'
import Text from '@/components/text/Text.vue'
import { useSlideSteps } from '@/composables/useSlideSteps.ts'

const progress = useProgressStore()

const state = reactive({
  legend: false,
  textLeft: false,
  textRight: false,
  text: false,
  btn: false,
})

const { nextStep } = useSlideSteps(state)

const options: QuizOption[] = [
  {
    id: 'МЕТФОРМИН + СИТАГЛИПТИН',
    score: 10,
    nextSlide: 7,
  },
  {
    id: 'МЕТФОРМИН + ИНГЛТ-2',
    score: 5,
    nextSlide: 10,
  },
  {
    id: 'ПСМ',
    score: 0,
    nextSlide: 12,
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
    <div>
      заполненность трюма = <br />
      результат монотерапии метформином; <br />
      вода = прогрессирующая дисфункция <br />
      <p class="small">β</p>
      - клеток.
    </div>
  </Text>
  <div
    @click="nextStep"
    class="bg-text text-left"
    :class="{ show: state.textLeft }"
  >
    Монотерапия метформином с трудом удерживает судно на плаву, но
    <p class="small">β</p>
    - клетки продолжают погибать. Как спасти команду?!?
  </div>
  <p
    @click="nextStep"
    class="bg-text text-right"
    :class="{ show: state.textRight }"
  >
    Комбинация метформина и ситаглиптина «высушила бы трюм» и сбалансировала бы корабль.
  </p>

  <Text
    :show="state.text"
    @click="nextStep"
    height="50"
    class="text"
  >
    Мы видим результаты двух тактик лечения. Вам необходимо выбрать: <br />
    «Что делать дальше?»
  </Text>

  <div class="buttons">
    <Button
      v-for="option in options"
      :key="option.id"
      :show="state.btn"
      :selected="progress.getSelected?.id === option.id"
      @click="progress.selectOption(option.id)"
      class="slide-btn"
    >
      {{ option.id }}
    </Button>
  </div>

  <Button
    @click="progress.confirmSelection"
    :show="!!progress.getSelected"
    class="slide-confirm-btn"
  >
    ВЫБРАТЬ
  </Button>
</template>

<style scoped lang="scss">
.bg-text {
  position: absolute;
  width: 30%;
  height: 30%;
  opacity: 0;
  transition: all 1s ease 0s;
  color: white;
  font-size: 2vw;
  font-weight: 500;
  text-transform: uppercase;
  text-align: center;
  line-height: 1.2;
  cursor: pointer;
  &.show {
    opacity: 1;
    transform: translate(0px, 0px);
  }

  @media (any-hover: hover) {
    &:hover {
      filter: drop-shadow(0.5vw 0.5vw 0.5vw rgba(0, 0, 0, 1));
      transform: translateY(-5px);
    }
  }
  &:active {
    filter: drop-shadow(0.5vw 0.5vw 0.5vw rgba(0, 0, 0, 1));
    transform: translateY(-5px);
  }
}

.text-left {
  left: 10%;
  bottom: 7%;
  transform: translate(0px, 10px);
}

.text-right {
  right: 10%;
  top: 10%;
  transform: translate(0px, -10px);
}

.text {
  position: absolute;
  top: 7%;
  width: 80%;
}

.buttons {
  position: absolute;
  bottom: 5%;
  display: grid;
  grid-template-columns: repeat(3, 25vw);
  justify-content: center;
  column-gap: 3vw;
}

.slide-btn {
  font-size: 2.3vw;
}

.slide-confirm-btn {
  top: 5%;
  font-size: 3vw;
}
</style>
