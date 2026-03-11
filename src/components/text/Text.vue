<script setup lang="ts">
import historyBg from './history-bg.webp'
import missionBg from './mission-bg.webp'
import medicalCardBg from './card-bg.webp'
import { computed } from 'vue'
import TypedText from '@/components/typed-text/TypedText.vue'
import Card from '@/components/card/Card.vue'

const {
  show = true,
  type = 'history',
  width = '85',
  height = 'auto',
  typeSpeed,
} = defineProps<{
  string?: string
  typeSpeed?: string
  show?: boolean
  height?: number | string
  width?: number | string
  top?: number | string
  left?: number | string
  type?: 'history' | 'mission' | 'medical-card'
  img?: string
}>()

const emit = defineEmits<{
  (event: 'printEnded'): void
}>()

const wrapperBgImage = computed(() => {
  const image = {
    history: historyBg,
    mission: missionBg,
    'medical-card': medicalCardBg,
  }
  return image[type]
})
</script>

<template>
  <Transition name="scale">
    <Card
      v-if="show"
      :img="img || wrapperBgImage"
      :style="{
        height: height + 'vw',
        top: top + '%',
        left: left + '%',
        width: width + 'vw',
      }"
      class="wrapper"
      :class="`wrapper-${type}`"
    >
      <slot>
        <TypedText
          :string="string!"
          :type-speed="typeSpeed"
          class="text"
          @completed="emit('printEnded')"
        />
      </slot>
    </Card>
  </Transition>
</template>

<style scoped lang="scss">
.wrapper {
  position: absolute;
  align-items: center;

  &.wrapper-history {
    padding: 1% 3%;
  }

  &.wrapper-mission {
    padding: 3% 6%;
    filter: drop-shadow(10px 10px 30px rgba(0, 0, 0, 0.8));
  }

  &.wrapper-medical-card {
    padding: 3% 6%;
  }
}

.text {
  .wrapper-history & {
    font-size: 1.3vw;
    color: white;
  }

  .wrapper-mission & {
    text-align: center;
    font-size: 2.5vw;
  }
}
</style>
