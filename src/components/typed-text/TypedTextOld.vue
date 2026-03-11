<script setup lang="ts">
import { onMounted } from 'vue'
import Typed from 'typed.js'

const { string, typeSpeed = '0' } = defineProps<{
  string: string
  typeSpeed?: string
}>()

const emit = defineEmits<{
  completed: [void]
}>()

onMounted(() => {
  new Typed('.typed-string', {
    strings: [string],
    typeSpeed: +typeSpeed,
    showCursor: false,
    onComplete() {
      emit('completed')
    },
  })
})
</script>

<template>
  <div class="string-wrapper">
    <div class="default-string">{{ string }}</div>
    <div class="typed-string" />
  </div>
</template>

<style scoped lang="scss">
.string-wrapper {
  position: relative;
}

.default-string {
  opacity: 0;
  inset: 0;
  width: 100%;
  height: 100%;
}

.typed-string {
  position: absolute;
  top: 0;
  left: 0;
}
</style>
