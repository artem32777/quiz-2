<script setup lang="ts">
import '@/assets/style/index.scss'
import Text from '@/components/text/Text.vue'
import Score from '@/components/layout/Score.vue'
import Legend from '@/components/legend/Legend.vue'
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
