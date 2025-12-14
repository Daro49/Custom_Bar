<template>
  <div class="table-c-component" :class="{ active: selected }">
    <div class="main-table" @click.stop="handleTableClick">
      <div class="label" :style="{ transform: 'rotate(' + textRotation + 'deg)' }">
        <span class="table-label">{{ label }}</span>
        <span class="table-label-capacity">{{ currentCapacityLabel }}</span>
      </div>
    </div>

    <div class="seats">
      <div v-for="n in 5" :key="`seat-${n}`" class="seat" @click.stop="handleTableClick"></div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, computed } from 'vue'
import { useTableStore } from '@/stores/tableStore';

const tableStore = useTableStore();
const emit = defineEmits(['select'])

const props = defineProps({
  label: { type: String, default: 'T1' },
  capacityLabel: { type: String, default: '0/5' },
  tableColor: { type: String, default: '#552808' },
  seatColor: { type: String, default: '#552808' },
  selected: { type: Boolean, default: false },
  textRotation: { type: Number, default: 0 },
  layoutDirection: { type: String, default: 'column' }
})

const capacityMarginTop = computed(() => {
  return props.layoutDirection === 'column' ? '1px' : '0';
});

const capacityMarginLeft = computed(() => {
  return props.layoutDirection === 'row' ? '10px' : '0';
});

const tableData = computed(() => tableStore.getTableById(props.label));

const currentCapacityLabel = computed(() => {
  const data = tableData.value;
  if (data) {
    return `${data.occupied}/${data.capacity}`;
  }
  return props.capacityLabel;
});

const handleTableClick = () => {
  emit('select', props.label);
};
</script>

<style scoped>
.table-c-component {
  display: flex;
  gap: 8px;
  align-items: center;
  width: 50px;
  padding: 6px;
  box-sizing: border-box;
  cursor: default;
}

.main-table {
  width: 27px;
  height: 135px;
  background-color: v-bind(tableColor);
  border: 1px solid black;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.seats {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.seat {
  width: 20px;
  height: 20px;
  background-color: v-bind(seatColor);
  border: 1px solid black;
  border-radius: 50%;
}

.label {
  display: flex;
  flex-direction: v-bind(layoutDirection);
  align-items: center;
  justify-content: center;
  line-height: 1.1;
}

.table-label {
  font-family: "Georgia", "Times New Roman", serif;
  font-size: 1rem;
  font-weight: bold;
  color: black;
  text-transform: uppercase;
}

.table-label-capacity {
  font-family: "Georgia", "Times New Roman", serif;
  font-size: 0.8rem;
  font-weight: normal;
  color: black;
  margin-top: v-bind(capacityMarginTop);
  margin-left: v-bind(capacityMarginLeft);
}

.table-c-component.active .main-table,
.table-c-component.active .seat {
  background-color: #513C2C;
}

.table-c-component:hover {
  filter: brightness(1.1);
  cursor: pointer
}
</style>