<script setup lang="ts">
import bg from '@/slides/final/assets/bg.webp'
import Background from '@/components/Background.vue'
import Text from '@/components/text/Text.vue'
import { onMounted, reactive } from 'vue'
import { sleep } from '@/utils/utils.ts'
import Button from '@/components/button/Button.vue'

const state = reactive({
  robotAndMan: false,
  history: false,
  resultBtn: false,
  result: false,
  robotAndManNew: false,
})

onMounted(async () => {
  await sleep(500)
  state.robotAndMan = true
  await sleep(1000)
  state.history = true
})
</script>

<template>
  <Background
    :src="bg"
    is-image
  />

  <Transition name="left">
    <img
      v-if="state.robotAndMan"
      src="@/slides/final/assets/robot-1.webp"
      alt="Вертер"
      class="robot-man robot"
    />
  </Transition>

  <Transition name="right">
    <img
      v-if="state.robotAndMan"
      src="@/slides/final/assets/man-1.webp"
      alt="Пациент"
      class="robot-man man"
    />
  </Transition>

  <Text
    :show="state.history"
    width="40"
    top="15"
    string="При переходе на ривароксабан решил
            проблему недоступности контроля МНО.
            Больше не нужно ездить 50 км для
            контроля МНО. Пациент в восторге!
            Однократный прием утром - легко.
            Приверженность 95%. Антикоагуляция
            стабильна.<br>
            Риск инсульта минимизирован."
    @print-ended="state.resultBtn = true"
  />

  <Button
    :show="state.resultBtn"
    top="50"
    @click="
      async () => {
        state.resultBtn = false
        await sleep(500)
        state.history = false
        await sleep(500)
        state.robotAndMan = false
        await sleep(500)
        state.result = true
        await sleep(500)
        state.robotAndManNew = true
      }
    "
  >
    Итоги
  </Button>

  <Transition name="fade">
    <img
      v-if="state.result"
      src="@/slides/final/assets/result.avif"
      alt="Результат"
      class="result"
    />
  </Transition>

  <Transition name="left">
    <img
      v-if="state.robotAndManNew"
      src="@/slides/final/assets/robot-2.webp"
      alt="Вертер"
      class="robot-man robot-new"
    />
  </Transition>

  <Transition name="right">
    <img
      v-if="state.robotAndManNew"
      src="@/slides/final/assets/man-2.webp"
      alt="Пациент"
      class="robot-man man-new"
    />
  </Transition>
</template>

<style scoped lang="scss">
.robot-man {
  position: absolute;
  bottom: 0;
  filter: drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.5));
}

.robot {
  left: 0;
  width: 40vw;
}

.man {
  right: 7%;
  width: 27vw;
}

.robot-new {
  left: -6%;
  width: 40vw;
}

.man-new {
  right: 3%;
  width: 27vw;
}

.result {
  position: absolute;
  width: 50%;
  filter: drop-shadow(5px 5px 10px rgba(0, 0, 0, 0.7));
}
</style>
