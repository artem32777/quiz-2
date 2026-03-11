<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import Text from '@/components/text/Text.vue'
import bg from '@/slides/5/assets/bg.webp'
import Background from '@/components/Background.vue'
import { sleep } from '@/utils/utils.ts'
import rivaroxaban from '@/slides/5/assets/drug-1.webp'
import dabigatran from '@/slides/5/assets/drug-2.webp'
import warfarin from '@/slides/5/assets/drug-3.webp'
import apixaban from '@/slides/5/assets/drug-4.webp'
import { useRouter } from 'vue-router'

const router = useRouter()

const state = reactive({
  history: false,
  plate: false,
  drugs: false,
})

const drugs: { nextSlide: number | string; img: string }[] = [
  { nextSlide: '5-a', img: warfarin },
  { nextSlide: '5-b', img: rivaroxaban },
  { nextSlide: '5-c', img: dabigatran },
  { nextSlide: '5-d', img: apixaban },
]

onMounted(async () => {
  await sleep(1000)
  state.history = true
})
</script>

<template>
  <Background
    :src="bg"
    is-image
  />

  <Text
    :show="state.history"
    string="2021 год. У пациента CHA2DS2-VASc 4 балла. <br> Согласно Европейским и Российским клиническим
            рекомендациям, показана антикоагулянтная терапия. <br>Какой препарат вы назначите?"
    top="2"
    height="10"
    @print-ended="
      async () => {
        state.plate = true
        await sleep(1000)
        state.drugs = true
      }
    "
  />

  <div class="plate-wrapper">
    <Transition name="up">
      <img
        v-if="state.plate"
        src="@/slides/5/assets/plate.webp"
        alt="Тарелка"
        class="plate"
      />
    </Transition>

    <div
      v-if="state.drugs"
      class="drugs"
    >
      <div
        v-for="drug in drugs"
        :key="drug.nextSlide"
        class="drug"
        @click="router.push(`/${drug.nextSlide}`)"
      >
        <img
          :src="drug.img as string"
          alt="Лекарства"
          class="drug-img"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.plate-wrapper {
  position: absolute;
  bottom: 2%;
  width: 80%;
}

.plate {
  width: 100%;
}

.drugs {
  position: absolute;
  display: flex;
  justify-content: space-between;
  bottom: 20%;
  width: 90%;
  height: 100%;
  left: 50%;
  transform: translateX(-50%);
}

.drug {
  cursor: pointer;
  transition: all 0.3s ease 0s;
  opacity: 0;
  animation: dropIn 1s ease-out forwards;
  width: 20%;
  position: absolute;

  @media (any-hover: hover) {
    &:hover {
      filter: brightness(1.2);
      transform: scale(1.05);
    }
  }

  &:active {
    filter: brightness(1.2);
    transform: scale(1.05);
  }

  &:nth-child(1) {
    top: -25%;
    left: 5%;
    animation-delay: 0s;
  }

  &:nth-child(2) {
    top: 0;
    left: 30%;
    animation-delay: 0.5s;
  }

  &:nth-child(3) {
    top: -30%;
    left: 55%;
    animation-delay: 1s;
  }

  &:nth-child(4) {
    top: -10%;
    left: 80%;
    animation-delay: 1.5s;
  }
}

.drug-img {
  filter: drop-shadow(10px -5px 5px rgba(0, 0, 0, 0.5));
}

@keyframes dropIn {
  0% {
    opacity: 0;
    margin-top: -100px;
  }
  100% {
    opacity: 1;
    margin-top: 0;
  }
}
</style>
