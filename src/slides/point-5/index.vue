<script setup lang="ts">
import bg from '@/slides/point-5/assets/bg.avif'
import Background from '@/components/Background.vue'
import { useRouter } from 'vue-router'
import { onMounted, reactive } from 'vue'
import warfarin from '@/slides/5/assets/drug-3.webp'
import rivaroxaban from '@/slides/5/assets/drug-1.webp'
import dabigatran from '@/slides/5/assets/drug-2.webp'
import apixaban from '@/slides/5/assets/drug-4.webp'
import { sleep } from '@/utils/utils.ts'
import Text from '@/components/text/Text.vue'
import Button from '@/components/button/Button.vue'
import Choise from '@/slides/point-5/Choise.vue'

const state = reactive({
  robot: false,
  history: false,
  historyBtn: false,
  rules: false,
  choice: false,
})

onMounted(async () => {
  await sleep(1000)
  state.robot = true
  await sleep(1000)
  state.history = true
})
</script>

<template>
  <Background :src="bg" />

  <Transition name="left">
    <img
      v-if="state.robot"
      src="@/slides/point-5/assets/robot.webp"
      alt="robot"
      class="robot"
    />
  </Transition>

  <Text
    :show="state.history"
    string="2026 год. Пациенту предстояло удаление 2х зубов для последующего протезирования. К участковому терапевту не обратился, так как до него ехать 50 км. Пациент сам решил за 2 дня до удаления зубов перестать принимать антикоагулянты, чтобы не было кровотечения из места удаления зубов. Возобновить их прием через 2 – 3 дня, когда раны подзаживут. Удаление зубов продлилось 25 минут и прошло без осложнений. Через день после экстракции зубов появились нарушения речи, слабость в левой руке. Выберите тактику ведения пациента перед описанным стоматологическим вмешательством нажатием кнопки «Далее»."
    top="5"
    left="45"
    width="50"
    @print-ended="state.historyBtn = true"
    class="history"
  />

  <Button
    :show="state.historyBtn"
    top="85"
    left="80"
    @click="
      async () => {
        state.historyBtn = false
        await sleep(500)
        state.robot = false
        await sleep(500)
        state.history = false
        state.rules = true
      }
    "
  >
    Далее
  </Button>

  <Text
    :show="state.rules"
    string="Условия игры: Выберите тактику антикоагулянтной терапии для пациента непосредственно перед и сразу после экстракции 2 зубов (длительность планируемой процедуры около 25 минут, без ушивания десны, без осложнений)."
    top="3"
    height="4"
    @print-ended="state.choice = true"
  />

  <Choise :show="state.choice" />
</template>

<style scoped lang="scss">
.robot {
  position: absolute;
  left: 3vw;
  bottom: 0;
  width: 30vw;
}

.history {
  :deep(.text) {
    font-size: 1.7vw;
  }
}

.wrapper {
  padding: 3vw !important;
}
</style>
