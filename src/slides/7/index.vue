<script setup lang="ts">
import bg from '@/slides/7/assets/bg.mp4'
import Background from '@/components/Background.vue'
import Button from '@/components/button/Button.vue'
import Text from '@/components/text/Text.vue'
import { useRouter } from 'vue-router'
import { onMounted, reactive } from 'vue'
import { sleep } from '@/utils/utils.ts'

const router = useRouter()

const state = reactive({
  legend: false,
  timelineBtn: false,
})

onMounted(async () => {
  await sleep(1000)
  state.legend = true
})
</script>

<template>
  <Background :src="bg" />

  <Text
    :show="state.legend"
    string="Вы успешно предотвратили инсульт в 2021 году. Болезнь прогрессирует и нужно вернуться в 2023 год для анализа новых данных и предотвращения нового инсульта. <br> Нажмите на «2023»."
    top="40"
    width="50"
    @print-ended="state.timelineBtn = true"
  />

  <img
    src="@/slides/2/assets/button.webp"
    alt="Кнопка"
    @click="router.push('/4')"
    class="timeline-btn"
    :class="{ active: state.timelineBtn }"
  />
</template>

<style scoped lang="scss">
.timeline-btn {
  position: absolute;
  bottom: 22.6%;
  left: 36.6%;
  pointer-events: none;
  border-radius: 50%;
  cursor: pointer;
  transition: filter 0.3s ease 0s;

  &.active {
    pointer-events: auto;
  }

  @media (any-hover: hover) {
    &:hover {
      filter: saturate(1.8);
    }
  }
}
</style>
