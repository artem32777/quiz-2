<script setup lang="ts">
import legendImg from '@/components/legend/assets/legend.webp'
import legendBtnImg from '@/components/legend/assets/legend-btn.webp'
import { watch } from 'vue'
import { useLegendStore } from '@/stores/legend.ts'

const store = useLegendStore()

watch(
  () => store.isLegendShow,
  (val) => {
    if (val) {
      setTimeout(() => document.addEventListener('click', store.toggleLegend), 100)
    } else {
      document.removeEventListener('click', store.toggleLegend)
    }
  },
)
</script>

<template>
  <Transition name="scale">
    <img
      v-if="store.isLegendBtnShow"
      :src="legendBtnImg"
      alt="Кнопка вызова легенды"
      class="btn"
      @click="store.toggleLegend"
    />
  </Transition>

  <Transition name="scale">
    <img
      v-if="store.isLegendShow"
      :src="legendImg"
      alt="Легенда"
      class="img"
    />
  </Transition>
</template>

<style scoped lang="scss">
.btn {
  position: absolute;
  left: 1vw;
  width: 5%;
  bottom: 1vw;
  z-index: 100;
  cursor: pointer;
  transition:
    opacity 0.6s ease,
    transform 0.6s ease,
    filter 0.3s ease;

  @media (any-hover: hover) {
    &:hover {
      filter: brightness(1.2);
    }
  }

  &:active {
    filter: brightness(0.8);
  }
}

.img {
  position: fixed;
  z-index: 50;
  cursor: pointer;
  width: 35%;
}
</style>
