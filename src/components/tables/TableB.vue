<template>
  <div class="table-b-component" :class="{ active: selected }">
    <div class="top-seat" @click.stop="handleTableClick"></div>

    <div class="middle">
      <div class="side-seats left">
        <div v-for="i in 2" :key="`l-${i}`" class="seat" @click.stop="handleTableClick"></div>
        <div class="seat" @click.stop="handleTableClick"></div>
      </div>

      <div class="main-table" @click.stop="handleTableClick">
        <div class="label" :style="{ transform: 'rotate(' + textRotation + 'deg)' }">
          <span class="table-label">{{ label }}</span>
          <span class="table-label-capacity">{{ currentCapacityLabel }}</span>
        </div>
      </div>

      <div class="side-seats right">
        <div v-for="i in 2" :key="`r-${i}`" class="seat" @click.stop="handleTableClick"></div>
        <div class="seat" @click.stop="handleTableClick"></div>
      </div>
    </div>

    <div class="bottom-seat" @click.stop="handleTableClick"></div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, computed } from 'vue'
import { useTableStore } from '@/stores/tableStore';

const tableStore = useTableStore();
const emit = defineEmits(['select'])

const props = defineProps({
  label: { type: String, default: 'T1' },
  capacityLabel: {
    type: String,
    default: '0/8'
  },
  tableColor: { type: String, default: '#552808' },
  seatColor: { type: String, default: '#552808' },
  selected: { type: Boolean, default: false },
  textRotation: { type: Number, default: 0 }
})

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
.table-b-component {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  width: 80px;
  padding: 6px;
  box-sizing: border-box;
}

.middle {
  display: flex;
  gap: 6px;
  align-items: center
}

.main-table {
  width: 47px;
  height: 117px;
  background-color: v-bind(tableColor);
  border: 1px solid black;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.side-seats {
  display: flex;
  flex-direction: column;
  gap: 8px
}

.seat {
  width: 11px;
  height: 29px;
  background-color: v-bind(seatColor);
  border: 1px solid black;
  border-radius: 8px
}

.top-seat,
.bottom-seat {
  width: 29px;
  height: 12px;
  background-color: v-bind(seatColor);
  border: 1px solid black;
  border-radius: 12px
}

.top-seat {
  transform: translateY(3px)
}

.bottom-seat {
  transform: translateY(-3px)
}

.label {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  line-height: 1.1;
}

.table-label {
  font-family: "Georgia", "Times New Roman", serif;
  font-size: 1.1rem;
  font-weight: 700;
  color: black;
  text-transform: uppercase;
}

.table-label-capacity {
  font-family: "Georgia", "Times New Roman", serif;
  font-size: 0.8rem;
  font-weight: normal;
  color: black;
  margin-top: 2px;
}

.table-b-component.active .main-table,
.table-b-component.active .seat,
.table-b-component.active .top-seat,
.table-b-component.active .bottom-seat {
  background-color: #513C2C;
  transform: scale(1.02);
}

.table-b-component:hover {
  filter: brightness(1.1);
  cursor: pointer
}
</style>