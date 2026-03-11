<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import { useProgressStore } from '@/stores/progress.ts'
import Text from '@/components/text/Text.vue'
import { useSlideSteps } from '@/composables/useSlideSteps.ts'

const progress = useProgressStore()

const state = reactive({
  text: false,
})

const { nextStep } = useSlideSteps(state)

onMounted(() => {
  nextStep()
})
</script>

<template>
  <Text
    :show="state.text"
    @click="progress.changeProgress(0, '9-game')"
    height="70"
    class="text"
  >
    каждый сектор – это положительный клинико лабораторный эффект МФ+Ситаглиптина. Комбинация
    формирует кардио ренальные щиты: снижает давление, воспаление, массу тела и сохраняет функцию
    почек.
  </Text>
</template>

<style scoped lang="scss">
.text {
  position: absolute;
  top: 5%;
}

.btn-confirm {
  font-size: 3.3vw;
  position: absolute;
  bottom: 5%;
}
</style>
