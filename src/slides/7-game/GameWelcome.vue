<script setup lang="ts">
import Text from '@/components/text/Text.vue'
import Button from '@/components/button/Button.vue'

const { show } = defineProps<{
  show?: boolean
}>()

const emits = defineEmits<{
  startGame: [void]
}>()
</script>

<template>
  <Text
    :show="show"
    height="55"
    class="text"
  >
    Добро пожаловать в мини-игру <br />
    “Инкретиновый пазл!” <br />
    Ваша задача — за 60 секунд <br />
    упорядочить ключевые эффекты ситаглиптина. Готовы?
  </Text>
  <div
    class="btn-wrapper"
    :class="{ show }"
  >
    <Button
      @click="emits('startGame')"
      class="btn"
      >НАЧАТЬ ИГРУ</Button
    >
  </div>
</template>

<style scoped lang="scss">
.text {
  position: absolute;
  top: 14%;
  cursor: default;
  pointer-events: none;
}

.btn-wrapper {
  position: absolute;
  bottom: 5%;
  opacity: 0;
  pointer-events: none;
  transform: translateY(5%);
  &.show {
    transition: all 0.5s ease 2s;
    opacity: 1;
    pointer-events: auto;
    transform: translateY(0);
  }
}

.btn {
  font-size: 3.3vw;
}
</style>
