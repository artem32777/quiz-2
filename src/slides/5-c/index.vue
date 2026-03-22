<script setup lang="ts">
import bg from '@/slides/5-c/assets/bg.avif'
import Background from '@/components/Background.vue'
import { sleep } from '@/utils/utils.ts'
import { useRouter } from 'vue-router'
import { onMounted, reactive } from 'vue'
import Button from '@/components/button/Button.vue'
import Text from '@/components/text/Text.vue'

const router = useRouter()

const state = reactive({
  buttons: false,
  status: false,
  result: false,
})

onMounted(async () => {
  await sleep(1000)
  state.buttons = true
})
</script>

<template>
  <Background
    :src="bg"
    is-image
  />

  <Transition name="scale">
    <div
      v-if="state.buttons"
      class="option-buttons"
    >
      <div class="option-button">
        <Button
          @click="
            () => {
              state.result = false
              state.status = !state.status
            }
          "
        >
          Статус пациента
        </Button>
      </div>
      <div class="option-button">
        <Button
          @click="
            () => {
              state.result = !state.result
              state.status = false
            }
          "
        >
          Оценить результат
        </Button>
      </div>
      <div class="option-button">
        <Button @click="router.push('/7')">Далее</Button>
      </div>
    </div>
  </Transition>

  <Text
    :show="state.status"
    type="medical-card"
    width="50"
  >
    <h3 class="title">Статус пациента</h3>
    <div class="text">
      Через 6 месяцев: Пациент регулярно принимает утреннюю дозу, но часто забывает вечернюю
      (пропускает 30% вечерних доз). У пациента появились когнитивные нарушения (постинсультная
      деменция у жены, стресс). Приверженность снижена. Риск тромбоза повышен.
    </div>
  </Text>

  <Text
    :show="state.result"
    type="mission"
  >
    <div class="text">
      ВНИМАНИЕ! Низкая приверженность при двукратном приеме создает периоды субтерапевтической
      антикоагуляции и повышает риски инсульта. Особенно проблематично для пациентов с когнитивными
      нарушениями или пожилых.<br />
      <br />
      Рекомендация: Рассмотрите переход на ПОАК с однократным приемом (например, ривароксабан) для
      повышения приверженности.
    </div>
  </Text>
</template>

<style scoped lang="scss">
.option-buttons {
  display: flex;
  position: absolute;
  justify-content: space-around;
  top: 85%;
  left: 0;
  width: 100%;
}

.option-button {
  &:nth-child(1) {
    filter: hue-rotate(250deg);
  }

  &:nth-child(2) {
    filter: hue-rotate(310deg);
  }

  .button {
    position: relative;
  }
}

.title {
  font-size: 2vw;
  margin-bottom: 1vw;
  text-align: center;
}

.text {
  font-size: 1.7vw;
}

.result {
  :deep(.text) {
    font-size: 1.7vw;
  }
}
</style>
