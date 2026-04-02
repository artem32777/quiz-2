<script setup lang="ts">
import { computed, onMounted } from 'vue'
import Text from '@/components/text/Text.vue'
import { useOptions } from '@/composables/useOptions.ts'
import closeBtnBg from '@/components/description-modal/assets/close-btn-bg.webp'

defineProps<{
  show?: boolean
}>()

const emit = defineEmits<{ (e: 'close'): void }>()

const items: { id: string; text: string }[] = [
  {
    id: 'Ривароксабан',
    text: 'снижение дозы до 15 мг в сутки происходит на основании сниженной функции почек 15 - 49 мл/мин. Соблюдения никаких других дополнительных условий не требуется. Нашему пациенту показана доза 15 мг 1 раз в сутки, так как КК 45 мл/ мин.',
  },
  {
    id: 'Апиксабан',
    text: 'снижение дозы до 2,5 мг 2 раза в сутки (т.е. 5 мг в сутки) происходит при наличии сочетания двух или более из следующих характеристик – возраст 80 лет и старше, масса тела 60 кг и менее или концентрация креатинина в плазме крови ≥ 1,5 мг/дл (133 мкмоль/л). Нашему пациенту показана доза по 5 мг 2 раз в сутки, так как есть единственный критерий - концентрация креатинина в плазме крови 155 мкмоль/л, но отсутствуют другие критерии снижения.',
  },
  {
    id: 'Дабигатран',
    text: 'снижение дозы до 110 мг 2 раза в сутки (т.е. 220 мг в сутки) может быть рекомендовано пациентам старше 80 лет или принимающим верапамил. По усмотрению врача дозу можно снизить пациентам 75 – 80 лет, при снижении функции почек (КК 30-50 мл/мин), при наличии эзофагита, гастрита или гастроэзофагеальной рефлюксной болезни. ',
  },
]

const { activeOption, selectOption } = useOptions(items)

const currentIndex = computed(() => items.findIndex((item) => item.id === activeOption.value?.id))

const nextItem = () => {
  const nextIndex = (currentIndex.value + 1) % items.length
  selectOption(items[nextIndex]!.id)
}

const prevItem = () => {
  const prevIndex = (currentIndex.value - 1 + items.length) % items.length
  selectOption(items[prevIndex]!.id)
}

onMounted(() => {
  selectOption(items[0]!.id)
})
</script>

<template>
  <Text
    :show="show"
    type="mission"
    width="50"
    height="30"
    class="fail"
  >
    <img
      src="@/slides/mini-game/assets/arrow.webp"
      alt="Предыдущий препарат"
      class="arrow prev"
      @click="prevItem"
    />
    <h3 class="title">{{ activeOption?.id }}</h3>
    <div class="text">{{ activeOption?.text }}</div>
    <img
      src="@/slides/mini-game/assets/arrow.webp"
      alt="Следующий препарат"
      class="arrow next"
      @click="nextItem"
    />

    <img
      :src="closeBtnBg"
      alt="Кнопка закрытия"
      class="close-btn"
      @click="emit('close')"
    />
  </Text>
</template>

<style scoped lang="scss">
.fail {
  z-index: 2;

  :deep(.card-bg) {
    filter: hue-rotate(250deg);
  }
}

.title {
  font-size: 1.5vw;
  margin-bottom: 1vw;
}

.text {
  font-size: 1.2vw;
}

.arrow {
  position: absolute;
  right: 100%;
  top: 50%;
  cursor: pointer;
  transition: all 0.3s ease 0s;

  @media (any-hover: hover) {
    &:hover {
      filter: brightness(1.2);
    }
  }
}

.prev {
  transform: translateY(-50%) rotate(180deg);
}

.next {
  transform: rotate(0deg) translateY(-50%);
  left: 100%;
}

.close-btn {
  position: absolute;
  top: -1vw;
  right: -1vw;
  height: 5vw;
  cursor: pointer;
  transition: filter 0.3s ease 0s;

  @media (any-hover: hover) {
    &:hover {
      filter: brightness(1.2);
    }
  }

  &:active {
    filter: brightness(0.8);
  }
}
</style>
