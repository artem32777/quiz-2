<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import Text from '@/components/text/Text.vue'
import { sleep } from '@/utils/utils.ts'
import Background from '@/components/Background.vue'
import bg from '@/slides/2/assets/bg.mp4'
import { useRouter } from 'vue-router'

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
    :show="state.history"
    string="Мы отправляемся с Вами в 2021 год, когда поставили диагноз ФП. Измените тактику ведения пациента, чтобы предотвратить инсульт. <br> Нажмите на «2021»"
    top="40"
    width="50"
    @print-ended="
      async () => {
        await sleep(1000)
        state.timelineBtn = true
      }
    "
  />

  <button
    @click="router.push('/3')"
    class="timeline-btn"
    :class="{ active: state.timelineBtn }"
  />
</template>

<style scoped lang="scss">
.timeline-btn {
  position: absolute;
  bottom: 11%;
  left: 6%;
  width: 15vw;
  height: 15vw;
  pointer-events: none;
  border-radius: 50%;

  &.active {
    pointer-events: auto;
  }

  @media (any-hover: hover) {
    &:hover {
      backdrop-filter: saturate(3);
    }
  }
}
</style>
