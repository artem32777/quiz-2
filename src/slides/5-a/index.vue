<script setup lang="ts">
import bg from '@/slides/5-a/assets/bg.avif'
import Background from '@/components/Background.vue'
import { sleep } from '@/utils/utils.ts'
import Text from '@/components/text/Text.vue'
import { useRouter } from 'vue-router'
import { onMounted, reactive } from 'vue'
import Button from '@/components/button/Button.vue'

const router = useRouter()

const state = reactive({
  history: false,
  alertBtn: false,
  alertModal: false,
  resultBtn: false,
})

onMounted(async () => {
  await sleep(1000)
  state.history = true
})
</script>

<template>
  <Background
    :src="bg"
    is-image
  />

  <Text
    :show="state.history"
    string="Через 6 месяцев: TTR составляет всего 40%. Пациент жалуется на частые визиты в поликлинику (50 км от дома), забывает сдавать анализы. МНО нестабильно, колеблется от
            1.5 до 3.8. Появились малые кровотечения - синяки, носовые кровотечения."
    top="80"
    height="7"
    @print-ended="state.alertBtn = true"
  />

  <Button
    :show="state.alertBtn"
    class="alert-btn"
    top="60"
    @click="
      async () => {
        state.history = false
        state.alertBtn = false
        await sleep(1000)
        state.alertModal = true
      }
    "
  >
    ВНИМАНИЕ
  </Button>

  <Text
    :show="state.alertModal"
    type="mission"
    string="ВНИМАНИЕ! При TTR <50% варфарин НЕ имеет преимуществ перед отсутствием антикоагуляции в отношении смертности. Низкое TTR связано с недостаточным контролем, плохой приверженностью и отдаленным проживанием пациента."
    @print-ended="state.resultBtn = true"
  />

  <Button
    :show="state.resultBtn"
    top="70"
    @click="router.push('/6')"
  >
    ОЦЕНИТЬ РЕЗУЛЬТАТ
  </Button>
</template>

<style scoped lang="scss">
.alert-btn {
  color: red;
  filter: drop-shadow(0px 0px 40px red);
  animation: shake 1s ease-in-out infinite;

  @media (any-hover: hover) {
    &:hover {
      transform: scale(1.05);
    }
  }
}

@keyframes shake {
  0% {
    filter: drop-shadow(0px 0px 20px red);
  }
  50% {
    filter: drop-shadow(0px 0px 50px red);
  }
  100% {
    filter: drop-shadow(0px 0px 20px red);
  }
}
</style>
