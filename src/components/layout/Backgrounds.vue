<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isFirstVideoLoaded = ref(false)

const activeSlide = computed(() => {
  const raw = route.name ?? route.path
  const num = Number.parseInt(String(raw).replace('/', ''), 10)
  return Number.isFinite(num) ? num : null
})

const handleFirstVideoLoaded = () => {
  isFirstVideoLoaded.value = true
}
</script>

<template>
  <div class="background-container">
    <video
      :key="1"
      loop
      autoplay
      muted
      class="video"
      :class="{ active: activeSlide === 1 }"
      preload="auto"
      :src="`/slides/1/bg.mp4`"
      type="video/mp4"
      @loadeddata="handleFirstVideoLoaded"
    />
    <template v-if="isFirstVideoLoaded">
      <video
        v-for="item in 11"
        :key="`bg-${item + 1}`"
        loop
        autoplay
        muted
        class="video"
        :class="{ active: item + 1 === activeSlide }"
        preload="auto"
        :src="`/slides/${item + 1}/bg.mp4`"
        type="video/mp4"
      />
    </template>
  </div>
</template>

<style scoped lang="scss">
.background-container {
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: -1;
}

.video {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  object-fit: fill;
  opacity: 0;

  &.active {
    opacity: 1;
  }
}
</style>
