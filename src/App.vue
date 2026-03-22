<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useSounds } from '@/composables/useSounds.ts'
import '@/assets/style/index.scss'
import Text from '@/components/text/Text.vue'
import Legend from '@/components/legend/Legend.vue'
import { sleep } from '@/utils/utils.ts'

// const router = useRouter()
// const { click2Sound } = useSounds()
//
// router.beforeEach(async () => {
//   // await sleep(500)
//   // click2Sound.play()
// })
</script>

<template>
  <RouterView v-slot="{ Component, route }">
    <Transition
      name="slide"
      mode="out-in"
    >
      <div
        v-if="Component"
        :key="route.fullPath"
        class="slide"
      >
        <Legend />
        <Component :is="Component" />
      </div>
    </Transition>
  </RouterView>

  <div class="prerender">
    <Text string="1" />
    <Text
      type="mission"
      string="2"
    />
    <Text
      type="medical-card"
      string="3"
    />
  </div>
</template>

<style lang="scss">
.slide {
  height: 100vh;
  max-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.prerender {
  top: 0;
  position: absolute;
  left: -1000%;
  pointer-events: none;
  height: 100%;
  overflow: hidden;
}
</style>
