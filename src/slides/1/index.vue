<script setup lang="ts">
import { onMounted, reactive, watch } from 'vue'
import Text from '@/components/text/Text.vue'
import { sleep } from '@/utils/utils.ts'
import bg from '@/slides/1/assets/bg.mp4'
import { useLegendStore } from '@/stores/legend.ts'
import legendDescription from '@/slides/1/assets/legend-description.webp'
import Background from '@/components/Background.vue'
import Button from '@/components/button/Button.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const legend = useLegendStore()

const state = reactive({
  history: false,
  historyBtn: false,
  legendDescription: false,
  mission: false,
  missionBtn: false,
})

watch(
  () => legend.isLegendShow,
  async (val) => {
    if (val) {
      state.legendDescription = false
    } else {
      await sleep(1500)
      state.mission = true
    }
  },
)

onMounted(async () => {
  await sleep(1000)
  state.history = true
})
</script>

<template>
  <Background :src="bg" />

  <Text
    :show="state.history"
    top="55"
    string="Перед вами пациент 70 лет с острым ишемическим инсультом на фоне фибрилляции предсердий. Вес 87 кг. Последние 5 лет он получал различные варианты антикоагулянтной терапии, но инсульта избежать не удалось. У вас есть уникальная возможность - вернуться в прошлое пациента и изменить его терапию в ключевых точках. Сможете ли вы предотвратить эту трагедию?"
    @print-ended="state.historyBtn = true"
  />

  <Button
    :show="state.historyBtn"
    top="80"
    @click="
      async () => {
        state.historyBtn = false
        await sleep(500)
        state.history = false
        await sleep(500)
        legend.isLegendBtnShow = true
        await sleep(500)
        state.legendDescription = true
      }
    "
  >
    ДАЛЕЕ
  </Button>

  <Text
    :show="state.legendDescription"
    string="Кнопка Примечания при нажатии на которую появляется подсказка с расшифровкой аббревиатур"
    :img="legendDescription"
    top="45"
    left="8"
    width="35"
    height="20"
    class="legend-description"
  />

  <Text
    :show="state.mission"
    string="Добро пожаловать в квест «Машина времени». Ваша задача - проанализировать историю болезни пациента, изменить антикоагулянтную терапию, чтобы предотвратить инсульт."
    type="mission"
    height="25"
    @print-ended="state.missionBtn = true"
  />

  <Button
    :show="state.missionBtn"
    top="75"
    class="btn-confirm"
    @click="router.push('/2')"
  >
    Изучить пациента
  </Button>
</template>

<style scoped lang="scss">
.legend-description {
  &:deep(.card-text) {
    position: absolute;
    top: 10%;
    right: 10px;
    width: 60%;
  }
}
</style>
