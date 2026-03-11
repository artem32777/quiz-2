<script setup lang="ts">
import { useProgressStore } from '@/stores/progress.ts'

const progress = useProgressStore()
</script>

<template>
  <aside class="score">БАЛЛЫ: {{ progress.score }}</aside>
</template>

<style scoped lang="scss">
.score {
  position: fixed;
  top: 1vw;
  right: 1vw;
  color: #fff;
  z-index: 150;
  font-size: 2vw;
  font-weight: 500;
}
</style>
