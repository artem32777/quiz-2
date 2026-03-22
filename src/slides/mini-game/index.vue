<script setup lang="ts">
import bg from '@/slides/mini-game/assets/bg.webp'
import tableBg from '@/slides/mini-game/assets/ramka.webp'
import Background from '@/components/Background.vue'
import { onMounted, reactive, ref } from 'vue'
import { sleep } from '@/utils/utils.ts'
import Text from '@/components/text/Text.vue'
import Button from '@/components/button/Button.vue'
import Success from '@/slides/mini-game/Success.vue'
import Fail from '@/slides/mini-game/Fail.vue'

const state = reactive({
  history: false,
  table: false,
  info: false,
  resultBtn: false,
  result: false,
  success: false,
  fail: false,
})

const tableCells = {
  dose: ['apixaban', 'dabigatran', 'dabigatran-2', 'rivaroxaban'],
  freq: ['apixaban', 'dabigatran', 'dabigatran-2', 'rivaroxaban'],
  cond: ['apixaban', 'dabigatran', 'dabigatran-2', 'rivaroxaban'],
}

// Данные для айтемов
const itemsData = {
  dose: [
    { id: 'dose-1', text: '2,5 мг' },
    { id: 'dose-2', text: '5 мг' },
    { id: 'dose-3', text: '10 мг' },
    { id: 'dose-4', text: '15 мг' },
    { id: 'dose-5', text: '20 мг' },
    { id: 'dose-6', text: '75 мг' },
    { id: 'dose-7', text: '110 мг' },
    { id: 'dose-8', text: '150 мг' },
  ],
  freq: [
    { id: 'freq-1', text: '1 р/д' },
    { id: 'freq-2', text: '2 р/д' },
    { id: 'freq-3', text: '3 р/д' },
  ],
  cond: [
    { id: 'cond-1', text: 'возраст ≥ 75 лет' },
    { id: 'cond-2', text: 'возраст ≥ 80 лет' },
    { id: 'cond-3', text: 'возраст ≥ 85 лет' },
    { id: 'cond-4', text: 'масса тела ≤ 35 кг' },
    { id: 'cond-5', text: 'масса тела ≤ 50 кг' },
    { id: 'cond-6', text: 'масса тела ≤ 60 кг' },
    { id: 'cond-7', text: 'креатинин ≥ 100 мкмоль/л' },
    { id: 'cond-8', text: 'креатинин ≥ 133 мкмоль/л' },
    { id: 'cond-9', text: 'креатинин ≥ 155 мкмоль/л' },
    { id: 'cond-10', text: 'прием верапамила' },
    { id: 'cond-11', text: 'КК ≤ 15 мл/мин' },
    { id: 'cond-12', text: 'КК ≤ 15 -30 мл/мин' },
    { id: 'cond-13', text: 'КК ≤ 30 - 50 мл/мин' },
    {
      id: 'cond-14',
      text: 'Пациенты с эзофагитом, гастритом или гастроэзофагеальной рефлюксной болезнью',
    },
    { id: 'cond-15', text: 'нет условий' },
  ],
}

const itemsGroups = [
  { title: 'Дозы:', type: 'dose', items: itemsData.dose },
  { title: 'Кратность приема:', type: 'freq', items: itemsData.freq },
  { title: 'Дополнительные условия выбора дозы:', type: 'cond', items: itemsData.cond },
]

const tableColumns = [
  { type: 'dose', cells: tableCells.dose },
  { type: 'freq', cells: tableCells.freq },
  { type: 'cond', cells: tableCells.cond },
]

// Хранилище выбранных айтемов для каждой ячейки
const cellItems = reactive<Record<string, string[]>>({})

// Инициализация ячеек
Object.values(tableCells)
  .flat()
  .forEach((suffix) => {
    Object.keys(tableCells).forEach((type) => {
      const cellId = `${type}-${suffix}`
      if (!cellItems[cellId]) {
        cellItems[cellId] = []
      }
    })
  })

const selectedItem = ref<string | null>(null)

const correctCombinations = {
  'dose-apixaban': ['dose-2'],
  'dose-dabigatran': ['dose-7', 'dose-8'],
  'dose-dabigatran-2': ['dose-7', 'dose-8'],
  'dose-rivaroxaban': ['dose-4'],
  'freq-apixaban': ['freq-2'],
  'freq-dabigatran': ['freq-2'],
  'freq-dabigatran-2': ['freq-2'],
  'freq-rivaroxaban': ['freq-1'],
  'cond-apixaban': ['cond-8'],
  'cond-dabigatran': ['cond-15'],
  'cond-dabigatran-2': ['cond-15'],
  'cond-rivaroxaban': ['cond-15'],
}

const onDragStart = (itemId: string) => {
  selectedItem.value = itemId
}

const onDragOver = (e: DragEvent) => {
  e.preventDefault()
}

const onDrop = (cellId: string) => {
  if (selectedItem.value) {
    addItemAtemToCell(selectedItem.value, cellId)
    selectedItem.value = null
  }
}

const onItemClick = (itemId: string) => {
  selectedItem.value = itemId
}

const onCellClick = (cellId: string) => {
  if (selectedItem.value) {
    addItemAtemToCell(selectedItem.value, cellId)
    selectedItem.value = null
  }
}

