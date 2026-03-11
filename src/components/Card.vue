<script setup lang="ts">
defineProps<{ error?: boolean }>()
</script>

<template>
  <div
    class="card"
    :class="{
      error: error,
    }"
  >
    <div class="inner">
      <slot />
    </div>
  </div>
</template>

<style scoped lang="scss">
.card {
  width: 10vw;
  height: 10vw;
  padding: 0.5vw;
  background-color: #00b39d;
  &.error {
    background-color: #ffb39d;
    .inner {
      background-color: #ffd9d6;
      color: #ff0101;
    }
  }
}

.inner {
  border-radius: 1vw;
  width: 100%;
  height: 100%;
  background-color: #9bd9d6;
  color: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1vw;
  text-align: center;
  text-wrap: pretty;
  overflow-wrap: break-word;
  word-break: normal;
  text-transform: uppercase;
  font-weight: 500;
}
</style>
