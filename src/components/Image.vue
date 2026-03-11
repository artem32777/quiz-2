<script setup lang="ts">
const { imgSrc, isVisible = false } = defineProps<{
  imgSrc: string
  isVisible?: boolean
}>()
</script>

<template>
  <img
    :src="imgSrc"
    alt="image"
    class="slide-image"
    :class="{ show: isVisible }"
  />
</template>

<style scoped lang="scss">
.slide-image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  margin: auto;
  opacity: 0;
  pointer-events: none;
  transform: scale(0.9);
  transition: all 1s ease 0s;
  &.show {
    transform: scale(1);
    opacity: 1;
    pointer-events: auto;
  }
}
</style>
