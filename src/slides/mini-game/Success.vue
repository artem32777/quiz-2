<script setup lang="ts">
import Text from '@/components/text/Text.vue'
import { useRouter } from 'vue-router'
import { useOptions } from '@/composables/useOptions.ts'
import Button from '@/components/button/Button.vue'
import { useSounds } from '@/composables/useSounds.ts'

defineProps<{
  show?: boolean
}>()

const router = useRouter()

const items: { id: string; text: string }[] = [
  {
    id: 'апиксабан <br> 5 мг х 2 р/д',
    text: 'Правильная доза. Ранее забывал принимать вечернюю таблетку.',
  },
  {
    id: 'апиксабан <br> 2,5 мг х 2 р/д',
    text: 'Нет критериев для снижения до этой дозы. Ранее забывал принимать вечернюю таблетку.',
  },
  {
    id: 'ривароксабан <br> 15 мг',
    text: 'Правильная доза',
  },
  {
    id: 'дабигатран <br> 110 мг х 2 р/д',
    text: 'Нет четкого обоснования для применения такой дозы. Ранее забывал принимать вечернюю таблетку.',
  },
  {
    id: 'варфарин',
    text: 'Живет далеко (50 км от лаборатотрии). Сложности удержания МНО 2,0-3,0.',
  },
]

const { activeOption, selectOption } = useOptions(items)
const { clickSound } = useSounds()
</script>

<template>
  <Text
    :show="show"
    type="mission"
    class="success"
    top="5"
  >
    <div class="success-title">
      Поздравляем! Вы эксперт в антикоагулянтной терапии! <br />
      Выберите дальнейшую тактику ведения данного пациента 67 лет с КК: 45 мл/мин
    </div>
    <div class="success-btns">
      <div
        v-for="item in items"
        :key="item.id"
        class="succcess-btn-wrapper"
        @click="
          () => {
            selectOption(item.id)
            clickSound.play()
          }
        "
      >
        <button
          class="success-btn"
          :class="{ active: activeOption?.id === item.id }"
          v-html="item.id"
        />
        {{ item.text }}
      </div>
    </div>
  </Text>

  <Button
    :show="!!activeOption"
    top="83"
    @click="router.push('/9')"
    class="next-btn"
  >
    Продолжить
  </Button>
</template>

<style scoped lang="scss">
.success {
  z-index: 2;
}

.success-title {
  text-align: center;
  font-size: 1.3vw;
  margin-bottom: 3vw;
}

.success-btns {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 3vw;
}

.succcess-btn-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5vw;
  font-size: 1.3vw;
  max-width: 30%;
  text-align: center;
  cursor: pointer;

  @media (any-hover: hover) {
    &:hover {
      .success-btn:not(.active) {
        filter: brightness(1.3);
      }
    }
  }
}

.success-btn {
  background: url('@/slides/mini-game/assets/btn.webp') no-repeat center;
  background-size: cover;
  padding: 0.3vw;
  color: white;
  border-radius: 20px;
  transition: filter 0.3s ease;
  height: 4vw;

  &.active {
    filter: saturate(3);
  }
}

.next-btn {
  z-index: 999;
  position: absolute;
}
</style>
