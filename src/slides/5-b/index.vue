<script setup lang="ts">
import bg from '@/slides/5-b/assets/bg.webp'
import Background from '@/components/Background.vue'
import { sleep } from '@/utils/utils.ts'
import Text from '@/components/text/Text.vue'
import { useRouter } from 'vue-router'
import { onMounted, reactive, watch } from 'vue'
import Button from '@/components/button/Button.vue'
import { useOptions } from '@/composables/useOptions.ts'
import DescriptionModal from '@/components/description-modal/DescriptionModal.vue'

const router = useRouter()

const state = reactive({
  buttons: false,
  backBtn: false,
})

const options: { id: string; btn: string; text: string }[] = [
  {
    id: '1',
    btn: 'Статус пациента',
    text: 'Через 6 месяцев: Пациент регулярно принимает ривароксабан 20 мг 1 раз утром. Контроль МНО не требуется. Приверженность лечению 95%. Кровотечений нет.Тромбоэмболических осложнений нет',
  },
  {
    id: '2',
    btn: 'Исследование ROCKET AF',
    text: 'Исследование ROCKET AF (n=14,264) <br> Ривароксабан не уступал варфарину в отношении профилактики инсульта [ШЕА13.1] <br> ↓ Внутричерепные кровоизлияния на 33% vs варфарин (p=0.02) <br> ↓ Фатальные кровотечения на 50% vs варфарин (p=0.003)',
  },
  {
    id: '3',
    btn: 'Оценить результат',
    text: 'Поздравляем! Отличный выбор! Ваше решение назначить ривароксабан было правильным. Благодаря однократному приему, отсутствию необходимости контроля МНО (особенно важно для пациентов из отдаленных районов) и стабильной антикоагуляции - риск инсульта снижен',
  },
]

const { selectOption, activeOption } = useOptions(options)

watch(activeOption, (newVal) => {
  state.backBtn = newVal?.id === '3'
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
      <div
        v-for="option in options"
        :key="option.id"
        class="option-button"
      >
        <Button @click="selectOption(option.id)">
          {{ option.btn }}
        </Button>
      </div>
    </div>
  </Transition>

  <DescriptionModal
    :active-option="activeOption"
    @close="selectOption(null)"
  />

  <Button
    :show="state.backBtn"
    top="60"
    @click="router.push('/7')"
  >
    ВЕРНУТЬСЯ К ПАЦИЕНТУ
  </Button>
</template>

<style scoped lang="scss">
.option-buttons {
  display: flex;
  justify-content: space-around;
  position: absolute;
  top: 77%;
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
