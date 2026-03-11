<script setup lang="ts">
import { useProgressStore } from '@/stores/progress.ts'
import { onMounted, reactive } from 'vue'
import Button from '@/components/button/Button.vue'
import Text from '@/components/text/Text.vue'
import { useSlideSteps } from '@/composables/useSlideSteps.ts'

const progress = useProgressStore()

const state = reactive({
  text: false,
  rank: false,
  btn: false,
})

const { nextStep } = useSlideSteps(state)

const gameRank = () => {
  const { score } = progress
  return score >= 35
    ? 'Хранитель <div class="small">β</div>-клеток'
    : score >= 25
      ? 'Страж инкретинов'
      : score >= 15
        ? 'Защитник метаболизма'
        : 'Исследователь в поисках'
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
      height="85"
    >
      <div>
        Поздравляем Вас! <br />
        Вы успешно привели «корабль» в порт «Успех». Вместе с комбинацией ситаглиптин и метформин
        достигли у пациента целевых значений гликированного гемоглобина, снизили массу тела с
        высокой приверженностью к терапии. Вы одержали Победу <br />
        в битве за
        <div class="small">β</div>
        -клетки!
      </div>
    </Text>
    <Text
      :show="state.rank"
      @click="nextStep"
      type="legend"
      height="20"
    >
      <div>Ваш ранг: "<span v-html="gameRank()" />"</div>
    </Text>
    <div class="buttons">
      <Button
        :show="state.btn"
        @click="progress.finishQuiz"
      >
        ЗАВЕРШИТЬ
      </Button>
      <Button
        :show="state.btn"
        @click="progress.finishQuiz"
      >
        НАЧАТЬ КВЕСТ <br />
        ЗАНОВО
      </Button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.slide {
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 250;
  display: flex;
  align-items: center;
  justify-content: center;
}
.buttons {
  position: absolute;
  width: 100%;
  top: 35%;

  button {
    height: 7vw;
    width: 20vw;
    border-radius: 2vw;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5vw;
    position: absolute;

    &:nth-child(1) {
      left: 10%;
    }
    &:nth-child(2) {
      right: 10%;
    }
  }
}
</style>
