<script setup lang="ts">
defineProps<{ img: string }>()
</script>

<template>
  <div class="card">
    <div class="card-text">
      <slot />
    </div>
    <img
      :src="img"
      alt="Информация"
      class="card-bg"
    />
  </div>
</template>

<style scoped lang="scss">
.card {
  position: relative;
  display: flex;
}

.card-text {
  line-height: 1.3;
  z-index: 1;
  width: 100%;
}

.card-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}
</style>
