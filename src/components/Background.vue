<script setup lang="ts">
defineProps<{
  src: string
  isImage?: boolean
}>()
</script>

<template>
  <video
    v-if="!isImage"
    loop
    autoplay
    muted
    class="video"
    :src="src"
    type="video/mp4"
  />

  <img
    v-else
    :src="src"
    class="video"
    alt="Фон"
  />
</template>

<style scoped lang="scss">
.video {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  object-fit: fill;
}
</style>
