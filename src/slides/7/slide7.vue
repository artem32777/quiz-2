<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import { useProgressStore } from '@/stores/progress.ts'
import Button from '@/components/button/Button.vue'
import Text from '@/components/text/Text.vue'
import { useSlideSteps } from '@/composables/useSlideSteps.ts'

const progress = useProgressStore()
const state = reactive({
  text: false,
  btn: false,
})
const { nextStep } = useSlideSteps(state)

onMounted(() => {
  nextStep()
})
</script>

<template>
  <Text
    :show="state.text"
    @click="nextStep"
    height="70"
    class="text"
  >
    <div>
      Отлично! Комбинация метформина и ситаглиптина запускает мощный двигатель, который повышает
      глюкагоноподобный пептид-1, снижает апоптоз
      <div class="small">β</div>
      - клеток и постпрандиальную гликемию. Закрепи успех сыграв в <br />
      мини-игру
    </div>
  </Text>
  <Button
    @click="progress.changeProgress(0, '7-game')"
    class="btn-confirm"
    :show="state.btn"
  >
    НАЧАТЬ ИГРУ <br />
    ИНКРЕТИНОВЫЙ ПАЗЛ
  </Button>
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
