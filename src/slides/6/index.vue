<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import Button from '@/components/button/Button.vue'
import Text from '@/components/text/Text.vue'
import bg from '@/slides/2/assets/bg.mp4'
import Background from '@/components/Background.vue'
import { sleep } from '@/utils/utils.ts'
import { useRouter } from 'vue-router'

const router = useRouter()

const state = reactive({
  legend: false,
  btn: false,
})

onMounted(async () => {
  await sleep(1000)
  state.legend = true
})
</script>

<template>
  <Background :src="bg" />

  <Text
    :show="state.legend"
    string="Нестабильное МНО и низкое TTR привели к инсульту в 2026 году. Нам не удалось его предотвратить выбрав Варфарин в 2021 году. Давайте вернемся и попробуем выбрать другую тактику."
    top="40"
    width="50"
    @print-ended="state.btn = true"
  />

  <Button
    :show="state.btn"
    top="60"
    @click="router.push('/5')"
  >
    ВЫБРАТЬ ТАКТИКУ
  </Button>
</template>

<style scoped lang="scss"></style>
