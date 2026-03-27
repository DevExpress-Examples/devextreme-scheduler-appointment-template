<template>
  <div :class="markWeekEnd(cellData)">
    <div :class="markTraining(cellData)">
      {{ cellData.text }}
    </div>
  </div>
</template>

<script setup lang="ts">
interface CellData {
  text: string;
  startDate: Date;
  groups: {
    employeeID: number;
  };
}

defineProps<{
  cellData: CellData;
}>();

function isWeekEnd(date: Date) {
  const day = date.getDay();
  return day === 0 || day === 6;
}

function markWeekEnd(cellData: CellData): Record<string, boolean> {
  return {
    [`employee-${cellData.groups.employeeID}`]: true,
    [`employee-weekend-${cellData.groups.employeeID}`]: isWeekEnd(cellData.startDate),
  };
}

function getCurrentTraining(date: number, employeeID: number): string {
  const result = (date + employeeID) % 3;
  return `training-background-${result}`;
}

function markTraining(cellData: CellData): Record<string, boolean> {
  const classObject: Record<string, boolean> = {
    'day-cell': true,
  };

  classObject[getCurrentTraining(cellData.startDate.getDate(), cellData.groups.employeeID)] = true;

  return classObject;
}
</script>

<style>
.day-cell {
  height: 100%;
  background-position: center center;
  background-repeat: no-repeat;
}

.employee-1 {
  background-color: rgba(86, 202, 133, 0.1);
}

.employee-2 {
  background-color: rgba(255, 151, 71, 0.1);
}

.employee-weekend-1 {
  background-color: rgba(86, 202, 133, 0.2);
}

.employee-weekend-2 {
  background-color: rgba(255, 151, 71, 0.2);
}

.training-background-0 {
  background-image: url('@/assets/images/icon-abs.png');
}

.training-background-1 {
  background-image: url('@/assets/images/icon-step.png');
}

.training-background-2 {
  background-image: url('@/assets/images/icon-fitball.png');
}

.dx-theme-material .name h2 {
  font-size: 28px;
}
</style>
