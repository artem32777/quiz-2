<script setup lang="ts">
import bg from '@/slides/5-d/assets/bg.avif'
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
  resultBtn: false,
  nextBtn: false,
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
      <div class="option-button show">
        <Button
          @click="
            () => {
              state.result = false
              state.status = !state.status
              state.resultBtn = true
            }
          "
        >
          Статус пациента
        </Button>
      </div>

      <div
        :class="{ show: state.resultBtn }"
        class="option-button"
      >
        <Button
          @click="
            () => {
              state.result = !state.result
              state.status = false
              state.nextBtn = true
            }
          "
        >
          Оценить результат
        </Button>
      </div>

      <div
        :class="{ show: state.nextBtn }"
        class="option-button"
      >
        <Button @click="router.push('/7')"> Далее </Button>
      </div>
    </div>
  </Transition>

  <Text
    :show="state.status"
    type="medical-card"
    width="50"
    top="10"
  >
    <h3 class="title">Статус пациента</h3>
    <div class="text">
      Через 6 месяцев: Пациент принимает апиксабан 5 мг 2 раза в день. Приверженность 85%. Однако
      пациент отмечает, что 'хотелось бы меньше таблеток'. У пациента появились когнитивные
      нарушения (постинсультная деменция у жены, стресс). Приверженность снижена. Риск тромбоза
      повышен
    </div>
  </Text>

  <Text
    :show="state.result"
    type="mission"
    top="15"
  >
    <div class="text">
      ХОРОШИЙ ВЫБОР, но можно лучше! Апиксабан эффективен и безопасен, но двукратный прием может
      снижать приверженность. Низкая приверженность при двукратном приеме создает периоды
      субтерапевтической антикоагуляции и повышает риски инсульта. Особенно проблематично для
      пациентов с когнитивными нарушениями или пожилых. Рекомендация: Рассмотрите переход на ПОАК с
      однократным приемом (например, ривароксабан) для повышения приверженности.
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
  opacity: 0;
  transition: opacity 0.3s ease 0s;

  &.show {
    opacity: 1;
  }

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
