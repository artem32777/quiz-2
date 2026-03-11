<script setup lang="ts">
import Button from '@/components/button/Button.vue'
import { onMounted, reactive } from 'vue'
import Text from '@/components/text/Text.vue'
import { sleep } from '@/utils/utils.ts'
import Background from '@/components/Background.vue'
import bg from '@/slides/3/assets/bg.webp'
import { useRouter } from 'vue-router'
import { useOptions } from '@/composables/useOptions.ts'
import DescriptionModal from '@/components/description-modal/DescriptionModal.vue'

const router = useRouter()

const state = reactive({
  history: false,
  buttons: false,
})

const options: { id: string; title: string; text: string }[] = [
  {
    id: '1',
    title: 'АНАМНЕЗ',
    text:
      '<ol><li><b>ФП</b> диагностирована 5 лет назад (пароксизмальная форма)></li>' +
      '<li><b>АГ</b> 2 степени, достигнут целевой уровень АД на терапии</li>' +
      '<li><b>ХСН</b> 2 ФК (ФВ ЛЖ 45%)</li>' +
      '<li><b>Сахарный диабет</b> 2 типа, компенсирован (HbA1c 6.8%)</li>' +
      '<li>Без инсульта/ТИА в анамнезе до настоящего поступления</li>' +
      '<li>Женат, живет в отдаленном районе (50 км от поликлиники)</li>' +
      '<li>Работает водителем автобуса (на пенсии последние 2 года)</li>' +
      '</ol>',
  },
  {
    id: '2',
    title: 'Шкала CHA₂DS₂-VASc',
    text:
      '<ol><li>C (ХСН): 1 балл</li>' +
      '<li>H (АГ): 1 балл</li>' +
      '<li>A (возраст 65-74): 1 балл</li>' +
      '<li>D (СД): 1 балл</li>' +
      '<li>Сумма до поступления: <b>4 балла</b></li>' +
      '</ol>',
  },
  {
    id: '3',
    title: 'ТЕРАПИЯ',
    text:
      '<h3>До поступления с инсультом:</h3>' +
      '<ol><li>Варфарин 2.5 мг/день (нерегулярный контроль МНО, TTR <40%)</li>' +
      '<li>Бисопролол 5 мг/сутки</li>' +
      '<li>Периндоприл 5 мг/сутки</li>' +
      '<li>Метформин 1000 мг × 2 раза/день</li>' +
      '</ol>',
  },
]

const { selectOption, activeOption } = useOptions(options)

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
    string="Пациент: И., 70 лет <br />Диагноз при поступлении: Ишемический инсульт <br />(правосторонний гемипарез средней степени тяжести, афазия)"
    top="2"
    height="10"
    @print-ended="
      async () => {
        state.buttons = true
        await sleep(1000)
      }
    "
  />

  <Transition name="scale">
    <div
      v-if="state.buttons"
      class="option-buttons"
    >
      <div
        v-for="option in options"
        :key="option.id"
        class="option-button"
      >
        <Button
          :selected="activeOption?.id === option.id"
          @click="selectOption(option.id)"
        >
          {{ option.title }}
        </Button>
      </div>
    </div>
  </Transition>

  <DescriptionModal
    :active-option="activeOption"
    @close="selectOption(null)"
  />

  <Button
    :show="!!activeOption"
    top="75"
    @click="router.push('/5')"
  >
    НАЧАТЬ ПУТЕШЕСТВИЕ
  </Button>
</template>

<style scoped lang="scss">
.option-buttons {
  display: flex;
  justify-content: space-around;
  position: absolute;
  top: 25%;
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

  &:nth-child(3) {
    filter: hue-rotate(180deg);
  }

  .button {
    position: relative;
  }
}
</style>
