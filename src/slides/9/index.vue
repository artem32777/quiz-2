<script setup lang="ts">
import bg from '@/slides/9/assets/bg.mp4'
import Background from '@/components/Background.vue'
import Text from '@/components/text/Text.vue'
import { useRouter } from 'vue-router'
import { onMounted, reactive } from 'vue'
import { sleep } from '@/utils/utils.ts'

const router = useRouter()

const state = reactive({
  history: false,
  timelineBtn: false,
})

onMounted(async () => {
  await sleep(1000)
  state.history = true
})
</script>

<template>
  <Background :src="bg" />

  <Text
    string="Вы успешно предотвратили инсульт в 2021 и 2023 годах. В 2025 году Болезнь прогрессирует и нужно вернуться в 2025 год для анализа новых данных и предотвращения нового инсульта. Нажмите на «2025»."
    top="35"
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
  bottom: 23%;
  right: 30.65%;
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
