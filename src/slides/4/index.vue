<script setup lang="ts">
import Background from '@/components/Background.vue'
import bg from '@/slides/3/assets/bg.webp'
import { sleep } from '@/utils/utils.ts'
import Text from '@/components/text/Text.vue'
import { onMounted, reactive } from 'vue'
import TypedText from '@/components/typed-text/TypedText.vue'
import Button from '@/components/button/Button.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const state = reactive({
  personalCard: false,
  personalCardBtn: false,
  medicalData: false,
  summary: false,
})

onMounted(async () => {
  await sleep(1000)
  state.personalCard = true
})
</script>

<template>
  <Background
    :src="bg"
    is-image
  />

  <!-- Карточка пациента -->
  <Text
    :show="state.personalCard"
    width="70"
    height="40"
    top="5"
    type="medical-card"
    class="medical-card"
  >
    <h3 class="title">Карточка пациента</h3>
    <div class="inner">
      <img
        src="@/slides/4/assets/man.webp"
        alt="Пациент"
        class="photo"
      />
      <TypedText
        string="2021 год. Пациент И., 65 лет, впервые обратился к кардиологу с жалобами на перебоив работе
        сердца и одышку при нагрузке. При обследовании выявлена пароксизмальная форма фибрилляции
        предсердий. Пациент ранее не получал антикоагулянты."
        class="card-text"
        @completed="state.personalCardBtn = true"
      />
    </div>

    <Button
      :show="state.personalCardBtn"
      class="card-button"
      @click="
        async () => {
          state.personalCardBtn = false
          state.personalCard = false
          await sleep(500)
          state.medicalData = true
        }
      "
    >
      КЛИНИЧЕСКИЕ ДАННЫЕ
    </Button>
  </Text>

  <!-- Клинические данные -->

  <Text
    :show="state.medicalData"
    width="50"
    height="35"
    top="5"
    type="medical-card"
    class="medical-card"
  >
    <h3 class="title">Клинические данные</h3>
    <ul class="list">
      <li><b>ЧСС:</b> 110 уд/мин (нерегулярный ритм)</li>
      <li><b>АД:</b> 145/90 мм рт.ст</li>
      <li><b>КК по Кокрофту-Голту:</b> 75 мл/мин</li>
      <li><b>CHA2DS2-VASc:</b> 4 балла</li>
      <li><b>HAS-BLED:</b> 1 балл</li>
    </ul>
    <Button
      class="card-button"
      @click="
        async () => {
          state.medicalData = false
          await sleep(500)
          state.summary = true
        }
      "
    >
      РАСЧЁТ
    </Button>
  </Text>

  <!-- Расчёт -->

  <Text
    :show="state.summary"
    width="50"
    height="35"
    top="5"
    type="medical-card"
    class="medical-card"
  >
    <h3 class="title">Расчет CHA2DS2VASc</h3>
    <ul class="list">
      <li><b>C</b> (ХСН - ФВ 45%): <b>+1 балл</b></li>
      <li><b>H</b> (АГ 2 ст.): <b>+1 балл</b></li>
      <li><b>A</b> (возраст 65 лет): <b>+1 балл</b></li>
      <li><b>D</b> (СД 2 типа): <b>+1 балл</b></li>
      <li>ИТОГО: <b>4 балла</b></li>
    </ul>
    <Button
      class="card-button"
      @click="router.push('/5')"
    >
      ДАЛЕЕ
    </Button>
  </Text>
</template>

<style scoped lang="scss">
.medical-card {
  align-items: start;
}

.title {
  font-size: 60px;
  margin-bottom: 100px;
  text-align: center;
}

.inner {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 50px;
}

.list {
  font-size: 40px;
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.photo {
}

.card-text {
  font-size: 40px;
}

.card-button {
  position: relative;
  margin: 50px auto 0;
}
</style>
