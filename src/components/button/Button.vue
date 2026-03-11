<script setup lang="ts">
import { useSounds } from '@/composables/useSounds.ts'
import buttonBg from '@/components/button/button-bg.webp'

const {
  show = true,
  top = '50%',
  left = '50%',
} = defineProps<{
  show?: boolean
  selected?: boolean
  top?: number | string
  left?: number | string
}>()

const { clickSound } = useSounds()
</script>

<template>
  <Transition name="scale">
    <button
      v-if="show"
      class="button"
      :style="{
        top: top + '%',
        left: left + '%',
      }"
      @click="clickSound.play()"
    >
      <slot />
      <img
        :src="buttonBg"
        alt="Фон кнопки"
        class="button-bg"
        :class="{ selected: selected }"
      />
    </button>
  </Transition>
</template>

<style scoped lang="scss">
.button {
  box-shadow: 0.5vw 0.5vw 0.5vw rgba(0, 0, 0, 0.55);
  border-radius: 30px;
  font-size: 60px;
  padding: 40px 70px;
  position: absolute;
  z-index: 30;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #5151ae;
  font-weight: 600;
  transition: all 0.3s ease 0s;
  white-space: nowrap;

  @media (any-hover: hover) {
    &:hover {
      filter: brightness(1.3);
    }
  }

  &:active {
    filter: brightness(1.1);
  }
}

.button-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  transition: filter 0.3s ease 0s;

  &.selected {
    filter: drop-shadow(0 0 20px white);
  }
}
</style>
