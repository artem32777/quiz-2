<script setup lang="ts">
import Text from '@/components/text/Text.vue'
import Button from '@/components/button/Button.vue'
import { useOptions } from '@/composables/useOptions.ts'
import { useRouter } from 'vue-router'
import DescriptionModal from '@/components/description-modal/DescriptionModal.vue'

defineProps<{ show: boolean }>()

const router = useRouter()

const options: { id: string; description: string; text: string }[] = [
  {
    id: 'ОТМЕНА',
    description:
      'В зависимости от ПОАК отменяем за 1 – 2 дня до процедуры и возобновляем прием через 1 – 2 дня после.',
    text: 'При удалении ≤ 3 зубов и планируемой продолжительностью процедуры менее 45 минут продолжаем прием ПОАК риски кровотечений минимальны, но отмена препарата приведет в повышению риска тромбозов. Выберите другой вариант.',
  },
  {
    id: 'ПРОДОЛЖАЕМ ТЕРАПИЮ',
    description:
      'Продолжаем терапию ПОАК с последним приемом препарата за 4 - 10 часов до процедуры. Следующий прием антикоагулянта после процедуры в обычное время.',
    text: 'При удалении ≤ 3 зубов и планируемой продолжительностью процедуры менее 45 минут продолжаем прием ПОАК. Очередная доза ПОАК должна быть принята за 4 - 10 часов до процедуры. Обязательны местные гемостатические меры. Следующий прием антикоагулянта после процедуры в обычное время. Пример, ривароксабан 20 (15) мг вечером на кануне, утром экстракция зубов, вечером прием ривароксабана в день выполнения процедуры. Если используется ПОАК с 2х кратным приемом, то принимается обычная вечерняя доза вечером на кануне, утренний прием препарата пропускается в день удаления зубов, а вечером в день выполнения процедуры принимают обычную дозу.',
  },
  {
    id: '«МОСТ-ТЕРАПИЯ»',
    description:
      'Отменяем за 1 день до экстракции зубов с назначением НМГ. Возобновлениям прием антикоагулянтов через 24 - 36 часов после процедуры с одновременной отменой НМГ.',
    text: 'При стоматологических вмешательствах с низким риском кровотечений отмена ПОАК не предусмотрена, а следовательно «мост-терапия» не применяется. Выберите другой вариант. ',
  },
]

const { activeOption, selectOption } = useOptions(options)
</script>

<template>
  <Text
    :show="show"
    height="30"
  >
    <div class="cards">
      <div
        v-for="option in options"
        :key="option.id"
        class="card"
      >
        <Button
          @click="selectOption(option.id)"
          class="btn"
        >
          {{ option.id }}
        </Button>
        <p class="text">{{ option.description }}</p>
      </div>
    </div>
  </Text>

  <DescriptionModal
    :active-option="activeOption"
    @close="selectOption(null)"
  />

  <Button
    :show="activeOption?.id === 'ПРОДОЛЖАЕМ ТЕРАПИЮ'"
    top="85"
    @click="router.push('/final')"
  >
    Далее
  </Button>
</template>

<style scoped lang="scss">
.cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-items: center;
  height: 100%;
  gap: 1rem;
  color: #fff;
}

.card {
  padding: 20% 1vw 1vw;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  &:nth-child(2) {
    padding-top: 50%;
  }
}

.text {
  margin-top: 1vw;
  font-size: 1.3vw;
  text-align: center;
}

.btn {
  font-size: 1vw;
  position: relative;
}

.description {
  font-size: 1.3vw;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3;
}
</style>
