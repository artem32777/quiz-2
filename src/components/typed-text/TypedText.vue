<script setup lang="ts">
import { onMounted, useTemplateRef } from 'vue'
import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'

const { string, typeSpeed = '0' } = defineProps<{
  string: string
  typeSpeed?: string
}>()

const emit = defineEmits<{ completed: [void] }>()

const typedStringRef = useTemplateRef<HTMLDivElement>('typedString')

onMounted(() => {
  if (!typedStringRef.value) return

  let split = SplitText.create(typedStringRef.value, { type: 'words' })

  gsap.from(split.words, {
    duration: 0.5,
    autoAlpha: 0,
    opacity: 0,
    stagger: 0.1,
    onComplete: () => emit('completed'),
  })
})
</script>

<template>
  <div class="string-wrapper">
    <div
      v-html="string"
      class="default-string"
    />
    <div
      ref="typedString"
      v-html="string"
      class="typed-string"
    />
  </div>
</template>

<style scoped lang="scss">
.string-wrapper {
  position: relative;
}

.default-string {
  opacity: 0;
}

.typed-string {
  position: absolute;
  inset: 0;
}
</style>
