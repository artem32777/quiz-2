<script setup lang="ts">
import Button from '@/components/button/Button.vue'
import bg from '@/slides/mini-game/assets/bg.webp'
import Background from '@/components/Background.vue'
import { onMounted, reactive } from 'vue'
import { sleep } from '@/utils/utils.ts'

const state = reactive({
  btn: false,
})

onMounted(async () => {
  await sleep(1000)
  state.btn = true
})
</script>

<template>
  <Background
    :src="bg"
    is-image
  />

  <Button
    :show="state.btn"
    @click="$router.push('/1')"
  >
    Начать
  </Button>
</template>

<style scoped lang="scss"></style>
