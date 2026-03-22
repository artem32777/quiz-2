<script setup lang="ts">
import bg from '@/slides/point-4/assets/bg.avif'
import Background from '@/components/Background.vue'
import { onMounted, reactive } from 'vue'
import { sleep } from '@/utils/utils.ts'
import Text from '@/components/text/Text.vue'
import Button from '@/components/button/Button.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const state = reactive({
  calendar: false,
  robot: false,
  history: false,
  historyBtn: false,
  rules: false,
  choice: false,
})

onMounted(async () => {
  await sleep(1000)
  state.calendar = true
  await sleep(1000)
  state.robot = true
  await sleep(1000)
  state.history = true
})
</script>

<template>
  <Background :src="bg" />

  <Transition name="fade">
    <img
      v-if="state.calendar"
      src="@/slides/point-4/assets/calendar.webp"
      alt="calendar"
      class="calendar"
    />
  </Transition>

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
    string="2023 год. При плановом обследовании выявлено снижение функции почек: КК 45 мл/ мин (ХБП 3а стадия). Пациент на апиксабане 5 мг 2 раза в день. Требуется коррекция антикоагулянтной терапии с учетом почечной дисфункции. Пациент жалуется на диспепсию и желание «принимать меньше таблеток». Давайте разберем критерии снижения доз ПОАК. Нажмите кнопку «Далее»."
    top="60"
    @print-ended="state.historyBtn = true"
    class="history"
  />

  <Button
    :show="state.historyBtn"
    top="85"
    left="80"
    @click="router.push('/mini-game')"
  >
    Далее
  </Button>
</template>

<style scoped lang="scss">
.calendar {
  position: absolute;
  right: 5%;
  top: 3%;
  width: 30vw;
}

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
</style>