const addItemAtemToCell = (itemId: string, cellId: string) => {
  const targetItems = cellItems[cellId]
  if (targetItems) {
    // Проверяем, есть ли уже этот айтем в ячейке
    const index = targetItems.indexOf(itemId)
    if (index === -1) {
      // Если нет, очищаем ячейку и добавляем новый (замена)
      targetItems.length = 0
      targetItems.push(itemId)
    } else {
      // Если уже есть, удаляем (повторный клик удаляет айтем)
      targetItems.splice(index, 1)
    }
  }
}

const getItemText = (itemId: string): string => {
  const type = itemId.split('-')[0] as keyof typeof itemsData
  const item = itemsData[type]?.find((i) => i.id === itemId)
  return item?.text || ''
}

const checkResult = () => {
  state.history = false
  state.resultBtn = false
  state.table = false
  state.info = false
  state.result = true

  let allCorrect = true

  for (const [cellId, correctItems] of Object.entries(correctCombinations)) {
    const selectedItems = cellItems[cellId]
    if (!selectedItems || selectedItems.length === 0) {
      allCorrect = false
      break
    }
    // Проверяем что хотя бы один из выбранных айтемов соответствует правильному
    const hasCorrectItem = selectedItems.some((item) => correctItems.includes(item))
    if (!hasCorrectItem) {
      allCorrect = false
      break
    }
  }

  if (allCorrect) {
    state.success = true
  } else {
    state.fail = true
  }
}

const returnToGame = () => {
  state.fail = false
  state.history = true
  state.table = true
  state.info = true
  state.resultBtn = true
}

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

  <!-- История -->
  <Text
    :show="state.history"
    string="Условия игры: Выберите дозу, кратность приема и условия применения дозы для каждого
            препарата. Если ничего не хотите указывать в условиях, то выберите пункт «нет условий».
            Сопоставьте препарат, дозу, кратность приема и условия выбора дозы. У нашего пациента 67
            лет, КК: 45 мл/мин/, масса тела 87 кг, креатинин: 155 мкмоль/л"
    top="1"
    height="7"
    @print-ended="
      async () => {
        state.table = true
        await sleep(1000)
        state.info = true
        await sleep(1000)
        state.resultBtn = true
      }
    "
  />

  <!-- Таблица -->
  <Transition name="scale">
    <div
      v-if="state.table"
      class="table"
    >
      <img
        src="@/slides/mini-game/assets/table.webp"
        alt="Таблица"
        class="table-img"
      />
      <div
        v-for="column in tableColumns"
        :key="column.type"
        :class="column.type"
      >
        <span
          v-for="cell in column.cells"
          :id="`${column.type}-${cell}`"
          :key="`${column.type}-${cell}`"
          @dragover="onDragOver"
          @drop="onDrop(`${column.type}-${cell}`)"
          @click="onCellClick(`${column.type}-${cell}`)"
        >
          {{ cellItems[`${column.type}-${cell}`]?.map((id) => getItemText(id)).join('') }}
        </span>
      </div>
    </div>
  </Transition>

  <!-- Панель айтемов -->
  <Text
    :show="state.info"
    top="55"
    :img="tableBg"
  >
    <div class="items">
      <div
        v-for="group in itemsGroups"
        :key="group.type"
        class="items-group"
      >
        <div>{{ group.title }}</div>
        <div class="items-wrapper">
          <span
            v-for="item in group.items"
            :key="item.id"
            :id="item.id"
            draggable="true"
            @dragstart="onDragStart(item.id)"
            @click="onItemClick(item.id)"
            :class="{ selected: selectedItem === item.id }"
          >
            {{ item.text }}
          </span>
        </div>
      </div>
    </div>
  </Text>

  <!-- Кнопка результата -->
  <Button
    :show="state.resultBtn"
    top="91"
    class="result-btn"
    @click="checkResult"
  >
    Оценить результат
  </Button>

  <!-- Верный результат -->
  <Success :show="state.success" />
  <!-- Неверный результат -->
  <Fail
    :show="state.fail"
    @close="returnToGame"
  />
</template>

<style scoped lang="scss">
.table {
  position: absolute;
  top: 17%;

  div {
    position: absolute;
    top: 23.5%;
    height: 71%;
    display: flex;
    flex-direction: column;

    span {
      width: 100%;
      height: 25%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.6vw;
      word-break: break-word;
      padding: 1vw 0.5vw;
      color: white;

      &:empty::before {
        content: '';
        display: block;
      }
    }
  }
}

.dose {
  left: 27.5%;
  width: 21.7%;
}

.freq {
  left: 49%;
  width: 21.7%;
}

.cond {
  left: 70.5%;
  width: 27.3%;
}

.items {
  color: white;
  font-size: 1vw;
}

.items-group {
  margin-bottom: 1vw;

  span {
    cursor: grab;
    transition: background 0.2s ease;
    padding: 0.1vw 0.3vw;
    border-radius: 0.3vw;
    background: rgba(white, 0.15);

    &.selected {
      background: rgba(green, 0.8) !important;
    }

    @media (any-hover: hover) {
      &:hover {
        background: rgba(green, 0.5);
      }
    }
  }
}

.items-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 0.3vw;
}

.result-btn {
  font-size: 1.3vw;
  width: 15vw;
  padding: 1vw 2vw;
}
</style>
