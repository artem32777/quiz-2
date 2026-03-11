<script setup lang="ts">
import descriptionBg from '@/components/description-modal/assets/description-bg.webp'
import closeBtnBg from '@/components/description-modal/assets/close-btn-bg.webp'
import { useSounds } from '@/composables/useSounds.ts'
import type { Option } from '@/composables/useOptions.ts'
import { onMounted } from 'vue'

defineProps<{ activeOption: Option | null }>()

const emit = defineEmits<{ (event: 'close'): void }>()

const { click2Sound } = useSounds()

const close = () => {
  click2Sound.play()
  emit('close')
}

onMounted(() => {
  document.documentElement.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      close()
    }
  })
})
</script>

<template>
  <Transition name="scale">
    <div
      v-if="!!activeOption"
      class="description"
    >
      <div class="content">
        <div
          v-if="activeOption.title"
          class="title"
        >
          {{ activeOption.title }}
        </div>

        <span
          v-html="activeOption?.text"
          class="text"
        />
      </div>

      <img
        :src="descriptionBg"
        alt="Фон описания"
        class="bg"
        :class="`bg-${activeOption?.id}`"
      />

      <img
        :src="closeBtnBg"
        alt="Кнопка закрытия"
        class="close-btn"
        @click="close"
      />
    </div>
  </Transition>
</template>

<style scoped lang="scss">
.description {
  position: absolute;
  padding: 3vw 5vw;
  width: 60vw;
  min-height: 30vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.content {
  position: relative;
  z-index: 1;
}

.title {
  text-align: center;
  margin-bottom: 1vw;
  font-size: 2.5vw;
  font-weight: 600;
}

.text {
  font-size: 1.5vw;

  :deep(ol) {
    list-style-type: disc;
    display: flex;
    flex-direction: column;
    gap: 0.4vw;
  }

  :deep(h3) {
    font-weight: 600;
    margin-bottom: 0.8vw;
  }
}

.bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}
.bg-1 {
  filter: hue-rotate(10deg);
}
.bg-2 {
  filter: hue-rotate(60deg);
}
.bg-3 {
  filter: hue-rotate(290deg);
}

.close-btn {
  position: absolute;
  top: -1vw;
  right: -1vw;
  height: 5vw;
  cursor: pointer;
  transition: filter 0.3s ease 0s;

  @media (any-hover: hover) {
    &:hover {
      filter: brightness(1.2);
    }
  }

  &:active {
    filter: brightness(0.8);
  }
}
</style>
