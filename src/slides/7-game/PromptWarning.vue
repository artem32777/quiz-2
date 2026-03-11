<script setup lang="ts">
import Text from '@/components/text/Text.vue'
import Button from '@/components/button/Button.vue'

defineProps<{
  show?: boolean
}>()

const emits = defineEmits<{
  accept: [void]
  decline: [void]
}>()
</script>

<template>
  <Transition name="scale">
    <div
      v-show="show"
      class="wrapper"
    >
      <Text
        height="40"
        class="text"
      >
        При использовании Подсказки у Вас отнимется 10 секунд от времени
      </Text>
      <div
        class="warning-buttons"
        :class="{ show }"
      >
        <Button
          @click="emits('accept')"
          class="btn"
        >
          Воспользоваться подсказкой
        </Button>
        <Button
          @click="emits('decline')"
          class="btn"
        >
          Вернуться в игру
        </Button>
      </div>
    </div>
  </Transition>
</template>

<style scoped lang="scss">
.wrapper {
  position: absolute;
  top: 12%;
  height: calc(100% - 20%);
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.text {
  position: absolute;
  width: 80%;
  pointer-events: none;
}

.warning-buttons {
  position: absolute;
  bottom: 10%;
  display: flex;
  justify-content: space-between;
  opacity: 0;
  pointer-events: none;
  transform: translateY(5%);
  &.show {
    animation: showButtons 0.5s ease 1s forwards;
  }

  @keyframes showButtons {
    to {
      opacity: 1;
      pointer-events: auto;
      transform: translateY(0);
    }
  }
}

.btn {
  font-size: 1.5vw;
  width: 40%;
  padding: 1vw;
  border-radius: 2vw;
  border-width: 0.5vw;
}
</style>
