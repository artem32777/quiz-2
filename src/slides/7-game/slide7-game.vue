<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import CardsGame from '@/slides/7-game/CardsGame.vue'
import GameHeader from '@/slides/7-game/GameHeader.vue'
import GameWelcome from '@/slides/7-game/GameWelcome.vue'
import GameWin from '@/slides/7-game/GameWin.vue'
import GameLoss from '@/slides/7-game/GameLoss.vue'
import { useOptions } from '@/composables/useOptions.ts'
import { sleep } from '@/utils/utils.ts'

const { sound } = useOptions()

export type Slide7GameState = {
  welcome: boolean
  header: boolean
  game: boolean
  win: boolean
  loss: boolean
}

const slideState = reactive<Slide7GameState>({
  welcome: false,
  header: false,
  game: false,
  win: false,
  loss: false,
})

const startGame = () => {
  slideState.welcome = false
  slideState.header = true
  slideState.game = true
}

const handleWin = () => {
  slideState.game = false
  slideState.win = true
  sound.done.play()
}

const handleLoss = () => {
  slideState.game = false
  slideState.loss = true
  sound.gameOver.play()
}

const restartGame = () => {
  slideState.win = false
  slideState.loss = false
  slideState.game = true
}

onMounted(async () => {
  await sleep(1000)
  slideState.welcome = true
})
</script>

<template>
  <div class="slide">
    <CardsGame
      :is-game-started="slideState.game"
      @win="handleWin"
    />
    <GameWelcome
      :show="slideState.welcome"
      @startGame="startGame"
    />
    <GameHeader
      v-show="slideState.header"
      :is-game-started="slideState.game"
      @loss="handleLoss"
    />
    <GameWin :show="slideState.win" />
    <GameLoss
      :show="slideState.loss"
      @restartGame="restartGame"
    />
  </div>
</template>

<style scoped lang="scss">
.slide {
  width: 100%;
  z-index: 250;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
